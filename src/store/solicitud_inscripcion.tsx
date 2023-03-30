import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";
import { format } from 'date-fns'

export interface SolicitudInscripcionSlice {
  fetchedReglas: boolean;
  reglasCatalog: string[];
  nombreServidorPublico: string;
  cargo: string;
  documentoAutorizado: string;
  identificacion: string;
  reglas: string[];
  changeServidorPublico: (newServidorPublico: string) => void;
  changeCargo: (newCargo: string) => void;
  changeDocumentoAutorizado: (newDocumentoAutorizado: string) => void;
  changeIdentificacion: (newIdentificacion: string) => void;
  changeReglas: (newReglas: string) => void;
  fetchDocumento: (reglasSeleccionadas: number[]) => void;
  fetchReglas: () => void;
  fetchBorrador: (reglasSeleccionadas: number[]) => void;
}

export const createSolicitudInscripcionSlice: StateCreator<SolicitudInscripcionSlice> = (set, get) => ({
  fetchedReglas: false,
  reglasCatalog: [],
  nombreServidorPublico: "Rosalba Aguilar Díaz",
  cargo: "Directora de Deuda Pública",
  documentoAutorizado: "",
  identificacion: "",
  reglas: [],
  changeServidorPublico: (newServidorPublico: string) => set(() => ({ nombreServidorPublico: newServidorPublico })),
  changeCargo: (newCargo: string) => set(() => ({ cargo: newCargo })),
  changeDocumentoAutorizado: (newDocumentoAutorizado: string) => set(() => ({ documentoAutorizado: newDocumentoAutorizado })),
  changeIdentificacion: (newIdetificacion: string) => set(() => ({ identificacion: newIdetificacion })),
  changeReglas: (newReglas: string) => set((state) => ({ reglas: [...state.reglas, newReglas] })),
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
    const tipoEntePublicoObligado = useCortoPlazoStore.getState().tipoEntePublico;
    const entePublicoObligado = useCortoPlazoStore.getState().entePublicoObligado;
    const tasaefectiva = useCortoPlazoStore.getState().tasaEfectiva;
    const tipocomisiones = useCortoPlazoStore.getState().tipoComision;
    const servidorpublico = useCortoPlazoStore.getState().nombreServidorPublico;
    const periodopago = useCortoPlazoStore.getState().capitalPeriocidadPago;
    const obligadoSolidario = useCortoPlazoStore.getState().obligadoSolidarioAval;
    const tasaInteres = useCortoPlazoStore.getState().tasaReferencia  
    
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
        obligadoSolidario: obligadoSolidario,
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
        "http://10.200.4.199:8000/api/get-reglaDeFinanciamiento",
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
    
    const state = useCortoPlazoStore.getState();

    const solicitud: any = {
      capitalFechaPrimerPago: format(new Date(state.capitalFechaPrimerPago), "yyyy-MM-dd"),
      capitalNumeroPago: state.capitalNumeroPago,
      capitalPeriocidadPago: state.capitalPeriocidadPago,
      cargo: state.cargo,
      cargoSolicitante: state.cargoSolicitante,
      denominacion: state.denominacion,
      destino: state.destino, 
      disposicionFechaContratacion: format(new Date(state.disposicionFechaContratacion), "yyyy-MM-dd"),
      disposicionImporte: state.disposicionImporte,
      documentoAutorizado: state.documentoAutorizado,
      efectivaDiasEjercicio: state.efectivaDiasEjercicio,
      efectivaFechaContratacion: format(new Date(state.efectivaFechaContratacion), "yyyy-MM-dd"),
      efectivaMontoFijo: state.efectivaMontoFijo,
      efectivaPeriocidadPago: state.efectivaPeriocidadPago,
      efectivaPorcentajeFijo: state.efectivaPorcentajeFijo,
      entePublicoObligado: state.entePublicoObligado,
      fechaContratacion: format(new Date(state.fechaContratacion), "yyyy-MM-dd"),
      fechaVencimiento: format(new Date(state.fechaVencimiento), "yyyy-MM-dd"),
      hasIVA: state.hasIVA,
      hasMonto: state.hasMonto,
      hasPorcentaje: state.hasPorcentaje,
      identificacion: state.identificacion,
      institucion: state.institucion,
      montoOriginal: state.montoOriginal,
      nombreServidorPublico: state.nombreServidorPublico,
      organismo: state.organismo,
      plazoDias: state.plazoDias,
      sobreTasa: state.sobreTasa,
      solicitanteAutorizado: state.solicitanteAutorizado,
      tasaDiasEjercicio: state.tasaDiasEjercicio,
      tasaEfectiva: state.tasaEfectiva,
      tasaFechaPrimerPago: format(new Date(state.tasaFechaPrimerPago), "yyyy-MM-dd"),
      tasaPeriocidadPago: state.tasaPeriocidadPago,
      tasaReferencia: state.tasaReferencia,
      tipoComision: state.tipoComision,
      tipoDocumento: state.tipoDocumento,
      tipoEntePublico: state.tipoEntePublico,
      tipoEntePublicoObligado: state.tipoEntePublicoObligado,
      obligadoSolidarioAvalTable: state.obligadoSolidarioAvalTable,
      condicionFinancieraTable: state.condicionFinancieraTable,
      reglas: state.reglas,
      tasaEfectivaTable: state.tasaEfectivaTable,
      tasaInteresTable: state.tasaInteresTable,
    }

    const response = await axios
      .post(
        "http://10.200.4.200:8000/api/create-solicitud",

        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdInstitucionFinanciera: "ac903b28-acb7-11ed-b719-2c4138b7dab1",
          IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
          IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
          IdTipoEntePublico: "c277a6d3-bc39-11ed-b789-2c4138b7dab1",
          Solicitud: JSON.stringify(solicitud),
          MontoOriginalContratado: solicitud.montoOriginal,
          FechaContratacion: format(new Date(state.fechaContratacion), "yyyy-MM-dd"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(function (response) {
      })
      .catch(function (error) {
      });
  },
});
