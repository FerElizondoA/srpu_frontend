/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { IDeudorFideicomiso } from "../../../store/Fideicomiso/fideicomiso";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

interface HeadSelect {
  Label: string;
}

const headFP: HeadSelect[] = [
  {
    Label: "Tipo de fuente de pago",
  },
  {
    Label: "Fuente de pago",
  },
  {
    Label: "% Asignado del ingreso o fondo al fideicomiso",
  },
  {
    Label:
      "% Acumulado de afectación del gobierno del estado a los mecanismos de pago / 100",
  },
  {
    Label: "% De afectación del gobierno del estado / 100 del ingreso o fondo",
  },
  {
    Label: "% Afectado al fideicomiso",
  },
  {
    Label: "% Acumulado de afectación a los mecanismos de pago",
  },
  {
    Label:
      "% Asignado al financiamiento u obligación respecto de lo fideicomitido",
  },
  {
    Label:
      "% Asignado al financiamiento u obligaciónes respecto del ingreso o fondo",
  },
  {
    Label: "% Acumulado de la asignación a las obligaciones",
  },
  {
    Label: " ",
  },
];

export function AsignarFuente() {
  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );

  const garantiaPago: string = useLargoPlazoStore(
    (state) => state.garantiaPago
  );
  const changeGarantiaPago: Function = useLargoPlazoStore(
    (state) => state.changeGarantiaPago
  );

  const getTiposDeFuente: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );
  const getFuentesPago: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );
  const getSumaPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.getSumaPorcentajeAcumulado
  );

  const catalogoTiposDeFuente: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );
  const catalogoFuentesDePago: IFondoOIngreso[] = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );
  const tablaAsignarFuente: IDeudorFideicomiso[] = useLargoPlazoStore(
    (state) => state.tablaAsignarFuente
  );

  const setTablaAsignarFuente: Function = useLargoPlazoStore(
    (state) => state.setTablaAsignarFuente
  );

  const addPorcentaje: Function = useLargoPlazoStore(
    (state) => state.addPorcentaje
  );

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const [filtro, setFiltro] = useState({
    Clasificacion: { Descripcion: "" },
    TipoFuente: { Id: "", Descripcion: "" },
    FuentePago: { Id: "", Descripcion: "" },
    RespectoA: { Descripcion: "" },
  });

  useEffect(() => {
    getTiposDeFuente();
    getFuentesPago();
    getSumaPorcentajeAcumulado(mecanismoVehiculoPago.MecanismoPago);
  }, []);

  return (
    <Grid
      container
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Grid mt={2}>
        <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
      </Grid>

      <Grid
        container
        height={{ xs: "20rem", sm: "4rem" }}
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Clasificación</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={[{ Descripcion: "Fuente de Pago" }]}
            value={filtro.Clasificacion}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                Clasificacion: {
                  Descripcion: text?.Descripcion || "",
                },
                TipoFuente: { Id: "", Descripcion: "" },
                FuentePago: { Id: "", Descripcion: "" },
                RespectoA: { Descripcion: "" },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Tipo de Fuente</InputLabel>
          <Autocomplete
            disabled={filtro.Clasificacion.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={filtro.TipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                TipoFuente: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },

                FuentePago: { Id: "", Descripcion: "" },
                RespectoA: { Descripcion: "" },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Fuente de Pago</InputLabel>
          <Autocomplete
            disabled={filtro.TipoFuente.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFuentesDePago?.filter(
              (td) => td.TipoDeFuente === filtro.TipoFuente?.Id
            )}
            value={filtro.FuentePago}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                FuentePago: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                RespectoA: { Descripcion: "" },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Respecto A</InputLabel>
          <Autocomplete
            disabled={filtro.FuentePago.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={[
              { Descripcion: "Fondo" },
              { Descripcion: "Fideicomitido" },
            ]}
            value={filtro.RespectoA}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                RespectoA: {
                  Descripcion: text?.Descripcion || "",
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          display={"flex"}
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
          xs={10}
          sm={5}
          md={5}
          lg={1}
          xl={1}
        >
          <Button
            disabled={filtro.RespectoA.Descripcion === ""}
            onClick={() => {
              setTablaAsignarFuente(
                JSON.parse(mecanismoVehiculoPago.TipoMovimiento).filter(
                  (i: IDeudorFideicomiso) =>
                    i.tipoFuente.Descripcion ===
                      filtro.TipoFuente.Descripcion &&
                    i.fondoIngreso.Descripcion === filtro.FuentePago.Descripcion
                )
              );
              setFiltro({
                Clasificacion: {
                  Descripcion: "",
                },
                TipoFuente: { Id: "", Descripcion: "" },
                FuentePago: { Id: "", Descripcion: "" },
                RespectoA: { Descripcion: "" },
              });
            }}
            sx={queries.buttonContinuar}
          >
            Aceptar
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        mt={1}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
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
            }}
          >
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
                      >
                        {head.Label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaAsignarFuente.map(
                  (movimiento: IDeudorFideicomiso, index: number) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {movimiento.tipoFuente.Descripcion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {movimiento.fondoIngreso.Descripcion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {movimiento.fondoIngresoGobiernoEstatal}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {movimiento.acumuladoAfectacionGobiernoEstatalEntre100}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {movimiento.afectacionGobiernoEstatalEntre100}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {movimiento.fondoIngresoAfectadoXGobiernoEstatal}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {sumaPorcentajeAcumulado.SumaAcumuladoEstado}
                      </StyledTableCell>
                      <StyledTableCell align="center">0.00</StyledTableCell>

                      <StyledTableCell align="center">
                        <TextField
                          disabled={
                            mecanismoVehiculoPago.MecanismoPago.toLowerCase() ===
                              "mandato" ||
                            mecanismoVehiculoPago.MecanismoPago.toLowerCase() ===
                              "instruccion irrevocable"
                          }
                          type="number"
                          inputProps={{
                            sx: {
                              fontSize: "0.7rem",
                            },
                          }}
                          size="small"
                          value={movimiento.fondoIngresoAfectadoXMunicipio}
                          onChange={(v) => {
                            let auxArray = [...tablaAsignarFuente];
                            let val = Number(v.target.value);

                            auxArray[index].fondoIngresoAfectadoXMunicipio =
                              val.toString();

                            addPorcentaje(auxArray);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell />
                      <StyledTableCell />
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid mt={4}>
        <Divider sx={queries.bold_text}>GARANTÍA DE PAGO</Divider>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
      >
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Tipo de garantía de pago
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={["No Aplica"]}
            value={garantiaPago}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  <Typography>{option}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => changeGarantiaPago(text)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ""
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
