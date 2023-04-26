import axios from "axios";

export function getComentariosSolicitudPlazo(idSolicitud: string, setState: Function){
  console.log("idSolicitud en el axios: ", idSolicitud);
  
    axios({
      method: "get",
      params: {
        IdUsuario: localStorage.getItem('IdUsuario'),
        IdSolicitud: idSolicitud
      },
      url: process.env.REACT_APP_APPLICATION_BACK + `/api/get-comentarios`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then(({data}) => {
      
      console.log("data.data", data.data)
      setState(data.data); //Obtienes los comentarios en Si 
    })
    .catch((error) => {
      console.log(error);
      
    });
  }
  