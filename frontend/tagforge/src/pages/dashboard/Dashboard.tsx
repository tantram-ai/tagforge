import { Box, Button, Divider, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import { PremiumBadge, TgAccordian, TgModal, TgSearch, TgTab, TgTable, TgToggle } from '../../shared/components'
import { useEffect, useState } from 'react'
import { ContentTab, InputForm } from './components'
import { useAuthStore, useSnackbarStore } from '../../store'
import { createProject, getKeywords, getProjects } from '../../api/services'

export const Dashboard = () => {
  const { planDetails } = useAuthStore()
  const planInfo = planDetails?.data?.Plan
  const [expanded, setExpended] = useState<string | false>(false)
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
  const [projectName, setProjectname] = useState<string>("")
  const { showSnackbar } = useSnackbarStore()
  const [isCreatingProject, setCreatingProject] = useState<boolean>(false)
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(false)
  const [generatingKeywords, setGeneratingKeywords] = useState<boolean>(false)
  const [suggestedKeywords, setSuggestedKeywords] = useState([])
  const [projects, setprojects] = useState<any>([])
  const [formData, setFormData] = useState({
    businessBrief: "",
    userKeyword: "",
    pageType: "",
    tone: "",
    length: "",
    goal: "",
    cta: "",
    competitors: "",
  });

  const tabItemList = ["Content", "Meta", "Facebook", "Twitter", "Linkdin"]
  const tabComponentList = [
    <ContentTab suggestedKeywords={suggestedKeywords} />,
    <Typography>Meta</Typography>,
    <Typography>Facebook</Typography>,
    <Typography>Twitter</Typography>,
    <Typography>Linkdin</Typography>,
  ]


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (projectId: string) => {
    setGeneratingKeywords(true)
    try {
      const result = await getKeywords({ ...formData, promptType: "KEYWORD", projectId: projectId });
      if (result.code === "SUCCESS") {
        setSuggestedKeywords(result?.data?.text)
        setGeneratingKeywords(false)
      }
    } catch (err: any) {
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

  useEffect(() => {
    getProjectList()
  }, [])

  const scrollViewComanStyle = {
    backgroundColor: 'background.paper', height: '85vh', borderRadius: 2, overflow: 'auto',
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3f3d3d",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    // scrollbarWidth: "thin", // Firefox
    // scrollbarColor: "#888 transparent", // Firefox
  }

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        flex: 1,
        borderRadius: 3,
        p: 1,
        marginTop: '4.5%',
        height: '88vh'
      }}
    >
      <Grid container spacing={1}>
        <Grid size={3} sx={{
          ...scrollViewComanStyle
        }}>
          <List>
            <ListItem>
              <Button fullWidth variant="contained" onClick={() => setCreateProjectModal(true)}>New Project</Button>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ my: 1 }} />
            <ListItem>
              <Box width="100%">
                {projects?.length > 0 && projects?.map((item: any, index: number) => {
                  return (
                    <TgAccordian
                      data={item}
                      index={index}
                      expanded={expanded === `panel${index}`}
                      onChange={() => setExpended(expanded === `panel${index}` ? false : `panel${index}`)}>
                      <InputForm
                        handleChange={handleChange}
                        formData={formData}
                        handleSubmit={() => handleSubmit(item?.projectId)}
                        generatingKeywords={generatingKeywords}
                      />
                    </TgAccordian>
                  )
                })}
              </Box>
            </ListItem>

          </List>
        </Grid>
        <Grid size={6} sx={{ ...scrollViewComanStyle }} >
          <TgTab tabItemList={tabItemList} tabComponentList={tabComponentList} />
        </Grid>
        <Grid size={3} sx={{ ...scrollViewComanStyle }}>
          <List >
            <ListItem>
              <Typography sx={{ fontSize: "15px" }}>
                Keyword Insights
              </Typography>
            </ListItem>
            <Divider variant="middle" component="li" />
            <Box sx={{mt:1,mx:1}}>
              <PremiumBadge hidden={false}>
              <TgToggle disabled={!planInfo?.features?.competitorAnalysis}/>
              </PremiumBadge>
            </Box>
            <TgSearch onSearch={handleSearch} />
            <TgTable />
          </List>
        </Grid>
      </Grid>

      <div>
        <TgModal open={createProjectModal} setOpen={setCreateProjectModal}>
          <Typography component="span" fontWeight="bold">Create New Project</Typography>
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
    </Paper>

  )
}
