import axios from "axios";
import { StateCreator } from "zustand";
import { ITiposDocumento } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { IFile } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { useInscripcionStore } from "../Inscripcion/main";

export interface DocumentosLargoPlazoSlice {
  tablaDocumentosLp: IFile[];
  catalogoTiposDocumentosLp: ITiposDocumento[];
  catalogoTiposDocumentosObligatoriosLp: ITiposDocumento[];

  addDocumentoLp: (newDocumento: IFile) => void;
  removeDocumentoLp: (index: number) => void;
  setTablaDocumentosLp: (docs: any) => any;
  getTiposDocumentosLp: () => void;
}

export const createDocumentoLargoPlazoSlice: StateCreator<
  DocumentosLargoPlazoSlice
> = (set, get) => ({
  tablaDocumentosLp: [],

  catalogoTiposDocumentosLp: [],
  catalogoTiposDocumentosObligatoriosLp: [],

  addDocumentoLp: (newDocumento: IFile) =>
    set((state) => ({
      tablaDocumentosLp: [...state.tablaDocumentosLp, newDocumento],
    })),

  removeDocumentoLp: (index: number) =>
    set((state) => ({
      tablaDocumentosLp: state.tablaDocumentosLp.filter((_, i) => i !== index),
    })),

  setTablaDocumentosLp: (docs: any) => set(() => ({ tablaDocumentosLp: docs })),

  getTiposDocumentosLp: async () => {
    const state = useInscripcionStore.getState();
    await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK +
        "/get-tiposDocumentosLargoPlazo",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      if (state.inscripcion.Id !== "") {
        set((state) => ({
          catalogoTiposDocumentosLp: data.data,
          catalogoTiposDocumentosObligatoriosLp: data.data.filter(
            (td: any) => td.Obligatorio === 1
          ),
        }));
      } else {
        set((state) => ({
          catalogoTiposDocumentosLp: data.data,
          catalogoTiposDocumentosObligatoriosLp: data.data.filter(
            (td: any) => td.Obligatorio === 1
          ),
          tablaDocumentosLp: data.data
            .filter((td: any) => td.Obligatorio === 1)
            .map((num: any, index: number) => {
              return {
                archivo: new File(
                  [],
                  "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO",
                  { type: "text/plain" }
                ),
                tipoArchivo: data.data.filter(
                  (td: any) => td.Obligatorio === 1
                )[index].Id,
                descripcionTipo: data.data.filter(
                  (td: any) => td.Obligatorio === 1
                )[index].Descripcion,
              };
            }),
        }));
      }
    });
  },
});
