import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";
import Swal from "sweetalert2";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export interface SolicitudInscripcionSlice {
  idSolicitud: string;
  NumeroRegistro: string;
  editCreadoPor: string;

  inscripcion: {
    servidorPublicoDirigido: string;
    cargo: string;
  };

  reglasAplicables: string[];

  catalogoReglas: ICatalogo[];

  changeInscripcion: (servidorPublicoDirigido: string, cargo: string) => void;
  changeReglasAplicables: (newReglas: string) => void;

  changeIdSolicitud: (id: string) => void;

  changeNoRegistro: (id: string) => void;
  changeEditCreadoPor: (id: string) => void;

  getReglas: () => void;

  crearSolicitud: (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  modificaSolicitud: (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  borrarSolicitud: (Id: string) => void;

  addComentario: (
    idSolicitud: string,
    comentario: string,
    tipo: string
  ) => void;
  saveFiles: (idRegistro: string, ruta: string) => void;
  savePathDoc: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;
}

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  idSolicitud: "",
  NumeroRegistro: "",
  editCreadoPor: "",
  inscripcion: {
    servidorPublicoDirigido: "Rosalba Aguilar Díaz",
    cargo: "Directora de Deuda Pública y Planeación Financiera",
  },

  reglasAplicables: [],

  catalogoReglas: [],

  changeInscripcion: (inscripcion: any) =>
    set(() => ({ inscripcion: inscripcion })),

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),

  changeNoRegistro: (num: any) => set(() => ({ NumeroRegistro: num })),

  changeEditCreadoPor: (id: any) => set(() => ({ editCreadoPor: id })),

  changeReglasAplicables: (newReglas: any) =>
    set(() => ({ reglasAplicables: newReglas })),

  getReglas: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-reglaDeFinanciamiento",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoReglas: r,
        }));
      });
  },
  crearSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const state = useCortoPlazoStore.getState();

    const solicitud: any = {
      encabezado: state.encabezado,
      informacionGeneral: {
        ...state.informacionGeneral,
        obligadosSolidarios: state.tablaObligadoSolidarioAval,
      },
      condicionesFinancieras: state.tablaCondicionesFinancieras,
      documentacion: state.tablaDocumentos.map((v, i) => {
        return {
          nombreArchivo: v.nombreArchivo,
          tipoArchivo: v.tipoArchivo,
          descripcionTipo: v.descripcionTipo,
        };
      }),
      inscripcion: {
        servidorPublicoDirigido: state.inscripcion.servidorPublicoDirigido,
        cargoServidorPublicoServidorPublicoDirigido: state.inscripcion.cargo,
        declaratorias: state.reglasAplicables,
      },
    };

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-solicitud",
        {
          IdTipoEntePublico: state.encabezado.tipoEntePublico.Id,
          IdEntePublico: state.encabezado.organismo.Id,
          TipoSolicitud: state.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            state.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: "1",
          MontoOriginalContratado: state.informacionGeneral.monto,
          FechaContratacion: state.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          CreadoPor: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdSolicitud(data.data.Id);
        state.changeNoRegistro(data.data.NumeroRegistro);
        state.changeEditCreadoPor(localStorage.getItem("IdUsuario")!);
        state.addComentario(data.data.Id, comentario, "Captura");
        state.saveFiles(
          data.data.Id,
          `/SRPU/CORTOPLAZO/DOCSOL/${data.data.Id}`
        );
      });
  },
  modificaSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const state = useCortoPlazoStore.getState();

    const solicitud: any = {
      encabezado: state.encabezado,
      informacionGeneral: {
        ...state.informacionGeneral,
        obligadosSolidarios: state.tablaObligadoSolidarioAval,
      },
      condicionesFinancieras: state.tablaCondicionesFinancieras,
      documentacion: state.tablaDocumentos.map((v, i) => {
        return {
          nombreArchivo: v.nombreArchivo,
          tipoArchivo: v.tipoArchivo,
          descripcionTipo: v.descripcionTipo,
        };
      }),
      inscripcion: {
        servidorPublicoDirigido: state.inscripcion.servidorPublicoDirigido,
        cargoServidorPublicoServidorPublicoDirigido: state.inscripcion.cargo,
        declaratorias: state.reglasAplicables,
      },
    };

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-solicitud",
        {
          IdSolicitud: state.idSolicitud,
          IdTipoEntePublico: state.encabezado.tipoEntePublico.Id,
          IdEntePublico: state.encabezado.organismo.Id,
          TipoSolicitud: state.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            state.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: "1",
          MontoOriginalContratado: state.informacionGeneral.monto,
          FechaContratacion: state.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          IdUsuario: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdSolicitud(data.data.Id);
        state.changeNoRegistro(data.data.NumeroRegistro);
        state.saveFiles(
          data.data.Id,
          `/SRPU/CORTOPLAZO/DOCSOL/${data.data.Id}`
        );
      });
  },
  borrarSolicitud: async (Id: string) => {
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
      .delete(
        process.env.REACT_APP_APPLICATION_BACK + "/api/delete-solicitud",
        {
          data: {
            IdSolicitud: Id,
            IdUsuario: localStorage.getItem("IdUsuario"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "No se elimino la solicitud.",
        });
      });
    return false;
  },
  addComentario: async (Id: string, comentario: any, tipo: string) => {
    if (comentario.length !== 2) {
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/create-comentario",
          {
            IdSolicitud: Id,
            Comentario: comentario,
            Tipo: "Captura",
            IdUsuario: localStorage.getItem("IdUsuario"),
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
  saveFiles: async (idRegistro: string, ruta: string) => {
    const state = useCortoPlazoStore.getState();

    return await state.tablaDocumentos.map((file, index) => {
      return setTimeout(() => {
        const url = new File([file.archivo], file.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);

        if (file.archivo.size > 0) {
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
              state.savePathDoc(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO
              );
            })
            .catch((e) => {});
        } else {
          return null;
        }
      }, 1000);
    });
  },
  savePathDoc: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-addPathDocSol",
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

// export async function DescargarConsultaSolicitud(Solicitud: string) {
//   const meses = [
//     "enero",
//     "febrero",
//     "marzo",
//     "abril",
//     "mayo",
//     "junio",
//     "julio",
//     "agosto",
//     "septiembre",
//     "octubre",
//     "noviembre",
//     "diciembre",
//   ];

//   let solicitud: any = JSON.parse(Solicitud);
//   interface DocumentacionItem {
//     descripcionTipo: string;
//     // Otros campos si existen en la estructura de solicitud.documentacion
//   }

//   const descripciones: string[] = solicitud.documentacion.map(
//     (item: DocumentacionItem) => item.descripcionTipo
//   );

//   const fechaVencimiento = new Date(
//     solicitud.informacionGeneral.fechaVencimiento
//   );
//   const dia = fechaVencimiento.getDate();
//   const mes = meses[fechaVencimiento.getMonth()];
//   const año = fechaVencimiento.getFullYear();

//   const fechaVencimientoEspañol = `${dia} de ${mes} de ${año}`;

//   const fechaContratacion = new Date(
//     solicitud.informacionGeneral.fechaContratacion
//   );
//   const diaC = fechaContratacion.getDate();
//   const mesC = meses[fechaContratacion.getMonth()];
//   const añoC = fechaContratacion.getFullYear();

//   const fechaContratacionEspañol = `${diaC} de ${mesC} de ${añoC}`;

//   const SolicitudDescarga: any = {
//     Nombre: solicitud.encabezado.solicitanteAutorizado.Nombre,
//     Cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
//     Organismo: solicitud.encabezado.organismo.Organismo,
//     InstitucionBancaria:
//       solicitud.informacionGeneral.institucionFinanciera.Descripcion,
//     Monto: solicitud.informacionGeneral.monto,
//     Destino: solicitud.informacionGeneral.destino.Descripcion,
//     PlazoDias: solicitud.informacionGeneral.plazo,
//     TipoEntePublico: solicitud.encabezado.tipoEntePublico.TipoEntePublico,
//     Tipocomisiones:
//       solicitud.condicionesFinancieras[0].comisiones[0]?.tipoDeComision ||
//       "No aplica",
//     TasaEfectiva: solicitud.condicionesFinancieras[0].tasaEfectiva,
//     Servidorpublico: solicitud.inscripcion.servidorPublicoDirigido,
//     TipoDocumento: solicitud.encabezado.tipoDocumento,
//     PeriodoPago:
//       solicitud.condicionesFinancieras[0].comisiones[0].periodicidadDePago,
//     //ObligadoSolidarioAval: solicitud.informacionGeneral.obligadosSolidarios[0]?.obligadoSolidario || 'No aplica',
//     Reglas: solicitud.inscripcion.declaratorias,
//     TasaInteres:
//       solicitud.condicionesFinancieras[0].tasaInteres[0].tasaReferencia,
//     Documentos: solicitud.documentacion.descripcionTipo,
//   };

//   await axios
//     .post(
//       process.env.REACT_APP_APPLICATION_MID + "/documento_srpu",
//       {
//         nombre: SolicitudDescarga.Nombre,
//         cargoServidorPublicoSolicitante: SolicitudDescarga.Cargo,
//         oficionum: "10",
//         cargoServidorPublico: solicitud.cargoSolicitante,
//         organismo: SolicitudDescarga.Organismo,
//         InstitucionBancaria: SolicitudDescarga.InstitucionBancaria,
//         monto: SolicitudDescarga.Monto,
//         destino: SolicitudDescarga.Destino,
//         dias: SolicitudDescarga.PlazoDias,
//         tipoEntePublicoObligado: SolicitudDescarga.TipoEntePublico,
//         tasaefectiva: SolicitudDescarga.TasaEfectiva,
//         tasaInteres: SolicitudDescarga.TasaInteres,
//         reglas: SolicitudDescarga.Reglas,
//         tipocomisiones: SolicitudDescarga.Tipocomisiones,
//         servidorpublico: SolicitudDescarga.Servidorpublico,
//         contrato: SolicitudDescarga.TipoDocumento,
//         periodoPago: SolicitudDescarga.PeriodoPago,
//         obligadoSolidarioAval:
//           solicitud.informacionGeneral.obligadosSolidarios[0]
//             ?.obligadoSolidario || "No aplica",
//         fechaContrato: fechaContratacionEspañol,
//         fechaVencimiento: fechaVencimientoEspañol,
//         Documentos: descripciones,
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

//       let link = document.createElement("a");

//       link.setAttribute("download", `contrato.pdf`);
//       link.setAttribute("href", url);
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch((err) => {});
// }

export const getUsuariosAsignables = async (
  setState: Function,
  numero: number
) => {
  await axios
    .get(
      process.env.REACT_APP_APPLICATION_BACK + "/api/get-usuarios-asignables",
      {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => {
      if (data.data[0].ERROR !== "Permisos Denegados") {
        setState(data.data);
      }
    })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};
