import axios from "axios";

export function getPreviewSolicitud(setState: Function) {
  axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem('IdCentral'),
      IdApp: localStorage.getItem('IdApp')
    },
    url: process.env.REACT_APP_APPLICATION_LOGIN + `/api/solicitudes-app`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      console.log(data.data);

      setState(data.data);
    })
    .catch((error) => {


    });
}

export function getDetailSolicitudUsuario(idSolicitud: string, setState: Function) {
  axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem('IdCentral'),
      IdSolicitud: idSolicitud
    },
    url: process.env.REACT_APP_APPLICATION_LOGIN + `/api/detalleSol`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      // console.log(data.data);
      setState(data.data[0]);
    })
    .catch((error) => {
      

    });
}

export function getComentarios(idSolicitud: string,cantComent: Function, setState: Function){
  axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem('IdCentral'),
      IdSolicitud: idSolicitud
    },
    url: process.env.REACT_APP_APPLICATION_LOGIN + `/api/comentarios-solicitudes`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
  .then(({data}) => {
    console.log(data.data);
    cantComent(data.data.length); //Obtienes la cantidad de comentarios
    
    setState(data.data); //Obtienes los comentarios en Si 
  })
  .catch((error) => {
  });
}
