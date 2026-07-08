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
import { clear } from "@testing-library/user-event/dist/clear";
import { getSolicitudes } from "../../APIS/cortoplazo/APISInformacionGeneral";

export interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Rol: string;
}

export const rolesAdmin = ["Revisor", "Validador", "Autorizador"];

export function DialogSolicitarModificacion({
  handler,
  openState,
  accion,
  arrDocsEliminados,
  // setRecargarSolicitud
}: {
  handler: Function;
  openState: boolean;
  accion: string;
  arrDocsEliminados?: IDocsEliminados[];
  // setRecargarSolicitud?: Function;
}) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");
  const [idSolicitudCreada, setIdSolicitudCreada] = useState("");

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

  const [filtroTipoGuardado, setFiltroTipoGuardado] = useState(0);

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );


  const cleanInscripcionModify: Function = useInscripcionStore(
    (state) => state.cleanInscripcionModify
  );

  const cleanInscripcion: Function = useInscripcionStore(
    (state) => state.cleanInscripcion
  );

  const cleanTablaCondicionesFinancieras: Function = useCortoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );


  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);

    // console.log("HOLA ESTOY EN DIALOG SOLICITAR MODIFICACION");
    // console.log('arrDocsEliminadossolicitar modificacion', arrDocsEliminados);
  }, [openState]);

  const checkform = () => {
    if (rolesAdmin.includes(localStorage.getItem("Rol")!)) {

      //export const rolesAdmin = ["Revisor", "Validador", "Autorizador"];


      if (comentarios && Object.keys(comentarios).length > 0) {
        console.log("AGREGAR COMENTARIO");
        addComentario(
          inscripcion.Id,
          JSON.stringify(comentarios),
          "Requerimiento"
        );
      }

      CambiaEstatus(
        localStorage.getItem("Rol") === "Autorizador"
          ? accion === "enviar"
            ? "10"
            : accion === "requerimiento"
              ? "8"
              : accion === "desechamiento" //Puede que no lo ocupes
                ? "29"
                : "6"   //SINO SE OCUPA LO DE ARRIBA ESTE ES EL ESTATUS QUE DEBE QUEDAR POR DEFAULT
          : localStorage.getItem("Rol") === "Validador"
            ? accion === "enviar"
              ? "7" //Antes 6
              : "5" //Antes 4
            : "6", //Antes 5

        inscripcion.Id,
        localStorage.getItem("Rol") === "Autorizador" && idUsuarioAsignado === ""
          ? localStorage.getItem("IdUsuario")!
          : idUsuarioAsignado
      ).then(() => {


        createNotification(
          "Crédito simple a corto plazo",
          `Se te ha asignado una solicitud para  
          ${localStorage.getItem("Rol") === "Autorizador" 
            ?accion === "enviar" 
              ?"firmar"
              : accion === "desechamiento"
                  ? "desechamiento"
                  : "validación"
            : localStorage.getItem("Rol") === "Validador"
              ? accion === "enviar"
                ? "autorización"
                : "revisión"
              : "validación"
          }`,

          [
            localStorage.getItem("Rol") === "Autorizador"
              ? localStorage.getItem("IdUsuario")!
              : idUsuarioAsignado,
          ],
          inscripcion.Id,
          "inscripcion",
          parseInt(inscripcion.NumeroRegistro),
          //Aqui va el control interno
        );



        // getSolicitudes(
        //   !rolesAdmin.includes(localStorage.getItem("Rol")!)
        //     ? "Inscripcion"
        //     : "Revision",
        //   (e: IInscripcion[]) => {
        //     setDatos(e);
        //   },
        //   setDatosFiltrados
        // );

        //BORRA ESA MADRE

        const state = useInscripcionStore.getState();


        state.setRecargarSolicitud(true)
        //window.location.reload();
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se ha transferido con éxito",
        });
      });
    } else {
      if (inscripcion.Id !== "") {
        console.log('arrDocsEliminados dialog: ', arrDocsEliminados);

        modificaSolicitud(
          inscripcion.CreadoPor || localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "1",
          arrDocsEliminados,
          0, //filtroTipoGuardado
        )
          .then(() => {

            if (!rolesAdmin.includes(localStorage.getItem("Rol")!) && (comentarios && Object.keys(comentarios).length > 0)) {
              console.log("AGREGAR COMENTARIO");
              addComentario(
                inscripcion.Id,
                JSON.stringify(comentarios),
                "Captura"
              );
            } else {
              console.log("NO AGREGAR COMENTARIO");
            }

            // !rolesAdmin.includes(localStorage.getItem("Rol")!) && comentarios && Object.keys(comentarios).length > 0 &&


            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "success",
              title: "Mensaje",
              text: "La solicitud se envió con éxito",
            });
            cleanSolicitud();
            cleanSolicitudCortoPlazo();
            cleanInscripcion();
            cleanInscripcionModify();
            cleanTablaCondicionesFinancieras();
            const state = useInscripcionStore.getState();
            state.setRecargarSolicitud(true);
            navigate("../ConsultaDeSolicitudes");

          })
          .catch(() => {
            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
        createNotification(
          "Crédito simple a corto plazo",
          "Se te ha asignado una solicitud para modificación",
          [idUsuarioAsignado],
          inscripcion.Id,
          "inscripcion"
        );
        navigate("../ConsultaDeSolicitudes");
      } else {

        crearSolicitud(
          idUsuarioAsignado,
          "1",
          "",
          //JSON.stringify(comentarios),
          setIdSolicitudCreada
        ).then(() => {

          if (comentarios && Object.keys(comentarios).length > 0) {
            console.log("AGREGAR COMENTARIO");
            addComentario(
              idSolicitudCreada,
              JSON.stringify(comentarios),
              "Captura"
            );
          } else {
            console.log("NO AGREGAR COMENTARIO");
          }

          // addComentario(
          //   idSolicitudCreada,
          //   JSON.stringify(comentarios),
          //   "Captura"
          // );
          alertaConfirmCancelar("La solicitud se envió con éxito")
          cleanSolicitud();
          navigate("../ConsultaDeSolicitudes");
        })

          .catch(() => {
            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
        // createNotification(
        //   "Crédito simple a corto plazo",
        //   `Se te ha asignado una solicitud para modificación`,
        //   [idUsuarioAsignado],
        //   idSolicitudCreada,
        //   "inscripcion"
        // );

      }
    }

    handler(false);
  };

  const tituloDialog = (accion: string) => {
    switch (accion) {
      case "enviar":
        return "Esta por confirmar la solicitud, ¿Desea continuar?";
      case "requerimiento":
        return "Esta por confirmar una solicitud de prevención, ¿Desea continuar?";
      case "desechamiento":
        return "Esta por desechar la solicitud, ¿Desea continuar?";
      default:
        return "Favor de asignar a un usuario para validacion:";
    }
  }


  return (
    <Dialog
       maxWidth={"md"}
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >

      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={queries.bold_text}>
          {tituloDialog(accion)}

        </Typography>
      </DialogTitle>


      <DialogContent>
        {localStorage.getItem("Rol") === "Autorizador" &&
          (accion === "enviar" || accion === "requerimiento" || accion === "desechamiento") ? null : (
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
                  localStorage.getItem("Rol") === "Revisor"
                  ? usuarios
                    .filter((usr) => usr.Rol === "Validador")
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
                  : localStorage.getItem("Rol")! === "Validador"
                    ? accion === "enviar"
                      ? usuarios
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
                        })
                      : usuarios
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
                    : usuarios
                      .filter((usr) => usr.Rol === "Capturador")
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
          </Grid>
        )}

        {Object.entries(comentarios).length > 0 && (
          <Typography sx={queries.bold_text}>
            {rolesAdmin.includes(localStorage.getItem("Rol")!)
              ? "Requerimientos"
              : "Comentarios"}
          </Typography>
        )}

        {Object.values(comentarios).every(val => val === "") ? (
            <Typography sx={{ ...queries.text, fontSize: "1.5ch", display: "flex", justifyContent: "center" }}>
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
          )}
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
          disabled={
            localStorage.getItem("Rol") === "Autorizador"
              ? accion === "modificar" && idUsuarioAsignado === ""
              : idUsuarioAsignado === ""
          }
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
