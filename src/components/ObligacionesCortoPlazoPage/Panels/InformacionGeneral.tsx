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

import { differenceInCalendarDays, startOfDay, addDays } from "date-fns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { differenceInDays } from "date-fns";
import { subDays } from "date-fns/esm";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { ICondicionFinanciera } from "../../../store/CreditoCortoPlazo/condicion_financiera";

const heads: {
  label: string;
}[] = [
    {
      label: "Selección",
    },
    {
      label: "Tipo de Ente Público Obligado",
    },
    {
      label: "Ente Público Obligado",
    },
    {
      label: "Prelación/Porcentaje",
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
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  // CATALOGOS
  const catalogoOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const catalogoObligadoSolidarioAval: Array<string> = [
    "NO APLICA",
    "SI APLICA",
  ];
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
  const setInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.setInformacionGeneral
  );

  // OBLIGADO SOLIDARIO AVAL

  const generalTipoEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.tipoEntePublicoObligado
    );

  const generalEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.entePublicoObligado
    );

  const actualizarPrelacion: Function = useCortoPlazoStore(
    (state) => state.updatePrelacionPorcentaje
  );

  const [errorPrelacion, setErrorPrelacion] = useState<number | null>(null);


  // TABLA OBLIGADO SOLIDARIO AVAL
  const tablaObligados: any = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );
  const setTablaObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.setTablaObligadoSolidarioAval
  );

  const addObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );

  const setObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.setObligadoSolidarioAval
  );

  const removeObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.removeObligadoSolidarioAval
  );

  const cleanObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );

  const [obligadoSolidario, setObligadoSolidario] = useState(
    tablaObligados.length >= 1 ? "SI APLICA" : "NO APLICA"
  );

  const addRows = () => {
    let tab = {
      tipoEntePublicoObligado: generalTipoEntePublico.Descripcion,
      entePublicoObligado: generalEntePublico.Descripcion,
    };
    addObligadoSolidarioAval(tab);
  };

  const Denominaciones = ["Pesos", "UDIS"];

  useEffect(() => {
    catalogoInstituciones.length <= 0 && getInstituciones();
    catalogoDestinos.length <= 0 && getDestinos("CP");
    catalogoTipoEntePublicoObligado.length <= 0 && getTipoEntePublicoObligado();
    catalogoOrganismos.length <= 0 && getOrganismos();
    // getObligadoSolidarioAval();
  }, []);

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

    setInformacionGeneral({
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

  const tablaCondicionesFinancieras: ICondicionFinanciera[] =
    useCortoPlazoStore((state) => state.tablaCondicionesFinancieras);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  // useEffect(() => {
  //   if (!contratacion || !vencimiento) return;

  //   const fechaContratacion = new Date(contratacion);
  //   const fechaVencimiento = new Date(vencimiento);

  //   const diff =
  //     fechaVencimiento.getTime() - fechaContratacion.getTime();

  //   const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

  //   if (dias > 365) {

  //     const nuevaFecha = addDays(fechaContratacion, 365);

  //     setVencimiento(nuevaFecha.toISOString());
  //     setPlazo(365); // 👈 importante actualizar plazo

  //   } else if (dias >= 0) {

  //     setPlazo(dias);

  //   }

  // }, [contratacion, vencimiento]);

  const calcularPlazo = (contratacion: string, vencimiento: string) => {
    if (!contratacion || !vencimiento) return 0;

    const fechaInicio = new Date(contratacion);
    const fechaFin = new Date(vencimiento);

    // Diferencia + 1 (conteo inclusivo)
    const dias = differenceInCalendarDays(fechaFin, fechaInicio) + 1;

    return dias > 0 ? dias : 0;
  };



  useEffect(() => {
    const dias = calcularPlazo(contratacion, vencimiento);
    setPlazo(dias);
  }, [contratacion, vencimiento]);

  // useEffect(() => {
  //   if (!contratacion || !vencimiento) return;

  //   const fechaContratacionDate = startOfDay(
  //     new Date(contratacion)
  //   );

  //   const fechaVencimientoDate = startOfDay(
  //     new Date(vencimiento)
  //   );

  //   const fechaMaxima = addDays(
  //     fechaContratacionDate,
  //     364
  //   );

  //   if (fechaVencimientoDate < fechaContratacionDate) {
  //     setVencimiento(
  //       fechaContratacionDate.toISOString()
  //     );
  //     return;
  //   }

  //   if (fechaVencimientoDate > fechaMaxima) {
  //     setVencimiento(
  //       fechaMaxima.toISOString()
  //     );
  //   }
  // }, [contratacion, vencimiento]);

  const validarFechaVencimiento = () => {
    if (!vencimiento || !contratacion) return;

    const fechaContratacionDate = startOfDay(
      new Date(contratacion)
    );

    const fechaVencimientoDate = startOfDay(
      new Date(vencimiento)
    );

    const fechaMaxima = addDays(
      fechaContratacionDate,
      364
    );

    let fechaFinal = fechaVencimientoDate;

    if (fechaVencimientoDate < fechaContratacionDate) {
      fechaFinal = fechaContratacionDate;
    }

    if (fechaVencimientoDate > fechaMaxima) {
      fechaFinal = fechaMaxima;
    }

    setVencimiento(fechaFinal.toISOString());
  };

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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              disabled
              disablePast={false}
              sx={{ width: "100%" }}
              value={new Date(contratacion)}
              onChange={(date) => {
                if (!date) return;

                const fechaMinima = subDays(new Date(), 365);

                if (date < fechaMinima) {
                  setContratacion(fechaMinima.toISOString());
                  return;
                }

                setContratacion(date.toISOString());
              }}
              // onChange={(date) => {
              //   setContratacion(date?.toString() || "");
              // }}
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
          <Grid display={"flex"} justifyContent={"space-between"}>
            <InputLabel sx={queries.medium_text}>
              Monto Original Contratado
            </InputLabel>


            <Tooltip title="No se puede modificar al haber una condicion financiera">
              <Button
                disabled={tablaCondicionesFinancieras.length === 0}
                onClick={handleMenu}
              >
                < NewReleasesIcon />
              </Button>
            </Tooltip>

          </Grid>

          <TextField
            disabled={
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Monto Original Contratado")) ||
              tablaCondicionesFinancieras.length > 0
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
                //99999999999
              ) {
                setInformacionGeneral({
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
        {/* <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
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
        </Grid> */}
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              value={vencimiento ? new Date(vencimiento) : null}
              sx={{width:"100%"}}
              onChange={(date) => {
                if (!date) return;
                setVencimiento(date.toISOString());
              }}
              minDate={new Date(contratacion)}
              maxDate={addDays(new Date(contratacion), 364)}
              slotProps={{
                textField: {
                  onBlur: validarFechaVencimiento,
                },
              }}
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
              setInformacionGeneral({
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
              setInformacionGeneral({
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
              setInformacionGeneral({
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
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography>{option}</Typography>
                </li>
              );
            }}
            value={obligadoSolidario}
            onChange={(event, text) => {
              if (text === "NO APLICA") {
                cleanObligadoSolidarioAval();
                setObligadoSolidarioAval({
                  obligadoSolidario: obligadoSolidario,
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
              setObligadoSolidario(text!);
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

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público Obligado
          </InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              obligadoSolidario === "NO APLICA" ||
              /^[\s]*$/.test(obligadoSolidario) ||
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
              Id: generalTipoEntePublico?.Id || "",
              Descripcion: generalTipoEntePublico?.Descripcion || "",
            }}
            onChange={(event, text) =>
              setObligadoSolidarioAval({
                obligadoSolidario: obligadoSolidario,
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
              obligadoSolidario === "NO APLICA" ||
              /^[\s]*$/.test(obligadoSolidario) ||
              /^[\s]*$/.test(generalTipoEntePublico?.Descripcion) ||
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Tabla Obligado Solidario / Aval"))
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) => td.IdTipoEntePublico === generalTipoEntePublico?.Id
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
              Id: generalEntePublico?.Id || "",
              Descripcion: generalEntePublico?.Descripcion || "",
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
              setObligadoSolidarioAval({
                obligadoSolidario: obligadoSolidario,
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
              obligadoSolidario === "NO APLICA" ||
              /^[\s]*$/.test(obligadoSolidario) ||
              /^[\s]*$/.test(generalTipoEntePublico?.Descripcion) ||
              /^[\s]*$/.test(generalEntePublico?.Descripcion) ||
              (datosActualizar.length > 0 &&
                !datosActualizar.includes("Tabla Obligado Solidario / Aval"))
            }
            variant="outlined"
            onClick={() => {
              addRows();
              setObligadoSolidarioAval({
                obligadoSolidario: "SI APLICA",
                tipoEntePublicoObligado: "",
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
                },
              });

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
                {obligadoSolidario === "NO APLICA" &&
                  tablaObligados.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell align="center">NO APLICA</StyledTableCell>
                    <StyledTableCell />
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
                        <StyledTableCell align="center" component="th">
                          {row.tipoEntePublicoObligado}
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          {row.entePublicoObligado}
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th">
                          <TextField
                            variant="outlined"
                            fullWidth
                            type="number"
                            error={errorPrelacion === index}
                            helperText={
                              errorPrelacion === index
                                ? "Suma total no puede superar el 100"
                                : ""
                            }
                            sx={{
                              width: "15rem",
                              //Quita las flechas de los input number
                              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                              },
                              "& input[type=number]": {
                                MozAppearance: "textfield",
                              },
                            }}
                            onKeyDown={(e) => { //Validacion de no agregar esos caracteres
                              if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            value={row.prelacionPorcentaje === 0 ? "" : row.prelacionPorcentaje}
                            onChange={(e) => {
                              const valor = Number(e.target.value);

                              const sumaOtros = tablaObligados
                                .reduce(
                                  (
                                    acc: number,
                                    item: { prelacionPorcentaje: number },
                                    i: number
                                  ) => {
                                    if (i !== index) {
                                      return acc + Number(item.prelacionPorcentaje);
                                    }
                                    return acc;
                                  },
                                  0
                                );

                              if (valor + sumaOtros > 100) {
                                setErrorPrelacion(index);
                                return;
                              }

                              setErrorPrelacion(null);

                              const nuevaTabla = [...tablaObligados];
                              nuevaTabla[index].prelacionPorcentaje = valor;

                              setTablaObligadoSolidarioAval(nuevaTabla);
                            }}
                            inputProps={{
                              min: 0,
                              max: 100,
                            }}
                          />
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
