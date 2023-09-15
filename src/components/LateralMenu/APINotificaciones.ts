import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: true,
  confirmButtonColor: "#15212f",
  cancelButtonColor: "rgb(175, 140, 85)",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const createNotification = (
  Titulo: string,
  mensaje: string,
  listadoUsuarios: Array<string>
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notificacion",
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
      window.location.reload();
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
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-notificaciones", {
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
      process.env.REACT_APP_APPLICATION_BACK +
        "/api/get-notificaciones-creadas",
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
    .get(
      process.env.REACT_APP_APPLICATION_BACK + "/api/get-info-notificacion",
      {
        params: {
          IdNotificacion: IdNotificacion,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    )
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
      process.env.REACT_APP_APPLICATION_BACK + "/api/leer-notificacion",
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
