import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
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

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const [comentario, setComentario] = useState("");

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [errorAsignacion, setErrorAsignacion] = useState(false)

  useEffect(() => {
    getListadoUsuarios(setUsuarios, 1);
  }, [openState]);
  
  useEffect(() =>{
    setErrorAsignacion(false)
  
  },[idUsuarioAsignado]);

  const editCreadoPor: string = useCortoPlazoStore(
    (state) => state.editCreadoPor
  );

  const checkform = () => {
    if (idUsuarioAsignado === "") {
      setErrorAsignacion(true)
      }else {

        if (idSolicitud !== "") {
          modificaSolicitud(editCreadoPor, idUsuarioAsignado, "Captura")
            .then(() => {
              addComentario(idSolicitud, comentario);
              Swal.fire({
                icon: "success",
                title: "Mensaje",
                text: "La solicitud se envió con éxito",
              });
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Mensaje",
                text: "Ocurrió un error, inténtelo de nuevo",
              });
            });
          createNotification(
            "Crédito simple corto plazo",
            "Se te ha asignado una solicitud para modificación.",
            [idUsuarioAsignado]
          );
          navigate("../ConsultaDeSolicitudes");
        } else {
          crearSolicitud(
            localStorage.getItem("IdUsuario"),
            idUsuarioAsignado,
            "Captura",
            comentario
          ).catch(() => {
            Swal.fire({
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
          navigate("../ConsultaDeSolicitudes");
        }

        handler(false);

      }
    
  }

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
        <FormControl fullWidth>
          <TextField
            select
            value={idUsuarioAsignado}
            onChange={(e) => {
              setidUsuarioAsignado(e.target.value);
            }}
            helperText={errorAsignacion === true ? "Debe de asigarle a un usuario la solicitud" : null}
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
          {comentario == null || /^[\s]*$/.test(comentario)
            ? "Enviar sin comentarios"
            : "Enviar con comentarios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
