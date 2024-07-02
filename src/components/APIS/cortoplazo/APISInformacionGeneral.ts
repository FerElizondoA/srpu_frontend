import axios from "axios";
import Swal from "sweetalert2";
import { useTrazabilidad } from "../../../store/Trazabilidad/main";
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
      

      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });
}

export function getObligadoSolidarioAval(setState: Function) {
  axios({
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
      
      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });
}

export function getSolicitudes(tipoListado: string, setState: Function, setStateFilter:Function) {

  axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-solicitudes",
    params: {
      IdUsuario: localStorage.getItem("IdUsuario"),
      TipoListado: tipoListado,
      IdEntePublico: localStorage.getItem("IdEntePublicoObligado"),
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })

    .then(({ data }) => {
      const state = useTrazabilidad.getState()
      console.log("state.IdSolicitudNotificacion", state.IdSolicitudNotificacion);
      
      console.log("state", state)
      if (state.IdSolicitudNotificacion !== "") {
        setStateFilter(data.data.filter((x: any) => x.Id.toLowerCase().includes(state.IdSolicitudNotificacion || "")))
        setTimeout(() => state.cleanIdSolicitud, 1000)
      }else{
        setStateFilter(data.data);
      }
        setState(data.data);
      



})
    .catch((error) => {
      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });
}

export function getSolicitudesCancelaciones(setState: Function) {
  axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK + "/get-solicitudes-cancelaciones",
    params: { IdUsuario: localStorage.getItem("IdUsuario") },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });
}

export function getSolicitudesReestructura(setState: Function) {
  axios({
    method: "get",
    url:
      process.env.REACT_APP_APPLICATION_BACK + "/get-solicitudes-reestructura",
    params: { IdUsuario: localStorage.getItem("IdUsuario") },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });
}

export async function getSolicitudesAdmin(
  Estado: string,
  setState: Function,
  tipoListado: string
) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + "/get-solicitudesAdmin",
    params: {
      Estado: Estado,
      tipoListado: tipoListado,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      alertaError("(" + error.response.status + ") " + error.response.data.msg)
    });

}

// export async function getTrazabilidad(
//   setState: Function,
//   IdUsuarioModificador: string
//   ) {
//   await axios({
//     method: "get",
//     url: process.env.REACT_APP_APPLICATION_BACK + "/get-TrazabilidadSolicitud",
//     params: {
//       IdUsuarioModificador: IdUsuarioModificador
//     },
//     data: {},
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("jwtToken") || "",
//     },
//   })
//     .then(({ data }) => {
//       setState(data.data);
//     })
//     .catch((error) => {
//       Swal.fire({
//         confirmButtonColor: "#15212f",
//         cancelButtonColor: "rgb(175, 140, 85)",
//         icon: "error",
//         title: "Mensaje",
//         text: "(" + error.response.status + ") " + error.response.data.msg,
//       });
//     });
// }
