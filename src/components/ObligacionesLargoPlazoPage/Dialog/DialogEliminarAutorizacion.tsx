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
import { forwardRef } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IAutorizaciones } from "../../../store/CreditoLargoPlazo/autorizacion";

const Transition = forwardRef(function Transition(
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
  numeroAutorizacion: string;
};

export function DialogEliminarAutorizacion(props: Props) {
  const borrarAutorizacion: Function = useLargoPlazoStore(
    (state) => state.borrarAutorizacion
  );

  const autorizacionSelect: IAutorizaciones = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );

  return (
    <Dialog keepMounted open={props.openState} TransitionComponent={Transition}>
      <DialogTitle sx={{ ...queries.bold_text }}>Advertencia</DialogTitle>

      <DialogContent>
        <Typography sx={{ ...queries.medium_text }}>
          ¿Seguro que desea elimminar la autorizacion con este número de
          autorizacion : <strong style={{}}>{props.numeroAutorizacion}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ ...queries.buttonContinuar }}
          onClick={() => {
            props.handler(false);
            borrarAutorizacion(autorizacionSelect.Id);
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
