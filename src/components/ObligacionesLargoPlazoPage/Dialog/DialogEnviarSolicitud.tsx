import * as React from "react";
import {
  Typography,
  Dialog,
  Slide,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
//"./DialogSolicitarModificacion";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ConfirmacionDescargaSolicitud({
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

  const [comentario, setComentario] = React.useState("");

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
    getListadoUsuarios(setUsuarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState === true]);

  const navigate = useNavigate();
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
        <Typography sx={queries.medium_text}>
          {localStorage.getItem("Rol") === "Capturador"
            ? "Enviar"
            : "Finalizar"}{" "}
          Documento
        </Typography>
      </DialogTitle>

      <DialogContent>
        {localStorage.getItem("Rol") === "Capturador" && (
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
        )}

        <TextField
          fullWidth
          label="Comentario"
          multiline
          variant="standard"
          rows={4}
          value={comentario}
          onChange={(texto) => {
            if (texto.target.value.length <= 200) {
              setComentario(texto.target.value);
            }
          }}
        />
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
                  "Por Firmar"
                )
                  .then(() => {
                    addComentario(idSolicitud, comentario);
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
                  "Crédito simple largo plazo",
                  "La solicitud de inscripción está lista para firmar",
                  [localStorage.getItem("IdUsuario") || ""]
                );
                navigate("../ConsultaDeSolicitudes");
              } else if (localStorage.getItem("Rol") === "Capturador") {
                modificaSolicitud(
                  editCreadoPor,
                  idUsuarioAsignado,
                  "Verificacion"
                )
                  .then(() => {
                    addComentario(idSolicitud, comentario);
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
                navigate("../ConsultaDeSolicitudes");
                createNotification(
                  "Crédito simple largo plazo",
                  "Se te ha asignado una solicitud de inscripción",
                  [idUsuarioAsignado]
                );
              }
            } else {
              if (localStorage.getItem("Rol") === "Verificador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("IdUsuario"),
                  "Por Firmar"
                )
                  .then(() => {
                    addComentario(idSolicitud, comentario);
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
                navigate("../ConsultaDeSolicitudes");
                createNotification(
                  "Crédito simple largo plazo",
                  "La solicitud de inscripción está lista para firmar",
                  [localStorage.getItem("IdUsuario") || ""]
                );
              } else if (localStorage.getItem("Rol") === "Capturador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  idUsuarioAsignado,
                  "Verificacion"
                )
                  .then(() => {
                    addComentario(idSolicitud, comentario);
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
                navigate("../ConsultaDeSolicitudes");
                createNotification(
                  "Crédito simple largo plazo",
                  "Se te ha asignado una solicitud de inscripción",
                  [idUsuarioAsignado]
                );
              }
            }
            navigate("../ConsultaDeSolicitudes");
          }}
          variant="text"
          sx={queries.buttonContinuar}
        >
          {comentario == null || /^[\s]*$/.test(comentario)
            ? `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } sin comentarios`
            : `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } con comentarios`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
