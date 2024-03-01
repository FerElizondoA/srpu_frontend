/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IDatosGeneralesInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

export function DatosGeneralesIntrucciones() {
  //DATOS GENERALES

  const datosGenerales: IDatosGeneralesInstrucciones = useInstruccionesStore(
    (state) => state.datosGenerales
  );

  const setDatosGenerales: Function = useInstruccionesStore(
    (state) => state.setDatosGenerales
  );

  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  useEffect(() => {
    setDatosGenerales({
      numeroCuenta: datosGenerales.numeroCuenta,
      cuentaCLABE: datosGenerales.cuentaCLABE,
      banco: datosGenerales.banco,
      fechaInstruccion: new Date(),
    });
  }, []);

  // const tablaInstrucciones: IDatosInstrucciones[] = useInstruccionesStore(
  //   (state) => state.tablaInstrucciones
  // );

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent={"space-evenly"}
      sx={{
        height: "30rem",
        "@media (min-width: 480px)": {
          height: "20rem",
        },

        "@media (min-width: 768px)": {
          height: "60rem",
        },

        "@media (min-width: 1140px)": {
          height: "25rem",
        },

        "@media (min-width: 1400px)": {
          height: "31rem",
        },

        "@media (min-width: 1870px)": {
          height: "51rem",
        },
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          // gridTemplateColumns: "repeat(2,1fr)",
          justifyContent: "space-evenly",
          height: "13rem",
        }}
      >
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <InputLabel sx={{ ...queries.medium_text }}>
            Número de Cuenta
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={datosGenerales.numeroCuenta}
            onChange={(v) => {
              if (
                validator.isNumeric(v.target.value) ||
                v.target.value === ""
              ) {
                setDatosGenerales({
                  ...datosGenerales,
                  numeroCuenta: v.target.value,
                });
              }
            }}
          />
        </Grid>

        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <InputLabel sx={{ ...queries.medium_text }}>
            Fecha de la Instrucción
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              sx={{
                width: "100%",
              }}
              value={datosGenerales.fechaInstruccion}
              onChange={(v) => {
                setDatosGenerales({
                  ...datosGenerales,
                  fechaInstruccion: v,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid
        container
        height={"40%"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <InputLabel sx={{ ...queries.medium_text }}>Cuenta CLABE</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={datosGenerales.cuentaCLABE}
            onChange={(v) => {
              if (
                validator.isNumeric(v.target.value) ||
                v.target.value === ""
              ) {
                setDatosGenerales({
                  ...datosGenerales,
                  cuentaCLABE: v.target.value,
                });
              }
            }}
          />
        </Grid>

        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <InputLabel sx={{ ...queries.medium_text }}>Banco</InputLabel>
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
            value={datosGenerales.banco}
            onChange={(event, text) =>
              setDatosGenerales({
                ...datosGenerales,
                banco: {
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
    </Grid>
  );
}
