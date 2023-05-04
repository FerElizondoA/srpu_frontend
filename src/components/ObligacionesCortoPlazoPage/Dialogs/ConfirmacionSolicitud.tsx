import * as React from "react";
import { useState, useEffect } from "react";
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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
  selected: number[];
  
};

export function ConfirmacionSolicitud(props: Props) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };


  const [estatus, setEstatus] =useState("")


  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const fetchReglas: Function = useCortoPlazoStore(
    (state) => state.fetchReglas
  );

  const IdSolicitud: string= useCortoPlazoStore(
    (state) => state.IdSolicitud
  )
  const comentarios: string = useCortoPlazoStore((state) => state.comentarios);
  const changeComentarios: Function = useCortoPlazoStore(
    (state) => state.changeComentarios
  );
  const MAX_COMMENTS_LENGTH = 200;
  const [text, setText] = React.useState("Enviar sin comentarios");
  const validaciontext = () => {
    if (comentarios == null || /^[\s]*$/.test(comentarios)) {
      setText("Enviar");
    } else {
    }
  };

  React.useEffect(() => {
    fetchReglas();
  }, []);

  const fetchComentario: Function = useCortoPlazoStore(
    (state) => state.fetchComentario
  );

  const navigate = useNavigate();
  //////////////// Este apartado es el de finalizar
  return (
    <Dialog
      open={props.openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
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
          <Typography sx={queries.medium_text}>Enviar Solicitud</Typography>

          <Grid mb={1}>
            <TextField
              fullWidth
              label="Comentarios        "
              multiline
              variant="standard"
              maxRows={5}
              rows={10}
              value={comentarios}
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
                // sx={{ textAlign: "center", display: "flex" }}
              >
                <Button
                  //sx={queries.italic_text}
                  //onClick={handleClick}
                  //sx ={{textAlign: 'center'}}
                  onClick={() => {
                    props.handler(false);
                    console.log("hola ",IdSolicitud);

                    if(localStorage.getItem("Rol") === "Verificador"){
                      setEstatus("Por Firmar")
                    }
                    if(localStorage.getItem("Rol") === "Capturador"){
                      setEstatus("En verificacion")
                    }


                    crearSolicitud(props.selected, estatus);

                    navigate("../ConsultaDeSolicitudes");
                  }}
                  disabled={comentarios.length >= 200}
                  variant="text"
                >
                  {comentarios == null || /^[\s]*$/.test(comentarios)
                    ? "Enviar sin comentarios"
                    : comentarios.length > MAX_COMMENTS_LENGTH
                    ? "Los comentarios no pueden tener más de 200 caracteres"
                    : "Enviar con comentarios"}
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
                  onClick={() => props.handler(false)}
                
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
