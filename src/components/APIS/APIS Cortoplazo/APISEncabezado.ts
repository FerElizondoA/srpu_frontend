import axios from "axios";

import { alertaError } from "../../../generics/Alertas";

export async function getMunicipiosUOrganismos(setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-entePublicoObligado",
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
     

      alertaError( "(" + error.response.status + ") " + error.response.data.msg,)
    });
}

export async function getTipoEntePublico(setState: Function) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-tiposEntePublico",
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
      

      alertaError( "(" + error.response.status + ") " + error.response.data.msg,)
    });
}
