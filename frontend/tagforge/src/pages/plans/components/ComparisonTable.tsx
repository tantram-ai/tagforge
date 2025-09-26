import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";



type ComparisonTableProps = {
    getFinalPrice: () => any[],
}

export const ComparisonTable = ({ getFinalPrice }: ComparisonTableProps) => {
    return (
        <Box sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                Compare Features
            </Typography>
            <Paper elevation={3} sx={{ borderRadius: 3, overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Features</TableCell>
                            {getFinalPrice()?.map((plan) => (
                                <TableCell key={plan.name} align="center">
                                    {plan.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[
                            { label: "Projects Limit", key: "projectsLimit" },
                            { label: "Keywords / Project", key: "keywordsPerProject" },
                            { label: "AI Generations", key: "aiGenerations" },
                            { label: "Content Length", key: "maxContentLength" },
                        ].map((item) => (
                            <TableRow key={item.key}>
                                <TableCell>{item.label}</TableCell>
                                {getFinalPrice()?.map((plan) => (
                                    <TableCell key={plan.name} align="center">
                                        {plan[item.key as keyof typeof plan]===-1?"N":plan[item.key as keyof typeof plan]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        {[
                            { label: "SEO Content", key: "seoContent" },
                            { label: "Schema Support", key: "schemaSupport" },
                            { label: "Competitor Analysis", key: "competitorAnalysis" },
                            { label: "Team Support", key: "teamSupport" },
                        ].map((item) => (
                            <TableRow key={item.key}>
                                <TableCell>{item.label}</TableCell>
                                {getFinalPrice()?.map((plan) => (
                                    <TableCell key={plan.name} align="center">
                                        {plan.features[item.key as keyof typeof plan.features] ? (
                                            <CheckCircleIcon color="success" fontSize="small" />
                                        ) : (
                                            <CancelIcon color="error" fontSize="small" />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    )
}
