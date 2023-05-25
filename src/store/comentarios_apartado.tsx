import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";

export interface IComentario {
  Tab: string;
  Apartado: string;
  Comentario: string;
}

export interface ComentarioApartadoSlice {
  comentarios: IComentario[];

  comentario: IComentario;

  setComentario: (nuevo: IComentario) => void;

  cleanComentario: () => void;

  newComentario: (newComentario: IComentario) => void;

  removeComentario: (apartado: string) => void;
}

export const createComentarioSlice: StateCreator<ComentarioApartadoSlice> = (
  set,
  get
) => ({
  comentarios: [],

  comentario: { Tab: "", Apartado: "", Comentario: "" },

  setComentario: (nuevo: IComentario) =>
    set(() => ({
      comentario: {
        Tab: nuevo.Tab,
        Apartado: nuevo.Apartado,
        Comentario: nuevo.Comentario,
      },
    })),

  cleanComentario: () =>
    set(() => ({
      comentario: {
        Tab: "",
        Apartado: "",
        Comentario: "",
      },
    })),

  newComentario: (newComentario: IComentario) => {
    const state = useCortoPlazoStore.getState();
    if (
      state.comentarios.filter((_, i) => _.Apartado === newComentario.Apartado)
        .length > 0
    ) {
      const index = state.comentarios.indexOf(
        state.comentarios.filter(
          (_, i) => _.Apartado === newComentario.Apartado
        )[0]
      );
      const table = [...state.comentarios];
      table[index] = newComentario;
      set((state) => ({
        comentarios: table,
      }));
    } else {
      set((state) => ({
        comentarios: [...state.comentarios, newComentario],
      }));
    }
  },

  removeComentario: (apartado: string) =>
    set((state) => ({
      comentarios: state.comentarios.filter((_, i) => _.Apartado !== apartado),
    })),
});
