import axios from "axios";
import { alertaError } from "./Alertas";

export async function getListadoPathDoc(setState: Function) {
    await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/get-ListadoPathDoc",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        setState(data.data);
      })
      .catch((error) => {
       
  
        alertaError( "(" + error.response.status + ") " + error.response.data.msg,)
      });
  }