import React from "react";
import {
    Box,
    Card,
    Chip,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

type SeoStrategyOverviewProps = {
    data?: {
        opportunity: string;
        primaryIntent: string;
        journeyStage: string;
        contentType: string;
        wordCount: string;
        primaryKeyword: string;
        keywordVolume: string;
        difficulty: number;
        difficultyLabel: string;
        cpc: string;
        cpcLabel: string;
        clusterRole: string;
    };
};

export const StrategyOverview: React.FC<SeoStrategyOverviewProps> = ({
    data = {
        opportunity: "High Opportunity",
        primaryIntent: "Informational",
        journeyStage: "Awareness",
        contentType: "Guide Article",
        wordCount: "2,200 words",
        primaryKeyword: "3D printed home décor",
        keywordVolume: "12.5K Vol",
        difficulty: 64,
        difficultyLabel: "Hard",
        cpc: "$1.85",
        cpcLabel: "High Value",
        clusterRole: "Pillar Page",
    },
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const getDifficultyColor = (score: number) => {
        if (score >= 70) {
            return {
                bg: isDark ? "rgba(239, 68, 68, 0.18)" : "#FEE2E2",
                text: isDark ? "#FCA5A5" : "#DC2626",
            };
        }
        if (score >= 40) {
            return {
                bg: isDark ? "rgba(249, 115, 22, 0.18)" : "#FFEDD5",
                text: isDark ? "#FDBA74" : "#EA580C",
            };
        }
        return {
            bg: isDark ? "rgba(34, 197, 94, 0.18)" : "#DCFCE7",
            text: isDark ? "#86EFAC" : "#16A34A",
        };
    };

    const difficultyColors = getDifficultyColor(data.difficulty);

    const topItems = [
        {
            icon: <TrackChangesOutlinedIcon sx={{ fontSize: 22 }} />,
            iconColor: isDark ? "#FB923C" : "#F97316",
            label: "Primary Intent",
            value: data.primaryIntent,
            chipBg: isDark ? "rgba(59, 130, 246, 0.14)" : "#E8F0FE",
            chipColor: isDark ? "#93C5FD" : "#1D4ED8",
        },
        {
            icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: 22 }} />,
            iconColor: isDark ? "#60A5FA" : "#2563EB",
            label: "Journey Stage",
            value: data.journeyStage,
            chipBg: isDark ? "rgba(59, 130, 246, 0.14)" : "#E8F0FE",
            chipColor: isDark ? "#93C5FD" : "#1D4ED8",
        },
        {
            icon: <DescriptionOutlinedIcon sx={{ fontSize: 22 }} />,
            iconColor: isDark ? "#60A5FA" : "#2563EB",
            label: "Content Type",
            value: data.contentType,
        },
        {
            icon: <EditNoteOutlinedIcon sx={{ fontSize: 22 }} />,
            iconColor: isDark ? "#60A5FA" : "#2563EB",
            label: "Word Count",
            value: data.wordCount,
        },
    ];

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(37, 99, 235, 0.18)"
                    }`,
                background: isDark
                    ? "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(17,24,39,0.98) 100%)"
                    : "linear-gradient(180deg, #FFFFFF 0%, #FAFCFF 100%)",
                boxShadow: isDark
                    ? "0 8px 30px rgba(0,0,0,0.28)"
                    : "0 8px 30px rgba(37, 99, 235, 0.08)",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1.5,
                }}
            >
                <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            bgcolor: isDark
                                ? "rgba(59, 130, 246, 0.16)"
                                : "rgba(37, 99, 235, 0.08)",
                            color: isDark ? "#93C5FD" : "#2563EB",
                        }}
                    >
                        <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1rem", sm: "1.125rem" },
                            color: "text.primary",
                        }}
                    >
                        SEO Strategy Overview
                    </Typography>
                </Stack>

                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        color: isDark ? "#4ADE80" : "#15803D",
                    }}
                >
                    {data.opportunity}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: "divider" }} />

            {/* Top Grid */}
            <Box
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2.5,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                }}
            >
                {topItems.map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
                        <Box sx={{ color: item.iconColor, mt: 0.25 }}>{item.icon}</Box>

                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 500,
                                    mb: 0.6,
                                }}
                            >
                                {item.label}
                            </Typography>

                            {item.chipBg ? (
                                <Chip
                                    label={item.value}
                                    size="small"
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        bgcolor: item.chipBg,
                                        color: item.chipColor,
                                        height: 28,
                                        "& .MuiChip-label": {
                                            px: 1.25,
                                        },
                                    }}
                                />
                            ) : (
                                <Typography
                                    sx={{
                                        color: "text.primary",
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                ))}
            </Box>

            <Divider sx={{ borderColor: "divider" }} />

            {/* Bottom Grid */}
            <Box
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2.5,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "2fr 1fr 1fr 1fr",
                    },
                    gap: 2,
                }}
            >
                {/* Primary Keyword */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.8 }}
                    >
                        Primary Keyword
                    </Typography>

                    <Typography
                        sx={{
                            color: isDark ? "#93C5FD" : "#1D4ED8",
                            fontWeight: 800,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                            lineHeight: 1.3,
                            mb: 1,
                        }}
                    >
                        “{data.primaryKeyword}”
                    </Typography>

                    <Chip
                        label={data.keywordVolume}
                        size="small"
                        sx={{
                            borderRadius: 2,
                            fontWeight: 700,
                            bgcolor: isDark ? "rgba(34, 197, 94, 0.16)" : "#DCFCE7",
                            color: isDark ? "#86EFAC" : "#166534",
                            height: 28,
                        }}
                    />
                </Box>

                {/* Difficulty */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.8 }}
                    >
                        Difficulty
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Chip
                            label={`${data.difficulty}/100`}
                            size="small"
                            sx={{
                                borderRadius: 2,
                                fontWeight: 800,
                                bgcolor: difficultyColors.bg,
                                color: difficultyColors.text,
                                height: 30,
                            }}
                        />
                        <Typography
                            sx={{
                                color: difficultyColors.text,
                                fontWeight: 700,
                            }}
                        >
                            {data.difficultyLabel}
                        </Typography>
                    </Stack>
                </Box>

                {/* CPC */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.8 }}
                    >
                        CPC
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography
                            sx={{
                                color: "text.primary",
                                fontWeight: 800,
                                fontSize: { xs: "1.15rem", sm: "1.35rem" },
                            }}
                        >
                            {data.cpc}
                        </Typography>
                        <Typography
                            sx={{
                                color: isDark ? "#4ADE80" : "#15803D",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                            }}
                        >
                            {data.cpcLabel}
                        </Typography>
                    </Stack>
                </Box>

                {/* Cluster Role */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 500, mb: 0.8 }}
                    >
                        Cluster Role
                    </Typography>

                    <Chip
                        label={data.clusterRole}
                        size="small"
                        sx={{
                            borderRadius: 2,
                            fontWeight: 700,
                            bgcolor: isDark ? "rgba(168, 85, 247, 0.16)" : "#F3E8FF",
                            color: isDark ? "#D8B4FE" : "#7E22CE",
                            height: 30,
                        }}
                    />
                </Box>
            </Box>
        </Card>
    );
};

