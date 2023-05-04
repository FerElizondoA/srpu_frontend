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
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ConfirmButton, DeleteButton } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { useNavigate } from "react-router-dom";
import { getUsuariosAsignables } from "../../../store/solicitud_inscripcion";
import { IData } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";


interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  Rol: string;
}

export function ConfirmacionSolicitud({
  handler,
  openState,
  selected,
  asignar,
}: {
  handler: Function;
  openState: boolean;
  selected: number[];
  asignar: number;
}) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  let estatus = "";

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const fetchReglas: Function = useCortoPlazoStore(
    (state) => state.fetchReglas
  );

  const IdSolicitud: string = useCortoPlazoStore((state) => state.IdSolicitud);
  const comentarios: string = useCortoPlazoStore((state) => state.comentarios);
  const changeComentarios: Function = useCortoPlazoStore(
    (state) => state.changeComentarios
  );
  const MAX_COMMENTS_LENGTH = 200;
  const [text, setText] = useState("Enviar sin comentarios");
  const validaciontext = () => {
    if (comentarios == null || /^[\s]*$/.test(comentarios)) {
      setText("Enviar");
    } else {
    }
  };

  useEffect(() => {
    fetchReglas();
  }, []);

  const fetchComentario: Function = useCortoPlazoStore(
    (state) => state.fetchComentario
  );

  const navigate = useNavigate();
  //////////////// Este apartado es el de finalizar

  const [usuariosAsignables, setUsuariosAsignables] = useState<
    Array<IUsuariosAsignables>
  >([]);
  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);

  useEffect(() => {
    getUsuariosAsignables(setUsuariosAsignables);
  }, []);

  useEffect(() => {
    console.log(usuariosAsignables);
  }, [usuariosAsignables]);
  return (
    <Dialog
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography sx={queries.medium_text}>Asignar a: </Typography>
      </DialogTitle>

      <DialogContent>
        {/* {asignar != 0 ? <Grid > */}
        <FormControl fullWidth>
          <Select
            value={idUsuarioAsignado}
            onChange={(e) => {
              setidUsuarioAsignado(e.target.value);

            }}
          >
            {usuariosAsignables.map((usuario, index) => {
              return (
                <MenuItem value={usuario.Id}>
                  {usuario.Nombre + " " + usuario.Rol}
                  
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* </Grid> : null} */}
        <Grid mb={1} mt={2}>
          <TextField
            fullWidth
            label="Comentarios        "
            multiline
            variant="standard"
            maxRows={5}
            value={comentarios}
            onChange={(texto) => changeComentarios(texto.target.value)}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            handler(false);

            if (localStorage.getItem("Rol") === "Verificador") {
              estatus = "Por Firmar";
            }
            if (localStorage.getItem("Rol") === "Capturador") {
              estatus = "En verificacion";
            }

            console.log("estatus: ", estatus);

            crearSolicitud(selected, estatus);

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
        
          <Button
            //sx={queries.medium_text}
            variant="text"
            onClick={() => handler(false)}
          >
            Cancelar
          </Button>
      </DialogActions>

    </Dialog>
  );
}
