import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IData } from "../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useCancelacionStore } from "./main";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useInscripcionStore } from "../Inscripcion/main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface ArchivoCancelacion {
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
  TipoArchivoJustificacion: string;
}

export interface ICancelacion {
  AcreditacionDeLaCancelacion: ArchivoCancelacion;
  BajaDeCreditoFederal: ArchivoCancelacion;
  Justificacion: string;
}

export interface SolicitudCancelacionSlice {

  //#region Cancelacion-Documentacion para iniciar el proceso 
  documentacionCancelacion: ArchivoCancelacion[];
  cleanDocumentacionCancelacion:() => void;
  addDocumentacionCancelacion: (newDocumento: ArchivoCancelacion) => void;

  justificacion: string
  setJustificacion: (justificacion: string) => void;
 //#endregion


  credito: IData;
  setCredito: (credito: IData) => void;

  cancelacion: ICancelacion;

  setCancelacion: (cancelacion: ICancelacion) => void;
  cleanCancelacion: () => void;

  crearSolicitud: (idCreador: string) => void;

  modificaSolicitud: (idCreador: string) => void;

  borrarSolicitud: (Id: string) => void;

  tipoFirmaDetalle: string;
  setTipoFirmaDetalle: (tipoFirmaDetalle: string) => void;
  cleanTipoFirmaDetalle: () => void;

  addComentario: (
    idSolicitud: string,
    comentario: string,
    tipo: string
  ) => void;

  eliminarRequerimientos: (Id: string, setState: Function) => void;

  deleteFiles: (ruta: string) => void;
  saveFilesCancelaciones: (idRegistro: string, ruta: string) => void;


  savePathDocCancelacion: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string,
    TipoArchivoJustificacion: string,
    Justificacion: string
  ) => void;
}

export const createSolicitudCancelacionSlice: StateCreator<
  SolicitudCancelacionSlice
> = (set, get) => ({
  //#region Cancelacion-Documentacion para iniciar el proceso 
  documentacionCancelacion: [],

  // addDocumentacionCancelacion: (newDocumento: ArchivoCancelacion) => {
  //   set((state) => ({
  //     documentacionCancelacion: [
  //       ...state.documentacionCancelacion,
  //       newDocumento,
  //     ],
  //   }));
  // },
  
  addDocumentacionCancelacion: (newDocumento) => {
    set((state) => {
      const updatedDocs = [...state.documentacionCancelacion];
      const index = updatedDocs.findIndex(
        (doc) => doc.TipoArchivoJustificacion === newDocumento.TipoArchivoJustificacion
      );
      
      if (index !== -1) {
        updatedDocs[index] = newDocumento; // Sobrescribir si ya existe
      } else if (updatedDocs.length < 2) {
        updatedDocs.push(newDocumento); // Agregar si hay espacio
      }
      
      return { documentacionCancelacion: updatedDocs };
    });
  },

  cleanDocumentacionCancelacion: () => {
    set((state) => ({
      documentacionCancelacion: []
    }));
  },

  justificacion: "",

  setJustificacion: (justificacion: string) => {
    set(() => ({
      justificacion: justificacion,
    }));
  },



  tipoFirmaDetalle: "",

  setTipoFirmaDetalle: (tipoFirmaDetalle: string) => {
    set((state) => ({
      tipoFirmaDetalle: tipoFirmaDetalle,
    }));
  },

  //#endregion 

  cleanTipoFirmaDetalle: () => {
    console.log("cleanTipoFirmaDetalle, se borro");
    set((state) => ({
      tipoFirmaDetalle: "",
    }));
  },


  credito: {
    Id: "",
    NumeroRegistro: "",
    Nombre: "",
    TipoEntePublico: "",
    TipoSolicitud: "",
    TipoCredito: "",
    Institucion: "",
    NoEstatus: "",
    Estatus: "",
    ControlInterno: "",
    Control: "",
    IdClaveInscripcion: "",
    MontoOriginalContratado: "",
    FechaContratacion: "",
    Solicitud: "",
    FechaCreacion: "",
    CreadoPor: "",
    UltimaModificacion: "",
    ModificadoPor: "",
    IdEditor: "",
    FechaRequerimientos: "",
    IdPathDoc: "",
    CountReestructuras: "",

    // Id: "",
    // NumeroRegistro: "",
    // Nombre: "",
    // TipoEntePublico: "",
    // TipoSolicitud: "",
    // TipoCredito: "",
    // Institucion: "",
    // NoEstatus: "",
    // Estatus: "",
    // ControlInterno: "",
    // IdClaveInscripcion: "",
    // MontoOriginalContratado: "",
    // FechaContratacion: "",
    // Solicitud: "",
    // FechaCreacion: "",
    // CreadoPor: "",
    // UltimaModificacion: "",
    // ModificadoPor: "",
    // IdEditor: "",
    // FechaRequerimientos: "",
    // IdPathDoc: "",
    // Control: "",
  },

  setCredito: (credito: IData) => {
    set((state) => ({
      credito: credito,
    }));
  },

  cancelacion: {
    AcreditacionDeLaCancelacion: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: "",
      TipoArchivoJustificacion: "",
    },
    BajaDeCreditoFederal: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: "",
      TipoArchivoJustificacion: "",
    },
    Justificacion: "",
  },

  setCancelacion: (cancelacion: ICancelacion) => {
    set(() => ({
      cancelacion: cancelacion,
    }));
  },

  cleanCancelacion: () =>
    set(() => ({
      cancelacion: {
        Justificacion: "",
        AcreditacionDeLaCancelacion: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
          TipoArchivoJustificacion: "", // AGREGAR ESTO PARA SABER QUE TIPO DE DOCUMENTO DE JUSTIFIACION ES
        },

        BajaDeCreditoFederal: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
          TipoArchivoJustificacion: "",
        },
      },
    })),

  crearSolicitud: async (idCreador: string) => {
    const solicitud: any = {};

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-solicitud",
        {
          Solicitud: JSON.stringify(solicitud),
          CreadoPor: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => { });
  },

  modificaSolicitud: async (idCreador: string) => {
    const solicitud: any = {
      encabezado: "state.encabezado",
    };

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-solicitud",
        {
          Solicitud: JSON.stringify(solicitud),
          IdUsuario: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => { });
  },

  borrarSolicitud: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-solicitud", {
        data: {
          IdSolicitud: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            iconColor: "#AF8C55",
            showConfirmButton: false,
            color: "#AF8C55",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "No se elimino la solicitud.",
          iconColor: "#AF8C55",
          showConfirmButton: false,
          color: "#AF8C55",
        });
      });
    return false;
  },

  addComentario: async (Id: string, comentario: any, tipo: string) => {
    if (comentario.length !== 2) {
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-comentario",
          {
            IdSolicitud: Id,
            Comentario: comentario,
            Tipo: tipo,
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdComentario: "useCortoPlazoStore.getState().idComentario",
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then(({ data }) => { })
        .catch((e) => { });
    }
  },

  eliminarRequerimientos: async (Id: string, setState: Function) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      confirmButtonColor: "#15212f",
      cancelButtonColor: "rgb(175, 140, 85)",
      timer: 3000,
      timerProgressBar: true,
    });
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/delete-comentario",
        {
          Id: Id,
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Comentario eliminado",
        });
        setState();
      })
      .catch((e) => { });
  },

  deleteFiles: async (ruta: string) => {
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);

    return axios
      .post(
        process.env.REACT_APP_APPLICATION_FILES +
        "/api/ApiDoc/DeleteDirectorio",
        dataArray,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .catch((e) => { });
  },

  saveFilesCancelaciones: async (idRegistro: string, ruta: string) => {
    const state = useCancelacionStore.getState();
  
    return await state.documentacionCancelacion.map((file:any, index) => {
      return setTimeout(() => {
        const url = new File([file.archivo], file.nombreArchivo);
        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);
        if (file.archivo) {
          return axios
            .post(
              process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
              dataArray,
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            )
            .then(({ data }) => {
              console.log("state.documentacionCancelacion[index].TipoArchivoJustificacion,", state.documentacionCancelacion[index].TipoArchivoJustificacion,)
              state.savePathDocCancelacion(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO,
                state.documentacionCancelacion[index].TipoArchivoJustificacion,
                state.justificacion
              );
            })
            .catch((e) => {});
        } else {
          return null;
        }
      }, 1000);
    });
  },


  savePathDocCancelacion: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string,
    TipoArchivoJustificacion: string,
    Justificacion: string
  ) => {

    const state = useCancelacionStore.getState();
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocCancelacion",
        {
          IdSolicitud: idSolicitud,
          Ruta: Ruta,
          NombreArchivo: NombreArchivo,
          NombreIdentificador: NombreIdentificador,
          TipoArchivoJustificacion: TipoArchivoJustificacion,
          Justificacion: Justificacion,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {
        state.cleanDocumentacionCancelacion();
        state.setJustificacion("");

       })
      .catch((e) => { });
  },
});

export async function CancelacionSolicitud(setUrl: Function) {
  const stateC = useCancelacionStore.getState();
  const state = useInscripcionStore.getState();


  let infoSolicitud: any = JSON.parse(state.inscripcion.Solicitud);
  let credito = state.inscripcion;
  let cancelacion = stateC.cancelacion;

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
      "/create-pdf-solicitud-cancelacion",
      {
        numeroSolicitud: credito.NumeroRegistro,
        UsuarioDestinatario: infoSolicitud.inscripcion.servidorPublicoDirigido,
        EntidadDestinatario:
          infoSolicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
        UsuarioRemitente: infoSolicitud.encabezado.solicitanteAutorizado.Nombre,
        EntidadRemitente: infoSolicitud.encabezado.organismo.Organismo,
        claveInscripcion: credito.IdClaveInscripcion,
        fechaInscripcion: format(new Date(credito.FechaCreacion), "PPP", {
          locale: es,
        }),
        fechaLiquidacion: format(new Date(credito.FechaContratacion), "PPP", {
          locale: es,
        }),
        fechaContratacion: format(new Date(credito.FechaContratacion), "PPP", {
          locale: es,
        }),
        entePublicoObligado: credito.Nombre,
        institucionFinanciera: //CORREGIDO
          infoSolicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: infoSolicitud.informacionGeneral.informacionGeneral.monto,
        
        causaCancelacion: stateC.justificacion,
        documentoAcreditacionCancelacion: stateC.documentacionCancelacion.find(
          doc => doc.TipoArchivoJustificacion === "Acreditacion De La Cancelacion")?.nombreArchivo,
        documentoBajaCreditoFederal: stateC.documentacionCancelacion.find(
          doc => doc.TipoArchivoJustificacion === "Baja De Credito Federal")?.nombreArchivo,


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

      console.log("URL, cancelaciones xD", url);

      //AQUI NO VA CORREGIR 
      // state.saveFiles(
      //   response.data.Id,
      //   process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/CANCELACIONES/DOCSOL/${response.data.Id}`
      // );

      // console.log("URL, cancelaciones xD", url);

      setUrl(url);
    })
    .catch((err) => { });
}


