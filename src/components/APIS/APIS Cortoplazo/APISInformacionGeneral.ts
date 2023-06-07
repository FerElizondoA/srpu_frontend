import axios from "axios";
import Swal from "sweetalert2";

export async function getDestinos() {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/api/get-destinos",
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      });
    });
}

export async function getObligadoSolidarioAval(setState: Function) {
  await axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK + "/api/get-obligadoSolidarioAval",
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      //setState(data)
      return data;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      });
    });
}

export async function getSolicitudes(setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/api/get-solicitudes",
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
