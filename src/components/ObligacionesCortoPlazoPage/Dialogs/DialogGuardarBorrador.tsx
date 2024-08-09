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
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { alertaConfirmCancelar, alertaConfirmCancelarError } from "../../../generics/Alertas";
import { IDocsEliminados } from "../Panels/InterfacesCortoPlazo";

export function DialogGuardarBorrador({
  handler,
  openState,
  arrDocsEliminados
}: {
  handler: Function;
  openState: boolean;
  arrDocsEliminados?:IDocsEliminados[]
}) {
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

  const navigate = useNavigate();

  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const division = info.indexOf(":");

  const markedText = division !== -1 ? info.substring(0, division + 1) : info;

  const restText = division !== -1 ? info.substring(division + 1) : "";

  const solicitud: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const [idSolicitudCreada, setIdSolicitudCreada] = useState("");
  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
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
          onClick={() => handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handler(false);
            if (solicitud.Id !== "") {
              console.log('guardarborrador ',arrDocsEliminados);
              
              modificaSolicitud(
                solicitud.CreadoPor,
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                JSON.stringify(comentario),
                arrDocsEliminados
              )
                .then(() => {
                  addComentario(
                    solicitud.Id,
                    JSON.stringify(comentario),
                    "Captura"
                  );
                  

                  alertaConfirmCancelar("La solicitud se guardó con éxito")

                  cleanSolicitud();
                  navigate("../ConsultaDeSolicitudes");
                })
                .catch(() => {

                  alertaConfirmCancelar("Ocurrió un error, inténtelo de nuevo")
                });
            } else {
              crearSolicitud(
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                JSON.stringify(comentario),
                setIdSolicitudCreada
              )
                .then(() => {
                  
                  addComentario(
                    solicitud.Id,
                    JSON.stringify(comentario),
                    "Captura"
                  );
                  

                  alertaConfirmCancelar("La solicitud se guardó con éxito")

                  navigate("../ConsultaDeSolicitudes");
                })
                .catch(() => {

                 

                  alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
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
            handler(false);
            if (solicitud.Id !== "") {
              console.log('guardarborrador 2',arrDocsEliminados);
              modificaSolicitud(
                solicitud.CreadoPor,
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                JSON.stringify(comentario),
                arrDocsEliminados
              )
                .then(() => {
                  
                  alertaConfirmCancelar("La solicitud se guardó con éxito")
                })
                .catch(() => {
                 

                  alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  
                });
            } else {
              crearSolicitud(
                localStorage.getItem("IdUsuario"),
                localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                JSON.stringify(comentario),
                setIdSolicitudCreada
              )
                .then((r: any) => {
                  alertaConfirmCancelar("La solicitud se guardó con éxito")
                })
                .catch(() => {
                  

                  alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
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
