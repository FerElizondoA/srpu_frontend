import axios from "axios";
import Swal from "sweetalert2";
import { IUsuarios } from "../../Interfaces/InterfacesUsuario/IUsuarios";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: true,
  confirmButtonColor: "#15212f",
  cancelButtonColor: "rgb(175, 140, 85)",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const createSolicitud = (
  datos: IUsuarios,
  tipoSolicitud: string,
  comentario = "",
  setStatus: Function,
  setError: Function
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-solicitud",
      {
        Nombre: datos.Nombre,
        APaterno: datos.ApellidoPaterno,
        AMaterno: datos.ApellidoMaterno,
        NombreUsuario: datos.NombreUsuario,
        Email: datos.CorreoElectronico,
        Puesto: datos.Cargo,
        Curp: datos.CURP,
        RFC: datos.RFC,
        Celular: datos.Celular,
        Telefono: datos.Telefono,
        Extencion: datos.Ext,
        TipoSolicitud: tipoSolicitud,
        CreadoPor: localStorage.getItem("IdCentral") || "",
        IdApp: localStorage.getItem("IdApp") || "",
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        if (
          r.data.data[0][0].Respuesta === "403" ||
          r.data.data[0][0].Respuesta === "406"
        ) {
          Toast.fire({
            icon: "error",
            title: r.data.data[0][0].Mensaje,
          });
          setError(r.data.data[0][0].Mensaje);
          setStatus(false);
        } else {
          if (comentario !== "") {
            createComentarios(r.data.data[0][0].IdSolicitud, comentario);
          }
          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });
          setStatus(true);
        }
      } else {
        Toast.fire({
          icon: "error",
          title: "¡No se realizo el registro!",
        });
        setError("¡No se realizo el registro, error del sistema!");
        setStatus(false);
      }
    })
    .catch((r) => {
      Toast.fire({
        icon: "error",
        title: "¡No se realizo el registro, error del sistema!",
      });
      setError("¡No se realizo el registro, error del sistema!");
      setStatus(false);
    });
};

const createComentarios = (idSolicitud: string, comentario: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-comentario",
      {
        CreadoPor: localStorage.getItem("IdCentral"),
        IdSolicitud: idSolicitud,
        Comentario: comentario,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 201) {
        Toast.fire({
          icon: "success",
          title: "¡Registro exitoso!",
        });
      }
    })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};

export const getListadoUsuarioRol = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/lista-usuarios", {
      params: {
        IdApp: localStorage.getItem("IdApp"),
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((r) => {
      if (r.response.status === 409) {
      }
    });
};
