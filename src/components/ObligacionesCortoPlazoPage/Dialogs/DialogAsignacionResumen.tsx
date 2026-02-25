import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  FormControl,
  MenuItem,
  DialogActions,
  Grid,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { IDocsEliminados } from "../Panels/InterfacesCortoPlazo";
import { alertaConfirmCancelar } from "../../../generics/Alertas";

export interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Rol: string;
}

export const rolesAdmin = ["Revisor", "Validador", "Autorizador"];

export function DialogAsignacionResumen({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
    //console.log("inscripcion asignacion", inscripcion.Estatus);
    //console.log('arrDocsEliminadossolicitar modificacion', arrDocsEliminados);

        console.log("Hola estoy en Asignacion Resumen", inscripcion);


    console.log("inscripcion.Estatus", inscripcion.Estatus);
    console.log("inscripcion.NoEstatus", inscripcion.NoEstatus);
    console.log("accion", accion);
    console.log("localStorage.getItem", localStorage.getItem("Rol"))
  }, [openState]);

  const checkform = () => {
    const filtroCortoLargoPlazo = inscripcion.TipoSolicitud === "Crédito Simple a Corto Plazo" ? "Corto" : "Largo";

    if (inscripcion.Estatus === "Asignación" &&
      inscripcion.NoEstatus === "4" &&
      accion === "asignacion" &&
      (localStorage.getItem("Rol") === "Autorizador" ||
        localStorage.getItem("Rol") === "Validador")) {

      CambiaEstatus(
        "5",
        inscripcion.Id,
        idUsuarioAsignado
      ).then(() => {
        createNotification(
          `Crédito Simple a ${filtroCortoLargoPlazo} Plazo`,
          "Se te ha asignado una solicitud para revisión",
          [idUsuarioAsignado],
          inscripcion.Id,
          "revision"
          //Aqui va el control interno
        );
        window.location.reload(); //HAS QUE REFRESQUE LA PAGINA DE LA LISTA
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });

    } else if (
      inscripcion.Estatus === "Asignación" &&
      inscripcion.NoEstatus === "13" &&
      accion === "asignacion" &&
      (localStorage.getItem("Rol") === "Autorizador" ||
        localStorage.getItem("Rol") === "Validador")) {
      CambiaEstatus(
        "14",
        inscripcion.Id,
        idUsuarioAsignado
      ).then(() => {
        createNotification(
          `Crédito Simple a ${filtroCortoLargoPlazo} Plazo`,
          "Se te ha asignado una solicitud para revisión",
          [idUsuarioAsignado],
          inscripcion.Id,
          "revision"
          //Aqui va el control interno
        );
        window.location.reload(); //HAS QUE REFRESQUE LA PAGINA DE LA LISTA
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });
    } else if (inscripcion.Estatus === "Asignación" &&
      inscripcion.NoEstatus === "22" &&
      accion === "asignacion" &&
      (localStorage.getItem("Rol") === "Autorizador" ||
        localStorage.getItem("Rol") === "Validador")) {
      CambiaEstatus(
        "23",
        inscripcion.Id,
        idUsuarioAsignado
      ).then(() => {
        createNotification(
          `Crédito Simple a ${filtroCortoLargoPlazo} Plazo`,
          "Se te ha asignado una solicitud para revisión",
          [idUsuarioAsignado],
          inscripcion.Id,
          "revision"
          //Aqui va el control interno
        );
        window.location.reload(); //HAS QUE REFRESQUE LA PAGINA DE LA LISTA
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });
    }


    handler(false);
  };

  // useEffect(() => {
  //   console.log("COMENTARIOS", comentarios);
  // }, []);

  return (
    <Dialog
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      {localStorage.getItem("Rol") === "Autorizador" && accion === "enviar" ? (
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            {Object.keys(comentarios).length > 0 ? "" : "Inscripción"}
          </Typography>
        </DialogTitle>
      ) : (
        <DialogTitle>
          <Typography sx={queries.bold_text}>Asignar a: </Typography>
        </DialogTitle>
      )}

      <DialogContent>
        {localStorage.getItem("Rol") === "Autorizador" &&
          accion === "enviar" ? null : (
          <Grid mb={2}>
            <FormControl fullWidth>
              <TextField
                select
                value={idUsuarioAsignado}
                onChange={(e) => {
                  console.log("VALOR USUARIO", e.target.value);

                  setidUsuarioAsignado(e.target.value);
                }}
              >
                {localStorage.getItem("Rol")! === "Autorizador" ||
                  localStorage.getItem("Rol") === "Validador"
                  ? usuarios
                    .filter((usr) => usr.Rol === "Revisor")
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
                    })
                  : null}
              </TextField>
            </FormControl>
          </Grid>
        )}

        {/* {Object.entries(comentarios).length > 0 && (
          <Typography sx={queries.bold_text}>
            {rolesAdmin.includes(localStorage.getItem("Rol")!)
              ? "Requerimientos"
              : "Comentarios"}
          </Typography>
        )}

        {Object.values(comentarios).every(val => val === "") ? (
          <Typography sx={{...queries.text, fontSize: "1.5ch", display : "flex", justifyContent: "center"}}>
            {rolesAdmin.includes(localStorage.getItem("Rol")!)
              ? " Sin Requerimientos"
              : "Sin Comentarios"}
          </Typography>
        ) : (
          Object.entries(comentarios).map(([key, val], index) =>
            val === "" ? null : (
              <Typography sx={{ fontSize: "1.5ch" }} key={index}>
                <strong>{key}:</strong> {val as string}
              </Typography>
            )
          )
        )} */}
        {/* hasta aqui  */}

        {/* {Object.entries(comentarios).map(([key, val], index) =>
          (val as string) === "" ? null : (
            <Typography
              sx={{
                fontSize: "1.5ch",
              }}
              key={index}
            >
              <strong>{key}:</strong>
              {val as string}
            </Typography>
          )
        )} */}
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => handler(false)}
        >
          Cancelar
        </Button>

        <Button
          // disabled={
          //   localStorage.getItem("Rol") === "Autorizador"
          //     ? accion === "modificar" && idUsuarioAsignado === ""
          //     : idUsuarioAsignado === ""
          // }
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            checkform();
          }}
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
