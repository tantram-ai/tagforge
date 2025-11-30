import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import { TgHtmlEditor, TgSkeletonLoader } from '../../../shared/components'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useState } from 'react';
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { FloatingButton } from '../../../shared/components/floatingButton';

type contentTabProps = {
    suggestedKeywords: any
    handleSuggestedKeywordClick: any
    query: string
    selectedKeywords: [string]
    deselect: any
    onGenerate: any
    seoContent?: any
    fetchingContent?: boolean
    fetchingProjects?: boolean
    generatingKeywords?: any
    openKeywordTab:boolean
    setOpenKeywordTab:any
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


export const ContentTab = ({
    suggestedKeywords,
    handleSuggestedKeywordClick,
    query,
    selectedKeywords,
    deselect,
    onGenerate,
    seoContent,
    fetchingContent,
    fetchingProjects,
    generatingKeywords,
    openKeywordTab,
    setOpenKeywordTab
}: contentTabProps) => {

    const [value, setValue] = useState(seoContent);
    const editorRef = useRef<HTMLDivElement>(null);

    const downloadHtml = () => {
        const blob = new Blob([value], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "document.html";
        link.click();
    };

    const downloadWeb = () => {
        const win = window.open();
        if (win) {
            win.document.write(value);
            win.document.close();
        }
    };

    const downloadPdf = async () => {
        if (!editorRef.current) return;
        const canvas = await html2canvas(editorRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("document.pdf");
    };


    return (
        <>
            <Box mt={2}>
                {fetchingContent || fetchingProjects ?
                    <TgSkeletonLoader
                        columns={1}
                        rows={2} /> :
                    <>
                        {
                            !seoContent ?
                                <>
                                    <Box mx="auto" textAlign={"center"}>
                                        <Button variant="outlined" onClick={onGenerate}>Generate</Button>
                                        <Typography variant="subtitle1" mt={1}>Click on generate to get the SEO friendly content.</Typography>
                                    </Box>

                                </>
                                :
                                <>
                                    <Box display='flex' justifyContent="space-between" >
                                        <Box>
                                            <Button variant="outlined" size="small" onClick={onGenerate}>Regenrate</Button>
                                        </Box>
                                        <Box>
                                            <IconButton aria-label="delete" onClick={downloadHtml}>
                                                <HtmlIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={downloadPdf}>
                                                <PictureAsPdfIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={downloadWeb}>
                                                <LanguageOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <TgHtmlEditor
                                        value={value}
                                        setValue={setValue}
                                        editorRef={editorRef}
                                        initialHtml={seoContent} />
                                </>
                        }
                    </>

                }


            </Box>
            <Divider sx={{ my: 2 }} />
            <FloatingButton openKeywordTab={openKeywordTab} setOpenKeywordTab={setOpenKeywordTab}>
                <Grid container spacing={1}>
                    <Grid size={6}>
                        <Box sx={{ p: 1 }}>
                            <Box>
                                <Box>
                                    <Typography variant="subtitle1" textAlign="center">Suggested Keywords</Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                                <Box sx={{ ...scrollViewComanStyle }}>
                                    {fetchingProjects || generatingKeywords ?
                                        <TgSkeletonLoader
                                            columns={1}
                                            rows={3} /> :
                                        <>
                                            {suggestedKeywords?.length > 0 && suggestedKeywords?.map((item: any) => {
                                                return <Chip
                                                    label={item?.keyword}
                                                    sx={{ margin: '2px' }}
                                                    color={item?.keyword === query ? "primary" : "default"}
                                                    onClick={() => handleSuggestedKeywordClick(item)} />
                                            })}
                                        </>
                                    }
                                </Box>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid size={6}>
                        <Box sx={{ p: 1 }}>
                            <Box>
                                <Typography variant="subtitle1" textAlign="center" >Selected Keywords</Typography>
                                <Divider sx={{ my: 1 }} />
                            </Box>
                            <Box sx={{ ...scrollViewComanStyle }}>
                                {fetchingProjects ?
                                    <TgSkeletonLoader
                                        columns={1}
                                        rows={3} /> :
                                    <>
                                        {selectedKeywords?.length > 0 && selectedKeywords?.map((item: any) => {
                                            return <Chip
                                                label={item?.keyword}
                                                sx={{ margin: '2px' }}
                                                onDelete={() => deselect(item)} />
                                        })}
                                    </>
                                }

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </FloatingButton>
        </>

    )
}
