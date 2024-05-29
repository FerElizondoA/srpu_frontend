import axios from "axios";
import Swal from "sweetalert2";
import { MenuItem } from "./AyudaModal";

export const saveFile = (
  TabValue: string,
  archivo: { archivo: File; nombreArchivo: string },
  idMenu: string,
  pregunta: string,
  texto: string,
  handleClose: Function
) => {
  const url = new File([archivo.archivo], archivo.nombreArchivo);
  let ruta = "";
  TabValue === "Guías" ? (ruta = "/GUIAS/") : (ruta = "/VIDEOS/TUTORIALES/");
  ruta = (process.env.REACT_APP_DOC_ROUTE || "") + ruta;
  let dataArray = new FormData();
  dataArray.append("ROUTE", `${ruta}`);
  dataArray.append("ADDROUTE", "TRUE");
  dataArray.append("FILE", url); // probar mandar archivo.archivo

  axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
      dataArray,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data }) => {
      if (TabValue === "Guías") {
        if (data) {
          createAyuda(
            {
              IdMenu: idMenu,
              Pregunta: pregunta,
              Texto: "",
              RutaGuia: data?.RESPONSE.RUTA,
              RutaVideo: "",
              NombreArchivo: archivo.nombreArchivo,
              NombreArchivoServidor: data?.RESPONSE.NOMBREIDENTIFICADOR,
              IdUsuario: localStorage.getItem("IdUsuario"),
            },
            handleClose
          );
        } else {
          Swal.fire({
            confirmButtonColor: "#15212f",
            icon: "error",
            title: "Error al cargar archivo.",
          });
        }
      } else {
        if (data) {
          createAyuda(
            {
              IdMenu: idMenu,
              Pregunta: "",
              Texto: "",
              RutaGuia: "",
              RutaVideo: data?.RESPONSE.RUTA,
              NombreArchivo: archivo.nombreArchivo,
              NombreArchivoServidor: data?.RESPONSE.NOMBREIDENTIFICADOR,
              IdUsuario: localStorage.getItem("IdUsuario"),
            },
            handleClose
          );
        } else {
          Swal.fire({
            confirmButtonColor: "#15212f",
            iconColor: "#AF8C55",
            icon: "error",
            title: "Error al cargar archivo.",
          });
        }
      }
    })
    .catch((e) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "error",
        title: "Error al cargar archivo.",
      });
    });
};

export const getFileByName = async (
  ROUTE: string,
  NOMBRE: string,
  setState: Function
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
          responseType: "blob",
        },
      }
    )
    .then(({ data }) => {
      setState(data.RESPONSE.FILE);
    })
    .catch((r) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "error",
        title: "Ocurrio un problema al obtener el archivo.",
      });
    });
};

export const deleteFile = async (ROUTE: string, NOMBRE: string, Id: string) => {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/DeleteFile",
      {
        ROUTE: ROUTE,
        NOMBRE: NOMBRE,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      deleteAyuda(Id);
    })
    .catch((r) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "error",
        title: "Ocurrio un problema al eliminar el archivo.",
      });
    });
};

export const createAyuda = (data: any, handleClose: Function) => {
  axios
    .post(process.env.REACT_APP_APPLICATION_BACK + "/ayuda", data, {
      params: { Tabla: "Menus", ValorCondicion: localStorage.getItem("IdApp") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      handleClose();
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "success",
        title: "Se ha guardado con éxito",
      });
    })
    .catch((r) => {});
};

export const getMenus = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/listas", {
      params: { Tabla: "Menus", ValorCondicion: localStorage.getItem("IdApp") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      let menus = r.data.data;
      let menusFiltrados = menus.filter((menu: MenuItem) => menu.Path !== "#");

      setState(menusFiltrados);
    });
};

export const getAyuda = (
  setState: Function,
  IdMenu: string,
  Opcion: string
) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/ayuda", {
      params: {
        IdMenu: IdMenu === "0" ? "0" : localStorage.getItem("IdMenuActual"),
        Opcion: Opcion,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.data);
    });
};

export const deleteAyuda = async (IdPreguntaFrecuente: string) => {
  await axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_BACK + "/ayuda",
    data: {
      IdPreguntaFrecuente: IdPreguntaFrecuente,
      IdUsuario: localStorage.getItem("IdUsuario") || "",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then((r) => {
      //handleClose();
      Swal.fire({
        confirmButtonColor: "#15212f",
        icon: "success",
        iconColor: "#AF8C55",
        //title: "Éxito",
        text: "El archivo se ha eliminado exitosamente",
      });
    })
    .catch(() => {
      //alertaError();
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "error",
        title: "No se pudo eliminar.",
      });
    });
};
