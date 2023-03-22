import axios from "axios";
import Swal from "sweetalert2";

export function getMunicipiosUOrganismos(setState: Function) {
  axios({
    method: 'get',
    url: 'http://10.200.4.199:8000' + '/api/get-entePublicoObligado',
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

export function getTipoEntePublico(setState: Function) {
  axios({
    method: 'get',
    url: 'http://10.200.4.199:8000' + '/api/get-tiposEntePublico',
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