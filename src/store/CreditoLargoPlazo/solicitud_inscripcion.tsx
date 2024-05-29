import { StateCreator } from "zustand";
import axios from "axios";
import { useLargoPlazoStore } from "./main";
import Swal from "sweetalert2";
import { useInscripcionStore } from "../Inscripcion/main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { ISolicitudLargoPlazo } from "../Inscripcion/inscripcion";

export interface SolicitudInscripcionLargoPlazoSlice {
  inscripcion: {
    servidorPublicoDirigido: string;
    cargo: string;
  };

  reglasAplicables: string[];

  changeInscripcion: (servidorPublicoDirigido: string, cargo: string) => void;
  setReglasAplicables: (newReglas: string[]) => void;

  crearSolicitud: (
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  modificaSolicitud: (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  borrarSolicitud: (Id: string) => void;

  eliminarRequerimientos: (Id: string, setState: Function) => void;

  saveFiles: (idRegistro: string, ruta: string) => void;

  guardaDocumentos: (idRegistro: string, ruta: string, archivo: File) => void;

  savePathDoc: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;
}

export const createSolicitudInscripcionLargoPlazoSlice: StateCreator<
  SolicitudInscripcionLargoPlazoSlice
> = (set, get) => ({
  inscripcion: {
    servidorPublicoDirigido: "Rosalba Aguilar Díaz",
    cargo: "Directora de Deuda Pública y Planeación Financiera",
  },

  reglasAplicables: [],

  changeInscripcion: (inscripcion: any) =>
    set(() => ({ inscripcion: inscripcion })),

  setReglasAplicables: (newReglas: any) =>
    set(() => ({ reglasAplicables: newReglas })),

  crearSolicitud: async (
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const lpState = useLargoPlazoStore.getState();
    const cpState = useCortoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

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
    };

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-solicitud",
        {
          IdTipoEntePublico: lpState.encabezado.tipoEntePublico.Id,
          IdEntePublico: lpState.encabezado.organismo.Id,
          TipoSolicitud: lpState.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            lpState.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: `DDPYPF-${"CSCLP"}/${new Date().getFullYear()}`,
          MontoOriginalContratado: lpState.informacionGeneral.monto,
          FechaContratacion: lpState.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: localStorage.getItem("IdUsuario"),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        inscripcionState.setInscripcion(data.data);
        cpState.addComentario(data.data.Id, comentario, "Captura");
        lpState.saveFiles(
          data.data.Id,
          `/SRPU/LARGOPLAZO/DOCSOL/${data.data.Id}`
        );
      });
  },
  modificaSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const lpState = useLargoPlazoStore.getState();
    const cpState = useCortoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

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
    };

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-solicitud",
        {
          IdSolicitud: inscripcionState.inscripcion.Id,
          IdTipoEntePublico: lpState.encabezado.tipoEntePublico.Id,
          IdEntePublico: lpState.encabezado.organismo.Id,
          TipoSolicitud: lpState.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            lpState.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: "1",
          MontoOriginalContratado: lpState.informacionGeneral.monto,
          FechaContratacion: lpState.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          IdUsuario: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        cpState.deleteFiles(`/SRPU/LARGOPLAZO/DOCSOL/${data.data.Id}`);
        lpState.saveFiles(
          data.data.Id,
          `/SRPU/LARGOPLAZO/DOCSOL/${data.data.Id}`
        );
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
      .catch((e) => {});
  },

  saveFiles: async (idRegistro: string, ruta: string) => {
    const state = useLargoPlazoStore.getState();

    return await state.tablaDocumentos.map((file: any) => {
      return setTimeout(() => {
        const url = new File([file.archivo], file.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);

        if (file.archivo) {
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
                data.RESPONSE.NOMBREARCHIVO
              );
            })
            .catch((e) => {});
        } else {
          return null;
        }
      }, 1000);
    });
  },

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
            data.RESPONSE.NOMBREARCHIVO
          );
        })
        .catch((e) => {});
    } else {
      return null;
    }
  },

  savePathDoc: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocSol",
        {
          IdSolicitud: idSolicitud,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {})
      .catch((e) => {});
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
    .catch((err) => {});
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
