import { Button, Dialog, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";

export function ConfirmacionCancelarSolicitud({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
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
      maxWidth={"sm"}
    >
      <DialogTitle>
        <Typography align="center" sx={queries.medium_text} mb={2}>
          Cancelar Solicitud
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          ¿Deseas cancelar la captura de la solicitud?
        </DialogContentText>
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
          sx={queries.buttonContinuar}
          onClick={() => {
            navigate("../ConsultaDeSolicitudes");
            handler(false);
          }}
          variant="text"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
