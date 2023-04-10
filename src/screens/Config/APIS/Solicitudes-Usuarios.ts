import axios from "axios";
import Swal from "sweetalert2";

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

export const createSolicitud = ( comentario = '') => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-solicitud", 
      {
            Nombre: 'marlon',
            APaterno: 'mendez',
            AMaterno: 'maldonado',
            NombreUsuario: 'mmaldonado',
            Email: 'mimendez@cecapmex.com',
            Puesto:'dev',
            Curp: 'asdasd',
            RFC: 'asdas',
            Celular: 123123,
            Telefono: 123123,
            Extencion: 123,
            DatosAdicionales: '',
            TipoSolicitud: 'ALTA',
            CreadoPor: localStorage.getItem("IdCentral")||'',
            IdApp: localStorage.getItem("IdApp")||''
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        if (comentario !== "")
          createComentarios(r.data.data[0][0].IdSolicitud, comentario);

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

const createComentarios = (idSolicitud: string, comentario: string) => {
  if(comentario!=='')
  {
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
  }
  
};

export const getListadoUsuarios = (setState: Function) => {

  axios.get(process.env.REACT_APP_APPLICATION_BACK + "/api/lista-usuarios", {
    params: {
      IdApp: localStorage.getItem("IdApp")
    },
    headers: {
      'Authorization': localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    
      setState(data.data)
   
  })
    .catch((r) => {
      if (r.response.status === 409) {

      }
    });
};
