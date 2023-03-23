import axios from "axios";
import Swal from "sweetalert2";

export function getTiposDocumentos(setState: Function) {
  axios({
    method: 'get',
    url: 'http://10.200.4.199:8000' + '/api/get-tiposDocumento',
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
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}