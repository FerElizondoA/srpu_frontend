import * as React from "react";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Button,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ConfirmButton, DeleteButton } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { useNavigate } from "react-router-dom";

interface IComentarios {
    Comentarios: string;
    CreadoPor: string;
    FechaCreacion: string;
    Id: string;
    Mensaje: string;
    Nombre: string;
  }

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AgregarComentario({
  handler,
  openState,
  //comentarios2: Array<Icomentarios2>;
  setComentarios,
  comentarios,
  IdSolicitud,
}: {
  handler: Function;
  openState: boolean;
  //comentarios2: Array<Icomentarios2>;
  setComentarios: Function;
  IdSolicitud: string;
  comentarios: IComentarios[];
}) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };


  const comentarios2: string = useCortoPlazoStore((state) => state.comentarios);
  const changeComentarios: Function = useCortoPlazoStore(
    (state) => state.changeComentarios
  );
  const MAX_COMMENTS_LENGTH = 200;
  const [text, setText] = React.useState("Enviar");
  const validaciontext = () => {
    if (comentarios2 == null || /^[\s]*$/.test(comentarios2)) {
      setText("Enviar");
    } else {
    }
  };


  const fetchComentario: Function = useCortoPlazoStore(
    (state) => state.fetchComentario
  );

  const navigate = useNavigate();

  const IdSolicitud1: string = useCortoPlazoStore(
    (state) => state.IdSolicitud
  )

  const agregarComentario = (nuevoComentario: string) => {

    const arraycomentarios = Array.from(comentarios2);

    arraycomentarios.push(nuevoComentario);

    setComentarios(new Set(arraycomentarios));

  }
  //////////////// Este apartado es el de finalizar
  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <Grid container>
        <Grid
          sx={{
            flexDirection: "row",
            mt: 1,
            mb: 1,
            mr: 1,
            ml: 1,
            alignItems: "center",

            fontSize: "20px",
            //border: "1px solid"
          }}
        >
          <Typography sx={queries.medium_text}>Enviar comentarios</Typography>

          <Grid mb={1}>
            <TextField
              fullWidth
              label="comentarios"
              multiline
              variant="standard"
              maxRows={5}
              rows={10}
              value={comentarios2}
              onChange={(texto) => changeComentarios(texto.target.value)}
            />
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid container direction="row">
              <Grid
                item
                md={6}
                lg={6}
                
              >
                <Button
                  
                  onClick={() => {
                    //console.log("IdSolicitud1: ",IdSolicitud1);
                    //console.log("comentarios2: ",comentarios2);

                    //agregarComentario(comentarios2);
                    fetchComentario(IdSolicitud, comentarios2)
                    handler(false);

                    //crearSolicitud(selected);
                    //navigate("../ConsultaDeSolicitudes");
                  }}
                  disabled={comentarios2.length >= 200 || comentarios2 == null || /^[\s]*$/.test(comentarios2) }
                  variant="text"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                Enviar Comentario
                    
                </Button>
                
              </Grid>

              <Grid
                item
                md={6}
                lg={6}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  //sx={queries.medium_text}
                  variant="text"
                  onClick={() => handler(false)}
                >
                  Cancelar
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
