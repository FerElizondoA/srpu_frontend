import axios from "axios";

import { alertaError } from "../../../generics/Alertas";

export async function getDestinos() {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-destinos",
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
     

      alertaError( "(" + error.response.status + ") " + error.response.data.msg,)
    });
}

export async function getObligadoSolidarioAval(setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-obligadoSolidarioAval",
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
      alertaError( "(" + error.response.status + ") " + error.response.data.msg,)
    });
}
