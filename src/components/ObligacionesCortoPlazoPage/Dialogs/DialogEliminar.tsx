import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";

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
  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

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
            borrarSolicitud(inscripcion.Id);
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
