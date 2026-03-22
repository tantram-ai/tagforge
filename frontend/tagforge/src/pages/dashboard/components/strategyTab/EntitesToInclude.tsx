import React from "react";
import {
    Box,
    Card,
    Chip,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

type EntitiesToIncludeProps = {
    title?: string;
    entities?: string[];
    visibleCount?: number;
};

export const EntitiesToInclude: React.FC<EntitiesToIncludeProps> = ({
    title = "Entities to Include",
    entities = [
        "3D Printing",
        "Home Decor",
        "Interior Design",
        "Sustainable Living",
        "Customizable",
        "Minimalist Decor",
        "Eco-Friendly Materials",
        "Modern Aesthetics",
        "Personalized Gifts",
        "Unique Home Accessories",
        "Functional Decor",
        "Handmade Style",
        "Artistic Designs",
    ],
    visibleCount = 5,
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const visibleEntities = entities.slice(0, visibleCount);
    const remainingCount = Math.max(entities.length - visibleCount, 0);

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(37, 99, 235, 0.12)"
                    }`,
                background: isDark
                    ? "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(17,24,39,0.98) 100%)"
                    : "linear-gradient(180deg, #FFFFFF 0%, #FAFCFF 100%)",
                boxShadow: isDark
                    ? "0 8px 24px rgba(0,0,0,0.24)"
                    : "0 8px 24px rgba(15, 23, 42, 0.05)",
                p: { xs: 2, sm: 2.5 },
                mt:2
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ mb: 2 }}
            >
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
                        color: isDark ? "#93C5FD" : "#1D4ED8",
                    }}
                >
                    <GridViewRoundedIcon sx={{ fontSize: 18 }} />
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                        color: "text.primary",
                    }}
                >
                    {title}
                </Typography>
            </Stack>

            {/* Chips */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.25,
                }}
            >
                {visibleEntities.map((entity, index) => (
                    <Chip
                        key={`${entity}-${index}`}
                        label={entity}
                        size="medium"
                        sx={{
                            height: 38,
                            borderRadius: 2.5,
                            px: 0.5,
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: "text.primary",
                            bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#F8FAFC",
                            border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(148, 163, 184, 0.22)"
                                }`,
                            "& .MuiChip-label": {
                                px: 1.25,
                            },
                            "&:hover": {
                                bgcolor: isDark ? "rgba(255,255,255,0.08)" : "#F1F5F9",
                            },
                        }}
                    />
                ))}

                {remainingCount > 0 && (
                    <Chip
                        label={`+${remainingCount} more`}
                        size="medium"
                        variant="outlined"
                        sx={{
                            height: 38,
                            borderRadius: 2.5,
                            px: 0.5,
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: isDark ? "#93C5FD" : "#2563EB",
                            bgcolor: isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(37, 99, 235, 0.04)",
                            border: `1px dashed ${isDark ? "rgba(96, 165, 250, 0.35)" : "rgba(37, 99, 235, 0.25)"
                                }`,
                            "& .MuiChip-label": {
                                px: 1.25,
                            },
                            "&:hover": {
                                bgcolor: isDark
                                    ? "rgba(59, 130, 246, 0.12)"
                                    : "rgba(37, 99, 235, 0.08)",
                            },
                        }}
                    />
                )}
            </Box>
        </Card>
    );
};
