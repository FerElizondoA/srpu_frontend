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

export interface SolicitudFirmaSlice {
  proceso: string;
  url: string;
  infoDoc: string;

  catalogoFirmaDetalle: IDataFirmaDetalle;
  getCatalogoFirmaDetalle: (IdSolicitud: string, TipoFirma: string) => void;

  setProceso: (estatus: string) => void;
  changeInfoDoc: (info: string, cambiaEstatus: Function) => void;

  convertirMontosAPalabras: (numeroConFormato: string) => void;


  setUrl: (url: string) => void;
}

export const createSolicitudFirmaSlice: StateCreator<SolicitudFirmaSlice> = (
  set,
  get
) => ({


  convertirMontosAPalabras(numeroConFormato: string): string {

    // Limpia el formato de moneda para extraer solo el número
    function limpiarFormatoMoneda(monto: string): number {
      const montoLimpio = monto.replace(/[^0-9.]/g, '');
      return parseFloat(montoLimpio);
    }

    const numeroFloat = limpiarFormatoMoneda(numeroConFormato);
    const parteEntera = Math.floor(numeroFloat); // Parte entera del número
    const centavos = Math.round((numeroFloat - parteEntera) * 100); // Parte decimal (centavos)

    const unidades: string[] = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas: string[] = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    // Función para convertir el número entero a palabras
    function convertirNumeroAPalabras(numero: number): string {
      if (numero === 0) return 'cero';
      if (numero < 10) return unidades[numero];
      if (numero < 20) return especiales[numero - 10];
      if (numero < 100) return convertirDecenas(numero);
      if (numero < 1000) return convertirCentenas(numero);
      if (numero < 1000000) return convertirMiles(numero);
      if (numero < 1000000000000) return convertirMillones(numero);

      return 'Número demasiado grande';
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
      const millones = Math.floor(numero / 1000000);
      const resto = numero % 1000000;
      if (millones === 1) return 'un millón ' + (resto > 0 ? convertirMiles(resto) : '');
      return convertirNumeroAPalabras(millones) + ' millones ' + (resto > 0 ? convertirMiles(resto) : '');
    }

    // Convertir la parte entera del monto a palabras
    let parteEnteraEnPalabras = convertirNumeroAPalabras(parteEntera);

    // Agregar "pesos" y manejar los centavos
    const centavosEnPalabras = centavos > 0 ? ` ${centavos}/100 M.N.` : ' 00/100 M.N.';
    parteEnteraEnPalabras += ` pesos${centavosEnPalabras}`;

    return parteEnteraEnPalabras;
  },

  //  convertirMontosAPalabras (numeroConFormato: string): string  {


  //   function limpiarFormatoMoneda(monto: string): number {
  //     const montoLimpio = monto.replace(/[^0-9.]/g, '');
  //     return parseFloat(montoLimpio);
  //   }

  //   const numeroFloat = limpiarFormatoMoneda(numeroConFormato)

  //   const unidades: string[] = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  //   const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  //   const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  //   const centenas: string[] = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  //   function convertirNumeroAPalabras(numero: number): string {
  //     if (numero === 0) return 'cero';
  //     if (numero < 10) return unidades[numero];
  //     if (numero < 20) return especiales[numero - 10];
  //     if (numero < 100) return convertirDecenas(numero);
  //     if (numero < 1000) return convertirCentenas(numero);
  //     if (numero < 1000000) return convertirMiles(numero);
  //     if (numero < 1000000000000) return convertirMillones(numero);

  //     return 'Número demasiado grande';
  //   }

  //   function convertirDecenas(numero: number): string {
  //     const decena = Math.floor(numero / 10);
  //     const unidad = numero % 10;
  //     if (numero < 30) {
  //       return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
  //     }
  //     return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
  //   }

  //   function convertirCentenas(numero: number): string {
  //     const centena = Math.floor(numero / 100);
  //     const resto = numero % 100;
  //     if (numero === 100) return 'cien';
  //     return centenas[centena] + (resto > 0 ? ' ' + convertirDecenas(resto) : '');
  //   }

  //   function convertirMiles(numero: number): string {
  //     const miles = Math.floor(numero / 1000);
  //     const resto = numero % 1000;
  //     if (miles === 1) return 'mil ' + (resto > 0 ? convertirCentenas(resto) : '');
  //     return convertirNumeroAPalabras(miles) + ' mil ' + (resto > 0 ? convertirCentenas(resto) : '');
  //   }

  //   function convertirMillones(numero: number): string {
  //     const millones = Math.floor(numero / 1000000);
  //     const resto = numero % 1000000;
  //     if (millones === 1) return 'un millón ' + (resto > 0 ? convertirMiles(resto) : '');
  //     return convertirNumeroAPalabras(millones) + ' millones ' + (resto > 0 ? convertirMiles(resto) : '');
  //   }

  //   return convertirNumeroAPalabras(numeroFloat);
  // },




  // convertirMontosAPalabras: (numeroString: string) => {

  //   const montoLimpio = parseFloat(numeroString.replace(/[^0-9.]/g, ''));

  //   const unidades: string[] = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  //   const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  //   const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  //   const centenas: string[] = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];


  //     if (montoLimpio === 0) return 'cero';
  //     if (montoLimpio < 10) return unidades[montoLimpio];
  //     if (montoLimpio < 20) return especiales[montoLimpio - 10];
  //     if (montoLimpio < 100) return convertirDecenas(montoLimpio);
  //     if (montoLimpio < 1000) return convertirCentenas(montoLimpio);
  //     if (montoLimpio < 1000000) return convertirMiles(montoLimpio);
  //     if (montoLimpio < 1000000000000) return convertirMillones(montoLimpio);
  //     return 'Número demasiado grande';


  //   function convertirDecenas(numero: number): string {
  //     const decena = Math.floor(numero / 10);
  //     const unidad = numero % 10;

  //     if (numero < 30) {
  //       return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
  //     }

  //     return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
  //   }

  //   function convertirCentenas(numero: number): string {
  //     const centena = Math.floor(numero / 100);
  //     const resto = numero % 100;

  //     if (numero === 100) return 'cien';
  //     return centenas[centena] + (resto > 0 ? ' ' + convertirDecenas(resto) : '');
  //   }

  //   function convertirMiles(numero: number): string {
  //     const miles = Math.floor(numero / 1000);
  //     const resto = numero % 1000;

  //     if (miles === 1) return 'mil ' + (resto > 0 ? convertirCentenas(resto) : '');
  //     return convertirCentenas(miles) + ' mil ' + (resto > 0 ? convertirCentenas(resto) : '');
  //   }

  //   function convertirMillones(numero: number): string {
  //     const millones = Math.floor(numero / 1000000);
  //     const resto = numero % 1000000;

  //     if (millones === 1) return 'un millón ' + (resto > 0 ? convertirMiles(resto) : '');
  //     return convertirCentenas(millones) + ' millones ' + (resto > 0 ? convertirMiles(resto) : '');
  //   }
  // },

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
    //console.log("info", info)

    set(() => ({ infoDoc: info }));

    if (info) {
      let validacionReestructura = false

      const inf = JSON.parse(info);

      const BusquedaTipoDocumentoAcuse = useCortoPlazoStore.getState();
    
      const idAcuse = ""
      BusquedaTipoDocumentoAcuse.getIdAcuse(idAcuse)

      const filtro = useInscripcionStore.getState();
      let state: any;

      let estatusPrevio = {
        Id: "",
        NoEstatus: "",
        Estatus: "",
        ControlInterno: "",
        IdClaveInscripcion: ""
      };

      console.log("FILTRO INFORMACION", filtro);


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
          IdClaveInscripcion: state.IdClaveInscripcion //prueba reviar 07/01/2025
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
            IdClaveInscripcion: state.IdClaveInscripcion //prueba reviar 07/01/2025

          }
        } else {
          console.log("Entre al ELSE de state Filtro.insciprion", filtro.inscripcion);

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

      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-firmaDetalle",
          {
            IdPathDoc: inf.IdPathDoc,
            IdFirma: inf.IdFirma,

            IdSolicitud: estatusPrevio.Id,

            NumeroOficio: `${inf.NumeroOficio}`,
            Asunto: inf.Asunto,
            Rfc: inf.Rfc,
            SerialCertificado: inf.SerialCertificado,
            FechaFirma: inf.FechaFirma,
            FechaDoc: inf.Fecha_doc,
            PathDoc: inf.PathDoc,
            CreadoPor: inf.IdUsuario,
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
          console.log("response: ", response)
          console.log("estatusPrevio", estatusPrevio);



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
            estatusPrevio.ControlInterno === "inscripcion"
              ? "Solicitud de Inscripción"
              : estatusPrevio.ControlInterno === "revision"
                ? "Solicitud de Requerimientos"
                : "Constancia de Inscripción";
          let mensaje =
            estatusPrevio.ControlInterno === "inscripcion"
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

          //GeneraAcuse(titulo, mensaje, oficio, state.idSolicitud); // CORREGIR
          GeneraAcuse(titulo, mensaje, oficio, estatusPrevio.Id); 

          cambiaEstatus(
            estatusPrevio.ControlInterno === "inscripcion"
              ? "4"
              :estatusPrevio.NoEstatus === "7" ? "8" 
              : estatusPrevio.ControlInterno === "revision" &&
                state.proceso === "actualizacion"
                ? "8"
                : estatusPrevio.NoEstatus === "9"
                  ? "10"
                  : estatusPrevio.NoEstatus === "10" &&
                    state.proceso === "cancelacion"
                    ? "12"
                    : estatusPrevio.ControlInterno === "cancelacion" &&
                      state.proceso === "actualizacion"
                      ? "16"
                      : estatusPrevio.ControlInterno === "cancelado"
                        ? "18"
                        : estatusPrevio.NoEstatus === "19"
                          ? "20"
                          : estatusPrevio.NoEstatus === "23"
                            ? "24"
                            : estatusPrevio.NoEstatus === "25"
                              ? "10"
                              : "11",
            estatusPrevio.Id,
            inf.IdUsuario,
            //oficio
          );

        })
        .catch((err) => { });
    }
  },

  setUrl: (url: any) => set(() => ({ url: url })),
});

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

// export async function ConsultaRequerimientosReestructura(
//   Solicitud: string,
//   Requerimientos: {},
//   NoOficio: string,
//   setUrl: Function,
//   idClaveInscripcion: string,
// ) {
//   const solicitud: any = JSON.parse(Solicitud);

//   function limpiarFormatoMoneda(monto: string): number {
//     // Elimina el símbolo de peso y las comas
//     const montoLimpio = monto.replace(/[^0-9.]/g, '');
//     return parseFloat(montoLimpio);
//   }

//   function convertirMontosAPalabras (numero: number)  {
//     const unidades: string[] = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
//     const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
//     const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
//     const centenas: string[] = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

//     function convertirNumeroAPalabras(numero: number): string {
//       if (numero === 0) return 'cero';

//       if (numero < 10) return unidades[numero];
//       if (numero < 20) return especiales[numero - 10];
//       if (numero < 100) return convertirDecenas(numero);
//       if (numero < 1000) return convertirCentenas(numero);
//       if (numero < 1000000) return convertirMiles(numero);
//       if (numero < 1000000000000) return convertirMillones(numero);

//       return 'Número demasiado grande';
//     }

//     function convertirDecenas(numero: number): string {
//       const decena = Math.floor(numero / 10);
//       const unidad = numero % 10;

//       if (numero < 30) {
//         return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
//       }

//       return decenas[decena] + (unidad > 0 ? ' y ' + unidades[unidad] : '');
//     }

//     function convertirCentenas(numero: number): string {
//       const centena = Math.floor(numero / 100);
//       const resto = numero % 100;

//       if (numero === 100) return 'cien';
//       return centenas[centena] + (resto > 0 ? ' ' + convertirDecenas(resto) : '');
//     }

//     function convertirMiles(numero: number): string {
//       const miles = Math.floor(numero / 1000);
//       const resto = numero % 1000;

//       if (miles === 1) return 'mil ' + (resto > 0 ? convertirCentenas(resto) : '');
//       return convertirCentenas(miles) + ' mil ' + (resto > 0 ? convertirCentenas(resto) : '');
//     }

//     function convertirMillones(numero: number): string {
//       const millones = Math.floor(numero / 1000000);
//       const resto = numero % 1000000;

//       if (millones === 1) return 'un millón ' + (resto > 0 ? convertirMiles(resto) : '');
//       return convertirCentenas(millones) + ' millones ' + (resto > 0 ? convertirMiles(resto) : '');
//     }

//   }

//   const montoLimpio = limpiarFormatoMoneda(solicitud?.informacionGeneral?.informacionGeneral?.monto)

//   const palabras = convertirMontosAPalabras(Math.floor(montoLimpio));

//   console.log("solicitud?.solicitud?.informacionGeneral?.informacionGeneral?.monto", solicitud?.informacionGeneral?.informacionGeneral?.monto)
//   console.log("Palabra", palabras)

//   await axios
//     .post(
//       process.env.REACT_APP_APPLICATION_BACK + "/create-pdf-constancia-reestructura",
//       {

//         //oficioRequerimiento: 1,
//         oficioNum: NoOficio,
//         servidorPublico: solicitud.encabezado.solicitanteAutorizado.Nombre,

//         claseTitulo: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.ClaseTitulo.Descripcion,

//         cargo: solicitud.encabezado.solicitanteAutorizado.Cargo,
//         fechaSolicitud: format(new Date(), "PPP", {
//           locale: es,
//         }),

//         tipoDocumento: "Solicitud de reestructuración",

//         // fechaContratacion: format(new Date(), "PPP", {
//         //   locale: es,
//         // }),

//         organismo: solicitud.encabezado.organismo.Organismo,
//         oficioSolicitud: NoOficio,

//         fechaContratacion: format(
//           new Date(solicitud.encabezado.fechaContratacion),
//           "PPP",
//           {
//             locale: es,
//           }
//         ),

//         claveInscripcion: (idClaveInscripcion !== "" || idClaveInscripcion !== undefined)
//           ? idClaveInscripcion
//           : "Sin Id Clave de Inscripcion",

//         fechaClave: format(
//           new Date(solicitud.encabezado.fechaContratacion),
//           "PPP",
//           {
//             locale: es,
//           }
//         ),

//         fechaReestructuracion: format(new Date(), "PPP", {
//           locale: es,
//         }),

//         entePublicoObligado: solicitud.encabezado.tipoEntePublico.TipoEntePublico,
//         institucionFinanciera: solicitud.informacionGeneral.informacionGeneral.institucionFinanciera.Descripcion,
//         obligadoSolidarioAval:
//           solicitud.informacionGeneral.obligadosSolidarios.length > 0
//             ? solicitud.informacionGeneral.obligadosSolidarios[0].tipoEntePublicoObligado
//             : ["No Aplica"],

//         montoOriginalContratado: solicitud.informacionGeneral.informacionGeneral.monto,
//         montoPalabra: palabras,

//         saldoVigente: solicitud.SolicitudReestructuracion.ReestructuraDeclaratorias.SalgoVigente,
//         mecanismoVehiculoDePago: solicitud.fuenteDePago.mecanismoVehiculoDePago.Tipo,
//         fuentePago: solicitud.fuenteDePago?.fuente[0].fondoIngreso.Descripcion,

//         plazo: solicitud.informacionGeneral.informacionGeneral.plazo,
//         autoriazcionReestructura: solicitud.SolicitudReestructuracion.autorizacionReestructura.NumeroAutorizacion,
//         periodicidad: solicitud.condicionesFinancieras[0].pagosDeCapital.periodicidadDePago.Descripcion,

//         comentarios: JSON.stringify(Requerimientos),
//         directorGeneral: solicitud.inscripcion.servidorPublicoDirigido,
//         cargoDirectorGeneral: solicitud.inscripcion.cargoServidorPublicoServidorPublicoDirigido,
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

//       setUrl(url);
//     })
//     .catch((err) => { });
// }




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
      console.log("JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias)", JSON.stringify(solicitud.SolicitudReestructuracion.tablaDeclaratorias));

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
  console.log("idRegistro en ACUSE ", idRegistro);

  let objBody={
    titulo: titulo,
    mensaje: mensaje,
    oficio: oficio,
  }
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
      console.log("response YA FIRMADO", response);
      console.log("objBody",JSON.stringify(objBody));
      
      const state = useCortoPlazoStore.getState();

      // state.getIdAcuse()
      // console.log("state.idAcuse en generaAcuse", state.idAcuse);
      

      state.guardaDocumentos(
        idRegistro,
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/ACUSE/${idRegistro}`,
        new File([response.data], `Acuse-${oficio}.pdf`)
      );
    })
    .catch(() => { });
}

export const CambiaEstatus = (
  Estatus: string,
  IdSolicitud: string,
  IdEditor: string
) => {
  console.log("intento cambiar de estatus 1");
  console.log("Estatus res", Estatus);
  console.log("IdEditor res", IdEditor);
  console.log("IdSolicitud res", IdSolicitud);

  return axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/cambiaEstatus",
      {
        Id: IdSolicitud,
        Estatus: Estatus,
        ModificadoPor: localStorage.getItem("IdCentral"),
        IdEditor: IdEditor === "" ? "N/A" : IdEditor,
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
