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
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

interface HeadSelect {
  label: string;
}

const CatalogoMecanismo: HeadSelect[] = [
  {
    label: "Fideicomiso",
  },
  {
    label: "Instrucciones irrevocable",
  },
  {
    label: "Mandato",
  },
];

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

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
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

  //FUNCTION
  const setGeneralInstruccion: Function = useInstruccionesStore(
    (state) => state.setGeneralInstruccion
  );

  const [mecanismo, setMecanismo] = useState<any>("");

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
                Id: banco.Id || "",
                Descripcion: banco.Descripcion || "",
              }}
              onChange={(event, text) =>
                setGeneralInstruccion({
                  numeroCuenta: numeroCuenta,
                  cuentaCLABE: cuentaCLABE,
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

        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid
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

            <FormControl fullWidth>
              <Select
                value={mecanismo}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setMecanismo(e.target.value);
                }}
              >
                {CatalogoMecanismo.map((item, index) => (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            xs={10}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            height={{ xs: "4rem", sm: "0rem" }}
          >
            <InputLabel sx={queries.medium_text}>Municipio</InputLabel>
            <TextField
              fullWidth
              variant="standard"
              // label={"Municipio mandante"}
              // title={"Municipio mandante"}
              onChange={(v) => {}}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
