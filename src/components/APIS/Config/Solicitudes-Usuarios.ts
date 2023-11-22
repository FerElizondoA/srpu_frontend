import axios from "axios";

export const getListadoUsuarioRol = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/lista-usuarios", {
      params: {
        IdApp: localStorage.getItem("IdApp"),
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
