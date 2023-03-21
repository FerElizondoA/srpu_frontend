import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";

export interface SolicitudInscripcionSlice {
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
  fetchDocumento: () => void;
}

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  nombreServidorPublico: "",
  cargo: "",
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

  fetchDocumento: () => {
    // if (!get()) {

    const organismo = useCortoPlazoStore.getState().organismo;
    const contrato = useCortoPlazoStore.getState().tipoDocumento;
    const banco = useCortoPlazoStore.getState().institucion;
    const monto = useCortoPlazoStore.getState().montoOriginal;
    const fecha = useCortoPlazoStore.getState().fechaContratacion;
    const fechav = useCortoPlazoStore.getState().fechaVencimiento;
    const destino = useCortoPlazoStore.getState().destino;
    const plazoDias = useCortoPlazoStore.getState().plazoDias;
    const tipoEntePublicoObligado = useCortoPlazoStore.getState().tipoEntePublicoObligado
    const entePublicoObligado = useCortoPlazoStore.getState().entePublicoObligado
    


    axios
      .post(
        "http://192.168.137.152:7000/documento_srpu",
        {
          nombre: "Marlon Israel Mendez Maldonado",
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
          tasadeinteres: "20%"

        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
          responseType : 'arraybuffer'
        }
      )
      .then((r) => {
        //const href = URL.createObjectURL(r.data);
        const a = window.URL || window.webkitURL;

        const url = a.createObjectURL(
          new Blob([r.data], { type: "application/pdf" })
        );

        let link = document.createElement("a");

        link.setAttribute("download", `contrato.pdf`);
        link.setAttribute("href", url);
        document.body.appendChild(link);
        link.click();


       
      });
  },
});
