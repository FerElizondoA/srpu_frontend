const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
// const pdfsig = require("pdfsig");
const { PDFDocument, rgb } = require("pdf-lib");

const headerFolder = "controllers/templates/header.html";
const footerFolder = "controllers/templates/footer.html";
const templateSolicitudCorto = "controllers/templates/template_corto.html";
const templateRequerimientos =
  "controllers/templates/template_requerimientos.html";
const templateConstancia = "controllers/templates/template_constancia.html";

module.exports = {
  createPdfSolicitudCorto: async (req, res) => {
    //#region HEADER
    const headerTemplate = fs.readFileSync(headerFolder, "utf8");

    var header = headerTemplate;

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

    //#endregion

    //#region FOOTER

    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var footer = footerTemplate;

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
    //#endregion

    const htmlTemplate = fs.readFileSync(templateSolicitudCorto, "utf8");

    const {
      oficioNum,
      directorGeneral,
      cargoDirectorGeneral,
      servidorPublico,
      cargoServidorPublico,
      organismoServidorPublico,
      institucionFinanciera,
      fechaContratacion,
      montoOriginalContratado,
      entePublicoObligado,
      destino,
      plazo,
      tasaInteres,
      comisiones,
      gastosAdicionales,
      tasaEfectiva,
      mecanismoVehiculoDePago,
      fuentePago,
      garantiaDePago,
      reglas,
      documentos,
    } = req.body;

    const declaratorias = JSON.parse(reglas).map((val) => {
      return (
        '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
        val +
        "</p>"
      );
    });

    const docs = JSON.parse(documentos).map((val) => {
      return (
        '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
        val.descripcionTipo +
        "</p>"
      );
    });

    const html = htmlTemplate
      .replaceAll("{{oficioNum}}", oficioNum)
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargoServidorPublico}}", cargoServidorPublico)
      .replaceAll("{{organismoServidorPublico}}", organismoServidorPublico)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{destino}}", destino)
      .replaceAll("{{plazo}}", plazo)
      .replaceAll("{{tasaInteres}}", tasaInteres)
      .replaceAll("{{comisiones}}", comisiones)
      .replaceAll("{{gastosAdicionales}}", gastosAdicionales)
      .replaceAll("{{tasaEfectiva}}", tasaEfectiva)
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago)
      .replaceAll("{{fuentePago}}", fuentePago)
      .replaceAll("{{garantiaDePago}}", garantiaDePago)
      .replaceAll("{{reglas}}", declaratorias)
      .replaceAll("{{documentos}}", docs);

    const watermarkText = `${oficioNum}/SFYTGE/${new Date().getFullYear()}`;

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    await page.evaluate((watermarkText) => {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.opacity = 0.2;
      div.style.top = 300;
      div.style.bottom = 0;
      div.style.left = 300;
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.textAlign = "center";
      div.style.fontSize = "48px";
      div.style.color = "k";
      div.style.transform = "rotate(-45deg)";
      div.style.transformOrigin = "50% 50%";
      div.textContent = `${watermarkText}`;
      document.body.appendChild(div);
    }, watermarkText);

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
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioNum - new Date().getFullYear}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfRequerimientos: async (req, res) => {
    //#region HEADER
    const headerTemplate = fs.readFileSync(headerFolder, "utf8");

    var header = headerTemplate;

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

    //#endregion

    //#region FOOTER

    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var footer = footerTemplate;

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
    //#endregion

    const htmlTemplate = fs.readFileSync(templateRequerimientos, "utf8");

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

    const coments =
      '<table id="data-table" style=" border-collapse: collapse; font-family: Arial; font-size: 12px; text-align: justify; font-weight: 100; letter-spacing: 1px;"><tbody>' +
      Object.keys(JSON.parse(comentarios)).map((val) => {
        return (
          '<tr> <td style="width: 15%; vertical-align: -webkit-baseline-middle">' +
          val +
          '</td> <td style="width: 5%; vertical-align: -webkit-baseline-middle"></td><td style="width: 40%; vertical-align: -webkit-baseline-middle">' +
          JSON.parse(comentarios)[val] +
          "</td> </tr>"
        );
      }) +
      "</tbody> </table>;";

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
    //#region HEADER
    const headerTemplate = fs.readFileSync(headerFolder, "utf8");

    var header = headerTemplate;

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

    //#endregion

    //#region FOOTER

    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var footer = footerTemplate;

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
    //#endregion

    const htmlTemplate = fs.readFileSync(templateConstancia, "utf8");

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

  // firmaPdf: async (req, res) => {
  //   const { inputPath, watermarkText } = req.body;

  //   const pdfData = fs.readFileSync("controllers/templates/template.pdf");
  //   const pdfDoc = await PDFDocument.load(pdfData);

  //   // Crear una nueva página con la marca de agua
  //   const [page] = pdfDoc.getPages();
  //   const { width, height } = page.getSize();

  //   // Definir el contenido de la marca de agua
  //   const fontSize = 30;

  //   page.drawText(watermarkText, {
  //     x: width / 2 - (watermarkText.length * fontSize) / 3,
  //     y: height / 2,
  //     size: fontSize,
  //     color: rgb(0, 0, 0), // Color de la marca de agua (negro)
  //   });

  //   // Guardar el PDF modificado con la marca de agua
  //   const modifiedPdfData = await pdfDoc.save();

  //   await fs.writeFile("controllers/templates/template.pdf", modifiedPdfData);
  // },
};
