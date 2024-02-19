import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";
import { IDataPrueba } from "../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface ArchivoCancelacion {
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface ArchivosCancelacion {
  acreditacionCancelacion: ArchivoCancelacion;
  bajaCreditoFederal: ArchivoCancelacion;
}

export interface IDataFirmaDetalle {
  Id: string;
  IdPathDoc: string;
  IdFirma: string;
  IdSolicitud: string;
  NumeroOficio: string;
  TipoFirma: string;
  Asunto: string;
  Rfc: string;
  SerialCertificado: string;
  FechaFirma: string;
  Descargas: string;
  FechaDescarga: string;
  FechaDoc: string;
  CreadoPor: string;
  PathDoc: string;
  FechaCreacion: string;
  Deleted: number;
}

export interface SolicitudFirmaSlice {
  idSolicitud: string;
  estatus: string;
  url: string;
  infoDoc: string;
  TipoFirma: string;
  justificacionAnulacion: string;
  setJustificacionAnulacion: (justificacionAnulacion: string) => void;

  catalogoFirmaDetalle: IDataFirmaDetalle;
  getCatalogoFirmaDetalle: (IdSolicitud: string, TipoFirma: string) => void;

  changeIdSolicitud: (id: string) => void;
  changeEstatus: (estatus: string) => void;
  changeInfoDoc: (info: string, cambiaEstatus: Function) => void;

  setUrl: (url: string) => void;

  archivosCancelacion: ArchivosCancelacion;
  setArchivosCancelacion: (ArchivosCancelacion: ArchivosCancelacion) => void;
  cleanArchivosCancelacion: () => void;

  rowSolicitud: IDataPrueba;
  setRowSolicitud: (rowSolicitud: IDataPrueba) => void;
  cleanRowSolicitud: () => void;

  //borrarFirmaDetalle: (IdSolicitud: string, TipoFirma: string) => void;
}

export const createSolicitudFirmaSlice: StateCreator<SolicitudFirmaSlice> = (
  set,
  get
) => ({
  idSolicitud: "",

  rowSolicitud: {
    IdClaveInscripcion: "",
    CreadoPor: "",
    Estatus: "",
    FechaContratacion: "",
    FechaCreacion: "",
    FechaRequerimientos: "",
    Id: "",
    IdEditor: "",
    IdPathDoc: "",
    Institucion: "",
    ModificadoPor: "",
    MontoOriginalContratado: "",
    Nombre: "",
    NumeroRegistro: 0,
    Solicitud: "",
    TipoEntePublico: "",
    TipoSolicitud: "",
    UltimaModificacion: new Date().toString(),
  },

  archivosCancelacion: {
    acreditacionCancelacion: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: new Date().toString(),
    },

    bajaCreditoFederal: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: new Date().toString(),
    },
  },
  justificacionAnulacion: "",
  setJustificacionAnulacion: (justificacionAnulacion: string) =>
    set(() => ({
      justificacionAnulacion: justificacionAnulacion,
    })),

  setRowSolicitud: (rowSolicitud: IDataPrueba) =>
    set(() => ({
      rowSolicitud: rowSolicitud,
    })),

  setArchivosCancelacion: (archivosCancelacion: ArchivosCancelacion) =>
    set(() => ({
      archivosCancelacion: archivosCancelacion,
    })),

  cleanArchivosCancelacion: () =>
    set(() => ({
      archivosCancelacion: {
        acreditacionCancelacion: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
        },

        bajaCreditoFederal: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
        },
      },
    })),

  cleanRowSolicitud: () =>
    set(() => ({
      rowSolicitud: {
        IdClaveInscripcion: "",
        CreadoPor: "",
        Estatus: "",
        FechaContratacion: "",
        FechaCreacion: "",
        FechaRequerimientos: "",
        Id: "",
        IdEditor: "",
        IdPathDoc: "",
        Institucion: "",
        ModificadoPor: "",
        MontoOriginalContratado: "",
        Nombre: "",
        NumeroRegistro: 0,
        Solicitud: "",
        TipoEntePublico: "",
        TipoSolicitud: "",
        UltimaModificacion: new Date().toString(),
      },
    })),

  estatus: "",

  url: "",

  infoDoc: "",

  TipoFirma: "",

  catalogoFirmaDetalle: {
    Id: "",
    IdPathDoc: "",
    IdFirma: "",
    IdSolicitud: "",
    NumeroOficio: "",
    TipoFirma: "",
    Asunto: "",
    Rfc: "",
    SerialCertificado: "",
    FechaFirma: "",
    Descargas: "",
    FechaDescarga: "",
    FechaDoc: "",
    CreadoPor: "",
    PathDoc: "",
    FechaCreacion: "",
    Deleted: 0,
  },

  getCatalogoFirmaDetalle: async (IdSolicitud: string, TipoFirma: string) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-firmaDetalle", {
        params: {
          IdSolicitud: IdSolicitud,
          TipoFirma: TipoFirma,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let fd = data.data;
        set(() => ({
          catalogoFirmaDetalle: fd,
        }));
      });
  },

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),

  changeEstatus: (estatus: any) => {
    set(() => ({
      estatus: estatus,
    }));
  },

  changeInfoDoc: (info: any, cambiaEstatus: Function) => {
    set(() => ({ infoDoc: info }));

    if (info) {
      const inf = JSON.parse(info);

      const state = useCortoPlazoStore.getState();

      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-firmaDetalle",
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
          if (state.estatus === "En espera cancelación") {
            GeneraAcuseEnvio(
              "Solicitud de cancelación",
              inf.NumeroOficio.replaceAll("/", "-"),
              state.idSolicitud
            );
          } else if (state.estatus === "Cancelado") {
            state.getCatalogoFirmaDetalle(state.idSolicitud, state.TipoFirma);
            GeneraAcuseRespuesta(
              "Solicitud de cancelación",
              state.catalogoFirmaDetalle.NumeroOficio.replaceAll("/", "-"),
              state.idSolicitud,
              ""
            );
          } else if (state.estatus === "Anulación") {
            borrarFirmaDetalle(state.idSolicitud, "En espera cancelación");
            //AnularCancelacionSolicitud(state.idSolicitud, state.NumeroRegistro, state.justificacionAnulacion, state.rowSolicitud.UltimaModificacion, state.url)
          } else if (
            !state.estatus.includes("Autorizado") &&
            state.estatus !== "Actualizacion"
          ) {
            GeneraAcuseEnvio(
              state.estatus === "Actualizacion"
                ? "Solicitud de requerimientos"
                : "Constancia de inscripción",
              inf.NumeroOficio.replaceAll("/", "-"),
              state.idSolicitud
            );
          } else {
            GeneraAcuseRespuesta(
              "Solicitud de requerimientos",
              inf.NumeroOficio.replaceAll("/", "-"),
              state.idSolicitud,
              "de respuesta prevención de inscripción"
            );
          }

          cambiaEstatus(
            state.estatus.includes("Actualizacion")
              ? "Actualizacion"
              : state.estatus.includes("Autorizado")
              ? "Autorizado"
              : state.estatus.includes("En espera cancelación")
              ? "En espera cancelación"
              : state.estatus.includes("Cancelado")
              ? "Cancelado"
              : state.estatus.includes("Anulación")
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

export async function GeneraAcuseRespuesta(
  tipoSolicitud: string,
  noOficio: string,
  idRegistro: string,
  fraccionTexto: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse-respuesta",
      {
        tipoSolicitud: tipoSolicitud,
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
        fraccionTexto: fraccionTexto,
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
      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        "/SRPU/CORTOPLAZO/ACUSE",
        new File(
          [response.data],
          `Acuse-respuesta-${tipoSolicitud}-${noOficio}.pdf`
        )
      );
      // setUrl(url);
    })
    .catch((err) => {}); // aqui
}


export async function GeneraFormatoReestructura(
  tipoSolicitud: string,
  noOficio: string,
  idRegistro: string,
  fraccionTexto: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-provisional-reestructura",
      {
        tipoSolicitud: tipoSolicitud,
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
        fraccionTexto: fraccionTexto,
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
      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        "/SRPU/CORTOPLAZO/ACUSE",
        new File(
          [response.data],
          `Acuse-respuesta-${tipoSolicitud}-${noOficio}.pdf`
        )
      );
      // setUrl(url);
    })
    .catch((err) => {}); // aqui
}


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
      solicitud.condicionesFinancieras[0].comisiones[0].porcentaje !== "N/A"
        ? solicitud.condicionesFinancieras[0].comisiones[0].porcentaje +
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
    fuentePago: "No Aplica",
    garantiaDePago: "No Aplica",
    reglas: JSON.stringify(solicitud.inscripcion.declaratorias),
    documentos: JSON.stringify(solicitud.documentacion),
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-solicitud-corto",
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
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-requerimientos",
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
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-constancia",
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
        amortizaciones: "No Aplica",
        tasaInteres: "tasaInteres",
        tasaEfectiva: "tasaEfectiva",
        mecanismoVehiculoDePago: "No Aplica",
        fuentePago: "fuentePago",
        garantiaDePago: "No Aplica",
        instrumentoDerivado: "No Aplica",
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
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse-enviado",
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
      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        "/SRPU/CORTOPLAZO/ACUSE",
        new File(
          [response.data],
          `Acuse-envio-${tipoSolicitud}-${noOficio}.pdf`
        )
      );
    })
    .catch(() => {});
}

export const CambiaEstatus = (Estatus: string, IdSolicitud: string) => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/cambiaEstatus",
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
      // window.location.reload();
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

export async function CancelacionSolicitud(
  Solicitud: string,
  NumeroRegistro: number,
  Justificacion: string,
  archivosCancelacion: ArchivosCancelacion,
  UltimaModificacion: string,
  setUrl: Function
) {
  let solicitud: any = JSON.parse(Solicitud);
  const SolicitudCancelacion: any = {
    numeroSolicitud: NumeroRegistro,
    UsuarioDestinatario: solicitud.inscripcion.servidorPublicoDirigido,
    EntidadDestinatario:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
    UsuarioRemitente: solicitud.encabezado.solicitanteAutorizado.Nombre,
    EntidadRemitente: solicitud.encabezado.solicitanteAutorizado.Cargo,
    claveInscripcion:
      solicitud.ClaveDeInscripcion === undefined
        ? "Sin Clave de Inscripcion"
        : solicitud.ClaveDeInscripcion,

    fechaInscripcion: UltimaModificacion,

    fechaLiquidacion: solicitud.informacionGeneral.fechaVencimiento,
    fechaContratacion: solicitud.informacionGeneral.fechaContratacion,

    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0]
            .entePublicoObligado
        : "No Aplica",
    institucionFinanciera:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    montoOriginalContratado: solicitud.informacionGeneral.monto,
    causaCancelacion: Justificacion,
    documentoAcreditacionCancelacion: JSON.stringify(
      archivosCancelacion.acreditacionCancelacion.nombreArchivo
    ),
    documentoBajaCreditoFederal: JSON.stringify(
      archivosCancelacion.bajaCreditoFederal.nombreArchivo
    ),
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
        "/create-pdf-solicitud-cancelacion",
      {
        numeroSolicitud: SolicitudCancelacion.numeroSolicitud,
        UsuarioDestinatario: SolicitudCancelacion.UsuarioDestinatario,
        EntidadDestinatario: SolicitudCancelacion.EntidadDestinatario,
        UsuarioRemitente: SolicitudCancelacion.UsuarioRemitente,
        EntidadRemitente: SolicitudCancelacion.EntidadRemitente,
        claveInscripcion: SolicitudCancelacion.claveInscripcion,

        fechaInscripcion: format(
          new Date(SolicitudCancelacion.fechaInscripcion),
          "PPP",
          {
            locale: es,
          }
        ),

        fechaLiquidacion: format(
          new Date(SolicitudCancelacion.fechaLiquidacion),
          "PPP",
          {
            locale: es,
          }
        ),
        fechaContratacion: format(
          new Date(SolicitudCancelacion.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        entePublicoObligado: SolicitudCancelacion.entePublicoObligado,
        institucionFinanciera: SolicitudCancelacion.institucionFinanciera,
        montoOriginalContratado: SolicitudCancelacion.montoOriginalContratado,
        causaCancelacion: SolicitudCancelacion.causaCancelacion,
        documentoAcreditacionCancelacion:
          SolicitudCancelacion.documentoAcreditacionCancelacion,
        documentoBajaCreditoFederal:
          SolicitudCancelacion.documentoBajaCreditoFederal,
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

export async function borrarFirmaDetalle(
  IdSolicitud: string,
  TipoFirma: string
) {
  // const Toast = Swal.mixin({
  //   toast: true,
  //   timer: 3000,
  //   timerProgressBar: true,
  // });

  await axios
    .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-firma", {
      data: {
        IdSolicitud: IdSolicitud,
        TipoFirma: TipoFirma,
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        //window.location.reload();
        Swal.fire({
          icon: "success",
          title: "Se anuló la solicitud de cancelación con éxito",
          iconColor: "#AF8C55",
          showConfirmButton: false,
          color: "#AF8C55",
          timer: 3000,
        });
      }
      return true;
    })
    .catch(function () {
      Swal.fire({
        icon: "error",
        title: "Error, favor de intentar más tarde.",
        iconColor: "#AF8C55",
        showConfirmButton: false,
        color: "#AF8C55",
        timer: 2000,
      });
    });
  return false;
}

export async function AnularCancelacionSolicitud(
  Solicitud: string,
  NumeroRegistro: number,
  causaAnulacion: string,
  UltimaModificacion: string,
  setUrl: Function
) {
  let solicitud: any = JSON.parse(Solicitud);
  const SolicitudCancelacion: any = {
    numeroSolicitud: NumeroRegistro,
    UsuarioDestinatario: solicitud.inscripcion.servidorPublicoDirigido,
    EntidadDestinatario:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
    UsuarioRemitente: solicitud.encabezado.solicitanteAutorizado.Nombre,
    EntidadRemitente: solicitud.encabezado.solicitanteAutorizado.Cargo,
    claveInscripcion:
      solicitud.ClaveDeInscripcion === undefined
        ? "Sin Clave de Inscripcion"
        : solicitud.ClaveDeInscripcion,

    fechaInscripcion: UltimaModificacion,

    fechaLiquidacion: solicitud.informacionGeneral.fechaVencimiento,
    fechaContratacion: solicitud.informacionGeneral.fechaContratacion,

    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0]
            .entePublicoObligado
        : "No Aplica",

    institucionFinanciera:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    montoOriginalContratado: solicitud.informacionGeneral.monto,
    causaAnulacion: causaAnulacion,
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-anular-cancelacion",
      {
        numeroSolicitud: SolicitudCancelacion.numeroSolicitud,
        UsuarioDestinatario: SolicitudCancelacion.UsuarioDestinatario,
        EntidadDestinatario: SolicitudCancelacion.EntidadDestinatario,
        UsuarioRemitente: SolicitudCancelacion.UsuarioRemitente,
        EntidadRemitente: SolicitudCancelacion.EntidadRemitente,
        claveInscripcion: SolicitudCancelacion.claveInscripcion,

        fechaInscripcion: format(
          new Date(SolicitudCancelacion.fechaInscripcion),
          "PPP",
          {
            locale: es,
          }
        ),

        fechaLiquidacion: format(
          new Date(SolicitudCancelacion.fechaLiquidacion),
          "PPP",
          {
            locale: es,
          }
        ),
        fechaContratacion: format(
          new Date(SolicitudCancelacion.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        entePublicoObligado: SolicitudCancelacion.entePublicoObligado,
        institucionFinanciera: SolicitudCancelacion.institucionFinanciera,
        montoOriginalContratado: SolicitudCancelacion.montoOriginalContratado,
        causaAnulacion: SolicitudCancelacion.causaAnulacion,
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
