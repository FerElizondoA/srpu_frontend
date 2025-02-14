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
    

    if (isMissingInstitution && isMissingOriginalAmount && isMissingTipoCredito) {
      setInfo(
        "*En INFORMACIÓN GENERAL: Seleccionar institución financiera, monto original contratado"+
        "*En ENCABEZADO: Seleccionar tipo de credito"
     );
     
    } else if (isMissingInstitution && isMissingTipoCredito) {
      setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera.");
    } else if (isMissingInstitution) {
      setInfo("*En INFORMACIÓN GENERAL: Seleccionar institución financiera.");
    } else if (isMissingOriginalAmount) {
      setInfo(
        "*En INFORMACIÓN GENERAL: Seleccionar monto original contratado."
      );
    }else {
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
  const setProceso: Function = useInscripcionStore(
    (state) => state.setProceso
  );
  
  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const [idSolicitudCreada, setIdSolicitudCreada] = useState("");

    const fn = (v: any) => {
      console.log("v", v);
      return setIdSolicitudCreada(v)
    } 

    const IdSolicitudBorrador: string = useCortoPlazoStore(
      (state) => state.IdSolicitudBorrador
    );

  useEffect(() => {
    console.log("SOLICITUD: ", solicitud);
    console.log("idSolicitudCreada", idSolicitudCreada);
    console.log("IdSolicitudBorrador", IdSolicitudBorrador)
  }, [openState])


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
          <span style={{ color: "red", fontWeight: "bold" }}><div dangerouslySetInnerHTML={{ __html: markedText }} /></span>



          <span style={{ color: "red" }}>{restText}</span>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            handler(false)
            console.log("SOLICITUD: ", solicitud);
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

              if (solicitud.Id !== "") {

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
              if (solicitud.Id !== "" || idSolicitudCreada !== "") {
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
                  // .then((r: any) => {
                    
                  //   console.log("RRRR", r);
                  //   console.log("solicitud.Id : 2", solicitud.Id );
                    
                  //   alertaConfirmCancelar("La solicitud se guardó con éxito")
                  // })
                  // .catch(() => {
                  //   alertaConfirmCancelarError("Ocurrió un error, inténtelo de nuevo")
                  // });
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
