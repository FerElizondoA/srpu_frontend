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
      obligadoSolidarioAvalTable: state.obligadoSolidarioAvalTable,
      /* ---- INFORMACIÓN GENERAL ---- */

      /* ---- CONDICIONES FINANCIERAS ---- */
      /* ---- CONDICIONES FINANCIERAS ---- */

      /* ---- SOLICITUD DE INSCRIPCION ---- */
      reglas: reglas,

      nombreServidorPublico: state.nombreServidorPublico,
    };


    if (solicitud.IdSolicitud.length === 0) {
      
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/create-solicitud",
          {
            TipoSolicitud: solicitud.tipoDocumento,
            CreadoPor: localStorage.getItem("IdUsuario"),
            IdInstitucionFinanciera: solicitud.IdInstitucion,
            IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
            IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
            IdTipoEntePublico: solicitud.IdTipoEntePublico,
            IdEntePublico: solicitud.IdOrganismo,
            Solicitud: JSON.stringify(solicitud),
            MontoOriginalContratado: solicitud.montoOriginal,
            FechaContratacion: format(
              new Date(solicitud.fechaContratacion),
              "yyyy-MM-dd"
            ),
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
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdSolicitud: solicitud.IdSolicitud,
            TipoSolicitud: solicitud.tipoDocumento,
            CreadoPor: localStorage.getItem("IdUsuario"),
            IdInstitucionFinanciera: solicitud.IdInstitucion,
            IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
            IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
            IdTipoEntePublico: solicitud.IdTipoEntePublico,
            IdEntePublico: solicitud.IdOrganismo,
            Solicitud: JSON.stringify(solicitud),
            MontoOriginalContratado: solicitud.montoOriginal,
            FechaContratacion: format(
              new Date(solicitud.fechaContratacion),
              "yyyy-MM-dd"
            ),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((response) => {
          console.log("hola");

          if (get().comentarios === null || get().comentarios === "") {
          } else {
            get().fetchComentario(response.data.Id, get().comentarios);
            console.log("i am a commentary ", get().comentarios);
          }
        })
        .catch((e) => {
        });
    }
  },

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
    console.log(comentario);
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
        console.log("Stack trace {", e, "}");
      });
  },
});

export function DescargarConsultaSolicitud(Solicitud: string) {
  let solicitud: ISolicitud = JSON.parse(Solicitud);
  console.log(Solicitud);
  console.log(solicitud);
  

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
      process.env.REACT_APP_APPLICATION_MID + "/documento_srpu",

      {
        nombre: solicitud.solicitanteAutorizado,
        cargoSolicitante: solicitud.cargoSolicitante,
        oficionum: "10",
        cargo: solicitud.cargoSolicitante,
        organismo: solicitud.organismo,
        InstitucionBancaria: solicitud.institucion,
        monto: solicitud.montoOriginal,
        destino: solicitud.destino,
        dias: solicitud.dias,
        tipoEntePublicoObligado: solicitud.tipoEntePublico,
        entePublicoObligado: solicitud.tipoEntePublicoObligado,
        tasaefectiva: solicitud.tasaefectiva,
        tasaInteres: solicitud.tasaInteres,
        reglas: solicitud.reglas,
        tipocomisiones: solicitud.tipoComision,
        servidorpublico: solicitud.nombreServidorPublico,
        contrato: solicitud.tipoDocumento,
        periodoPago: solicitud.periodoPago,
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
    });
}
