/* eslint-disable react-hooks/exhaustive-deps */
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
  Radio,
  RadioGroup,
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
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import es from "date-fns/locale/es";
import { useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import {
  IBeneficiarioInstrucciones,
  IDeudorInstrucciones,
} from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

interface HeadLabels {
  label: string;
}

const headsNews: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Fuente",
  },
  {
    label: "Fondo o Ingreso",
  },
  {
    label: "Ente Público Obligado",
  },
  {
    label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
  },
  {
    label: "Eliminar",
  },
];

const headsLabels: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente Público Obligado",
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
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Gobierno del Estado",
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
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
  {
    label: "",
  },
];

export function TipoDeMovimientoIntrucciones() {
  const tipoMovimiento: IDeudorInstrucciones = useInstruccionesStore(
    (state) => state.tipoMovimiento
  );

  const beneficiario: IBeneficiarioInstrucciones = useInstruccionesStore(
    (state) => state.beneficiario
  );

  const tablaTipoMovimiento: IDeudorInstrucciones[] = useInstruccionesStore(
    (state) => state.tablaTipoMovimiento
  );

  const setTipoMovimiento: Function = useInstruccionesStore(
    (state) => state.setTipoMovimiento
  );

  const setBeneficiario: Function = useInstruccionesStore(
    (state) => state.setBeneficiario
  );

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const catalogoTipoEntePublicoObligado: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );
  const catalogoTiposDeFuente: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );
  const catalogoFondosOIngresos: IFondoOIngreso[] = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const addTipoMovimiento: Function = useInstruccionesStore(
    (state) => state.addTipoMovimiento
  );
  const removeTipoMovimiento: Function = useInstruccionesStore(
    (state) => state.removeTipoMovimiento
  );
  const cleanTipoMovimiento: Function = useInstruccionesStore(
    (state) => state.cleanTipoMovimiento
  );

  const [movimiento, setMovimiento] = useState("DEUDOR");

  const addPorcentaje: Function = useInstruccionesStore(
    (state) => state.addPorcentaje
  );

  const idTipoMovimientoSelect: string = useInstruccionesStore(
    (state) => state.idTipoMovimientoSelect
  );

  const setIdTipoMovimientoSelect: Function = useInstruccionesStore(
    (state) => state.setIdTipoMovimientoSelect
  );

  const updateTipoMovimientoField: Function = useInstruccionesStore(
    (state) => state.updateTipoMovimientoField
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
      <ThemeProvider theme={buttonTheme}>
        <Button
          sx={{
            ...queries.buttonContinuar,
            width: "12rem",
            height: "2.5rem",
          }}
          disabled={
            tipoMovimiento.tipoEntePublicoObligado.Id === "" ||
            tipoMovimiento.entePublicoObligado.Id === "" ||
            tipoMovimiento.tipoFuente.Id === "" ||
            tipoMovimiento.fondoIngreso.Id === ""
          }
          onClick={() => {
            addTipoMovimiento({
              id: tipoMovimiento.id,
              tipoEntePublicoObligado: tipoMovimiento.tipoEntePublicoObligado,
              entePublicoObligado: tipoMovimiento.entePublicoObligado,
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
          {tablaTipoMovimiento.length > 0 && (
            <FormControlLabel
              sx={{ ...queries.medium_text }}
              value="BENEFICIARIO"
              control={<Radio />}
              label="Alta de Beneficiario"
            />
          )}
        </RadioGroup>
      </Grid>

      <Divider>
        <Typography
          sx={{
            ...queries.bold_text,
            color: "#af8c55 ",
            mb: 2,
          }}
        >
          Ente Público Obligado
        </Typography>
      </Divider>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{ height: "10vh" }}
      // flexDirection={"column"}
      >
        {movimiento === "BENEFICIARIO" ? (
          <Grid
            item
            xs={10}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 2, sm: 0, md: 0, lg: 0 }
                : { xs: 0, sm: 0 }
            }
          >
            <InputLabel sx={queries.medium_text}>Id</InputLabel>
            <Autocomplete
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
          sm={movimiento === "DEUDOR" ? 5 : 3}
          md={movimiento === "DEUDOR" ? 5 : 3}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mb={
            movimiento === "BENEFICIARIO"
              ? { xs: 1, sm: 0, md: 0 }
              : { xs: 4, sm: 0, md: 0 }
          }
        //mb={{xs:2, sm:0}}
        >
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público Obligado
          </InputLabel>

          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoTipoEntePublicoObligado}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={tipoMovimiento.tipoEntePublicoObligado}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                tipoEntePublicoObligado: {
                  Id: text?.Id || "",
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
          xs={10}
          sm={movimiento === "DEUDOR" ? 5 : 3}
          md={movimiento === "DEUDOR" ? 5 : 3}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mt={
            movimiento === "BENEFICIARIO" ? { xs: 1, sm: 0, md: 0 } : { sm: 0 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Ente Público Obligado
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            disabled={
              tipoMovimiento.tipoEntePublicoObligado.Descripcion ===
              "No Aplica" ||
              /^[\s]*$/.test(tipoMovimiento.tipoEntePublicoObligado.Descripcion)
            }
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
            value={tipoMovimiento.entePublicoObligado}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                entePublicoObligado: {
                  Id: text?.Id || "",
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
              option.Id === value.Id || value.Descripcion === ""
            }
          />
        </Grid>
      </Grid>

      <Grid
        container
        display={{ xs: "flex", sm: "flex", md: "flex" }}
        justifyContent={{
          xs: "center",
          sm: "space-evenly",
          md: "space-evenly",
        }}
        alignItems={"center"}
        mb={2}
        mt={{ xs: 11, sm: 0 }}
      >
        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 5 : 4}
          md={movimiento === "DEUDOR" ? 5 : 4}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mt={
            movimiento === "BENEFICIARIO" ? { xs: 5, sm: 3 } : { xs: 0, sm: 0 }
          }
        >
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
                fondoIngreso: {
                  Id: "",
                  Descripcion: "",
                  TipoDeFuente: "",
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
          sm={movimiento === "DEUDOR" ? 5 : 4}
          md={movimiento === "DEUDOR" ? 5 : 4}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mt={
            movimiento === "BENEFICIARIO" ? { xs: 1, sm: 3 } : { xs: 3, sm: 0 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fondo o ingreso
          </InputLabel>
          <Autocomplete
            disableClearable
            disabled={tipoMovimiento.tipoFuente?.Id === ""}
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
                id: `${tipoMovimiento.tipoFuente?.Descripcion
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
          container
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
          mt={{ xs: 2, sm: 0 }}
        >
          <Grid item xs={10} sm={5} md={5} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Tipo de beneficiario
            </InputLabel>

            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoTipoEntePublicoObligado}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={beneficiario.tipoBeneficiario}
              onChange={(v, text) =>
                setBeneficiario({
                  tipoBeneficiario: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  beneficiario: beneficiario.beneficiario,
                })
              }
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

          <Grid item xs={10} sm={5} md={5} lg={3} xl={3} mt={{ xs: 2, sm: 0 }}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Beneficiario
            </InputLabel>

            <Autocomplete
              clearText="Borrar"
              disabled={beneficiario.tipoBeneficiario.Descripcion === ""}
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoOrganismos.filter(
                (td: any) =>
                  td.IdTipoEntePublico === beneficiario.tipoBeneficiario.Id
              )}
              value={beneficiario.beneficiario}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(v, text) =>
                setBeneficiario({
                  ...beneficiario,
                  beneficiario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                })
              }
              disableClearable
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
            sm={8}
            md={5}
            lg={3}
            xl={3}
            mt={{ xs: 2, sm: 2, md: 0 }}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de Alta
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                sx={{
                  width: "100%",
                }}
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
                  {headsNews.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography >
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimiento.map(
                  (row: IDeudorInstrucciones, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        {/* ID */}
                        <StyledTableCell align="center">
                          <Typography >
                            {row?.id}
                          </Typography>
                        </StyledTableCell>

                          {/* FUENTE DE PAGO */}
                        <StyledTableCell align="center">
                          <Typography >
                            {row?.tipoFuente.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography >
                            {row?.fondoIngreso.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* TIPO MANDANTE
                        <StyledTableCell align="center">
                          <Typography >
                            {row?.tipoEntePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell> */}


                        {/* entePublicoObligado */}
                        <StyledTableCell align="center">
                          <Typography >
                            {row?.entePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* Porcentaje Afectado Sobre el Total de Ingreso */}
                        <StyledTableCell align="center">
                          <TextField
                            type="number"
                            value={row.AfectadoTotalIngreso || ''}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', isNaN(newValue) ? 0 : newValue);
                            }}
                            inputProps={{ min: 0 }}
                          />
                        </StyledTableCell>

                        {/* Equivalencia Sin incluir el monto de municipios */}
                        <StyledTableCell align="center">
                          <TextField
                            type="number"
                            disabled={row.tipoEntePublicoObligado.Descripcion.toLowerCase() !== "gobierno estatal"}
                            value={row.tipoEntePublicoObligado.Descripcion.toLowerCase() === "gobierno estatal" ? row.EquivalenciaCorrespondienteMunicipios || '' : 0}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', isNaN(newValue) ? 0 : newValue);
                            }}
                            inputProps={{ min: 0 }}
                          />
                        </StyledTableCell>




                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                let auxArray = [...tablaTipoMovimiento];


                                //addPorcentaje(auxArray);
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
