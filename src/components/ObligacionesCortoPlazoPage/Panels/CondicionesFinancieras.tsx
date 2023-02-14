import * as React from 'react';
import { styled } from '@mui/material/styles'

import {
    Grid,
    Table,
    TableBody,
    TableSortLabel,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell"
import { queries } from '../../../queries';

// dummy data

interface Data {
    dispositionDate: Date;
    dispositionAmount: number;
    capitalPaymentDate: Date;
    capitalPaymentRange: string;
    iFirstPaymentDate: Date;
    iRate: number;
    comission: number;
}

interface Head {
    id: keyof Data;
    isNumeric: boolean;
    label: string;
}

const heads: readonly Head[] = [
    {
        id: 'dispositionDate',
        isNumeric: false,
        label: "Fecha de Disposición"
    },
    {
        id: 'dispositionAmount',
        isNumeric: true,
        label: "Importe de Disposición"
    },
    {
        id: 'capitalPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago Capital"
    },
    {
        id: 'capitalPaymentRange',
        isNumeric: false,
        label: "Periocidad de Pago Capital"
    },
    {
        id: 'iFirstPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago de Interés"
    },
    {
        id: 'iRate',
        isNumeric: true,
        label: "Tasa de Interés"
    },
    {
        id: 'comission',
        isNumeric: true,
        label: "Comisiones"
    },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6f7677",
    color: theme.palette.common.white,
    fontFamily: "MontserratMedium",
    fontSize: "1.8ch",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "MontserratRegular",
    fontSize: "1.5ch"
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

export function CondicionesFinancieras(){
    return (
      <Grid container direction="column">
        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
              {heads.map((head) =>(
                <StyledTableCell key={head.id}>
                    <TableSortLabel>
                        {head.label}
                    </TableSortLabel>
                </StyledTableCell>
              ))}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
}
/*


                    <TableCell>Fecha de Disposición</TableCell>
                    <TableCell>Importe de Disposición</TableCell>
                    <TableCell>Fecha de Primer Pago de Capital</TableCell>
                    <TableCell>Periocidad de Pago Capital</TableCell>
                    <TableCell>Fecha de Primer Pago de Interés</TableCell>
                    <TableCell>Tasa de Interés</TableCell>
                    <TableCell>Comisiones</TableCell>
*/