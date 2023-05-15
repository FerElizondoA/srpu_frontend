import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";
import { format } from "date-fns";
import { ISolicitud } from "../components/Interfaces/InterfacesCplazo/CortoPlazo/ISolicitud";
import Swal from "sweetalert2";
import { ICatalogo } from "../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { createNotification } from "../components/LateralMenu/APINotificaciones";

export interface SolicitudInscripcionSlice {
  idSolicitud: string;
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
    estatus: string
  ) => void;

  borrarSolicitud: (Id: string) => void;

  addComentario: (idSolicitud: string, comentario: string) => void;
}

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  idSolicitud: "",
  editCreadoPor: "",
  inscripcion: {
    servidorPublicoDirigido: "Rosalba Aguilar Díaz",
    cargo: "Directora de Deuda Pública",
  },

  reglasAplicables: [],

  catalogoReglas: [],

  changeInscripcion: (inscripcion: any) =>
    set(() => ({ inscripcion: inscripcion })),

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),

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
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-solicitud",
        {
          IdTipoEntePublico:
            state.encabezado.tipoEntePublico.Id ||
            "00b0470d-acb9-11ed-b719-2c4138b7dab1",
          IdEntePublico:
            state.encabezado.organismo.Id ||
            "f45b91b9-bc38-11ed-b789-2c4138b7dab1",
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
        state.addComentario(data.data.Id, comentario);
        Swal.fire({
          icon: "success",
          title: "Mensaje",
          text: "La solicitud se envió con éxito",
        });
        createNotification(
          "Crédito simple corto plazo",
          "Se te ha asignado una solicitud para modificación.",
          [data.data.Id]
        );
      });
  },
  modificaSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string
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

    await axios.put(
      process.env.REACT_APP_APPLICATION_BACK + "/api/modify-solicitud",
      {
        IdSolicitud: state.idSolicitud,
        IdTipoEntePublico:
          state.encabezado.tipoEntePublico.Id ||
          "00b0470d-acb9-11ed-b719-2c4138b7dab1",
        IdEntePublico:
          state.encabezado.organismo.Id ||
          "f45b91b9-bc38-11ed-b789-2c4138b7dab1",
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
    );
  },
  borrarSolicitud: (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    axios
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
  addComentario: (Id: string, comentario: string) => {
    axios
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
      .then(({ data }) => {})
      .catch((e) => {});
  },
});

export function DescargarConsultaSolicitud(Solicitud: string) {
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
        cargoServidorPublicoSolicitante: solicitud.cargoSolicitante,
        oficionum: "10",
        cargoServidorPublico: solicitud.cargoSolicitante,
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
    })
    .catch((err) => {});
}

export const getUsuariosAsignables = (setState: Function, numero: number) => {
  axios
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
