import React from "react";
import {
    Box,
    Card,
    LinearProgress,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RadarOutlinedIcon from "@mui/icons-material/RadarOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type SchemaCoverageSectionProps = {
    schemaData?: {
        title: string;
        items: string[];
        summaryText: string;
    };
    coverageData?: {
        title: string;
        percentage: number;
        coveredTopics: number;
        gaps: number;
        missingTopics: string[];
    };
}; export const RecommendedSchema: React.FC<SchemaCoverageSectionProps> = ({
    schemaData = {
        title: "Recommended Schema",
        items: ["Article", "Organization", "FAQPage", "Product", "BreadcrumbList"],
        summaryText: "5 schema types → Rich results eligible",
    },
    coverageData = {
        title: "Topical Coverage",
        percentage: 87,
        coveredTopics: 12,
        gaps: 2,
        missingTopics: ["3D printing process", "Materials used"],
    },
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const schemaCardBorder = isDark
        ? "rgba(251, 191, 36, 0.22)"
        : "rgba(245, 158, 11, 0.28)";

    const coverageCardBorder = isDark
        ? "rgba(59, 130, 246, 0.22)"
        : "rgba(37, 99, 235, 0.24)";

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                },
                gap: 2,
                mt:2
            }}
        >
            {/* Recommended Schema Card */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: { xs: 2, sm: 2.5 },
                    border: `1px solid ${schemaCardBorder}`,
                    background: isDark
                        ? "linear-gradient(180deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)"
                        : "linear-gradient(180deg, #FFFFFF 0%, #FFFCF5 100%)",
                    boxShadow: isDark
                        ? "0 8px 24px rgba(0,0,0,0.22)"
                        : "0 8px 24px rgba(245, 158, 11, 0.06)",
                    minHeight: 260,
                }}
            >
                {/* Header */}
                <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            bgcolor: isDark
                                ? "rgba(245, 158, 11, 0.14)"
                                : "rgba(245, 158, 11, 0.10)",
                            color: isDark ? "#FCD34D" : "#D97706",
                        }}
                    >
                        <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1rem", sm: "1.125rem" },
                            color: "text.primary",
                        }}
                    >
                        {schemaData.title}
                    </Typography>
                </Stack>

                {/* Schema Items */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                        },
                        gap: 1.4,
                        mb: 2.2,
                    }}
                >
                    {schemaData.items.map((item, index) => (
                        <Stack
                            key={`${item}-${index}`}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <CheckCircleRoundedIcon
                                sx={{
                                    fontSize: 18,
                                    color: isDark ? "#4ADE80" : "#16A34A",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    color: "text.primary",
                                }}
                            >
                                {item}
                            </Typography>
                        </Stack>
                    ))}
                </Box>

                {/* Bottom Info */}
                <Box
                    sx={{
                        mt: "auto",
                        borderRadius: 2.5,
                        px: 1.5,
                        py: 1.1,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: isDark
                            ? "rgba(245, 158, 11, 0.08)"
                            : "rgba(245, 158, 11, 0.08)",
                        border: `1px solid ${isDark ? "rgba(245, 158, 11, 0.18)" : "rgba(245, 158, 11, 0.16)"
                            }`,
                    }}
                >
                    <WarningAmberRoundedIcon
                        sx={{
                            fontSize: 18,
                            color: isDark ? "#FCD34D" : "#D97706",
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: isDark ? "#FDE68A" : "#B45309",
                        }}
                    >
                        {schemaData.summaryText}
                    </Typography>
                </Box>
            </Card>

            {/* Topical Coverage Card */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: { xs: 2, sm: 2.5 },
                    border: `1px solid ${coverageCardBorder}`,
                    background: isDark
                        ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.98) 100%)"
                        : "linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)",
                    boxShadow: isDark
                        ? "0 8px 24px rgba(0,0,0,0.22)"
                        : "0 8px 24px rgba(37, 99, 235, 0.06)",
                    minHeight: 260,
                }}
            >
                {/* Header */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
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
                                    ? "rgba(59, 130, 246, 0.14)"
                                    : "rgba(37, 99, 235, 0.08)",
                                color: isDark ? "#93C5FD" : "#1D4ED8",
                            }}
                        >
                            <RadarOutlinedIcon sx={{ fontSize: 18 }} />
                        </Box>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: "1rem", sm: "1.125rem" },
                                color: "text.primary",
                            }}
                        >
                            {coverageData.title}
                        </Typography>
                    </Stack>

                    {/* Circular Percentage Badge */}
                    <Box
                        sx={{
                            width: 58,
                            height: 58,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            border: `4px solid ${isDark ? "#22C55E" : "#16A34A"}`,
                            bgcolor: isDark ? "rgba(34, 197, 94, 0.08)" : "#FFFFFF",
                            boxShadow: isDark
                                ? "inset 0 0 0 3px rgba(255,255,255,0.02)"
                                : "inset 0 0 0 3px rgba(34, 197, 94, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                color: isDark ? "#86EFAC" : "#166534",
                            }}
                        >
                            {coverageData.percentage}%
                        </Typography>
                    </Box>
                </Stack>

                {/* Progress Bar */}
                <LinearProgress
                    variant="determinate"
                    value={coverageData.percentage}
                    sx={{
                        height: 12,
                        borderRadius: 999,
                        mb: 1.6,
                        bgcolor: isDark ? "rgba(148, 163, 184, 0.18)" : "#E5E7EB",
                        "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background: isDark
                                ? "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)"
                                : "linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)",
                        },
                    }}
                />

                {/* Coverage Summary */}
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        mb: 2.2,
                    }}
                >
                    {coverageData.coveredTopics} subtopics detailed{" "}
                    <Box component="span" sx={{ mx: 0.5 }}>
                        •
                    </Box>
                    {coverageData.gaps} gaps to fix
                </Typography>

                {/* Missing Topics Warning */}
                <Box
                    sx={{
                        borderRadius: 2.5,
                        px: 1.5,
                        py: 1.2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                        bgcolor: isDark
                            ? "rgba(245, 158, 11, 0.06)"
                            : "rgba(245, 158, 11, 0.06)",
                        border: `1px solid ${isDark ? "rgba(245, 158, 11, 0.16)" : "rgba(245, 158, 11, 0.14)"
                            }`,
                    }}
                >
                    <WarningAmberRoundedIcon
                        sx={{
                            fontSize: 18,
                            color: isDark ? "#FCD34D" : "#D97706",
                            mt: "2px",
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: isDark ? "#FDE68A" : "#92400E",
                        }}
                    >
                        Missing: “{coverageData.missingTopics.join(", ")}”
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};