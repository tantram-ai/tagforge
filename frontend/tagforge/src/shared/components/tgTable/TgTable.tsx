import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TgSkeletonLoader } from '..';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



type TgTableProps = {
  keywordList: any
  fetchingKeywords: boolean
  onSelect: any
  highlightRow?: any
}

export const TgTable = ({ keywordList = [], fetchingKeywords = false, onSelect, highlightRow }: TgTableProps) => {
  if (fetchingKeywords) {
    return <TgSkeletonLoader
      columns={4} />
  } else
    return (
      <TableContainer component={Paper} sx={{
        overflowX: "auto",
        // 🔹 Custom horizontal & vertical scrollbars
        "&::-webkit-scrollbar": {
          height: "2px", // horizontal scrollbar height
          width: "2px",  // vertical scrollbar width
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        // Firefox support
        // scrollbarWidth: "thin",
        // scrollbarColor: "#888 transparent",
      }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Keyword</StyledTableCell>
              <StyledTableCell align="right">Vol</StyledTableCell>
              <StyledTableCell align="right">CPC</StyledTableCell>
              <StyledTableCell align="right">comp</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keywordList.map((row: any) => (
              <TableRow key={row.keyword} onClick={() => onSelect(row)} sx={{ backgroundColor: () => highlightRow(row.keyword) ? "#90caf9" : "default", cursor: 'pointer' }}>
                <TableCell component="th" scope="row">
                  {row.keyword}
                </TableCell>
                <TableCell align="right">{row.search_volume || 0}</TableCell>
                <TableCell align="right">{row.cpc || 0}</TableCell>
                <TableCell align="right">{row.competition || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}