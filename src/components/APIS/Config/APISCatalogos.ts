import axios from "axios";
import Swal from "sweetalert2";

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
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "error",
        title: "Mensaje",
        text: "Ha sucedido un error, inténtelo de nuevo",
      });
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
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "success",
        title: "Éxito",
        text: "Descripción modificada con éxito.",
      });
    })
    .catch((error) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "info",
        title: "¡Aviso!",
        text: "No hubo cambios, asi que no se modificaron los campos",
      });
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
        ? Swal.fire({
            customClass: { container: ".swal2-container" },
            confirmButtonColor: "#15212f",
            cancelButtonColor: "rgb(175, 140, 85)",
            icon: "success",
            title: "Éxito",
            text: "Descripción agregada con éxito.",
          })
        : Swal.fire({
            confirmButtonColor: "#15212f",
            cancelButtonColor: "rgb(175, 140, 85)",
            icon: "error",
            title: "¡Error!",
            text: "Descripción ya existente",
          });
    })
    .catch((err) => {
      if (desc === "") {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "¡Error!",
          text: "Favor de completar los campos",
        });
      } else {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "¡Error!",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
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
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "success",
        title: "Éxito",
        text: "Elemento eliminado con éxito.",
      });
    })
    .catch((err) => {
      Swal.fire({
        confirmButtonColor: "#15212f",
        cancelButtonColor: "rgb(175, 140, 85)",
        icon: "error",
        title: "Error",
        text: "Ha sucedido un error, inténtelo de nuevo",
      });
    });
}
