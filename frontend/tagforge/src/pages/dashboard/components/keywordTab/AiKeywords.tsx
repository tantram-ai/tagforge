import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
    useTheme,
    Divider,
    Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
type Keyword = {
    keyword: string;
    intent: string;
    type: string;
    funnelStage: string;
    businessRelevance: number; // 0–100
};

type Props = {
    keywords: Keyword[];
};

const getIntentColor = (intent: string) => {
    switch (intent.toLowerCase()) {
        case "informational":
            return "primary";
        case "transactional":
            return "success";
        case "navigational":
            return "secondary";
        default:
            return "default";
    }
};

const getFunnelColor = (stage: string) => {
    switch (stage.toLowerCase()) {
        case "awareness":
            return "info";
        case "consideration":
            return "warning";
        case "decision":
            return "success";
        default:
            return "default";
    }
};

export const AiKeywords: React.FC<Props> = ({ keywords }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
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
            <Box sx={{
                px: { xs: 2, sm: 3 },
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1.5,
            }}>
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
                        Keyword Suggestions
                    </Typography>
                </Stack>
            </Box>

            <Divider sx={{ borderColor: "divider" }} />

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Keyword</TableCell>
                            <TableCell>Intent</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Funnel</TableCell>
                            <TableCell align="right">Relevance</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {keywords.map((row, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(59,130,246,0.08)"
                                                : "rgba(37,99,235,0.05)",
                                    },
                                }}
                            >
                                <TableCell sx={{ fontWeight: 500 }}>
                                    {row.keyword || "-"}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={row.intent || "N/A"}
                                        size="small"
                                        color={getIntentColor(row.intent)}
                                        variant="soft"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {row.type || "-"}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={row.funnelStage || "N/A"}
                                        size="small"
                                        color={getFunnelColor(row.funnelStage)}
                                        variant="outlined"
                                    />
                                </TableCell>

                                <TableCell align="right" sx={{ minWidth: 120 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box width="100%">
                                            <LinearProgress
                                                variant="determinate"
                                                value={row.businessRelevance}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="caption">
                                            {row.businessRelevance}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}

                        {keywords.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No keywords available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </Card>
    );
};