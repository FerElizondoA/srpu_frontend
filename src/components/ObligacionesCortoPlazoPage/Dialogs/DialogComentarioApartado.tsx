/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, TextField, ThemeProvider, createTheme } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});
export function ComentarioApartado({
  setOpen,
  openState,
  filtroComentarioVolver
}: {
  setOpen: Function;
  openState: { open: boolean; apartado: string; tab: string };
  filtroComentarioVolver?: Function
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

  const setFiltroComentarios: Function = useCortoPlazoStore(
    (state) => state.setFiltroComentarios
  );

  const filtroComentarios: boolean = useCortoPlazoStore(
    (state) => state.filtroComentarios
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

  // useEffect(() => {

  //   //console.log("comemt", coment,);
  //   //console.log("newComentario");

  //   //console.log("comentario", comentario);
  // }, [newComentario, coment.Comentario, comentario])



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
          }
          sx={{ width: "100%", mt: 2 }}
          value={coment.Comentario || ""}
          onChange={(v) => {
            setComent({
              Comentario: v.target.value
                .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,\s]/g, "")
                .replaceAll(/\n/g, ""),
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

        <ThemeProvider theme={theme}>
          <Button
            disabled={coment.Comentario === ""}
            sx={queries.buttonContinuar}
            onClick={() => {
              newComentario(coment, openState.tab);
              setComent({ Comentario: "", Apartado: "" });
              setOpen(false);



              console.log("comemt", coment,);
              console.log("newComentario", newComentario);




              // if(coment.Comentario!== ""){
              //   setFiltroComentarios(true)
              // }

              console.log("comment,comentario", coment.Comentario);


            }}
          >
            Aceptar
          </Button>
        </ThemeProvider>

      </DialogActions>
    </Dialog>
  );
}
