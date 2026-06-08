import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "./DialogSolicitarModificacion";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IDataAgregarSolicitud } from "../../../store/CreditoLargoPlazo/solicitud_inscripcion";
import { IDocsEliminados } from "../../ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";

export function ConfirmacionEnviarSolicitud({
  handler,
  openState,
  arrDocsEliminados,
}: {
  handler: Function;
  openState: boolean;
  arrDocsEliminados?: IDocsEliminados[];
}) {
  const crearSolicitud: Function = useLargoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [idUsuarioAsignado, setidUsuarioAsignado] = React.useState("");

  const [usuarios, setUsuarios] = React.useState<Array<IUsuariosAsignables>>([]);

  React.useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [openState]);

  const navigate = useNavigate();

  const comentarios: {} = useLargoPlazoStore((state) => state.comentarios);
  const solicitud: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  const cleanInscripcionModify: Function = useInscripcionStore(
    (state) => state.cleanInscripcionModify
  );

  const cleanInscripcion: Function = useInscripcionStore(
    (state) => state.cleanInscripcion
  );


  const createAsignacionTipoSolicitud: Function = useLargoPlazoStore(
    (state) => state.createAsignacionTipoSolicitud
  );

  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );

    const [idSolicitudCreada, setIdSolicitudCreada] = useState("");
  

  const [dataAsignacion, setDataAsignacion] = useState<IDataAgregarSolicitud>()



  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Grid display={"flex"} justifyContent={"center"}>
          <Typography sx={queries.bold_text}>
            {localStorage.getItem("Rol") === "Capturador"
              ? "Enviar"
              : "Finalizar"}{" "}
            Documento
          </Typography>
        </Grid>
      </DialogTitle>

      <DialogContent>
        {localStorage.getItem("Rol") === "Capturador" ? (
          <Grid>
            <Typography>
              Selecciona verificador al que deseas asignar esta solicitud{" "}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={idUsuarioAsignado}
                onChange={(e) => {
                  setidUsuarioAsignado(e.target.value);
                }}
              >
                {usuarios
                  .filter(
                    (td: any) =>
                      td.Rol ===
                      (localStorage.getItem("Rol") === "Capturador"
                        ? "Verificador"
                        : "Administrador")
                  )
                  .map((usuario, index) => {
                    return (
                      <MenuItem value={usuario.Id} key={index}>
                        {usuario.Nombre +
                          " " +
                          usuario.ApellidoPaterno +
                          " " +
                          usuario.ApellidoMaterno}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid>
            <Typography>
              {/* Al finalizar, la solicitud ya no estará disponible para modificar. */}
              Está a punto de finalizar la solicitud. Una vez lo haga,{" "}
              <strong>
                ya no estará disponible para realizar modificaciones.
              </strong>{" "}
              ¿Desea proceder?
            </Typography>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handler(false);
            if (solicitud.Id !== "") {
              if (localStorage.getItem("Rol") === "Verificador") {
                modificaSolicitud(
                  solicitud.CreadoPor,
                  localStorage.getItem("IdUsuario"),
                  "3",
                  arrDocsEliminados
                )
                  .then(() => {
                    if (comentarios && Object.keys(comentarios).length > 0) {
                      addComentario(
                        solicitud.Id,
                        JSON.stringify(comentarios),
                        "Captura"
                      );
                    } else {
                      console.log("NO AGREGAR COMENTARIO LARGO PLAZO");
                    }
                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentarios),
                    //   "Captura"
                    // );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    cleanSolicitudLargoPlazo();
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
                    navigate("../ConsultaDeSolicitudes");
                    // createNotification(
                    //   "Crédito simple a largo plazo",
                    //   "La solicitud de inscripción está lista para firmar",
                    //   [localStorage.getItem("IdUsuario") || ""]
                    // );
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
              } else if (localStorage.getItem("Rol") === "Capturador") {
                modificaSolicitud(solicitud.CreadoPor, idUsuarioAsignado, "2")
                  .then(() => {
                    if (comentarios && Object.keys(comentarios).length > 0) {
                      addComentario(
                        solicitud.Id,
                        JSON.stringify(comentarios),
                        "Captura"
                      );
                    }
                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentarios),
                    //   "Captura"
                    // );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
                    navigate("../ConsultaDeSolicitudes");
                    // createNotification(
                    //   "Crédito simple a largo plazo",
                    //   "Se te ha asignado una solicitud de inscripción",
                    //   [idUsuarioAsignado]
                    // );
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
              }
            } else {
              if (localStorage.getItem("Rol") === "Verificador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  "3",
                  localStorage.getItem("IdUsuario"),
                  setIdSolicitudCreada,
                  true
                )
                  .then((data: any) => {
                    if (comentarios && Object.keys(comentarios).length > 0) {
                      addComentario(
                        solicitud.Id,
                        JSON.stringify(comentarios),
                        "Captura"
                      );
                    }

                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentarios),
                    //   "Captura"
                    // );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
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
                //   "Crédito simple a largo plazo",
                //   "La solicitud de inscripción está lista para firmar",
                //   [localStorage.getItem("IdUsuario") || ""]
                // );
              } else if (localStorage.getItem("Rol") === "Capturador") {
                crearSolicitud(
                  idUsuarioAsignado,
                  "2",
                  "Se te ha asignado una solicitud de Credito a Largo Plazo",
                  setIdSolicitudCreada,
                  true
                )
                  .then(() => {

                    // PRUEBA SIN ESTA FUNCIONALIDAD DE COMENTARIOS
                    // if (comentarios && Object.keys(comentarios).length > 0) {
                    //    console.log("AGREGAR COMENTARIO LARGO PLAZO", "Solicitud ID: ", idSolicitudCreada, "Comentarios: ", comentarios);
                    //   addComentario(
                    //     idSolicitudCreada,
                    //     JSON.stringify(comentarios),
                    //     "Captura"
                    //   );
                    // }

                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentarios),
                    //   "Captura"
                    // );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
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
              }
            }
          }}
          variant="text"
          sx={queries.buttonContinuar}
        >
          {JSON.stringify(comentarios) == null ||
            /^[\s]*$/.test(JSON.stringify(comentarios))
            ? `${localStorage.getItem("Rol") === "Capturador"
              ? "Enviar"
              : "Finalizar"
            } `
            : `${localStorage.getItem("Rol") === "Capturador"
              ? "Enviar"
              : "Finalizar"
            } `}
        </Button>
      </DialogActions>
    </Dialog >
  );
}