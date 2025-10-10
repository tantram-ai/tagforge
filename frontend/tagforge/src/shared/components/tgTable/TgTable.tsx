import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const rows = [
  { kw: "ai meta tags", volume: 25000, cpc: "₹21.49", comp: 0.35, used: true },
  { kw: "meta tags", volume: 5000, cpc: "₹10.23", comp: 0.42, used: false },
  { kw: "seo", volume: 3000, cpc: "₹1.08", comp: 0.12, used: false },
  { kw: "meta tag generator", volume: 1000, cpc: "₹0.41", comp: 0.25, used: true },
];

export const TgTable = () => {
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
          {rows.map((row) => (
            <StyledTableRow key={row.kw}>
              <StyledTableCell component="th" scope="row">
                {row.kw}
              </StyledTableCell>
              <StyledTableCell align="right">{row.volume}</StyledTableCell>
              <StyledTableCell align="right">{row.cpc}</StyledTableCell>
              <StyledTableCell align="right">{row.comp}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}