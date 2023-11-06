import axios from "axios";
import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { createNotificationCortoPlazo } from "../../components/APIS/cortoplazo/APISCreateNotificacionCortoPlazo";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";

export interface SolicitudFirmaSlice {
  idSolicitud: string;
  estatus: string;
  url: string;
  infoDoc: string;
  changeIdSolicitud: (id: string) => void;
  changeEstatus: (id: string) => void;
  changeInfoDoc: (info: string) => void;
  setUrl: (url: string) => void;
}

export const createSolicitudFirmaSlice: StateCreator<SolicitudFirmaSlice> = (
  set,
  get
) => ({
  idSolicitud: "",

  estatus: "",

  url: "",

  infoDoc: "",

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),

  changeEstatus: (estatus: any) => {
    set(() => ({
      estatus: estatus,
    }));
  },

  changeInfoDoc: (info: any) => {
    set(() => ({ infoDoc: info }));

    if (info) {
      const inf = JSON.parse(info);

      const state = useCortoPlazoStore.getState();
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/create-firmaDetalle",
          {
            IdPathDoc: inf.IdPathDoc,
            IdFirma: inf.IdFirma,
            IdSolicitud: state.idSolicitud,
            NumeroOficio: `${inf.NumeroOficio}`,
            Asunto: inf.Asunto,
            Rfc: inf.Rfc,
            SerialCertificado: inf.SerialCertificado,
            FechaFirma: inf.FechaFirma,
            FechaDoc: inf.Fecha_doc,
            PathDoc: inf.PathDoc,
            CreadoPor: inf.IdUsuario,
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
              "Access-Control-Allow-Origin": "*",
            },
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          if (
            !state.estatus.includes("Autorizado") &&
            state.estatus !== "Actualizacion"
          ) {
            createNotificationCortoPlazo(
              "Solicitud enviada",
              `La solicitud ha sido enviada para autorización con fecha ${
                new Date().toLocaleString("es-MX").split(" ")[0]
              } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
              [localStorage.getItem("IdUsuario")!]
            );
            GeneraAcuseEnvio(
              state.estatus === "Actualizacion"
                ? "Solicitud de requerimientos"
                : "Constancia de inscripción",
              inf.NumeroOficio.replaceAll("/", "-"),
              state.idSolicitud
            );
          } else {
            GeneraAcuseRespuesta(inf.NumeroOficio, state.idSolicitud);
          }
          CambiaEstatus(
            state.estatus.includes("Actualizacion")
              ? "Actualizacion"
              : state.estatus.includes("Autorizado")
              ? "Autorizado"
              : "Revision",
            state.idSolicitud
          );
        })
        .catch((err) => {});
    }
  },

  setUrl: (url: any) => set(() => ({ url: url })),
});

export async function ConsultaSolicitud(
  Solicitud: string,
  NoOficio: string,
  setUrl: Function
) {
  let solicitud: any = JSON.parse(Solicitud);

  const SolicitudDescarga: any = {
    oficioNum: NoOficio,

    directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
    cargoDirectorGeneral:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,

    servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
    cargoServidorPublico: solicitud.encabezado.solicitanteAutorizado.Cargo,
    organismoServidorPublico: solicitud.encabezado.organismo.Organismo,

    institucionFinanciera:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    fechaContratacion: solicitud.informacionGeneral.fechaContratacion,
    montoOriginalContratado: solicitud.informacionGeneral.monto,
    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios
        : "No Aplica",
    destino: solicitud.informacionGeneral.destino.Descripcion,
    plazo: solicitud.informacionGeneral.plazo,

    tasaInteres:
      solicitud.condicionesFinancieras[0].tasaInteres[0].tasa +
      (solicitud.condicionesFinancieras[0].tasaInteres[0].sobreTasa === "N/A"
        ? " "
        : " + " + solicitud.condicionesFinancieras[0].tasaInteres[0].sobreTasa),
    comisiones:
      solicitud.condicionesFinancieras[0].comisiones[0].porcentajeFijo !== "N/A"
        ? solicitud.condicionesFinancieras[0].comisiones[0].porcentajeFijo +
          (solicitud.condicionesFinancieras[0].comisiones[0].iva === "N/A"
            ? " "
            : " más IVA")
        : solicitud.condicionesFinancieras[0].comisiones[0].montoFijo !== "N/A"
        ? solicitud.condicionesFinancieras[0].comisiones[0].montoFijo +
          (solicitud.condicionesFinancieras[0].comisiones[0].iva === "N/A"
            ? " "
            : " más IVA")
        : "N/A",
    gastosAdicionales: "No Aplica",
    tasaEfectiva: solicitud.condicionesFinancieras[0].tasaEfectiva,
    mecanismoVehiculoDePago: "No Aplica",
    fuentePago: "Falta preguntar",
    garantiaDePago: "No Aplica",
    reglas: JSON.stringify(solicitud.inscripcion.declaratorias),
    documentos: JSON.stringify(solicitud.documentacion),
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
        "/api/create-pdf-solicitud-corto",
      {
        oficioNum: SolicitudDescarga.oficioNum,
        directorGeneral: SolicitudDescarga.directorGeneral,
        cargoDirectorGeneral: SolicitudDescarga.cargoDirectorGeneral,
        servidorPublico: SolicitudDescarga.servidorPublico,
        cargoServidorPublico: SolicitudDescarga.cargoServidorPublico,
        organismoServidorPublico: SolicitudDescarga.organismoServidorPublico,
        institucionFinanciera: SolicitudDescarga.institucionFinanciera,
        fechaContratacion: format(
          new Date(SolicitudDescarga.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        montoOriginalContratado: SolicitudDescarga.montoOriginalContratado,
        entePublicoObligado: SolicitudDescarga.entePublicoObligado,
        destino: SolicitudDescarga.destino,
        plazo: SolicitudDescarga.plazo,
        tasaInteres: SolicitudDescarga.tasaInteres,
        comisiones: SolicitudDescarga.comisiones,
        gastosAdicionales: SolicitudDescarga.gastosAdicionales,
        tasaEfectiva: SolicitudDescarga.tasaEfectiva,
        mecanismoVehiculoDePago: SolicitudDescarga.mecanismoVehiculoDePago,
        fuentePago: SolicitudDescarga.fuentePago,
        garantiaDePago: SolicitudDescarga.garantiaDePago,
        reglas: SolicitudDescarga.reglas,
        documentos: SolicitudDescarga.documentos,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      setUrl(url);
    })
    .catch((err) => {});
}

export async function ConsultaRequerimientos(
  Solicitud: string,
  Requerimientos: {},
  NoOficio: string,
  setUrl: Function
) {
  const solicitud: any = JSON.parse(Solicitud);

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-pdf-requerimientos",
      {
        oficioRequerimiento: 1,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,
        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),
        fechaContratacion: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        entePublicoObligado:
          solicitud.encabezado.tipoEntePublico.TipoEntePublico,
        institucionFinanciera:
          solicitud.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: solicitud.informacionGeneral.monto,
        comentarios: JSON.stringify(Requerimientos),
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral:
          solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      setUrl(url);
    })
    .catch((err) => {});
}

export async function ConsultaConstancia(
  Solicitud: string,
  NoOficio: string,
  setUrl: Function
) {
  const solicitud: any = JSON.parse(Solicitud);

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-pdf-constancia",
      {
        oficioConstancia: 1,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,
        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),
        tipoDocumento: solicitud.encabezado.tipoDocumento,
        fechaContratacion: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        claveInscripcion: "claveInscripcion",
        fechaClave: format(new Date(), "PPP", {
          locale: es,
        }),
        entePublicoObligado:
          solicitud.encabezado.tipoEntePublico.TipoEntePublico,
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios.length > 0
            ? solicitud.informacionGeneral.obligadosSolidarios
            : ["No Aplica"],
        institucionFinanciera:
          solicitud.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: solicitud.informacionGeneral.monto,
        destino: solicitud.informacionGeneral.destino.Descripcion,
        plazo: solicitud.informacionGeneral.plazo,
        amortizaciones: "FALTA PREGUNTAR",
        tasaInteres: "tasaInteres",
        tasaEfectiva: "tasaEfectiva",
        mecanismoVehiculoDePago: "FALTA PREGUNTAR",
        fuentePago: "fuentePago",
        garantiaDePago: "FALTA PREGUNTAR",
        instrumentoDerivado: "FALTA PREGUNTAR",
        financiamientosARefinanciar: ["financiamientosARefinanciar"],
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral:
          solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      setUrl(url);
    })
    .catch((err) => {});
}

export async function GeneraAcuseEnvio(
  tipoSolicitud: string,
  noOficio: string,
  idRegistro: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-pdf-acuse-enviado",
      {
        tipoSolicitud: tipoSolicitud,
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        "/SRPU/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-envio-${noOficio}.pdf`)
      );
    })
    .catch((err) => {});
}

export async function GeneraAcuseRespuesta(
  noOficio: string,
  idRegistro: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
        "/api/create-pdf-acuse-respuesta",
      {
        tipoSolicitud: "Solicitud de requerimientos",
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        "/SRPU/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-respuesta-${noOficio}.pdf`)
      );

      // setUrl(url);
    })
    .catch((err) => {});
}

export const CambiaEstatus = (Estatus: string, IdSolicitud: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/cambiaEstatus",
      {
        Id: IdSolicitud,
        Estatus: Estatus,
        ModificadoPor: localStorage.getItem("IdCentral"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      return true;
    })
    .catch((err) => {});
};

export const getPdf = (
  id: string,
  noRegistro: string,
  fechaContratacion: string,
  IdPath: string
) => {
  let dataArray = new FormData();
  dataArray.append("id", id);
  dataArray.append("phrase", "");

  axios
    .post(process.env.REACT_APP_APPLICATION_FIEL + "/api/getfpdf", dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwt") || "",
      },
      responseType: "arraybuffer",
    })
    .then((r) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([r.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute("download", `${noRegistro}- ${fechaContratacion}.pdf`);
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
      if (IdPath !== "") {
        ActualizaDescarga(IdPath);
      }
    })
    .catch((err) => {});
};
