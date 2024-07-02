import axios from "axios";
import { alertaError, alertaExito } from "../../generics/Alertas";

export const createNotification = (
  Titulo: string,
  mensaje: string,
  listadoUsuarios: Array<string>,
  IdSolicitud?: string,
  ControlInterno?: string,
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-notificacion",
      {
        Titulo: Titulo,
        Mensaje: mensaje,
        IdSolicitud: IdSolicitud,
        ControlInterno: ControlInterno,
        IdUsuarioCreador: localStorage.getItem("IdUsuario"),
        ListadoUsuarios: listadoUsuarios,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          "Content-Type": "application/json",
        },
      }
    )
    .then((r) => {
      // window.location.reload();
      

      alertaExito(()=>{}, "La solicitud se envió con éxito" )
    })
    .catch((r) => { });
};

export const getNotificaciones = (
  setState: Function,
  cantidadNotificaciones: Function
) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/get-notificaciones", {
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      cantidadNotificaciones(data.data.length); //Obtienes la cantidad de Notificaciones

      setState(data.data);
    })
    .catch((r) => {
      if (r.response.status === 409) {
        alertaError("No es posible traer las notificaciones")
      }
    });
};

export const getHistorialNotificaciones = (setState: Function) => {
  axios
    .get(
      process.env.REACT_APP_APPLICATION_BACK + "/get-notificaciones-creadas",
      {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => {
      //cantidadNotificaciones(data.data.length); //Obtienes la cantidad de Notificaciones

      setState(data.data);
    })
    .catch((r) => {
      if (r.response.status === 409) {
        alertaError("No es posible traer el historial")
      }
    });
};

export const getEstatus = (setState: Function, IdNotificacion: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/get-info-notificacion", {
      params: {
        IdNotificacion: IdNotificacion,
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};

export const leerMensaje = (IdNotificacion: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/leer-notificacion",
      {
        IdNotificacion: IdNotificacion,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => { })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};
