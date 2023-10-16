const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const headerFolder = "controllers/templates/header.html";
const footerFolder = "controllers/templates/footer.html";
const templateRequerimientos =
  "controllers/templates/template_requerimientos.html";
const templateConstancia = "controllers/templates/template_constancia.html";

module.exports = {
  createPdfRequerimientos: async (req, res) => {
    const {
      oficioRequerimiento,
      servidorPublico,
      cargo,
      organismo,
      oficioSolicitud,
      fechaSolicitud,
      fechaContratacion,
      entePublicoObligado,
      institucionFinanciera,
      montoOriginalContratado,
      comentarios,
      directorGeneral,
      cargoDirectorGeneral,
    } = req.body;

    const headerTemplate = fs.readFileSync(headerFolder, "utf8");
    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var header = headerTemplate;
    var footer = footerTemplate;

    const headerImg = (logoTesoreria, escudo) => {
      const resLogoTesoreria = fs.readFileSync(logoTesoreria);
      const resEescudo = fs.readFileSync(escudo);

      header = headerTemplate
        .replaceAll(
          "{{logoTesoreria}}",
          `data:image/${path
            .extname(logoTesoreria)
            .split(".")
            .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
            "base64"
          )}`
        )
        .replaceAll(
          "{{escudo}}",
          `data:image/${path
            .extname(escudo)
            .split(".")
            .pop()};base64,${Buffer.from(resEescudo, "binary").toString(
            "base64"
          )}`
        );
    };

    headerImg(
      "controllers/stylessheet/images/logoTesoreria.png",
      "controllers/stylessheet/images/escudo.png"
    );

    const coments = `<table
        id="data-table"
        style="
          border-collapse: collapse;
          font-family: Arial;
          font-size: 12px;
          text-align: justify;
          font-weight: 100;
          letter-spacing: 1px;
        "
      >
        <tbody>
          ${Object.keys(JSON.parse(comentarios)).map((val) => {
            return `<tr> <td style="width: 15%; vertical-align: -webkit-baseline-middle">${val}</td> <td style="width: 5%; vertical-align: -webkit-baseline-middle"></td><td style="width: 40%; vertical-align: -webkit-baseline-middle"> ${
              JSON.parse(comentarios)[val]
            }</td> </tr>`;
          })}
        </tbody>
      </table>`;

    const footerImg = (logoLeon) => {
      const resLogoLeon = fs.readFileSync(logoLeon);

      footer = footerTemplate.replaceAll(
        "{{logoLeon}}",
        `data:image/${path
          .extname(logoLeon)
          .split(".")
          .pop()};base64,${Buffer.from(resLogoLeon, "binary").toString(
          "base64"
        )}`
      );
    };

    footerImg("controllers/stylessheet/images/logoLeon.png");

    const htmlTemplate = fs.readFileSync(templateRequerimientos, "utf8");

    const html = htmlTemplate
      .replaceAll("{{oficioRequerimiento}}", oficioRequerimiento)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargo}}", cargo)
      .replaceAll("{{organismo}}", organismo)
      .replaceAll("{{oficioSolicitud}}", oficioSolicitud)
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral)
      .replaceAll("{{comentarios}}", coments);

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${
        oficioRequerimiento - new Date().getFullYear
      }.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfConstancia: async (req, res) => {
    const {
      oficioConstancia,
      servidorPublico,
      cargo,
      organismo,
      oficioSolicitud,
      fechaSolicitud,
      tipoDocumento,
      fechaContratacion,
      claveInscripcion,
      fechaClave,
      entePublicoObligado,
      obligadoSolidarioAval,
      institucionFinanciera,
      montoOriginalContratado,
      destino,
      plazo,
      amortizaciones,
      tasaInteres,
      tasaEfectiva,
      mecanismoVehiculoDePago,
      fuentePago,
      garantiaDePago,
      instrumentoDerivado,
      financiamientosARefinanciar,
      directorGeneral,
      cargoDirectorGeneral,
    } = req.body;

    const headerTemplate = fs.readFileSync(headerFolder, "utf8");
    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var header = headerTemplate;
    var footer = footerTemplate;

    const headerImg = (logoTesoreria, escudo) => {
      const resLogoTesoreria = fs.readFileSync(logoTesoreria);
      const resEescudo = fs.readFileSync(escudo);

      header = headerTemplate
        .replaceAll(
          "{{logoTesoreria}}",
          `data:image/${path
            .extname(logoTesoreria)
            .split(".")
            .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
            "base64"
          )}`
        )
        .replaceAll(
          "{{escudo}}",
          `data:image/${path
            .extname(escudo)
            .split(".")
            .pop()};base64,${Buffer.from(resEescudo, "binary").toString(
            "base64"
          )}`
        );
    };

    headerImg(
      "controllers/stylessheet/images/logoTesoreria.png",
      "controllers/stylessheet/images/escudo.png"
    );

    const footerImg = (logoLeon) => {
      const resLogoLeon = fs.readFileSync(logoLeon);

      footer = footerTemplate.replaceAll(
        "{{logoLeon}}",
        `data:image/${path
          .extname(logoLeon)
          .split(".")
          .pop()};base64,${Buffer.from(resLogoLeon, "binary").toString(
          "base64"
        )}`
      );
    };

    footerImg("controllers/stylessheet/images/logoLeon.png");

    const htmlTemplate = fs.readFileSync(templateConstancia, "utf8");

    const html = htmlTemplate
      .replaceAll("{{oficioConstancia}}", oficioConstancia)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargo}}", cargo)
      .replaceAll("{{organismo}}", organismo)
      .replaceAll("{{oficioSolicitud}}", oficioSolicitud)
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud)
      .replaceAll("{{tipoDocumento}}", tipoDocumento)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{claveInscripcion}}", claveInscripcion)
      .replaceAll("{{fechaClave}}", fechaClave)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{obligadoSolidarioAval}}", obligadoSolidarioAval)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{destino}}", destino)
      .replaceAll("{{plazo}}", plazo)
      .replaceAll("{{amortizaciones}}", amortizaciones)
      .replaceAll("{{tasaInteres}}", tasaInteres)
      .replaceAll("{{tasaEfectiva}}", tasaEfectiva)
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago)
      .replaceAll("{{fuentePago}}", fuentePago)
      .replaceAll("{{garantiaDePago}}", garantiaDePago)
      .replaceAll("{{instrumentoDerivado}}", instrumentoDerivado)
      .replaceAll(
        "{{financiamientosARefinanciar}}",
        financiamientosARefinanciar
      )
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral);

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia - new Date().getFullYear}.pdf`
    );
    res.send(pdfBuffer);
  },
};
