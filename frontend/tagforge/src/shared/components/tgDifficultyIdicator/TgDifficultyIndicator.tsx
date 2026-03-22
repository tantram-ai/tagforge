import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

interface DifficultyChartProps {
    difficulty: number; // 0 - 100
}

const getColor = (value: number) => {
    if (value <= 30) return "#22C55E"; // Green (Easy)
    if (value <= 60) return "#F59E0B"; // Yellow (Medium)
    return "#EF4444"; // Red (Hard)
};

const getLabel = (value: number) => {
    if (value <= 30) return "Easy";
    if (value <= 60) return "Medium";
    return "Hard";
};

export const TgDifficultyIndicator: React.FC<DifficultyChartProps> = ({ difficulty }) => {
    const color = getColor(difficulty);
    const label = getLabel(difficulty);

    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress
                variant="determinate"
                value={100}
                size={30}
                thickness={3}
                sx={{ color: "#E5E7EB", position: "absolute" }}
            />

            <CircularProgress
                variant="determinate"
                value={difficulty}
                size={30}
                thickness={3}
                sx={{ color }}
            />

            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="subtitle2">
                    {difficulty}
                </Typography>
                {/* <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography> */}
            </Box>
        </Box>
    );
};
