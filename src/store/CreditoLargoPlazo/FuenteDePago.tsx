import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

export type AsignarFuente = {
  clasificacion: string;
  tipoFuente: string;
  fuentePago: string;
  respecto: string;
};

export interface FuenteDePagoLargoPlazoSlice {
  Mecanismo: {
    vehiculoDePago: string;
    numeroFideicomiso: string;
    bonoCuponCero: string;
    clasificacionBonoCuponCero: string;
  };


  tablaAsignarFuente: AsignarFuente[];
  generalAsignarFuente: {
    clasificacion: string;
    tipoFuente: string;
    fuentePago: string;
    Respecto: string;
  }

  garantiaDePago: {
    garantiaPago: string;
  } 
  
  catalogoClasificacion: ICatalogo[];
  catalagoTipoFuente: ICatalogo[];
  catalogoFuentePago: ICatalogo[];
  catalogoRespecto: ICatalogo[]

  changeAsignarFuente:(
    clasificacion: { Id: string; Descripcion: string },
    tipoFuente: { Id: string; Descripcion: string },
    fuentePago: { Id: string; Descripcion: string },
    Respecto: { Id: string; Descripcion: string },
  ) => void;

  changeMecanismo: (
    vehiculoDePago: { Id: string; Descripcion: string },
    numeroFideicomiso: { Id: string; Descripcion: string },
    bonoCuponCero: { Id: string; Descripcion: string },
    clasificacionBonoCuponCero: { Id: string; Descripcion: string },
  ) => void;

  changeGarantiaPago : (
    garantiaPago : string,
  ) => void;



}

export const createFuentePagoLargoPLazoSlice: StateCreator<
  FuenteDePagoLargoPlazoSlice
> = (set, get) => ({

    Mecanismo: {
        vehiculoDePago: "",
        numeroFideicomiso: "", 
        bonoCuponCero: "",
        clasificacionBonoCuponCero: "",
    },

    tablaAsignarFuente: [],
    generalAsignarFuente: {
        clasificacion: "",
        tipoFuente: "",
        fuentePago: "",
        Respecto:  "",
    },
    catalogoClasificacion: [],
    catalagoTipoFuente: [],
    catalogoFuentePago: [],
    catalogoRespecto: [],

    
  garantiaDePago: {
    garantiaPago: "",
  } ,

    changeAsignarFuente:(generalAsignarFuente : any) =>
    set(() => ({
        generalAsignarFuente: generalAsignarFuente,
    })),
    changeMecanismo: (newMecanismo: any) =>
    set(() => ({
        Mecanismo: newMecanismo
    })),

    changeGarantiaPago : (garantiaDePago: any) => 
    set(() => ({
        garantiaDePago: garantiaDePago
    })),


});
