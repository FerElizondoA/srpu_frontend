import axios from "axios";
import { IComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { rolesAdmin } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";

export function getComentariosSolicitudPlazo(
  idSolicitud: string,
  setState: Function
) {
  return axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem("IdUsuario"),
      IdSolicitud: idSolicitud,
    },
    url: process.env.REACT_APP_APPLICATION_BACK + `/get-comentarios`,
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

            (_.Tipo === "AdminReestructura" &&
              rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

            (_.Tipo === "Requerimiento" &&
              rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

            (_.Tipo === "RequerimientoReestructura" &&
              rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

            (_.Tipo === "RequerimientoReestructura" &&
              !rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

            (_.Tipo === "Requerimiento" &&
              !rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

            (_.Tipo === "Captura" &&
              !rolesAdmin.includes(localStorage.getItem("Rol")!))
        )
      );
      console.log("Data comentarios", data.data)
      return data.data;

    })
    .catch((error) => {
      return error;
    });
}
