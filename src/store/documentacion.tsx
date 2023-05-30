import { StateCreator } from "zustand";
import axios from "axios";
import { IFile } from "../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { ITiposDocumento } from "../components/Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { useCortoPlazoStore } from "./main";

export interface DocumentosSlice {
  documentosObligatorios: [];

  tablaDocumentos: IFile[];

  catalogoTiposDocumentos: ITiposDocumento[];
  catalogoTiposDocumentosObligatorios: ITiposDocumento[];

  addDocumento: (newDocumentosObligatoriosArreglo: IFile) => void;
  removeDocumento: (index: number) => void;
  setTablaDocumentos: (docs: any) => any;

  getTiposDocumentos: () => void;
}

export const createDocumentoSlice: StateCreator<DocumentosSlice> = (
  set,
  get
) => ({
  documentosObligatorios: [],

  tablaDocumentos: [],

  catalogoTiposDocumentos: [],
  catalogoTiposDocumentosObligatorios: [],

  addDocumento: (newDocumento: IFile) =>
    set((state) => ({
      tablaDocumentos: [...state.tablaDocumentos, newDocumento],
    })),

  removeDocumento: (index: number) =>
    set((state) => ({
      tablaDocumentos: state.tablaDocumentos.filter((_, i) => i !== index),
    })),

  setTablaDocumentos: (docs: any) => set(() => ({ tablaDocumentos: docs })),

  getTiposDocumentos: async () => {
    const state = useCortoPlazoStore.getState();
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
          tablaDocumentos: data.data
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
