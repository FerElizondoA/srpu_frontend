import { useEffect } from "react";
import { Dialog, Button, TextField, Typography } from "@mui/material";
import { queries } from "../../../queries";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCortoPlazoStore } from "../../../store/main";
import { IComentario } from "../../../store/comentarios_apartado";

export function ComentarioApartado({
  setOpen,
  openState,
}: {
  setOpen: Function;
  openState: { open: boolean; apartado: string; tab: string };
}) {
  const comentario: IComentario = useCortoPlazoStore(
    (state) => state.comentario
  );

  const setComentario: Function = useCortoPlazoStore(
    (state) => state.setComentario
  );

  const cleanComentario: Function = useCortoPlazoStore(
    (state) => state.cleanComentario
  );

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario
  );

  const comentarios: IComentario[] = useCortoPlazoStore(
    (state) => state.comentarios
  );

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario
  );

  useEffect(() => {
    cleanComentario();
    console.log(comentarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState]);

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
        {comentarios.filter((_, i) => _.Apartado === openState.apartado)
          .length > 0
          ? "Editar "
          : "Agregar "}
        comentario: <strong>{openState.apartado}</strong>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          {comentarios?.filter((_, i) => _.Apartado === openState.apartado)[0]
            ?.Comentario || ""}
        </Typography>
        <TextField
          label="Nuevo comentario"
          sx={{ width: "100%", mt: 2 }}
          value={comentario.Comentario}
          onChange={(v) => {
            setComentario({
              Comentario: v.target.value.replaceAll("\n", ""),
              Apartado: openState.apartado,
              Tab: openState.tab,
            });
          }}
          multiline
          rows={2}
        />
      </DialogContent>

      <DialogActions>
        {comentarios.filter((_, i) => _.Apartado === openState.apartado)
          .length > 0 ? (
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
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            newComentario(comentario);
            setOpen(false);
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
