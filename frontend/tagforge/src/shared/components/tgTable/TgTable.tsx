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

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const rows = [
    { kw: "ai meta tags", volume: 25000, cpc: "₹21.49", comp: 0.35, used: true },
    { kw: "meta tags", volume: 5000, cpc: "₹10.23", comp: 0.42, used: false },
    { kw: "seo", volume: 3000, cpc: "₹1.08", comp: 0.12, used: false },
    { kw: "meta tag generator", volume: 1000, cpc: "₹0.41", comp: 0.25, used: true },
  ];

export const TgTable=()=>{
  return (
    <TableContainer component={Paper}>
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