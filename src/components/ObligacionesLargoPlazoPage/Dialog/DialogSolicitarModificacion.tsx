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
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";

export interface IUsuariosAsignables {
  id: string;
  Nombre: string;
  Rol: string;
}

export function DialogSolicitarModificacion({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
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

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);

  const [errorAsignacion, setErrorAsignacion] = useState(false);

  useEffect(() => {
    getListadoUsuarios(setUsuarios);
  }, [openState]);

  useEffect(() => {
    setErrorAsignacion(false);
  }, [idUsuarioAsignado]);

  const editCreadoPor: string = useLargoPlazoStore(
    (state) => state.editCreadoPor
  );

  const checkform = () => {
    if (idUsuarioAsignado === "") {
      setErrorAsignacion(true);
    } else {
      if (idSolicitud !== "") {
        modificaSolicitud(editCreadoPor, idUsuarioAsignado, "Captura")
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
          "Crédito simple a largo plazo",
          "Se te ha asignado una solicitud para modificación.",
          [idUsuarioAsignado]
        );
        navigate("../ConsultaDeSolicitudes");
      } else {
        crearSolicitud(
          localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "Captura",
          JSON.stringify(comentario)
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
          "Crédito simple a largo plazo",
          "Se te ha asignado una solicitud.",
          [idUsuarioAsignado]
        );
        navigate("../ConsultaDeSolicitudes");
      }

      handler(false);
    }
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
      <DialogTitle>
        <Typography sx={queries.medium_text}>Asignar a: </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid mb={2}>
          <FormControl fullWidth>
            <TextField
              select
              value={idUsuarioAsignado}
              onChange={(e) => {
                setidUsuarioAsignado(e.target.value);
              }}
              helperText={
                errorAsignacion === true
                  ? "Debe de asigarle a un usuario la solicitud"
                  : null
              }
              error={errorAsignacion}
            >
              {usuarios
                .filter((td: any) => td.Rol === "Capturador")
                .map((usuario, index) => {
                  return (
                    <MenuItem value={usuario.id} key={index}>
                      {usuario.Nombre + " " + usuario.Rol}
                    </MenuItem>
                  );
                })}
            </TextField>
          </FormControl>
        </Grid>
        <Typography sx={queries.bold_text}>Comentarios</Typography>
        {Object.entries(comentario).map(([key, val], index) =>
          (val as string) === "" ? null : (
            <Typography
              sx={{
                fontSize: "1.5ch",
              }}
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
          // disabled={idUsuarioAsignado===""}
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            checkform();
          }}
        >
          {"Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
