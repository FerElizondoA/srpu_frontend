
import {
  AppBar,
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { queries } from "../../../queries";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import DeleteIcon from "@mui/icons-material/Delete";
import validator from "validator";
import { useMandatoStore } from "../../../store/Mandatos/main";

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
  const [tabIndex, setTabIndex] = useState(0);

  //DATOS GENERALES
  const numeroCuenta: string = useCortoPlazoStore(
    (state) => state.generalInstrucciones.numeroCuenta
  );

  const cuentaCLABE: string = useCortoPlazoStore(
    (state) => state.generalInstrucciones.cuentaCLABE
  );

  const banco: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.generalInstrucciones.banco
  );

  //TIPO DE MOVIMIENTO
  const tipoEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.tipoMovimientoInstrucciones.tipoEntePublico
    );

  const altaDeudor: string = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.altaDeudor
  );

  const entidadFederativa: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.tipoMovimientoInstrucciones.entidadFederativa
    );

  const tipoFuente: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.tipoFuente
  );

  const fondoIngreso: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.fondoIngreso
  );

  //TABLA

  const tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[] =
    useCortoPlazoStore((state) => state.tablaTipoMovimientoInstrucciones);

  //CATALOGOS
  const catalogoTiposDeFuente: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const catalogoMunicipiosUOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoMunicipiosUOrganismos
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTiposDeFuenteInstrucciones
  );

  const getMunicipiosUOrganismosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const getInstitucionesInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getInstitucionesInstrucciones
  );

  const getTipoEntePublicoObligadoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const getFondosOIngresosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getFondosOIngresosInstrucciones
  );

  //FUNCTION
  const setGeneralInstruccion: Function = useCortoPlazoStore(
    (state) => state.setGeneralInstruccion
  );

  const addTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.addTipoMovimientoInstrucciones
  );

  const removeTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.removeTipoMovimientoInstrucciones
  );

  const cleanTipoMovimientoInstruccion: Function = useCortoPlazoStore(
    (state) => state.cleanTipoMovimientoInstruccion
  );

  const editarInstruccion: Function = useCortoPlazoStore(
    (state) => state.editarInstruccion
  );

  const changeIdInstruccion: Function = useCortoPlazoStore(
    (state) => state.changeIdInstruccion
  );

  const setTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.setTipoMovimientoInstrucciones
  );

  const [mecanismo, setMecanismo] = useState<any>("");

  const numeroMandato: string = useMandatoStore(
    (state) => state.numeroMandato
  );

  const changeNumeroMandato: Function = useMandatoStore(
    (state) => state.changeNumeroMandato
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
          <Grid xs={10} sm={4} md={4} lg={4} xl={4}
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

          <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Municipio
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Municipio mandante"}
            // title={"Municipio mandante"}
            onChange={(v) => {
             
            }}
            
          />
        </Grid>
        </Grid>

      </Grid>
    </>
  )

}
