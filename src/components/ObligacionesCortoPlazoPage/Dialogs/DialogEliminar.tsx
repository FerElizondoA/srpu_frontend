import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export function DialogEliminar({
  handler,
  openState,
  texto,
}: {
  handler: Function;
  openState: boolean;
  texto: string;
}) {
  const borrarSolicitud: Function = useCortoPlazoStore(
    (state) => state.borrarSolicitud
  );
  const idSolicitud: String = useCortoPlazoStore((state) => state.idSolicitud);

  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <DialogContent>
        <DialogContentText sx={{ ...queries.bold_text, textalign: "center" }}>
          ¿Deseas Eliminar la {texto}?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            handler(false);
            borrarSolicitud(idSolicitud);
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
