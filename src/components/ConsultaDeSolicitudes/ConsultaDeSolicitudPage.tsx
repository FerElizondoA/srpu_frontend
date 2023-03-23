import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { queries } from "../../queries";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../CustomComponents";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface Data {
  Número_de_Solicitud: string;
  Monto_original_Contratado: number;
  Denominacíon: string;
  Estatus_de_la_solicitud: string;
  Tipo_de_solicitud: string;

  Tipo_de_ente_público_obligado: string;
  Institucion_financiera: string;
  Solicitante_autorizado: string;
  Cargo_de_solicitante: string;
}

interface Head {
  id: keyof Data;
  isNumeric: boolean;
  label: string;
}
const heads: readonly Head[] = [
  {
    id: "Número_de_Solicitud",
    isNumeric: false,
    label: "Número De Solicitud",
  },

  {
    id: "Monto_original_Contratado",
    isNumeric: true,
    label: "Monto original contratado",
  },

  {
    id: "Denominacíon",
    isNumeric: true,
    label: "Denominacíon",
  },

  {
    id: "Estatus_de_la_solicitud",
    isNumeric: true,
    label: "Estatus de la solicitud",
  },

  {
    id: "Tipo_de_solicitud",
    isNumeric: true,
    label: "Tipo de solicitud",
  },

  {
    id: "Tipo_de_ente_público_obligado",
    isNumeric: true,
    label: "Tipo de ente público obligado",
  },

  {
    id: "Institucion_financiera",
    isNumeric: true,
    label: "Institucion financiera",
  },

  {
    id: "Solicitante_autorizado",
    isNumeric: true,
    label: "Solicitante autorizado",
  },

  {
    id: "Cargo_de_solicitante",
    isNumeric: true,
    label: "Cargo de solicitante",
  },
];

function createDummyData(
  Número_de_Solicitud: string,
  Monto_original_Contratado: number,
  Denominacíon: string,
  Estatus_de_la_solicitud: string,
  Tipo_de_solicitud: string,
  Tipo_de_ente_público_obligado: string,
  Institucion_financiera: string,
  Solicitante_autorizado: string,
  Cargo_de_solicitante: string
) {
  return {
    Número_de_Solicitud,
    Monto_original_Contratado,
    Denominacíon,
    Estatus_de_la_solicitud,
    Tipo_de_solicitud,
    Tipo_de_ente_público_obligado,
    Institucion_financiera,
    Solicitante_autorizado,
    Cargo_de_solicitante,
  };
}

const rows = [
  createDummyData(
    "121-DC",
    10000000,
    "pesos",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Bvba Banorte empresarial",
    "Jesus Echeverria Rodrigues",
    "Tesorero del Estado de Nuevo Leon"
  ),
  createDummyData(
    "122-AB",
    35000000,
    "udis",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Santander Empresarial",
    "Marcelo Ebrad Martinez",
    "Secretaria de Finanzas de Jaurez"
  ),
  createDummyData(
    "121-DC",
    10000000,
    "pesos",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Bvba Banorte empresarial",
    "Jesus Echeverria Rodrigues",
    "Tesorero del Estado de Nuevo Leon"
  ),
  createDummyData(
    "122-AB",
    35000000,
    "udis",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Santander Empresarial",
    "Marcelo Ebrad Martinez",
    "Secretaria de Finanzas de Jaurez"
  ),
  createDummyData(
    "121-DC",
    10000000,
    "pesos",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Bvba Banorte empresarial",
    "Jesus Echeverria Rodrigues",
    "Tesorero del Estado de Nuevo Leon"
  ),
  createDummyData(
    "122-AB",
    35000000,
    "udis",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Santander Empresarial",
    "Marcelo Ebrad Martinez",
    "Secretaria de Finanzas de Jaurez"
  ),
  createDummyData(
    "121-DC",
    10000000,
    "pesos",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Bvba Banorte empresarial",
    "Jesus Echeverria Rodrigues",
    "Tesorero del Estado de Nuevo Leon"
  ),
  createDummyData(
    "122-AB",
    35000000,
    "udis",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Santander Empresarial",
    "Marcelo Ebrad Martinez",
    "Secretaria de Finanzas de Jaurez"
  ),
  createDummyData(
    "121-DC",
    10000000,
    "pesos",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Bvba Banorte empresarial",
    "Jesus Echeverria Rodrigues",
    "Tesorero del Estado de Nuevo Leon"
  ),
  createDummyData(
    "122-AB",
    35000000,
    "udis",
    "Aprobado",
    "Corto Plazo",
    "Municipio",
    "Santander Empresarial",
    "Marcelo Ebrad Martinez",
    "Secretaria de Finanzas de Jaurez"
  ),
  //createDummyData("prueba1", 10000000, ),
];

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "white",
//     color: theme.palette.common.black,
//     fontFamily: "MontserratMedium",
//     fontSize: "1.8ch",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontFamily: "MontserratRegular",
//     fontSize: "1.5ch",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   fontFamily: "MontserratMedium",
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

export function ConsultaDeSolicitudPage() {
  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid
        item
        //ml={window.innerWidth / 22}
        mt={5}
        mb={5}
        lg={12}
        display="center"
        justifyContent="center"
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            //alignItems: "center",
            width: 800,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar"
            //inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: "500px" }}>
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
                    {row.Número_de_Solicitud.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Monto_original_Contratado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Denominacíon.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Estatus_de_la_solicitud.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Tipo_de_solicitud.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Tipo_de_ente_público_obligado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Institucion_financiera.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Solicitante_autorizado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Cargo_de_solicitante.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
