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
import { useNavigate } from "react-router-dom";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "./DialogSolicitarModificacion";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { alertaConfirmCancelarError, alertaConfirmCancelar, alertaError, alertaExito } from "../../../generics/Alertas";
import { IDocsEliminados } from "../Panels/InterfacesCortoPlazo";

export function ConfirmacionEnviarSolicitud({
  handler,
  openState,
  arrDocsEliminados
}: {
  handler: Function;
  openState: boolean;
  arrDocsEliminados?:IDocsEliminados[]
}) {
  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [idUsuarioAsignado, setidUsuarioAsignado] = React.useState("");

  const [usuarios, setUsuarios] = React.useState<Array<IUsuariosAsignables>>(
    []
  );

  React.useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [openState]);

  const navigate = useNavigate();

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);
  const solicitud: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

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
          Cancelar xd
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
                    addComentario(
                      solicitud.Id,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                   
                    alertaExito(() =>{}, "La solicitud se envió con éxito")
                    cleanSolicitud();
                    // navigate("../ConsultaDeSolicitudes");
                    // createNotification(
                    //   "Crédito simple a corto plazo",
                    //   "La solicitud de inscripción está lista para firmar",
                    //   [localStorage.getItem("IdUsuario") || ""],

                    //   "asldjsakjsda",
                    //   "inscripcion"
                    // );
                  })
                  .catch(() => {
                    
                    alertaError("Ocurrió un error, inténtelo de nuevo")
                  });
              } else if (localStorage.getItem("Rol") === "Capturador") {
                modificaSolicitud(solicitud.CreadoPor, idUsuarioAsignado, "2", arrDocsEliminados)
                  .then(() => {
                    addComentario(
                      solicitud.Id,
                      JSON.stringify(comentarios),
                      "Captura",
                      
                    );
                    alertaExito(() =>{}, "La solicitud se envió con éxito")
                    cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                    createNotification(
                      "Crédito simple a corto plazo",
                      "Se te ha asignado una solicitud de inscripción",
                      [idUsuarioAsignado],
                      solicitud.Id,
                      "inscripcion"
                    );
                  })
                  .catch(() => {
                  
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  });
              }
            } else {
              if (localStorage.getItem("Rol") === "Verificador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  "3",
                  ""
                )
                  .then(() => {
                    
                    addComentario(
                      solicitud.Id,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    alertaConfirmCancelar("La solicitud se envió con éxito")
                    cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                  })
                  .catch(() => {
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  });
                createNotification(
                  "Crédito simple a corto plazo",
                  "La solicitud de inscripción está lista para firmar",
                  [localStorage.getItem("IdUsuario") || ""],
                  solicitud.Id,
                  "inscripcion"
                );
              } else if (localStorage.getItem("Rol") === "Capturador") {
                crearSolicitud(
                  idUsuarioAsignado,
                  "2",
                  "Se te ha asignado una solicitud de Credito a Corto Plazo"
                  
                )
                  .then(() => {
                    addComentario(
                      solicitud.Id,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    alertaConfirmCancelar("La solicitud se envió con éxito")
                    cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                  })
                  .catch(() => {
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  });
              }
            }
          }}
          variant="text"
          sx={queries.buttonContinuar}
        >
          {JSON.stringify(comentarios) == null ||
          /^[\s]*$/.test(JSON.stringify(comentarios))
            ? `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } `
            : `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } `}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
