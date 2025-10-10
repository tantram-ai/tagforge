import { Box, Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

type contentTabProps = {
    suggestedKeywords: any
}

const scrollViewComanStyle = {
     height: '48vh', borderRadius: 2, overflow: 'auto',
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

export const ContentTab = ({ suggestedKeywords }: contentTabProps) => {
    return (
        <>
            <Box mx="auto" textAlign={"center"} mt={2}>
                <Button variant="outlined">Generate</Button>
                <Typography variant="subtitle1" mt={1}>Click on generate to get the SEO friendly content.</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={1}>
                <Grid size={6}>
                    <Paper sx={{ p: 1 }}>
                        <Box>
                            <Box>
                                <Typography variant="subtitle1" textAlign="center">Suggested Keywords</Typography>
                                <Divider sx={{ my: 1 }} />
                            </Box>
                            <Box  sx={{ ...scrollViewComanStyle }}>
                            {suggestedKeywords?.length > 0 && suggestedKeywords?.map((item: any) => {
                                return <Chip label={item?.keyword} sx={{ margin: '2px' }} />
                            })}
                            </Box>
                        </Box>
                    </Paper>

                </Grid>
                <Grid size={6}>
                    <Paper sx={{ p: 1 }}>
                        <Box>
                            <Typography variant="subtitle1" textAlign="center" >Selected Keywords</Typography>
                            <Divider sx={{ my: 1 }} />
                        </Box>
                        <Box sx={{ ...scrollViewComanStyle }}>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>

    )
}
