import axios from "axios";

const params = new URLSearchParams(window.location.search);
const IdApp = params.get("IdApp");

export const sessionValid = () => {
  const jt = params.get("jwt") || "";
  const rft = params.get("rf") || "";

  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
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

        return getUserAppDetail(r.data.data.IdUsuario);
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        return false;
      }
    });
};

export const getUserAppDetail = (idCentral: string) => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/userapp-detail",
      {
        IdUsuario: idCentral,
        IdApp: IdApp || localStorage.getItem("IdApp"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
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
        localStorage.setItem("Puesto", r.data.data.Puesto);

        localStorage.setItem("Rol", r.data.roles[0][0].Nombre);
        localStorage.setItem("IdRol", r.data.roles[0][0].Id);
        localStorage.setItem("EntePublicoObligado", r.data.data.Entidad);
        localStorage.setItem("IdEntePublicoObligado", r.data.data.IdEntidad);
        localStorage.setItem(
          "TipoEntePublicoObligado",
          r.data.data.TipoEntidad
        );
        localStorage.setItem(
          "IdTipoEntePublicoObligado",
          r.data.data.IdTipoEntidad
        );

        r.data.menus[0].length > 0 &&
          localStorage.setItem("Menu", JSON.stringify(r.data.menus[0]));

        return true;
      } else {
        // getDataSolicitud(idCentral);
      }
    })
    .catch((error) => {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      if (error.response.status === 401) {
        localStorage.clear();
      }
      getDataSolicitud(idCentral);
    });
};

const getDataSolicitud = (idSolicitud: string) => {
  axios
    .get(
      process.env.REACT_APP_APPLICATION_LOGIN +
        "/api/datosAdicionalesSolicitud",
      {
        params: {
          IdUsuario: idSolicitud,
          IdApp: IdApp,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
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
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
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
          getUserAppDetail(r.data.data.IdUsuario);
        } else {
          getUserAppDetail(localStorage.getItem("IdCentral") as string);
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
  window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN_FRONT || "");
};

export interface IDatosAdicionales {
  idEntePublico: string;
  idRol: string;
  correoDeRecuperacion: string;
  cargo: string;
}
