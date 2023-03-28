import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";

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

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  fetchedReglas: false,
  reglasCatalog: [],
  nombreServidorPublico: "Rosalba Aguilar Díaz",
  cargo: "Directora de Deuda Pública",
  documentoAutorizado: "",
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

  fetchDocumento: async (reglasSeleccionadas: number[]) => {
    let data = new FormData();
    let reglas: string[] = [];
    reglasSeleccionadas.forEach((it) => {
      reglas = [...reglas, useCortoPlazoStore.getState().reglasCatalog[it]];
    });
    // if (!get()) {
    //console.log("fetchDocumento executed!");

    ////////////////////////////////////////
    const organismo = useCortoPlazoStore.getState().organismo;
    const contrato = useCortoPlazoStore.getState().tipoDocumento;
    const banco = useCortoPlazoStore.getState().institucion;
    const monto = useCortoPlazoStore.getState().montoOriginal;
    const fecha = useCortoPlazoStore.getState().fechaContratacion;
    const fechav = useCortoPlazoStore.getState().fechaVencimiento;
    const destino = useCortoPlazoStore.getState().destino;
    const plazoDias = useCortoPlazoStore.getState().plazoDias;
    const tipoEntePublicoObligado =
      useCortoPlazoStore.getState().tipoEntePublicoObligado;
    const entePublicoObligado =
      useCortoPlazoStore.getState().entePublicoObligado;
    const tasaefectiva = useCortoPlazoStore.getState().tasaEfectiva;
    const tipocomisiones = useCortoPlazoStore.getState().tipoComision;
    const servidorpublico = useCortoPlazoStore.getState().nombreServidorPublico;
    const periodopago = useCortoPlazoStore.getState().capitalPeriocidadPago;
    const obligadoSolidario =
      useCortoPlazoStore.getState().obligadoSolidarioAval;
    const IdBanco = useCortoPlazoStore.getState().obligadoSolidarioAvalCatalog;
    const cargo = useCortoPlazoStore.getState().cargo;

    const response = await axios.post(
      "http://192.168.137.152:7000/documento_srpu",

      {
        nombre: servidorpublico,
        oficionum: "10",
        cargo: get().cargo,
        organismo: organismo,
        InstitucionBancaria: banco,
        monto: monto.toString(),
        fechacontrato: fecha,
        destino: destino,
        dias: plazoDias,
        fechavencimiento: fechav,
        tipoEntePublicoObligado: tipoEntePublicoObligado,
        entePublicoObligado: entePublicoObligado,
        tasaefectiva: tasaefectiva,
        reglas: reglas,
        tipocomisiones: tipocomisiones,
        servidorpublico: servidorpublico,
        contrato: contrato,
        periodopago: periodopago,
        obligadoSolidario: obligadoSolidario,
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

    // response.data.data.forEach((e: any) => {
    //   set((state) => ({

    //   }));
    // });
    //   }
    //   set(() => ({}))
  },
  fetchReglas: async () => {
    if (!get().fetchedReglas) {
      //console.log("fetchReglas executed!");
      const response = await axios.get(
        "http://10.200.4.199:8000/api/get-reglaDeFinanciamiento",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      //console.log(response);
      response.data.data.forEach((e: any) => {
        set((state) => ({
          reglasCatalog: [...state.reglasCatalog, e.Descripcion],
        }));
      });
      set(() => ({ fetchedReglas: true }));
    }
  },

  fetchBorrador: async (reglasSeleccionadas: number[]) => {
    ////////////////////////////////////////
    const organismo = useCortoPlazoStore.getState().organismo;
    const contrato = useCortoPlazoStore.getState().tipoDocumento;
    const banco = useCortoPlazoStore.getState().institucion;
    const monto = useCortoPlazoStore.getState().montoOriginal;
    const fecha = useCortoPlazoStore.getState().fechaContratacion;
    const fechav = useCortoPlazoStore.getState().fechaVencimiento;
    const destino = useCortoPlazoStore.getState().destino;
    const plazoDias = useCortoPlazoStore.getState().plazoDias;
    const tipoEntePublicoObligado =
      useCortoPlazoStore.getState().tipoEntePublicoObligado;
    const entePublicoObligado =
      useCortoPlazoStore.getState().entePublicoObligado;
    const tasaefectiva = useCortoPlazoStore.getState().tasaEfectiva;
    //const reglas = useCortoPlazoStore.getState().reglas
    const tipocomisiones = useCortoPlazoStore.getState().tipoComision;
    const servidorpublico = useCortoPlazoStore.getState().nombreServidorPublico;
    const periodopago = useCortoPlazoStore.getState().capitalPeriocidadPago;
    const obligadoSolidario =
      useCortoPlazoStore.getState().obligadoSolidarioAval;
    const nombre = useCortoPlazoStore.getState().nombreServidorPublico;
    const date = new Date();
    let data = new FormData();
    let reglas: string[] = [];
    reglasSeleccionadas.forEach((it) => {
      reglas = [...reglas, useCortoPlazoStore.getState().reglasCatalog[it]];
    });

    const obj = {
      nombre: nombre,
      oficionum: "10",
      cargo: get().cargo,
      organismo: organismo,
      InstitucionBancaria: banco,
      monto: monto.toString(),
      fechacontrato: fecha,
      destino: destino,
      dias: plazoDias,
      fechavencimiento: fechav,
      tipoEntePublicoObligado: tipoEntePublicoObligado,
      entePublicoObligado: entePublicoObligado,
      tasaefectiva: tasaefectiva,
      reglas: reglas,
      tipocomisiones: tipocomisiones,
      servidorpublico: servidorpublico,
      contrato: contrato,
      periodopago: periodopago,
      obligadoSolidario: obligadoSolidario,
    };

    let solicitud = JSON.stringify({ solicitud: obj });
  console.log(solicitud);
  
    const response = await axios
      .post(
        "http://10.200.4.200:8000/api/create-solicitud",

        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdInstitucionFinanciera: "ac903b28-acb7-11ed-b719-2c4138b7dab1",
          IdEstatus: "6a9232f5-acb8-11ed-b719-2c4138b7dab1",
          IdClaveInscripcion: "31990bff-acb9-11ed-b719-2c4138b7dab1",
          IdTipoEntePublico: "c277a6d3-bc39-11ed-b789-2c4138b7dab1",
          Solicitud: solicitud,
          MontoOriginalContratado: monto,
          FechaContratacion: "27-03-10",
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
});
