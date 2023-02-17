//hwlkhhcgqytvnkba
var nodemailer = require("nodemailer");
const db = require("../../config/db.js");

module.exports = {
  sendEmail: async (req, res) => {
    const mailData = req.body;
    const subject = mailData.subject;
    const message = mailData.message;
    const IdDestinatario = mailData.IdDestinatario;
    const IdRemitente = mailData.IdRemitente;

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SRPU_B_APP_EMAIL_USER, // enter your email address
        pass: process.env.SRPU_B_APP_EMAIL_PASSWORD, // enter your visible/encripted password
      },
      tls: { rejectUnauthorized: false },
    });

    function getCorreo() {
      return new Promise((resolve, reject) => {
        db.query(
          `CALL sp_DetalleUsuario('${IdDestinatario}')`,
          (err, result) => {
            resolve(result[0][0].CorreoElectronico);
          }
        );
      });
    }

    getCorreo().then((r) => {
      CorreoElectronico = r;
      var mailOptions = {
        from: process.env.SRPU_B_APP_EMAIL_USER,
        to: CorreoElectronico,
        subject: subject,
        text: message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw error;
        }

        if (info.response.includes("250")) {
          db.query(
            `CALL sp_RegistroCorreo('${IdDestinatario}','${IdRemitente}','${subject}','${message}','${info.response}')`,
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  error: "Error",
                });
              }
              if (result.length) {
                const data = result[0];
                if (data.error) {
                  return res.status(409).send({
                    data,
                  });
                }
                return res.status(201).send({
                  msg: "¡Email enviado!",
                });
              } else {
                return res.status(409).send({
                  error: "¡Sin Información!",
                });
              }
            }
          );
        }
      });
    });
  },

  enviarCorreo: {},
};
