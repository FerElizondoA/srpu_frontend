import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
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
import {
  IBeneficiarioMandato,
  IDeudorMandato,
} from "../../../store/Mandatos/mandato";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

interface HeadLabels {
  label: string;
}

const heads: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Mandante",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado al Mandato del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado al Mandato del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label: "% Afectado al Mandato del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
  {
    label: "",
  },
];

export function TipoDeMovimientoMandato() {
  const tipoMovimiento: IDeudorMandato = useMandatoStore(
    (state) => state.tipoMovimiento
  );

  const beneficiario: IBeneficiarioMandato = useMandatoStore(
    (state) => state.beneficiario
  );

  const tablaTipoMovimiento: IDeudorMandato[] = useMandatoStore(
    (state) => state.tablaTipoMovimientoMandato
  );

  const setTipoMovimiento: Function = useMandatoStore(
    (state) => state.setTipoMovimiento
  );

  const setBeneficiario: Function = useMandatoStore(
    (state) => state.setBeneficiario
  );

  const idTipoMovimientoSelect: string = useMandatoStore(
    (state) => state.idTipoMovimientoSelect
  );

  const setIdTipoMovimientoSelect: Function = useMandatoStore(
    (state) => state.setIdTipoMovimientoSelect
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

  const ids: string[] = tablaTipoMovimiento.map((row) => {
    return row.id;
  });

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const buttonAgregar = () => {
    return (
      <ThemeProvider theme={ButtonTheme}>
        <Button
          disabled={
            tipoMovimiento.tipoEntePublicoObligado.Id === "" ||
            tipoMovimiento.mandatario.Id === "" ||
            tipoMovimiento.tipoFuente.Id === "" ||
            tipoMovimiento.fondoIngreso.Id === ""
          }
          sx={{
            ...queries.buttonContinuar,
            width: "15vh",
          }}
          onClick={() => {
            addTipoMovimiento({
              id: tipoMovimiento.id,
              tipoEntePublicoObligado: tipoMovimiento.tipoEntePublicoObligado,
              mandatario: tipoMovimiento.mandatario,
              tipoFuente: tipoMovimiento.tipoFuente,
              fondoIngreso: tipoMovimiento.fondoIngreso,
              fondoIngresoGobiernoEstatal:
                tipoMovimiento.tipoFuente.Descripcion.toLowerCase() ===
                "participaciones"
                  ? "80.00"
                  : "100.00",
              fondoIngresoMunicipios:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "municipio"
                  ? tipoMovimiento.tipoFuente.Descripcion.toLowerCase() ===
                    "participaciones"
                    ? "20.00"
                    : "0.00"
                  : "0.00",
              fondoIngresoAsignadoMunicipio:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "municipio"
                  ? "100.00"
                  : "0.00",
              ingresoOrganismo:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "municipio" &&
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "gobierno estatal"
                  ? "0.00"
                  : "0.00",
              fondoIngresoAfectadoXGobiernoEstatal:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "gobierno estatal"
                  ? ""
                  : "",
              afectacionGobiernoEstatalEntre100:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "gobierno estatal"
                  ? "0.00"
                  : "",
              acumuladoAfectacionGobiernoEstatalEntre100:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "gobierno estatal"
                  ? sumaPorcentajeAcumulado.SumaAcumuladoEstado
                  : "",
              fondoIngresoAfectadoXMunicipio:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "municipio"
                  ? "0"
                  : "0",
              acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                "municipio"
                  ? sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                  : "",

              ingresoAfectadoXOrganismo:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "municipio" &&
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "gobierno estatal"
                  ? ""
                  : "",
              acumuladoAfectacionOrganismoEntre100:
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "municipio" &&
                tipoMovimiento.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                  "gobierno estatal"
                  ? sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                  : "",
            });
            cleanTipoMovimiento();
          }}
        >
          Agregar
        </Button>
      </ThemeProvider>
    );
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      sx={{
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
      <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RadioGroup
          value={movimiento}
          onChange={(v) => {
            setMovimiento(v.target.value);
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            sx={{ ...queries.medium_text }}
            value="DEUDOR"
            control={<Radio />}
            label="Alta de Deudor"
          />
          <FormControlLabel
            sx={{ ...queries.medium_text }}
            value="BENEFICIARIO"
            control={<Radio />}
            label="Alta de Beneficiario"
          />
        </RadioGroup>
      </Grid>

      <Divider>
        <Typography
          sx={{
            ...queries.bold_text,
            color: "#af8c55 ",
          }}
        >
          Mandante
        </Typography>
      </Divider>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{ height: "10vh" }}
      >
        {movimiento === "BENEFICIARIO" ? (
          <Grid
            item
            xs={10}
            sm={5}
            md={5}
            lg={2}
            xl={2}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 2, sm: 4, md: 4, lg: 2 }
                : { xs: 0, sm: 0 }
            }
          >
            <InputLabel sx={queries.medium_text}>Id</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={ids}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    <Typography>{option}</Typography>
                  </li>
                );
              }}
              value={idTipoMovimientoSelect}
              onChange={(event, text) => {
                let row = tablaTipoMovimiento.filter((_) => _.id === text)[0];

                setIdTipoMovimientoSelect(text);
                setTipoMovimiento(row);
              }}
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
        ) : null}

        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 3 : 5}
          md={movimiento === "DEUDOR" ? 3 : 5}
          lg={movimiento === "DEUDOR" ? 3 : 2}
          xl={movimiento === "DEUDOR" ? 3 : 2}
          mb={
            movimiento === "BENEFICIARIO"
              ? { xs: 2, sm: 0, md: 0 }
              : { xs: 4, sm: 0 }
          }
        >
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público Obligado
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
            value={tipoMovimiento.tipoEntePublicoObligado}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
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

        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 3 : 5}
          md={movimiento === "DEUDOR" ? 3 : 5}
          lg={movimiento === "DEUDOR" ? 3 : 2}
          xl={movimiento === "DEUDOR" ? 3 : 3}
          mb={
            movimiento === "BENEFICIARIO" ? { xs: 0, sm: 0, md: 0 } : { xs: 0 }
          }
        >
          <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              tipoMovimiento.tipoEntePublicoObligado.Descripcion ===
                "No Aplica" ||
              /^[\s]*$/.test(tipoMovimiento.tipoEntePublicoObligado.Descripcion)
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) =>
                td.IdTipoEntePublico ===
                tipoMovimiento.tipoEntePublicoObligado.Id
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
                ...tipoMovimiento,
                mandatario: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            value={tipoMovimiento.mandatario}
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
        alignItems={"center"}
      >
        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 3 : 5}
          md={movimiento === "DEUDOR" ? 3 : 5}
          lg={movimiento === "DEUDOR" ? 3 : 3}
          xl={movimiento === "DEUDOR" ? 3 : 3}
          mb={
            movimiento === "BENEFICIARIO" ? { xs: 3, sm: 0 } : { xs: 4, sm: 0 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Tipo de Fuente
          </InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={tipoMovimiento.tipoFuente}
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
                ...tipoMovimiento,
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

        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 3 : 5}
          md={movimiento === "DEUDOR" ? 3 : 5}
          lg={movimiento === "DEUDOR" ? 3 : 3}
          xl={movimiento === "DEUDOR" ? 3 : 3}
          mb={
            movimiento === "BENEFICIARIO" ? { xs: 3, sm: 0 } : { xs: 4, sm: 0 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fondo o Ingreso
          </InputLabel>
          <Autocomplete
            disabled={tipoMovimiento.tipoFuente?.Id === ""}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFondosOIngresos?.filter(
              (td) => td.TipoDeFuente === tipoMovimiento.tipoFuente?.Id
            )}
            value={tipoMovimiento.fondoIngreso}
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
                ...tipoMovimiento,
                id: `${
                  tipoMovimiento.tipoFuente?.Descripcion
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

      {movimiento === "DEUDOR" && (
        <Grid
          item
          mt={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {buttonAgregar()}
        </Grid>
      )}

      {movimiento === "BENEFICIARIO" && (
        <Divider>
          <Typography
            sx={{
              ...queries.bold_text,
              color: "#af8c55 ",
            }}
          >
            Beneficiario
          </Typography>
        </Divider>
      )}

      {movimiento === "BENEFICIARIO" && (
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={5} md={5} lg={2} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de Beneficiario
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
              value={beneficiario.tipoBeneficiario}
              onChange={(event, text) => {
                setBeneficiario({
                  ...beneficiario,
                  tipoBeneficiario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                  mandatario: {
                    Id: "",
                    Descripcion: "",
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

          <Grid item xs={10} sm={5} md={5} lg={2} xl={3}>
            <InputLabel sx={queries.medium_text}>Beneficiario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                beneficiario.tipoBeneficiario.Descripcion === "No Aplica" ||
                /^[\s]*$/.test(beneficiario.tipoBeneficiario.Descripcion)
              }
              fullWidth
              options={catalogoOrganismos.filter(
                (td: any) =>
                  td.IdTipoEntePublico === beneficiario.tipoBeneficiario.Id
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
                setBeneficiario({
                  ...beneficiario,
                  beneficiario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                });
              }}
              value={beneficiario.beneficiario}
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

          <Grid item xs={10} sm={5} md={5} lg={2} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de Alta
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DesktopDatePicker
                value={beneficiario.fechaAlta}
                onChange={(v) => {
                  setBeneficiario({
                    ...beneficiario,
                    fechaAlta: v,
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            mt={2}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {buttonAgregar()}
          </Grid>
        </Grid>
      )}

      <Grid container mt={3} mb={2} display={"flex"} justifyContent={"center"}>
        <Paper sx={{ width: "100%" }}>
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
                {tablaTipoMovimiento.map(
                  (row: IDeudorMandato, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        {/* ID */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.id}
                          </Typography>
                        </StyledTableCell>

                        {/* TIPO MANDANTE */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.tipoEntePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* mandatario */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.mandatario.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* FUENTE DE PAGO */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.tipoFuente.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* FONDO INGRESO GOBIERNO ESTATAL */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoGobiernoEstatal}
                          </Typography>
                        </StyledTableCell>

                        {/* FONDO INGRESO MUNICIPIOS */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoMunicipios}
                          </Typography>
                        </StyledTableCell>

                        {/* FONDO INGRESO MUNICIPIO */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoAsignadoMunicipio}
                          </Typography>
                        </StyledTableCell>

                        {/* INGRESO ORGANISMO */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.ingresoOrganismo}
                          </Typography>
                        </StyledTableCell>

                        {/* AFECTADO POR GOBIERNO ESTATAL */}
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
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                  ) +
                                    val <=
                                    Number(
                                      tablaTipoMovimiento[index]
                                        .fondoIngresoGobiernoEstatal
                                    )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXGobiernoEstatal
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                        )
                                      ).toString());
                                  });

                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXGobiernoEstatal =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                        </StyledTableCell>

                        {/* AFECTACION GOBIERNO ESTATAL / 100 */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.afectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        {/* ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        {/* AFECTADO POR MUNICIPIO */}
                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                  ) +
                                    val <=
                                    Number(
                                      tablaTipoMovimiento[index]
                                        .fondoIngresoAsignadoMunicipio
                                    )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXMunicipio
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                        )
                                      ).toString());
                                  });

                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXMunicipio =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                        </StyledTableCell>

                        {/* ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO */}
                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "municipio" && (
                            <Typography sx={{ fontSize: "0.7rem" }}>
                              {
                                row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                              }
                            </Typography>
                          )}
                        </StyledTableCell>

                        {/* AFECTADO POR ORGANISMO */}
                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                            "gobierno estatal" &&
                            row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                              "municipio" && (
                              <TextField
                                type="number"
                                inputProps={{
                                  sx: {
                                    fontSize: "0.7rem",
                                  },
                                }}
                                size="small"
                                value={row?.ingresoAfectadoXOrganismo}
                                onChange={(v) => {
                                  let auxArray = [...tablaTipoMovimiento];
                                  let val = Number(v.target.value);

                                  if (
                                    val <= 100 &&
                                    Number(
                                      sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                    ) +
                                      val <=
                                      Number(
                                        tablaTipoMovimiento[index]
                                          .ingresoOrganismo
                                      )
                                  ) {
                                    let suma = 0;

                                    tablaTipoMovimiento.map((column) => {
                                      return (suma += Number(
                                        column.ingresoAfectadoXOrganismo
                                      ));
                                    });

                                    auxArray.map((column) => {
                                      return (column.acumuladoAfectacionOrganismoEntre100 =
                                        (
                                          suma +
                                          val +
                                          Number(
                                            sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                          )
                                        ).toString());
                                    });

                                    auxArray[index].ingresoAfectadoXOrganismo =
                                      val.toString();

                                    addPorcentaje(auxArray);
                                  }
                                }}
                              />
                            )}
                        </StyledTableCell>

                        {/* ACUMULADO AFECTACION ORGANISMO / 100 */}
                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionOrganismoEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                let auxArray = [...tablaTipoMovimiento];

                                auxArray.forEach((item) => {
                                  item.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                    tablaTipoMovimiento
                                      .reduce((accumulator, object) => {
                                        return (
                                          accumulator +
                                          Number(
                                            object.fondoIngresoAfectadoXMunicipio
                                          )
                                        );
                                      }, 0)
                                      .toString();
                                });
                                auxArray.forEach((item) => {
                                  item.acumuladoAfectacionOrganismoEntre100 =
                                    tablaTipoMovimiento
                                      .reduce((accumulator, object) => {
                                        return (
                                          accumulator +
                                          Number(
                                            object.ingresoAfectadoXOrganismo
                                          )
                                        );
                                      }, 0)
                                      .toString();
                                });

                                addPorcentaje(auxArray);
                                removeTipoMovimiento(index);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
