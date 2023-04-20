import axios from "axios";

const params = new URLSearchParams(window.location.search);
const IdApp = params.get("IdApp");

export const sessionValid = () => {
  const jt = params.get("jwt") || "";
  const rft = params.get("rf") || "";

  return axios
    .post(
      "http://10.200.4.105:5000/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: jt,
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("jwtToken", jt);
        localStorage.setItem("refreshToken", rft);
        localStorage.setItem("validation", "true");
        localStorage.setItem("IdCentral", r.data.data.IdUsuario);

        return getUserDetails(r.data.data.IdUsuario);
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        return false;
      }
    });
};

export const getUserDetails = (idCentral: string) => {
  return axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuario", {
      params: {
        IdUsuario: idCentral,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200 && !r.data.data.error) {
        localStorage.setItem("IdUsuario", r.data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          r.data.data.Nombre +
            " " +
            r.data.data.ApellidoPaterno +
            " " +
            r.data.data.ApellidoMaterno
        );

        localStorage.setItem("Rol", r.data.data.Rol);
        localStorage.setItem("Puesto", r.data.data.Cargo);
        localStorage.setItem("IdRol",r.data.data.IdRol)
        localStorage.setItem(
          "EntePublicoObligado",
          r.data.data.EntePublicoObligado
        );
        localStorage.setItem("TipoEntePublicoObligado", r.data.data.Tipo);

        return true;
      } else {
        getDataSolicitud(idCentral);
      } 
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      getDataSolicitud(idCentral);
    });
};

const getDataSolicitud = (idSolicitud: string) => {
  axios
    .get("http://10.200.4.105:5000/api/datosAdicionalesSolicitud", {
      params: {
        IdUsuario: idSolicitud,
        IdApp: IdApp,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(JSON.parse(
        r.data.data[0].DatosAdicionales
      ));
      
      if (r.status === 200) {
        let objetoDatosAdicionales = JSON.parse(
          r.data.data[0].DatosAdicionales
        );
        let CreadoPor = r.data.data[0].CreadoPor;
        signUp(idSolicitud, objetoDatosAdicionales, CreadoPor);
      }
    })
    .catch((error) => {
      localStorage.clear();
      return false;
    });
};

const signUp = (
  IdUsuarioCentral: string,
  datosAdicionales: IDatosAdicionales,
  CreadoPor: string
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-usuario",
      {
        IdUsuarioCentral: IdUsuarioCentral,
        Cargo: datosAdicionales.cargo,
        IdRol: datosAdicionales.idRol,
        CreadoPor: CreadoPor,
        IdEntePublico: datosAdicionales.idEntePublico,
        CorreoDeRecuperacion: datosAdicionales.correoDeRecuperacion,
      },
      { headers: { Authorization: localStorage.getItem("jwtToken") || "" } }
    )
    .then((r) => {
      if (r.status === 200) {
        window.location.reload();
      }
    });
};

export const continueSession = () => {
  return axios
    .post(
      "http://10.200.4.105:5000/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("validation", "true");
        if (r.data.data.IdUsuario) {
          localStorage.setItem("IdCentral", r.data.data.IdUsuario);
          getUserDetails(r.data.data.IdUsuario);
        } else {
          getUserDetails(localStorage.getItem("IdCentral") as string);
        }
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        return false;
      }
    });
};

export const logout = () => {
  localStorage.clear();
  window.location.assign("http://10.200.4.106/");
};

export interface IDatosAdicionales {
  idEntePublico: string;
  idRol: string;
  correoDeRecuperacion: string;
  cargo: string;
}
