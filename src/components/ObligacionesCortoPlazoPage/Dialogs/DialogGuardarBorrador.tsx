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
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

type Props = {
  handler: Function;
  openState: boolean;
};

export function DialogGuardarBorrador(props: Props) {
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

  const editCreadoPor: string = useCortoPlazoStore(
    (state) => state.editCreadoPor
  );

  const navigate = useNavigate();

  const cleanSolicitud: Function = useCortoPlazoStore(
    (state) => state.cleanSolicitud
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

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
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
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
            } else {
              crearSolicitud(
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
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
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
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
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
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
