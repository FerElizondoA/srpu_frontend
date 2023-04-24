import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";
import { format } from "date-fns";
import { ISolicitud } from "../components/Interfaces/InterfacesCplazo/CortoPlazo/ISolicitud";
import Swal from "sweetalert2";

export interface SolicitudInscripcionSlice {
  fetchedReglas: boolean;
  reglasCatalog: string[];
  nombreServidorPublico: string;
  cargo: string;
  documentoAutorizado: string;
  identificacion: string;
  reglas: string[];
  comentarios: string;
  changeServidorPublico: (newServidorPublico: string) => void;
  changeCargo: (newCargo: string) => void;
  changeDocumentoAutorizado: (newDocumentoAutorizado: string) => void;
  changeIdentificacion: (newIdentificacion: string) => void;
  changeReglas: (newReglas: string) => void;
  changeComentarios: (newComentarios: string) => void;

  fetchReglas: () => void;
  crearSolicitud: (reglasSeleccionadas: number[]) => void;
  fetchBorrarSolicitud: (Id: string) => boolean;
  fetchComentario: (Id: string, comentario: string) => void;
}

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  fetchedReglas: false,
  reglasCatalog: [],
  nombreServidorPublico: "Rosalba Aguilar Díaz",
  cargo: "Directora de Deuda Pública",
  documentoAutorizado: "",
  comentarios: "",
  identificacion: "",
  reglas: [],
  changeServidorPublico: (newServidorPublico: string) =>
    set(() => ({ nombreServidorPublico: newServidorPublico })),
  changeCargo: (newCargo: string) => set(() => ({ cargo: newCargo })),
  changeDocumentoAutorizado: (newDocumentoAutorizado: string) =>
    set(() => ({ documentoAutorizado: newDocumentoAutorizado })),
  changeIdentificacion: (newIdetificacion: string) =>
    set(() => ({ identificacion: newIdetificacion })),
  changeReglas: (newReglas: string) =>
    set((state) => ({ reglas: [...state.reglas, newReglas] })),
  changeComentarios: (newComentarios: string) =>
    set((state) => ({ comentarios: newComentarios })),

  //////////////////////////////

  /////////////////////////////

  fetchReglas: async () => {
    if (!get().fetchedReglas) {
      const response = await axios.get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-reglaDeFinanciamiento",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      response.data.data.forEach((e: any) => {
        
        set((state) => ({
          reglasCatalog: [...state.reglasCatalog, e.Descripcion],
        }));
      });
      set(() => ({ fetchedReglas: true }));
    }
  },

  crearSolicitud: async (reglasSeleccionadas: number[]) => {
    let reglas: string[] = [];
    reglasSeleccionadas.forEach((it) => {
      reglas = [...reglas, useCortoPlazoStore.getState().reglasCatalog[it]];
    });

    const state = useCortoPlazoStore.getState();

    const solicitud: any = {
      /* ---- ENCABEZADO ---- */
      IdSolicitud: state.IdSolicitud,
      tipoDocumento: state.tipoDocumento,
      IdTipoEntePublico: state.IdTipoEntePublico,
      tipoEntePublico: state.tipoEntePublico,
      solicitanteAutorizado: state.solicitanteAutorizado,
      IdOrganismo: state.IdOrganismo,
      organismo: state.organismo,
      fechaContratacion: state.fechaContratacion,
      cargoSolicitante: state.cargoSolicitante,

      /* ---- ENCABEZADO ---- */

      /* ---- INFORMACIÓN GENERAL ---- */
      // plazo dias se calcula automaticamente
      montoOriginal: state.montoOriginal,
      fechaVencimiento: state.fechaVencimiento,
      IdDestino: state.IdDestino,
      destino: state.destino,
      denominacion: state.denominacion,
      IdInstitucion: state.IdInstitucion,
      institucion: state.institucion,
      plazoDias: state.plazoDias,
      obligadoSolidarioAval: state.obligadoSolidarioAval,
      tasaReferencia: state.tasaReferencia,

      obligadoSolidarioAvalTable: state.obligadoSolidarioAvalTable,

      /* ---- INFORMACIÓN GENERAL ---- */

      /* ---- CONDICIONES FINANCIERAS ---- */
      condicionFinancieraTable: state.condicionFinancieraTable,
      tipoComision: state.tipoComision,
      tasaEfectiva: state.tasaEfectiva,
      capitalPeriocidadPago: state.capitalPeriocidadPago,
      /* ---- CONDICIONES FINANCIERAS ---- */
     
      
      /* ---- SOLICITUD DE INSCRIPCION ---- */
      reglas: reglas,
      nombreServidorPublico: state.nombreServidorPublico,

     
    };

    console.log("Crear solicitud info: ", solicitud);
    

    if (solicitud.IdSolicitud.length === 0) {
      
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/create-solicitud",
          {
            IdEntePublico: solicitud.IdOrganismo,
            IdTipoEntePublico: solicitud.IdTipoEntePublico,
            TipoSolicitud: solicitud.tipoDocumento,
            IdInstitucionFinanciera: solicitud.IdInstitucion,
            IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
            IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
            MontoOriginalContratado: solicitud.montoOriginal,
            FechaContratacion: format(
              new Date(solicitud.fechaContratacion),
              "yyyy-MM-dd"
            ),
            Solicitud: JSON.stringify(solicitud),
            CreadoPor: localStorage.getItem("IdUsuario"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((response) => {
          if (get().comentarios === null || get().comentarios === "") {
          } else {
            get().fetchComentario(response.data.Id, get().comentarios);
          }
        })
        .catch((e) => {
        });
    } else {
      await axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK + "/api/modify-solicitud",
          {
            IdSolicitud: solicitud.IdSolicitud,
            IdEntePublico: solicitud.IdOrganismo,
            IdTipoEntePublico: solicitud.IdTipoEntePublico,
            TipoSolicitud: solicitud.tipoDocumento,
            IdInstitucionFinanciera: solicitud.IdInstitucion,
            IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
            IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
            MontoOriginalContratado: solicitud.montoOriginal,
            FechaContratacion: format(
              new Date(solicitud.fechaContratacion),
              "yyyy-MM-dd"
            ),
            IdUsuario: localStorage.getItem("IdUsuario"),
            Solicitud: JSON.stringify(solicitud),
            CreadoPor: localStorage.getItem("IdUsuario"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((response) => {

          if (get().comentarios === null || get().comentarios === "") {
          } else {
            get().fetchComentario(response.data.Id, get().comentarios);
          }
        })
        .catch((e) => {
        });
    }
  },
//////////////////////////////////////////////////////////////////////
  fetchBorrarSolicitud: (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    const response = axios
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

  fetchComentario: (Id: string, comentario: string) => {
    const response = axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-comentario",
        {
          IdSolicitud: Id,
          Comentario: comentario,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {})
      .catch((e) => {
      });
  },





  
});

export function DescargarConsultaSolicitud(Solicitud: string) {
  console.log("Info de solicitud: ", Solicitud);
  
  let solicitud: ISolicitud = JSON.parse(Solicitud);

  const solicitudfechas: any = {
    fechaContratacion: format(
      new Date(solicitud.fechaContratacion),
      "yyyy-MM-dd"
    ),
    fechaVencimiento: format(
      new Date(solicitud.fechaVencimiento),
      "yyyy-MM-dd"
    ),
  };
  axios
    .post(
     " http://10.200.4.94:9091/documento_srpu",

      {
        nombre: solicitud.solicitanteAutorizado,
        cargoSolicitante: solicitud.cargoSolicitante,
        oficionum: "10",
        cargo: solicitud.cargoSolicitante,
        organismo: solicitud.organismo,
        InstitucionBancaria: solicitud.institucion,
        monto: solicitud.montoOriginal,
        destino: solicitud.destino,
        dias: solicitud.plazoDias,
        tipoEntePublicoObligado: solicitud.tipoEntePublico,
        entePublicoObligado: solicitud.tipoEntePublicoObligado,
        tasaefectiva: solicitud.tasaEfectiva,
        tasaInteres: solicitud.tasaReferencia,
        reglas: solicitud.reglas,
        tipocomisiones: solicitud.tipoComision,
        servidorpublico: solicitud.nombreServidorPublico,
        contrato: solicitud.tipoDocumento,
        periodoPago: solicitud.capitalPeriocidadPago,
        obligadoSolidarioAval: solicitud.obligadoSolidarioAval,
        
        fechaContrato: solicitudfechas.fechaContratacion,
        fechaVencimiento: solicitudfechas.fechaVencimiento,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute("download", `contrato.pdf`);
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
    }).catch((err)=>{
      
    });
}
