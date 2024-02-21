/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

type Props = {
  handler: Function;
  openState: boolean;
};

export function DialogGuardarBorrador(props: Props) {
  const crearSolicitud: Function = useLargoPlazoStore(
    (state) => state.crearSolicitud
  );
  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );
  const institucion: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );
  const tipoEntePublico: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const montoOriginal: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);

  const idSolicitud: string = useLargoPlazoStore((state) => state.idSolicitud);

  const [info, setInfo] = useState(
    "La solicitud se guardará como borrador y estará disponible para modificar"
  );

  const notnull = () => {
    const isMissingInstitution = institucion === "" || institucion === null;
    const isMissingOriginalAmount =
      montoOriginal === null ||
      montoOriginal === 0 ||
      montoOriginal.toString() === "0" ||
      montoOriginal === undefined ||
      montoOriginal.toString() === "$ 0.00";

    if (isMissingInstitution && isMissingOriginalAmount) {
      setInfo(
        "*En INFORMACIÓN GENERAL: Seleccionar institución financiera y monto original contratado."
      );
    } else if (isMissingInstitution) {
      setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera.");
    } else if (isMissingOriginalAmount) {
      setInfo(
        "*En INFORMACIÓN GENERAL: Seleccionar monto original contratado."
      );
    } else {
      setInfo("La solicitud se guardará como borrador.");
    }
  };

  useEffect(() => {
    notnull();
  }, [institucion, montoOriginal]);

  const editCreadoPor: string = useLargoPlazoStore(
    (state) => state.editCreadoPor
  );

  const navigate = useNavigate();

  const changeEncabezado: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneral: Function = useLargoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const cleanObligadoSolidarioAval: Function = useLargoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );
  const updatecondicionFinancieraTable: Function = useLargoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );

  const cleanComentario: Function = useLargoPlazoStore(
    (state) => state.cleanComentario
  );

  const addComentario: Function = useLargoPlazoStore(
    (state) => state.addComentario
  );

  const reset = () => {
    cleanComentario();
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

  const division = info.indexOf(":");

  const markedText = division !== -1 ? info.substring(0, division + 1) : info;

  const restText = division !== -1 ? info.substring(division + 1) : "";

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
        <Typography align="center" sx={queries.bold_text_Largo_Plazo} mb={2}>
          Guardar como Borrador
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography
          color={
            (institucion === "" || institucion === null) &&
            (montoOriginal === null ||
              montoOriginal === 0 ||
              montoOriginal.toString() === "0" ||
              montoOriginal === undefined ||
              montoOriginal.toString() === "$ 0.00")
              ? "red"
              : "black"
          }
        >
          <span style={{ color: "red", fontWeight: "bold" }}>{markedText}</span>

          <span style={{ color: "red" }}>{restText}</span>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => props.handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            props.handler(false);
            if (idSolicitud !== "") {
              modificaSolicitud(
                editCreadoPor,
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador"
                  ? "Captura"
                  : "Verificacion",
                JSON.stringify(comentario)
              )
                .then(() => {
                  addComentario(
                    idSolicitud,
                    JSON.stringify(comentario),
                    "Captura"
                  );
                  Swal.fire({
                    confirmButtonColor: "#15212f",
                    cancelButtonColor: "rgb(175, 140, 85)",
                    icon: "success",
                    title: "Mensaje",
                    text: "La solicitud se guardó con éxito",
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
            } else {
              crearSolicitud(
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador"
                  ? "Captura"
                  : "Verificacion",
                JSON.stringify(comentario)
              )
                .then(() => {
                  addComentario(
                    idSolicitud,
                    JSON.stringify(comentario),
                    "Captura"
                  );
                  Swal.fire({
                    confirmButtonColor: "#15212f",
                    cancelButtonColor: "rgb(175, 140, 85)",
                    icon: "success",
                    title: "Mensaje",
                    text: "La solicitud se guardó con éxito",
                  });
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
          }}
          sx={{
            ...queries.buttonContinuar,
            pointerEvents:
              institucion === "" ||
              institucion === null ||
              tipoEntePublico === "" ||
              tipoEntePublico === null ||
              montoOriginal === null ||
              montoOriginal === 0
                ? "none"
                : "auto",
          }}
        >
          Guardar y cerrar
        </Button>
        <Button
          onClick={() => {
            props.handler(false);
            if (idSolicitud !== "") {
              modificaSolicitud(
                editCreadoPor,
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador"
                  ? "Captura"
                  : "Verificacion",
                JSON.stringify(comentario)
              )
                .then(() => {
                  Swal.fire({
                    confirmButtonColor: "#15212f",
                    cancelButtonColor: "rgb(175, 140, 85)",
                    icon: "success",
                    title: "Mensaje",
                    text: "La solicitud se guardó con éxito",
                  });
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
            } else {
              crearSolicitud(
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador"
                  ? "Captura"
                  : "Verificacion",
                JSON.stringify(comentario)
              )
                .then((r: any) => {
                  Swal.fire({
                    confirmButtonColor: "#15212f",
                    cancelButtonColor: "rgb(175, 140, 85)",
                    icon: "success",
                    title: "Mensaje",
                    text: "La solicitud se guardó con éxito",
                  });
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
          }}
          sx={{
            ...queries.buttonContinuar,
            pointerEvents:
              institucion === "" ||
              institucion === null ||
              tipoEntePublico === "" ||
              tipoEntePublico === null ||
              montoOriginal === null ||
              montoOriginal === 0
                ? "none"
                : "auto",
          }}
        >
          Guardar y continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
