import { Box, Button, Divider, Grid, List, ListItem, TextField, Typography } from '@mui/material'
import { PremiumBadge, TgAccordian, TgModal, TgSearch, TgSkeletonLoader, TgTab, TgTable, TgToggle } from '../../shared/components'
import { useEffect, useState } from 'react'
import { ContentTab, InputForm, MetaTab, SocialPreviewCard } from './components'
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


  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setToogleAlignment(newAlignment);
    setQuery("")
  };


  const tabItemList = ["Content", "Meta", "Facebook", "Twitter", "Linkdin", "Google"]
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
      borderRadius: 2,
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
        marginTop: '4.5%',
        height: '88vh',
        backgroundColor: "background.default"
      }}
    >
      <Grid container spacing={1}>
        <Grid size={3} sx={{
          ...scrollViewComanStyle({ height: "85vh" }),
          borderRight: "2px solid cutromBorders.sideBorder"
        }}>
          <List>
            <ListItem>
              <Button fullWidth variant="contained" onClick={() => setCreateProjectModal(true)}>New Project</Button>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ my: 1 }} />
            <ListItem>
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
            </ListItem>
          </List>
        </Grid>
        <Grid size={6} sx={{ ...scrollViewComanStyle({ height: "85vh" }) }} >
          <TgTab tabItemList={tabItemList} tabComponentList={tabComponentList} />
        </Grid>
        <Grid size={3} sx={{
          ...scrollViewComanStyle({ height: "85vh" }),
          borderLeft: "2px solid cutromBorders.sideBorder"
        }}>
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
