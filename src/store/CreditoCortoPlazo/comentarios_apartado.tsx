import { StateCreator } from "zustand";

export interface ComentarioApartadoSlice {
  idComentario: string;
  comentarios: { [key: string]: string };

  cleanComentario: () => void;

  newComentario: (newComentario: {
    Apartado: string;
    Comentario: string;
  }) => void;

  removeComentario: (apartado: string, Tab: string) => void;

  setComentarios: (comentario: any) => void;

  datosActualizar: Array<string>;

  setDatosActualizar: (datos: any) => void;

  filtroComentarios: boolean;
  setFiltroComentarios:(filtroComentarios: boolean) => void;


}

export const createComentarioSlice: StateCreator<ComentarioApartadoSlice> = (
  set,
  get
) => ({

  filtroComentarios: false,
  setFiltroComentarios:(filtroComentarios: boolean) => {
    set((state) => ({
      filtroComentarios: filtroComentarios
    }));

  },

  idComentario: "",
  comentarios: {},

  cleanComentario: () => {
    set((state) => ({
      comentarios: {},
      comentariosRegistro: {},
      idComentario: "",
    }));
  },

  newComentario: (newComentario: { Apartado: string; Comentario: string }) => {
    set((state) => ({
      comentarios: {
        ...state.comentarios,
        [newComentario.Apartado]: newComentario.Comentario,
      },
    }));
  },

  removeComentario: (apartado: string, Tab: string) => {
    set((state) => {
      const newComentarios: { [key: string]: string } = { ...state.comentarios };
      delete newComentarios[apartado]; // Elimina completamente la propiedad
  
      return {
        comentarios: newComentarios,
      };
    });
  },

  setComentarios: (comentarios: any) => {
    set((state) => ({
      comentarios: comentarios,
    }));
  },

  datosActualizar: [],

  setDatosActualizar: (datos: any) => {
    set((state) => ({
      datosActualizar: Object.keys(JSON.parse(datos[0]!.Comentarios)),
    }));
  },
});
