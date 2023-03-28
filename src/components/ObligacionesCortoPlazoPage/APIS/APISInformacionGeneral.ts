import axios from "axios";
import Swal from "sweetalert2";

export async function getDestinos (){
    await axios({
        method: 'get',
        url: 'http://10.200.4.199:8000' + '/api/get-destinos',
        data: {},
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
      })
      .then( ({data})=> {
            return  data;
      })
      .catch( (error)=> {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
}

export  function getObligadoSolidarioAval (setState:Function){
     axios({
        method: 'get',
        url: 'http://10.200.4.199:8000' + '/api/get-obligadoSolidarioAval',
        data: {},
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
      })
      .then( ({data})=> {
      
        
           //setState(data)
            return  data;
      })
      .catch( (error)=> {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
}

export  function getSolicitudes (setState:Function){
  axios({
     method: 'get',
     url: 'http://10.200.4.199:8000' + '/api/get-solicitudes',
     data: {},
     headers: {
         "Content-Type": "application/json",
         Authorization: localStorage.getItem("jwtToken") || "",
       },
   })
   .then( ({data})=> {
         setState(data.data)
   })
   .catch( (error)=> {
     Swal.fire({
       icon: "error",
       title: "Mensaje",
       text: "(" + error.response.status + ") " + error.response.data.msg,
     });
   });
}