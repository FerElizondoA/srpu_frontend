//hwlkhhcgqytvnkba
var nodemailer = require("nodemailer");
const db = require("../../config/db.js");

module.exports = {
  sendEmail: async (req, res) => {
    let { usuarios, titulo, asunto, plantilla } = req;

    var transporter = nodemailer.createTransport({
      host: process.env.SRPU_B_APP_EMAIL_HOST,
      port: process.env.SRPU_B_APP_EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.SRPU_B_APP_EMAIL_USERNAME, // enter your email address
        pass: process.env.SRPU_B_APP_EMAIL_PASSWORD, // enter your visible/encripted password
      },
      tls: { rejectUnauthorized: false },
    });

    function getCorreo() {
      return new Promise((resolve, reject) => {
        let emails = "";
        let mock = "";
        db.query(
          `CALL sp_DetalleCorreos('${usuarios}', '${plantilla}')`,
          (err, result) => {
            mock = result[1][0].body;
            result[0].map(({ CorreoElectronico }) => {
              if (emails !== "") {
                return (emails = emails + "; " + CorreoElectronico);
              } else {
                return (emails = CorreoElectronico);
              }
            });
            resolve({ emails: emails, plantilla: mock });
          }
        );
      });
    }

    getCorreo().then((r) => {
      transporter.sendMail({
        from: process.env.SRPU_B_APP_EMAIL_ADDRESS,
        to: r.emails, //"japerez@cecapmex.com; prpardo@cecapmex.com"
        subject: titulo,
        text: asunto,
        html: r.plantilla
          .replaceAll("{{Titulo}}", titulo)
          .replaceAll("{{Asunto}}", asunto),
      });
    });
  },
};
