import axios from "axios";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { alertaError, alertaExito } from "../../../generics/Alertas";

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
    .catch((error) => {});
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
    .catch((error) => {});
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
    .catch((error) => {});
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
    .catch((error) => {});
}

export const getDocumentos = async (
  ROUTE: string,
  setState: Function,
  setLoad: Function
) => {
  const state = useCortoPlazoStore.getState();
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
      console.log();
      
      console.log('state.tablaDocumentos',state.tablaDocumentos);
      
      const auxArrayArchivos = state.tablaDocumentos.map((documento: any) => {
        const archivo = files.find((file: any) => file.NOMBRE === documento.nombreArchivo);
        if (archivo) {
          return {
            ...documento,
            archivo: archivo.FILE,
            nombreArchivo: archivo.NOMBRE,
            size:archivo.SIZE
          };
        }
        return documento;
      });

      console.log("auxArrayArchivos",auxArrayArchivos);
      
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
    .catch((r) => {});
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
    .catch((r) => {});
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
    .then((response) => {})
    .catch((err) => {});
};

export const deleteFile =(ruta:string)=>{
  axios
  .post(
    process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/DeleteFileSimple",
    {
      ROUTE:ruta
    },
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "arraybuffer",
    }
  )
  .then((response) => {})
  .catch((err) => {});
}

export const deleteDocPathSol=(IdSolicitud:string, docs?:any[])=>{
  console.log('docs axios',docs);
  
  axios.delete(
    process.env.REACT_APP_APPLICATION_BACK + "/delete-PathDocSol",
     {
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("jwtToken"),
      },
      data: { IdSolicitud:IdSolicitud, jsonDocsDel:docs }
  })
    
  .then((response) => {})
  .catch((err) => {alertaError('Error de eliminacion')});
}