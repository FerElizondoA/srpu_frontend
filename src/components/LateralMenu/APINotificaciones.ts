import axios from "axios";
import Swal from "sweetalert2";

export const createNotification = (
  Titulo: string,
  mensaje: string,
  listadoUsuarios: Array<string>
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/create-notificacion",
      {
        Titulo: Titulo,
        Mensaje: mensaje,
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
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "success",
        title: "Mensaje",
        text: "La solicitud se envió con éxito",
      });
    })
    .catch((r) => {});
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
    .then(({ data }) => {})
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};
