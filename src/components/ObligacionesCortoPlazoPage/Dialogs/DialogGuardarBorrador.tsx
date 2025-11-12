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
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { alertaConfirmCancelar, alertaConfirmCancelarError } from "../../../generics/Alertas";
import { IDocsEliminados } from "../Panels/InterfacesCortoPlazo";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

export const moneyMask = (value: string) => {
  value = value.replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };

  const result = new Intl.NumberFormat("en-US", options).format(
    parseInt(value) / 100
  );
  return "$ " + result;
};

export function DialogGuardarBorrador({
  handler,
  openState,
  arrDocsEliminados
}: {
  handler: Function;
  openState: boolean;
  arrDocsEliminados?: IDocsEliminados[]
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

  const tipoCredito: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.encabezado.tipoCredito
  );


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

    const isMissingTipoCredito =
      tipoCredito.Descripcion === "" ||
      tipoCredito.Descripcion === undefined ||
      tipoCredito.Descripcion === null;


    if (isMissingInstitution && isMissingOriginalAmount) {
      setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera, monto original contratado");
    } else if (isMissingInstitution) {
      setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera.");
    }
    // else if (isMissingInstitution) {
    //   setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera.");
    else if (isMissingOriginalAmount) {
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

  const cleanInscripcion: Function = useInscripcionStore(
    (state) => state.cleanInscripcion
  );

  const cleanInscripcionModify: Function = useInscripcionStore(
    (state) => state.cleanInscripcionModify
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
  const setProceso: Function = useInscripcionStore(
    (state) => state.setProceso
  );

  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const [idSolicitudCreada, setIdSolicitudCreada] = useState("");

  const [filtroTipoGuardado, setFiltroTipoGuardado] = useState(1);


  const fn = (v: any) => {
    console.log("v", v);
    return setIdSolicitudCreada(v)
  }

  const IdSolicitudBorrador: string = useCortoPlazoStore(
    (state) => state.IdSolicitudBorrador
  );

  useEffect(() => {


    console.log("filtroTipoGuardado", filtroTipoGuardado);
  }, [])


  return (
    <Dialog
      open={openState}
      //keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography align="center" sx={queries.bold_text_Largo_Plazo} mb={2}>
          Guardar como borrador
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
          {/* <span style={{ color: "red", fontWeight: "bold" }}><div dangerouslySetInnerHTML={{ __html: markedText }} /></span> */}
          <span style={{ color: "red", fontWeight: "bold" }}> {markedText} </span>


          <span style={{ color: "red" }}>{restText}</span>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            handler(false)
          }}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={moneyMask(monto.toString()) === "$ 0.00" || institucion === ""}
            onClick={() => {
              handler(false);
              const state = useCortoPlazoStore.getState();
              if (IdSolicitudBorrador !== "") {
                console.log("Esto es el ID de la solicitud en MODIFICACION : ", IdSolicitudBorrador);
                console.log("GUARDAR CERRAR, TODOS LOS COMENTARIOS: ", comentario);

                console.log("filtroTipoGuardado al guardar y cerrar", filtroTipoGuardado);
                modificaSolicitud(
                  solicitud.CreadoPor,
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  //JSON.stringify(comentario),
                  arrDocsEliminados,
                  1,
                  //VERIFICA QUE PEX CON ESTO
                )
                  .then(() => {
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    alertaConfirmCancelar("La solicitud se guardó con éxito")
                    cleanSolicitud();
                    cleanInscripcion();
                    cleanInscripcionModify();
                    setTimeout(() => {
                      navigate("../ConsultaDeSolicitudes");
                    }, 1000);

                  })
                  .catch(() => {
                    alertaConfirmCancelar("Ocurrió un error, inténtelo de nuevo")
                  });
              } else {
                console.log("Esto es el ID de la solicitud en MODIFICACION : ", IdSolicitudBorrador);

                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  JSON.stringify(comentario),
                  setIdSolicitudCreada
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
                    alertaConfirmCancelar("La solicitud se guardó con éxito")
                    cleanInscripcion();
                    cleanSolicitud();
                    navigate("../ConsultaDeSolicitudes");
                  })
                  .catch(() => {
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
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
            Guardar y cerrar
          </Button>
        </ThemeProvider>


        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={moneyMask(monto.toString()) === "$ 0.00" || institucion === ""}
            onClick={() => {
              handler(false);
              if (
                // solicitud.Id !== "" ||
                IdSolicitudBorrador !== "") {
                modificaSolicitud(
                  solicitud.CreadoPor,
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  //JSON.stringify(comentario),
                  arrDocsEliminados,
                  1,
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
                    // cleanSolicitud();
                    // cleanInscripcion
                    //navigate("../ConsultaDeSolicitudes");
                  })
                  .catch((data: any) => {
                    console.log("data catch", data);
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  });
              } else {
                crearSolicitud(
                  localStorage.getItem("IdUsuario"),
                  localStorage.getItem("Rol") === "Capturador" ? "1" : "2",
                  JSON.stringify(comentario),
                  setIdSolicitudCreada
                )
                  .then(() => {
                    if (comentario && Object.keys(comentario).length > 0) {
                      addComentario(
                        IdSolicitudBorrador,
                        JSON.stringify(comentario),
                        "Captura"
                      );
                    }
                    alertaConfirmCancelar("La solicitud se guardó con éxito")

                    //navigate("../ConsultaDeSolicitudes");
                  })
                  .catch(() => {
                    alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
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
