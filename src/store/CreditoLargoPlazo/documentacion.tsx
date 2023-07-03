import { StateCreator } from "zustand";
import axios from "axios";
import { IFileLP } from "../../components/ObligacionesLargoPlazoPage/Panels/Documentacion";
import { ITiposDocumentoLP } from  "../../components/Interfaces/InterfacesLplazo/documentacion/IListTipoDocumento"
import { useLargoPlazoStore } from "./main";

export interface DocumentosLargoPlazoSlice {
  documentosObligatoriosLP: [];

  tablaDocumentosLP: IFileLP[];

  catalogoTiposDocumentosLP: ITiposDocumentoLP[];
  catalogoTiposDocumentosObligatoriosLP: ITiposDocumentoLP[];

  addDocumentoD: (newDocumento: IFileLP) => void;
  removeDocumentoD: (index: number) => void;
  setTablaDocumentosD: (docs: any) => any;

  getTiposDocumentosD: () => void;
}

export const createDocumentoLargoPlazoSlice: StateCreator<DocumentosLargoPlazoSlice> = (
  set,
  get
) => ({
  documentosObligatoriosLP: [],

  tablaDocumentosLP: [],

  catalogoTiposDocumentosLP: [],
  catalogoTiposDocumentosObligatoriosLP: [],

  addDocumentoD: (newDocumento: IFileLP) =>
    set((state) => ({
      tablaDocumentosLP: [...state.tablaDocumentosLP, newDocumento],
    })),

  removeDocumentoD: (index: number) =>
    set((state) => ({
      tablaDocumentosLP: state.tablaDocumentosLP.filter((_, i) => i !== index),
    })),

  setTablaDocumentosD: (docs: any) => set(() => ({ tablaDocumentosLP: docs })),

  getTiposDocumentosD: async () => {
    const state = useLargoPlazoStore.getState();
    await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK +
        "/api/get-tiposDocumentosCortoPlazo",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      if (state.idSolicitud !== "") {
        set((state) => ({
          catalogoTiposDocumentosLP: data.data,
          catalogoTiposDocumentosObligatoriosLP: data.data.filter(
            (td: any) => td.Obligatorio === 1
          ),
        }));
      } else {
        set((state) => ({
          catalogoTiposDocumentosLP: data.data,
          catalogoTiposDocumentosObligatoriosLP: data.data.filter(
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
