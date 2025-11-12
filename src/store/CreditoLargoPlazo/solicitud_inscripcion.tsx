import { StateCreator } from "zustand";
import axios from "axios";
import { useLargoPlazoStore } from "./main";
import Swal from "sweetalert2";
import { useInscripcionStore } from "../Inscripcion/main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { ISolicitudLargoPlazo } from "../Inscripcion/inscripcion";
import { CambiaEstatus } from "../SolicitudFirma/solicitudFirma";
import { useReestructuraStore } from "../Reestructura/main";
import { IDeudorFideicomisoNew } from "../Fideicomiso/fideicomiso";
import { IDocsEliminados } from "../../components/ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";
import { deleteDocPathSol } from "../../components/APIS/pathDocSol/APISDocumentos";
import { ITiposDocumento } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { useFideicomisoStore } from "../Fideicomiso/main";
import { useInstruccionesStore } from "../InstruccionesIrrevocables/main";
import { useMandatoStore } from "../Mandatos/main";
import { alertaConfirmCancelar } from "../../generics/Alertas";

export interface IDataAgregarSolicitud {
  ControlInterno: string;
  CreadoPor: string;
  Estatus: number
  FechaContratacion: string;
  Id: string;
  IdClaveInscripcion: string;
  IdEditor: string;
  IdEntePublico: string;
  IdInsitucionFinanciera: string;
  IdTipoEntePublico: string;
  MontoOriginalContratado: string;
  NumeroRegistro: number
  Respuesta: string;
  Solicitud: string;
  TipoCredito: string;
  TipoSolicitud: string;
}

export interface IDatosModificaAsignacionTipoSolicitud {
  IdSolicitud: string,
  IdFuentePago: string,
  IipoMovRelacionado: string,
  NombreTipoFuentePago: string,
  IdEntePublicoObligado: string,
  IdFondoIngreso: string,
  PorcentajeOriginalIngreso: number,
  PorcentajeOriginalEquivalencia: number,
  PorcentajeUtilizadoIngreso: number,
  PorcentajeUtilizadoEquivalencia: number
}


export interface INewDatosModificaAsignacionTipoSolicitud {
  id: string;
  tipoFideicomitente: {
    Id: string;
    Descripcion: string;
  };
  fideicomitente: {
    Id: string;
    Descripcion: string;
  };
  tipoFuente: {
    Id: string;
    Descripcion: string;
  },
  fondoIngreso: {
    Id: string;
    Descripcion: string;
    TipoDeFuente: string;
  };
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
  garantiaDePago: string;
}


export interface SolicitudInscripcionLargoPlazoSlice {


  //createSolicitudReestructura: (IdSolicitud: string, IdEditor: string, setState: Function) => void;


  inscripcion: {
    servidorPublicoDirigido: string;
    cargo: string;
  };

  reglasAplicables: string[];


  changeInscripcion: (servidorPublicoDirigido: string, cargo: string) => void;
  setReglasAplicables: (newReglas: string[]) => void;

  IdAsignacionSolicitud: string;
  setIdAsignacionSolicitud: (IdAsignacionSolicitud: string) => void;


  crearSolicitud: (
    idEditor: string,
    estatus: string,
    comentario: string,
    setDataAsignacion: Function,
    setIdSolicitud: Function

  ) => void;

  modificaSolicitud: (
    idCreador: string,
    idEditor: string,
    estatus: string,
    //comentario: string,
    arrDocsEliminados: IDocsEliminados[],
    guardadoBorrador: number
  ) => void;

  createAsignacionTipoSolicitud: (
    DataSolicitud: IDataAgregarSolicitud,
    IdFuentePago: string,
    TablaFuentePago: IDeudorFideicomisoNew,
    TablaFuentePagoOriginal: IDeudorFideicomisoNew,
    NombreTipoFuentePago: string
  ) => void;

  modificaAsignacionUtilizadoTipoSolicitud: (
    IdFuentePago: string,
    DatosAsignacionTipoSolicitud: INewDatosModificaAsignacionTipoSolicitud[],
    TipoFuentePago: string,
    bool_Suma: number,
  ) => void;

  modificaAsignacionOriginalTipoSolicitud: (
    IdFuentePago: string,
    DatosAsignacionTipoSolicitud: INewDatosModificaAsignacionTipoSolicitud[],
    TipoFuentePago: string,
    stateOpen: Function,
    setLoading: Function
  ) => void;



  borrarSolicitud: (Id: string) => void;

  addComentario: (
    idSolicitud: string,
    comentario: string,
    tipo: string
  ) => void;

  eliminarRequerimientos: (Id: string, setState: Function) => void;

  saveFiles: (idRegistro: string, ruta: string, esLargoPlazo: boolean) => void;

  guardaDocumentos: (idRegistro: string, ruta: string, archivo: File) => void;

  savePathDoc: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string,
    TpoDoc: string

  ) => void;

  setIdSolicitudBorrador: (IdSolicitudBorrador: string) => void
  IdSolicitudBorrador: string

}

export const createSolicitudInscripcionLargoPlazoSlice: StateCreator<
  SolicitudInscripcionLargoPlazoSlice
> = (set, get) => ({

  setIdSolicitudBorrador: (IdSolicitudBorrador: string) => {
    set(() => ({ IdSolicitudBorrador: IdSolicitudBorrador }))
  },
  IdSolicitudBorrador: "",


  IdAsignacionSolicitud: "",

  setIdAsignacionSolicitud: (IdAsignacionSolicitud: string) =>
    set(() => ({
      IdAsignacionSolicitud: IdAsignacionSolicitud
    })),

  inscripcion: {
    servidorPublicoDirigido: "Rosalba Aguilar Díaz",
    cargo: "Directora de Deuda Pública y Planeación Financiera",
  },

  reglasAplicables: [],

  changeInscripcion: (inscripcion: any) =>
    set(() => ({ inscripcion: inscripcion })),

  setReglasAplicables: (newReglas: any) =>
    set(() => ({ reglasAplicables: newReglas })),

  createAsignacionTipoSolicitud: async (
    DataSolicitud: any,
    IdFuentePago: string,
    TablaFuentePago: any,
    TablaFuentePagoOriginal: any,
    NombreTipoFuentePago: string,
  ) => {

    console.log("TablaFuentePago", TablaFuentePago);

    const payload = {
      IdSolicitud: DataSolicitud.Id.trim(),
      IdFuentePago: IdFuentePago.trim(),
      TipoMovRelacionado: TablaFuentePago.id.trim(),
    };

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-AsignacionTipoMovSolicitudes",
        {
          IdSolicitud: payload.IdSolicitud,
          IdFuentePago: payload.IdFuentePago,
          TipoMovRelacionado: payload.TipoMovRelacionado,
          NombreTipoFuentePago: NombreTipoFuentePago,
          IdEntePublicoObligado: TablaFuentePago?.fideicomitente?.Id || TablaFuentePago?.mandatario?.Id || TablaFuentePago?.entePublicoObligado?.Id,
          IdFondoIngreso: TablaFuentePago?.fondoIngreso?.Id,
          PorcentajeOriginalIngreso: TablaFuentePagoOriginal.AfectadoTotalIngreso ?? 0,
          PorcentajeOriginalEquivalencia: TablaFuentePagoOriginal.EquivalenciaCorrespondienteMunicipios ?? 0,
          // PorcentajeUtilizadoIngreso: TablaFuentePago.AfectadoTotalIngreso ?? 0,
          // PorcentajeUtilizadoEquivalencia: TablaFuentePago.EquivalenciaCorrespondienteMunicipios ?? 0
          PorcentajeUtilizadoIngreso: 0.0,
          PorcentajeUtilizadoEquivalencia: 0.0
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((data) => {
        console.log("data ASIGNACIONTIPOMOVISOLICITUDES ", data);
      });
  },

  modificaAsignacionUtilizadoTipoSolicitud: async (
    IdFuentePago: string, //Este es el id que tiene de la tipomovimiento de las fuentes de pago
    DatosAsignacionTipoSolicitud: any[],
    TipoFuentePago: string,
    bool_Suma: number
  ) => {

    console.log("modificaAsignacionTipoSolicitud");
    console.log("IdFuentePago", IdFuentePago)
    console.log("TipoFuentePago", TipoFuentePago)

    console.log("DatosAsignacionTipoSolicitud: string", DatosAsignacionTipoSolicitud)


    try {
      const promesas = DatosAsignacionTipoSolicitud.map(async (item) => {
        return axios.put(
          process.env.REACT_APP_APPLICATION_BACK + "/modifica-AsignacionTipoMovUtilizadoSolicitudes",
          {
            IdFuentePago: IdFuentePago,
            TipoMovRelacionado: item.id,
            NombreTipoFuentePago: TipoFuentePago,
            //IdEntePublicoObligado: item.fideicomitente.Id,
            //IdFondoIngreso: item.fondoIngreso.Id,
            PorcentajeUtilizadoIngreso: item.AfectadoTotalIngreso,
            PorcentajeUtilizadoEquivalencia: item.EquivalenciaCorrespondienteMunicipios,
            bool_Suma: bool_Suma
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }

        );

      });
      await Promise.all(promesas);

      console.log("✅ Todas las modificaciones se realizaron correctamente.");
      //stateFuentePago(()=>{}, ()=>{})

    } catch (error: any) {
      console.error("❌ Error en alguna de las modificaciones:", error);

    }






    // .then((data) => {
    //   console.log("data ASIGNACIONTIPOMOVISOLICITUDES ", data);
    // });
  },
  modificaAsignacionOriginalTipoSolicitud: async (
    IdFuentePago: string,
    DatosAsignacionTipoSolicitud: any[],
    TipoFuentePago: string,
    stateOpen: Function,
    setLoading: Function
  ) => {

    console.log("▶️ modificaAsignacionTipoSolicitud");
    console.log("IdFuentePago:", IdFuentePago);
    console.log("TipoFuentePago:", TipoFuentePago);
    console.log("DatosAsignacionTipoSolicitud:", DatosAsignacionTipoSolicitud);

    const stateFuentePago = TipoFuentePago === "Fideicomiso" ? useFideicomisoStore.getState().modificaFideicomiso :
      TipoFuentePago === "Mandato" ? useMandatoStore.getState().modificaMandato : useInstruccionesStore.getState().modificaInstruccion;

    try {
      // Genera todas las promesas de modificación
      const promesas = DatosAsignacionTipoSolicitud.map((item) => {
        return axios.put(
          process.env.REACT_APP_APPLICATION_BACK + "/modifica-AsignacionTipoMovOriginalSolicitudes",
          {
            IdFuentePago: IdFuentePago,
            TipoMovRelacionado: item.id,
            NombreTipoFuentePago: TipoFuentePago,
            PorcentajeOriginalIngreso: item.AfectadoTotalIngreso,
            PorcentajeOriginalEquivalencia: item.EquivalenciaCorrespondienteMunicipios || 0.0,
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
      });

      // Espera a que todas las peticiones terminen antes de continuar
      await Promise.all(promesas);

      console.log("✅ Todas las modificaciones se realizaron correctamente.");
      // Llama la función del store SOLO cuando todo terminó correctamente

      console.log("HOLA", stateFuentePago)
      stateFuentePago(stateOpen, setLoading);

    } catch (error: any) {
      console.error("❌ Error en alguna de las modificaciones:", error);

    }
  },

  // modificaAsignacionOriginalTipoSolicitud: async (
  //   IdFuentePago: string, //Este es el id que tiene de la tipomovimiento de las fuentes de pago
  //   // DatosAsignacionTipoSolicitud: INewDatosModificaAsignacionTipoSolicitud[],
  //   DatosAsignacionTipoSolicitud: any[],
  //   TipoFuentePago: string,
  //   stateOpen: Function,
  //   setLoading: Function
  // ) => {
  //   const stateFideicomisos = useFideicomisoStore.getState();


  //   console.log("modificaAsignacionTipoSolicitud");
  //   console.log("IdFuentePago", IdFuentePago)
  //   console.log("TipoFuentePago", TipoFuentePago)

  //   console.log("DatosAsignacionTipoSolicitud: string", DatosAsignacionTipoSolicitud)

  //   const registros = DatosAsignacionTipoSolicitud.map(async (item) => {

  //     const { data } = await axios.put(
  //       process.env.REACT_APP_APPLICATION_BACK + "/modifica-AsignacionTipoMovOriginalSolicitudes",
  //       {
  //         IdFuentePago: IdFuentePago,
  //         TipoMovRelacionado: item.id, // AQUI
  //         NombreTipoFuentePago: TipoFuentePago,
  //         //IdEntePublicoObligado: item.fideicomitente.Id || item.entePublicoObligado.Id || item.mandatario.Id, //AQUI
  //         //IdFondoIngreso: item.fondoIngreso.Id, //AQUI
  //         PorcentajeOriginalIngreso: item.AfectadoTotalIngreso, //AQUI
  //         PorcentajeOriginalEquivalencia: item.EquivalenciaCorrespondienteMunicipios || 0.0//AQUI
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken"),
  //         },
  //       }
  //     )
  //     try {
  //       await Promise.all(registros); // Espera que todas las peticiones terminen
  //       stateFideicomisos.modificaFideicomiso(stateOpen, setLoading)
  //     } catch (error: any) {
  //     }
  //   })
  // },



  crearSolicitud: async (
    idEditor: string,
    estatus: string,
    comentario: string,
    setDataAsignacion: Function,
  ) => {
    const lpState = useLargoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

    console.log("SolicitudCompleta Largo Plazo", lpState);
    console.log("lpstate gastos y costos", lpState.tablaGastosCostos);

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
        fuente: lpState.tablaAsignarFuenteNew, //NUEVA TABLA
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
          Id: lpState.autorizacionSelectReestructura.Id,
          MontoAutorizado: lpState.autorizacionSelectReestructura.MontoAutorizado,
          NumeroAutorizacion: lpState.autorizacionSelectReestructura.NumeroAutorizacion
        },
        tablaDeclaratorias: lpState.tablaDeclaratorias,
        ReestructuraDeclaratorias: {
          TipoConvenio: {
            Id: lpState.ReestructuraDeclaratorias.TipoConvenio.Id,
            Descripcion: lpState.ReestructuraDeclaratorias.TipoConvenio.Descripcion
          },
          FechaConvenio: lpState.ReestructuraDeclaratorias.FechaConvenio,
          SalgoVigente: lpState.ReestructuraDeclaratorias.SalgoVigente,
          PeriodoFinanciamiento: lpState.ReestructuraDeclaratorias.PeriodoFinanciamiento,
          PeriodoAdminitracion: lpState.ReestructuraDeclaratorias.PeriodoAdminitracion,
          ClaseTitulo: lpState.ReestructuraDeclaratorias.ClaseTitulo
        }
      },
    }

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-solicitud",
        {
          IdTipoEntePublico: lpState.encabezado.tipoEntePublico.Id,
          IdEntePublico: lpState.encabezado.organismo.Id,
          TipoSolicitud: lpState.encabezado.tipoDocumento,
          TipoCredito: lpState.encabezado.tipoCredito.Descripcion,
          IdInstitucionFinanciera:
            lpState.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: `DDPYPF-${"CSCLP"}-${new Date().getFullYear()}`,
          MontoOriginalContratado: lpState.informacionGeneral.monto,
          FechaContratacion: lpState.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((data) => {
        // console.log("IIIIDDDD data solicitud Largo plazo creada data.data.data.Id", data.data.data.Id);
        // console.log("DAAATAAAA", data)
        // console.log("DATAAAA.DAAATAAA", data.data)

        const DataSolicitud = data.data.data;
        const fuente = lpState.tablaAsignarFuenteNew[0];
        const fuenteOriginal = lpState.OriginalTablaAsignarFuenteNew[0];
        console.log("fuente", fuente);
        console.log("fuenteOriginal", fuenteOriginal);

        lpState.setIdSolicitudBorrador(DataSolicitud.Id)
        // setIdSolicitudCreada(DataSolicitud.Id);
        console.log("IdSolicitud en inscripcion", data.data.Id);

        if (DataSolicitud !== undefined) {
          console.log("Si encontro data de la solicitud", DataSolicitud.Id);
          lpState.createAsignacionTipoSolicitud(DataSolicitud, lpState.mecanismoVehiculoPago.Id,
            fuente, fuenteOriginal, lpState.tipoMecanismoVehiculoPago)
        } else {
          console.log("NO encontro data de la solicitud")
        }

        setTimeout(() => {
          inscripcionState.cleanSolicitudLargoPlazo();
          lpState.setIdSolicitudBorrador(data.data.Id)
          //setIdSolicitudCreada(data.data.Id)

          //inscripcionState.setInscripcion(data.data.)
          alertaConfirmCancelar("La solicitud se guardó con éxito")

          inscripcionState.setInscripcion(data.data.data);

          //state.addComentario(data.data.Id, comentario, "Captura");
        }, 3000);

        //  inscripcionState.setInscripcion(data.data);
        //  cpState.addComentario(data.data.Id, comentario, "Captura");
        //  lpState.saveFiles(
        //    data.data.Id,
        //   process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS_LARGOPLAZO + `/SRPU/LARGOPLAZO/DOCSOL/${data.data.Id}`
        //  );                            

        lpState.saveFiles(
          DataSolicitud.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/LARGOPLAZO/DOCSOL/${DataSolicitud.Id}`,
          true
        );
        inscripcionState.setInscripcion(data.data.data);
        // lpState.addComentario(DataSolicitud.Id, comentario, "Captura");

      });

  },
  modificaSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string,
    // comentario: string,
    arrDocsEliminados: IDocsEliminados[],
    guardadoBorrador: number = 0
  ) => {
    const lpState = useLargoPlazoStore.getState();
    const cpState = useCortoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

    console.log('arrDocsEliminados: modisoli ', arrDocsEliminados);

    console.log("lpstate en EDITAR SOLICITUD", lpState.tablaGastosCostos)


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
        //destinoGastosCostos: lpState.tablaGastosCostos,
        destinoGastosCostos: lpState.tablaGastosCostos.map(
          ({ destino, detalleInversion, archivoDetalleInversion, claveInscripcionFinanciamiento, descripcion, monto, gastosAdicionales, montoGastosAdicionales, saldoVigente }) => ({
            destino,
            detalleInversion,
            archivoDetalleInversion: {
              nombreArchivo: archivoDetalleInversion?.nombreArchivo || "",
              tipoArchivo: archivoDetalleInversion?.tipoArchivo || "",
            },
            claveInscripcionFinanciamiento,
            descripcion,
            monto,
            gastosAdicionales,
            montoGastosAdicionales,
            saldoVigente,
          })
        ),

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
        fuente: lpState.tablaAsignarFuenteNew, //NUEVA TABLE
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
          Id: lpState.autorizacionSelectReestructura.Id,
          MontoAutorizado: lpState.autorizacionSelectReestructura.MontoAutorizado,
          NumeroAutorizacion: lpState.autorizacionSelectReestructura.NumeroAutorizacion
        },
        tablaDeclaratorias: lpState.tablaDeclaratorias,
        ReestructuraDeclaratorias: {
          TipoConvenio: {
            Id: lpState.ReestructuraDeclaratorias.TipoConvenio.Id,
            Descripcion: lpState.ReestructuraDeclaratorias.TipoConvenio.Descripcion
          },
          FechaConvenio: lpState.ReestructuraDeclaratorias.FechaConvenio,
          SalgoVigente: lpState.ReestructuraDeclaratorias.SalgoVigente,
          PeriodoFinanciamiento: lpState.ReestructuraDeclaratorias.PeriodoFinanciamiento,
          PeriodoAdminitracion: lpState.ReestructuraDeclaratorias.PeriodoAdminitracion,
          ClaseTitulo: lpState.ReestructuraDeclaratorias.ClaseTitulo
        }
      },

    };
    console.log("solicitud formateada EDITAR", solicitud)

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-solicitud",
        {
          IdSolicitud: inscripcionState.inscripcion.Id,
          IdTipoEntePublico: lpState.encabezado.tipoEntePublico.Id,
          IdEntePublico: lpState.encabezado.organismo.Id,
          TipoSolicitud: lpState.encabezado.tipoDocumento,
          TipoCredito: lpState.encabezado.tipoCredito.Descripcion,
          IdInstitucionFinanciera:
            lpState.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          //IdClaveInscripcion: "1",
          MontoOriginalContratado: lpState.informacionGeneral.monto,
          FechaContratacion: lpState.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          IdUsuario: idCreador,
          guardadoBorrador: guardadoBorrador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        console.log("modifcarsoli data: ", data.data);
        console.log('arrDocsEliminados', arrDocsEliminados);
        //cpState.deleteFiles(`/SRPU/LARGOPLAZO/DOCSOL/${data.data.Id}`);

        console.log("HOLA SOY EL ID DE LA SOLICITUD: ", inscripcionState.inscripcion.Id)
        lpState.saveFiles(
          inscripcionState.inscripcion.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/LARGOPLAZO/DOCSOL/${data.data.Id}`,
          true
        );

        if (Array.isArray(arrDocsEliminados) && arrDocsEliminados.length !== 0) {
          deleteDocPathSol(inscripcionState.inscripcion.Id, arrDocsEliminados)
        }


        // if (arrDocsEliminados.length != 0) {
        //   deleteDocPathSol(inscripcionState.inscripcion.Id, arrDocsEliminados)
        // }


      });
  },

  borrarSolicitud: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      confirmButtonColor: "#15212f",
      cancelButtonColor: "rgb(175, 140, 85)",
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-solicitud", {
        data: {
          IdSolicitud: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "No se elimino la solicitud.",
        });
      });
    return false;
  },
  eliminarRequerimientos: async (Id: string, setState: Function) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      confirmButtonColor: "#15212f",
      cancelButtonColor: "rgb(175, 140, 85)",
      timer: 3000,
      timerProgressBar: true,
    });
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/delete-comentario",
        {
          Id: Id,
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Comentario eliminado",
        });
        setState();
      })
      .catch((e) => { });
  },

  saveFiles: async (idRegistro: string, ruta: string, esLargoPlazo: boolean = true) => {
    const state = useLargoPlazoStore.getState();
    //          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/LARGOPLAZO/DOCSOL/${DataSolicitud.Id}`

    console.log("Entre saveFiles LARGO PLAZO");
    console.log("state.tablaDocumentos LARGO PLAZO", state.tablaDocumentos);
    console.log("tablaGastosCostos", state.tablaGastosCostos);

    // Procesar documentos
    const uploadsDocs = state.tablaDocumentos
      .filter((file: any) => file.archivo && file.archivo.size > 0)
      .map((file: any) => {
        return new Promise<void>((resolve, reject) => {
          const url = new File([file.archivo], file.nombreArchivo);
          let dataArray = new FormData();
          dataArray.append("ROUTE", `${ruta}`);
          dataArray.append("ADDROUTE", "true");
          dataArray.append("FILE", url);

          axios
            .post(
              process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
              dataArray,
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            )
            .then(({ data }) => {
              console.log("Documento guardado:", data.RESPONSE);
              state.savePathDoc(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO,
                file.tipoArchivo
              );
              resolve();
            })
            .catch(reject);
        });
      });

    // Procesar gastos y costos solo si es largo plazo
    const uploadsGastos = esLargoPlazo
      ? state.tablaGastosCostos
        .filter((g: any) => g.archivoDetalleInversion?.archivo instanceof File && g.archivoDetalleInversion.archivo.size > 0)
        .map((g: any) => {
          console.log("ENTRE GUARDAR ARCHIVOS DE GASTOS Y COSTOS")
          return new Promise<void>((resolve, reject) => {
            console.log("gastocosto state.catalogoTiposDocumentos:", state.catalogoTiposDocumentos);


            // ✅ Buscar el tipo de documento que coincida
            const docEncontrado = state.catalogoTiposDocumentos.find(
              (t) =>
                t.Descripcion === "Gastos y Costos, inversión pública productiva"
            );

            // Si lo encontraste, reemplaza el tipoArchivo con el Id
            let tipoDocumentoId = g.archivoDetalleInversion.tipoArchivo;
            if (docEncontrado) {
              console.log("Tipo de documento encontrado:", docEncontrado);
              //tipoDocumentoId = docEncontrado.Id;
            }


            let rutaFinal = ruta;
            if (esLargoPlazo) {
              rutaFinal = `${ruta}/DOCGASTOSCOSTOS`; //Modificacion de ruta de la carpeta de la tabla de gastos y costos
            }

            const url = new File([g.archivoDetalleInversion.archivo], g.archivoDetalleInversion.nombreArchivo);
            let dataArray = new FormData();
            dataArray.append("ROUTE", `${rutaFinal}`);
            dataArray.append("ADDROUTE", "true");
            dataArray.append("FILE", url);

            axios
              .post(
                process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
                dataArray,
                {
                  headers: {
                    Authorization: localStorage.getItem("jwtToken"),
                  },
                }
              )
              .then(({ data }) => {
                console.log("Archivo gastoCostos guardado:", data.RESPONSE);
                state.savePathDoc(
                  idRegistro,
                  data.RESPONSE.RUTA,
                  data.RESPONSE.NOMBREIDENTIFICADOR,
                  data.RESPONSE.NOMBREARCHIVO,
                  docEncontrado ? docEncontrado.Id : "" //Aqui iria la variable de IdDocumentoGastosCostos para guardar la ruta con el tipo de documento correcto
                );

                // Aquí podrías guardar la ruta en el estado si lo necesitas,
                // Ejemplo: state.savePathGasto(idRegistro, data.RESPONSE.RUTA, g.claveInscripcionFinanciamiento);
                resolve();
              })
              .catch(reject);
          });
        })
      : [];

    // Ejecutar ambos en paralelo
    return Promise.all([...uploadsDocs, ...uploadsGastos]);
  },

  // saveFiles: async (idRegistro: string, ruta: string) => {
  //   const state = useLargoPlazoStore.getState();
  //   console.log("Entre saveFiles LARGO PLAZO");

  //   console.log("state.tablaDocumentos LARGO PLAZO", state.tablaDocumentos);
  //   console.log("tablaGastosCostos", state.tablaGastosCostos);

  //   return await state.tablaDocumentos.map((file: any) => {
  //     return setTimeout(() => {
  //       const url = new File([file.archivo], file.nombreArchivo);

  //       let dataArray = new FormData();
  //       dataArray.append("ROUTE", `${ruta}`);
  //       dataArray.append("ADDROUTE", "true");
  //       dataArray.append("FILE", url);

  //       if (file.archivo && file.archivo.size > 0) {
  //         return axios
  //           .post(
  //             process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
  //             dataArray,
  //             {
  //               headers: {
  //                 Authorization: localStorage.getItem("jwtToken"),
  //               },
  //             }
  //           )
  //           .then(({ data }) => {
  //             console.log("data.RESPONSE: ", data.RESPONSE);
  //             console.log("data.RESPONSE.RUTA: ", data.RESPONSE.RUTA);

  //             state.savePathDoc(
  //               idRegistro,
  //               data.RESPONSE.RUTA,
  //               data.RESPONSE.NOMBREIDENTIFICADOR,
  //               data.RESPONSE.NOMBREARCHIVO,
  //               file.tipoArchivo
  //             );
  //           })
  //           .catch((e) => { });
  //       } else {
  //         return null;
  //       }
  //     }, 1000);
  //   });
  // },

  guardaDocumentos: async (idRegistro: string, ruta: string, archivo: File) => {
    const state = useLargoPlazoStore.getState();

    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", archivo);

    if (archivo.size > 0) {
      return axios
        .post(
          process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
          dataArray,
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then(({ data }) => {
          state.savePathDoc(
            idRegistro,
            data.RESPONSE.RUTA,
            data.RESPONSE.NOMBREIDENTIFICADOR,
            data.RESPONSE.NOMBREARCHIVO,
            ""
          );
        })
        .catch((e) => { });
    } else {
      return null;
    }
  },


  addComentario: async (Id: string, comentario: any, tipo: string) => {
    if (comentario === null || comentario === undefined || comentario.trim() === '') {
      comentario = ''; // Enviar un string vacío al backend para eliminarlo
    }
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-comentario",
        {
          IdSolicitud: Id,
          Comentario: comentario,
          Tipo: tipo,
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdComentario: useCortoPlazoStore.getState().idComentario,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        useCortoPlazoStore.setState({
          comentarios: {},
          idComentario: "",
        });
      })
      .catch((e) => { });

  },

  savePathDoc: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string,
    TpoDoc: string

  ) => {
    const state = useLargoPlazoStore.getState();

    // console.log("state.idAcuse:", state.idAcuse);

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocSol",
        {
          IdSolicitud: idSolicitud,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
          TpoDoc: TpoDoc  //COMO SE TRAEN LOS ARCHIVOS?!??????? SINO JALA 

        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {

        console.log("r: ", r.data);

      })
      .catch((e) => { });
  },
});

export async function DescargarConsultaSolicitud(Solicitud: string) {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  let solicitud: any = JSON.parse(Solicitud);
  interface DocumentacionItem {
    descripcionTipo: string;
    // Otros campos si existen en la estructura de solicitud.documentacion
  }

  const descripciones: string[] = solicitud.documentacion.map(
    (item: DocumentacionItem) => item.descripcionTipo
  );

  const fechaVencimiento = new Date(
    solicitud.informacionGeneral.fechaVencimiento
  );
  const dia = fechaVencimiento.getDate();
  const mes = meses[fechaVencimiento.getMonth()];
  const año = fechaVencimiento.getFullYear();

  const fechaVencimientoEspañol = `${dia} de ${mes} de ${año}`;

  const fechaContratacion = new Date(
    solicitud.informacionGeneral.fechaContratacion
  );
  const diaC = fechaContratacion.getDate();
  const mesC = meses[fechaContratacion.getMonth()];
  const añoC = fechaContratacion.getFullYear();

  const fechaContratacionEspañol = `${diaC} de ${mesC} de ${añoC}`;

  const SolicitudDescarga: any = {
    Nombre: solicitud.encabezado.solicitanteAutorizado.Nombre,
    Cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
    Organismo: solicitud.encabezado.organismo.Organismo,
    InstitucionBancaria:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    Monto: solicitud.informacionGeneral.monto,
    Destino: solicitud.informacionGeneral.destino.Descripcion,
    PlazoDias: solicitud.informacionGeneral.plazo,
    TipoEntePublico: solicitud.encabezado.tipoEntePublico.TipoEntePublico,
    Tipocomisiones:
      solicitud.condicionesFinancieras[0].comisiones[0]?.tipoDeComision ||
      "No Aplica",
    TasaEfectiva: solicitud.condicionesFinancieras[0].tasaEfectiva,
    Servidorpublico: solicitud.inscripcion.servidorPublicoDirigido,
    TipoDocumento: solicitud.encabezado.tipoDocumento,
    PeriodoPago:
      solicitud.condicionesFinancieras[0].comisiones[0].periodicidadDePago,
    //ObligadoSolidarioAval: solicitud.informacionGeneral.obligadosSolidarios[0]?.obligadoSolidario || 'No Aplica',
    Reglas: solicitud.inscripcion.declaratorias,
    TasaInteres:
      solicitud.condicionesFinancieras[0].tasaInteres[0].tasaReferencia,
    Documentos: solicitud.documentacion.descripcionTipo,
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_MID + "/documento_srpu",
      {
        nombre: SolicitudDescarga.Nombre,
        cargoServidorPublicoSolicitante: SolicitudDescarga.Cargo,
        oficionum: "10",
        cargoServidorPublico: solicitud.cargoSolicitante,
        organismo: SolicitudDescarga.Organismo,
        InstitucionBancaria: SolicitudDescarga.InstitucionBancaria,
        monto: SolicitudDescarga.Monto,
        destino: SolicitudDescarga.Destino,
        dias: SolicitudDescarga.PlazoDias,
        tipoEntePublicoObligado: SolicitudDescarga.TipoEntePublico,
        tasaefectiva: SolicitudDescarga.TasaEfectiva,
        tasaInteres: SolicitudDescarga.TasaInteres,
        reglas: SolicitudDescarga.Reglas,
        tipocomisiones: SolicitudDescarga.Tipocomisiones,
        servidorpublico: SolicitudDescarga.Servidorpublico,
        contrato: SolicitudDescarga.TipoDocumento,
        periodoPago: SolicitudDescarga.PeriodoPago,
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios[0]
            ?.obligadoSolidario || "No Aplica",
        fechaContrato: fechaContratacionEspañol,
        fechaVencimiento: fechaVencimientoEspañol,
        Documentos: descripciones,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute("download", `contrato.pdf`);
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => { });
}

export const getUsuariosAsignables = async (
  setState: Function,
  numero: number
) => {
  await axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/get-usuarios-asignables", {
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        Rol: localStorage.getItem("Rol"),
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      if (data.data[0].ERROR !== "Permisos Denegados") {
        setState(data.data);
      }
    })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};
