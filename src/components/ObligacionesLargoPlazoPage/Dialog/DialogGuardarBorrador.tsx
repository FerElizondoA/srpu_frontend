/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, ThemeProvider, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { alertaConfirmCancelar, alertaConfirmCancelarError } from "../../../generics/Alertas";
import { IDocsEliminados } from "../../ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";

export function DialogGuardarBorrador({
  handler,
  openState,
  arrDocsEliminados,
}: {
  handler: Function;
  openState: boolean;
  arrDocsEliminados?: IDocsEliminados[]
}) {
  const crearSolicitud: Function = useLargoPlazoStore(
    (state) => state.crearSolicitud
  );
  const modificaSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaSolicitud
  );

  const cleanInscripcionModify: Function = useInscripcionStore(
    (state) => state.cleanInscripcionModify
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
    (state) => state.cleanSolicitudLargoPlazo
  );

  const cleanInscripcion: Function = useInscripcionStore(
    (state) => state.cleanInscripcion
  );

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const division = info.indexOf(":");

  const markedText = division !== -1 ? info.substring(0, division + 1) : info;

  const restText = division !== -1 ? info.substring(division + 1) : "";


  const IdSolicitudBorrador: string = useCortoPlazoStore(
    (state) => state.IdSolicitudBorrador
  );

  const solicitud: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

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

        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={moneyMask(monto.toString()) === "$ 0.00" || institucion === ""}
            onClick={() => {
              handler(false);
              if (solicitud.Id !== "") {


                modificaSolicitud(
                  solicitud.CreadoPor,
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  //JSON.stringify(comentario),
                  arrDocsEliminados,
                  1,
                )
                  .then(() => {
                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentario),
                    //   "Captura"
                    // );
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "success",
                    //   title: "Mensaje",
                    //   text: "La solicitud se guardó con éxito",
                    // });
                    // cleanSolicitud();
                    alertaConfirmCancelar("La solicitud se guardó con éxito")
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
                    setTimeout(() => {
                      navigate("../ConsultaDeSolicitudes");
                    }, 1000);
                  })
                  .catch(() => {
                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "error",
                    //   title: "Mensaje",
                    //   text: "Ocurrió un error, inténtelo de nuevo",
                    // });
                    alertaConfirmCancelar("Ocurrió un error, inténtelo de nuevo")

                  });
              } else {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  JSON.stringify(comentario)
                )
                  .then(() => {
                    console.log("Object.keys(comentario).length > 0", Object.keys(comentario).length > 0)
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    // addComentario(
                    //   solicitud.Id,
                    //   JSON.stringify(comentario),
                    //   "Captura"
                    // );
                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "success",
                    //   title: "Mensaje",
                    //   text: "La solicitud se guardó con éxito",
                    // });
                    alertaConfirmCancelar("La solicitud se guardó con éxito")
                    cleanInscripcion();
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
        </ThemeProvider>


        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={moneyMask(monto.toString()) === "$ 0.00" || institucion === ""}
            onClick={() => {
              handler(false);
              if (solicitud.Id !== "") {
                modificaSolicitud(
                  solicitud.CreadoPor,
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  //JSON.stringify(comentario)
                  arrDocsEliminados,
                  1
                )
                  .then(() => {
                    console.log("GUARDAR CONTINUAR, TODOS LOS COMENTARIOS: ", comentario);
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    alertaConfirmCancelar("La solicitud se guardó con éxito")

                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "success",
                    //   title: "Mensaje",
                    //   text: "La solicitud se guardó con éxito",
                    // });
                  })
                  .catch((data: any) => {
                    console.log("data catch", data);
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")

                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "error",
                    //   title: "Mensaje",
                    //   text: "Ocurrió un error, inténtelo de nuevo",
                    // });
                  });
              } else {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  JSON.stringify(comentario)
                )
                  .then((r: any) => {

                    console.log("Guardar y cerrdar", Object.keys(comentario).length > 0)
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    alertaConfirmCancelar("La solicitud se guardó con éxito")
                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "success",
                    //   title: "Mensaje",
                    //   text: "La solicitud se guardó con éxito",
                    // });
                  })
                  .catch(() => {
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")

                    // Swal.fire({
                    //   confirmButtonColor: "#15212f",
                    //   cancelButtonColor: "rgb(175, 140, 85)",
                    //   icon: "error",
                    //   title: "Mensaje",
                    //   text: "Ocurrió un error, inténtelo de nuevo",
                    // });
                  });
              }
            }}
            sx={{
              ...queries.buttonContinuar,
              // pointerEvents:
              //   institucion === "" ||
              //   institucion === null ||
              //   tipoEntePublico === "" ||
              //   tipoEntePublico === null ||
              //   montoOriginal === null ||
              //   montoOriginal === 0
              //     ? "none"
              //     : "auto",
            }}
          >
            Guardar y continuar
          </Button>
        </ThemeProvider>

      </DialogActions>
    </Dialog>
  );
}
