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
    Box,
    Button
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell"
import { queries } from '../../../queries';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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
    const columns: GridColDef[] = [
      {
        field: "id",
        headerClassName: "header",
        headerName: "ID",
        width: 90,
      },
      {
        field: "dispositionDate",
        headerClassName: "header",
        headerName: "Fecha de Disposición",
        width: 200,
        editable: false,
      },
      {
        field: "dispositionAmount",
        headerClassName: "header",
        headerName: "Importe de Disposición",
        width: 200,
        editable: false,
      },
      {
        field: "capitalPaymentDate",
        headerClassName: "header",
        headerName: "Fecha de Primer Pago de Capital",
        width: 260,
        editable: false,
      },
      {
        field: "capitalPaymentRange",
        headerClassName: "header",
        headerName: "Periocidad de Pago Capital",
        width: 220,
        editable: false,
      },
      {
        field: "iFirstPaymentDate",
        headerClassName: "header",
        headerName: "Fecha de Primer Pago de Interés",
        width: 260,
        editable: false,
      },
      {
        field: "iRate",
        headerClassName: "header",
        headerName: "Tasa de Interés",
        width: 130,
        editable: false,
      },
      {
        field: "comission",
        headerClassName: "header",
        headerName: "Comisiones",
        width: 110,
        editable: false,
      },
    ];

    const rows = [
      {
        id: 1,
        dispositionDate: "14/02/2023",
        dispositionAmount: "$3000",
        capitalPaymentDate: "14/03/2023",
        capitalPaymentRange: "6 meses",
        iFirstPaymentDate: "14/03/2023",
        iRate: "%34.44",
        comission: "$234.67"
      },

      {
        id: 2,
        dispositionDate: "14/02/2023",
        dispositionAmount: "$3000",
        capitalPaymentDate: "14/03/2023",
        capitalPaymentRange: "5 meses",
        iFirstPaymentDate: "14/03/2023",
        iRate: "%34.44",
        comission: "$234.67"
      },
    ];
    return (
      <Grid container>
        <Grid
          item
          sx={{
            width: "100%",
            height: "1565%",
            "& .header": {
                fontFamily: "MontserratRegular"
            },
          }}
          lg={9.5}
        >
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
        <Grid item>
            <Button>100</Button>
        </Grid>
      </Grid>
    );
}