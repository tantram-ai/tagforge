import { Fab, Box, Tooltip } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import CloseIcon from '@mui/icons-material/Close';

type FloatingButtonProps = {
    children: any,
    openKeywordTab:boolean,
    setOpenKeywordTab:any
}

export const FloatingButton = ({ children,openKeywordTab, setOpenKeywordTab }: FloatingButtonProps) => {

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 22,
                // right: '29.5%',
                right: '26%',

                zIndex: 10,
                // display: "flex",
                alignItems: "center",
                // gap: 1,
                transition: "all 0.3s ease",
            }}
        >
            <Box
                sx={{
                    width: "618px",
                    height: openKeywordTab ? "335px" : "0px",
                    opacity: openKeywordTab ? 1 : 0,
                    overflow: "hidden",
                    backgroundColor: "customBackground.cardBg",
                    boxShadow: '0px 0px 3.5px 0.5px #afafaf',
                    px: openKeywordTab ? 0.5 : 0,
                    py: 0.5,
                    borderRadius: "8px",
                    borderBottomRightRadius:"25px",
                    transition: "all 0.3s ease",
                    border: '2px solid  customBorders.cardBorder'
                }}
            >
                {children}
            </Box>
            <Fab
                color="primary"
                sx={{
                    width: 36,
                    height: 36,
                    transition: "all 0.3s ease",
                    position: "fixed",
                    bottom: 22,
                    right: '26%',
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,

                }}
                onClick={() => setOpenKeywordTab(!openKeywordTab)}
            >
                {openKeywordTab ?
                    <Tooltip title="Close" placement="top-start">
                        <CloseIcon fontSize="small" />
                    </Tooltip>
                    :
                    <Tooltip title="Kewords" placement="top-start">
                        <SegmentIcon fontSize="small" />
                    </Tooltip>

                }
            </Fab>
        </Box>
    );
}
