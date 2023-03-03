import axios from "axios";
import Swal from "sweetalert2";

export const getDestinos=()=>{
    axios({
        method: 'get',
        url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-destinos',
        data: {},
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
      })
      .then( (response)=> {
        
            console.log(response);
            return(response);
      })
      .catch( (error)=> {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
}
