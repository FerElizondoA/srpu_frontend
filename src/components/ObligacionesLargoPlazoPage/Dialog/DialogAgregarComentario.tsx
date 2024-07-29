import * as React from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import DialogActions from "@mui/material/DialogActions";
import { rolesAdmin } from "./DialogSolicitarModificacion";

export function AgregarComentario({
  handler,
  openState,
  IdSolicitud,
}: {
  handler: Function;
  openState: boolean;
  IdSolicitud: string;
}) {
  const [comentario, setComentario] = React.useState("");

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  return (
    <Dialog
      open={openState}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography sx={queries.medium_text}>Crear comentario</Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Comentario"
          multiline
          variant="standard"
          rows={4}
          value={comentario}
          onChange={(texto) => {
            if (texto.target.value.length <= 200) {
              setComentario(
                /^[a-zA-Z0-9áéíóú ()$_,.-]*$/.test(texto.target.value)
                  ? texto.target.value
                  : comentario
              );
            }
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button sx={queries.buttonCancelar} onClick={() => handler(false)}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            rolesAdmin.includes(localStorage.getItem("Rol")!)
              ? addComentario(IdSolicitud, comentario, "AdminReestructura")
              : addComentario(IdSolicitud, comentario, "CapturaReestructura");
            setComentario("");
            handler(false);
          }}
          variant="text"
          sx={queries.buttonContinuar}
        >
          Enviar Comentario
        </Button>
      </DialogActions>
    </Dialog>
  );
}
