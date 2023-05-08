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
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ConfirmButton, DeleteButton } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { useNavigate } from "react-router-dom";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";

interface IComentarios {
  Comentarios: string;
  CreadoPor: string;
  FechaCreacion: string;
  Id: string;
  Mensaje: string;
  Nombre: string;
}

export function AgregarComentario({
  handler,
  openState,
  IdSolicitud,
}: {
  handler: Function;
  openState: boolean;
  IdSolicitud: string;
}) {
  const navigate = useNavigate();
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const [comentario, setComentario] = React.useState("");

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  return (
    <Dialog
      open={openState}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={() => {
        handler(false);
      }}
    >
      <Grid
        sx={{
          flexDirection: "row",
          m: 1,
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <DialogTitle>
          <Typography sx={queries.medium_text}>Enviar comentario</Typography>
        </DialogTitle>

        <DialogContent>
          <Grid mb={1}>
            <TextField
              fullWidth
              label="Comentario"
              multiline
              variant="standard"
              rows={2}
              value={comentario}
              onChange={(texto) => setComentario(texto.target.value)}
            />
          </Grid>
          <Grid></Grid>
        </DialogContent>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container direction="row">
            <Grid item md={6} lg={6}>
              <Button
                onClick={() => {
                  addComentario(IdSolicitud, comentario);
                  setComentario("");
                  handler(false);
                }}
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
    </Dialog>
  );
}
