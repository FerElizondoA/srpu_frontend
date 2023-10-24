import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { TipoMovimientoMandatoDeudor } from "../../../store/Mandatos/mandato";

interface HeadLabels {
  label: string;
}

const heads: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de mandante",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Fuente de pago",
  },
  {
    label: "% del ingreso o fondo correspondiente al gobierno del estado",
  },
  {
    label: "% del ingreso o fondo correspondiente a los municipios",
  },
  {
    label: "% del ingreso correspondiente al organismo",
  },
  {
    label: "% de asignación del fondo o ingreso correspondiente al municipio",
  },
  {
    label:
      "% afectado al mandato del ingreso o fondo correspondiente al gobierno del estado",
  },
  {
    label: "% de afectacion del gobierno del estado /100 del fondo o ingreso",
  },
  {
    label:
      "% acumulado de afectacion del gobierno del estado a los mecanismos de pago /100",
  },
  {
    label:
      "% afectado al mandato del ingreso o fondo correspondiente al municipio",
  },
  {
    label:
      "% acumulado de afectación del municipio a los mecanismos de pago /% asignado al municipio",
  },
  {
    label: "% afectado al mandato del ingreso correspondiente al organismo",
  },
  {
    label:
      "% acumulado de afectación del organismo a los mecanismos de pago /100 del ingreso",
  },
  {
    label: "",
  },
];

export function TipoDeMovimiento() {
  const tipoMovimientoMandato: TipoMovimientoMandatoDeudor = useMandatoStore(
    (state) => state.tipoMovimientoMandato
  );

  const tablaTipoMovimiento: TipoMovimientoMandatoDeudor[] = useMandatoStore(
    (state) => state.tablaTipoMovimientoMandatoDeudor
  );

  const setTipoMovimiento: Function = useMandatoStore(
    (state) => state.setTipoMovimiento
  );

  //catalogo
  const catalogoOrganismos: any = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<IFondoOIngreso> = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const addTipoMovimiento: Function = useMandatoStore(
    (state) => state.addTipoMovimiento
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  const removeTipoMovimiento: Function = useMandatoStore(
    (state) => state.removeTipoMovimiento
  );

  const cleanTipoMovimiento: Function = useMandatoStore(
    (state) => state.cleanTipoMovimiento
  );

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getFondosOIngresosInstrucciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [movimiento, setMovimiento] = useState("DEUDOR");

  const addPorcentaje: Function = useMandatoStore(
    (state) => state.addPorcentaje
  );

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"flex-start"}
        width={"100%"}
        sx={{
          "@media (min-width: 480px)": {
            height: "50rem",
          },

          "@media (min-width: 768px)": {
            height: "38rem",
          },

          "@media (min-width: 1140px)": {
            height: "38rem",
          },

          "@media (min-width: 1400px)": {
            height: "38rem",
          },

          "@media (min-width: 1870px)": {
            height: "50rem",
          },
        }}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
          alignItems={"center"}
        >
          <Grid
            item
            xs={10}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            display={"flex"}
            justifyContent={"center"}
          >
            <RadioGroup
              value={movimiento}
              onChange={(v) => {
                setMovimiento(v.target.value);
              }}
            >
              <FormControlLabel
                sx={{ ...queries.medium_text }}
                value="DEUDOR"
                control={<Radio />}
                label="Alta de deudor"
              />
              <FormControlLabel
                sx={{ ...queries.medium_text }}
                value="BENEFICIARIO"
                control={<Radio />}
                label="Alta de beneficiario"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de ente público obligado
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoTipoEntePublicoObligado}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography sx={{ ...queries.medium_text }}>
                      {option.Descripcion}
                    </Typography>
                  </li>
                );
              }}
              value={tipoMovimientoMandato.tipoEntePublicoObligado}
              onChange={(event, text) => {
                setTipoMovimiento({
                  ...tipoMovimientoMandato,
                  tipoEntePublicoObligado: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={{ ...queries.medium_text }}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion ===
                  "No aplica" ||
                /^[\s]*$/.test(
                  tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion
                )
              }
              fullWidth
              options={catalogoOrganismos.filter(
                (td: any) =>
                  td.IdTipoEntePublico ===
                  tipoMovimientoMandato.tipoEntePublicoObligado.Id
              )}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                setTipoMovimiento({
                  ...tipoMovimientoMandato,
                  mandatario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                });
              }}
              value={tipoMovimientoMandato.mandatario}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Id === value.Id || value.Descripcion === ""
              }
            />
          </Grid>
        </Grid>

        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Tipo de fuente
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFuente}
              value={tipoMovimientoMandato.tipoFuente}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                setTipoMovimiento({
                  ...tipoMovimientoMandato,
                  tipoFuente: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fondo o ingreso
            </InputLabel>
            <Autocomplete
              disabled={tipoMovimientoMandato.tipoFuente?.Id === ""}
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFondosOIngresos?.filter(
                (td) => td.TipoDeFuente === tipoMovimientoMandato.tipoFuente?.Id
              )}
              value={tipoMovimientoMandato.fondoIngreso}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                setTipoMovimiento({
                  ...tipoMovimientoMandato,
                  id: `${
                    tipoMovimientoMandato.tipoFuente?.Descripcion
                  }/${text.Descripcion.split(" ")
                    .map((word) =>
                      word.charAt(0) === word.charAt(0).toUpperCase()
                        ? word.charAt(0)
                        : ""
                    )
                    .join("")}/${tablaTipoMovimiento?.length + 1}`,
                  fondoIngreso: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                    TipoDeFuente: text.TipoDeFuente,
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
        </Grid>

        <Grid
          height={"4rem"}
          display={"flex"}
          justifyContent={"center"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={ButtonTheme}>
            <Button
              disabled={
                tipoMovimientoMandato.tipoEntePublicoObligado.Id === "" ||
                tipoMovimientoMandato.mandatario.Id === "" ||
                tipoMovimientoMandato.tipoFuente.Id === "" ||
                tipoMovimientoMandato.fondoIngreso.Id === ""
              }
              sx={{
                ...queries.buttonContinuar,
                width: "15vh",
              }}
              onClick={() => {
                addTipoMovimiento({
                  id: tipoMovimientoMandato.id,
                  tipoEntePublicoObligado:
                    tipoMovimientoMandato.tipoEntePublicoObligado,
                  mandatario: tipoMovimientoMandato.mandatario,
                  tipoFuente: tipoMovimientoMandato.tipoFuente,
                  fondoIngreso: tipoMovimientoMandato.fondoIngreso,
                  fondoIngresoGobiernoEstatal:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? tipoMovimientoMandato.tipoFuente.Descripcion.toLowerCase() ===
                        "participaciones"
                        ? "80.00"
                        : "100.00"
                      : "",
                  fondoIngresoMunicipios:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipios"
                      ? tipoMovimientoMandato.tipoFuente.Descripcion.toLowerCase() ===
                        "participaciones"
                        ? "20.00"
                        : ""
                      : "",
                  fondoIngresoAsignadoMunicipio:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipios"
                      ? "5.00"
                      : "",
                  ingresoOrganismo:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "municipios" ||
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "gobierno estatal"
                      ? "0.00"
                      : "",
                  fondoIngresoAfectadoXGobiernoEstatal:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? ""
                      : "",
                  afectacionGobiernoEstatalEntre100:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? "0.00"
                      : "",
                  acumuladoAfectacionGobiernoEstatalEntre100:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? "0.00"
                      : "",
                  fondoIngresoAfectadoXMunicipio:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipios"
                      ? ""
                      : "",
                  acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipios"
                      ? "0.00"
                      : "",
                  ingresoAfectadoXOrganismo:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "municipios" ||
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "gobierno estatal"
                      ? ""
                      : "",
                  acumuladoAfectacionOrganismoEntre100:
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "municipios" ||
                    tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "gobierno estatal"
                      ? "0.00"
                      : "",
                });
                cleanTipoMovimiento();
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
        </Grid>

        <Grid
          width={"100%"}
          height={"30rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Paper sx={{ width: "95%", height: "100%" }}>
            <TableContainer
              sx={{
                height: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  height: "1vh",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#AF8C55",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {heads.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {head.label}
                        </Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaTipoMovimiento.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.id}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.tipoEntePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.mandatario.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.tipoFuente.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoGobiernoEstatal}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoMunicipios}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoAsignadoMunicipio}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.ingresoOrganismo}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "gobierno estatal" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                              onChange={(v) => {
                                if (Number(v.target.value) <= 100.0) {
                                  addPorcentaje(index, row, {
                                    columna:
                                      "fondoIngresoAfectadoXGobiernoEstatal",
                                    porcentaje: v.target.value,
                                  });
                                }
                              }}
                            />
                          )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.afectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "municipios" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                if (Number(v.target.value) <= 100.0) {
                                  addPorcentaje(index, row, {
                                    columna: "fondoIngresoAfectadoXMunicipio",
                                    porcentaje: v.target.value,
                                  });
                                }
                              }}
                            />
                          )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {
                              row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                            }
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                            "gobierno estatal" &&
                            row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                              "municipios" && (
                              <TextField
                                inputProps={{
                                  sx: {
                                    fontSize: "0.7rem",
                                  },
                                }}
                                size="small"
                                value={row?.ingresoAfectadoXOrganismo}
                                onChange={(v) => {
                                  if (Number(v.target.value) <= 100.0) {
                                    addPorcentaje(index, row, {
                                      columna: "ingresoAfectadoXOrganismo",
                                      porcentaje: v.target.value,
                                    });
                                  }
                                }}
                              />
                            )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionOrganismoEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeTipoMovimiento(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
