import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queries } from "../../../queries";
import { IData } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { IUsuariosAsignables } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IDatosSolicitudReestructura } from "../../../store/Reestructura/reestructura";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

type Props = {
  handler: Function;
  openState: boolean;
  idSolicitud: string;
  Solicitud: string;
  IdEditor: string;
  IdCreado:string;
};

export function DialogSolicitarReestructura(props: Props) {
  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const [errorAsignacion, setErrorAsignacion] = useState(false);

  const navigate = useNavigate();



  const rowSolicitud: IData = useInscripcionStore((state) => state.inscripcion);

  const setSolicitudReestructura: Function = useReestructuraStore(
    (state) => state.setSolicitudReestructura
  );

  const SolicitudReestructura: IDatosSolicitudReestructura = useReestructuraStore(
    (state) => state.SolicitudReestructura
  );

  const createSolicitudReestructura: Function = useReestructuraStore(
    (state) => state.createSolicitudReestructura
  );

  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const [navigateReestructura, setNavigateReestructura] =
    useState(false);

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


  return (
    <Dialog open={props.openState} fullWidth>
      {/* <DialogTitle>Seleccione un autorizador</DialogTitle> */}
      <DialogTitle>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Typography sx={queries.bold_text}>
            Finalizar Solicitud
          </Typography>
        </Box>

      </DialogTitle>

      <DialogContent>
        <Typography>
          Esta por terminar la reestructuración, ¿Desea finalizarla?
        </Typography>
        {/* <Grid mb={2}>
          <FormControl fullWidth>
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
          </FormControl>
        </Grid> */}
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

        <Button
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            // CambiaEstatus("19", rowSolicitud.Id, rowSolicitud.IdEditor)
            createSolicitudReestructura(props.idSolicitud, props.Solicitud, props.IdEditor, setNavigateReestructura)
            modificaSolicitud(props.IdCreado, localStorage.getItem("IdUsuario"), "19" )
            if (!navigateReestructura) {
              navigate("../ConsultaDeSolicitudes");
            }
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
