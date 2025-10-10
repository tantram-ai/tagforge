import { Box, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

type premiumButtonProps = {
    children?: React.ReactNode,
    hidden?: boolean
}

export const PremiumBadge = ({ children, hidden = true }: premiumButtonProps) => {
    const navigate = useNavigate()
    if (hidden) {
        return (
            <>{children}</>
        )
    }
    return (
        <Box position="relative" display="inline-block" sx={{cursor:"pointer"}}>
            {children}
            {/* Floating Icon */}
            <Tooltip title="Subscription required" onClick={()=>navigate("/plans")}>
                <StarIcon
                    sx={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        fontSize: 18,
                        bgcolor: "warning.main",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px",
                        boxShadow: 1,
                    }}
                />
            </Tooltip>
        </Box>
    );
}
