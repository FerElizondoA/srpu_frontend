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
import { IInscripcion, ISolicitudLargoPlazo } from "../Inscripcion/inscripcion";
// import { useInstruccionesStore } from "./main";

export interface IDatosSolicitudReestructura {
  IdSolicitud: string;
  SolicitudReestructura: string;
  Estatus: string;
  IdEditor: string;
  FechaReestructura: "",
  NumeroRegistro: string,
}

export interface RestructuraHistorial {
  [key: string]: any;
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

  createSolicitudReestructura: (
    IdSolicitud: string,
    IdEditor: string,
    setState: Function,
    Estatus: string,
    NumeroRegistro: string,
    ReesState: any) => void;

  updateClausulasModificatorias: (IAnexoClausula: IAnexoClausula, Index: number) => void,

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

  autorizacionesReestructura: IAutorizaciones[];

  autorizacionSelectReestructura: IAutorizaciones;
  setAutorizacionSelectReestructura: (autorizacion: IAutorizaciones) => void;

  loadAnexoClausula: (AnexoClausulas: IAnexoClausula) => void;

  //  inscripcionReestructura: string;
  //  setInscripcionReestructura: (solicitud: string) => void;

  getSolicitudReestructuraFirma: (IdSolicitud: string, setConstanciaReestructura: Function) => void;
  SolicitudReestructuraFirma: IDatosSolicitudReestructura,

  Declaratorias: IAnexoClausula;
  setTablaDeclaratorias : (Declaratorias: IAnexoClausula[]) => void
}


export const createReestructura: StateCreator<ReestructuraSlice> = (set, get) => ({
  
  Declaratorias: {
    ClausulaOriginal: { Id: "", Descripcion: "" },
    ClausulaModificada: { Id: "", Descripcion: "" },
    Modificacion: ""
  },

  setTablaDeclaratorias: (Declaratorias: IAnexoClausula[]) =>
    set((state) => ({
      tablaDeclaratorias: Declaratorias,
    })),
  
  SolicitudReestructuraFirma: {
    IdSolicitud: "",
    SolicitudReestructura: "",
    FechaReestructura: "",
    IdEditor: "",
    Estatus: "",
    NumeroRegistro: ""
  },
  // {
  //   IdSolicitud: "",
  //   SolicitudReestructura: "",
  //   FechaReestructura: "",
  //   IdEditor: "",
  //   Estatus: "",
  //   NumeroRegistro: ""
  // },

  getSolicitudReestructuraFirma: async (IdSolicitud: string, setConstanciaReestructura: Function) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-SolicitudReestructuraFirma", {
        params: {
          IdSolicitud: IdSolicitud,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        console.log("R",r)
        console.log("AXIOS Aqui si hay id: ", IdSolicitud)
        setConstanciaReestructura(true)        
        set(() => ({
          SolicitudReestructuraFirma: r,
        }));
      });
  },


  autorizacionesReestructura: [],

  autorizacionSelectReestructura: {
    Id: "",
    IdEntidad: "",
    Entidad: "",
    NumeroAutorizacion: "",
    FechaPublicacion: "",
    DescripcionMedioPublicacion: "",
    IdMedioPublicacion: "",
    MontoAutorizado: "",
    DocumentoSoporte: "",
    AcreditacionQuorum: "",
    DestinoAutorizado: "",
    DetalleDestino: "",
    CreadoPor: "",
  },
  setAutorizacionSelectReestructura: (autorizacionReestructura: IAutorizaciones) => {
    set((state) => ({
      autorizacionSelectReestructura: autorizacionReestructura,
    }));
  },
  AnexoClausulas: {
    ClausulaOriginal: { Id: "", Descripcion: "" },
    ClausulaModificada: { Id: "", Descripcion: "" },
    Modificacion: ""
  },

  setAnexoClausulas: (AnexoClausulas: any) => {
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
    SolicitudReestructura: "",
    Estatus: "",
    FechaReestructura: "",
    IdEditor: "",
    NumeroRegistro: "" //AQUI TE QUEDASTE!
  },

  setSolicitudReestructura: (SolicitudReestructura: IDatosSolicitudReestructura) => {
    set(() => ({
      SolicitudReestructura: SolicitudReestructura,
    }));
  },

  createSolicitudReestructura: async (
    IdSolicitud: string,
    IdEditor: string,
    setState: Function,
    Estatus: string,
    NumeroRegistro: string,
    ReesState: any
  ) => {
    const lpState = useLargoPlazoStore.getState();
    //const ReesState = useReestructuraStore?.getState();
    //console.log("ReesState", ReesState)
    const solicitud: ISolicitudLargoPlazo = {
      encabezado: lpState.encabezado,

      informacionGeneral: {
        informacionGeneral: lpState.informacionGeneral,
        obligadosSolidarios: lpState.tablaObligadoSolidarioAval.map(
          ({ entePublicoObligado, tipoEntePublicoObligado }) => ({
            entePublicoObligado,
            tipoEntePublicoObligado,
          })
        ),
        destinoGastosCostos: lpState.tablaGastosCostos,
      },

      autorizacion: {
        Id: lpState.autorizacionSelect.Id,
        MontoAutorizado: lpState.autorizacionSelect.MontoAutorizado,
        NumeroAutorizacion: lpState.autorizacionSelect.NumeroAutorizacion,
      },

      fuenteDePago: {
        mecanismoVehiculoDePago: {
          Tipo: lpState.mecanismoVehiculoPago.MecanismoPago,
          Id: lpState.mecanismoVehiculoPago.Id,
          NumeroRegistro: lpState.mecanismoVehiculoPago.NumeroRegistro,
          TipoFideicomiso: lpState.mecanismoVehiculoPago.TipoFideicomiso,
          Fiduciario: lpState.mecanismoVehiculoPago.Fiduciario,
        },
        fuente: lpState.tablaAsignarFuente,
        garantiaDePago: lpState.garantiaPago,
      },

      condicionesFinancieras: lpState.tablaCondicionesFinancieras,

      documentacion: lpState.tablaDocumentos.map(
        ({ descripcionTipo, nombreArchivo, tipoArchivo }) => ({
          descripcionTipo,
          nombreArchivo,
          tipoArchivo,
        })
      ),
      inscripcion: {
        servidorPublicoDirigido: lpState.inscripcion.servidorPublicoDirigido,
        cargoServidorPublicoServidorPublicoDirigido: lpState.inscripcion.cargo,
        declaratorias: lpState.reglasAplicables,
      },

      SolicitudReestructuracion: {
        autorizacionReestructura: {
          Id: ReesState.autorizacionSelectReestructura.Id,
          MontoAutorizado: ReesState.autorizacionSelectReestructura.MontoAutorizado,
          NumeroAutorizacion: ReesState.autorizacionSelectReestructura.NumeroAutorizacion
        },
        tablaDeclaratorias: ReesState.tablaDeclaratorias,
        ReestructuraDeclaratorias: {
          TipoConvenio: {
            Id: ReesState.ReestructuraDeclaratorias.TipoConvenio.Id,
            Descripcion: ReesState.ReestructuraDeclaratorias.TipoConvenio.Descripcion
          },
          FechaConvenio: ReesState.ReestructuraDeclaratorias.FechaConvenio,
          SalgoVigente: ReesState.ReestructuraDeclaratorias.SalgoVigente,
          PeriodoFinanciamiento: ReesState.ReestructuraDeclaratorias.PeriodoFinanciamiento,
          PeriodoAdminitracion: ReesState.ReestructuraDeclaratorias.PeriodoAdminitracion
        }
      },


    }

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-SolicitudReestructura",
        {
          IdSolicitud: IdSolicitud,
          SolicitudReestructura: JSON.stringify(solicitud),
          IdEditor: IdEditor,
          Estatus: Estatus,
          NumeroRegistro: NumeroRegistro,
          //localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )

      .then(({ data }) => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "La reestructura de la solicitud se completado exitosamente",
        });
        //navigate("../ConsultaDeSolicitudes");
        // console.log("reestructura", ReesState.tablaDeclaratorias )
        // console.log("reestructura", ReesState.autorizacionSelectReestructura )
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
        ClausulaModificada: { Id: AnexoClausulas.ClausulaModificada.Id, Descripcion: AnexoClausulas.ClausulaModificada.Descripcion },
        Modificacion: AnexoClausulas.Modificacion
      }
    })

  },
})