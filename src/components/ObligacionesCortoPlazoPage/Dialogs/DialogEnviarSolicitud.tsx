import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { IUsuariosAsignables } from "./DialogSolicitarModificacion";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ConfirmacionDescargaSolicitud({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  // const [comentario, setComentario] = React.useState("");

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [idUsuarioAsignado, setidUsuarioAsignado] = React.useState("");

  const [usuarios, setUsuarios] = React.useState<Array<IUsuariosAsignables>>(
    []
  );

  const editCreadoPor: string = useCortoPlazoStore(
    (state) => state.editCreadoPor
  );

  React.useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [openState]);

  const navigate = useNavigate();

  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const cleanObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );
  const updatecondicionFinancieraTable: Function = useCortoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );
  // const addCondicionFinanciera: Function = useCortoPlazoStore(
  //   (state) => state.addCondicionFinanciera
  // );
  const cleanComentario: Function = useCortoPlazoStore(
    (state) => state.cleanComentario
  );

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);

  const reset = () => {
    changeEncabezado({
      tipoDocumento: "Crédito simple a corto plazo",
      solicitanteAutorizado: {
        Solicitante: localStorage.getItem("IdUsuario") || "",
        Cargo: localStorage.getItem("Puesto") || "",
        Nombre: localStorage.getItem("NombreUsuario") || "",
      },
      tipoEntePublico: {
        Id: "",
        TipoEntePublico: localStorage.getItem("TipoEntePublicoObligado") || "",
      },
      organismo: {
        Id: "",
        Organismo: localStorage.getItem("EntePublicoObligado") || "",
      },
      fechaContratacion: new Date().toString(),
    });

    changeInformacionGeneral({
      fechaContratacion: new Date().toString(),
      fechaVencimiento: new Date().toString(),
      plazo: 1,
      destino: { Id: "", Descripcion: "" },
      monto: 0,
      denominacion: "Pesos",
      institucionFinanciera: { Id: "", Descripcion: "" },
    });

    cleanObligadoSolidarioAval();
    updatecondicionFinancieraTable([]);
    cleanComentario();
  };
  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Typography sx={queries.medium_text}>
          {localStorage.getItem("Rol") === "Capturador"
            ? "Enviar"
            : "Finalizar"}{" "}
          Documento
        </Typography>
      </DialogTitle>

      <DialogContent>
        {localStorage.getItem("Rol") === "Capturador" && (
          <Grid>
            <Typography>
              Selecciona verificador al que deseas asignar esta solicitud{" "}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={idUsuarioAsignado}
                onChange={(e) => {
                  setidUsuarioAsignado(e.target.value);
                }}
              >
                {usuarios
                  .filter(
                    (td: any) =>
                      td.Rol ===
                      (localStorage.getItem("Rol") === "Capturador"
                        ? "Verificador"
                        : "Administrador")
                  )
                  .map((usuario, index) => {
                    return (
                      <MenuItem value={usuario.Id} key={index}>
                        {usuario.Nombre +
                          " " +
                          usuario.ApellidoPaterno +
                          " " +
                          usuario.ApellidoMaterno}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* <TextField
          fullWidth
          label="Comentario"
          multiline
          variant="standard"
          rows={4}
          value={comentario}
          onChange={(texto) => {
            if (texto.target.value.length <= 200) {
              setComentario(texto.target.value);
            }
          }}
        /> */}
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handler(false);
            if (idSolicitud !== "") {
              if (localStorage.getItem("Rol") === "Verificador") {
                modificaSolicitud(
                  editCreadoPor,
                  localStorage.getItem("IdUsuario"),
                  "Por Firmar"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    reset();
                    navigate("../ConsultaDeSolicitudes");
                    createNotification(
                      "Crédito simple a corto plazo",
                      "La solicitud de inscripción está lista para firmar",
                      [localStorage.getItem("IdUsuario") || ""]
                    );
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
              } else if (localStorage.getItem("Rol") === "Capturador") {
                modificaSolicitud(
                  editCreadoPor,
                  idUsuarioAsignado,
                  "Verificacion"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    reset();
                    navigate("../ConsultaDeSolicitudes");
                    createNotification(
                      "Crédito simple a corto plazo",
                      "Se te ha asignado una solicitud de inscripción",
                      [idUsuarioAsignado]
                    );
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
              }
            } else {
              if (localStorage.getItem("Rol") === "Verificador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("IdUsuario"),
                  "Por Firmar"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    reset();
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
                  "La solicitud de inscripción está lista para firmar",
                  [localStorage.getItem("IdUsuario") || ""]
                );
              } else if (localStorage.getItem("Rol") === "Capturador") {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  idUsuarioAsignado,
                  "Verificacion"
                )
                  .then(() => {
                    addComentario(
                      idSolicitud,
                      JSON.stringify(comentarios),
                      "Captura"
                    );
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      cancelButtonColor: "rgb(175, 140, 85)",
                      icon: "success",
                      title: "Mensaje",
                      text: "La solicitud se envió con éxito",
                    });
                    reset();
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
              }
            }
          }}
          variant="text"
          sx={queries.buttonContinuar}
        >
          {JSON.stringify(comentarios) == null ||
          /^[\s]*$/.test(JSON.stringify(comentarios))
            ? `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } sin comentarios`
            : `${
                localStorage.getItem("Rol") === "Capturador"
                  ? "Enviar"
                  : "Finalizar"
              } con comentarios`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
