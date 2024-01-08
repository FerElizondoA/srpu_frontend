import {
  Button,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";

type Props = {
  handler: Function;
  openState: boolean;
};

export function DialogSolicitarReestructura(props: Props) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const idSolicitud: string = useLargoPlazoStore((state) => state.idSolicitud);

  const [errorAsignacion, setErrorAsignacion] = useState(false);

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
    setidUsuarioAsignado("");
  }, [props.openState]);

  useEffect(() => {
    setErrorAsignacion(false);
  }, [idUsuarioAsignado]);

  const editCreadoPor: string = useLargoPlazoStore(
    (state) => state.editCreadoPor
  );

  const reestriccionReestructura = () => {
    if (idUsuarioAsignado === "") {
      setErrorAsignacion(true);
    }
    if (idSolicitud !== "") {
      modificaSolicitud(editCreadoPor, idUsuarioAsignado, "En Reestructura")
        .then(() => {
          //addComentario(idSolicitud);
          Swal.fire({
            confirmButtonColor: "#15212f",
            cancelButtonColor: "rgb(175, 140, 85)",
            icon: "success",
            title: "Mensaje",
            text: "La solicitud de autorización se envió con éxito",
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
        "Se te ha solicitado revisar una autorización para reestructurar.",
        [idUsuarioAsignado]
      );
      navigate("../reestructura");
    }
  };

  return (
    <Dialog open={props.openState} fullWidth>
      <DialogTitle>Seleccione un autorizador</DialogTitle>

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
                  ? "Debe de asigarle la solicitud a un usuario"
                  : null
              }
              error={errorAsignacion}
            >
              {usuarios
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
                })}
            </TextField>
          </FormControl>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => {
            props.handler(false);
          }}
        >
          Cancelar
        </Button>

        <Button
          // disabled={idUsuarioAsignado===""}
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            reestriccionReestructura();
          }}
        >
          {"Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
