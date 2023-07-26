import axios from "axios";
import Swal from "sweetalert2";

export function getTiposDocumentos(setState: Function) {
  axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK +
      "/api/get-tiposDocumentosCortoPlazo",
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      });
    });
}
