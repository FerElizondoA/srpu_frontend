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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { DestalleDestino } from "../Panels/DetalleDestino";
import { DestinoAutorizado } from "../Panels/MontoAutorizado";
import { RegistrarNuevaAutorizacion } from "../Panels/RegistrarNuevaAutorizacion";
import {
  IDetalleDestino,
  IGeneralAutorizado,
  IMontoAutorizado,
} from "../../../store/CreditoLargoPlazo/autorizacion";

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

export function DialogNuevaAutorizacion(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const autorizacion: IGeneralAutorizado = useLargoPlazoStore(
    (state) => state.autorizacion
  );
  const tablaMontoAutorizado: IMontoAutorizado[] = useLargoPlazoStore(
    (state) => state.tablaMontoAutorizado
  );
  const tablaDetalleDestino: IDetalleDestino[] = useLargoPlazoStore(
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
  const cleanAutorizacion: Function = useLargoPlazoStore(
    (state) => state.cleanAutorizacion
  );

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
              <ThemeProvider theme={buttonTheme}>
                <Button
                  disabled={
                    autorizacion.entidad.Organismo === "" ||
                    autorizacion.numeroAutorizacion === 0 ||
                    autorizacion.fechaPublicacion === "" ||
                    autorizacion.medioPublicacion.Descripcion === "" ||
                    autorizacion.montoAutorizado === 0 ||
                    autorizacion.documentoSoporte.nombreArchivo === "" ||
                    autorizacion.acreditacionQuorum.nombreArchivo === "" ||
                    tablaMontoAutorizado.length === 0 ||
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
          <Grid item width={"100%"}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                label="NUEVA AUTORIZACIÓN DE LA LEGISLATURA LOCAL"
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
