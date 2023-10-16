import axios from "axios";
import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

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

  changeEstatus: (estatus: any) => set(() => ({ estatus: estatus })),

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
            NumeroOficio: inf.NumeroOficio,
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
          CambiaEstatus(
            state.estatus.includes("Autorizado") ? "Autorizado" : "Revision",
            state.idSolicitud
          );
        })
        .catch((err) => {});
    }
  },

  setUrl: (url: any) => set(() => ({ url: url })),
});

export async function ConsultaSolicitud(Solicitud: string, setUrl: Function) {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  let solicitud: any = JSON.parse(Solicitud);
  interface DocumentacionItem {
    descripcionTipo: string;
    // Otros campos si existen en la estructura de solicitud.documentacion
  }

  const descripciones: string[] = solicitud.documentacion.map(
    (item: DocumentacionItem) => item.descripcionTipo
  );

  const fechaVencimiento = new Date(
    solicitud.informacionGeneral.fechaVencimiento
  );
  const dia = fechaVencimiento.getDate();
  const mes = meses[fechaVencimiento.getMonth()];
  const año = fechaVencimiento.getFullYear();

  const fechaVencimientoEspañol = `${dia} de ${mes} de ${año}`;

  const fechaContratacion = new Date(
    solicitud.informacionGeneral.fechaContratacion
  );
  const diaC = fechaContratacion.getDate();
  const mesC = meses[fechaContratacion.getMonth()];
  const añoC = fechaContratacion.getFullYear();

  const fechaContratacionEspañol = `${diaC} de ${mesC} de ${añoC}`;

  const SolicitudDescarga: any = {
    Nombre: solicitud.encabezado.solicitanteAutorizado.Nombre,
    Cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
    Organismo: solicitud.encabezado.organismo.Organismo,
    InstitucionBancaria:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    Monto: solicitud.informacionGeneral.monto,
    Destino: solicitud.informacionGeneral.destino.Descripcion,
    PlazoDias: solicitud.informacionGeneral.plazo,
    TipoEntePublico: solicitud.encabezado.tipoEntePublico.TipoEntePublico,
    Tipocomisiones:
      solicitud.condicionesFinancieras[0].comisiones[0]?.tipoDeComision ||
      "No aplica",
    TasaEfectiva: solicitud.condicionesFinancieras[0].tasaEfectiva,
    Servidorpublico: solicitud.inscripcion.servidorPublicoDirigido,
    TipoDocumento: solicitud.encabezado.tipoDocumento,
    PeriodoPago:
      solicitud.condicionesFinancieras[0].comisiones[0].periodicidadDePago,
    //ObligadoSolidarioAval: solicitud.informacionGeneral.obligadosSolidarios[0]?.obligadoSolidario || 'No aplica',
    Reglas: solicitud.inscripcion.declaratorias,
    TasaInteres:
      solicitud.condicionesFinancieras[0].tasaInteres[0].tasaReferencia,
    Documentos: solicitud.documentacion.descripcionTipo,
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_MID + "/documento_srpu",
      {
        nombre: SolicitudDescarga.Nombre,
        cargoServidorPublicoSolicitante: SolicitudDescarga.Cargo,
        oficionum: "10",
        cargoServidorPublico: solicitud.cargoSolicitante,
        organismo: SolicitudDescarga.Organismo,
        InstitucionBancaria: SolicitudDescarga.InstitucionBancaria,
        monto: SolicitudDescarga.Monto,
        destino: SolicitudDescarga.Destino,
        dias: SolicitudDescarga.PlazoDias,
        tipoEntePublicoObligado: SolicitudDescarga.TipoEntePublico,
        tasaefectiva: SolicitudDescarga.TasaEfectiva,
        tasaInteres: SolicitudDescarga.TasaInteres,
        reglas: SolicitudDescarga.Reglas,
        tipocomisiones: SolicitudDescarga.Tipocomisiones,
        servidorpublico: SolicitudDescarga.Servidorpublico,
        contrato: SolicitudDescarga.TipoDocumento,
        periodoPago: SolicitudDescarga.PeriodoPago,
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios[0]
            ?.obligadoSolidario || "No aplica",
        fechaContrato: fechaContratacionEspañol,
        fechaVencimiento: fechaVencimientoEspañol,
        Documentos: descripciones,
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
        fechaSolicitud: new Date(),
        fechaContratacion: solicitud.encabezado.fechaContratacion,
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
      process.env.REACT_APP_APPLICATION_MID + "/documento_srpu_constancia",
      {
        oficioConstancia: 1,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,
        fechaSolicitud: new Date(),
        tipoDocumento: solicitud.encabezado.tipoDocumento,
        fechaContratacion: solicitud.encabezado.fechaContratacion,
        claveInscripcion: "claveInscripcion",
        fechaClave: new Date(),
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
        amortizaciones: "amortizaciones",
        tasaInteres: "tasaInteres",
        tasaEfectiva: "tasaEfectiva",
        mecanismoVehiculoDePago: "mecanismoVehiculoDePago",
        fuentePago: "fuentePago",
        garantiaDePago: "garantiaDePago",
        instrumentoDerivado: "instrumentoDerivado",
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
  fechaContratacion: string
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
    })
    .catch((err) => {});
};
