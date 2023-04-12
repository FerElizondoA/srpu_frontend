import axios from "axios";
import { log } from "console";

export function getPreviewSolicitud(setState: Function) {
    axios({
      method: "get",
      params:{
        IdUsuario: localStorage.getItem('IdCentral'),
        IdApp: localStorage.getItem('IdApp')
      },
      url: process.env.REACT_APP_APPLICATION_LOGIN  + `/api/solicitudes-app`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {console.log(data.data);
      
        setState(data.data);
      })
      .catch((error) => {
        
        
      });
  }