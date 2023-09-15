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
  InputLabel,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";

export interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Rol: string;
}

export function DialogSolicitarCancelacion({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const [justificacion, setJustificacion] = useState("");
  const [error, setError] = useState(false);
  return (
    <Dialog
      fullWidth
      open={openState}
      maxWidth={"md"}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography sx={queries.medium_text}>Justificación </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid>
          <InputLabel>Acreditación de la cancelación</InputLabel>
          <Typography
            position={"absolute"}
            sx={{
              fontFamily: "MontserratMedium",
              border: "2px dotted black",
              width: "90%",
              fontSize: "80%",
            }}
          >
            {"ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              // cargarArchivo(v);
            }}
            style={{
              opacity: 0,
              width: "90%",
              cursor: "pointer",
            }}
          />
        </Grid>

        <Grid>
          <InputLabel>Baja de crédito federal</InputLabel>
          <Typography
            position={"absolute"}
            sx={{
              fontFamily: "MontserratMedium",
              border: "2px dotted black",
              width: "90%",
              fontSize: "80%",
            }}
          >
            {"ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              // cargarArchivo(v);
            }}
            style={{
              opacity: 0,
              width: "90%",
              cursor: "pointer",
            }}
          />
        </Grid>

        <Grid>
          <TextField
            sx={{ width: "95%" }}
            label="Justificación Escrita"
            margin="dense"
            variant="outlined"
            multiline
            onChange={(e) => {
              e.target.value.length <= 200 && setJustificacion(e.target.value);
            }}
            value={justificacion}
            helperText={200 - justificacion.length + " caracteres restantes"}
            error={error}
          />
        </Grid>
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
            setError(/^[\s]*$/.test(justificacion));
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
