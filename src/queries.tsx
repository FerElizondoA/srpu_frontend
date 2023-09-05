export const queries = {
  text: {
    fontSize: "2ch",
    fontFamily: "MontserratRegular",
    alignSelf: "center",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },
  },
  medium_text: {
    fontSize: "2ch",
    fontFamily: "MontserratMedium",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },
  },
  bold_text: {
    fontSize: "1.8ch",
    fontFamily: "MontserratBold",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },
  },

  bold_text_Largo_Plazo: {
    fontSize: "1.8ch",
    fontFamily: "MontserratBold",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },

    "@media (min-width: 513px)": {
      fontSize: "1.25ch",
    },
    "@media (min-width: 600px)": {
      fontSize: "1.30ch",
    },
    "@media (min-width: 900px)": {
      fontSize: "1.35ch",
    },
    "@media (min-width: 1300px)": {
      fontSize: "1.40ch",
    },
    "@media (min-width: 1485px)": {
      fontSize: "1.8ch",
    },
    "@media (min-width: 1870px)": {
      fontSize: "1.8ch",
    },
  },

  bold_text_InfoGeneralGastoCosto: {
    fontFamily: "MontserratBold",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },

    "@media (min-width: 513px)": {
      fontSize: "1.25ch",
    },
    "@media (min-width: 600px)": {
      fontSize: "1.30ch",
    },
    "@media (min-width: 900px)": {
      fontSize: "0.5ch",
    },
    "@media (min-width: 1300px)": {
      fontSize: "0.5ch",
    },
    "@media (min-width: 1485px)": {
      fontSize: "1.35ch",
    },
    "@media (min-width: 1870px)": {
      fontSize: "1.5ch",
    },
  },

  italic_text: {
    fontSize: "2ch",
    fontFamily: "MontserratRegular",
    fontStyle: "oblique",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },
  },
  icon: {
    fontSize: "25px",
    color: "#000",
  },

  title: {
    fontSize: "3ch",
    fontFamily: "MontserratMedium",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "2rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "2.5ch",
    },
  },
  buttonCancelar: {
    backgroundColor: "rgb(175, 140, 85)",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(175, 140, 85, 0.6)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
  },
  buttonContinuar: {
    backgroundColor: "#15212f",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
  },

  tablaDisposicionPagosCapital: {
    height: 450,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "@media (min-width: 1870px)": {
      height: 430,
    },
  },
  tablaFideicomisario: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  tablaAutorizacion: {
    height: "80%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "@media (min-width: 1870px)": {
      height: "80%",
    },
  },

  tablaUsuarios: {
    height: 560,
    width: "100%",
    maxHeight: "50%",
    overflow: "auto",
    "@media (min-width: 1870px)": {
      height: 775,
    },
  },

  tablaNotificaciones: {
    height: "37rem",
    width: "100%",

    overflow: "auto",
    "@media (min-width: 1870px)": {
      height: 780,
    },
  },

  botonAgregarCondicionFinanciera: {
    backgroundColor: "#15212f",
    height: "6vh",
    width: "8%",
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    textTransform: "capitalize",
  },

  tablaCondicionFinanciera: {
    height: 500,
    width: "100%",
    "@media (min-width: 1870px)": {
      height: 710,
    },
  },

  buttonCancelarSolicitudInscripcion: {
    marginTop: "2rem",
    backgroundColor: "rgb(175, 140, 85)",
    height: "4vh",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(175, 140, 85, 0.6)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
  },

  buttonContinuarSolicitudInscripcion: {
    marginTop: "1rem",
    backgroundColor: "#15212f",
    height: "4vh",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
  },

  buttonContinuarAbsolute: {
    position: "absolute",
    right: 30,
    backgroundColor: "#15212f",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
  },

  noRegistroAbsolute: {
    position: "absolute",
    left: 500,
    fontSize: "100%",
    borderRadius: "0.8vh",
    alignItems: "center",
  },

  labelTextComentarios: {
    fontSize: "2ch",
    fontFamily: "MontserratBold",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: "1rem",
    },
    "@media (min-width: 601px) and (max-width: 900px)": {
      // SM (small) screen
      fontSize: "1.5ch",
    },
  },

  tablaSolicitudInscripcion: {
    height: "50vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: ".2vw",
      mt: 1,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#AF8C55",
      outline: "1px solid slategrey",
      borderRadius: 1,
    },
    "@media (min-width: 1870px)": {
      height: "62vh",
    },
  },

  contenedorAutorizacion: {
    "@media (min-width: 513px)": {
      height: "34rem",
    },
    "@media (min-width: 600px)": {
      height: "35rem",
    },
    "@media (min-width: 900px)": {
      height: "36rem",
    },
    "@media (min-width: 1300px)": {
      height: "36rem",
    },
    "@media (min-width: 1485px)": {
      height: "35rem",
    },
    "@media (min-width: 1870px)": {
      height: "49rem",
    },
  },

  contenedorTipoMovimiento: {
    "@media (min-width: 513px)": {
      height: "35rem",
    },
    "@media (min-width: 600px)": {
      height: "36rem",
    },
    "@media (min-width: 900px)": {
      height: "37rem",
    },
    "@media (min-width: 1300px)": {
      height: "38rem",
    },
    "@media (min-width: 1485px)": {
      height: "38rem",
    },
    "@media (min-width: 1870px)": {
      height: "49rem",
    },
  },

  contenedorDatoGenerales: {
    "@media (min-width: 513px)": {
      height: "25rem",
    },
    "@media (min-width: 600px)": {
      height: "26rem",
    },
    "@media (min-width: 900px)": {
      height: "27rem",
    },
    "@media (min-width: 1300px)": {
      height: "28rem",
    },
    "@media (min-width: 1485px)": {
      height: "29rem",
    },
    "@media (min-width: 1870px)": {
      height: "32rem",
    },
  },

  contenedorInformacionGeneral: {
    "@media (min-width: 1485px)": {
      height: "32rem",
    },
    "@media (min-width: 1870px)": {
      height: "44rem",
    },
  },

  contenedorAgregarAutorizacion: {
    RegistrarAutorizacion: {
      "@media (min-width: 513px)": {
        height: "26rem",
      },
      "@media (min-width: 600px)": {
        height: "27rem",
      },
      "@media (min-width: 900px)": {
        height: "28rem",
      },
      "@media (min-width: 1300px)": {
        height: "29rem",
      },

      "@media (min-width: 1485px)": {
        height: "28rem",
      },
      "@media (min-width: 1870px)": {
        height: "35rem",
      },
    },

    MontoAutorizado: {
      "@media (min-width: 513px)": {
        height: "26rem",
      },
      "@media (min-width: 600px)": {
        height: "27rem",
      },
      "@media (min-width: 900px)": {
        height: "28rem",
      },
      "@media (min-width: 1300px)": {
        height: "29rem",
      },

      "@media (min-width: 1485px)": {
        height: "37rem",
      },
      "@media (min-width: 1870px)": {
        height: "50rem",
      },
    },

    DetalleDestino: {
      "@media (min-width: 513px)": {
        height: "26rem",
      },
      "@media (min-width: 600px)": {
        height: "27rem",
      },
      "@media (min-width: 900px)": {
        height: "28rem",
      },
      "@media (min-width: 1300px)": {
        height: "29rem",
      },

      "@media (min-width: 1485px)": {
        height: "37rem",
      },
      "@media (min-width: 1870px)": {
        height: "50rem",
      },
    },

    Tablas: {
      height: "13rem",

      "@media (min-width: 513px)": {
        height: "9rem",
      },
      "@media (min-width: 600px)": {
        height: "10rem",
      },
      "@media (min-width: 900px)": {
        height: "12rem",
      },
      "@media (min-width: 1300px)": {
        height: "13rem",
      },
      "@media (min-width: 1485px)": {
        height: "28rem",
      },
      "@media (min-width: 1870px)": {
        height: "40rem",
      },
    },
  },

  configuracion: {
    width: "85%",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    justifyItems: "center",
    alignItems: "center",
    boxShadow: 5,
    borderRadius: 10,
    height: "95%",
  },

  catalogosConfig: {
    "@media (min-width: 480px)": {
      height: "30rem",
    },
    "@media (min-width: 768px)": {
      height: "34rem%",
    },
    "@media (min-width: 1140px)": {
      height: "38rem",
    },
    "@media (min-width: 1400px)": {
      height: "42rem",
    },
    "@media (min-width: 1870px)": {
      height: "55rem",
    },

    contenedorListado: {
      height: "90%",
      flexDirection: "column",
      display: "flex",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: ".2vw",
        mt: 1,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#AF8C55",
        outline: "1px solid slategrey",
        borderRadius: 1,
      },
    },

    botonListado: {
      width: "100%",
      borderRadius: 20,
      display: "flex",
      justifyContent: "start",
      fontFamily: "MontserratMedium",
    },
  },
};
