import * as React from "react";
import { Grid, Typography, Dialog, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCortoPlazoStore } from "../../../store/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
};

export function ConfirmacionCancelarSolicitud({
  handler,
  openState
}:{
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
