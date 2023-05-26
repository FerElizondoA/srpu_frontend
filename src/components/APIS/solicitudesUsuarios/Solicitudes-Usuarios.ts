import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// export const createSolicitud = (datos: IUsuarios, tipoSolicitud: string, comentario = '', setStatus: Function,setError:Function) => {
//   axios
//     .post(
//       process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-solicitud",
//       {
//         Nombre: datos.Nombre,
//         APaterno: datos.ApellidoPaterno,
//         AMaterno: datos.ApellidoMaterno,
//         NombreUsuario: datos.NombreUsuario,
//         Email: datos.CorreoElectronico,
//         Puesto: datos.Cargo,
//         Curp: datos.Curp,
//         RFC: datos.Rfc,
//         Celular: datos.Celular,
//         Telefono: datos.Telefono,
//         Extencion: datos.Ext,
//         DatosAdicionales: JSON.stringify({ Cargo: datos.Cargo, EntePublico: datos.MunicipioUOrganizacion, CorreoDeRecuperacion: datos.CorreoDeRecuperacion }),
//         TipoSolicitud: tipoSolicitud,
//         CreadoPor: localStorage.getItem("IdCentral") || '',
//         IdApp: localStorage.getItem("IdApp") || ''
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("jwtToken") || "",
//         },
//       }
//     )
//     .then((r) => {

//       if (r.status === 200) {
       
//         if (r.data.data[0][0].Respuesta === '403' || r.data.data[0][0].Respuesta === '406') {
//           Toast.fire({
//             icon: "error",
//             title: r.data.data[0][0].Mensaje,
//           });
//           setError(r.data.data[0][0].Mensaje)
//           setStatus(false);
//         } else {
//           if (comentario !== "") { createComentarios(r.data.data[0][0].IdSolicitud, comentario); }
//           Toast.fire({
//             icon: "success",
//             title: "¡Registro exitoso!",
//           });
//           setStatus(true);

//         }
//       } else {
//         Toast.fire({
//           icon: "error",
//           title: "¡No se realizo el registro!",
//         });
//         setError('¡No se realizo el registro, error del sistema!')
//         setStatus(false);
//       }

//     })
//     .catch((r) => {

//       Toast.fire({
//         icon: "error",
//         title: '¡No se realizo el registro, error del sistema!',
//       });
//       setError('¡No se realizo el registro, error del sistema!')
//       setStatus(false);
//     });
// };

// const createComentarios = (idSolicitud: string, comentario: string) => {

//   axios
//     .post(
//       process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-comentario",
//       {
//         CreadoPor: localStorage.getItem("IdCentral"),
//         IdSolicitud: idSolicitud,
//         Comentario: comentario,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("jwtToken") || "",
//         },
//       }
//     )
//     .then((r) => {
//       if (r.status === 201) {
//         Toast.fire({
//           icon: "success",
//           title: "¡Registro exitoso!",
//         });
//       }
//     })
//     .catch((r) => {
//       if (r.response.status === 409) {

//       }
//     });


// };

export const getListadoUsuarios = (setState: Function,permisosEspeciales = 0) => {

  axios.get(process.env.REACT_APP_APPLICATION_BACK + "/api/lista-usuarios", {
    params: {
      IdApp: localStorage.getItem("IdApp"),
      IdUsuario:localStorage.getItem("IdUsuario"),
      PermisosEspeciales:permisosEspeciales
    },
    headers: {
      'Authorization': localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
  }).then(({ data }) => {
    setState(data.data)
    
  })
    .catch((r) => {
      Toast.fire({
        icon: "error",
        title: r.response.data.error ||'Ocurrio un error.',
      });
    });
};

export const getRoles= (setState: Function,) => {

  axios.get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-roles", {
    headers: {
      'Authorization': localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
  }).then(({ data }) => {

    setState(data.data)

  })
    .catch((r) => {
      if (r.response.status === 409) {

      }
    });
};





