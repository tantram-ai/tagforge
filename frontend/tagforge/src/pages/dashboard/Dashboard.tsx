import { Box, Button, Divider, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import { TgAccordian, TgModal, TgTab, TgTable } from '../../shared/components'
import { useEffect, useState } from 'react'
import { InputForm } from './components'
import { useSnackbarStore } from '../../store'
import { createProject, getProjects } from '../../api/services'

export const Dashboard = () => {
  const [expanded, setExpended] = useState<string | false>(false)
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
  const [projectName, setProjectname] = useState<string>("")
  const { showSnackbar } = useSnackbarStore()
  const [isCreatingProject, setCreatingProject] = useState<boolean>(false)
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(false)
  const [projects, setprojects] = useState<any>([])

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
        getProjectList()
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

  return (
    <Paper
      elevation={4}
      sx={{
        flex: 1,
        borderRadius: 3,
        p: 1,
        m: 2,
        height: '94vh'
      }}
    >
      <Grid container spacing={2}>
        <Grid size={3} sx={{ backgroundColor: 'background.paper', borderRadius: 2, height: '91vh', overflow: 'auto' }}>
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
                      <InputForm />
                    </TgAccordian>
                  )
                })}
              </Box>
            </ListItem>

          </List>
        </Grid>
        <Grid size={6} sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
          <TgTab />
        </Grid>
        <Grid size={3} sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
          <List >
            <ListItem>
              <Typography variant="h6">
                Keyword Insights
              </Typography>
            </ListItem>
            <Divider variant="middle" component="li" />
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
            onClick={handleCreateProject}
            loading={isCreatingProject}
            loadingPosition='end'
            disabled={isCreatingProject}
          >Create</Button>
        </TgModal>
      </div>
    </Paper>

  )
}
