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

  // const navigate = useNavigate();

  // const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);

  // const solicitud: IInscripcion = useInscripcionStore(
  //   (state) => state.inscripcion
  // );
  // const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);


  // const requerimientos = (
  //   Solicitud: string,
  //   noRegistro: string,
  //   Requerimiento: any,
  //   //IdSolicitud: string
  // ) => {



  //   let a: any = {};

  //   Object.keys(JSON.parse(Requerimiento?.Comentarios)).map((v) => {
  //     return a[v]
  //       ? (a[v] = a[v] + ` ; ` + JSON.parse(Requerimiento?.Comentarios)[v])
  //       : (a = { ...a, [v]: JSON.parse(Requerimiento?.Comentarios)[v] });
  //   });

  //   ConsultaRequerimientosReestructura(Solicitud, a, noRegistro, setUrl);

  //   setProceso("actualizacion");
  //   navigate("../firmaUrl");
  // };

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
    // .then((data) => {
    //   if (
    //     data.filter(
    //       (a: any) =>
    //         a.Tipo === "RequerimientoReestructura"
    //     ).length > 0
    //   ) {
    //     requerimientos(
    //       row.Solicitud,
    //       row.NumeroRegistro,
    //       data.filter(
    //         (a: any) =>
    //           a.Tipo === "RequerimientoReestructura"
    //       )[0]
    //     );
    //   } else {
    //     ConsultaConstancia(
    //       row.Solicitud,
    //       row.NumeroRegistro,
    //       setUrl
    //     );
    //     navigate("../firmaUrl");
    //   }
    // });
    .catch((error) => {
      return error;
    });
}
