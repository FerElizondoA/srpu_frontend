import {
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../../queries";
import { VehiculoDePago } from "./VehiculoDePago";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

interface Head {
  label: string;
}

interface HeadSelect {
  label: string;
}

const CatalogoGarantiaPago: HeadSelect[] = [
  {
    label: "No aplica",
  },
  {
    label: "Pago 1",
  },
  {
    label: "Pago 2",
  },
];

const headsAF: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la Inversión",
  },
  {
    label: "Inversión Pública Productiva",
  },
  {
    label: "Periodo de Administración",
  },
  {
    label: "Gastos Adicionales",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Descripcion",
  },
  {
    label: "Monto",
  },
  {
    label: "Periodo de Financiamiento (Meses)",
  },
  {
    label: "Saldo Vigente",
  },
  {
    label: "Monto Gastos Adicionales",
  },
];

const headFP: Head[] = [
  {
    label: "Tipo de fuente de pago",
  },
  {
    label: "Fuente de pago",
  },
  {
    label: "% Asignado del ingreso o fondo al fideicomiso",
  },
  {
    label:
      "% Acumulado de afectación del gobierno del estado a los mecanismos de pago / 100",
  },
  {
    label: "% De afectación del gobierno del estado / 100 del ingreso o fondo",
  },
  {
    label: "% Afectado al fideiomiso",
  },
  {
    label: "% Acumulado de afectación a los mecanismos de pago",
  },
  {
    label:
      "% Asignado al financiamiento u obligación respecto de lo fideicomitido",
  },
  {
    label:
      "% Asignado al financiamiento u obligaciónes respecto del ingreso o fondo",
  },
  {
    label: "% Acumulado de la asignación a las obligaciones",
  },
  {
    label: "Acciones",
  },
];

export function AsignarFuente() {

  const garantiaPago: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.garantiaPago
  );

  const changeGarantiaPago: Function = useLargoPlazoStore(
    (state) => state.changeGarantiaPago
  );
  return (
    <Grid
      container
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
    >
       <Grid>
        <Divider sx={queries.bold_text}>GARANTÍA DE PAGO</Divider>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={4}
      >
        <Grid xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Tipo de garantía de pago
          </InputLabel>
          <Select
            fullWidth
            variant="standard"
            value={garantiaPago}
            onChange={(e, text) => {
              changeGarantiaPago(e);
            }}
          >
            {CatalogoGarantiaPago.map((item, index) => (
              <MenuItem key={index} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid>
        <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
      </Grid>

      <Grid container
        sx={{
          display:"flex",
          //...queries.fuentePagoApartados,
          width: "100%",
          // display:"flex",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Clasificación</InputLabel>
          <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
              <MenuItem key={index}>{item.label}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Tipo de fuente</InputLabel>
          <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
              <MenuItem key={index}>{item.label}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Fuente de pago</InputLabel>
          <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
              <MenuItem key={index}>{item.label}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Respecto a: </InputLabel>
          <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
              <MenuItem key={index}>{item.label}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid mt={1} width={"100%"} display={"flex"} justifyContent={"center"}>
        <Paper sx={{ ...queries.tablaAsignarFuente }}>
          <TableContainer sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".5vw",
              height: ".5vh",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headFP.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography
                        sx={{
                          fontSize: ".7rem",
                          fontFamily: "MontserratRegular",
                        }}
                      >{head.label}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
