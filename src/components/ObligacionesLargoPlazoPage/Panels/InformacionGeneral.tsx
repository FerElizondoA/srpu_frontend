import { useEffect, useState } from "react";
import {
  Divider,
  TextField,
  InputLabel,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  TableRow,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
} from "@mui/material";

import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import { subDays, addDays } from "date-fns/esm";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
import { differenceInDays, startOfDay } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
//import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import CheckIcon from "@mui/icons-material/Check";
import validator from "validator";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

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

const headsGC: Head[] = [
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

export function InformacionGeneral() {
  // GET CATALOGOS
  const getDestinos: Function = useLargoPlazoStore(
    (state) => state.getDestinos
  );
  const getInstituciones: Function = useLargoPlazoStore(
    (state) => state.getInstituciones
  );
  const getTipoEntePublicoObligado: Function = useLargoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const getObligadoSolidarioAval: Function = useLargoPlazoStore(
    (state) => state.getObligadoSolidarioAval
  );

  // CATALOGOS
  const catalogoOrganismos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const catalogoObligadoSolidarioAval: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoObligadoSolidarioAval
  );
  const catalogoInstituciones: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoInstituciones
  );
  const catalogoDestinos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDestinos
  );
  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useLargoPlazoStore(
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

  // GASTOS Y COSTOS RELACIONADOS CON LA CONTRATACION

  const generalGCDestino: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.generalGastosCostos.destino);

  const generalGCDetalleInversion: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.generalGastosCostos.detalleInversion);

  const generalGCperiodoAdministracion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.periodoAdministracion
  );

  const generalGCGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.gastosAdicionales
  );

  const generalGCClaveInscripcionFinanciamiento: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.claveInscripcionFinanciamiento
  );

  const generalGCDescripcion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.descripcion
  );

  const generalGCMonto: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.monto
  );

  const generalGCPeriodoFinanciamiento: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.periodoFinanciamiento
  );

  const generalGCSaldoVigente: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.saldoVigente
  );

  const generalGCMontoGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.montoGastosAdicionales
  );

  //TABLA GASTOS Y COSTOS RELACIONADOS CON LA CONTRATACION
  const tablaGastosCostos: any = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const addGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGeneralGastosCostos
  );

  const changeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGeneralGastosCostos
  );

  const removeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.removeGeneralGastosCostos
  );

  const quitDocument: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
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
  const state = useLargoPlazoStore.getState();

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
  }, [catalogoObligadoSolidarioAval]);

  const [contratacion, setContratacion] = useState(fechaContratacion);

  const [vencimiento, setVencimiento] = useState(fechaVencimiento);

  const [plazoD, setPlazo] = useState(0);

  const [periodoDeAdministracion, setPeriodoAdministracion] = useState(
    generalGCperiodoAdministracion
  );
  const [gastosAdicionalesGC, setGastosAdicionalesGC] = useState(
    generalGCGastosAdicionales
  );
  const [claveInscripcionFinanciamiento, setClaveInscripcionFinanciamiento] =
    useState(generalGCClaveInscripcionFinanciamiento);
  const [descripcionGC, setDescripcionGC] = useState(generalGCDescripcion);
  const [montoGC, setMontoGC] = useState(generalGCMonto);
  const [periodoFinanciamientoGC, setPeriodoFinanciamiento] = useState(
    generalGCPeriodoFinanciamiento
  );
  const [saldoVIgenteGC] = useState(generalGCSaldoVigente);
  const [montoGastosAdicionalesGC, setMontoGastosAdicionalesGC] = useState(
    generalGCMontoGastosAdicionales
  );

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
      monto: monto,
      denominacion: denominacion,
      institucionFinanciera: institucionFinanciera,
    });

    changeGeneralGastosCostos({
      destino: generalGCDestino,
      detalleInversion: generalGCDetalleInversion,
      periodoAdministracion: generalGCperiodoAdministracion, // NO SABEMOS AUN
      gastosAdicionales: generalGCGastosAdicionales,
      claveInscripcionFinanciamiento: generalGCClaveInscripcionFinanciamiento, // NO SABEMOS AUN
      descripcion: generalGCDescripcion,
      monto: generalGCMonto,
      periodoFinanciamiento: generalGCPeriodoFinanciamiento, //AUN NO SABEMOS
      saldoVigente: generalGCSaldoVigente, //AUN NO SABEMOS
      montoGastosAdicionales: generalGCMontoGastosAdicionales,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratacion, vencimiento]);

  return (
    <Grid
      item
      container
      sx={{
        display: "flex",
        height: "200vh",
        flexDirection: "column",
        justifyContent: "space-evenly",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: ".5vw",
          mt: 1,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#AF8C55",
          outline: "1px solid slategrey",
          borderRadius: 1,
        },
      }}
    >
      <Grid item display="flex" justifyContent={"space-evenly"} sx={{}}>
        <Grid item lg={3}>
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

        <Grid item lg={3}>
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

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Original Contratado
          </InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={monto <= 0 ? "" : monto.toString()}
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeInformacionGeneral({
                  fechaContratacion: contratacion,
                  fechaVencimiento: vencimiento,
                  plazo: plazo,
                  destino: destino,
                  monto: v.target.value,
                  denominacion: denominacion,
                  institucionFinanciera: institucionFinanciera,
                });
              } else if (v.target.value === "") {
                changeInformacionGeneral({
                  fechaContratacion: contratacion,
                  fechaVencimiento: vencimiento,
                  plazo: plazo,
                  destino: destino,
                  monto: 0,
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
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid lg={3}>
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

        <Grid item lg={3}>
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
                monto: monto,
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

        <Grid item lg={3}>
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
                monto: monto,
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

      <Grid item display={"flex"} width={"100%"} justifyContent={"center"}>
        <Grid width="87.5%" display={"flex"} justifyContent={"space-between"}>
          <Grid item lg={4.2}>
            <TextField
              disabled
              sx={{ width: "80%" }}
              label="Periodo de administración"
              variant="standard"
            />
          </Grid>
          <Grid item lg={3.4}>
            <TextField
              disabled
              sx={{ width: "100%" }}
              label="Periodo de financiamiento"
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"center"}>
        <Grid item lg={10.5}>
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
                monto: monto,
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

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Obligado Solidario / Aval
          </InputLabel>
          <Autocomplete
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
              ////////// REVISAAAAAR FERNANDOOOO/////////
              // Id: generalObligadoSolidario.Id  || catalogoObligadoSolidarioAval.find((obligado) => obligado.Descripcion === "No aplica")?.Id || '' ,
              // Descripcion: generalObligadoSolidario.Descripcion || catalogoObligadoSolidarioAval.find((obligado) => obligado.Descripcion === "No aplica")?.Descripcion || '',

              Id: generalObligadoSolidario.Id,
              Descripcion: generalObligadoSolidario.Descripcion,
            }}
            onChange={(event, text) =>
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

        <Grid item lg={3}>
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
                <li {...props} key={option.Descripcion}>
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

        <Grid item lg={3}>
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
        {/* 
        <Grid item display={"flex"} alignItems={"center"}  >
          
        </Grid> */}
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
            onClick={() => addRows()}
          >
            <CheckIcon fontSize="small" />
            AGREGAR
          </Button>
        </ThemeProvider>
      </Grid>

      {/* <Box sx={{justifyContent:"center", display:"flex"}}> */}
      <Grid height={"15%"} display={"flex"} justifyContent={"space-evenly"}>
        <Paper sx={{ width: "88%", overflow: "clip" }}>
          <TableContainer
            sx={{
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
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

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
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
              Id: generalGCDestino.Id || "",
              Descripcion: generalGCDestino.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeGeneralGastosCostos({
                destino: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                detalleInversion: generalGCDetalleInversion,
                periodoAdministracion: periodoDeAdministracion,
                gastosAdicionales: gastosAdicionalesGC,
                claveInscripcionFinanciamiento: claveInscripcionFinanciamiento,
                descripcion: descripcionGC,
                monto: montoGC,
                periodoFinanciamiento: periodoFinanciamientoGC,
                saldoVigente: saldoVIgenteGC,
                montoGastosAdicionales: montoGastosAdicionalesGC,
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

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Detalle de la Inversión
          </InputLabel>
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
              Id: generalGCDetalleInversion.Id || "",
              Descripcion: generalGCDetalleInversion.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeGeneralGastosCostos({
                destino: generalGCDestino,
                detalleInversion: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                periodoAdministracion: periodoDeAdministracion,
                gastosAdicionales: gastosAdicionalesGC,
                claveInscripcionFinanciamiento: claveInscripcionFinanciamiento,
                descripcion: descripcionGC,
                monto: montoGC,
                periodoFinanciamiento: periodoFinanciamientoGC,
                saldoVigente: saldoVIgenteGC,
                montoGastosAdicionales: montoGastosAdicionalesGC,
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
        {/* Falta documento */}
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Inversión Pública Productiva
          </InputLabel>
          <TextField
            variant="standard"
            fullWidth
            placeholder="Agregar un archivo"
            onChange={(v) => {}}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Periodo de Administración
          </InputLabel>
          <TextField fullWidth variant="standard" />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Gastos Adicionales</InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={
              generalGCGastosAdicionales <= 0
                ? ""
                : generalGCGastosAdicionales.toString()
            }
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: generalGCperiodoAdministracion,
                  gastosAdicionales: v.target.value,
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: generalGCMonto,
                  periodoFinanciamiento: generalGCPeriodoFinanciamiento,
                  saldoVigente: generalGCSaldoVigente,
                  montoGastosAdicionales: generalGCMontoGastosAdicionales,
                });
              } else if (v.target.value === "") {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: periodoDeAdministracion,
                  gastosAdicionales: 0,
                  claveInscripcionFinanciamiento:
                    claveInscripcionFinanciamiento,
                  descripcion: descripcionGC,
                  monto: generalGCMonto,
                  periodoFinanciamiento: periodoFinanciamientoGC,
                  saldoVigente: saldoVIgenteGC,
                  montoGastosAdicionales: generalGCMontoGastosAdicionales,
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
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Clave de Inscripción del Financiamiento
          </InputLabel>
          <TextField disabled fullWidth variant="standard" />
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Descripcion</InputLabel>
          <TextField
            value={generalGCDescripcion}
            onChange={(v) =>
              changeGeneralGastosCostos({
                destino: generalGCDestino,
                detalleInversion: generalGCDetalleInversion,
                periodoAdministracion: periodoDeAdministracion,
                gastosAdicionales: generalGCGastosAdicionales,
                claveInscripcionFinanciamiento: claveInscripcionFinanciamiento,
                descripcion: v.target.value,
                monto: generalGCMonto,
                periodoFinanciamiento: periodoFinanciamientoGC,
                saldoVigente: saldoVIgenteGC,
                montoGastosAdicionales: generalGCMontoGastosAdicionales,
              })
            }
            fullWidth
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

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Monto</InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={generalGCMonto <= 0 ? "" : generalGCMonto.toString()}
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: generalGCperiodoAdministracion,
                  gastosAdicionales: generalGCGastosAdicionales,
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: v.target.value,
                  periodoFinanciamiento: generalGCPeriodoFinanciamiento,
                  saldoVigente: generalGCSaldoVigente,
                  montoGastosAdicionales: generalGCMontoGastosAdicionales,
                });
              } else if (v.target.value === "") {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: periodoDeAdministracion,
                  gastosAdicionales: gastosAdicionalesGC,
                  claveInscripcionFinanciamiento:
                    claveInscripcionFinanciamiento,
                  descripcion: descripcionGC,
                  monto: 0,
                  periodoFinanciamiento: periodoFinanciamientoGC,
                  saldoVigente: saldoVIgenteGC,
                  montoGastosAdicionales: generalGCMontoGastosAdicionales,
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
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Periodo de Financiamiento (Meses)
          </InputLabel>
          <TextField disabled fullWidth variant="standard" />
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel disabled sx={queries.medium_text}>
            Saldo Vigente
          </InputLabel>
          <TextField fullWidth disabled variant="standard" />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Gastos Adicionales
          </InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={
              generalGCMontoGastosAdicionales <= 0
                ? ""
                : generalGCMontoGastosAdicionales.toString()
            }
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: generalGCperiodoAdministracion,
                  gastosAdicionales: generalGCGastosAdicionales,
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: generalGCMonto,
                  periodoFinanciamiento: generalGCPeriodoFinanciamiento,
                  saldoVigente: generalGCSaldoVigente,
                  montoGastosAdicionales: v.target.value,
                });
              } else if (v.target.value === "") {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  periodoAdministracion: periodoDeAdministracion,
                  gastosAdicionales: gastosAdicionalesGC,
                  claveInscripcionFinanciamiento:
                    claveInscripcionFinanciamiento,
                  descripcion: descripcionGC,
                  monto: generalGCMonto,
                  periodoFinanciamiento: periodoFinanciamientoGC,
                  saldoVigente: saldoVIgenteGC,
                  montoGastosAdicionales: 0,
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
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid height={"20%"} display={"flex"} justifyContent={"space-evenly"}>
        <Paper sx={{ width: "88%", overflow: "clip" }}>
          <TableContainer
            sx={{
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
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
                  {headsGC.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
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
