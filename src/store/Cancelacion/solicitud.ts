import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IData } from "../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useCancelacionStore } from "./main";

export interface ArchivoCancelacion {
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface ICancelacion {
  AcreditacionDeLaCancelacion: ArchivoCancelacion;
  BajaDeCreditoFederal: ArchivoCancelacion;
  Justificacion: string;
}

export interface SolicitudCancelacionSlice {
  solicitud: IData;
  setSolicitud: (solicitud: IData) => void;

  cancelacion: ICancelacion;

  setCancelacion: (cancelacion: ICancelacion) => void;
  cleanCancelacion: () => void;

  crearSolicitud: (idCreador: string) => void;

  modificaSolicitud: (idCreador: string) => void;

  borrarSolicitud: (Id: string) => void;

  addComentario: (
    idSolicitud: string,
    comentario: string,
    tipo: string
  ) => void;

  eliminarRequerimientos: (Id: string, setState: Function) => void;

  deleteFiles: (ruta: string) => void;
  saveFiles: (idRegistro: string, ruta: string) => void;

  guardaDocumentos: (idRegistro: string, ruta: string, archivo: File) => void;

  savePathDoc: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;
}

export const createSolicitudCancelacionSlice: StateCreator<
  SolicitudCancelacionSlice
> = (set, get) => ({
  solicitud: {
    Id: "",
    NumeroRegistro: "",
    Nombre: "",
    TipoEntePublico: "",
    TipoSolicitud: "",
    Institucion: "",
    NoEstatus: "",
    Estatus: "",
    ControlInterno: "",
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
    Control: "",
  },

  setSolicitud: (solicitud: IData) => {
    set((state) => ({
      solicitud: solicitud,
    }));
  },

  cancelacion: {
    AcreditacionDeLaCancelacion: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: "",
    },
    BajaDeCreditoFederal: {
      archivo: new File([], ""),
      nombreArchivo: "",
      fechaArchivo: "",
    },
    Justificacion: "",
  },

  setCancelacion: (cancelacion: ICancelacion) => {
    //     set(() => ({
    //     cancelacion: archivosCancelacion,
    // })),
  },

  cleanCancelacion: () =>
    set(() => ({
      cancelacion: {
        Justificacion: "",
        AcreditacionDeLaCancelacion: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
        },

        BajaDeCreditoFederal: {
          archivo: new File([], ""),
          nombreArchivo: "",
          fechaArchivo: new Date().toString(),
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
      .then(({ data }) => {});
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
      .then(({ data }) => {});
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
        .then(({ data }) => {})
        .catch((e) => {});
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
      .catch((e) => {});
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
      .catch((e) => {});
  },

  saveFiles: async (idRegistro: string, ruta: string) => {
    // return await state.tablaDocumentos.map((file:any) => {
    //   return setTimeout(() => {
    //     const url = new File([file.archivo], file.nombreArchivo);
    //     let dataArray = new FormData();
    //     dataArray.append("ROUTE", `${ruta}`);
    //     dataArray.append("ADDROUTE", "true");
    //     dataArray.append("FILE", url);
    //     if (file.archivo) {
    //       return axios
    //         .post(
    //           process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
    //           dataArray,
    //           {
    //             headers: {
    //               Authorization: localStorage.getItem("jwtToken"),
    //             },
    //           }
    //         )
    //         .then(({ data }) => {
    //           state.savePathDoc(
    //             idRegistro,
    //             data.RESPONSE.RUTA,
    //             data.RESPONSE.NOMBREIDENTIFICADOR,
    //             data.RESPONSE.NOMBREARCHIVO
    //           );
    //         })
    //         .catch((e) => {});
    //     } else {
    //       return null;
    //     }
    //   }, 1000);
    // });
  },

  guardaDocumentos: async (idRegistro: string, ruta: string, archivo: File) => {
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", archivo);

    if (archivo.size > 0) {
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
          //   state.savePathDoc(
          //     idRegistro,
          //     data.RESPONSE.RUTA,
          //     data.RESPONSE.NOMBREIDENTIFICADOR,
          //     data.RESPONSE.NOMBREARCHIVO
          //   );
        })
        .catch((e) => {});
    } else {
      return null;
    }
  },

  savePathDoc: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocSol",
        {
          IdSolicitud: idSolicitud,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {})
      .catch((e) => {});
  },
});

export async function CancelacionSolicitud(setUrl: Function) {
  const state = useCancelacionStore.getState();
  let infoSolicitud: any = JSON.parse(state.solicitud.Solicitud);

  console.log(infoSolicitud);
  console.log(state.solicitud);
  console.log(state.cancelacion);

  //   await axios
  //     .post(
  //       process.env.REACT_APP_APPLICATION_BACK +
  //         "/create-pdf-solicitud-cancelacion",
  //       {
  //         numeroSolicitud: solicitud,
  //         UsuarioDestinatario: "SolicitudCancelacion.UsuarioDestinatario",
  //         EntidadDestinatario: "SolicitudCancelacion.EntidadDestinatario",
  //         UsuarioRemitente: "SolicitudCancelacion.UsuarioRemitente",
  //         EntidadRemitente: "SolicitudCancelacion.EntidadRemitente",
  //         claveInscripcion: "SolicitudCancelacion.claveInscripcion",

  //         //   fechaInscripcion: format(
  //         //     new Date(SolicitudCancelacion.fechaInscripcion),
  //         //     "PPP",
  //         //     {
  //         //       locale: es,
  //         //     }
  //         //   ),

  //         //   fechaLiquidacion: format(
  //         //     new Date(SolicitudCancelacion.fechaLiquidacion),
  //         //     "PPP",
  //         //     {
  //         //       locale: es,
  //         //     }
  //         //   ),
  //         //   fechaContratacion: format(
  //         //     new Date(SolicitudCancelacion.fechaContratacion),
  //         //     "PPP",
  //         //     {
  //         //       locale: es,
  //         //     }
  //         //   ),
  //         //   entePublicoObligado: SolicitudCancelacion.entePublicoObligado,
  //         //   institucionFinanciera: SolicitudCancelacion.institucionFinanciera,
  //         //   montoOriginalContratado: SolicitudCancelacion.montoOriginalContratado,
  //         //   causaCancelacion: SolicitudCancelacion.causaCancelacion,
  //         //   documentoAcreditacionCancelacion:
  //         //     SolicitudCancelacion.documentoAcreditacionCancelacion,
  //         //   documentoBajaCreditoFederal:
  //         //     SolicitudCancelacion.documentoBajaCreditoFederal,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken"),
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //         responseType: "arraybuffer",
  //       }
  //     )
  //     .then((response) => {
  //       const a = window.URL || window.webkitURL;
  //       const url = a.createObjectURL(
  //         new Blob([response.data], { type: "application/pdf" })
  //       );

  //       setUrl(url);
  //     })
  //     .catch((err) => {});
}
