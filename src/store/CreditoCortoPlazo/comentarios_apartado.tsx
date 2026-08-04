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
      datosActualizar: [],
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
    if (!datos || datos.length === 0) {
      set((state) => ({
        datosActualizar: [],
      }));
      return;
    }
    const keys: string[] = [];
    (Array.isArray(datos) ? datos : [datos]).forEach((d: any) => {
      try {
        Object.keys(JSON.parse(d.Comentarios)).forEach((k) => {
          if (!keys.includes(k)) keys.push(k);
        });
      } catch (e) {
        // ignora comentario inválido
      }
    });
    set((state) => ({
      datosActualizar: keys,
    }));
  },
});
