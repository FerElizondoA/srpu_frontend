/* eslint-disable array-callback-return */
import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { useNavigate } from "react-router-dom";
import { IDatosInstrucciones } from "../../screens/fuenteDePago/InstruccionesIrrevocables";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { CambiaEstatus } from "../SolicitudFirma/solicitudFirma";
import { useLargoPlazoStore } from "../CreditoLargoPlazo/main";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IAutorizaciones } from "../CreditoLargoPlazo/autorizacion";
import { useReestructuraStore } from "./main";
// import { useInstruccionesStore } from "./main";

export interface IDatosSolicitudReestructura {
  IdSolicitud: string;
  Solicitud: string;
  IdEditor: string;
  //IdUsuarioSolicitante: string;
  //FechaReestructura:string;
}

export interface ICreditoSolicitudReestructura {
  TipoConvenio: { Id: string, Descripcion: string };
  FechaConvenio: string;
  SalgoVigente: number;
  PeriodoFinanciamiento: string;
  PeriodoAdminitracion: string;
}

export interface IAnexoClausula {
  ClausulaOriginal: { Id: string, Descripcion: string }
  ClausulaModificada: { Id: string, Descripcion: string }
  Modificacion: string
}



export interface ReestructuraSlice {
  SolicitudReestructura: IDatosSolicitudReestructura,
  setSolicitudReestructura: (SolicitudReestructura: IDatosSolicitudReestructura) => void;




  ReestructuraDeclaratorias: ICreditoSolicitudReestructura
  setCreditoSolicitudReestructura: (ReestructuraDeclaratorias: ICreditoSolicitudReestructura) => void;

  createSolicitudReestructura: (IdSolicitud: string, Solicitud: string, IdEditor: string, setState: Function) => void;

  updateClausulasModificatorias:(IAnexoClausula: IAnexoClausula, Index: number) =>void,

  AnexoClausulas: IAnexoClausula,
  setAnexoClausulas: (AnexoClausulas: IAnexoClausula) => void;
  catalogoTipoConvenio: ICatalogo[]
  cleanAnexoClausulas: () => void;

  tablaDeclaratorias: IAnexoClausula[],
  addTablaDeclaratorias: (tablaDeclaratorias: IAnexoClausula) => void;
  EditTablaDeclaratorias: (tablaDeclaratorias: IAnexoClausula) => void;
  removeDeclaratoria: (index: number) => void;

  reestructura: string;
  changeRestructura: (restructura: string) => void;

  loadAnexoClausula: (AnexoClausulas: IAnexoClausula) => void;


}


export const createReestructura: StateCreator<ReestructuraSlice> = (set, get) => ({
  

  
  AnexoClausulas: {
    ClausulaOriginal: { Id: "", Descripcion: "" },
    ClausulaModificada: { Id: "", Descripcion: "" },
    Modificacion: ""
  },

  setAnexoClausulas: (AnexoClausulas: IAnexoClausula) => {
    set(() => ({
      AnexoClausulas: AnexoClausulas,
    }));
  },

  cleanAnexoClausulas: () => {
    set(() => ({
      AnexoClausulas: {
        ClausulaOriginal: { Id: "", Descripcion: "" },
        ClausulaModificada: { Id: "", Descripcion: "" },
        Modificacion: ""
      }
    }));
  },

  addTablaDeclaratorias: (tablaDeclaratorias: IAnexoClausula) => {
    set((state) => ({
      tablaDeclaratorias: [...state.tablaDeclaratorias, tablaDeclaratorias]
    }))
  },

  EditTablaDeclaratorias: (tablaDeclaratorias: IAnexoClausula) => {
    set((state) => ({
      tablaDeclaratorias: [...state.tablaDeclaratorias, tablaDeclaratorias]
    }))
  },

  updateClausulasModificatorias: (AnexoClausulas: IAnexoClausula, Index: number) => {
    set((state) => {
      const nuevaTabla = [...state.tablaDeclaratorias];

      nuevaTabla[Index] = AnexoClausulas;

      return {
        tablaDeclaratorias: nuevaTabla,
      };
    });
  }, 



  removeDeclaratoria: (index: number) =>
    set((state) => ({
      tablaDeclaratorias: state.tablaDeclaratorias.filter((_, i) => i !== index),
    })),

  catalogoTipoConvenio: [],
  tablaDeclaratorias: [],

  ReestructuraDeclaratorias: {
    TipoConvenio: { Id: "", Descripcion: "" },
    FechaConvenio: new Date().toString(),
    SalgoVigente: 0,
    PeriodoFinanciamiento: "",
    PeriodoAdminitracion: "",
  },

  setCreditoSolicitudReestructura: (ReestructuraDeclaratorias: ICreditoSolicitudReestructura) => {
    set(() => ({
      ReestructuraDeclaratorias: ReestructuraDeclaratorias,
    }));
  },

  SolicitudReestructura: {
    IdSolicitud: "",
    Solicitud: "",
    IdEditor: "",
  },

  setSolicitudReestructura: (SolicitudReestructura: IDatosSolicitudReestructura) => {
    const lpState = useLargoPlazoStore.getState();
    set(() => ({
      SolicitudReestructura: SolicitudReestructura,
    }));
  },

  createSolicitudReestructura: async (
    IdSolicitud: string,
    Solicitud: string,
    IdEditor: string,
    setState: Function
  ) => {

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-SolicitudReestructura",
        {
          IdSolicitud: IdSolicitud,
          Solicitud: Solicitud,
          IdUsuarioSolicitante: IdEditor,
          //localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )

      .then(({ data }) => {
        //const navigate = useNavigate();
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "La reestructura de la solicitud se completado exitosamente",
        });
        //navigate("../ConsultaDeSolicitudes");
        CambiaEstatus("19", IdSolicitud, IdEditor);
        setState(true)
      })
      .catch(() => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  reestructura: "",

  changeRestructura: (reestructura: string) => {
    set(() => ({
      reestructura: reestructura,
    }));
  },


  
  loadAnexoClausula: (AnexoClausulas: IAnexoClausula) => {
    useLargoPlazoStore.setState({
      AnexoClausulas: {
      ClausulaOriginal: { Id: AnexoClausulas.ClausulaOriginal.Id, Descripcion: AnexoClausulas.ClausulaOriginal.Descripcion },
      ClausulaModificada:  { Id: AnexoClausulas.ClausulaModificada.Id, Descripcion: AnexoClausulas.ClausulaModificada.Descripcion },
      Modificacion: AnexoClausulas.Modificacion
    }
    })
    
  },
})