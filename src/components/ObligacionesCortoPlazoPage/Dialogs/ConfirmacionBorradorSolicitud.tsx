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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  // selected: number[];
};

export function ConfirmacionBorradorSolicitud(props: Props) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );
  const fetchReglas: Function = useCortoPlazoStore((state) => state.getReglas);

  // const comentarios: string = useCortoPlazoStore((state) => state.comentarios);
  // const changeComentarios: Function = useCortoPlazoStore(
  //   (state) => state.changeComentarios
  // );

  const navigate = useNavigate();

  return (
    <Dialog
      open={props.openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
      }}
    >
      <DialogTitle>
        <Typography
          align="center"
          //position= "fixed"
          sx={queries.medium_text}
          mb={2}
        >
          Guardar como Borrador
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container>
          <Grid
            sx={{
              flexDirection: "row",

              alignItems: "center",

              fontSize: "20px",

              //border: "1px solid"
            }}
          >
            <Grid mb={1}>
              <DialogContentText id="alert-dialog-slide-description">
                En este apartado se guardara un borrador de la informacion que
                podras visualizar en un futuro
              </DialogContentText>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item md={6} lg={6}>
              <Button
                //sx={queries.text}
                //onClick={handleClick}
                onClick={() => {
                  props.handler(false);
                  crearSolicitud(
                    localStorage.getItem("IdUsuario"),
                    localStorage.getItem("IdUsuario"),
                    localStorage.getItem("Rol") === "Capturador"
                      ? "Captura"
                      : "Verificacion"
                  );
                  navigate("../ConsultaDeSolicitudes");
                }}
                variant="text"
              >
                Confirmar
              </Button>
            </Grid>

            <Grid item md={6} lg={6}>
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
      </DialogActions>
    </Dialog>
  );
}
