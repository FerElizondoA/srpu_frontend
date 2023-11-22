import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: true,
  confirmButtonColor: "#15212f",
  cancelButtonColor: "rgb(175, 140, 85)",
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getListadoUsuarios = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/users-app", {
      params: {
        IdApp: localStorage.getItem("IdApp"),
        IdUsuario: localStorage.getItem("IdUsuario"),
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
      Toast.fire({
        icon: "error",
        title: r.response.data.error || "Ocurrio un error.",
      });
    });
};

export const getRoles = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/get-roles", {
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
