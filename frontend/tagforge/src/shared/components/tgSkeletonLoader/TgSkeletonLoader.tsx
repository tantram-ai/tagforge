import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
} from "@mui/material";

interface TgSkeletonLoaderProps {
    columns?: number;
    rows?: number;
    header?: boolean;
    cellHeight?: number;
    containerHeight?: number;
}

export const TgSkeletonLoader = ({
    columns = 5,
    rows = 5,
    header = true,
    cellHeight = 40,
    containerHeight = 350,
}: TgSkeletonLoaderProps) => {
    const columnArray = Array.from({ length: columns });
    const rowArray = Array.from({ length: rows });

    return (
        <TableContainer
            component={Paper}
            sx={{
                height: containerHeight,
                overflow: "hidden",
            }}
        >
            <Table stickyHeader>
                {header && (
                    <TableHead>
                        <TableRow>
                            {columnArray.map((_, index) => (
                                <TableCell key={index}>
                                    <Skeleton variant="text" width="60%" />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                )}

                <TableBody>
                    {rowArray.map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columnArray.map((_, colIndex) => (
                                <TableCell key={colIndex} sx={{ height: cellHeight }}>
                                    <Skeleton variant="rounded" width="100%" height={20} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};