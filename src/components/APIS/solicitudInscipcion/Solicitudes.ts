import axios from "axios";
import Swal from "sweetalert2";
//import { ICreateSolicitud } from "../../Interfaces/InterfacesUsuarios/ISolicitudes";
import { ICreateSolicitud } from "../../Interfaces/InterfacesUsuario/ISolicitudes";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

export const createSolicitud = (data: ICreateSolicitud, comentario:string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-solicitud",data,
        // {
        //   Nombre: names,
        //   APaterno: firstName,
        //   AMaterno: secondName,
        //   NombreUsuario: username,
        //   Email: email,
        //   Puesto:datosAdicionales.rol,
        //   Curp: curp,
        //   RFC: rfc,
        //   Celular: cellphone,
        //   Telefono: telephone,
        //   Extencion: ext,
        //   DatosAdicionales: JSON.stringify(datosAdicionales),
        //   TipoSolicitud: "ALTA",
        //   CreadoPor: localStorage.getItem("IdCentral"),
        //   IdApp: localStorage.getItem("IdApp"),
        // },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          if (comentario !== "")
            createComentarios(r.data.data[0][0].IdSolicitud,comentario);

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

  const createComentarios = (idSolicitud: string,comentario:string) => {
   
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
