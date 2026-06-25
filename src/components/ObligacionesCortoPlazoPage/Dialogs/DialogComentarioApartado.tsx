/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, Grid, IconButton, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useMemo, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IComentarios } from "./DialogComentariosSolicitud";
import DeleteIcon from "@mui/icons-material/Delete";


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
export interface IComentarioPrevio {

  id: string;

  usuario: string;

  fecha: string;

  comentario: string;

  apartado: string;

  jsonOriginal: Record<string, string>;

}

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
  const comentariosZustand: any = useCortoPlazoStore((state) => state.comentarios);

  const comentariosBD: IComentarios[] = useCortoPlazoStore(
    (state) => state.comentariosSolicitudInscripcion);

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario);

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario);


  const setIdComentarioEiminar: Function = useCortoPlazoStore(
    (state) => state.setIdComentarioEiminar);

  const eliminarComentariosBD: Function = useCortoPlazoStore(
    (state) => state.eliminarComentariosBD);



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

    console.log("comentariosBD: ", comentariosBD)

  }, []);



  useEffect(() => {
    // comentariosRegistro[openState.apartado] &&
    setComent({
      Apartado: openState.apartado,
      Comentario: comentariosZustand[openState.apartado],
      // ||
      // comentariosRegistro[openState.apartado],
    });
  }, [openState.apartado]);

  // useEffect(() => {

  //   //console.log("comemt", coment,);
  //   //console.log("newComentario");

  //   //console.log("comentario", comentario);
  // }, [newComentario, coment.Comentario, comentario])




  // const comentariosPreviosMap = useMemo(() => {
  //   const map: { [key: string]: string } = {};

  //   comentariosSolicitudInscripcion.forEach((item) => {
  //     try {
  //       const parsed = JSON.parse(item.Comentarios);
  //       const key = Object.keys(parsed)[0];
  //       const value = parsed[key];

  //       if (key && value) {
  //         map[key] = value;
  //       }
  //     } catch (error) {
  //       console.error("Error parseando comentario:", error);
  //     }
  //   });

  //   return map;
  // }, [comentariosSolicitudInscripcion]);


  ///***** */
  //const [comentariosPrevios, setComentariosPrevios] = useState<string[]>([]);




  // const [comentariosPrevios, setComentariosPrevios] = useState<
  //   { usuario: string; fecha: string; comentario: string }[]
  // >([]);

  const [comentariosPrevios, setComentariosPrevios] = useState<IComentarioPrevio[]>([]);
  const [comentariosEliminar, setComentariosEliminar] = useState<
    {
      id: string;
      apartado: string;
    }[]
  >([]);


  //**** */
  // useEffect(() => {
  //   if (!openState.apartado) return;

  //   const encontrados: string[] = [];

  //   comentariosSolicitudInscripcion.forEach((c) => {
  //     try {
  //       const parsed = JSON.parse(c.Comentarios);

  //       if (parsed[openState.apartado]) {
  //         encontrados.push(parsed[openState.apartado]);
  //       }
  //     } catch { }
  //   });

  //   setComentariosPrevios(encontrados);

  //   // IMPORTANTE: SIEMPRE iniciar nuevo comentario vacío
  //   setComent({
  //     Apartado: openState.apartado,
  //     Comentario: "",
  //   });

  // }, [openState.apartado, comentariosSolicitudInscripcion]);



  // useEffect(() => {
  //   if (!openState.apartado) return;

  //   const encontrados: string[] = [];

  //   comentariosBD.forEach((c) => {
  //     try {
  //       const parsed = JSON.parse(c.Comentarios);

  //       if (parsed[openState.apartado]) {
  //         encontrados.push(parsed[openState.apartado]);
  //       }
  //     } catch { }
  //   });

  //   setComentariosPrevios(encontrados);

  //   setComent({
  //     Apartado: openState.apartado,
  //     Comentario: "",
  //   });

  // }, [openState.apartado, comentariosBD]);

  useEffect(() => {
    if (!openState.apartado) return;

    const encontrados: IComentarioPrevio[] = [];

    comentariosBD.forEach((c) => {
      try {
        const parsed = JSON.parse(c.Comentarios) as Record<string, string>;

        if (parsed[openState.apartado]) {
          encontrados.push({
            id: c.Id,
            usuario: c.Nombre,
            fecha: new Date(c.FechaCreacion).toLocaleDateString(),
            comentario: parsed[openState.apartado],
            apartado: openState.apartado,
            jsonOriginal: parsed,
          });
        }
      } catch { }
    });

    setComentariosPrevios(encontrados);

    setComent({
      Apartado: openState.apartado,
      Comentario: "",
    });

  }, [openState.apartado, comentariosBD]);

  // useEffect(() => {

  //   console.log("comentarios RECIEN AGREGADO", comentariosZustand);
  // }, [])


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
              //   <Typography variant="caption" sx={{ fontWeight: 600 }}>
              //     {item.usuario} • {item.fecha}
              //   </Typography>

              //   <Typography
              //     variant="body2"
              //     sx={{ whiteSpace: "pre-line", mt: 1 }}
              //   >
              //     {item.comentario}
              //   </Typography>
              // </Grid>
              <Grid
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Grid
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600 }}
                  >
                    {item.usuario} • {item.fecha}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      setIdComentarioEiminar(item.id);//Esto es solo para recordarme que tengo que hacer pero puedes quitar o cambiar el nombre si lo deseas
                      eliminarComentariosBD(item.id);//Esto es solo para recordarme que tengo que hacer pero puedes quitar o cambiar el nombre si lo deseas
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>

                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-line", mt: 1 }}
                >
                  {item.comentario}
                </Typography>
              </Grid>

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
  );
}
