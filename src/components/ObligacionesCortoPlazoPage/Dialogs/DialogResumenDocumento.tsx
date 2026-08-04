/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import { useState, useEffect } from "react";

import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { Resumen as ResumenLP } from "../../ObligacionesLargoPlazoPage/Panels/Resumen";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import {
  DialogSolicitarModificacion,
  rolesAdmin,
} from "./DialogSolicitarModificacion";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
//import { DialogGuardarComentarios } from "./DialogGuardarComentarios";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { alertaExito } from "../../../generics/Alertas";
import { appTheme } from "../../..";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { ConfirmacionEnviarSolicitud } from "./DialogEnviarSolicitud";
import { DialogAsignacionResumen } from "./DialogAsignacionResumen";
import { getSolicitudes } from "../../APIS/cortoplazo/APISInformacionGeneral";
import { PanelComentariosNoSolventados } from "./PanelComentariosNoSolventados";
import { DialogConfirmacionDesechamiento } from "./DialogConfirmacionDesechamiento";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { desechamientoDoc } from "../../../store/SolicitudFirma/solicitudFirma";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";


type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IInscripcion;
  //setRecargarSolicitud: Function;
  //recargarSolicitud: boolean;
  rowId: string;
};

const responsiveButtonStyles = {
  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" },
  padding: { xs: "4px 8px", sm: "5px 10px", md: "6px 14px" },
  minWidth: { xs: "75px", sm: "90px", md: "110px" },
  whiteSpace: "nowrap" as const,
  textOverflow: "ellipsis",
  overflow: "hidden",
  height: "auto",
  lineHeight: 1.2,
  flexShrink: 0,
  borderRadius: "0.5rem",
};

const responsiveIconButtonStyles = {
  width: { xs: "28px", sm: "32px", md: "36px" },
  height: { xs: "28px", sm: "32px", md: "36px" },
  "& .MuiSvgIcon-root": {
    fontSize: { xs: "16px", sm: "18px", md: "20px" },
  },
  flexShrink: 0,
};

export function VerBorradorDocumento(props: Props) {
  const navigate = useNavigate();
  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);


  // OCUPAS ESTO PARA LOS CAMBIOS*******
  const setComentariosSolicitudInscripcion: Function = useCortoPlazoStore(
    (state) => state.setComentariosSolicitudInscripcion
  );

  const comentariosBD: IComentarios[] = useCortoPlazoStore(
    (state) => state.comentariosSolicitudInscripcion);

  const comentariosSolicitudInscripcion: IComentarios[] = useCortoPlazoStore(
    (state) => state.comentariosSolicitudInscripcion);

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario);

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario);



  const comentariosEliminar = useCortoPlazoStore(
    state => state.comentariosEliminar
  );

  const setComentariosEliminar = useCortoPlazoStore(
    state => state.setComentariosEliminar
  );

  const removeComentarioEliminar = useCortoPlazoStore(
    state => state.removeComentarioEliminar
  );


  // REQUERIMIENTOS
  React.useEffect(() => {
    if (props.rowSolicitud.Id !== "") {
      getComentariosSolicitudPlazo(props.rowSolicitud.Id, () => { });
    }
  }, [props.rowSolicitud.Id]);

  const [datosComentario, setDatosComentarios] = React.useState<Array<IComentarios>>([]);

  const [botonVolverFiltro, setBotonVolverFiltro] = React.useState({});

  React.useEffect(() => {
    let a: any = {};

    datosComentario
      ?.filter((td) => td.Tipo === "Requerimiento")
      .map((_) => {
        return Object.keys(JSON.parse(_?.Comentarios)).map((v) => {
          return a[v]
            ? (a[v] = a[v] + ` ; ` + JSON.parse(_?.Comentarios)[v])
            : (a = { ...a, [v]: JSON.parse(_?.Comentarios)[v] });
        });
      });

    setBotonVolverFiltro(a);
    setComentarios(a);
    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "Requerimiento")[0]
        ?.Id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosComentario]);

  const comentarios: any = useCortoPlazoStore((state) => state.comentarios);

  const setComentarios: Function = useCortoPlazoStore(
    (state) => state.setComentarios
  );

  const setFiltroComentarios: Function = useCortoPlazoStore(
    (state) => state.setFiltroComentarios
  );

  const filtroComentarios: boolean = useCortoPlazoStore(
    (state) => state.filtroComentarios
  );
  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const actualizarComentarios: Function = useCortoPlazoStore(
    (state) => state.actualizarComentarios
  );

  const [openDialogRegresar, setOpenDialogRegresar] = useState(false);

  const [openDialogConfirmacionVolver, setOpenDialogConfirmacionVolver] = useState(false);
  const [confirmBotonAccionComentario, setConfirmBotonAccionComentario] = useState(false);

  const [anchorElAcciones, setAnchorElAcciones] = useState<null | HTMLElement>(null);
  const openMenuAcciones = Boolean(anchorElAcciones);

  const handleOpenMenuAcciones = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAcciones(event.currentTarget);
  };

  const handleCloseMenuAcciones = () => {
    setAnchorElAcciones(null);
  };

  const [openPanelNoSolventados, setOpenPanelNoSolventados] = useState(false);
  const [openDialogConfirmacionDesechamiento, setOpenDialogConfirmacionDesechamiento] = useState(false);


  const [accion, setAccion] = useState("");

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );
  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );



  const cleanCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );

  //const [filtroComentarios, setFiltroComentarios] = useState(false);


  const comentario: any = useCortoPlazoStore((state) => state.comentarios);
  const hayComentariosEliminar = comentariosEliminar.length > 0;

  const [comentariosAuxOriginal, setComentariosAuxOriginal] = useState(comentarios);

  // function tieneComentarios(
  //   comentarios: Record<string, string | undefined>,
  //   comentariosAuxOriginal: Record<string, string | undefined>
  // ): boolean {
  //   return JSON.stringify(comentarios) !== JSON.stringify(comentariosAuxOriginal);
  // }

  const hayComentarios =
    tieneComentarios(comentarios) || tieneComentarios(comentariosAuxOriginal);


  function tieneComentarios(comentarios: Record<string, string | undefined>): boolean {
    return Object.values(comentarios).some(
      (valor) => typeof valor === "string" && valor.trim().length > 0
    );
  }

  function compararComentarios(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    const claves1 = Object.keys(obj1);
    const claves2 = Object.keys(obj2);

    // Comparar longitud de las claves
    if (claves1.length !== claves2.length) {
      return false;
    }

    // Comparar valores clave por clave
    const prueba = claves1.every(clave => obj2.hasOwnProperty(clave) && obj1[clave] === obj2[clave]);
    return prueba
  }

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);
  // useEffect(() => {
  // props.handler(false);
  // console.log("hola me cerre")
  // }, [!props.recargarSolicitud ])


  const construirRegistrosActualizar = () => {
    const registrosActualizar: {
      id: string;
      comentarios: string;
      accion: "UPDATE" | "DELETE";
    }[] = [];

    comentariosEliminar.forEach((comentario) => {
      const nuevoJson = {
        ...comentario.jsonOriginal,
      };

      delete nuevoJson[comentario.apartado];

      if (Object.keys(nuevoJson).length > 0) {
        registrosActualizar.push({
          id: comentario.id,
          comentarios: JSON.stringify(nuevoJson),
          accion: "UPDATE",
        });
      } else {
        registrosActualizar.push({
          id: comentario.id,
          comentarios: "",
          accion: "DELETE",
        });
      }
    });

    return registrosActualizar;
  };

  const cleanComentariosEliminar = useCortoPlazoStore(
    state => state.cleanComentariosEliminar
  );

  const cleanComentariosNoSolventados = useCortoPlazoStore(
    state => state.cleanComentariosNoSolventados
  );

  useEffect(() => {
    cleanComentariosEliminar();
    cleanComentariosNoSolventados();
  }, [props.rowSolicitud.Id]);
  useEffect(() => {
    cleanComentariosEliminar();
    cleanComentariosNoSolventados();
  }, []);

  const mostrarPanelNoSolventados = 
    props.rowSolicitud.NoEstatus === "7" &&
    localStorage.getItem("Rol") === "Autorizador";

  return (

    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
        cleanSolicitudCortoPlazo();
        cleanSolicitudLargoPlazo();
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "auto",
          minHeight: "60px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "8px 8px", sm: "10px 16px", md: "12px 20px" },
          overflow: "hidden",
          boxSizing: "border-box",
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        <Button
          sx={{
            ...queries.buttonCancelar,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            flexShrink: 1,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          disabled={comentario.length > 0}
          onClick={() => {
            setConfirmBotonAccionComentario(false)
            if (compararComentarios(comentarios, botonVolverFiltro)) {
              console.log("No ha habido modificaciones en los comentarios.");


              props.handler(false);
              useCortoPlazoStore.setState({
                comentarios: {},
                idComentario: "",
              });
              cleanSolicitudCortoPlazo();
              cleanSolicitudLargoPlazo();
              cleanCondicionFinanciera();
            }
            else {
              // console.log("Hubo modificaciones en los comentarios.");
              // console.log("COMENTARIOS", comentarios)
              // console.log("botonVolverFiltro", botonVolverFiltro)

              setOpenDialogConfirmacionVolver(true)

            }
          }}
        >
          Volver
        </Button>
        <Grid container sx={{
          display: "flex",
          flexWrap: { xs: "nowrap", sm: "nowrap", md: "wrap", lg: "nowrap", xl: "nowrap" },
          justifyContent: { xs: "space-between", sm: "flex-start", md: "flex-start", lg: "flex-end", xl: "flex-end" },
          alignItems: "center",
          gap: { xs: "4px", sm: "6px", md: "8px", lg: "10px", xl: "12px" },
          py: { xs: "4px", sm: "6px" },
          flex: 1,
          minWidth: 0,
        }}
          width={{ xs: "100%", sm: "auto" }}
        >
          {/* Asignar Revisor */}
          {
            (props.rowSolicitud.NoEstatus === "4" && (localStorage.getItem("Rol") === "Validador" || localStorage.getItem("Rol") === "Autorizador"))
              ?
              <ThemeProvider theme={buttonTheme}>
                <Button
                  sx={{
                    ...queries.buttonCancelar,
                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                    padding: { xs: "3px 6px", sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                    minWidth: { xs: "60px", sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                    whiteSpace: "nowrap" as const,
                    height: "auto",
                    lineHeight: 1.2,
                    flexShrink: 1,
                    borderRadius: "0.5rem",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => {
                    setOpenDialogEnviar(true);
                  }}
                >
                  Asignar Revisor
                </Button>
              </ThemeProvider>
              : null
          }

          {/* Guardar Comentarios */}
          {
            (props.rowSolicitud.NoEstatus === "2" &&
              localStorage.getItem("Rol") === "Verificador" &&
              localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor) ||

              ((localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
                rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
                (props.rowSolicitud.NoEstatus === "5" &&
                  localStorage.getItem("Rol") === "Revisor" &&
                  props.rowSolicitud.IdEditor === localStorage.getItem("IdUsuario"))) &&
              ["5", "6", "7"].includes(props.rowSolicitud.NoEstatus)
              ?
              <ThemeProvider theme={buttonTheme}>
                <Button
                  disabled={
                    compararComentarios(comentarios, botonVolverFiltro) &&
                    comentariosEliminar.length === 0
                  }
                  sx={{
                    ...queries.buttonCancelar,
                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                    padding: { xs: "3px 6px", sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                    minWidth: { xs: "60px", sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                    whiteSpace: "nowrap" as const,
                    height: "auto",
                    lineHeight: 1.2,
                    flexShrink: 1,
                    borderRadius: "0.5rem",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => {
                    setOpenGuardaComentarios(true);
                    console.log("comentariosAuxOriginal", comentarios)
                  }}
                >
                  Guardar Comentarios
                </Button>
              </ThemeProvider>
              : null
          }

          {/* Menú de Acciones - Solo en móvil (xs) */}
          {
            ((["10", "19", "26"].includes(props.rowSolicitud.NoEstatus) &&
              localStorage.getItem("Rol") === "Autorizador") ||
              (props.rowSolicitud.NoEstatus === "5" &&
                localStorage.getItem("Rol") === "Revisor" &&
                localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor) ||
              (localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
                rolesAdmin.includes(localStorage.getItem("Rol")!)))
              ?
              <>
                <Button
                  onClick={handleOpenMenuAcciones}
                  startIcon={<MoreVertIcon sx={{ fontSize: "16px" }} />}
                  sx={{
                    ...queries.buttonCancelar,
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.15)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.25)",
                    },
                    height: "auto",
                    lineHeight: 1.2,
                    flexShrink: 1,
                    textTransform: "none",
                    display: { xs: "flex", sm: "none" },
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Acciones
                </Button>
                <Menu
                  anchorEl={anchorElAcciones}
                  open={openMenuAcciones}
                  onClose={handleCloseMenuAcciones}
                  PaperProps={{
                    sx: {
                      minWidth: "180px",
                      bgcolor: "#2c2c2c",
                      color: "white",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        fontSize: { xs: "0.75rem", sm: "0.85rem" },
                        padding: { xs: "8px 12px", sm: "10px 16px" },
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                      },
                    },
                  }}
                >
                  {/* Devolver para validación/revisión */}
                  {(localStorage.getItem("Rol") !== "Revisor" && props.rowSolicitud.ControlInterno !== "Desechado" &&
                    props.rowSolicitud.NoEstatus != "10") && (
                    <MenuItem
                      onClick={() => {
                        handleCloseMenuAcciones();
                        setOpenDialogRegresar(true);
                        setAccion("modificar");
                      }}
                    >
                      Devolver para {localStorage.getItem("Rol") === "Autorizador" ? "validación" : "revisión"}
                    </MenuItem>
                  )}

                  {/* Confirmar */}
                  {props.rowSolicitud.Control !== "Desechado" && props.rowSolicitud.NoEstatus != "10" && (
                    <MenuItem
                      onClick={() => {
                        handleCloseMenuAcciones();
                        setOpenDialogRegresar(true);
                        setAccion("enviar");
                      }}
                    >
                      Confirmar {localStorage.getItem("Rol") === "Validador"
                        ? "Validación"
                        : (localStorage.getItem("Rol") === "Revisor" && props.rowSolicitud.NoEstatus === "5" && props.rowSolicitud.IdEditor === localStorage.getItem("IdUsuario"))
                          ? "Revisión"
                          : "Autorización"}
                    </MenuItem>
                  )}

                  {/* Prevención */}
                  {localStorage.getItem("Rol") === "Autorizador" && ["7", "16", "25"].includes(props.rowSolicitud.NoEstatus) && (
                    <MenuItem
                      onClick={() => {
                        handleCloseMenuAcciones();
                        setOpenDialogRegresar(true);
                        setAccion("requerimiento");
                      }}
                    >
                      Prevención
                    </MenuItem>
                  )}

                  {/* Desechamiento */}
                  {localStorage.getItem("Rol") === "Autorizador" && ["7", "16", "25"].includes(props.rowSolicitud.NoEstatus) && (
                    <MenuItem
                      onClick={() => {
                        handleCloseMenuAcciones();
                        setOpenDialogConfirmacionDesechamiento(true);
                      }}
                      sx={{ color: "#ef5350" }}
                    >
                      Desechamiento
                    </MenuItem>
                  )}
                </Menu>
              </>
              : null
          }

          {/* Botones individuales - Solo en sm y arriba */}
          {
            ((["10", "19", "26"].includes(props.rowSolicitud.NoEstatus) &&
              localStorage.getItem("Rol") === "Autorizador") ||
              (props.rowSolicitud.NoEstatus === "5" &&
                localStorage.getItem("Rol") === "Revisor" &&
                localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor) ||
              (localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
                rolesAdmin.includes(localStorage.getItem("Rol")!)))
              ?
              <>
                {/* Devolver para validación/revisión */}
                {(localStorage.getItem("Rol") !== "Revisor" && props.rowSolicitud.ControlInterno !== "Desechado" &&
                  props.rowSolicitud.NoEstatus != "10") && (
                  <Button
                    sx={{
                      ...queries.buttonCancelar,
                      fontSize: { sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                      padding: { sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                      minWidth: { sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                      whiteSpace: "nowrap" as const,
                      height: "auto",
                      lineHeight: 1.2,
                      flexShrink: 1,
                      borderRadius: "0.5rem",
                      display: { xs: "none", sm: "flex" },
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => {
                      setOpenDialogRegresar(true);
                      setAccion("modificar");
                    }}
                  >
                    Devolver para {localStorage.getItem("Rol") === "Autorizador" ? "validación" : "revisión"}
                  </Button>
                )}

                {/* Confirmar */}
                {props.rowSolicitud.Control !== "Desechado" && props.rowSolicitud.NoEstatus != "10" && (
                  <Button
                    sx={{
                      ...queries.buttonContinuar,
                      fontSize: { sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                      padding: { sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                      minWidth: { sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                      whiteSpace: "nowrap" as const,
                      height: "auto",
                      lineHeight: 1.2,
                      flexShrink: 1,
                      borderRadius: "0.5rem",
                      display: { xs: "none", sm: "flex" },
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => {
                      setOpenDialogRegresar(true);
                      setAccion("enviar");
                    }}
                  >
                    Confirmar {localStorage.getItem("Rol") === "Validador"
                      ? "Validación"
                      : (localStorage.getItem("Rol") === "Revisor" && props.rowSolicitud.NoEstatus === "5" && props.rowSolicitud.IdEditor === localStorage.getItem("IdUsuario"))
                        ? "Revisión"
                        : "Autorización"}
                  </Button>
                )}

                {/* Prevención */}
                {localStorage.getItem("Rol") === "Autorizador" && ["7", "16", "25"].includes(props.rowSolicitud.NoEstatus) && (
                  <Button
                    sx={{
                      ...queries.buttonContinuar,
                      fontSize: { sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                      padding: { sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                      minWidth: { sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                      whiteSpace: "nowrap" as const,
                      height: "auto",
                      lineHeight: 1.2,
                      flexShrink: 1,
                      borderRadius: "0.5rem",
                      display: { xs: "none", sm: "flex" },
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => {
                      setOpenDialogRegresar(true);
                      setAccion("requerimiento");
                    }}
                  >
                    Prevención
                  </Button>
                )}

                {/* Desechamiento */}
                {localStorage.getItem("Rol") === "Autorizador" && ["7", "16", "25"].includes(props.rowSolicitud.NoEstatus) && (
                  <Button
                    sx={{
                      ...queries.buttonContinuar,
                      fontSize: { sm: "0.65rem", md: "0.75rem", lg: "0.8rem", xl: "0.85rem" },
                      padding: { sm: "4px 8px", md: "5px 10px", lg: "6px 12px", xl: "6px 14px" },
                      minWidth: { sm: "70px", md: "85px", lg: "100px", xl: "110px" },
                      whiteSpace: "nowrap" as const,
                      height: "auto",
                      lineHeight: 1.2,
                      flexShrink: 1,
                      borderRadius: "0.5rem",
                      display: { xs: "none", sm: "flex" },
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => {
                      setOpenDialogConfirmacionDesechamiento(true);
                    }}
                  >
                    Desechamiento
                  </Button>
                )}
              </>
              : null
          }
        </Grid>

      </DialogTitle>

      <DialogContent
        sx={{
          mt: 2,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".5vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Grid
          //width={query.isTittle ? "20%" : "20%"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontFamily: "MontserratBold",
            }}
          >
            <strong>{`Número de Registro: ${props.rowSolicitud.NumeroRegistro}`}</strong>
          </Typography>
        </Grid>

        {props.rowSolicitud.TipoSolicitud === "Crédito Simple a Corto Plazo" ? (
          <Resumen coments={false} estatus={props.rowSolicitud.NoEstatus} funcionFiltroComentarios={setFiltroComentarios} mostrarDeclaratorias={true} />
        ) : (
          <ResumenLP coments={false} estatus={props.rowSolicitud.NoEstatus} funcionFiltroComentarios={setFiltroComentarios} mostrarDeclaratorias={true} />
        )}
      </DialogContent>

      <Dialog open={openGuardaComentarios} fullWidth maxWidth={"md"}>
        <DialogTitle sx={{
          bgcolor: "#AF8C55",
          color: "white",
          textAlign: "center",
          py: 2,
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Guardar Comentarios
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Comentarios nuevos */}
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{ p: 2, bgcolor: "#fafafa", borderLeft: "4px solid #AF8C55", mt: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#AF8C55", mb: 1 }}
                >
                  Comentarios Nuevos
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(comentarios).length === 0 ? (
                  <Typography sx={{ color: "#757575", textAlign: "center" }}>
                    No hay comentarios nuevos.
                  </Typography>
                ) : (
                  Object.entries(comentarios).map(([key, val], index) =>
                    (val as string) === "" ? null : (
                      <Grid
                        item
                        xs={12}
                        key={index}
                        sx={{
                          mb: 1,
                          p: 1.5,
                          bgcolor: "white",
                          borderRadius: 1,
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: "#AF8C55" }}
                        >
                          {key}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#000000" }}>
                          {val as string}
                        </Typography>
                      </Grid>
                    )
                  )
                )}
              </Paper>
            </Grid>

            {/* Comentarios que se eliminarán */}
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{ p: 2, bgcolor: "#ffebee", borderLeft: "4px solid #d32f2f", mt: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#d32f2f", mb: 1 }}
                >
                  Comentarios que se Eliminarán
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {comentariosEliminar.length === 0 ? (
                  <Typography sx={{ color: "#757575", textAlign: "center" }}>
                    No hay comentarios para eliminar.
                  </Typography>
                ) : (
                  comentariosEliminar.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{
                        mb: 1,
                        p: 1.5,
                        bgcolor: "white",
                        borderRadius: 1,
                        border: "1px solid #ffcdd2",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "#d32f2f",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.apartado}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000000",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.jsonOriginal[item.apartado]}
                      </Typography>
                    </Grid>
                  ))
                )}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={() => {
              cleanComentariosEliminar();
              setOpenGuardaComentarios(false);
            }}
            sx={{
              bgcolor: "#AF8C55",
              "&:hover": {
                bgcolor: "#8b6f47",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={async () => {
              try {
                const registrosActualizar = construirRegistrosActualizar();

                if (registrosActualizar.length > 0) {
                  await actualizarComentarios(registrosActualizar);
                }

                if (Object.keys(comentarios).length > 0) {
                  await addComentario(
                    props.rowSolicitud.Id,
                    JSON.stringify(comentarios),
                    localStorage.getItem("Rol") === "Capturador" ||
                      localStorage.getItem("Rol") === "Verificador"
                      ? "Captura"
                      : "Requerimiento"
                  );
                }

                alertaExito(
                  () => { },
                  "Comentarios guardados con éxito"
                );
                setOpenGuardaComentarios(false);
                props.handler(false);
                setTimeout(() => {
                  props.handler(true);
                }, 100);
                cleanComentariosEliminar();
              }
              catch (error) {
                console.error(error);
              }
            }}
            sx={{
              bgcolor: "#15212f",
              "&:hover": {
                bgcolor: "#0d1520",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogConfirmacionVolver} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: "#AF8C55",
            color: "white",
            textAlign: "center",
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ⚠️ Advertencia
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{ p: 2, bgcolor: "#fafafa", borderLeft: "4px solid #AF8C55", mt: 2 }}
              >
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 700, color: "#d32f2f", fontSize: "1.1rem" }}>
                  Se agregaron o modificaron comentarios en distintos campos.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Si desea enviarlos o guardar los cambios, por favor oprima el botón de{" "}
                  <strong style={{ color: "#AF8C55" }}>"Guardar Comentarios"</strong>.
                </Typography>
                {confirmBotonAccionComentario !== true && (
                  <Typography variant="body2">
                    De lo contrario, presione <strong style={{ color: "#15212f" }}>"Aceptar"</strong> para continuar y{" "}
                    <strong style={{ color: "#d32f2f" }}>borrar las modificaciones</strong>.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialogConfirmacionVolver(false);
            }}
            sx={{
              bgcolor: "#AF8C55",
              "&:hover": {
                bgcolor: "#8b6f47",
              },
            }}
          >
            Cerrar
          </Button>

          {confirmBotonAccionComentario !== true && (
            <Button
              variant="contained"
              onClick={() => {
                setOpenDialogConfirmacionVolver(false);
                props.handler(false);
                useCortoPlazoStore.setState({
                  comentarios: {},
                  idComentario: "",
                });
                cleanSolicitudCortoPlazo();
                cleanSolicitudLargoPlazo();
                cleanCondicionFinanciera();
              }}
              sx={{
                bgcolor: "#15212f",
                "&:hover": {
                  bgcolor: "#0d1520",
                },
              }}
            >
              Aceptar
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* {openGuardaComentarios && (
        <DialogGuardarComentarios
          open={openGuardaComentarios}
          handler={setOpenGuardaComentarios}
          
        />
      )} */}

      {openDialogEnviar && (
        <DialogAsignacionResumen
          handler={setOpenDialogEnviar}
          openState={openDialogEnviar}
          accion={"asignacion"}
        //arrDocsEliminados={arrDocsEliminados}
        />
      )}


      {openDialogRegresar && accion !== "desechamiento" && (
        <DialogSolicitarModificacion
          handler={setOpenDialogRegresar}
          openState={openDialogRegresar}
          accion={accion}
        //setRecargarSolicitud={props.setRecargarSolicitud}
        />
      )}

      {openPanelNoSolventados && (
        <PanelComentariosNoSolventados
          open={openPanelNoSolventados}
          onClose={() => setOpenPanelNoSolventados(false)}
          comentariosOriginales={comentariosSolicitudInscripcion}
        />
      )}

      {openDialogConfirmacionDesechamiento && (
        <DialogConfirmacionDesechamiento
          open={openDialogConfirmacionDesechamiento}
          onClose={() => setOpenDialogConfirmacionDesechamiento(false)}
          onConfirm={() => {
            setOpenDialogConfirmacionDesechamiento(false);

            const comentariosOriginales = comentariosSolicitudInscripcion
              .filter((c: any) => c.Tipo === "Requerimiento")
              .flatMap((c: any) => {
                try {
                  const parsed = JSON.parse(c.Comentarios);
                  return Object.keys(parsed).map((apartado) => ({
                    id: `${c.Id}-${apartado}`,
                    apartado: apartado,
                    comentario: parsed[apartado],
                    fecha: c.FechaCreacion,
                    usuario: c.Nombre,
                  }));
                } catch (e) {
                  return [];
                }
              });

            const comentariosNuevosArray = comentarios && typeof comentarios === "object"
              ? Object.keys(comentarios).map((apartado, index) => ({
                  id: `nuevo-${index}-${apartado}`,
                  apartado: apartado,
                  comentario: (comentarios as any)[apartado],
                  fecha: new Date().toISOString(),
                  usuario: "Autorizador (nuevo)",
                }))
              : [];

            const todosLosComentarios = [...comentariosOriginales, ...comentariosNuevosArray];

            const fechaPrevencion = props.rowSolicitud.FechaRequerimientos || "";
            const comentariosNoSolventados = useCortoPlazoStore.getState().comentariosNoSolventados;

            useInscripcionStore.getState().setProceso("desechado");

            desechamientoDoc(
              props.rowSolicitud.NumeroRegistro,
              props.rowSolicitud.Solicitud,
              todosLosComentarios,
              comentariosNoSolventados,
              comentarios,
              fechaPrevencion,
              setUrl
            );

            props.handler(false);
            navigate("../firmaUrl");
          }}
          comentariosOriginales={comentariosSolicitudInscripcion}
          comentariosNuevos={comentarios}
          rowSolicitud={props.rowSolicitud}
        />
      )}
    </Dialog>
  );
}
