import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  idAutorizacion: string;
  handler: Function;
  openState: boolean;
  numeroAutorizacion: string;
  index: number;
};

export function DialogEliminarAutorizacion(props: Props) {
  const borrarAutorizacion: Function = useLargoPlazoStore(
    (state) => state.borrarAutorizacion
  );

  
  const removeAutorizacionesSelect : Function = useLargoPlazoStore(
    (state) => state.removeAutorizacionesSelect
  )

  return (
    <Dialog keepMounted open={props.openState} TransitionComponent={Transition}>
      <DialogTitle sx={{ ...queries.bold_text }}>Advertencia</DialogTitle>

      <DialogContent>
        <Typography sx={{ ...queries.medium_text }}>
          ¿Seguro que desea elimminar la autorizacion con este numero de
          autorizacion : <strong style={{}}>{props.numeroAutorizacion}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ ...queries.buttonContinuar }}
          onClick={() => {
            props.handler(false);
            borrarAutorizacion(props.idAutorizacion);
            removeAutorizacionesSelect(props.index)
          }}
        >
          Aceptar
        </Button>

        <Button
          sx={{ ...queries.buttonCancelar }}
          onClick={() => {
            props.handler(false);
          }}
        >
          Cerrar
        </Button>

      </DialogActions>
    </Dialog>
  );
}
