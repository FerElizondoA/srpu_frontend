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
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

export function ConfirmacionEnviarSolicitud({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const crearSolicitud: Function = useLargoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const idSolicitud: string = useLargoPlazoStore((state) => state.idSolicitud);

  const addComentario: Function = useLargoPlazoStore(
    (state) => state.addComentario
  );

  const [idUsuarioAsignado, setidUsuarioAsignado] = React.useState("");

  const [usuarios, setUsuarios] = React.useState<Array<IUsuariosAsignables>>(
    []
  );

  const editCreadoPor: string = useLargoPlazoStore(
    (state) => state.editCreadoPor
  );

  React.useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [openState]);

  const navigate = useNavigate();

  const comentarios: {} = useLargoPlazoStore((state) => state.comentarios);

  // const cleanSolicitud: Function = useLargoPlazoStore(
  //   (state) => state.cleanSolicitud
  // );

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
            if (idSolicitud !== "") {
              if (localStorage.getItem("Rol") === "Verificador") {
                modificaSolicitud(
                  editCreadoPor,
                  localStorage.getItem("IdUsuario"),
                  "3"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    // cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                    createNotification(
                      "Crédito simple a corto plazo",
                      "La solicitud de inscripción está lista para firmar",
                      [localStorage.getItem("IdUsuario") || ""]
                    );
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
                modificaSolicitud(editCreadoPor, idUsuarioAsignado, "2")
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    // cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                    createNotification(
                      "Crédito simple a corto plazo",
                      "Se te ha asignado una solicitud de inscripción",
                      [idUsuarioAsignado]
                    );
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
                  localStorage.getItem("IdUsuario"),
                  "3"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    // cleanSolicitud();
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
                  "La solicitud de inscripción está lista para firmar",
                  [localStorage.getItem("IdUsuario") || ""]
                );
              } else if (localStorage.getItem("Rol") === "Capturador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  idUsuarioAsignado,
                  "2"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    // cleanSolicitud();
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
