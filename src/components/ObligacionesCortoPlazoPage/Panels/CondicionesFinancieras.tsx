import * as React from "react"

import {
    Grid,
    Table,
    TableBody,
    TableSortLabel,
    TableContainer,
    TableHead,
    Checkbox
} from "@mui/material";

import { ReactNode } from 'react';
import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";
import { StyledTableCell, StyledTableRow, ConfirmButton, DeleteButton } from "../../CustomComponents";

// dummy data

interface Data {
    isSelected: boolean;
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
        id: 'isSelected',
        isNumeric: false,
        label: "Selección"
    },
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
        new Date(2023, 2, 14), // AÑO - MES - DÍA
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

export class CondicionesFinancieras extends React.Component{

  state = {
    openAgregarCondicion: false
  }

  constructor(props: any){
    super(props);
    this.changeOpenAgregarState.bind(this);
  }

  changeOpenAgregarState = (open: boolean) => {
    this.setState({openAgregarCondicion: open});
  }

  render(): ReactNode {
    return (
      <Grid container direction="column">
        <Grid item>
          <TableContainer sx={{ minHeight: "100%" }}>
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
                    <StyledTableCell padding="checkbox">
                      <Checkbox />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.dispositionDate.toLocaleDateString("en-GB")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {"$" + row.dispositionAmount.toString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.capitalPaymentDate.toLocaleDateString("en-GB")}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.capitalPaymentRange}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.capitalPaymentDate.toLocaleDateString("en-GB")}
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

        <Grid item container position="fixed" sx={{ top: "auto", bottom: 0 }}>
          <Grid item md={6}lg={6}>
            <ConfirmButton
              variant="outlined"
              onClick={() =>
                this.changeOpenAgregarState(!this.state.openAgregarCondicion)
              }
            >
              AGREGAR
            </ConfirmButton>
            <AgregarCondicionFinanciera
              handler={this.changeOpenAgregarState}
              openState={this.state.openAgregarCondicion}
            />
          </Grid>
          <Grid item md={6} lg={6}>
            <DeleteButton variant="outlined">ELIMINAR</DeleteButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}