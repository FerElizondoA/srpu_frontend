import axios from "axios";

const params = new URLSearchParams(window.location.search);
const IdApp = params.get("IdApp");

export const sessionValid = () => {
  const jt = params.get("jwt") || "";
  const rft = params.get("rf") || "";

  return axios
    .post("http://10.200.4.105:5000/api/verify",
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
    .get("http://10.200.4.200:8000/api/usuario", {
      params: {
        IdUsuario: idCentral,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("IdUsuario", r.data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          r.data.data.Nombre.split(" ")[0] + " " + r.data.data.ApellidoPaterno
        );

        localStorage.setItem("Rol", r.data.data.Rol);

        return true;
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
      if (r.status === 200) {
        // window.location.reload();
      }
    })
    .catch((error) => {
      localStorage.clear();
      return false;
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
