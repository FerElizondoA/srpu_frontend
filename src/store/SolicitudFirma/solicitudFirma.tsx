import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { StateCreator } from "zustand";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { IInscripcion, ISolicitudLargoPlazo } from "../Inscripcion/inscripcion";
import { useInscripcionStore } from "../Inscripcion/main";
import { alertaError, alertaErrorConfirm, alertaExitoConfirm } from "../../generics/Alertas";
import { IDatosSolicitudReestructura } from "../Reestructura/reestructura";

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
  proceso: string;
  url: string;
  infoDoc: string;

  catalogoFirmaDetalle: IDataFirmaDetalle;
  getCatalogoFirmaDetalle: (IdSolicitud: string, TipoFirma: string) => void;

  setProceso: (estatus: string) => void;
  changeInfoDoc: (info: string, cambiaEstatus: Function) => void;

  setUrl: (url: string) => void;
}

export const createSolicitudFirmaSlice: StateCreator<SolicitudFirmaSlice> = (
  set,
  get
) => ({
  proceso: "",

  url: "",

  infoDoc: "",

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

  setProceso: (estatus: string) => {
    set(() => ({
      proceso: estatus,
    }));
  },

  changeInfoDoc: (info: any, cambiaEstatus: Function) => {
    set(() => ({ infoDoc: info }));

    if (info) {
      const inf = JSON.parse(info);
      
      const state = useInscripcionStore.getState();

      const estatusPrevio = {
        NoEstatus: state.inscripcion.NoEstatus,
        Estatus: state.inscripcion.Estatus,
        ControlInterno: state.inscripcion.ControlInterno,
      };

      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-firmaDetalle",
          {
            IdPathDoc: inf.IdPathDoc,
            IdFirma: inf.IdFirma,
            IdSolicitud: state.inscripcion.Id,
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
          let titulo =
            estatusPrevio.ControlInterno === "inscripcion"
              ? "Solicitud de Inscripción"
              : estatusPrevio.ControlInterno === "revision"
              ? "Solicitud de Requerimientos"
              : "Constancia de Inscripción";
          let mensaje =
            estatusPrevio.ControlInterno === "inscripcion"
              ? `Se recibe el ${new Date().toLocaleString(
                  "es-MX"
                )} el documento ${titulo} con el identificador: ${
                  state.inscripcion.IdClaveInscripcion
                }`
              : `Se envía el ${new Date().toLocaleString(
                  "es-MX"
                )} el documento ${titulo} con el identificador: ${
                  state.inscripcion.IdClaveInscripcion
                }`;
          let oficio = `Solicitud ${state.inscripcion.IdClaveInscripcion}`;

          // else if (state.estatus === "Cancelacion") {
          //   borrarFirmaDetalle(state.idSolicitud, "En espera cancelación");
          // } else if (state.estatus === "Reestructura") {
          //   borrarFirmaDetalle(state.idSolicitud, "En espera cancelación");
          // }

          GeneraAcuse(titulo, mensaje, oficio, "state.idSolicitud"); // CORREGIR
          cambiaEstatus(
            estatusPrevio.ControlInterno === "inscripcion"
              ? "4"
              : estatusPrevio.ControlInterno === "revision" &&
                state.proceso === "actualizacion"
              ? "8"
              : estatusPrevio.NoEstatus === "9"
              ? "10"
              : estatusPrevio.NoEstatus === "10" &&
                state.proceso === "cancelacion"
              ? "12"
              : estatusPrevio.ControlInterno === "cancelacion" &&
                state.proceso === "actualizacion"
              ? "16"
              : estatusPrevio.ControlInterno === "cancelado"
              ? "18"
              : estatusPrevio.ControlInterno === "reestructura" &&
                state.proceso === "solicitud"
              ? "20"
              : estatusPrevio.ControlInterno === "reestructura" &&
                state.proceso === "actualizacion"
              ? "24"
              : estatusPrevio.ControlInterno === "reestructurado"
              ? "10"
              : "11",
            state.inscripcion.Id,
            inf.IdUsuario,
            oficio
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
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+"/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-${noOficio}.pdf`)
      );
      // setUrl(url);
    })
    .catch((err) => {}); // aqui
}

export async function GeneraFormatoReestructura(
  Solicitud: string,
  tipoSolicitud: string,
  noOficio: string,
  //idRegistro: string,
  idClaveInscripcion: string,
  setUrl: Function,
  //noRegistro: string,
  // fraccionTexto: string
) {
  const solicitud: any = JSON.parse(Solicitud);

 

  const SolicitudReestructura: any = {
    oficioNum: `DDPYPF-${"SR-"}${noOficio}/${new Date().getFullYear()}`,
    servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
    cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
    organismo: solicitud.encabezado.organismo.Organismo,
    oficioSolicitud: noOficio, //

    fechaSolicitud: format(new Date(), "PPP", {
      // AL MOMENTO
      locale: es,
    }),

    tipoDocumento: solicitud.encabezado.tipoDocumento,

    fechaContratacion:  format(new Date(solicitud.encabezado.fechaContratacion), "PPP", {
      locale: es,
    }),

    claveInscripcion:
    idClaveInscripcion === undefined
        ? "Sin Clave de Inscripcion"
        : idClaveInscripcion,

    fechaClave: idClaveInscripcion,

    fechaReestructuracion: "FALTA CREAR LA TABLA Y GUARDAR CUANDO SE FINALIZO LA REESTRUCTURA CON SUS CAMBIOS", //guardar esa fecha al la hora de finalizarla 

    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0].entePublicoObligado
        : "No Aplica",

    obligadoSolidarioAval:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0].tipoEntePublicoObligado
        : ["No Aplica"],

    institucionFinanciera:
      solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
    montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,
    saldoVigente: solicitud.informacionGeneral.destinoGastosCostos[0].saldoVigente,
    mecanismoVehiculoDePago: solicitud.fuenteDePago.mecanismoVehiculoDePago.Tipo,
    fuentePago: solicitud.fuenteDePago.fuente[0].fondoIngreso.Descripcion , //tabla "REVISAR"
    directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
    cargoDirectorGeneral:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
    modificaciones: "REVISAR",
  };
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
        "/create-pdf-constancia-reestructura",
      {
        // tipoSolicitud: tipoSolicitud,
        // oficioConstancia: noOficio,
        // fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        // hora: new Date().toLocaleString("es-MX").split(" ")[1],
        //fraccionTexto: fraccionTexto,
        oficioNum: SolicitudReestructura.noOficio,
        servidorPublico: SolicitudReestructura.servidorPublico,
        cargo: SolicitudReestructura.cargo,
        organismo: SolicitudReestructura.organismo,
        oficioSolicitud: SolicitudReestructura.oficioSolicitud,
        fechaSolicitud: SolicitudReestructura.fechaSolicitud,
        tipoDocumento: solicitud.encabezado.tipoDocumento,
        fechaContratacion: SolicitudReestructura.fechaContratacion,
        claveInscripcion: SolicitudReestructura.claveInscripcion,
        fechaClave: SolicitudReestructura.fechaClave,
        fechaReestructuracion: SolicitudReestructura.fechaReestructuracion,
        entePublicoObligado: SolicitudReestructura.entePublicoObligado,
        obligadoSolidarioAval: SolicitudReestructura.obligadoSolidarioAval,
        institucionFinanciera: SolicitudReestructura.institucionFinanciera,
        montoOriginalContratado: SolicitudReestructura.montoOriginalContratado,
        saldoVigente: SolicitudReestructura.saldoVigente,
        mecanismoVehiculoDePago: SolicitudReestructura.mecanismoVehiculoDePago,
        fuentePago: SolicitudReestructura.fuentePago,
        directorGeneral: SolicitudReestructura.directorGeneral,
        cargoDirectorGeneral: SolicitudReestructura.cargoDirectorGeneral,
        modificaciones: SolicitudReestructura.modificaciones,
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
    //   const state = useCortoPlazoStore.getState();

    //   state.guardaDocumentos(
    //     idRegistro,
    //     "/SRPU/CORTOPLAZO/ACUSE",
    //     new File(
    //       [response.data],
    //       `Acuse-respuesta-${tipoSolicitud}-${noOficio}.pdf`
    //     )
    //   );
    //   // setUrl(url);
    // })
    .catch((err) => {}); // aqui
}

export async function ConsultaSolicitud(setUrl: Function) {
  let inscripcion: IInscripcion = useInscripcionStore?.getState()?.inscripcion;
  let solicitud: ISolicitudLargoPlazo = JSON?.parse(inscripcion?.Solicitud);

  
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-solicitud-corto",
      {
        oficioNum: inscripcion.NumeroRegistro,         
       
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,        
        
        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,          
        
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        
        cargoServidorPublico: solicitud.encabezado.solicitanteAutorizado.Cargo,

        organismoServidorPublico: solicitud.encabezado.organismo.Organismo,

        institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

        fechaContratacion: format(new Date(solicitud.informacionGeneral.informacionGeneral.fechaContratacion),"PPP",{
            locale: es,
          }) ,

        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,

        entePublicoObligado: solicitud.informacionGeneral.obligadosSolidarios,

        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,

        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,

        tasaInteres: solicitud.condicionesFinancieras[0]?.tasaInteres[0]?.tasaFija,

        comisiones: solicitud.condicionesFinancieras[0]?.comisiones[0]?.porcentaje,

        gastosAdicionales: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
          ? solicitud.informacionGeneral?.destinoGastosCostos[0]?.gastosAdicionales
          : "N/A" ,

        tasaEfectiva: solicitud.condicionesFinancieras[0]?.tasaEfectiva.tasaEfectiva,

        mecanismoVehiculoDePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
            ? solicitud.fuenteDePago?.mecanismoVehiculoDePago.Tipo
            : "N/A" ,
        
        fuentePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
            ? solicitud.fuenteDePago?.mecanismoVehiculoDePago?.NumeroRegistro
            : "N/A",
        
        garantiaDePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
            ? solicitud.fuenteDePago?.garantiaDePago
            : "N/A",
        
        reglas: JSON.stringify(solicitud.inscripcion.declaratorias) ,
        documentos: JSON.stringify(solicitud.documentacion)
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


export async function ConsultaSolicitudReestructura(setUrl: Function) {
  let inscripcion: IDatosSolicitudReestructura = useInscripcionStore?.getState()?.inscripcionReestructura;
  let solicitud: ISolicitudLargoPlazo = JSON?.parse(inscripcion?.SolicitudReestructura);

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-solicitud-corto",
      {
        oficioNum: inscripcion.NumeroRegistro,         
       
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,        
        
        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,          
        
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        
        cargoServidorPublico: solicitud.encabezado.solicitanteAutorizado.Cargo,

        organismoServidorPublico: solicitud.encabezado.organismo.Organismo,

        institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

        fechaContratacion: format(new Date(solicitud.informacionGeneral.informacionGeneral.fechaContratacion),"PPP",{
            locale: es,
          }) ,

        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,

        entePublicoObligado: solicitud.informacionGeneral.obligadosSolidarios,

        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,

        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,

        tasaInteres: solicitud.condicionesFinancieras[0]?.tasaInteres[0]?.tasaFija,

        comisiones: solicitud.condicionesFinancieras[0]?.comisiones[0]?.porcentaje,

        gastosAdicionales: solicitud.informacionGeneral?.destinoGastosCostos[0]?.gastosAdicionales
           ,

        tasaEfectiva: solicitud.condicionesFinancieras[0]?.tasaEfectiva.tasaEfectiva,

        mecanismoVehiculoDePago:  solicitud.fuenteDePago?.mecanismoVehiculoDePago.Tipo,
        
        fuentePago: solicitud.fuenteDePago?.mecanismoVehiculoDePago?.NumeroRegistro,
        
        garantiaDePago: solicitud.fuenteDePago?.garantiaDePago,

        reglas: JSON.stringify(solicitud.inscripcion.declaratorias),

        documentos: JSON.stringify(solicitud.documentacion)
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
          solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,

        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,
        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,
        
        
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
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+"/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-envio-${noOficio}.pdf`)
      );
    })
    .catch(() => {});
}

export async function GeneraAcuse(
  titulo: string,
  mensaje: string,
  oficio: string,
  idRegistro: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse",
      {
        titulo: titulo,
        mensaje: mensaje,
        oficio: oficio,
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
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+"/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-${oficio}.pdf`)
      );
    })
    .catch(() => {});
}

export const CambiaEstatus = (
  Estatus: string,
  IdSolicitud: string,
  IdEditor: string
) => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/cambiaEstatus",
      {
        Id: IdSolicitud,
        Estatus: Estatus,
        ModificadoPor: localStorage.getItem("IdCentral"),
        IdEditor: IdEditor,
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
    .catch((err) => {
      alertaError("Error al intentar descargar documento pdf")
    });
};

export async function borrarFirmaDetalle(
  IdSolicitud: string,
  TipoFirma: string
) {
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
        // Swal.fire({
        //   icon: "success",
        //   title: "Se anuló la solicitud de cancelación con éxito",
        //   iconColor: "#AF8C55",
        //   showConfirmButton: false,
        //   color: "#AF8C55",
        //   timer: 3000,
        // });
        alertaExitoConfirm("Se anuló la solicitud de cancelación con éxito")
      }
      return true;
    })
    .catch(function () {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error, favor de intentar más tarde.",
      //   iconColor: "#AF8C55",
      //   showConfirmButton: false,
      //   color: "#AF8C55",
      //   timer: 2000,
      // });

      alertaErrorConfirm("Error, favor de intentar más tarde.")
    });
  return false;
}

export async function AnularCancelacionSolicitud(
  Solicitud: string,
  NumeroRegistro: string,
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
