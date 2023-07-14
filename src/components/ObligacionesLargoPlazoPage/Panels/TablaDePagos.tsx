import {
  Grid,
  Tabs,
  Tab,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

interface Head {
  label: string;
}

const headTP: readonly Head[] = [
  {
    label: "Fecha de Pago",
  },
  {
    label: "Descripción",
  },
  {
    label: "Pagos de capital",
  },
  {
    label: "Tasa de interés",
  },
  {
    label: "Comisión",
  },
  {
    label: "IVA",
  },
  {
    label: "Pago total",
  },
  {
    label: "Saldo insoluto",
  },
];

export function TablaDePagos() {
  return (
    <Grid
      container
      width={"100%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"10rem"}
    >
      <Grid width="90%" justifyContent={"center"} alignItems={"center"}>
        <Paper>
          <TableContainer
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {headTP.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
