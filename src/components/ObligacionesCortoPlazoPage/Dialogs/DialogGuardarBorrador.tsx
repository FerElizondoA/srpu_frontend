import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Dialog, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
};

export function ConfirmacionBorradorSolicitud(props: Props) {
  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );
  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );
  const institucion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );
  const tipoEntePublico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const montoOriginal: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const comentario: any = useCortoPlazoStore((state) => state.comentarios);

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

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
        "Seleccionar Institución financiera y monto en INFORMACIÓN GENERAL."
      );
    } else if (isMissingInstitution) {
      setInfo("Seleccionar información financiera en INFORMACIÓN GENERAL.");
    } else if (isMissingOriginalAmount) {
      setInfo("Seleccionar monto en INFORMACIÓN GENERAL.");
    } else {
      setInfo("La solicitud se guardará como borrador.");
    }
  };

  useEffect(() => {
    notnull();
  }, []);

  const editCreadoPor: string = useCortoPlazoStore(
    (state) => state.editCreadoPor
  );

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

  const addComentario: Function = useCortoPlazoStore(
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
        <Typography align="center" sx={queries.medium_text} mb={2}>
          Guardar como Borrador
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{info}</DialogContentText>
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
                  addComentario(idSolicitud, JSON.stringify(comentario));
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
                  addComentario(idSolicitud, JSON.stringify(comentario));
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
