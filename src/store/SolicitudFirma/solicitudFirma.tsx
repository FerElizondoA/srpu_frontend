import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { StateCreator } from "zustand";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { IInscripcion, ISolicitudLargoPlazo } from "../Inscripcion/inscripcion";
import { useInscripcionStore } from "../Inscripcion/main";
import { alertaError, alertaErrorConfirm, alertaExitoConfirm } from "../../generics/Alertas";
import { IDatosSolicitudReestructura } from "../Reestructura/reestructura";
import { useState } from "react";
import { useCancelacionStore } from "../Cancelacion/main";
import { useLargoPlazoStore } from "../CreditoLargoPlazo/main";
import { useFideicomisoStore } from "../Fideicomiso/main";
import Swal from "sweetalert2";
import { useTrazabilidad } from "../Trazabilidad/main";
import { ICondicionFinanciera } from "../CreditoCortoPlazo/condicion_financiera";

export interface IDataFirmaDetalle {
  Id: string;
  IdPathDoc: string;
  IdFirma: string;
  IdSolicitud: string;
  NumeroOficio: string;
  TipoFirma: string;
  Asunto: string;
  Rfc: string;
  SerialCertificado: string;
  FechaFirma: string;
  Descargas: string;
  FechaDescarga: string;
  FechaDoc: string;
  CreadoPor: string;
  PathDoc: string;
  FechaCreacion: string;
  Deleted: number;
}

export interface IDatosCompletosSolicitud {

  encabezado: {
    tipoCredito: {
      Id: string;
      Descripcion: string;
    };
    tipoDocumento: string;
    solicitanteAutorizado: {
      IdSolicitante: string;
      Cargo: string;
      Nombre: string;
    };
    tipoEntePublico: {
      Id: string;
      TipoEntePublico: string;
    };
    organismo: {
      Id: string;
      Organismo: string;
    };
    fechaContratacion: string;
  };
  informacionGeneral: {
    informacionGeneral: {
      fechaContratacion: string;
      fechaVencimiento: string;
      plazo: number;
      destino: {
        Id: string;
        Descripcion: string;
      };
      monto: string;
      denominacion: string;
      institucionFinanciera: {
        Id: string;
        Descripcion: string;
      };
    };
    obligadosSolidarios: {
      entePublicoObligado: string;
      tipoEntePublicoObligado: string;
    }[];
    destinoGastosCostos: {
      destino: {
        Id: string;
        Descripcion: string;
      };
      detalleInversion: {
        Id: string;
        Descripcion: string;
      };
      archivoDetalleInversion: {
        archivo: Record<string, unknown>;
        nombreArchivo: string;
      };
      claveInscripcionFinanciamiento: string;
      descripcion: string;
      monto: string;
      gastosAdicionales: string;
      montoGastosAdicionales: string;
      saldoVigente: string;
    }[];
  };
  autorizacion: {
    Id: string;
    MontoAutorizado: string;
    NumeroAutorizacion: string;
  };
  fuenteDePago: {
    mecanismoVehiculoDePago: {
      Tipo: string;
      Id: string;
      NumeroRegistro: string;
      TipoFideicomiso: string;
      Fiduciario: string;
    };
    fuente: {
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
      };
      fondoIngreso: {
        Id: string;
        Descripcion: string;
        TipoDeFuente: string;
      };
      AfectadoTotalIngreso: number;
      EquivalenciaCorrespondienteMunicipios: number;
    }[];
    garantiaDePago: string;
  };
  condicionesFinancieras: {
    pagosDeCapital: {
      fechaPrimerPago: string;
      periodicidadDePago: {
        Id: string;
        Descripcion: string;
      };
      numeroDePago: string;
    };
    disposicion: {
      fechaDisposicion: string;
      importe: string;
    }[];
    tasaInteres: {
      tasaFija: string;
      fechaPrimerPago: string;
      diasEjercicio: {
        Id: string;
        Descripcion: string;
      };
      periocidadPago: {
        Id: string;
        Descripcion: string;
      };
      tasaReferencia: {
        Id: string;
        Descripcion: string;
      };
      sobreTasa: number;
    }[];
    tasaEfectiva: {
      tasaEfectiva: string;
      diasEjercicio: {
        Id: string;
        Descripcion: string;
      };
    };
    comisiones: {
      fechaComision: string;
      tipoDeComision: {
        Id: string;
        Descripcion: string;
      };
      periodicidadDePago: {
        Id: string;
        Descripcion: string;
      };
      monto: string;
      porcentaje: string;
      iva: boolean;
    }[];
  }[];
  documentacion: {
    descripcionTipo: string;
    tipoArchivo: string;
  }[];
  inscripcion: {
    servidorPublicoDirigido: string;
    cargoServidorPublicoServidorPublicoDirigido: string;
    declaratorias: [];
  };
  SolicitudReestructuracion: {
    autorizacionReestructura: {
      Id: string;
      MontoAutorizado: string;
      NumeroAutorizacion: string;
    };
    tablaDeclaratorias: [];
    ReestructuraDeclaratorias: {
      TipoConvenio: {
        Id: string;
        Descripcion: string;
      };
      FechaConvenio: string;
      SalgoVigente: number;
      PeriodoFinanciamiento: string;
      PeriodoAdminitracion: string;
      ClaseTitulo: {
        Id: string;
        Descripcion: string;
      };
    };
  };
}

export interface IDatosPorcentajesAcumulados {
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
  };
  fondoIngreso: {
    Id: string;
    Descripcion: string;
    TipoDeFuente: string;
  };
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
  garantiaDePago: string;
}

export interface IDatosUsuarioCancelacion {
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  IdUsuarioCancelador: string
}


export interface SolicitudFirmaSlice {
  proceso: string;
  url: string;
  infoDoc: string;

  catalogoFirmaDetalle: IDataFirmaDetalle;
  getCatalogoFirmaDetalle: (IdSolicitud: string, TipoFirma: string) => void;

  setProceso: (estatus: string) => void;
  changeInfoDoc: (info: string, cambiaEstatus: Function) => void;

  convertirMontosAPalabras: (numeroConFormato: string) => void;



  usuarioIniciadoCanelacion: IDatosUsuarioCancelacion;
  setUsuarioIniciadoCancelacion: (usuarioIniciadoCanelacion: IDatosUsuarioCancelacion) => void;

  setUrl: (url: string) => void;
}

export const createSolicitudFirmaSlice: StateCreator<SolicitudFirmaSlice> = (
  set,
  get
) => ({

  usuarioIniciadoCanelacion: {
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    IdUsuarioCancelador: ""
  },

  setUsuarioIniciadoCancelacion: (usuarioIniciadoCanelacion: IDatosUsuarioCancelacion) => {
    set(() => ({
      usuarioIniciadoCanelacion: usuarioIniciadoCanelacion,
    }));
  },

  convertirMontosAPalabras(numeroConFormato: string): string {

    function limpiarFormatoMoneda(monto: string): number {
      const montoLimpio = monto.replace(/[^0-9.]/g, '');
      return parseFloat(montoLimpio);
    }

    const numeroFloat = limpiarFormatoMoneda(numeroConFormato);
    const parteEntera = Math.floor(numeroFloat);
    const centavos = Math.round((numeroFloat - parteEntera) * 100);

    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function convertirNumeroAPalabras(numero: number): string {
      if (numero === 0) return 'cero';
      if (numero < 10) return unidades[numero];
      if (numero < 20) return especiales[numero - 10];
      if (numero < 100) return convertirDecenas(numero);
      if (numero < 1000) return convertirCentenas(numero);
      if (numero < 1_000_000) return convertirMiles(numero);
      if (numero < 1_000_000_000) return convertirMillones(numero);
      if (numero < 1_000_000_000_000) return convertirMilesDeMillones(numero);
      if (numero <= 1_000_000_000_000_000) return convertirBillones(numero);

      return 'Número fuera de rango';
    }

    function convertirDecenas(numero: number): string {
      const decena = Math.floor(numero / 10);
      const unidad = numero % 10;
      if (numero < 30) {
        return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
      }
      return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
    }

    function convertirCentenas(numero: number): string {
      const centena = Math.floor(numero / 100);
      const resto = numero % 100;
      if (numero === 100) return 'cien';
      return centenas[centena] + (resto > 0 ? ' ' + convertirDecenas(resto) : '');
    }

    function convertirMiles(numero: number): string {
      const miles = Math.floor(numero / 1000);
      const resto = numero % 1000;
      if (miles === 1) return 'mil ' + (resto > 0 ? convertirCentenas(resto) : '');
      return convertirNumeroAPalabras(miles) + ' mil ' + (resto > 0 ? convertirCentenas(resto) : '');
    }

    function convertirMillones(numero: number): string {
      const millones = Math.floor(numero / 1_000_000);
      const resto = numero % 1_000_000;
      if (millones === 1) return 'un millón ' + (resto > 0 ? convertirMiles(resto) : '');
      return convertirNumeroAPalabras(millones) + ' millones ' + (resto > 0 ? convertirMiles(resto) : '');
    }

    function convertirMilesDeMillones(numero: number): string {
      const milesMillones = Math.floor(numero / 1_000_000_000);
      const resto = numero % 1_000_000_000;
      if (milesMillones === 1) return 'mil millones ' + (resto > 0 ? convertirMillones(resto) : '');
      return convertirNumeroAPalabras(milesMillones) + ' mil millones ' + (resto > 0 ? convertirMillones(resto) : '');
    }

    function convertirBillones(numero: number): string {
      const billones = Math.floor(numero / 1_000_000_000_000);
      const resto = numero % 1_000_000_000_000;
      if (billones === 1) return 'un billón ' + (resto > 0 ? convertirMilesDeMillones(resto) : '');
      return convertirNumeroAPalabras(billones) + ' billones ' + (resto > 0 ? convertirMilesDeMillones(resto) : '');
    }

    let parteEnteraEnPalabras = convertirNumeroAPalabras(parteEntera);

    const centavosEnPalabras = centavos > 0
      ? ` ${centavos.toString().padStart(2, '0')}/100 M.N.`
      : ' 00/100 M.N.';

    return `${parteEnteraEnPalabras} pesos${centavosEnPalabras}`;
  },

  proceso: "",

  url: "",

  infoDoc: "",

  catalogoFirmaDetalle: {
    Id: "",
    IdPathDoc: "",
    IdFirma: "",
    IdSolicitud: "",
    NumeroOficio: "",
    TipoFirma: "",
    Asunto: "",
    Rfc: "",
    SerialCertificado: "",
    FechaFirma: "",
    Descargas: "",
    FechaDescarga: "",
    FechaDoc: "",
    CreadoPor: "",
    PathDoc: "",
    FechaCreacion: "",
    Deleted: 0,
  },

  getCatalogoFirmaDetalle: async (IdSolicitud: string, TipoFirma: string) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-firmaDetalle", {
        params: {
          IdSolicitud: IdSolicitud,
          TipoFirma: TipoFirma,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let fd = data.data;
        set(() => ({
          catalogoFirmaDetalle: fd,
        }));
      });
  },

  setProceso: (estatus: string) => {
    set(() => ({
      proceso: estatus,
    }));
  },



  changeInfoDoc: (info: any, cambiaEstatus: Function) => {
    set(() => ({ infoDoc: info }));
    const stateCancelaciones = useCancelacionStore.getState()
    const stateTrazabilidad = useTrazabilidad.getState()

    if (info) {
      //Proceso para saber que tipo de firma hara - Inscripcion (CP y LP), Reestructura y Cancelacion
      const tipoFirmaDetalle = stateCancelaciones.tipoFirmaDetalle === ""
        ? "inscripcion"
        : stateCancelaciones.tipoFirmaDetalle === "cancelacion" ? "cancelacion" : "reestructura"
      console.log("tipoFirmaDetalle", tipoFirmaDetalle);
      //**************** */


      let validacionReestructura = false
      const inf = JSON.parse(info);
      console.log("info en changeInfoDoc", inf);

      //const stateCortoPlazo = useCortoPlazoStore.getState();
      // const idAcuse = ""
      //stateCortoPlazo.getIdAcuse(idAcuse)

      const filtro = useInscripcionStore.getState();
      let state: any;
      let estatusPrevio = {
        Id: "",
        NoEstatus: "",
        Estatus: "",
        ControlInterno: "",
        IdClaveInscripcion: ""
      };


      if (filtro.inscripcionReestructura?.IdSolicitud === "" ||
        filtro.inscripcionReestructura?.IdSolicitud === null ||
        filtro.inscripcionReestructura?.IdSolicitud === undefined) {

        validacionReestructura = false
        state = filtro.inscripcion;
        estatusPrevio = {
          Id: state.Id,
          NoEstatus: state.NoEstatus,
          Estatus: state.Estatus,
          ControlInterno: state.ControlInterno,
          IdClaveInscripcion: state.IdClaveInscripcion
        };

      } else {
        validacionReestructura = true
        state = filtro.inscripcionReestructura

        if (state.Estatus === "19") {
          estatusPrevio = {
            Id: state.IdSolicitud,
            NoEstatus: state.Estatus,
            Estatus: "",
            ControlInterno: "reestructura",
            IdClaveInscripcion: state.IdClaveInscripcion
          }
        } else {
          //console.log("Entre al ELSE de state Filtro.insciprion", filtro.inscripcion);

          state = filtro.inscripcion;
          estatusPrevio = {
            Id: state.Id,
            NoEstatus: state.NoEstatus,
            Estatus: state.Estatus,
            ControlInterno: state.ControlInterno,
            IdClaveInscripcion: state.IdClaveInscripcion
          };
        }
      }
      //Para guardar los porcentajes acumulados ya inscritos
      // if (filtro.inscripcion.TipoSolicitud === "Crédito Simple a Largo Plazo") {
      //   //const LPS = useLargoPlazoStore.getState();
      //   //const DatosFull: IDatosCompletosSolicitud = LPS.inscripcion
      //   const SolicitudDatos: IDatosCompletosSolicitud = JSON.parse(useInscripcionStore.getState().inscripcion.Solicitud)

      //   const DatosPorcentajesAcumulados = {
      //     IdTipoEntePublicoObligado: SolicitudDatos.fuenteDePago.fuente[0].tipoFideicomitente.Id,
      //     IdEntePublicoObligado: SolicitudDatos.fuenteDePago.fuente[0].fideicomitente.Id,
      //     NombreEntePublico: SolicitudDatos.fuenteDePago.fuente[0].fideicomitente.Descripcion,
      //     IdFondoOIngreso: SolicitudDatos.fuenteDePago.fuente[0].fondoIngreso.Id,
      //     NombreFondoOIngreso: SolicitudDatos.fuenteDePago.fuente[0].fondoIngreso.Descripcion,
      //     AfectadoTotalIngreso: SolicitudDatos.fuenteDePago.fuente[0].AfectadoTotalIngreso,
      //     EquivalenciaCorrespondienteMunicipios: SolicitudDatos?.fuenteDePago?.fuente[0]?.EquivalenciaCorrespondienteMunicipios,
      //   }
      // }
      const stateLP = useLargoPlazoStore.getState();
      console.log("ESTATUS PREVIO PARA EL CAMBIO DE ESTATUS", estatusPrevio);
      console.log("local storage IdUsuario", localStorage.getItem("IdUsuario"));
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-firmaDetalle",
          {
            IdPathDoc: inf.IdPathDoc,
            IdFirma: inf.IdFirma,

            IdSolicitud: estatusPrevio.Id,

            NumeroOficio: `${inf.NumeroOficio}`,
            TipoFirma: tipoFirmaDetalle,
            Asunto: inf.Asunto,
            Rfc: inf.Rfc,
            SerialCertificado: inf.SerialCertificado,
            FechaFirma: inf.FechaFirma,
            FechaDoc: inf.Fecha_doc,
            PathDoc: inf.PathDoc,
            CreadoPor: inf.IdUsuario,

            CancelacionInciadoPor: localStorage.getItem("IdUsuario"), //REVISAR
            NoEstatus: estatusPrevio.NoEstatus, //REVISAR
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
          //Para guardar los porcentajes acumulados ya inscritos
          if (filtro.inscripcion.TipoSolicitud === "Crédito Simple a Largo Plazo" && filtro.inscripcion.NoEstatus === "10") {

            //console.log("Entro para guardar los porcentajes acumulados");
            //console.log("filtro.inscripcion.TipoSolicitud", filtro.inscripcion.TipoSolicitud);


            const SolicitudDatos: IDatosCompletosSolicitud = JSON.parse(useInscripcionStore.getState().inscripcion.Solicitud)
            //console.log("SolicitudDatos", SolicitudDatos);


            //ESTO SOLO VA CUANDO LA FIRMA SE FIRMA COMO INSCRITO Y MODIFICAR EL PORCENTAJE UTILIZADO EN EN LA SOLICITUD EN LAS FFUENTES DE PAGO
            const DatosPorcentajesAcumulados = SolicitudDatos.fuenteDePago.fuente.map((fuente: any) => ({
              id: fuente.id || "",
              tipoFideicomitente: fuente?.tipoEntePublicoObligado || fuente?.tipoFideicomitente,
              fideicomitente: fuente?.entePublicoObligado || fuente?.fideicomitente || fuente?.mandatario,
              tipoFuente: fuente.tipoFuente,
              fondoIngreso: fuente.fondoIngreso,
              AfectadoTotalIngreso: fuente.AfectadoTotalIngreso,
              EquivalenciaCorrespondienteMunicipios: fuente.EquivalenciaCorrespondienteMunicipios,
              garantiaDePago: SolicitudDatos.fuenteDePago.garantiaDePago || "",
            }));
            createPorcentajesAcumulados(DatosPorcentajesAcumulados, 1).then((data) => stateLP.modificaAsignacionUtilizadoTipoSolicitud(
              // filtro.inscripcion.Id,
              SolicitudDatos.fuenteDePago.mecanismoVehiculoDePago.Id,
              DatosPorcentajesAcumulados,
              SolicitudDatos.fuenteDePago.mecanismoVehiculoDePago.Tipo,
              1
            ));


            //En cambio deberia haber una bandera que te diga que la solicitud esta en procesos de inscripcion e incrita 
          } else if (filtro.inscripcion.TipoSolicitud === "Crédito Simple a Largo Plazo" && filtro.inscripcion.NoEstatus === "19") {

            console.log("HOLA SI ENTRE A MODIFICAR LOS PORCENTAJES ACUMULADOS PARA LIBERAR ESPACIO");
            const SolicitudDatos: IDatosCompletosSolicitud = JSON.parse(useInscripcionStore.getState().inscripcion.Solicitud)

            const DatosPorcentajesAcumulados = SolicitudDatos.fuenteDePago.fuente.map((fuente: any) => ({
              id: fuente.id || "",
              tipoFideicomitente: fuente?.tipoEntePublicoObligado || fuente?.tipoFideicomitente,
              fideicomitente: fuente?.entePublicoObligado || fuente?.fideicomitente || fuente?.mandatario,
              tipoFuente: fuente.tipoFuente,
              fondoIngreso: fuente.fondoIngreso,
              AfectadoTotalIngreso: fuente.AfectadoTotalIngreso,
              EquivalenciaCorrespondienteMunicipios: fuente.EquivalenciaCorrespondienteMunicipios,
              garantiaDePago: SolicitudDatos.fuenteDePago.garantiaDePago || "",
            }));

            console.log("DatosPorcentajesAcumulados RESTAR PORCENTAJES ACUMULADOS", DatosPorcentajesAcumulados)
            createPorcentajesAcumulados(DatosPorcentajesAcumulados, 0).then((data) => stateLP.modificaAsignacionUtilizadoTipoSolicitud(
              // filtro.inscripcion.Id,
              SolicitudDatos.fuenteDePago.mecanismoVehiculoDePago.Id,
              DatosPorcentajesAcumulados,
              SolicitudDatos.fuenteDePago.mecanismoVehiculoDePago.Tipo,
              0
            ));


          } else {
            console.log("HOLA No entro para guardar los porcentajes acumulados");
            console.log("filtro.inscripcion.NoEstatus", filtro.inscripcion.NoEstatus);
          }


          //  let titulo =
          //    estatusPrevio.ControlInterno === "inscripcion"
          //      ? "Solicitud de Inscripción"
          //      : estatusPrevio.ControlInterno === "revision"
          //        ? "Solicitud de Requerimientos"

          //        : "Constancia de Inscripción";
          // let mensaje =
          //   estatusPrevio.ControlInterno === "inscripcion"
          //     ? `Se recibe el ${new Date().toLocaleString(
          //       "es-MX"
          //     )} el documento ${titulo} con el identificador: ${state.inscripcion.IdClaveInscripcion
          //     }`
          //     : `Se envía el ${new Date().toLocaleString(
          //       "es-MX"
          //     )} el documento ${titulo} con el identificador: ${state.inscripcion.IdClaveInscripcion
          //     }`;

          //  let oficio = `Solicitud ${state.inscripcion.IdClaveInscripcion}`;

          let titulo =
            (estatusPrevio.ControlInterno === "autorizado" && estatusPrevio.NoEstatus === "10" && tipoFirmaDetalle === "cancelacion")
              ? "Solicitud de Cancelación"
              : estatusPrevio.ControlInterno === "inscripcion"
                ? "Solicitud de Inscripción"
                : estatusPrevio.ControlInterno === "revision"
                  ? "Solicitud de Requerimientos"
                  : "Constancia de Inscripción";
          let mensaje =
            (estatusPrevio.ControlInterno === "inscripcion" || estatusPrevio.ControlInterno === "autorizado")
              ? `Se recibe el ${new Date().toLocaleString(
                "es-MX"
              )} el documento ${titulo} con el identificador: ${estatusPrevio.IdClaveInscripcion}`
              : `Se envía el ${new Date().toLocaleString(
                "es-MX"
              )} el documento ${titulo} con el identificador: ${estatusPrevio.IdClaveInscripcion}`;

          let oficio = `Solicitud ${estatusPrevio.IdClaveInscripcion}`;

          // else if (state.estatus === "Cancelacion") {
          //   borrarFirmaDetalle(state.idSolicitud, "En espera cancelación");
          // } else if (state.estatus === "Reestructura") {
          //   borrarFirmaDetalle(state.idSolicitud, "En espera cancelación");
          // }

          //Guardar Justificantes de Cancelacion
          if (tipoFirmaDetalle === "cancelacion") {
            const cancelacion = useCancelacionStore.getState();

            const cancelacionJustificacion = cancelacion.justificacion;
            const cancelacionAcreditacionDeLaCancelacion = cancelacion.documentacionCancelacion

            if (cancelacionJustificacion === "" || cancelacionAcreditacionDeLaCancelacion.length === 0) {
              alertaError("Faltan documentos por cargar");
              return;
            } else {
              stateCancelaciones.saveFilesCancelaciones(
                filtro.inscripcion.Id,
                process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/CANCELACIONES/${filtro.inscripcion.Id}`
              );
            }
          }

          if (tipoFirmaDetalle === "cancelacion" && estatusPrevio.NoEstatus === "12") {
            // agregar id del usuario 
          }



          //GeneraAcuse(titulo, mensaje, oficio, state.idSolicitud); 
          GeneraAcuse(titulo, mensaje, oficio, estatusPrevio.Id);

          /////////REVISA ESTO FERNANDO///////// ****************
          // console.log("Estatusprevio.ControlInterno", estatusPrevio.ControlInterno)
          // console.log("estatusPrevio.NoEstatus", estatusPrevio.NoEstatus)


          //Aqui ira el proceso para tomar el primer ID del usuario verificador con el estatus 2 
          // que este de la tabla trazabilidad, y este de convierta en el usuario EDITOR ******

          stateTrazabilidad.getPrimerUsuarioEstatus2(estatusPrevio.Id)
          console.log("estatusPrevio QUIERO EL ID ", estatusPrevio)


          cambiaEstatus(
            estatusPrevio.ControlInterno === "inscripcion"
              ? "4" // Revision // Asignaccion
              : estatusPrevio.NoEstatus === "8" ? "9" // 7 y 8
                : estatusPrevio.ControlInterno === "revision" &&
                  state.proceso === "actualizacion"
                  ? "9" //Antes 8// 
                  : estatusPrevio.NoEstatus === "10" // Antes 9
                    ? "11" // Antes 10
                    : estatusPrevio.NoEstatus === "11" && //Antes 10
                      state.proceso === "cancelacion"
                      ? "13" //actualizacion: era 13 pero se cambiara  //AQUI SE ASIGNA PROCESO CANCELACION //Antes 12
                      : estatusPrevio.ControlInterno === "cancelacion" &&
                        state.proceso === "actualizacion"
                        ? "18" // Antes 17 // Antes 16
                        : estatusPrevio.ControlInterno === "cancelado"
                          ? "20" //Antes 19// Antes 18
                          : estatusPrevio.NoEstatus === "21" // Antes 20// Antes 19 
                            ? "22" //Antes 21// Antes 20
                            : estatusPrevio.NoEstatus === "26" // Antes 24 Se agrego 2 por las 2 asignaciones nuevas // Antes 23
                              ? "27" // Antes 25 Se agrego 2 por las 2 asignaciones nuevas // Antes 24
                              : estatusPrevio.NoEstatus === "28"  // Antes 26 Se agrego 2 por las 2 asignaciones nuevas // Antes 25
                                ? "11" // Antes 10
                                : "13", // Antes 11
            estatusPrevio.Id,
            estatusPrevio.NoEstatus === "8" ? stateTrazabilidad.IdPrimerUsuarioEstatus2 : inf.IdUsuario,
            estatusPrevio.NoEstatus === "12" ? localStorage.getItem("IdUsuario") : ""
          );




          console.log("stateTrazabilidad.IdPrimerUsuarioEstatus2: ", stateTrazabilidad.IdPrimerUsuarioEstatus2)

          // cambiaEstatus(
          //   estatusPrevio.ControlInterno === "inscripcion"
          //     ? "4" // Revision // Asignaccion
          //     : estatusPrevio.NoEstatus === "7" ? "8"
          //       : estatusPrevio.ControlInterno === "revision" &&
          //         state.proceso === "actualizacion"
          //         ? "8"
          //         : estatusPrevio.NoEstatus === "9"
          //           ? "10"
          //           : estatusPrevio.NoEstatus === "10" &&
          //             state.proceso === "cancelacion"
          //             ? "12"
          //             : estatusPrevio.ControlInterno === "cancelacion" &&
          //               state.proceso === "actualizacion"
          //               ? "16"
          //               : estatusPrevio.ControlInterno === "cancelado"
          //                 ? "18"
          //                 : estatusPrevio.NoEstatus === "19"
          //                   ? "20"
          //                   : estatusPrevio.NoEstatus === "23"
          //                     ? "24"
          //                     : estatusPrevio.NoEstatus === "25"
          //                       ? "10"
          //                       : "11",
          //   estatusPrevio.Id,
          //   inf.IdUsuario,
          //   //oficio
          // );

        })
        .catch((err) => { });
    }
  },

  setUrl: (url: any) => set(() => ({ url: url })),
});

export async function createPorcentajesAcumulados(DatosPorcentajesAcumulados: any[], boo_Sumar: number) {

  const state = useFideicomisoStore.getState();
  console.log("DatosPorcentajesAcumulados", DatosPorcentajesAcumulados);

  console.log("Hola soy boo_Sumar:", boo_Sumar)
  const peticiones = DatosPorcentajesAcumulados.map(async (item) => {

    console.log("ITEM", item)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-PorcentajesAcumulados",
        {
          IdTipoEntePublicoObligado: item.tipoFideicomitente.Id,
          IdEntePublicoObligado: item.fideicomitente.Id,
          NombreEntePublico: item.fideicomitente.Descripcion,
          IdFondoOIngreso: item.fondoIngreso.Id,
          NombreFondoOIngreso: item.fondoIngreso.Descripcion,
          AfectadoTotalIngreso: item.AfectadoTotalIngreso || 0,
          EquivalenciaCorrespondienteMunicipios: item.EquivalenciaCorrespondienteMunicipios || 0,
          boo_Sumar: boo_Sumar,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log("DATA CREADA PORCENTAJE ACUMULADO", data?.data);
      return data;
    } catch (error: any) {
      console.error("ERROR", error);

      const mensajeError = error?.response?.data?.error || "Error desconocido al guardar los datos.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensajeError,
        confirmButtonColor: "#d33",
      });
      console.log("data?.data", error?.data);
      console.error("ERROR DATA", error?.response?.data || error.message);
      throw error; // Esto es importante para que Promise.all detecte errores
    }
  });

  try {
    await Promise.all(peticiones); // Espera que todas las peticiones terminen
    console.log("✅ Todos los porcentajes acumulados fueron creados");

    // if (state.idFideicomiso === "") {
    //   state.createFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
    // }

    // //quitar
    // else if (state.idFideicomiso !== "") {
    //   state.modificaFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
    // }

  } catch (error) {
    console.error("❌ Error al crear uno o más porcentajes acumulados:", error);
    // Puedes mostrar un mensaje al usuario si quieres
  }
}

export async function GeneraAcuseRespuesta(
  tipoSolicitud: string,
  noOficio: string,
  idRegistro: string,
  fraccionTexto: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse-respuesta",
      {
        tipoSolicitud: tipoSolicitud,
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
        fraccionTexto: fraccionTexto,
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
      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + "/ACUSE",
        //process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + "/CORTOPLAZO/ACUSE", 
        new File([response.data], `Acuse-${noOficio}.pdf`)
      );
      // setUrl(url);
    })
    .catch((err) => { }); // aqui
}

export async function GeneraFormatoReestructura(
  Solicitud: string,
  tipoSolicitud: string,
  noOficio: string,
  //idRegistro: string,
  idClaveInscripcion: string,
  setUrl: Function,
  //noRegistro: string,
  // fraccionTexto: string
) {
  const solicitud: any = JSON.parse(Solicitud);

  const state = useCortoPlazoStore.getState();

  const MontoALetras = state.convertirMontosAPalabras(
    solicitud?.informacionGeneral?.informacionGeneral?.monto.toString());

  const saldoVigenteLetra = state.convertirMontosAPalabras(
    solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente.toString());



  const SolicitudReestructura: any = {
    oficioNum: `DDPYPF-${"SR-"}${noOficio}-${new Date().getFullYear()}`,
    servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
    cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
    organismo: solicitud.encabezado.organismo.Organismo,
    oficioSolicitud: noOficio, //

    fechaSolicitud: format(new Date(), "PPP", {
      // AL MOMENTO
      locale: es,
    }),

    tipoDocumento: solicitud.encabezado.tipoDocumento.Descripcion,

    fechaContratacion: format(new Date(solicitud.encabezado.fechaContratacion), "PPP", {
      locale: es,
    }),

    claveInscripcion:
      idClaveInscripcion === undefined
        ? "Sin Clave de Inscripcion"
        : idClaveInscripcion,

    fechaClave: idClaveInscripcion,

    fechaReestructuracion: "FALTA CREAR LA TABLA Y GUARDAR CUANDO SE FINALIZO LA REESTRUCTURA CON SUS CAMBIOS", //guardar esa fecha al la hora de finalizarla 

    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0].entePublicoObligado
        : "No Aplica",

    obligadoSolidarioAval:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0].tipoEntePublicoObligado
        : ["No Aplica"],

    institucionFinanciera:
      solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

    montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,
    montoOriginalPalabras: MontoALetras,

    saldoVigente: solicitud.informacionGeneral.destinoGastosCostos[0].saldoVigente,
    saldoVigenteLetra: saldoVigenteLetra,

    mecanismoVehiculoDePago: solicitud.fuenteDePago.mecanismoVehiculoDePago.Tipo,
    fuentePago: solicitud.fuenteDePago?.fuente[0].fondoIngreso.Descripcion, //tabla "REVISAR"
    directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
    cargoDirectorGeneral:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
    modificaciones: "REVISAR",
  };
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK +
      "/create-pdf-constancia-reestructura",
      {
        // tipoSolicitud: tipoSolicitud,
        // oficioConstancia: noOficio,
        // fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        // hora: new Date().toLocaleString("es-MX").split(" ")[1],
        //fraccionTexto: fraccionTexto,
        oficioNum: SolicitudReestructura.noOficio,
        servidorPublico: SolicitudReestructura.servidorPublico,
        cargo: SolicitudReestructura.cargo,
        organismo: SolicitudReestructura.organismo,
        oficioSolicitud: SolicitudReestructura.oficioSolicitud,
        fechaSolicitud: SolicitudReestructura.fechaSolicitud,
        tipoDocumento: solicitud.encabezado.tipoDocumento.Descripcion,
        fechaContratacion: SolicitudReestructura.fechaContratacion,
        claveInscripcion: SolicitudReestructura.claveInscripcion,
        fechaClave: SolicitudReestructura.fechaClave,
        fechaReestructuracion: SolicitudReestructura.fechaReestructuracion,
        entePublicoObligado: SolicitudReestructura.entePublicoObligado,
        obligadoSolidarioAval: SolicitudReestructura.obligadoSolidarioAval,
        institucionFinanciera: SolicitudReestructura.institucionFinanciera,

        montoOriginalContratado: SolicitudReestructura.montoOriginalContratado,
        montoOriginalPalabras: MontoALetras,

        saldoVigente: SolicitudReestructura.saldoVigente,
        saldoVigenteLetra: saldoVigenteLetra,

        mecanismoVehiculoDePago: SolicitudReestructura.mecanismoVehiculoDePago,
        fuentePago: SolicitudReestructura.fuentePago,
        directorGeneral: SolicitudReestructura.directorGeneral,
        cargoDirectorGeneral: SolicitudReestructura.cargoDirectorGeneral,
        modificaciones: SolicitudReestructura.modificaciones,
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

      setUrl(url);
    })
    //   const state = useCortoPlazoStore.getState();

    //   state.guardaDocumentos(
    //     idRegistro,
    //     "/SRPU/CORTOPLAZO/ACUSE",
    //     new File(
    //       [response.data],
    //       `Acuse-respuesta-${tipoSolicitud}-${noOficio}.pdf`
    //     )
    //   );
    //   // setUrl(url);
    // })
    .catch((err) => { }); // aqui
}

export async function ConsultaSolicitud(setUrl: Function) {
  let inscripcion: IInscripcion = useInscripcionStore?.getState()?.inscripcion;
  let solicitud: ISolicitudLargoPlazo = JSON?.parse(inscripcion?.Solicitud);

  const state = useCortoPlazoStore.getState();

  const MontoALetras = state.convertirMontosAPalabras(solicitud?.informacionGeneral?.informacionGeneral?.monto.toString());

  const cantidadPeriodoGracia = (solicitud.condicionesFinancieras ?? []).filter(
    (condicion: ICondicionFinanciera) => condicion.pagosDeCapital?.periodoGracia === true
  ).length;

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-solicitud-corto",
      {
        oficioNum: inscripcion.NumeroRegistro,

        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,

        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,

        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,

        cargoServidorPublico: solicitud.encabezado.solicitanteAutorizado.Cargo,

        organismoServidorPublico: solicitud.encabezado.organismo.Organismo,

        institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

        fechaContratacion: format(new Date(solicitud.informacionGeneral.informacionGeneral.fechaContratacion), "PPP", {
          locale: es,
        }),

        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,

        montoOriginalPalabras: MontoALetras,

        entePublicoObligado: solicitud.informacionGeneral.obligadosSolidarios,

        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,

        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,


        //AQUI NECESITO SABER CUANTAS CONDICIOENS FINANCIERAS HABILITARON EL PERIODO DE GRACIA
        periodoGracia: cantidadPeriodoGracia,


        tasaInteres: solicitud.condicionesFinancieras[0]?.tasaInteres[0]?.tasaFija,

        comisiones: solicitud.condicionesFinancieras[0]?.comisiones[0]?.porcentaje,

        gastosAdicionales: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
          ? solicitud.informacionGeneral?.destinoGastosCostos[0]?.gastosAdicionales
          : "N/A",

        tasaEfectiva: solicitud.condicionesFinancieras[0]?.tasaEfectiva.tasaEfectiva,

        mecanismoVehiculoDePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
          ? solicitud.fuenteDePago?.mecanismoVehiculoDePago.Tipo
          : "N/A",

        fuentePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
          ? solicitud.fuenteDePago?.mecanismoVehiculoDePago?.NumeroRegistro
          : "N/A",

        garantiaDePago: inscripcion.TipoSolicitud.toLowerCase().includes("largo")
          ? solicitud.fuenteDePago?.garantiaDePago
          : "N/A",

        reglas: JSON.stringify(solicitud.inscripcion.declaratorias),
        documentos: JSON.stringify(solicitud.documentacion)
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

      setUrl(url);
    })
    .catch((err) => { });
}


export async function ConsultaSolicitudReestructura(setUrl: Function) {
  let inscripcion: IDatosSolicitudReestructura = useInscripcionStore?.getState()?.inscripcionReestructura;
  let solicitud: ISolicitudLargoPlazo = JSON?.parse(inscripcion?.SolicitudReestructura);


  //const solicitud: any = JSON.parse(Solicitud);

  const state = useCortoPlazoStore.getState();
  const MontoALetras = state.convertirMontosAPalabras(
    solicitud?.informacionGeneral?.informacionGeneral?.monto.toString());

  const saldoVigenteLetra = state.convertirMontosAPalabras(
    solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente.toString());


  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-solicitud-reestructura",
      {
        oficioNum: inscripcion.NumeroRegistro,
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        claveInscripcion: inscripcion.IdClaveInscripcion,
        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargoServidorPublico: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismoServidorPublico: solicitud.encabezado.organismo.Organismo,
        institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

        fechaContratacionSolicitud: format(new Date(solicitud.informacionGeneral.informacionGeneral.fechaContratacion), "PPP", {
          locale: es, // YAA FALTA MODIFICAR TAL VEZ
        }),

        fechaContratacionReestructura: format(new Date(solicitud.informacionGeneral.informacionGeneral.fechaContratacion), "PPP", {
          locale: es, // YAA FALTA MODIFICAR TAL VEZ
        }),

        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,// YAA
        montoOriginalPalabras: MontoALetras,

        entePublicoObligado:
          solicitud.informacionGeneral.obligadosSolidarios.length > 0
            ? solicitud.informacionGeneral.obligadosSolidarios[0].entePublicoObligado
            : "No Aplica",
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios.length > 0
            ? solicitud.informacionGeneral.obligadosSolidarios[0].tipoEntePublicoObligado
            : ["No Aplica"],
        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,
        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,

        periodoFinanciamiento: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.PeriodoFinanciamiento,
        periodoAdministracion: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.PeriodoAdminitracion,

        saldoVigente: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente,
        saldoVigenteLetra: saldoVigenteLetra,

        tasaInteres: solicitud.condicionesFinancieras[0]?.tasaInteres[0]?.tasaFija,
        comisiones: solicitud.condicionesFinancieras[0]?.comisiones[0]?.porcentaje,
        gastosAdicionales: solicitud.informacionGeneral?.destinoGastosCostos[0]?.gastosAdicionales,
        fuentePago: solicitud.fuenteDePago?.fuente[0]?.fondoIngreso.Descripcion,
        tasaEfectiva: solicitud.condicionesFinancieras[0]?.tasaEfectiva.tasaEfectiva,
        anexosClausulas: JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias),
        reglas: JSON.stringify(solicitud.inscripcion.declaratorias),
        documentos: JSON.stringify(solicitud.documentacion)
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

      setUrl(url);
    })
    .catch((err) => { });
}
export async function ConsultaRequerimientosReestructura(
  Solicitud: string,
  Requerimientos: {},
  NoOficio: string,
  setUrl: Function,
  idClaveInscripcion: string,
) {
  const solicitud: any = JSON.parse(Solicitud);

  const state = useCortoPlazoStore.getState();

  const MontoALetras = state.convertirMontosAPalabras(solicitud?.informacionGeneral?.informacionGeneral?.monto);


  const saldoVigenteLetra = state.convertirMontosAPalabras(
    solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente.toString());

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-constancia-reestructura",
      {

        //oficioRequerimiento: 1,
        oficioNum: NoOficio,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,

        claseTitulo: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.ClaseTitulo.Descripcion,

        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),

        tipoDocumento: "Solicitud de reestructuración",

        // fechaContratacion: format(new Date(), "PPP", {
        //   locale: es,
        // }),

        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,

        fechaContratacion: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),

        claveInscripcion: (idClaveInscripcion !== "" || idClaveInscripcion !== undefined)
          ? idClaveInscripcion
          : "Sin Id Clave de Inscripcion",

        fechaClave: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),

        fechaReestructuracion: format(new Date(), "PPP", {
          locale: es,
        }),

        entePublicoObligado: solicitud.encabezado.tipoEntePublico.TipoEntePublico,
        institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios.length > 0
            ? solicitud.informacionGeneral.obligadosSolidarios[0].tipoEntePublicoObligado
            : ["No Aplica"],

        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,
        montoOriginalPalabras: MontoALetras,

        saldoVigente: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente,
        saldoVigenteLetra: saldoVigenteLetra,

        mecanismoVehiculoDePago: solicitud.fuenteDePago.mecanismoVehiculoDePago.Tipo,
        fuentePago: solicitud.fuenteDePago?.fuente[0].fondoIngreso.Descripcion,

        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,
        autoriazcionReestructura: solicitud.SolicitudReestructuracion.autorizacionReestructura.NumeroAutorizacion,
        periodicidad: solicitud.condicionesFinancieras[0].pagosDeCapital.periodicidadDePago.Descripcion,

        comentarios: JSON.stringify(Requerimientos),
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
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

      setUrl(url);
    })
    .catch((err) => { });
}

export async function ConsultaRequerimientos(
  Solicitud: string,
  Requerimientos: {},
  NoOficio: string,
  setUrl: Function
) {
  const solicitud: any = JSON.parse(Solicitud);

  const state = useCortoPlazoStore.getState();

  const MontoALetras = state.convertirMontosAPalabras(solicitud?.informacionGeneral?.informacionGeneral?.monto);


  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-requerimientos",
      {
        oficioRequerimiento: 1,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,
        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),
        fechaContratacion: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        entePublicoObligado:
          solicitud.encabezado.tipoEntePublico.TipoEntePublico,
        institucionFinanciera:
          solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: solicitud.informacionGeneral.monto,
        montoOriginalPalabras: MontoALetras,
        comentarios: JSON.stringify(Requerimientos),
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral:
          solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
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

      setUrl(url);
    })
    .catch((err) => { });
}

export async function RegistroEstatalReestructura(
  Solicitud: string,
  NoOficio: string,
  setUrl: Function
) {
  const solicitud: any = JSON.parse(Solicitud);

  const state = useCortoPlazoStore.getState();
  const MontoALetras = state.convertirMontosAPalabras(
    solicitud?.informacionGeneral?.informacionGeneral?.monto.toString());


  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-contestacion-reestructura",
      {
        oficioNum: NoOficio,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,

        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),

        fechaRecepcion: format(new Date(), "PPP", {
          locale: es,
        }),

        claseTitulo: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.ClaseTitulo.Descripcion,

        fechaContratacion: format(new Date(), "PPP", {
          locale: es,
        }),

        noInscripcionEstatal: NoOficio,

        acreditado: solicitud.informacionGeneral.obligadosSolidarios.length > 0
          ? solicitud.informacionGeneral.obligadosSolidarios[0].entePublicoObligado
          : ["No Aplica"],

        acreditante: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        monto: solicitud.informacionGeneral.informacionGeneral.monto,
        montoOriginalPalabras: MontoALetras,

        //modificaciones: solicitud.modificaciones,


        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
        mecanismoVehiculoDePago: solicitud.fuenteDePago.mecanismoVehiculoDePago.Tipo,
        fuentePago: solicitud.fuenteDePago?.fuente[0].fondoIngreso.Descripcion,
        anexosClausulas: JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias),
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
      // console.log("JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias)", JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias));

      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      setUrl(url);
    })
    .catch((err) => { });
}


export async function ConsultaConstancia(
  Solicitud: string,
  NoOficio: string,
  setUrl: Function,
  montoOriginal: string
) {
  // const state = useCortoPlazoStore.getState();
  // const MontoALetras = state.convertirMontosAPalabras(montoOriginal.toString());

  const solicitud: any = JSON.parse(Solicitud);

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-constancia",
      {
        oficioConstancia: 1,
        servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,
        cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
        organismo: solicitud.encabezado.organismo.Organismo,
        oficioSolicitud: NoOficio,
        fechaSolicitud: format(new Date(), "PPP", {
          locale: es,
        }),
        tipoDocumento: solicitud.encabezado.tipoDocumento.Descripcion,
        fechaContratacion: format(
          new Date(solicitud.encabezado.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        claveInscripcion: "claveInscripcion",
        fechaClave: format(new Date(), "PPP", {
          locale: es,
        }),
        entePublicoObligado:
          solicitud.encabezado.tipoEntePublico.TipoEntePublico,
        obligadoSolidarioAval:
          solicitud.informacionGeneral.obligadosSolidarios.length > 0
            ? solicitud.informacionGeneral.obligadosSolidarios
            : ["No Aplica"],
        institucionFinanciera:
          solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
        montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,
        montoOriginalPalabras: montoOriginal,

        destino: solicitud.informacionGeneral.informacionGeneral.destino.Descripcion,
        plazo: solicitud.informacionGeneral.informacionGeneral.plazo,


        amortizaciones: "No Aplica",
        tasaInteres: "tasaInteres",
        tasaEfectiva: "tasaEfectiva",
        mecanismoVehiculoDePago: "No Aplica",
        fuentePago: "fuentePago",
        garantiaDePago: "No Aplica",
        instrumentoDerivado: "No Aplica",
        financiamientosARefinanciar: ["financiamientosARefinanciar"],
        directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
        cargoDirectorGeneral:
          solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
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

      console.log("MontoLetras en firma", montoOriginal);

      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      setUrl(url);
    })
    .catch((err) => { });
}

export async function GeneraAcuseEnvio(
  tipoSolicitud: string,
  noOficio: string,
  idRegistro: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse-enviado",
      {
        tipoSolicitud: tipoSolicitud,
        oficioConstancia: noOficio,
        fecha: new Date().toLocaleString("es-MX").split(" ")[0],
        hora: new Date().toLocaleString("es-MX").split(" ")[1],
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
      const state = useCortoPlazoStore.getState();

      state.guardaDocumentos(
        idRegistro,
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + "/CORTOPLAZO/ACUSE",
        new File([response.data], `Acuse-envio-${noOficio}.pdf`)
      );
    })
    .catch(() => { });
}

export async function GeneraAcuse(
  titulo: string,
  mensaje: string,
  oficio: string,
  idRegistro: string
) {
  //console.log("idRegistro en ACUSE ", idRegistro);

  let objBody = {
    mensaje: mensaje,
    oficio: oficio,
  }

  const state = useCortoPlazoStore.getState();


  state.getIdAcuse();
  console.log("state.idAcuse en generaAcuse", state.idAcuse);


  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque los meses van de 0-11
  const year = now.getFullYear();

  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const fileName = `Acuse-${oficio}-${year}${month}${day}_${hour}${minute}${second}.pdf`;

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-acuse",
      objBody,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      //console.log("response YA FIRMADO", response);
      //console.log("objBody", JSON.stringify(objBody));

      const state = useCortoPlazoStore.getState();

      // state.getIdAcuse()
      // console.log("state.idAcuse en generaAcuse", state.idAcuse);


      state.guardaDocumentos(
        idRegistro,
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/ACUSE/${idRegistro}`,
        new File([response.data], fileName), //new File([response.data], `Acuse-${oficio}.pdf`)
        "fab3bd8a-d1f3-11ef-be73-c4346b72f0ba"
        // state.idAcuse 
      );
    })

    .catch(() => { });
}

export const CambiaEstatus = (
  Estatus: string,
  IdSolicitud: string,
  IdEditor: string,
  IdCancelacionInciaiado?: string
) => {
  const state = useTrazabilidad.getState();
  console.log("Editor ID en cambia estatus", IdEditor);
  console.log("state.IdPrimerUsuarioEstatus2 en cambia estatus", state.IdPrimerUsuarioEstatus2)
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/cambiaEstatus",
      {
        Id: IdSolicitud,
        Estatus: Estatus,
        ModificadoPor: localStorage.getItem("IdCentral"),
        IdEditor: IdEditor === "" ? "N/A" : IdEditor,
        IdCancelacionInciaiado: IdCancelacionInciaiado || "Sin Registro"
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
      console.log("intento cambiar de estatus 2");
      return true;
    })
    .catch((err) => { });
};

export const getPdfAcuse = (
  id: string,
  noRegistro: string,
  fechaContratacion: string,
  IdPath: string
) => {
  let dataArray = new FormData();
  dataArray.append("id", id);
  dataArray.append("phrase", "");

  axios
    .post(process.env.REACT_APP_APPLICATION_FIEL + "/api/getfpdf", dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwt") || "",
      },
      responseType: "arraybuffer",
    })
    .then((r) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([r.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute("download", `${noRegistro}- ${fechaContratacion}.pdf`);
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
      if (IdPath !== "") {
        ActualizaDescarga(IdPath);
      }
    })
    .catch((err) => {
      alertaError("Error al intentar descargar documento pdf")
    });
};

export const getPdf = (
  id: string,
  noRegistro: string,
  fechaContratacion: string,
  IdPath: string
) => {
  let dataArray = new FormData();
  dataArray.append("id", id);
  dataArray.append("phrase", "");

  axios
    .post(process.env.REACT_APP_APPLICATION_FIEL + "/api/getfpdf", dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwt") || "",
      },
      responseType: "arraybuffer",
    })
    .then((r) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([r.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute("download", `${noRegistro}- ${fechaContratacion}.pdf`);
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
      if (IdPath !== "") {
        ActualizaDescarga(IdPath);
      }
    })
    .catch((err) => {
      alertaError("Error al intentar descargar documento pdf")
    });
};

export async function borrarFirmaDetalle(
  IdSolicitud: string,
  TipoFirma: string
) {
  await axios
    .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-firma", {
      data: {
        IdSolicitud: IdSolicitud,
        TipoFirma: TipoFirma,
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Se anuló la solicitud de cancelación con éxito",
        //   iconColor: "#AF8C55",
        //   showConfirmButton: false,
        //   color: "#AF8C55",
        //   timer: 3000,
        // });
        alertaExitoConfirm("Se anuló la solicitud de cancelación con éxito")
      }
      return true;
    })
    .catch(function () {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error, favor de intentar más tarde.",
      //   iconColor: "#AF8C55",
      //   showConfirmButton: false,
      //   color: "#AF8C55",
      //   timer: 2000,
      // });

      alertaErrorConfirm("Error, favor de intentar más tarde.")
    });
  return false;
}

export async function AnularCancelacionSolicitud(
  Solicitud: string,
  NumeroRegistro: string,
  causaAnulacion: string,
  UltimaModificacion: string,
  setUrl: Function
) {
  let solicitud: any = JSON.parse(Solicitud);
  const state = useCortoPlazoStore.getState();
  const MontoALetras = state.convertirMontosAPalabras(
    solicitud?.informacionGeneral?.informacionGeneral?.monto.toString());


  const SolicitudCancelacion: any = {
    numeroSolicitud: NumeroRegistro,
    UsuarioDestinatario: solicitud.inscripcion.servidorPublicoDirigido,
    EntidadDestinatario:
      solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
    UsuarioRemitente: solicitud.encabezado.solicitanteAutorizado.Nombre,
    EntidadRemitente: solicitud.encabezado.solicitanteAutorizado.Cargo,
    claveInscripcion:
      solicitud.ClaveDeInscripcion === undefined
        ? "Sin Clave de Inscripcion"
        : solicitud.ClaveDeInscripcion,

    fechaInscripcion: UltimaModificacion,

    fechaLiquidacion: solicitud.informacionGeneral.fechaVencimiento,
    fechaContratacion: solicitud.informacionGeneral.fechaContratacion,

    entePublicoObligado:
      solicitud.informacionGeneral.obligadosSolidarios.length > 0
        ? solicitud.informacionGeneral.obligadosSolidarios[0]
          .entePublicoObligado
        : "No Aplica",

    institucionFinanciera:
      solicitud.informacionGeneral.institucionFinanciera.Descripcion,
    montoOriginalContratado: solicitud.informacionGeneral.monto,
    montoOriginalPalabras: MontoALetras,
    causaAnulacion: causaAnulacion,
  };

  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-anular-cancelacion",
      {
        numeroSolicitud: SolicitudCancelacion.numeroSolicitud,
        UsuarioDestinatario: SolicitudCancelacion.UsuarioDestinatario,
        EntidadDestinatario: SolicitudCancelacion.EntidadDestinatario,
        UsuarioRemitente: SolicitudCancelacion.UsuarioRemitente,
        EntidadRemitente: SolicitudCancelacion.EntidadRemitente,
        claveInscripcion: SolicitudCancelacion.claveInscripcion,

        fechaInscripcion: format(
          new Date(SolicitudCancelacion.fechaInscripcion),
          "PPP",
          {
            locale: es,
          }
        ),

        fechaLiquidacion: format(
          new Date(SolicitudCancelacion.fechaLiquidacion),
          "PPP",
          {
            locale: es,
          }
        ),
        fechaContratacion: format(
          new Date(SolicitudCancelacion.fechaContratacion),
          "PPP",
          {
            locale: es,
          }
        ),
        entePublicoObligado: SolicitudCancelacion.entePublicoObligado,
        institucionFinanciera: SolicitudCancelacion.institucionFinanciera,
        montoOriginalContratado: SolicitudCancelacion.montoOriginalContratado,
        montoOriginalPalabras: MontoALetras,
        causaAnulacion: SolicitudCancelacion.causaAnulacion,
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

      setUrl(url);
    })
    .catch((err) => { });
}

// // CANCELACION DE SOLICITUD NUEVA

// export async function CancelacionSolicitud(setUrl: Function) {
//   const stateC = useCancelacionStore.getState();
//   const state = useInscripcionStore.getState();


//   let infoSolicitud: any = JSON.parse(state.inscripcion.Solicitud);
//   const MontoALetras = useCortoPlazoStore.getState().convertirMontosAPalabras(infoSolicitud.informacionGeneral.informacionGeneral.monto);


//  // const montoOriginalPalabras = useSolicitudFirmaStore.getState().convertirMontosAPalabras(infoSolicitud.informacionGeneral.informacionGeneral.monto);

//   let credito = state.inscripcion;
//   //let cancelacion = stateC.cancelacion;

//   console.log("CancelacionSolicitud ENTRO")

//   // console.log("montoOriginalPalabras CANCELACION", montoOriginalPalabras)

//   await axios
//     .post(
//       process.env.REACT_APP_APPLICATION_BACK +
//       "/create-pdf-solicitud-cancelacion",
//       {
//         numeroSolicitud: credito.NumeroRegistro,
//         UsuarioDestinatario: infoSolicitud.inscripcion.servidorPublicoDirigido,
//         EntidadDestinatario:
//           infoSolicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
//         UsuarioRemitente: infoSolicitud.encabezado.solicitanteAutorizado.Nombre,
//         EntidadRemitente: infoSolicitud.encabezado.organismo.Organismo,
//         claveInscripcion: credito.IdClaveInscripcion,
//         fechaInscripcion: format(new Date(credito.FechaCreacion), "PPP", {
//           locale: es,
//         }),
//         fechaLiquidacion: format(new Date(credito.FechaContratacion), "PPP", {
//           locale: es,
//         }),
//         fechaContratacion: format(new Date(credito.FechaContratacion), "PPP", {
//           locale: es,
//         }),
//         entePublicoObligado: credito.Nombre,
//         institucionFinanciera: //CORREGIDO

//           infoSolicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,

//         montoOriginalContratado: infoSolicitud.informacionGeneral.informacionGeneral.monto,
//         montoOriginalPalabras: MontoALetras,

//         causaCancelacion: stateC.justificacion,
//         documentoAcreditacionCancelacion: stateC.documentacionCancelacion.find(
//           doc => doc.TipoArchivoJustificacion === "Acreditacion De La Cancelacion")?.nombreArchivo,
//         documentoBajaCreditoFederal: stateC.documentacionCancelacion.find(
//           doc => doc.TipoArchivoJustificacion === "Baja De Credito Federal")?.nombreArchivo,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("jwtToken"),
//           "Access-Control-Allow-Origin": "*",
//         },
//         responseType: "arraybuffer",
//       }
//     )
//     .then((response) => {
//       const a = window.URL || window.webkitURL;
//       const url = a.createObjectURL(
//         new Blob([response.data], { type: "application/pdf" })
//       );

//       console.log("URL, cancelaciones xD", url);

//       //  state.saveFiles(
//       //    response.data.Id,
//       //    process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/CANCELACIONES/DOCSOL/${response.data.Id}`
//       //  );

//       // console.log("URL, cancelaciones xD", url);

//       setUrl(url);
//     })
//     .catch((err) => { });
// }