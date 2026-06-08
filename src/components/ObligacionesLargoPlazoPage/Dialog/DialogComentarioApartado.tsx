/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IComentarios } from "./DialogComentariosSolicitudReestructura";

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

  const comentariosZustand: any = useLargoPlazoStore((state) => state.comentarios);

  const newComentario: Function = useLargoPlazoStore(
    (state) => state.newComentario
  );

  const removeComentario: Function = useLargoPlazoStore(
    (state) => state.removeComentario
  );

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const setFiltroComentarios: Function = useCortoPlazoStore(
    (state) => state.setFiltroComentarios
  );

  const filtroComentarios: boolean = useCortoPlazoStore(
    (state) => state.filtroComentarios
  );

  const [comentariosPrevios, setComentariosPrevios] = useState<
    { usuario: string; fecha: string; comentario: string }[]
  >([]);

    const comentariosBD: IComentarios[] = useCortoPlazoStore(
      (state) => state.comentariosSolicitudInscripcion);

  useEffect(() => {
    if (!openState.apartado) return;

    const encontrados: { usuario: string; fecha: string; comentario: string }[] = [];

    comentariosBD.forEach((c) => {
      try {
        const parsed = JSON.parse(c.Comentarios);

        if (parsed[openState.apartado]) {
          encontrados.push({
            usuario: c.Nombre,
            fecha: new Date(c.FechaCreacion).toLocaleDateString(),
            comentario: parsed[openState.apartado],
          });
        }
      } catch { }
    });

    setComentariosPrevios(encontrados);

    setComent({
      Apartado: openState.apartado,
      Comentario: comentariosZustand[openState.apartado],
    });

  }, [openState.apartado, comentariosBD]);


  // useEffect(() => {
  //   // comentariosRegistro[openState.apartado] &&
  //   setComent({
  //     Apartado: openState.apartado,
  //     Comentario: comentario[openState.apartado],
  //     // ||
  //     // comentariosRegistro[openState.apartado],
  //   });
  // }, [openState.apartado]);

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
    
            {comentariosPrevios.length > 0 && (
              <Grid sx={{ width: "100%", mt: 2, height: "15rem", overflowY: "auto" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Comentarios asignados
                </Typography>
    
                {comentariosPrevios.map((item, index) => (
                  <Grid
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {item.usuario} • {item.fecha}
                    </Typography>
    
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-line", mt: 1 }}
                    >
                      {item.comentario}
                    </Typography>
                  </Grid>
                  // <Grid
                  //   key={index}
                  //   sx={{
                  //     mb: 2,
                  //     p: 2,
                  //     borderRadius: 2,
                  //     backgroundColor: "#f5f5f5",
                  //     border: "1px solid #e0e0e0",
                  //   }}
                  // >
                  //   <Typography
                  //     variant="body2"
                  //     sx={{ whiteSpace: "pre-line" }}
                  //   >
                  //     {comentario}
                  //   </Typography>
                  // </Grid>
                ))}
              </Grid>
            )}
    
            {comentariosZustand[openState.apartado] && (
              <Grid sx={{ width: "100%", mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Comentario agregado
                </Typography>
    
                <Grid
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    border: "1px solid #90caf9",
                  }}
                >
                  <Typography variant="body2">
                    {comentariosZustand[openState.apartado]}
                  </Typography>
                </Grid>
              </Grid>
            )}
    
    
    
            <TextField
              label={
                comentariosZustand[openState.apartado]
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
    
            {/* <TextField
              label={
                coment.Comentario !== ""
                  ? "Editar comentario"
                  : "Sin comentarios previos"
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
            /> */}
          </DialogContent>
    
          <DialogActions>
            {comentariosZustand[openState.apartado] !== "" ? (
    
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
                }}
              >
                Aceptar
              </Button>
            </ThemeProvider>
    
          </DialogActions>
        </Dialog>
    // <Dialog
    //   fullWidth
    //   open={openState.open || false}
    //   keepMounted
    //   onClose={() => {
    //     setOpen(false);
    //   }}
    // >
    //   <DialogTitle sx={{ color: "#AF8C55" }}>
    //     Comentario: <strong>{openState.apartado}</strong>
    //   </DialogTitle>

    //   <DialogContent>
    //     {/* <Typography sx={{ display: "flex", justifyContent: "center" }}>
    //       {comentario[openState.apartado] || ""}
    //     </Typography> */}
    //     <TextField
    //       // label="Nuevo comentario"
    //       label={
    //         comentario[openState.apartado]
    //           ? "Editar comentario"
    //           : "Nuevo comentario"
    //       }
    //       sx={{ width: "100%", mt: 2 }}
    //       value={coment.Comentario}
    //       //disabled={reestructura === "con autorizacion"}
    //       onChange={(v) => {
    //         setComent({
    //           Comentario: v.target.value
    //             .replaceAll(/[^\w\s]/gi, "")
    //             .replaceAll("\n", ""),
    //           Apartado: openState.apartado,
    //         });
    //         // setComent({
    //         //   Comentario: v.target.value,
    //         //   Apartado: openState.apartado,
    //         // });
    //       }}
    //       multiline
    //       rows={2}
    //     />
    //   </DialogContent>

    //   <DialogActions>
    //     {comentario[openState.apartado] !== "" ? (
    //       <Button
    //         sx={queries.buttonCancelar}
    //         //disabled={reestructura === "con autorizacion"}
    //         onClick={() => {
    //           removeComentario(openState.apartado);
    //           setOpen(false);
    //         }}
    //       >
    //         Eliminar comentario
    //       </Button>
    //     ) : null}
    //     <Button
    //       sx={queries.buttonCancelar}
    //       //disabled={reestructura}
    //       onClick={() => {
    //         setComent({ Comentario: "", Apartado: "" });
    //         setOpen(false);
    //       }}
    //     >
    //       Cancelar
    //     </Button>
    //     <ThemeProvider theme={theme}>
    //       <Button
    //         sx={queries.buttonContinuar}
    //         // disabled={coment.Comentario==="" || coment.Comentario===undefined}
    //         onClick={() => {
    //           newComentario(coment, openState.tab);
    //           setComent({ Comentario: "", Apartado: "" });
    //           setOpen(false);
    //           console.log("coment.comentario", coment)
    //         }}
    //       >
    //         Aceptar
    //       </Button>
    //     </ThemeProvider>
    //   </DialogActions>
    // </Dialog>
  );
}
