import { Button, Dialog, TextField, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export function ComentarioApartado({
  setOpen,
  openState,
}: {
  setOpen: Function;
  openState: { open: boolean; apartado: string; tab: string };
}) {
  const [coment, setComent] = useState({ Apartado: "", Comentario: "" });

  const comentario: any = useCortoPlazoStore((state) => state.comentarios);

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario
  );

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario
  );

  // const comentariosRegistro: any = useCortoPlazoStore(
  //   (state) => state.comentariosRegistro
  // );

  useEffect(() => {
    // comentariosRegistro[openState.apartado] &&
    setComent({
      Apartado: openState.apartado,
      Comentario: comentario[openState.apartado],
      // ||
      // comentariosRegistro[openState.apartado],
    });
  }, [openState.apartado]);

  return (
    <Dialog
      fullWidth
      open={openState.open || false}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle sx={{ color: "#AF8C55" }}>
        Comentario: <strong>{openState.apartado}</strong>
      </DialogTitle>

      <DialogContent>
        <TextField
          label={
            comentario[openState.apartado]
              ? "Editar comentario"
              : "Nuevo comentario"
            // comentariosRegistro[openState.apartado]
            //   ? "Editar comentario"
            //   : "Nuevo comentario"
          }
          sx={{ width: "100%", mt: 2 }}
          value={coment.Comentario}
          onChange={(v) => {
            setComent({
              Comentario: v.target.value,
              Apartado: openState.apartado,
            });
          }}
          multiline
        />
      </DialogContent>

      <DialogActions>
        {comentario[openState.apartado] !== "" ? (
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              removeComentario(openState.apartado);
              setOpen(false);
            }}
          >
            Eliminar comentario
          </Button>
        ) : null}
        <Button
          sx={queries.buttonCancelar}
          onClick={() => {
            setComent({ Comentario: "", Apartado: "" });
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            newComentario(coment, openState.tab);
            setComent({ Comentario: "", Apartado: "" });
            setOpen(false);
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
