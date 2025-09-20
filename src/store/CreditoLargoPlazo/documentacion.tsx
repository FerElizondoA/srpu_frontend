import axios from "axios";
import { StateCreator } from "zustand";
import { ITiposDocumento } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { IFile } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { useInscripcionStore } from "../Inscripcion/main";

export interface DocumentosSlice {
  tablaDocumentos: IFile[];
  catalogoTiposDocumentos: ITiposDocumento[];
  catalogoTiposDocumentosObligatorios: ITiposDocumento[];


  idAcuse: string;
  getIdAcuse: (idAcuse: string) => void;



  addDocumento: (newDocumento: IFile) => void;
  removeDocumento: (index: number) => void;
  setTablaDocumentos: (docs: any) => any;
  getTiposDocumentos: () => void;



}

export const createDocumentoSlice: StateCreator<DocumentosSlice> = (
  set,
  get
) => ({
  idAcuse: "",
  getIdAcuse: async () => {

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

      // Busca el ID donde TipoDocumento sea "Acuses"
      const acuse = data.data.find(
        (td: any) => td.Descripcion === "Acuses"
      );

      if (acuse && acuse.Id) {
        set((state) => ({
          idAcuse: acuse.Id, // Guarda el ID en el estado
        }));
      }

    });
  },

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

