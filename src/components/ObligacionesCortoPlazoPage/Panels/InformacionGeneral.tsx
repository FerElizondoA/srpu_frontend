/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { differenceInDays, startOfDay } from "date-fns";
import { addDays, subDays } from "date-fns/esm";
import enGB from "date-fns/locale/en-GB";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

const heads: {
  label: string;
}[] = [
  {
    label: "Selección",
  },
  {
    label: "Obligado Solidario / Aval",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente Público Obligado",
  },
];

export const moneyMask = (value: string) => {
  value = value.replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };

  const result = new Intl.NumberFormat("en-US", options).format(
    parseInt(value) / 100
  );
  return "$ " + result;
};

export function InformacionGeneral() {
  // GET CATALOGOS
  const getDestinos: Function = useCortoPlazoStore(
    (state) => state.getDestinos
  );
  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );
  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const getObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.getObligadoSolidarioAval
  );

  // CATALOGOS
  const catalogoOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const catalogoObligadoSolidarioAval: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoObligadoSolidarioAval
  );
  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );
  const catalogoDestinos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDestinos
  );
  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  // INFORMACION GENERAL
  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const fechaVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const plazo: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.plazo
  );
  const destino: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino
  );
  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const denominacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const institucionFinanciera: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.informacionGeneral.institucionFinanciera
    );
  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );

  // OBLIGADO SOLIDARIO AVAL
  const generalObligadoSolidario: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.obligadoSolidario
    );
  const generalTipoEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.tipoEntePublicoObligado
    );
  const generalEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.entePublicoObligado
    );

  // TABLA OBLIGADO SOLIDARIO AVAL
  const tablaObligados: any = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const changeObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.changeObligadoSolidarioAval
  );

  const removeObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.removeObligadoSolidarioAval
  );

  const cleanObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );

  const addRows = () => {
    let tab = {
      obligadoSolidario: generalObligadoSolidario.Descripcion,
      tipoEntePublicoObligado: generalTipoEntePublico.Descripcion,
      entePublicoObligado: generalEntePublico.Descripcion,
    };
    addObligadoSolidarioAval(tab);
  };

  const Denominaciones = ["Pesos", "UDIS"];

  useEffect(() => {
    getInstituciones();
    getDestinos();
    getTipoEntePublicoObligado();
    getObligadoSolidarioAval();
  }, []);

  useEffect(() => {
    if (generalObligadoSolidario.Id === "" && tablaObligados.length === 0) {
      let obligado = catalogoObligadoSolidarioAval.find(
        (obligado) => obligado.Descripcion === "No Aplica"
      );
      changeObligadoSolidarioAval({
        obligadoSolidario: {
          Id: obligado?.Id || "",
          Descripcion: obligado?.Descripcion || "",
        },
        tipoEntePublicoObligado: {
          Id: "",
          Descripcion: "",
        },
        entePublicoObligado: {
          Id: "",
          Descripcion: "",
        },
      });
    }
  }, [catalogoObligadoSolidarioAval]);

  const [contratacion, setContratacion] = useState(fechaContratacion);

  const [vencimiento, setVencimiento] = useState(fechaVencimiento);

  const [plazoD, setPlazo] = useState(0);

  useEffect(() => {
    const res =
      differenceInDays(
        startOfDay(new Date(vencimiento)),
        startOfDay(new Date(contratacion))
      ) + 1;

    setPlazo(res);

    changeInformacionGeneral({
      fechaContratacion: contratacion,
      fechaVencimiento: vencimiento,
      plazo: res,
      destino: destino,
      monto: moneyMask(monto.toString()),
      denominacion: denominacion,
      institucionFinanciera: institucionFinanciera,
    });
  }, [contratacion, vencimiento]);

  const datosActualizar: Array<string> = useCortoPlazoStore(
    (state) => state.datosActualizar
  );

  return (
    <Grid
      container
      height={{ xs: "35rem" }}
      sx={{
        display: "flex",

        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100%",
        height: "60rem",
        "@media (min-width: 480px)": {
          height: "60rem",
        },

        "@media (min-width: 768px)": {
          height: "35rem",
        },

        "@media (min-width: 1140px)": {
          height: "35rem",
        },

        "@media (min-width: 1400px)": {
          height: "35rem",
        },

        "@media (min-width: 1870px)": {
          height: "49rem",
        },
      }}
    >
      <Grid
        container
        display="flex"
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DesktopDatePicker
              disabled={
                datosActualizar.length > 0 &&
                !datosActualizar.includes("Fecha de Contratación")
              }
              disablePast={false}
              sx={{ width: "100%" }}
              value={new Date(contratacion)}
              onChange={(date) => {
                setContratacion(date?.toString() || "");
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Plazo (Días)</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={plazoD}
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            disabled
          />
        </Grid>

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Original Contratado
          </InputLabel>
          <TextField
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Monto Original Contratado")
            }
            fullWidth
            placeholder="0"
            value={monto <= 0 ? "" : monto}
            onChange={(v) => {
              if (
                validator.isNumeric(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) &&
                parseInt(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) < 9999999999999999
              ) {
                changeInformacionGeneral({
                  fechaContratacion: contratacion,
                  fechaVencimiento: vencimiento,
                  plazo: plazo,
                  destino: destino,
                  monto: moneyMask(v.target.value),
                  denominacion: denominacion,
                  institucionFinanciera: institucionFinanciera,
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            variant="standard"
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
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DesktopDatePicker
              disabled={
                datosActualizar.length > 0 &&
                !datosActualizar.includes("Fecha de Vencimiento")
              }
              sx={{ width: "100%" }}
              value={new Date(vencimiento)}
              onChange={(date) => setVencimiento(date?.toString() || "")}
              minDate={new Date(addDays(new Date(contratacion), 0))}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
            disabled={
              datosActualizar.length > 0 && !datosActualizar.includes("Destino")
            }
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoDestinos}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: destino.Id || "",
              Descripcion: destino.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                monto: moneyMask(monto.toString()),
                denominacion: denominacion,
                institucionFinanciera: institucionFinanciera,
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

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <Select
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Denominación")
            }
            fullWidth
            variant="standard"
            value={denominacion || ""}
            onChange={(v) =>
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: destino,
                monto: moneyMask(monto.toString()),
                denominacion: v.target.value,
                institucionFinanciera: institucionFinanciera,
              })
            }
          >
            {Denominaciones.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"center"} width={"100%"}>
        <Grid item xs={10} sm={10.5} md={10.5} lg={10.5} xl={10.5}>
          <InputLabel sx={queries.medium_text}>
            Institución Financiera
          </InputLabel>
          <Autocomplete
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Institución Financiera")
            }
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoInstituciones}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: institucionFinanciera.Id || "",
              Descripcion: institucionFinanciera.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: destino,
                monto: moneyMask(monto.toString()),
                denominacion: denominacion,
                institucionFinanciera: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
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
          <InputLabel sx={queries.medium_text}>
            Obligado Solidario / Aval
          </InputLabel>
          <Autocomplete
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Tabla Obligado Solidario / Aval")
            }
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoObligadoSolidarioAval}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalObligadoSolidario.Id,
              Descripcion: generalObligadoSolidario.Descripcion,
            }}
            onChange={(event, text) => {
              if (
                text?.Descripcion === "No Aplica" ||
                text?.Id === "" ||
                text === null
              ) {
                cleanObligadoSolidarioAval();
              }
              changeObligadoSolidarioAval({
                obligadoSolidario: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "No Aplica",
                },
                tipoEntePublicoObligado: {
                  Id: "",
                  Descripcion: "",
                },
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
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
              option.Id === value.Id ||
              value.Descripcion === "" ||
              value.Id === ""
            }
          />
        </Grid>

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público Obligado
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              generalObligadoSolidario.Descripcion === "No Aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Tabla Obligado Solidario / Aval"))
            }
            fullWidth
            options={catalogoTipoEntePublicoObligado}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalTipoEntePublico.Id || "",
              Descripcion: generalTipoEntePublico.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeObligadoSolidarioAval({
                obligadoSolidario: generalObligadoSolidario,
                tipoEntePublicoObligado: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
                },
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

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Ente Público Obligado
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              generalObligadoSolidario.Descripcion === "No Aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              /^[\s]*$/.test(generalTipoEntePublico.Descripcion) ||
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Tabla Obligado Solidario / Aval"))
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) => td.IdTipoEntePublico === generalTipoEntePublico.Id
            )}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalEntePublico.Id || "",
              Descripcion: generalEntePublico.Descripcion || "",
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
            onChange={(event, text) =>
              changeObligadoSolidarioAval({
                obligadoSolidario: generalObligadoSolidario,
                tipoEntePublicoObligado: generalTipoEntePublico,
                entePublicoObligado: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
              })
            }
          />
        </Grid>
      </Grid>

      <Grid width={"94%"} display={"flex"} justifyContent={"flex-end"}>
        <ThemeProvider theme={buttonTheme}>
          <Button
            sx={queries.buttonContinuar}
            disabled={
              generalObligadoSolidario.Descripcion === "No Aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              /^[\s]*$/.test(generalTipoEntePublico.Descripcion) ||
              /^[\s]*$/.test(generalEntePublico.Descripcion) ||
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Tabla Obligado Solidario / Aval"))
            }
            variant="outlined"
            onClick={() => {
              changeObligadoSolidarioAval({
                obligadoSolidario: {
                  Id: "",
                  Descripcion: "",
                },
                tipoEntePublicoObligado: "",
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
                },
              });
              addRows();
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>
      </Grid>

      <Grid
        height={"35%"}
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Paper sx={{ width: "88%", overflow: "clip" }}>
          <TableContainer
            sx={{
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: ".3rem",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {generalObligadoSolidario.Descripcion === "No Aplica" &&
                tablaObligados.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell align="center">No Aplica</StyledTableCell>
                    <StyledTableCell />
                  </StyledTableRow>
                ) : (
                  tablaObligados.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeObligadoSolidarioAval(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.obligadoSolidario}
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          {row.tipoEntePublicoObligado}
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          {row.entePublicoObligado}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
