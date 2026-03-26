import axios from "axios";
import { IComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { rolesAdmin } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { ConsultaRequerimientosReestructura } from "../../../store/SolicitudFirma/solicitudFirma";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useNavigate } from "react-router-dom";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";

export function getComentariosSolicitudPlazo(
  idSolicitud: string,
  setState: Function
) {

  const state = useCortoPlazoStore.getState();

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
      // setState(
      //   data.data.filter(
      //     (_: IComentarios) =>

      //       (_.Tipo === "Admin" &&
      //         rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "AdminReestructura" &&
      //         rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "Requerimiento" &&
      //         rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "RequerimientoReestructura" &&
      //         rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "RequerimientoReestructura" &&
      //         !rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "Requerimiento" &&
      //         !rolesAdmin.includes(localStorage.getItem("Rol")!)) ||

      //       (_.Tipo === "Captura" &&
      //         !rolesAdmin.includes(localStorage.getItem("Rol")!))
      //   )
      // );
      console.log("Data comentarios completos", data.data)

      const rol = localStorage.getItem("Rol") || "";
      const esAdmin = rolesAdmin.includes(rol);

      const comentariosFiltrados = data.data.filter((c: IComentarios) =>
        esAdmin ? c.Tipo === "Requerimiento" : c.Tipo === "Captura"
      );
      
      console.log("Data comentarios filtrados", comentariosFiltrados)

      state.setComentariosSolicitudInscripcion(comentariosFiltrados);


      // state.setComentariosSolicitudInscripcion(data.data);

      return data.data;

    })
    .catch((error) => {
      return error;
    });
}
