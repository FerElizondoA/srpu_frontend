import CheckIcon from "@mui/icons-material/Check";
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
  createTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { differenceInDays, startOfDay } from "date-fns";
import { addDays, subDays } from "date-fns/esm";
import enGB from "date-fns/locale/en-GB";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

interface Head {
  label: string;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

export interface IFileInfoGeneral {
  archivo: File;
  nombreArchivo: string;
  tipoArchivo: string;
  descripcionTipo: string;
}

const heads: Head[] = [
  {
    label: "Selección",
  },
  {
    label: "Obligado solidario / aval",
  },
  {
    label: "Tipo de ente público obligado",
  },
  {
    label: "Ente público obligado",
  },
];

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
  const fechaContratacion: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const fechaVencimiento: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const plazo: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.plazo
  );
  const destino: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.informacionGeneral.destino
  );
  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const denominacion: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const institucionFinanciera: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.informacionGeneral.institucionFinanciera
    );

  const changeInformacionGeneral: Function = useLargoPlazoStore(
    (state) => state.changeInformacionGeneral
  );

  // OBLIGADO SOLIDARIO AVAL
  const generalObligadoSolidario: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.obligadoSolidario
    );
  const generalTipoEntePublico: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.tipoEntePublicoObligado
    );
  const generalEntePublico: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.entePublicoObligado
    );

  // TABLA OBLIGADO SOLIDARIO AVAL
  const tablaObligados: any = useLargoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );
  const addObligadoSolidarioAval: Function = useLargoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const changeObligadoSolidarioAval: Function = useLargoPlazoStore(
    (state) => state.changeObligadoSolidarioAval
  );

  const removeObligadoSolidarioAval: Function = useLargoPlazoStore(
    (state) => state.removeObligadoSolidarioAval
  );

  const cleanObligadoSolidarioAval: Function = useLargoPlazoStore(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Para que el apartado obligado solidario / aval tenga un resultado por defecto
  useEffect(() => {
    if (generalObligadoSolidario.Id === "" && tablaObligados.length === 0) {
      let obligado = catalogoObligadoSolidarioAval.find(
        (obligado) => obligado.Descripcion === "No aplica"
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
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratacion, vencimiento]);

  return (
    <Grid
      container
      width={"100%"}
      sx={{
        ...queries.contenedorInformacionGeneral,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Grid container display="flex" justifyContent={"space-evenly"} sx={{}}>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(contratacion)}
              onChange={(date) => {
                setContratacion(date?.toString() || "");
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              slots={{
                textField: DateInput,
              }}
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
            fullWidth
            placeholder="0"
            value={monto <= 0 ? "" : monto.toString()}
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
      <Grid container display={"flex"} justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(vencimiento)}
              onChange={(date) => setVencimiento(date?.toString() || "")}
              minDate={new Date(addDays(new Date(contratacion), 1))}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
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

      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={10} sm={10.5} md={10.5} lg={10.5} xl={10.5}>
          <InputLabel sx={queries.medium_text}>
            Institución Financiera
          </InputLabel>
          <Autocomplete
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

      <Grid container display={"flex"} justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Obligado Solidario / Aval
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoObligadoSolidarioAval} //.filter((td: any) => td.Descripcion !== "Capturador")
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
                text?.Descripcion === "No aplica" ||
                text?.Id === "" ||
                text === null
              ) {
                cleanObligadoSolidarioAval();
              }
              changeObligadoSolidarioAval({
                obligadoSolidario: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "No aplica",
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
            Tipo de ente público obligado
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              generalObligadoSolidario.Descripcion === "No aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion)
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
            Ente público obligado
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              generalObligadoSolidario.Descripcion === "No aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              /^[\s]*$/.test(generalTipoEntePublico.Descripcion)
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
        <ThemeProvider theme={theme}>
          <Button
            sx={queries.buttonContinuar}
            disabled={
              generalObligadoSolidario.Descripcion === "No aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              /^[\s]*$/.test(generalTipoEntePublico.Descripcion) ||
              /^[\s]*$/.test(generalEntePublico.Descripcion)
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
            <CheckIcon fontSize="small" />
            AGREGAR
          </Button>
        </ThemeProvider>
      </Grid>

      {/* <Box sx={{justifyContent:"center", display:"flex"}}> */}
      <Grid
        height={"40%"}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Paper sx={{ width: "88%", overflow: "clip" }}>
          <TableContainer
            sx={{
              maxHeight: "100%",
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
                {generalObligadoSolidario.Descripcion === "No aplica" &&
                tablaObligados.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell align="center">No aplica</StyledTableCell>
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
