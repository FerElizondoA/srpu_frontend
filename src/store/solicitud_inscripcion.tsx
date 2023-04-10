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
  fetchDocumento: (reglasSeleccionadas: number[]) => void;
  fetchReglas: () => void;
  fetchBorrador: (reglasSeleccionadas: number[]) => void;
  fetchBorrarSolicitud: (Id: string) => boolean;
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

  fetchDocumento: async (reglasSeleccionadas: number[]) => {
    let reglas: string[] = [];
    reglasSeleccionadas.forEach((it) => {
      reglas = [...reglas, useCortoPlazoStore.getState().reglasCatalog[it]];
    });

    const organismo = useCortoPlazoStore.getState().organismo;
    const contrato = useCortoPlazoStore.getState().tipoDocumento;
    const banco = useCortoPlazoStore.getState().institucion;
    const monto = useCortoPlazoStore.getState().montoOriginal;
    const fecha = useCortoPlazoStore.getState().fechaContratacion;
    const fechav = useCortoPlazoStore.getState().fechaVencimiento;
    const destino = useCortoPlazoStore.getState().destino;
    const plazoDias = useCortoPlazoStore.getState().plazoDias;
    const tipoEntePublicoObligado =
      useCortoPlazoStore.getState().tipoEntePublico;
    const entePublicoObligado =
      useCortoPlazoStore.getState().entePublicoObligado;
    const tasaefectiva = useCortoPlazoStore.getState().tasaEfectiva;
    const tipocomisiones = useCortoPlazoStore.getState().tipoComision;
    const servidorpublico = useCortoPlazoStore.getState().nombreServidorPublico;
    const periodopago = useCortoPlazoStore.getState().capitalPeriocidadPago;
    const obligadoSolidario =
      useCortoPlazoStore.getState().obligadoSolidarioAval;
    const tasaInteres = useCortoPlazoStore.getState().tasaReferencia;

    const response = await axios.post(
      "http://10.200.4.46:7000/documento_srpu",

      {
        nombre: servidorpublico,
        oficionum: "10",
        cargo: get().cargo,
        organismo: organismo,
        InstitucionBancaria: banco,
        monto: monto.toString(),
        destino: destino,
        dias: plazoDias,
        tipoEntePublicoObligado: tipoEntePublicoObligado,
        entePublicoObligado: entePublicoObligado,
        tasaefectiva: tasaefectiva,
        tasaInteres: tasaInteres,
        reglas: reglas,
        tipocomisiones: tipocomisiones,
        servidorpublico: servidorpublico,
        contrato: contrato,
        periodopago: periodopago,
        obligadoSolidarioAvalTable: obligadoSolidario,

        fechaContrato: format(new Date(fecha), "yyyy-MM-dd"),
        fechaVencimiento: format(new Date(fechav), "yyyy-MM-dd"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
        responseType: "arraybuffer",
      }
    );
    const a = window.URL || window.webkitURL;

    const url = a.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    let link = document.createElement("a");

    link.setAttribute("download", `contrato.pdf`);
    link.setAttribute("href", url);
    document.body.appendChild(link);
    link.click();
  },

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

  fetchBorrador: async (reglasSeleccionadas: number[]) => {
    let reglas: string[] = [];
    reglasSeleccionadas.forEach((it) => {
      reglas = [...reglas, useCortoPlazoStore.getState().reglasCatalog[it]];
    });
    console.log(reglas);

    const state = useCortoPlazoStore.getState();

    const solicitud: any = {
      IdSolicitud: state.IdSolicitud,
      IdInstitucion: state.IdInstitucion,
      IdTipoEntePublico: state.IdTipoEntePublico,
      IdOrganismo: state.IdOrganismo,
      IdDestino: state.IdDestino,
      capitalFechaPrimerPago: format(
        new Date(state.capitalFechaPrimerPago),
        "yyyy-MM-dd"
      ),
      capitalNumeroPago: state.capitalNumeroPago,
      capitalPeriocidadPago: state.capitalPeriocidadPago,
      cargo: state.cargo,
      cargoSolicitante: state.cargoSolicitante,
      denominacion: state.denominacion,
      destino: state.destino,
      disposicionFechaContratacion: format(
        new Date(state.disposicionFechaContratacion),
        "yyyy-MM-dd"
      ),
      disposicionImporte: state.disposicionImporte,
      documentoAutorizado: state.documentoAutorizado,
      //efectivaDiasEjercicio: state.efectivaDiasEjercicio,
      //efectivaFechaContratacion: format(new Date(state.efectivaFechaContratacion), "yyyy-MM-dd"),
      //efectivaMontoFijo: state.efectivaMontoFijo,
      //efectivaPeriocidadPago: state.efectivaPeriocidadPago,
      //efectivaPorcentajeFijo: state.efectivaPorcentajeFijo,
      //entePublicoObligado: state.entePublicoObligado,
      fechaContratacion: format(
        new Date(state.fechaContratacion),
        "yyyy-MM-dd"
      ),
      fechaVencimiento: format(new Date(state.fechaVencimiento), "yyyy-MM-dd"),
      //hasIVA: state.hasIVA,
      //hasMonto: state.hasMonto,
      //hasPorcentaje: state.hasPorcentaje,
      identificacion: state.identificacion,
      institucion: state.institucion,
      montoOriginal: state.montoOriginal,
      nombreServidorPublico: state.nombreServidorPublico,
      organismo: state.organismo,
      plazoDias: state.plazoDias,
      //sobreTasa: state.sobreTasa,
      solicitanteAutorizado: state.solicitanteAutorizado,
      //tasaDiasEjercicio: state.tasaDiasEjercicio,
      //tasaEfectiva: state.tasaEfectiva,
      //tasaFechaPrimerPago: format(new Date(state.tasaFechaPrimerPago), "yyyy-MM-dd"),
      //tasaPeriocidadPago: state.tasaPeriocidadPago,
      //tasaReferencia: state.tasaReferencia,
      //tipoComision: state.tipoComision,
      tipoDocumento: state.tipoDocumento,
      tipoEntePublico: state.tipoEntePublico,
      tipoEntePublicoObligado: state.tipoEntePublicoObligado,
      obligadoSolidarioAvalTable: JSON.stringify(
        state.obligadoSolidarioAvalTable
      ),
      condicionFinancieraTable: JSON.stringify(state.condicionFinancieraTable),
      reglas: state.reglas,
      tasaEfectivaTable: JSON.stringify(state.tasaEfectivaTable),
      tasaInteresTable: JSON.stringify(state.tasaInteresTable),
    };

    console.log("solicitud! :", solicitud);

    if (solicitud.IdSolicitud.length === 0) {
      console.log("ente publico: ", state.IdTipoEntePublico);
      console.log("ente publico: ",state.entePublicoObligado);
      
      
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK+ "/api/create-solicitud",
          {
            TipoSolicitud: state.tipoDocumento,
            CreadoPor: localStorage.getItem("IdUsuario"),
            IdInstitucionFinanciera: solicitud.IdInstitucion,
            IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
            IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
            IdTipoEntePublico: solicitud.IdTipoEntePublico,
            IdEntePublico: solicitud.IdOrganismo,
            Solicitud: JSON.stringify(solicitud),
            MontoOriginalContratado: solicitud.montoOriginal,
            FechaContratacion: format(
              new Date(state.fechaContratacion),
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
          console.log("RESPONSE: ", response);
        })
        .catch((e) => {
          console.log("Stack trace {", e, "}");
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
    console.log("soy el id: ", Id);

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
        console.log("hola no se si funcione");
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        console.log("Stack Trace: ", error);
        Toast.fire({
          icon: "error",
          title: "No se elimino la solicitud.",
        });
      });
    return false;
  },
});

export function DescargarConsultaSolicitud(Solicitud: string) {
  //let stringi =JSON.stringify(Solicitud)
  let solicitud: ISolicitud = JSON.parse(Solicitud);
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
      "http://10.200.4.46:7000/documento_srpu",

      {
        nombre: solicitud.nombreServidorPublico,
        oficionum: "10",
        cargo: solicitud.cargo,
        organismo: solicitud.organismo,
        InstitucionBancaria: solicitud.institucion,
        monto: solicitud.montoOriginal,
        destino: solicitud.destino,
        dias: solicitud.plazoDias,
        tipoEntePublicoObligado: solicitud.tipoEntePublicoObligado,
        entePublicoObligado: solicitud.entePublicoObligado,
        tasaefectiva: solicitud.tasaEfectiva,
        tasaInteres: solicitud.tasaReferencia,
        reglas: solicitud.reglas,
        tipocomisiones: solicitud.tipoComision,
        servidorpublico: solicitud.nombreServidorPublico,
        contrato: solicitud.tipoDocumento,
        periodopago: solicitud.capitalPeriocidadPago,
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
