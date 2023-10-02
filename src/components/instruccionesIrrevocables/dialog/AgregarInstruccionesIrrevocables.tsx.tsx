import {
  AppBar,
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
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
import { DatosGeneralesIntrucciones } from "../panels/DatosGeneralesIntrucciones";
import { TipoDeMovimientoIntrucciones } from "../panels/TipoDeMovimientoIntrucciones";
import DeleteIcon from "@mui/icons-material/Delete";
import validator from "validator";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

interface rowsPrueba {
  label: string;
  id: string;
}

interface HeadLabels {
  label: string;
}

export function AgregarInstruccionesIrrevocables({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
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

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  return (
    <>
      <Dialog fullScreen open={openState} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  //limpiaFideicomiso();
                  handler(false);
                  //reset();
                }}
                sx={{ color: "white" }}
              >
                <GridCloseIcon />
              </IconButton>
            </Tooltip>

            <Grid container>
              <Grid item>
                <Typography sx={queries.bold_text}>
                  {accion} Instrucción Irrevocable
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <ThemeProvider theme={theme}>
                <Button
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (accion === "Agregar") {
                      //createFideicomiso();
                      handler(false);
                      // reset();
                    } else if (accion === "Editar") {
                      // updateRow(indexA);
                      // modificarFideicomiso();
                      handler(false);
                      // reset();
                    }
                    setTabIndex(0);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3ch",
                      fontFamily: "MontserratMedium",
                      "@media (min-width: 480px)": {
                        fontSize: "1.5ch",
                      },
                    }}
                  >
                    {accion} Instrucción
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid item container direction="column">
          <Grid item width={"100%"}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label="datos generales" sx={{ ...queries.bold_text }}></Tab>
              <Tab label="Tipo de Movimiento" sx={{ ...queries.bold_text }}></Tab>
            </Tabs>

            {tabIndex === 0 && <DatosGeneralesIntrucciones />}
          
            {tabIndex === 1 && <TipoDeMovimientoIntrucciones />}


          </Grid>
        </Grid>

      </Dialog>
    </>
  );
}
