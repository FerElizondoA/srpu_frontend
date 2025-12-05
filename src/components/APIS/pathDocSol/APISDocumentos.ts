import axios from "axios";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { alertaError, alertaExito } from "../../../generics/Alertas";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { ISoporteDocumentalFuentePago } from "../../../store/Fideicomiso/fideicomiso";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IAutorizaciones } from "../../../store/CreditoLargoPlazo/autorizacion";
import { IGastosCostos } from "../../../store/CreditoLargoPlazo/informacion_general";

export async function getPathDocumentos(
  IdSolicitud: string,
  setState: Function
) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocSol",
    params: { IdSolicitud: IdSolicitud },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {

      if (!data.data[0].error) {
        setState(data.data);
      }
    })
    .catch((error) => { });
}

export async function getPathDocumentosCancelacion(
  IdSolicitud: string,
  setState: Function
) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocCancelacion",
    params: { IdSolicitud: IdSolicitud },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {

      if (!data.data[0].error) {
        setState(data.data);
      }
    })
    .catch((error) => { });
}


export async function getPathAcuses(
  IdSolicitud: string,
  setState: Function
) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocAcuses",
    params: { IdSolicitud: IdSolicitud },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      if (!data.data[0].error) {
        setState(data.data);
      }
    })
    .catch((error) => { });
}

export async function getPathDocumentosAut(IdAut: string, setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocAut",
    params: { IdAutorizacion: IdAut },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => { });
}

export async function getPathDocumentosFideicomiso(
  IdFideicomiso: string,
  setState: Function
) {
  await axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocFideicomiso",
    params: { IdFideicomiso: IdFideicomiso },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => { });
}

export async function getPathDocumentosMandato(
  IdMandato: string,
  setState: Function
) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-DetailPathDocMandato",
    params: { IdMandato: IdMandato },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => { });
}

export const getDocumentosResumen = async (
  ROUTE: string,
  setState: Function,
  setLoad: Function,
  TipoSolicitud?: string
) => {
  const state = TipoSolicitud === "CortoPlazo"
    ? useCortoPlazoStore.getState()
    : TipoSolicitud === "LargoPlazo"
      ? useLargoPlazoStore.getState()
      : useCortoPlazoStore.getState();

  console.log("ROUTE en getDocumentos:", ROUTE);
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      {
        ROUTE: ROUTE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          responseType: "blob",
        },
      }
    )
    .then(({ data }) => {
      let files = data.RESPONSE;

      console.log('el conchesumadre files:', files);
      console.log('el conchesumadre state.tablaDocumentos:', state.tablaDocumentos);
      const auxArrayArchivos = state.tablaDocumentos.map((documento: any) => {

        const archivo = files.find((file: any) => file.NOMBRE === documento.nombreArchivo);
        console.log("archivo.FILE", archivo)

        if (archivo) {
          console.log("archivo encontrado", archivo);
          return {
            ...documento,
            archivo: archivo.FILE,
            nombreArchivo: archivo.NOMBRE,
            size: archivo.SIZE
          };
        }
        console.log(" archivo para:", documento);
        return documento;
      });

      console.log("auxArrayArchivos", auxArrayArchivos);

      state.setTablaDocumentos(auxArrayArchivos);


      // files.map((file: any, index: any) => {
      //   let auxArrayArchivos = [...state.tablaDocumentos];
      //   auxArrayArchivos[index].archivo = file.FILE;
      //   auxArrayArchivos[index].nombreArchivo = file.NOMBRE;
      //   console.log('el conchesumadre auxArrayArchivos',auxArrayArchivos);

      //   return state.setTablaDocumentos(auxArrayArchivos);
      // });

      setState(files);
      setLoad(false);
    })
    .catch((r) => { });
};


export const getDocumentosGastosCostos = async (
  ROUTE: string,
  setState: Function,
  setLoad: Function,
) => {
  const state = useLargoPlazoStore.getState()


  console.log("ROUTE en getDocumentos:", ROUTE);
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      {
        ROUTE: ROUTE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          responseType: "blob",
        },
      }
    )
    .then(({ data }) => {
      let files = data.RESPONSE;

      console.log('FILE tablaGastosCostos el conchesumadre files:', files);
      console.log('el conchesumadre state.tablaDocumentos:', state.tablaGastosCostos);
      const auxArrayArchivos : IGastosCostos[] = state.tablaGastosCostos.map((documento: IGastosCostos) => {
        const archivo = files.find((file: any) => file.NOMBRE === documento.archivoDetalleInversion.nombreArchivo);
        console.log("archivo.FILE", archivo);

        if (archivo) {
          console.log("archivo encontrado", archivo);
          return {
            ...documento,
            archivoDetalleInversion: {
              ...documento.archivoDetalleInversion,
              archivo: archivo.FILE,
              nombreArchivo: archivo.NOMBRE,
              size: archivo.SIZE
            }
          };
        }
        console.log(" archivo para:", documento);
        return documento;
      });

      console.log("auxArrayArchivos", auxArrayArchivos);

      // Ensure auxArrayArchivos is IGastosCostos[]
      state.setTablaGastosCostos(auxArrayArchivos);


      // files.map((file: any, index: any) => {
      //   let auxArrayArchivos = [...state.tablaDocumentos];
      //   auxArrayArchivos[index].archivo = file.FILE;
      //   auxArrayArchivos[index].nombreArchivo = file.NOMBRE;
      //   console.log('el conchesumadre auxArrayArchivos',auxArrayArchivos);

      //   return state.setTablaDocumentos(auxArrayArchivos);
      // });

      setState(files);
      setLoad(false);
    })
    .catch((r) => { });
};


export const getDocumentos = async (
  ROUTE: string,
  setState: Function,
  setLoad: Function,
  TipoSolicitud?: string
) => {
  const state = useCortoPlazoStore.getState()


  console.log("ROUTE en getDocumentos:", ROUTE);
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      {
        ROUTE: ROUTE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          responseType: "blob",
        },
      }
    )
    .then(({ data }) => {
      let files = data.RESPONSE;

      console.log('el conchesumadre files:', files);
      console.log('el conchesumadre state.tablaDocumentos:', state.tablaDocumentos);
      const auxArrayArchivos = state.tablaDocumentos.map((documento: any) => {

        const archivo = files.find((file: any) => file.NOMBRE === documento.nombreArchivo);
        console.log("archivo.FILE", archivo)

        if (archivo) {
          console.log("archivo encontrado", archivo);
          return {
            ...documento,
            archivo: archivo.FILE,
            nombreArchivo: archivo.NOMBRE,
            size: archivo.SIZE
          };
        }
        console.log(" archivo para:", documento);
        return documento;
      });

      console.log("auxArrayArchivos", auxArrayArchivos);

      state.setTablaDocumentos(auxArrayArchivos);


      // files.map((file: any, index: any) => {
      //   let auxArrayArchivos = [...state.tablaDocumentos];
      //   auxArrayArchivos[index].archivo = file.FILE;
      //   auxArrayArchivos[index].nombreArchivo = file.NOMBRE;
      //   console.log('el conchesumadre auxArrayArchivos',auxArrayArchivos);

      //   return state.setTablaDocumentos(auxArrayArchivos);
      // });

      setState(files);
      setLoad(false);
    })
    .catch((r) => { });
};

export const descargaDocumento = async (
  ROUTE: string,
  NOMBRE: string,
  IdPath: string
) => {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/GetByName",
      {
        ROUTE: ROUTE,
        NOMBRE: NOMBRE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          responseType: "application/pdf",
        },
      }
    )
    .then(({ data }) => {
      var a = document.createElement("a"); //Create <a>
      a.href = "data:application/pdf;base64," + data.RESPONSE.FILE; //Image Base64 Goes here
      a.download = `${NOMBRE}`; //File name Here
      a.click();
      if (IdPath !== "") {
        ActualizaDescarga(IdPath);
      }
    })
    .catch((r) => {
      alertaError("Error al intentar descargar documento")
    });
};



export const descargaDocumentoAcuse = async (
  ROUTE: string,
  NOMBRE: string,
  IdPath: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_APPLICATION_FILES}/api/ApiDoc/GetByRoute`,
      {
        ROUTE: ROUTE,
        NOMBRE: NOMBRE.replace('.pdf', ''), // Eliminar extensión si el servidor la agrega automáticamente
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );

    if (data.RESPONSE && data.RESPONSE.FILE) {
      const a = document.createElement("a");
      a.href = "data:application/pdf;base64," + data.RESPONSE.FILE;
      a.download = `${NOMBRE}`;
      a.click();

      if (IdPath !== "") {
        ActualizaDescarga(IdPath);
      }
    } else {
      throw new Error("El archivo no está disponible en la respuesta.");
    }
  } catch (err) {
    alertaError("Error al intentar descargar documento");
  }
};

export const listFile = async (ROUTE: string, setState: Function) => {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      {
        ROUTE: ROUTE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data }) => {
      if (data.SUCCESS === false) {
        setState([]);
      } else {
        let files = data.RESPONSE;

        setState(files);
      }
    })
    .catch((r) => { });
};

export const listFileFuentesPago = async (
  ROUTE: string,
  setState: Function,
  tablaFuentePago: any[]
) => {
  console.log("ROUTE en listFileFuentesPago:", ROUTE);
  const state = useFideicomisoStore.getState();

  try {
    const { data } = await axios.post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      { ROUTE },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );

    if (data.SUCCESS === false) {
      console.warn("No se encontraron archivos en el servidor");
      setState([]);
      return;
    }

    const files = data.RESPONSE;
    console.log("Archivos recibidos del backend:", files);
    console.log("Documentos en tablaFuentePago:", tablaFuentePago);

    // Empalmar cada registro de soporte documental con su FILE real
    const auxArrayArchivos = tablaFuentePago.map((documento: any) => {
      const archivo = files.find(
        (file: any) => file.NOMBRE === documento.nombreArchivo
      );

      if (archivo) {
        return {
          ...documento,
          archivo: archivo.FILE, // El base64 que necesitas
          nombreArchivo: archivo.NOMBRE,
          size: archivo.SIZE,
          fechaArchivo: documento.fechaArchivo || archivo.FECHA || null,
        };
      }

      // Si no lo encuentra, regreso el documento original
      //console.warn(`No se encontró FILE para: ${documento.nombreArchivo}`);
      return documento;
    });

    console.log("Resultado empalmado:", auxArrayArchivos);

    // Guardar en store y estado
    //state.setSoporteDocumental(auxArrayArchivos);
    setState(auxArrayArchivos);

  } catch (error) {
    console.error("Error al listar archivos:", error);
    setState([]);
  }
};


export const listFileAutorizaciones = async (
  ROUTE: string,
  setState: Function,
  tablaAutorizaciones: IAutorizaciones
) => {
  console.log("ROUTE en listFileAutorizaciones:", ROUTE);
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/ListFile",
      { ROUTE },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );

    if (data.SUCCESS === false) {
      console.warn("No se encontraron archivos en el servidor");
      setState([]);
      return;
    }
    const files = data.RESPONSE;

    setState({
      ...tablaAutorizaciones,
      DocumentoSoporte: {
        archivo: files[0].FILE, // El base64 que necesitas
        nombreArchivo: files[0].NOMBRE,
        size: files[0].SIZE,
      },
      AcreditacionQuorum: {
        archivo: files[1].FILE, // El base64 que necesitas
        nombreArchivo: files[1].NOMBRE,
        size: files[1].SIZE,
      },
    })

  } catch (error) {
    //console.error("Error al listar archivos:", error);
    setState();
  }
};


export const ActualizaDescarga = (IdPath: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/actualiza-descarga",
      {
        IdPath: IdPath,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => { })
    .catch((err) => { });
};

export const deleteFile = (ruta: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/DeleteFileSimple",
      {
        ROUTE: ruta
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => { })
    .catch((err) => { });
}

export const deleteDocPathSol = (IdSolicitud: string, docs?: any[]) => {
  console.log('docs axios', docs);
  axios.delete(
    process.env.REACT_APP_APPLICATION_BACK + "/delete-PathDocSol",
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("jwtToken"),
      },
      data: { IdSolicitud: IdSolicitud, jsonDocsDel: docs }
    })

    .then((response) => { })

    .catch((err) => {
      console.error('Error al eliminar el documento:', err);
      alertaError('Error de eliminacion')
    });
}

export const deleteDocPathCancelaciones = (IdSolicitud: string) => {
  axios.delete(
    process.env.REACT_APP_APPLICATION_BACK + "/delete-DocumentosCancelacion",
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("jwtToken"),
      },
      data: { IdSolicitud: IdSolicitud}
    })

    .then((response) => { 
      console.log('Respuesta eliminacion doc cancelacion:', response);
      alertaExito(()=>{}, 'Documentos eliminados correctamente')
    })
    .catch((err) => {
      console.error('Error al eliminar el documento:', err);
      alertaError('Error de eliminacion')
    });
}