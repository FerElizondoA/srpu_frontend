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
    Button
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

////////////////////////////////////////////////////////

function createDummyData(
    dispositionDate: Date,
    dispositionAmount: number,
    capitalPaymentDate: Date,
    capitalPaymentRange: string,
    iFirstPaymentDate: Date,
    iRate: number,
    comission: number
){
    return {
        dispositionDate,
        dispositionAmount,
        capitalPaymentDate,
        capitalPaymentRange,
        iFirstPaymentDate,
        iRate,
        comission
    }
}

const rows = [
    createDummyData(
        new Date(2023, 2, 14),
        10000,
        new Date(2023, 3, 14),
        "1 año",
        new Date(2023, 4, 14),
        30,
        350.05
        ),
    createDummyData(
        new Date(2022, 1, 18),
        2000,
        new Date(2022, 2, 18),
        "5 meses",
        new Date(2022, 3, 18),
        25.23,
        370.05
        ),
    createDummyData(
        new Date(2021, 5, 23),
        4300,
        new Date(2021, 6, 23),
        "8 meses",
        new Date(2021, 7, 23),
        34.93,
        632.65
        )
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
    fontFamily: "MontserratMedium",
    fontSize: "1.8ch",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "MontserratRegular",
    fontSize: "1.5ch"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  fontFamily: "MontserratMedium",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function CondicionesFinancieras(){
    return (
      <Grid container direction="column">
        <Grid item>
          <TableContainer sx={{minHeight: "85vh"}}>
            <Table>
              <TableHead>
                {heads.map((head) => (
                  <StyledTableCell key={head.id}>
                    <TableSortLabel>{head.label}</TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.dispositionDate.toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {"$" + row.dispositionAmount.toString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {row.capitalPaymentDate.toLocaleDateString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {row.capitalPaymentRange}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {row.capitalPaymentDate.toLocaleDateString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {row.iRate + "%"}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {"$" + row.comission}
                    </StyledTableCell>
                    
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item container>
            <Grid item>
                <Button >AGREGAR</Button>
            </Grid>

            <Grid item>
                <Button>ELIMINAR</Button>
            </Grid>
        </Grid>
      </Grid>
    );
}