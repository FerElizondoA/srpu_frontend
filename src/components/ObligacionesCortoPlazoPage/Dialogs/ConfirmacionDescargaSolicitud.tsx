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

export function ConfirmacionDescargaSolicitud(props: Props) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const fetchDocumento: Function = useCortoPlazoStore(
    (state) => state.fetchDocumento
  );
  const fetchReglas: Function = useCortoPlazoStore(
    (state) => state.fetchReglas
  );

  const comentarios: string = useCortoPlazoStore((state) => state.comentarios);
  const changeComentarios: Function = useCortoPlazoStore(
    (state) => state.changeComentarios
  );

  const [text, setText] = React.useState("Enviar sin comentarios");
  const validaciontext = () => {
    if (comentarios == null || /^[\s]*$/.test(comentarios)) {
      console.log(" comentarios", comentarios);
      console.log("texto", text);
      setText("Enviar");
    } else {
      console.log("No estoy vacio pa");
    }
  };

  React.useEffect(() => {
    fetchReglas();
  }, []);
  return (
    <Dialog open={props.openState} TransitionComponent={Transition}>
      <Grid container>
        <Grid
          sx={{
            flexDirection: "row",
            mt: 1,
            mb: 1,
            mr: 1,
            ml: 1,
            alignItems: "center",
            borderColor: "#cfcfcf",
            fontSize: "20px",
            //border: "1px solid"
          }}
        >
          <Typography sx={queries.bold_text}>Enviar</Typography>

          <Grid mb={1}>
            <TextField
              fullWidth
              label="Comentarios        "
              multiline
              maxRows={5}
              rows={10}
              value={comentarios}
              
              onChange={(texto) => changeComentarios(texto.target.value)}
            />
          </Grid>

          <Grid>
            <Grid item container direction="row">
              <Grid item md={6} lg={6}>
                <ConfirmButton
                  //onClick={handleClick}
                  onClick={() => {
                    fetchDocumento(props.selected);
                  }}
                  variant="outlined"
                >
                  {comentarios == null || /^[\s]*$/.test(comentarios)
                    ? "Enviar sin comentarios "
                    : "Enviar con comentarios   "}
                </ConfirmButton>
              </Grid>

              <Grid item md={6} lg={6}>
                <DeleteButton variant="outlined" onClick={() => props.handler(false)} >Cancelar</DeleteButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
