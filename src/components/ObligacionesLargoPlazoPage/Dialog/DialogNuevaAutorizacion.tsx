import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useEffect, useRef, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { DestalleDestino } from "../Panels/DetalleDestino";
import { RegistrarNuevaAutorizacion } from "../Panels/RegistrarNuevaAutorizacion";
import {
  Autorizaciones,
  DestinoA,
  DetalleDestino,
  GeneralAutorizado,
} from "../../../store/Autorizacion/agregarAutorizacion";
import { DestinoAutorizado } from "../Panels/MontoAutorizado";
import Swal from "sweetalert2";



const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
  accion: string;
};

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

export function DialogNuevaAutorizacion(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const registrarAutorizacion: GeneralAutorizado = useLargoPlazoStore(
    (state) => state.registrarAutorizacion
  );
  const tablaDestinoAutorizado: DestinoA[] = useLargoPlazoStore(
    (state) => state.tablaDestinoAutorizado
  );
  const tablaDetalleDestino: DetalleDestino[] = useLargoPlazoStore(
    (state) => state.tablaDetalleDestino
  );
  const createAutorizacion: Function = useLargoPlazoStore(
    (state) => state.createAutorizacion
  );

  const setAutorizacion: Function = useLargoPlazoStore(
    (state) => state.setAutorizacion
  );

  const modificarAutorizacion: Function = useLargoPlazoStore(
    (state) => state.modificarAutorizacion
  );

  const autorizacionSelect: Autorizaciones[] = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );
  const setAutorizacionSelect: Function = useLargoPlazoStore(
    (state) => state.setAutorizacionSelect
  );


  let  tableRef = useRef();

  const cleanAutorizacion = () => {
    setAutorizacion(
      {
        entidad: {
          Id: localStorage.getItem("IdEntePublicoObligado") || "",
          Organismo: localStorage.getItem("EntePublicoObligado") || "",
        },
        numeroAutorizacion: 0,
        fechaPublicacion: new Date().toString(),
        medioPublicacion: { Id: "", Descripcion: "" },
        montoAutorizado: 0,
        documentoSoporte: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
        acreditacionQuorum: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
      },
      [],
      []
    );
  };

  useEffect (() =>{
    
  }, [])

  return (
    <>
      <Dialog
        fullScreen
        open={props.openState}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  props.handler(false);
                  cleanAutorizacion();
                  //reset();
                }}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>

            <Grid container>
              <Grid item>
                <Typography sx={queries.bold_text}>
                  {props.accion} autorización
                </Typography>
              </Grid>
            </Grid>

            <Grid item sx={{ top: 12, bottom: "auto" }}>
              <ThemeProvider theme={theme}>
                <Button
                  disabled={
                    registrarAutorizacion.entidad.Organismo === "" ||
                    registrarAutorizacion.numeroAutorizacion === 0 ||
                    registrarAutorizacion.fechaPublicacion === "" ||
                    registrarAutorizacion.medioPublicacion.Descripcion === "" ||
                    registrarAutorizacion.montoAutorizado === 0 ||
                    registrarAutorizacion.documentoSoporte.nombreArchivo ===
                      "" ||
                    registrarAutorizacion.acreditacionQuorum.nombreArchivo ===
                      "" ||
                    tablaDestinoAutorizado.length === 0 ||
                    tablaDetalleDestino.length === 0
                  }
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (props.accion === "Agregar") {
                      createAutorizacion().then(() => {
                        props.handler(false);
                        cleanAutorizacion();
                        Swal.fire({
                          icon: "success",
                          text: "La autorización se ha creado exitosamente",
                        });
                      });
                    } else if (props.accion === "Editar") {
                      modificarAutorizacion().then(() => {
                        props.handler(false);
                        cleanAutorizacion();
                        Swal.fire({
                          icon: "success",
                          text: "La autorización se ha editado exitosamente",
                        });
                      });
                      
                    }
                  }}
                >
                  <Typography sx={queries.medium_text}>
                    {props.accion}
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column">
          <Grid  item width={"100%"}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                label="REGISTRAR NUEVA AUTORIZACIÓN DE LA LEGISLATURA LOCAL"
                sx={queries.bold_text}
              ></Tab>
              <Tab label="MONTO AUTORIZADO" sx={queries.bold_text}></Tab>
              <Tab label="DETALLE DEL DESTINO" sx={queries.bold_text}></Tab>
            </Tabs>

            {tabIndex === 0 && <RegistrarNuevaAutorizacion />}

            {tabIndex === 1 && <DestinoAutorizado />}

            {tabIndex === 2 && <DestalleDestino />}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
