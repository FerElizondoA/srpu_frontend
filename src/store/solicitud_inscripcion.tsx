import { StateCreator } from "zustand";
import axios from "axios";
import { useCortoPlazoStore } from "./main";

export interface SolicitudInscripcionSlice{
    fetchedReglas: boolean;
    reglasCatalog: string[],
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
    fetchDocumento:(reglasSeleccionadas: number[]) => void;
    fetchReglas: () => void;
}

export const createSolicitudInscripcionSlice: StateCreator<SolicitudInscripcionSlice> = (set, get) => ({
    fetchedReglas: false,
    reglasCatalog: [],
    nombreServidorPublico: "",
    cargo: "",
    documentoAutorizado: "",
    identificacion: "",
    reglas: [],
    changeServidorPublico: (newServidorPublico: string) => set(() => ({nombreServidorPublico: newServidorPublico})),
    changeCargo: (newCargo: string) => set(() =>({cargo: newCargo})),
    changeDocumentoAutorizado: (newDocumentoAutorizado: string) => set(()=> ({documentoAutorizado: newDocumentoAutorizado})),
    changeIdentificacion: (newIdetificacion: string) => set(()=> ({identificacion: newIdetificacion})),
    changeReglas: (newReglas: string) => set((state)=> ({reglas: [...state.reglas, newReglas]})),
    
    fetchDocumento: async (reglasSeleccionadas: number[])=> {
        let data = new FormData();


        // if (!get()) {
            console.log("fetchDocumento executed!");
            data.append("nombre", get().nombreServidorPublico);
            data.append("cargo",  get().cargo);
            const organismo = useCortoPlazoStore.getState().organismo;
            const contrato = useCortoPlazoStore.getState().tipoDocumento
            const banco = useCortoPlazoStore.getState().institucion;
            const monto = useCortoPlazoStore.getState().montoOriginal; 
            const fecha = useCortoPlazoStore.getState().fechaContratacion; 
            const fechav = useCortoPlazoStore.getState().fechaVencimiento;
            data.append("nombre", get().nombreServidorPublico);
            data.append("organismo", organismo);
            data.append("contrato",  contrato);
            data.append("banco",  banco);
            data.append("monto",  monto.toString());
            data.append("fecha",  fecha);
            data.append("fechav",  fechav);


            const response = await axios.post(
              "http://192.168.137.152:90/documento?",
              {
                body:{
                    data
                },
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
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
          console.log("fetchReglas executed!");
          const response = await axios.get(
            "http://10.200.4.199:8000/api/get-reglaDeFinanciamiento",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          console.log(response)
          response.data.data.forEach((e: any) => {
            set((state) => ({
              reglasCatalog: [...state.reglasCatalog, e.Descripcion],
            }));
          });
          set(() => ({fetchedReglas: true}))
        }
    }


})