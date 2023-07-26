import axios from "axios";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export function getComentariosSolicitudPlazo(
  idSolicitud: string,
  setState: Function
) {
  axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem("IdUsuario"),
      IdSolicitud: idSolicitud,
    },
    url: process.env.REACT_APP_APPLICATION_BACK + `/api/get-comentarios`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {});
}
