import axios from "axios";
import Swal from "sweetalert2";
import { IMunicipioUOrganizacion } from "../Panels/Encabezado";
import { useEffect,useState } from "react";

export  function getMunicipiosUOrganismos (){
     axios({
        method: 'get',
        url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-entePublicoObligado',
        data: {},
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
      })
      .then( ({data})=> {
        console.log(data.data);
        let aux  : IMunicipioUOrganizacion []
          aux = data.data || []
        
            return  aux;
      })
      .catch( (error)=> {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        })

        return [];
      });
}