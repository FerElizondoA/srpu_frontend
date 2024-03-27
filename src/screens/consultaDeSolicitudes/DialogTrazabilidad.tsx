import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IData } from "./ConsultaDeSolicitudPage";
import { queries } from "../../queries";

type Props = {
  handler: Function;
  openState: boolean;
  //rowId: string;
};

export function DialogTrazabilidad(props: Props) {
  return (
    <Dialog
      open={props.openState}
      maxWidth={"lg"}
      onClose={() => {
        props.handler(false);
        //cleanSolicitud();
      }}
    >
      <DialogTitle>
        <Typography>Historial de la solicitud</Typography>
      </DialogTitle>

      <DialogContent></DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          onClick={() => {
            props.handler(false);
          }}
        >
          <Typography>Cerrar</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
