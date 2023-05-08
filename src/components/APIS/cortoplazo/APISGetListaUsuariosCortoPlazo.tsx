import axios from "axios";
import Swal from "sweetalert2";

export const getListadoUsuariosCortoPlazo = (setState: Function,permisosEspeciales = 0) => {

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
        
        if (r.response.status === 409) {
  
        }
      });
  };