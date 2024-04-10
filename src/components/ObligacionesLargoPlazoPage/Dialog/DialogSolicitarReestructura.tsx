import {
  Button,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { IUsuariosAsignables } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";
import { IData } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";

type Props = {
  handler: Function;
  openState: boolean;
  idSolicitud: string;
};

export function DialogSolicitarReestructura(props: Props) {
  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const [errorAsignacion, setErrorAsignacion] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
    setidUsuarioAsignado("");
  }, [props.openState]);

  useEffect(() => {
    setErrorAsignacion(false);
  }, [idUsuarioAsignado]);

  useEffect(() => {
    setErrorAsignacion(false);
  }, []);


  const rowSolicitud: IData = useSolicitudFirmaStore(
    (state) => state.rowSolicitud
  );

  const setRowSolicitud: Function = useSolicitudFirmaStore(
    (state) => state.setRowSolicitud
  );

  return (
    <Dialog open={props.openState} fullWidth>
      {/* <DialogTitle>Seleccione un autorizador</DialogTitle> */}
      <DialogTitle>
        <Typography sx={queries.bold_text}>
          Esta por terminar la reestructuración, ¿Desea finalizarla?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid mb={2}>
          {/* <FormControl fullWidth>
            <TextField
              select
              value={idUsuarioAsignado}
              onChange={(e) => {
                setidUsuarioAsignado(e.target.value);
              }}
              helperText={
                errorAsignacion === true
                  ? "Debe de asigarle la solicitud a un usuario"
                  : null
              }
              error={errorAsignacion}
            >
              {usuarios
                .filter((usr) => usr.Rol === "Autorizador")
                .map((usuario, index) => {
                  return (
                    <MenuItem value={usuario.Id} key={index}>
                      {usuario.Nombre +
                        " " +
                        usuario.ApellidoPaterno +
                        " " +
                        usuario.ApellidoMaterno +
                        " - " +
                        (usuario.Rol || "")}
                    </MenuItem>
                  );
                })}
            </TextField>
          </FormControl> */}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => {
            props.handler(false);
          }}
        >
          Cancelar
        </Button>

        <Button variant="text" sx={queries.buttonContinuar}
          onClick={() => {
            CambiaEstatus("19", rowSolicitud.Id, rowSolicitud.IdEditor)
            navigate("../ConsultaDeSolicitudes");
          }}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
