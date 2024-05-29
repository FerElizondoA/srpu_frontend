/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, TextField, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export function ComentarioApartado({
  setOpen,
  openState,
}: {
  setOpen: Function;
  openState: { open: boolean; apartado: string; tab: string };
}) {
  const [coment, setComent] = useState({ Apartado: "", Comentario: "" });

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);

  const newComentario: Function = useLargoPlazoStore(
    (state) => state.newComentario
  );

  const removeComentario: Function = useLargoPlazoStore(
    (state) => state.removeComentario
  );

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

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
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          {comentario[openState.apartado] || ""}
        </Typography>
        <TextField
          label="Nuevo comentario"
          sx={{ width: "100%", mt: 2 }}
          value={coment.Comentario}
          disabled={reestructura === "con autorizacion"}
          onChange={(v) => {
            setComent({
              Comentario: v.target.value,
              Apartado: openState.apartado,
            });
          }}
          multiline
          rows={2}
        />
      </DialogContent>

      <DialogActions>
        {comentario[openState.apartado] !== "" ? (
          <Button
            sx={queries.buttonCancelar}
            disabled={reestructura === "con autorizacion"}
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
          //disabled={reestructura}
          onClick={() => {
            setComent({ Comentario: "", Apartado: "" });
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          sx={queries.buttonContinuar}
          disabled={reestructura === "con autorizacion"}
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
