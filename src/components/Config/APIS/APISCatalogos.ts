import axios from "axios";
import Swal from "sweetalert2";

export function getCatalogo(setState: Function, getState: string) {
  axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_BACK + `/api/get-${getState}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Ha sucedido un error, inténtelo de nuevo",
      });
    });
}

export function modDesc(modDesc: string, idDesc: string, desc: string, ocp: number, olp: number) {
  axios
    .put(
      process.env.REACT_APP_APPLICATION_BACK + `/api/modify-${modDesc}`,
      {
        IdDescripcion: idDesc,
        Descripcion: desc,
        OCP: ocp,
        OLP: olp,
        IdUsuario: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Descripción modificada con éxito.",
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Ha sucedido un error, inténtelo de nuevo",
      });
    });
}

export function creaDesc(creaDesc: string, desc: string, ocp: number, olp: number) {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + `/api/create-${creaDesc}`,
      {
        IdUsuario: localStorage.getItem("IdUsuario"),
        Descripcion: desc,
        OCP: ocp,
        OLP: olp
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Descripción agregada con éxito.",
      });
    })
    .catch((err) => {
      if (desc === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ingrese nuevo elemento",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      }
    });
}

export function delDesc(delDesc: string, desc: string) {
  axios
    .delete(process.env.REACT_APP_APPLICATION_BACK + `/api/delete-${delDesc}`, {
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
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Elemento eliminado con éxito.",
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha sucedido un error, inténtelo de nuevo",
      });
    });
}
