import axios from "axios";
import { alertaError } from "../../generics/Alertas";

export const documentServices={
    saveFile: async ( archivo: { archivo: File; nombreArchivo: string },ruta:string)=>{
        const url = new File([archivo.archivo], archivo.nombreArchivo);
        let adress = "";
        // value === "Guías" ? (ruta = "/GUIAS/") : (ruta = "/VIDEOS/TUTORIALES/");
        adress = (process.env.REACT_APP_DOC_ROUTE || "") + ruta;
        
        let dataArray = new FormData();
        dataArray.append("ROUTE", `${adress}`);
        dataArray.append("ADDROUTE", "TRUE");
        dataArray.append("FILE", url); // probar mandar archivo.archivo
      
        axios
          .post(
            process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
            dataArray,
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken") || "",
              },
            }
          )
          .then(({ data }) => {
           
          })
          .catch(() => {
            alertaError('Ocurrio un problema al guardar el archivo')
          });
      }
}