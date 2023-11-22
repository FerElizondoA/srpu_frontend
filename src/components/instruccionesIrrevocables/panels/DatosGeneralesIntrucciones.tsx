import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import {
  ICatalogo,
  IEntePublico,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

export function DatosGeneralesIntrucciones() {
  //DATOS GENERALES
  const numeroCuenta: string = useInstruccionesStore(
    (state) => state.generalInstrucciones.numeroCuenta
  );

  const cuentaCLABE: string = useInstruccionesStore(
    (state) => state.generalInstrucciones.cuentaCLABE
  );

  const banco: { Id: string; Descripcion: string } = useInstruccionesStore(
    (state) => state.generalInstrucciones.banco
  );

  const mecanismo: string = useInstruccionesStore(
    (state) => state.generalInstrucciones.mecanismo
  );

  const municipio: { Id: string; Descripcion: string } = useInstruccionesStore(
    (state) => state.generalInstrucciones.municipio
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getMunicipiosUOrganismosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const getInstitucionesInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );

  const getTipoEntePublicoObligadoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  //FUNCTION
  const setGeneralInstruccion: Function = useInstruccionesStore(
    (state) => state.setGeneralInstruccion
  );
  //CATALOGOS
  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        sx={{
          height: "20rem",
          "@media (min-width: 480px)": {
            height: "55rem",
          },

          "@media (min-width: 768px)": {
            height: "65rem",
          },

          "@media (min-width: 1140px)": {
            height: "50rem",
          },

          "@media (min-width: 1400px)": {
            height: "25rem",
          },

          "@media (min-width: 1870px)": {
            height: "35rem",
          },
        }}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Numero de cuenta
            </InputLabel>
            <TextField
              fullWidth
              variant="standard"
              value={numeroCuenta}
              onChange={(v) => {
                if (
                  validator.isNumeric(v.target.value) ||
                  v.target.value === ""
                ) {
                  setGeneralInstruccion({
                    numeroCuenta: v.target.value,
                    cuentaCLABE: cuentaCLABE,
                    banco: banco,
                    mecanismo: "Instrucciones Irrevocables",
                    municipio: municipio,
                  });
                }
              }}
            />
          </Grid>

          <Grid item xs={10} sm={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Cuenta CLABE
            </InputLabel>
            <TextField
              fullWidth
              variant="standard"
              value={cuentaCLABE}
              onChange={(v) => {
                if (
                  validator.isNumeric(v.target.value) ||
                  v.target.value === ""
                ) {
                  setGeneralInstruccion({
                    numeroCuenta: numeroCuenta,
                    cuentaCLABE: v.target.value,
                    banco: banco,
                    mecanismo: "Instrucciones Irrevocables",
                    municipio: municipio,
                  });
                }
              }}
            />
          </Grid>

          <Grid item xs={10} sm={3}>
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
              value={{
                Id: banco?.Id || "",
                Descripcion: banco?.Descripcion || "",
              }}
              onChange={(event, text) =>
                setGeneralInstruccion({
                  numeroCuenta: numeroCuenta,
                  cuentaCLABE: cuentaCLABE,
                  banco: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  mecanismo: "Instrucciones Irrevocables",
                  municipio: municipio,
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
          alignItems={"center"}
        >
          <Grid
            item
            xs={10}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            height={{ xs: "4rem", sm: "0rem" }}
          >
            <InputLabel sx={queries.medium_text}>
              Mecanismo o vehículo de pago
            </InputLabel>
            <TextField
              value={mecanismo}
              fullWidth
              variant="standard"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={10}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            height={{ xs: "4rem", sm: "0rem" }}
          >
            <InputLabel sx={queries.medium_text}>
              Municipio u Organismo
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoOrganismos}
              value={municipio}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setGeneralInstruccion({
                  numeroCuenta: numeroCuenta,
                  cuentaCLABE: cuentaCLABE,
                  banco: banco,
                  mecanismo: "Instrucciones Irrevocables",
                  municipio: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
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
        </Grid>
      </Grid>
    </>
  );
}
