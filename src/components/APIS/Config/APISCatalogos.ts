import axios from "axios";
import { alertaError, alertaExito } from "../../../generics/Alertas";

export async function getCatalogo(setState: Function, getState: string) {
  await axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + `/get-${getState}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      alertaError("Ha sucedido un error, inténtelo de nuevo");
    });
}

export async function modDesc(
  modDesc: string,
  idDesc: string,
  desc: string,
  ocp: number,
  olp: number,
  tipoEntePublico: string
) {
  await axios
    .put(
      process.env.REACT_APP_APPLICATION_BACK + `/modify-${modDesc}`,
      {
        IdDescripcion: idDesc,
        Descripcion: desc,
        OCP: ocp,
        OLP: olp,
        IdUsuario: localStorage.getItem("IdUsuario"),
        TipoEntePublico: tipoEntePublico,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      alertaExito(() => {}, "Descripción modificada con éxito.");
    })

    .catch((error) => {
      alertaError("No hubo cambios, asi que no se modificaron los campos");
    });
}

export async function creaDesc(
  creaDesc: string,
  desc: string,
  ocp: number,
  olp: number,
  tipoEntePublico: string
) {
  await axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + `/create-${creaDesc}`,
      {
        IdUsuario: localStorage.getItem("IdUsuario"),
        Descripcion: desc,
        OCP: ocp,
        OLP: olp,
        TipoEntePublico: tipoEntePublico,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data }) => {
      !data.data.error
        ? alertaExito(() => {}, "Descripción agregada con éxito.")
        : alertaError("Descripción ya existente");
    })
    .catch((err) => {
      if (desc === "") {
       
        alertaError("Favor de completar los campos");
      } else {
        
        alertaError("Ha sucedido un error, inténtelo de nuevo");
      }
    });
}

export async function delDesc(delDesc: string, desc: string) {
  await axios
    .delete(process.env.REACT_APP_APPLICATION_BACK + `/delete-${delDesc}`, {
      params: {
        IdDescripcion: desc,
        IdUsuario: localStorage.getItem("IdUsuario"),
      },

      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
     
      alertaExito(() =>{},"Favor de completar los campos");
    })
    .catch((err) => {
     

      alertaError("Ha sucedido un error, inténtelo de nuevo")
    });
}
