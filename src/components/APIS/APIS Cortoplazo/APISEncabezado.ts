import axios from "axios";
import Swal from "sweetalert2";

export async function getMunicipiosUOrganismos(setState: Function) {
  await axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK + "/api/get-entePublicoObligado",
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
      });
    });
}

export async function getTipoEntePublico(setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposEntePublico",
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
      });
    });
}
