import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  MenuItem,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { useTrazabilidad } from "../../../store/Trazabilidad/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { IDocsEliminados } from "../Panels/InterfacesCortoPlazo";
import { alertaConfirmCancelar } from "../../../generics/Alertas";

export interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Rol: string;
}

export const rolesAdmin = ["Revisor", "Validador", "Autorizador"];

export function DialogSolicitarModificacion({
  handler,
  openState,
  accion,
  arrDocsEliminados,
  // setRecargarSolicitud
}: {
  handler: Function;
  openState: boolean;
  accion: string;
  arrDocsEliminados?: IDocsEliminados[];
  // setRecargarSolicitud?: Function;
}) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");
  const [idSolicitudCreada, setIdSolicitudCreada] = useState("");

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);

  const comentariosSolicitudInscripcion = useCortoPlazoStore(
    (state) => state.comentariosSolicitudInscripcion
  );

  const comentariosNoSolventados = useCortoPlazoStore(
    (state) => state.comentariosNoSolventados
  );

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );


  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  const [filtroTipoGuardado, setFiltroTipoGuardado] = useState(0);

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );


  const cleanInscripcionModify: Function = useInscripcionStore(
    (state) => state.cleanInscripcionModify
  );

  const cleanInscripcion: Function = useInscripcionStore(
    (state) => state.cleanInscripcion
  );

  const cleanTablaCondicionesFinancieras: Function = useCortoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );


  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);

    // console.log("HOLA ESTOY EN DIALOG SOLICITAR MODIFICACION");
    // console.log('arrDocsEliminadossolicitar modificacion', arrDocsEliminados);
  }, [openState]);

  const checkform = async () => {
    if (rolesAdmin.includes(localStorage.getItem("Rol")!)) {

      //export const rolesAdmin = ["Revisor", "Validador", "Autorizador"];

      // Capturar la fecha antes de cambiaEstatus para que coincida con FechaRequerimientos
      const fechaNotificacion = new Date().toISOString();

      if (comentarios && Object.keys(comentarios).length > 0) {
        console.log("AGREGAR COMENTARIO");
        addComentario(
          inscripcion.Id,
          JSON.stringify(comentarios),
          "Requerimiento"
        );
      }

      if (
        localStorage.getItem("Rol") === "Autorizador" &&
        accion === "requerimiento"
      ) {
        await useTrazabilidad
          .getState()
          .getPrimerUsuarioEstatus2(inscripcion.Id);
      }

      CambiaEstatus(
        localStorage.getItem("Rol") === "Autorizador"
          ? accion === "enviar"
            ? "10"
            : accion === "requerimiento"
              ? "8"
              : "6"   //SINO SE OCUPA LO DE ARRIBA ESTE ES EL ESTATUS QUE DEBE QUEDAR POR DEFAULT
          : localStorage.getItem("Rol") === "Validador"
            ? accion === "enviar"
              ? "7" //Antes 6
              : "5" //Antes 4
            : "6", //Antes 5

        inscripcion.Id,
        localStorage.getItem("Rol") === "Autorizador" && idUsuarioAsignado === ""
          ? accion === "requerimiento"
            ? useTrazabilidad.getState().IdPrimerUsuarioEstatus2
            : localStorage.getItem("IdUsuario")!
          : idUsuarioAsignado
      ).then(() => {


        createNotification(
          "Crédito simple a corto plazo",
          `Se te ha asignado una solicitud para  
          ${localStorage.getItem("Rol") === "Autorizador" 
            ?accion === "enviar" 
              ?"firmar"
              : "validación"
            : localStorage.getItem("Rol") === "Validador"
              ? accion === "enviar"
                ? "autorización"
                : "revisión"
              : "validación"
          }`,

          [
            localStorage.getItem("Rol") === "Autorizador"
              ? accion === "requerimiento"
                ? useTrazabilidad.getState().IdPrimerUsuarioEstatus2
                : localStorage.getItem("IdUsuario")!
              : idUsuarioAsignado,
          ],
          inscripcion.Id,
          "inscripcion",
          parseInt(inscripcion.NumeroRegistro),
          fechaNotificacion
        );



        // getSolicitudes(
        //   !rolesAdmin.includes(localStorage.getItem("Rol")!)
        //     ? "Inscripcion"
        //     : "Revision",
        //   (e: IInscripcion[]) => {
        //     setDatos(e);
        //   },
        //   setDatosFiltrados
        // );

        //BORRA ESA MADRE

        const state = useInscripcionStore.getState();


        state.setRecargarSolicitud(true)
        //window.location.reload();
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });
    } else {
      if (inscripcion.Id !== "") {
        console.log('arrDocsEliminados dialog: ', arrDocsEliminados);

        modificaSolicitud(
          inscripcion.CreadoPor || localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "1",
          arrDocsEliminados,
          0, //filtroTipoGuardado
        )
          .then(() => {

            if (!rolesAdmin.includes(localStorage.getItem("Rol")!) && (comentarios && Object.keys(comentarios).length > 0)) {
              console.log("AGREGAR COMENTARIO");
              addComentario(
                inscripcion.Id,
                JSON.stringify(comentarios),
                "Captura"
              );
            } else {
              console.log("NO AGREGAR COMENTARIO");
            }

            // !rolesAdmin.includes(localStorage.getItem("Rol")!) && comentarios && Object.keys(comentarios).length > 0 &&


            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "success",
              title: "Mensaje",
              text: "La solicitud se envió con éxito",
            });
            cleanSolicitud();
            cleanSolicitudCortoPlazo();
            cleanInscripcion();
            cleanInscripcionModify();
            cleanTablaCondicionesFinancieras();
            const state = useInscripcionStore.getState();
            state.setRecargarSolicitud(true);
            navigate("../ConsultaDeSolicitudes");

          })
          .catch(() => {
            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
        createNotification(
          "Crédito simple a corto plazo",
          "Se te ha asignado una solicitud para modificación",
          [idUsuarioAsignado],
          inscripcion.Id,
          "inscripcion"
        );
        navigate("../ConsultaDeSolicitudes");
      } else {

        crearSolicitud(
          idUsuarioAsignado,
          "1",
          "",
          //JSON.stringify(comentarios),
          setIdSolicitudCreada
        ).then(() => {

          if (comentarios && Object.keys(comentarios).length > 0) {
            console.log("AGREGAR COMENTARIO");
            addComentario(
              idSolicitudCreada,
              JSON.stringify(comentarios),
              "Captura"
            );
          } else {
            console.log("NO AGREGAR COMENTARIO");
          }

          // addComentario(
          //   idSolicitudCreada,
          //   JSON.stringify(comentarios),
          //   "Captura"
          // );
          alertaConfirmCancelar("La solicitud se envió con éxito")
          cleanSolicitud();
          navigate("../ConsultaDeSolicitudes");
        })

          .catch(() => {
            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
        // createNotification(
        //   "Crédito simple a corto plazo",
        //   `Se te ha asignado una solicitud para modificación`,
        //   [idUsuarioAsignado],
        //   idSolicitudCreada,
        //   "inscripcion"
        // );

      }
    }

    handler(false);
  };

  const getDialogTitle = (accion: string) => {
    switch (accion) {
      case "enviar":
        return "Confirmar Solicitud";
      case "requerimiento":
        return "Solicitud de Prevención";
      case "modificar":
        return "Devolver para Modificación";
      default:
        return "Confirmar Acción";
    }
  };

  const getComentariosTitle = () => {
    const rol = localStorage.getItem("Rol") || "";
    return ["Revisor", "Validador", "Autorizador"].includes(rol)
      ? "Requerimientos"
      : "Comentarios";
  };

  return (
    <Dialog
      maxWidth={"md"}
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#AF8C55",
          color: "white",
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {getDialogTitle(accion)}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Selector de usuario (si aplica) */}
          {!(localStorage.getItem("Rol") === "Autorizador" &&
            (accion === "enviar" || accion === "requerimiento")) && (
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{ p: 2, bgcolor: "#f5f5f5", borderLeft: "4px solid #AF8C55", mt: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Asignar a:
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={idUsuarioAsignado}
                    onChange={(e) => {
                      setidUsuarioAsignado(e.target.value);
                    }}
                    placeholder="Seleccione un usuario"
                  >
                    {localStorage.getItem("Rol")! === "Autorizador" ||
                    localStorage.getItem("Rol") === "Revisor"
                      ? usuarios
                          .filter((usr) => usr.Rol === "Validador")
                          .map((usuario, index) => {
                            return (
                              <MenuItem value={usuario.Id} key={index}>
                                {usuario.Nombre +
                                  " " +
                                  usuario.ApellidoPaterno +
                                  " " +
                                  usuario.ApellidoMaterno +
                                  " - " +
                                  (usuario.Rol || "")}
                              </MenuItem>
                            );
                          })
                      : localStorage.getItem("Rol")! === "Validador"
                      ? accion === "enviar"
                        ? usuarios
                            .filter((usr) => usr.Rol === "Autorizador")
                            .map((usuario, index) => {
                              return (
                                <MenuItem value={usuario.Id} key={index}>
                                  {usuario.Nombre +
                                    " " +
                                    usuario.ApellidoPaterno +
                                    " " +
                                    usuario.ApellidoMaterno +
                                    " - " +
                                    (usuario.Rol || "")}
                                </MenuItem>
                              );
                            })
                        : usuarios
                            .filter((usr) => usr.Rol === "Revisor")
                            .map((usuario, index) => {
                              return (
                                <MenuItem value={usuario.Id} key={index}>
                                  {usuario.Nombre +
                                    " " +
                                    usuario.ApellidoPaterno +
                                    " " +
                                    usuario.ApellidoMaterno +
                                    " - " +
                                    (usuario.Rol || "")}
                                </MenuItem>
                              );
                            })
                      : usuarios
                          .filter((usr) => usr.Rol === "Capturador")
                          .map((usuario, index) => {
                            return (
                              <MenuItem value={usuario.Id} key={index}>
                                {usuario.Nombre +
                                  " " +
                                  usuario.ApellidoPaterno +
                                  " " +
                                  usuario.ApellidoMaterno +
                                  " - " +
                                  (usuario.Rol || "")}
                              </MenuItem>
                            );
                          })}
                  </TextField>
                </FormControl>
              </Paper>
            </Grid>
          )}

          {/* Comentarios/Requerimientos */}
          {Object.values(comentarios).some((val) => val !== "") && (
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{ p: 2, bgcolor: "#fafafa", borderLeft: "4px solid #AF8C55", mt: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#AF8C55", mb: 1 }}
                >
                  {getComentariosTitle()}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(comentarios).map(([key, val], index) =>
                  val === "" ? null : (
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
                )}
              </Paper>
            </Grid>
          )}

          {/* Mensaje si no hay comentarios */}
          {Object.values(comentarios).every((val) => val === "") && (
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderLeft: "4px solid #9e9e9e",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body1" sx={{ color: "#757575" }}>
                  {["Revisor", "Validador", "Autorizador"].includes(
                    localStorage.getItem("Rol") || ""
                  )
                    ? "Sin requerimientos adicionales"
                    : "Sin comentarios adicionales"}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={() => handler(false)}
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
          disabled={
            localStorage.getItem("Rol") === "Autorizador"
              ? accion === "modificar" && idUsuarioAsignado === ""
              : idUsuarioAsignado === ""
          }
          variant="contained"
          onClick={() => {
            checkform();
          }}
          sx={{
            bgcolor: "#15212f",
            "&:hover": {
              bgcolor: "#0d1520",
            },
            "&.Mui-disabled": {
              bgcolor: "#bdbdbd",
              color: "#757575",
            },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
