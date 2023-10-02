import { StateCreator } from "zustand";
import { IFile } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { useLargoPlazoStore } from "./main";
import axios from "axios";
import { ITiposDocumento } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";

export interface DocumentosLargoPlazoSlice {
  documentosObligatoriosLP: [];

  tablaDocumentosLP: IFile[];
  catalogoTiposDocumentos: ITiposDocumento[];
  catalogoTiposDocumentosObligatorios: ITiposDocumento[];

  addDocumentoLP: (newDocumento: IFile) => void;
  removeDocumentoLP: (index: number) => void;
  setTablaDocumentosLP: (docs: any) => any;
  getTiposDocumentos: () => void;
}

export const createDocumentoLargoPlazoSlice: StateCreator<
  DocumentosLargoPlazoSlice
> = (set, get) => ({
  documentosObligatoriosLP: [],

  tablaDocumentosLP: [],

  catalogoTiposDocumentos: [],
  catalogoTiposDocumentosObligatorios: [],

  addDocumentoLP: (newDocumento: IFile) =>
    set((state) => ({
      tablaDocumentosLP: [...state.tablaDocumentosLP, newDocumento],
    })),

  removeDocumentoLP: (index: number) =>
    set((state) => ({
      tablaDocumentosLP: state.tablaDocumentosLP.filter((_, i) => i !== index),
    })),

  setTablaDocumentosLP: (docs: any) => set(() => ({ tablaDocumentosLP: docs })),

  getTiposDocumentos: async () => {
    const state = useLargoPlazoStore.getState();
    await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK +
        "/api/get-tiposDocumentosLargoPlazo",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      if (state.idSolicitud !== "") {
        set((state) => ({
          catalogoTiposDocumentos: data.data,
          catalogoTiposDocumentosObligatorios: data.data.filter(
            (td: any) => td.Obligatorio === 1
          ),
        }));
      } else {
        set((state) => ({
          catalogoTiposDocumentos: data.data,
          catalogoTiposDocumentosObligatorios: data.data.filter(
            (td: any) => td.Obligatorio === 1
          ),
          tablaDocumentosLP: data.data
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
