import axios from "axios";
import { rolesAdmin } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { IComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
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
      setState(
        data.data.filter(
          (_: IComentarios) =>
            (_.Tipo === "Admin" &&
              rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
            (_.Tipo === "Requerimiento" &&
              rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
            (_.Tipo === "Captura" &&
              !rolesAdmin.includes(localStorage.getItem("Rol")!))
        )
      );
    })
    .catch((error) => {});
}
