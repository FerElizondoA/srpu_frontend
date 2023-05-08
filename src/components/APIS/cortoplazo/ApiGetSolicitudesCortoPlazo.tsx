import axios from "axios";
import { useCortoPlazoStore } from "../../../store/main";

export function getComentariosSolicitudPlazo(idSolicitud: string, setState: Function){
 
  const state = useCortoPlazoStore.getState();

  // const IdSolicitud = state.IdSolicitud

 
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
      
      
      setState(data.data); //Obtienes los comentarios en Si 
    })
    .catch((error) => {
      
      
    });
  }
  