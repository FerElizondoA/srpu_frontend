import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";
import TabInformacionGeneral from "../components/reestructura/modals/TabInformacionObligaciones";
import { Encabezado } from "../components/ObligacionesCortoPlazoPage/Panels/Encabezado";
import { ComentarioApartado } from "../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentarioApartado";

export interface ComentarioApartadoSlice {

  comentarios: IComentario[];

  comentario: IComentario;

  setComentario: (nuevo: IComentario, Tab: string) => void;

  cleanComentario: (Tab: string, clean: IComentario) => void;

  newComentario: (newComentario: IComentario, Tab: string) => void;

  removeComentario: (apartado: string, Tab: string) => void;
}

export interface IComentario {

  TabEncabezado: {
    Apartado: string;
    Comentario: string;
  },

  TabInformaciónGeneral: {
    Apartado: string;
    Comentario: string;
  },

  TabCondicionesFinancieras: {
    Apartado: string;
    Comentario: string;
  },

  TabDocumentacion: {
    Apartado: string;
    Comentario: string;
  },
}

export const createComentarioSlice: StateCreator<ComentarioApartadoSlice> = (
  set,
  get
) => ({
  comentarios: [],
  comentario: {
    TabEncabezado: {
      Apartado: "",
      Comentario: ""
    },

    TabInformaciónGeneral: {
      Apartado: "",
      Comentario: ""
    },

    TabCondicionesFinancieras: {
      Apartado: "",
      Comentario: ""
    },

    TabDocumentacion: {
      Apartado: "",
      Comentario: ""
    },
  },

  // comentarios: { Tab: "", Apartado: "", Comentario: "" },

  setComentario: (nuevo: IComentario, Tab: string) => {

    switch (Tab) {
      case "Encabezado":
        set((state) => ({
          comentario: { ...state.comentario, TabEncabezado: nuevo.TabEncabezado }
        }))

        break;

      case "Información General":
        set((state) => ({
          comentario: { ...state.comentario, TabInformacionGeneral: nuevo.TabInformaciónGeneral }
        }))
        break;

      case "Condiciones Financieras":
        set((state) => ({
          comentario: { ...state.comentario, TabCondicionesFinancieras: nuevo.TabCondicionesFinancieras }
        }))
        break;

      case "Documentacion":
        set((state) => ({
          comentario: { ...state.comentario, TabInformacionGeneral: nuevo.TabInformaciónGeneral }
        }))
        break;

      default:
        break;
    }
  },

  cleanComentario: (Tab: string, clean: IComentario) => {
    const state = useCortoPlazoStore.getState();
    
    switch (Tab) {
      case "Encabezado":
      let auxE: IComentario[] = state.comentarios;
      //auxE = auxE.filter((item) => { item.TabEncabezado.Apartado  !== clean.TabEncabezado.Apartado })

        set(() => ({
          comentarios: { ...state.comentarios, TabEncabezado: auxE },
          //comentarios: { ...state.comentarios, TabEncabezado:  },

        }))
        break;

      case "Información General":
        let auxInfoGeneral: IComentario[] = state.comentarios;
      //auxE = auxInfoGeneral.filter((item) => { item.TabInformaciónGeneral.Apartado  !== clean.TabInformaciónGeneral.Apartado })

        set(() => ({
          comentarios: { ...state.comentarios, TabEncabezado: auxE },
          //comentarios: { ...state.comentarios, TabEncabezado:  },
          //comentarios: state.comentarios.filter((_, i) => _.TabEncabezado.Apartado !== state.comentario.TabEncabezado.Apartado),
        }))

        break;

      case "Condiciones Financieras":

        break;

      case "Documentacion":

        break;

      default:
        break;

    }

    set(() => ({


    }))
  },


  newComentario: (newComentario: IComentario, Tab: string,) => {
    const state = useCortoPlazoStore.getState();

    switch (Tab) {
      case "Encabezado":
        if (state.comentarios.filter((_, i) => _.TabEncabezado.Apartado === newComentario.TabEncabezado.Apartado).length > 0) {

          const index = state.comentarios.indexOf(
            state.comentarios.filter((_, i) => _.TabEncabezado.Apartado === newComentario.TabEncabezado.Apartado)[0]);

          const table = [...state.comentarios];
          table[index] = newComentario;

          set(() => ({
            comentarios: table
          }));
        }
        else {
          let aux: IComentario[] = state.comentarios;
          aux.push(newComentario)
          set((state) => ({
            comentarios: { ...state.comentarios, TabEncabezado: aux }
            //comentarios: [...state.comentarios, newComentario],
          }));
        }
        break;

      case "Información General":
        if (state.comentarios.filter((_, i) => _.TabInformaciónGeneral.Apartado === newComentario.TabInformaciónGeneral.Apartado).length > 0) {

          const index = state.comentarios.indexOf(
            state.comentarios.filter((_, i) => _.TabInformaciónGeneral.Apartado === newComentario.TabInformaciónGeneral.Apartado)[0]);

          const table = [...state.comentarios];
          table[index] = newComentario;

          set(() => ({
            comentarios: table
          }));
        }
        else {
          let aux: IComentario[] = state.comentarios;
          aux.push(newComentario)
          set((state) => ({
            comentarios: { ...state.comentarios, TabInformaciónGeneral: aux }
            //comentarios: [...state.comentarios, newComentario],
          }));
        }
        break;

      case "Condiciones Financieras":
        if (state.comentarios.filter((_, i) => _.TabCondicionesFinancieras.Apartado === newComentario.TabCondicionesFinancieras.Apartado).length > 0) {

          const index = state.comentarios.indexOf(
            state.comentarios.filter((_, i) => _.TabCondicionesFinancieras.Apartado === newComentario.TabCondicionesFinancieras.Apartado)[0]);

          const table = [...state.comentarios];
          table[index] = newComentario;

          //let aux: IComentario[] = state.comentarios;
          //aux.push(newComentario)

          set((state) => ({
            comentarios: table
          }));
        }
        else {
          let aux: IComentario[] = state.comentarios;
          aux.push(newComentario)
          set((state) => ({
            //comentarios: { ...state.comentarios, TabCondicionesFinancieras: aux }
            //comentarios: [...state.comentarios, newComentario],
          }));
        }
        break;

      case "Documentacion":
        if (state.comentarios.filter((_, i) => _.TabDocumentacion.Apartado === newComentario.TabDocumentacion.Apartado).length > 0) {

          const index = state.comentarios.indexOf(
            state.comentarios.filter((_, i) => _.TabDocumentacion.Apartado === newComentario.TabDocumentacion.Apartado)[0]);

          const table = [...state.comentarios];
          table[index] = newComentario;

          //let aux: IComentario[] = state.comentarios;
          //aux.push(newComentario)

          set((state) => ({
            comentarios: table
          }));
        }
        else {
          let aux: IComentario[] = state.comentarios;
          aux.push(newComentario)
          set((state) => ({
            comentarios: { ...state.comentarios, TabDocumentacion: aux }
            //comentarios: [...state.comentarios, newComentario],
          }));
        }
        break;

      default:
        //Expresion
        break;
    }

    // if (
    //   state.comentarios.filter((_, i) => _.Apartado === newComentario.Apartado)
    //     .length > 0
    // ) {
    //   const index = state.comentarios.indexOf(
    //     state.comentarios.filter((_, i) => _.Apartado === newComentario.Apartado)[0]
    //   );
    //   const table = [...state.comentarios];
    //   table[index] = newComentario;
    //   set((state) => ({
    //     comentarios: table,
    //   }));
    // } else {
    //   set((state) => ({
    //     comentarios: [...state.comentarios, newComentario],
    //   }));
    // }
  },



  removeComentario: (apartado: string, Tab: string) => {
    const state = useCortoPlazoStore.getState();

    switch (Tab) {
      case "Encabezado":

        let auxE: IComentario[] = state.comentarios;
        //auxE = auxE.filter((item) => { item.TabEncabezado.Apartado !== apartado })

        set((state) => ({
          comentarios: { ...state.comentarios, TabEncabezado: auxE }
          //comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
        }))

        break;

      case "Información General":
        let auxIG: IComentario[] = state.comentarios;
        //auxIG = auxIG.filter((item) => { item.TabInformaciónGeneral.Apartado !== apartado })

        set((state) => ({
          comentarios: { ...state.comentarios, TabInformaciónGeneral: auxIG }
          //comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
        }))
        break;

      case "Condiciones Financieras":
        let auxCF: IComentario[] = state.comentarios;
        //auxIG = auxCF.filter((item) => { item.TabCondicionesFinancieras.Apartado !== apartado })

        set((state) => ({
          comentarios: { ...state.comentarios, TabCondicionesFinancieras: auxCF }
          //comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
        }))

        break;

      case "Documentacion":
        let auxD: IComentario[] = state.comentarios;
        //auxIG = auxD.filter((item) => { item.TabDocumentacion.Apartado !== apartado })

        set((state) => ({
          comentarios: { ...state.comentarios, TabDocumentacion: auxD }
          //comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
        }))
        break;
    }

    // set((state) => ({
    //   //comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
    // })),


  }
})
