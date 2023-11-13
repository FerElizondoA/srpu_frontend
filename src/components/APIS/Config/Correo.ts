import axios from "axios";

export const sendMail = (v: string, mensaje: string, documentType: string) => {
  const objeto = {
    mensaje: mensaje,
    documentType: documentType,
  };

  let dataArray = new FormData();
  dataArray.append("referencia", "007");
  dataArray.append("subject", `Hola`);
  dataArray.append("data", JSON.stringify(objeto));
  dataArray.append("to[0]", "[japerez@cecapmex.com]");
  //dataArray.append("to",localStorage.getItem("IdUsuario") || "" )

  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/serviciocorreo",
      dataArray,

      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .catch((err) => {});
};
