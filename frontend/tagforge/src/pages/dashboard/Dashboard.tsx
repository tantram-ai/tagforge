import { Box, Button, Chip, Divider, Grid, List, ListItem, TextField, Typography, useTheme } from '@mui/material'
import { PremiumBadge, TgAccordian, TgAutocomplete, TgModal, TgSearch, TgSkeletonLoader, TgSteper, TgTab, TgTable, TgToggle } from '../../shared/components'
import { useEffect, useState } from 'react'
import { ContentTab, InputForm, KeywordTab, MetaTab, SocialPreviewCard, StrategyTab } from './components'
import { useAuthStore, useSnackbarStore } from '../../store'
import { createProject, generateContent, getCompetitorKeywords, getKeywords, getProjects, keywordSearch } from '../../api/services'
import { extractAllMeta } from '../../shared/utils'

export const Dashboard = () => {
  const { planDetails } = useAuthStore()
  const planInfo = planDetails?.data?.Plan
  const [expanded, setExpended] = useState<string | false | true>(false)
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
  const [projectName, setProjectname] = useState<string>("")
  const { showSnackbar } = useSnackbarStore()
  const [isCreatingProject, setCreatingProject] = useState<boolean>(false)
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(false)
  const [fetchingContent, setFetchingContent] = useState<boolean>(false)
  const [seoContent, setSeoContent] = useState<any>({})
  const [activeForm, setActiveFormInput] = useState<any>({})
  const [fetchingKeywords, setFeatchingKeywords] = useState<boolean>(false)
  const [generatingKeywords, setGeneratingKeywords] = useState<boolean>(false)
  const [suggestedKeywords, setSuggestedKeywords] = useState([])
  const [keywordList, setKeywordList] = useState([])
  const [projects, setprojects] = useState<any>([])
  const [activeProjectIndex, setActivePorjectIndex] = useState<number>(0)
  const [kwdPageCount, setKwdPageCount] = useState<number>(1)
  const [selectedKeywords, setSelectedKeywords] = useState<any>([])
  const [toogleAlignment, setToogleAlignment] = useState('Keyword');
  const [openKeywordTab, setOpenKeywordTab] = useState<boolean>(true)

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setToogleAlignment(newAlignment);
    setQuery("")
  };


  const tabItemList = ["Keywords", "Strategy", "Content", "Meta", "Schema", "Facebook", "Twitter", "Linkdin", "Google"]
  const [query, setQuery] = useState<string>('');

  const handleSuggestedKeywordClick = (keywordData: any) => {
    setQuery(keywordData?.keyword)
    setKwdPageCount(1)
    setToogleAlignment("Keyword")
    handleSearch(keywordData?.keyword)
  }

  const deselect = (keywordData: any) => {
    setSelectedKeywords((prev: any) => {
      let clone = [...prev]
      return clone?.filter((item) => item?.keyword !== keywordData?.keyword)
    })
  }

  const onGenerate = async () => {
    const projectId = projects[activeProjectIndex]?.projectId
    if (selectedKeywords.length <= 0) {
      showSnackbar("Please select keywords", "error")
      return
    }
    setFetchingContent(true)
    try {
      const result = await generateContent({
        ...activeForm,
        promptType: "CONTENT",
        projectId,
        selectedKeywords: selectedKeywords
      });
      if (result.code === "SUCCESS") {
        setSeoContent({
          projectId: result?.data?.projectId,
          seoContent: result?.data?.seoContent,
          metaHtml: result?.data?.meta,
          data: result?.data?.schema
        })
        setFetchingContent(false)
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setFetchingContent(false)
    } finally {
      setFetchingContent(false)
    }
  }
  const socialMediaPreviewData = extractAllMeta(seoContent?.metaHtml)
  const tabComponentList = [
    <KeywordTab />,
    <StrategyTab />,
    <ContentTab
      suggestedKeywords={suggestedKeywords}
      selectedKeywords={selectedKeywords}
      deselect={deselect}
      handleSuggestedKeywordClick={handleSuggestedKeywordClick}
      query={query}
      onGenerate={onGenerate}
      seoContent={seoContent?.seoContent}
      fetchingContent={fetchingContent}
      fetchingProjects={fetchingProjects}
      generatingKeywords={generatingKeywords}
      openKeywordTab={openKeywordTab}
      setOpenKeywordTab={setOpenKeywordTab}
    />,
    <MetaTab meta={seoContent?.metaHtml} />,
    <MetaTab meta={seoContent?.metaHtml} />,
    <div style={{
      background: "#f2f3f5",
      minHeight: "100vh",
      paddingTop: 32
    }}>
      <SocialPreviewCard
        image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=cover&w=500&q=80"
        title={socialMediaPreviewData?.title}
        description={socialMediaPreviewData?.description}
        url={socialMediaPreviewData?.url}
        site="facebook"
      />
    </div>
    ,
    <div style={{
      background: "#f2f3f5",
      minHeight: "100vh",
      paddingTop: 32
    }}>
      <SocialPreviewCard
        image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=cover&w=500&q=80"
        title={socialMediaPreviewData?.title}
        description={socialMediaPreviewData?.description}
        url={socialMediaPreviewData?.url}
        site="twitter"
      />
    </div>,
    <div style={{
      background: "#f2f3f5",
      minHeight: "100vh",
      paddingTop: 32
    }}>
      <SocialPreviewCard
        image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=cover&w=500&q=80"
        title={socialMediaPreviewData?.title}
        description={socialMediaPreviewData?.description}
        url={socialMediaPreviewData?.url}
        site="linkedin"
      />
    </div>,
    <div style={{
      background: "#f2f3f5",
      minHeight: "100vh",
      paddingTop: 32
    }}>
      <SocialPreviewCard
        title={socialMediaPreviewData?.title}
        description={socialMediaPreviewData?.description}
        url={socialMediaPreviewData?.url}
        site="google"
      />
    </div>,
  ]


  const handleSubmit = async (formData: any, projectId: string) => {
    setGeneratingKeywords(true)
    try {
      const result = await getKeywords({ ...formData, promptType: "KEYWORD", projectId: projectId });
      if (result.code === "SUCCESS") {
        setSuggestedKeywords(result?.data?.text)
        setGeneratingKeywords(false)
        setActiveFormInput(formData)
        setOpenKeywordTab(true)
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setGeneratingKeywords(false)
    } finally {
      setGeneratingKeywords(false)
    }
  };



  const getProjectList = async () => {
    setFetchingProjects(true)
    try {
      const result = await getProjects();
      if (result.code === "SUCCESS") {
        setprojects(result?.data)
        suggestedKeywordList(result?.data)
        setActivePorjectForm(result?.data)
        setGeneratedContent(result?.data)
        setSelectedkeywordList(result?.data)
        setFetchingProjects(false)
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setFetchingProjects(false)

    } finally {
      setFetchingProjects(false)
    }
  }

  const handleCreateProject = async () => {
    if (!projectName) {
      return
    }
    setCreatingProject(true)
    const payload =
    {
      name: projectName,
    }
    try {
      const result = await createProject(payload);
      if (result.code === "SUCCESS") {
        showSnackbar(result?.message, "success");
        await getProjectList()
        setCreateProjectModal(false)
        setProjectname("")
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setCreatingProject(false)
      setProjectname("")

    } finally {
      setCreatingProject(false)
      setCreateProjectModal(false)
      setProjectname("")
    }

  }

  const setGeneratedContent = (allProjectData: any) => {
    const content = allProjectData[activeProjectIndex]?.Generation || ""
    setSeoContent(content)
  }

  const setSelectedkeywordList = (allProjectData: any) => {
    const keywords = allProjectData[activeProjectIndex]?.Keywords || []
    const suggestedKeywords = keywords?.find((item: any) => item?.selected) || []
    if (suggestedKeywords?.phrase) {
      setSelectedKeywords(JSON?.parse(suggestedKeywords?.phrase))
    } else {
      setSelectedKeywords([])
    }
  }

  const setActivePorjectForm = (allProjectData: any) => {
    const inputs = allProjectData[activeProjectIndex]?.Input
    setActiveFormInput(inputs)
  }

  const jsonToArray = (list: string) => {
    if (list) {
      let cleaned = list?.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned) || []
    } else {
      return []
    }

  }

  const suggestedKeywordList = (allProjectData: any) => {
    const keywords = allProjectData[activeProjectIndex]?.Keywords || []
    const suggestedKeywords = keywords?.find((item: any) => item?.suggested)
    setSuggestedKeywords(jsonToArray(suggestedKeywords?.phrase))
  }

  useEffect(() => {
    getProjectList()
    if (activeProjectIndex === 0) {
      setExpended("panel0")
    }
  }, [])

  useEffect(() => {
    if (projects?.length > 0) {
      suggestedKeywordList(projects)
      setActivePorjectForm(projects)
      setGeneratedContent(projects)
      setSelectedkeywordList(projects)
    }
  }, [activeProjectIndex])

  useEffect(() => {
    if (activeForm?.competitors) {
      setToogleAlignment("URL")
      setQuery(activeForm?.competitors)
    } else {
      setToogleAlignment("Keyword")
      setQuery("")
    }
  }, [activeForm])



  const scrollViewComanStyle = ({ height = "85vh" }: { height: string }) => {
    return {
      backgroundColor: 'background.paper',
      height: height,
      borderRadius: 5,
      overflow: 'auto',
      "&::-webkit-scrollbar": {
        width: "2px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "customBorders.sideBorder",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "customBorders.sideBorder",
      },
      // scrollbarWidth: "thin", // Firefox
      // scrollbarColor: "#888 transparent", // Firefox
    }
  }

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (keyword = null) => {
    setFeatchingKeywords(true)
    const newQuery = keyword ? keyword : query
    let result: any = []
    try {
      if (toogleAlignment === "Keyword") {
        result = await keywordSearch({ keywords: [newQuery], page: kwdPageCount });
      } else {
        result = await getCompetitorKeywords({ url: [newQuery], page: kwdPageCount });
      }
      if (result.code === "SUCCESS") {
        setKeywordList(result?.data?.tasks[0]?.result || [])
        setFeatchingKeywords(false)
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setFeatchingKeywords(false)
    } finally {
      setFeatchingKeywords(false)
    }
  };

  const handleSelect = (row: any) => {
    if (selectedKeywords?.length < planInfo?.keywordsPerProject) {
      setSelectedKeywords((prev: any) => {
        const clone = [...prev];
        const isPresent = clone.find((item: any) => item?.keyword === row?.keyword);
        if (!isPresent) {
          return [...clone, row];
        } else {
          return clone?.filter((item) => item?.keyword !== row?.keyword);
        }
      });
    } else {
      showSnackbar("Keyword limit reached. Please upgrade", "error")
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHighlightRow = (keyword: any) => {
    const isActive = selectedKeywords?.find((item: any) => item?.keyword === keyword)
    return isActive ? true : false
  }

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 3,
        p: 1,
        marginTop: '3%',
        height: '88vh',
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          p: 1,
          backgroundColor: "background.paper",
          boxShadow: 2,
          mb: 2
        }}
      >
        <TgSteper />
      </Box>

      <Grid container spacing={2}>
        <Grid size={3} sx={{
          ...scrollViewComanStyle({ height: "82vh" }),
          borderRight: "2px solid cutromBorders.sideBorder"
        }}
          boxShadow={1}
        >
          <List>
            <ListItem>
              <Box sx={{ width: '100%' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} >
                  <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                    Project
                  </Typography>
                  <Chip
                    label={"New"}
                    size="medium"
                    sx={{
                      height: 38,
                      borderRadius: 2.5,
                      px: 0.5,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "text.primary",
                      bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#F8FAFC",
                      border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(148, 163, 184, 0.22)"
                        }`,
                      "& .MuiChip-label": {
                        px: 1.25,
                      },
                      "&:hover": {
                        bgcolor: isDark ? "rgba(255,255,255,0.08)" : "#F1F5F9",
                      },
                    }}
                    onClick={() => setCreateProjectModal(true)}
                  />
                </Box>
                <TgAutocomplete options={top100Films} label='Project' />
              </Box>
              {/* <Button fullWidth variant="contained" onClick={() => setCreateProjectModal(true)}>New Project</Button> */}
            </ListItem>
            <Divider variant="middle" component="li" sx={{ my: 1 }} />
            <Box sx={{ mx: 2 }}>
              <InputForm
                defaultData={projects[0]?.item?.Input}
                handleSubmit={(formData: any) => handleSubmit(formData, projects[0]?.item?.projectId)}
                generatingKeywords={generatingKeywords}
              />
            </Box>

            {/* <ListItem>
              <Box width="100%" >
                {fetchingProjects ?
                  <TgSkeletonLoader
                    columns={1}
                    rows={5} /> :
                  <>
                    {projects?.length > 0 && projects?.map((item: any, index: number) => {
                      return (
                        <Box sx={{ my: 1 }}>
                          <TgAccordian
                            active={activeProjectIndex === index}
                            data={item}
                            index={index}
                            expanded={expanded === `panel${index}`}
                            onChange={() => {
                              setExpended(expanded === `panel${index}` ? false : `panel${index}`)
                              setActivePorjectIndex(index)
                              if (expanded !== `panel${index}`) {
                                setOpenKeywordTab(true)
                              } else {
                                setOpenKeywordTab(false)
                              }
                            }}>
                            <InputForm
                              defaultData={item?.Input}
                              handleSubmit={(formData: any) => handleSubmit(formData, item?.projectId)}
                              generatingKeywords={generatingKeywords}
                            />
                          </TgAccordian>
                        </Box>

                      )
                    })}
                  </>
                }
              </Box>
            </ListItem> */}
          </List>
        </Grid>
        <Grid size={6} sx={{ ...scrollViewComanStyle({ height: "82vh" }), position: "relative" }} boxShadow={2} >
          <TgTab tabItemList={tabItemList} tabComponentList={tabComponentList} />
        </Grid>
        <Grid size={3} sx={{
          ...scrollViewComanStyle({ height: "82vh" }),
          borderLeft: "2px solid cutromBorders.sideBorder",
          zIndex: 100,
        }}
          boxShadow={2}>
          <List >
            <ListItem>
              <Typography sx={{ fontSize: "15px" }}>
                Keyword Insights
              </Typography>
            </ListItem>
            <Divider variant="middle" component="li" />
            <Box sx={{ mt: 1, mx: 1 }}>
              <PremiumBadge hidden={planInfo?.features?.competitorAnalysis}>
                <TgToggle
                  disabled={!planInfo?.features?.competitorAnalysis}
                  handleToggleChange={handleToggleChange}
                  toogleAlignment={toogleAlignment}
                />
              </PremiumBadge>
            </Box>

            <TgSearch
              onSearch={() => handleSearch()}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              query={query} />

            <Box sx={{ ...scrollViewComanStyle({ height: "58vh" }) }}>
              <TgTable
                keywordList={keywordList}
                fetchingKeywords={fetchingKeywords}
                onSelect={handleSelect}
                highlightRow={handleHighlightRow}
              />
            </Box>

          </List>
        </Grid>
      </Grid>

      <div>
        <TgModal open={createProjectModal} setOpen={setCreateProjectModal}>
          <Typography component="span" fontWeight="bold">Create New</Typography>
          <TextField
            label="Project Name"
            name="Project Name"
            value={projectName}
            onChange={(e) => setProjectname(e?.target?.value)}
            fullWidth
            required
            variant="standard"
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained"
            onClick={() => handleCreateProject()}
            loading={isCreatingProject}
            loadingPosition='end'
            disabled={isCreatingProject}
          >Create</Button>
        </TgModal>
      </div>
    </Box>

  )
}



const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
