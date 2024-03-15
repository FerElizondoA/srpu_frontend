import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  FormControl,
  MenuItem,
  DialogActions,
  Grid,
} from "@mui/material";
import { queries } from "../../../queries";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import {
  IUsuariosAsignables,
  rolesAdmin,
} from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

export function DialogSolicitarModificacion({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

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

  const comentarios: {} = useLargoPlazoStore((state) => state.comentarios);

  const editCreadoPor: string = useLargoPlazoStore(
    (state) => state.editCreadoPor
  );

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [openState]);

  const checkform = () => {
    if (rolesAdmin.includes(localStorage.getItem("Rol")!)) {
      addComentario(idSolicitud, JSON.stringify(comentarios), "Requerimiento");
      CambiaEstatus(
        localStorage.getItem("Rol") === "Autorizador"
          ? accion === "enviar"
            ? Object.keys(comentarios).length > 0
              ? "7"
              : "9"
            : "5"
          : localStorage.getItem("Rol") === "Validador"
          ? accion === "enviar"
            ? "6"
            : "4"
          : "5",
        idSolicitud,
        localStorage.getItem("Rol") === "Autorizador"
          ? localStorage.getItem("IdUsuario")!
          : idUsuarioAsignado
      ).then(() => {
        createNotification(
          "Crédito simple a corto plazo",
          `Se te ha asignado una solicitud para  ${
            localStorage.getItem("Rol") === "Autorizador"
              ? accion === "enviar"
                ? "firmar"
                : "validación"
              : localStorage.getItem("Rol") === "Validador"
              ? accion === "enviar"
                ? "autorización"
                : "revisión"
              : "validación"
          }`,
          [
            localStorage.getItem("Rol") === "Autorizador"
              ? localStorage.getItem("IdUsuario")!
              : idUsuarioAsignado,
          ]
        );
        window.location.reload();
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });
    } else {
      if (idSolicitud !== "") {
        modificaSolicitud(
          editCreadoPor || localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "1"
        )
          .then(() => {
            !rolesAdmin.includes(localStorage.getItem("Rol")!) &&
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
          [idUsuarioAsignado]
        );
        navigate("../ConsultaDeSolicitudes");
      } else {
        crearSolicitud(
          localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "1",
          JSON.stringify(comentarios)
        ).catch(() => {
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
          `Se te ha asignado una solicitud para modificación`,
          [idUsuarioAsignado]
        );
        navigate("../ConsultaDeSolicitudes");
      }
    }

    handler(false);
  };

  return (
    <Dialog
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      {localStorage.getItem("Rol") === "Autorizador" && accion === "enviar" ? (
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            {Object.keys(comentarios).length > 0 ? "" : "Inscripción"}
          </Typography>
        </DialogTitle>
      ) : (
        <DialogTitle>
          <Typography sx={queries.bold_text}>Asignar a: </Typography>
        </DialogTitle>
      )}

      <DialogContent>
        {localStorage.getItem("Rol") === "Autorizador" &&
        accion === "enviar" ? null : (
          <Grid mb={2}>
            <FormControl fullWidth>
              <TextField
                select
                value={idUsuarioAsignado}
                onChange={(e) => {
                  setidUsuarioAsignado(e.target.value);
                }}
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
          </Grid>
        )}

        {Object.entries(comentarios).length > 0 && (
          <Typography sx={queries.bold_text}>
            {rolesAdmin.includes(localStorage.getItem("Rol")!)
              ? "Requerimientos"
              : "Comentarios"}
          </Typography>
        )}
        {Object.entries(comentarios).map(([key, val], index) =>
          (val as string) === "" ? null : (
            <Typography
              sx={{
                fontSize: "1.5ch",
              }}
              key={index}
            >
              <strong>{key}:</strong>
              {val as string}
            </Typography>
          )
        )}
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => handler(false)}
        >
          Cancelar
        </Button>

        <Button
          disabled={
            localStorage.getItem("Rol") === "Autorizador"
              ? accion === "modificar" && idUsuarioAsignado === ""
              : idUsuarioAsignado === ""
          }
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            checkform();
          }}
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
