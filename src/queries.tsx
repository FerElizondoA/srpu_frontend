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
    fontSize: "1rem",
    fontFamily: "MontserratMedium",

    "@media (min-width: 480px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 1140px)": {
      fontSize: ".9rem",
    },

    "@media (min-width: 1400px)": {
      fontSize: ".9rem",
    },
  },

  bold_text: {
    fontSize: "1rem",
    fontFamily: "MontserratBold",

    "@media (min-width: 480px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 1140px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 1400px)": {
      fontSize: "1rem",
    },
  },

  bold_text_Largo_Plazo: {
    fontSize: "0.7rem",
    fontFamily: "MontserratBold",
    // "@media (max-width: 600px)": {
    //   // XS (extra small) screen
    //   fontSize: "1.5ch",
    // },
    // "@media (min-width: 601px) and (max-width: 900px)": {
    //   // SM (small) screen
    //   fontSize: "1.5ch",
    // },
    "@media (min-width: 480px)": {
      fontSize: "0.8rem",
    },

    "@media (min-width: 768px)": {
      fontSize: ".8rem",
    },

    "@media (min-width: 1140px)": {
      fontSize: "1rem",
    },

    "@media (min-width: 1400px)": {
      fontSize: "1rem",
    },

    tituloCredito: {
      fontFamily: "MontserratBold",
      fontSize: ".9rem",
      "@media (min-width: 480px)": {
        fontSize: "1.1rem",
      },

      "@media (min-width: 768px)": {
        fontSize: "1.2rem",
      },

      "@media (min-width: 1140px)": {
        fontSize: "1.3rem",
      },

      "@media (min-width: 1400px)": {
        fontSize: "1.4rem",
      },
    },
  },

  bold_text_InfoGeneralGastoCosto: {
    fontFamily: "MontserratBold",
    "@media (max-width: 600px)": {
      // XS (extra small) screen
      fontSize: ".5rem",
    },

    "@media (min-width: 513px)": {
      fontSize: ".5rem",
    },
    "@media (min-width: 600px)": {
      fontSize: ".5rem",
    },
    "@media (min-width: 900px)": {
      fontSize: ".rem",
    },
    "@media (min-width: 1300px)": {
      fontSize: ".6rem",
    },
    "@media (min-width: 1485px)": {
      fontSize: ".7rem",
    },
    "@media (min-width: 1870px)": {
      fontSize: ".7rem",
    },
  },

  leyendaArchivoGastosCosto: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    //fontSize: "30%",
    color: "#15212f",

    fontSize: "50%",
    "@media (min-width: 480px)": {
      fontSize: "50%",
    },

    "@media (min-width: 768px)": {
      fontSize: "50%",
    },

    "@media (min-width: 1140px)": {
      fontSize: "50%",
    },

    "@media (min-width: 1400px)": {
      fontSize: "80%",
    },

    "@media (min-width: 1870px)": {
      fontSize: "80%",
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
    borderRadius: "0.8vh",
    textTransform: "capitalize",
    fontSize: "60%",
    "@media (min-width: 480px)": {
      fontSize: "70%",
    },

    "@media (min-width: 768px)": {
      fontSize: "80%",
    },
  },
  buttonContinuar: {
    backgroundColor: "#15212f",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    //fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
    fontSize: "60%",
    "@media (min-width: 480px)": {
      fontSize: "70%",
    },

    "@media (min-width: 768px)": {
      fontSize: "80%",
    },
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
    height: 545,
    width: "100%",
    maxHeight: "50%",
    overflow: "auto",
    "@media (min-width: 1870px)": {
      height: 760,
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
    backgroundColor: "rgb(175, 140, 85)",
    height: "2.8rem",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(175, 140, 85, 0.6)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
    width: "6rem",

    "@media (min-width: 480px)": {
      width: "6rem",
    },

    "@media (min-width: 768px)": {
      width: "10rem",
    },

    "@media (min-width: 1140px)": {
      width: "10rem",
    },

    "@media (min-width: 1400px)": {
      width: "12rem",
    },

    "@media (min-width: 1870px)": {
      width: "12rem",
    },
  },

  buttonContinuarSolicitudInscripcion: {
    backgroundColor: "#15212f",
    height: "2.8rem",
    color: "white",
    "&&:hover": {
      backgroundColor: "rgba(47, 47, 47, 0.4)",
      color: "#000",
    },
    fontSize: "90%",
    borderRadius: "0.8vh",
    textTransform: "capitalize",
    width: "6rem",
    "@media (min-width: 480px)": {
      width: "6rem",
    },

    "@media (min-width: 768px)": {
      width: "10rem",
    },

    "@media (min-width: 1140px)": {
      width: "10rem",
    },

    "@media (min-width: 1400px)": {
      width: "12rem",
    },

    "@media (min-width: 1870px)": {
      width: "12rem",
    },
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
    height: "49vh",
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
    height: "46rem",
    "@media (min-width: 480px)": {
      height: "50rem",
    },

    "@media (min-width: 768px)": {
      height: "70rem",
    },

    "@media (min-width: 1140px)": {
      height: "70rem",
    },

    "@media (min-width: 1400px)": {
      height: "35rem",
    },

    "@media (min-width: 1870px)": {
      height: "51rem",
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
    height: "68rem",
    "@media (min-width: 480px)": {
      height: "68rem",
    },

    "@media (min-width: 768px)": {
      height: "60rem",
    },

    "@media (min-width: 1140px)": {
      height: "32rem",
    },

    "@media (min-width: 1400px)": {
      height: "32rem",
    },

    "@media (min-width: 1870px)": {
      height: "44rem",
    },
  },

  contenedorAgregarAutorizacion: {
    RegistrarAutorizacion: {
      "@media (min-width: 480px)": {
        height: "30rem",
      },
      "@media (min-width: 768px)": {
        height: "20rem",
      },
      "@media (min-width: 1140px)": {
        height: "29rem",
      },
      "@media (min-width: 1400px)": {
        height: "28rem",
      },
      "@media (min-width: 1870px)": {
        height: "35rem",
      },
    },

    MontoAutorizado: {
      height: "34rem",
      "@media (min-width: 480px)": {
        height: "38rem",
      },
      "@media (min-width: 768px)": {
        height: "30rem",
      },
      "@media (min-width: 1140px)": {
        height: "30rem",
      },
      "@media (min-width: 1400px)": {
        height: "36rem",
      },
      "@media (min-width: 1870px)": {
        height: "42rem",
      },
    },

    Tablas: {
      height: "60%",
      "@media (min-width: 480px)": {
        height: "60%",
      },
      "@media (min-width: 768px)": {
        height: "60%",
      },
      "@media (min-width: 1140px)": {
        height: "60%",
      },
      "@media (min-width: 1400px)": {
        height: "80%",
      },
      "@media (min-width: 1870px)": {
        height: "80%",
      },
    },

    DetalleDestino: {
      height: "34rem",
      "@media (min-width: 480px)": {
        height: "38rem",
      },
      "@media (min-width: 768px)": {
        height: "30rem",
      },
      "@media (min-width: 1140px)": {
        height: "30rem",
      },
      "@media (min-width: 1400px)": {
        height: "36rem",
      },
      "@media (min-width: 1870px)": {
        height: "42rem",
      },
    },
  },

  modulosConfig: {
    color: "black",
    width: "80%",
    height: "65%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    boxShadow: 1,
    fontSize: "55%",
    "@media (min-width: 480px)": {
      fontSize: "65%",
    },
    "@media (min-width: 768px)": {
      fontSize: "75%",
    },
    "@media (min-width: 1140px)": {
      fontSize: "75%",
    },
    "@media (min-width: 1400px)": {
      fontSize: "80%",
    },
    "@media (min-width: 1870px)": {
      fontSize: "90%",
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
    height: "35rem",
    "@media (min-width: 480px)": {
      height: "95%",
    },
    "@media (min-width: 768px)": {
      height: "95%",
    },
    "@media (min-width: 1140px)": {
      height: "95%",
    },
    "@media (min-width: 1400px)": {
      height: "95%",
    },
    "@media (min-width: 1870px)": {
      height: "95%",
    },
  },

  catalogosConfig: {
    height: "32rem",
    "@media (min-width: 480px)": {
      height: "35rem",
    },
    "@media (min-width: 768px)": {
      height: "38rem",
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

      height: "70%",
      "@media (min-width: 480px)": {
        height: "90%",
      },
      "@media (min-width: 768px)": {
        height: "90%",
      },
      "@media (min-width: 1140px)": {
        height: "90%",
      },
      "@media (min-width: 1400px)": {
        height: "90%",
      },
    },

    modulo: {
      fontFamily: "MontserratMedium",
      fontSize: "65%",
      "@media (min-width: 480px)": {
        fontSize: "70%",
      },
      "@media (min-width: 768px)": {
        fontSize: "80%",
      },
      "@media (min-width: 1140px)": {
        fontSize: "95%",
      },
      "@media (min-width: 1400px)": {
        fontSize: "100%",
      },
    },

    botonListado: {
      color: "black",
      width: "100%",
      borderRadius: 20,
      display: "flex",
      justifyContent: "center",
      fontFamily: "MontserratMedium",
      fontSize: "50%",
      "@media (min-width: 480px)": {
        fontSize: "60%",
      },
      "@media (min-width: 768px)": {
        justifyContent: "start",
        fontSize: "70%",
      },
      "@media (min-width: 1140px)": {
        fontSize: "80%",
      },
      "@media (min-width: 1400px)": {
        fontSize: "90%",
      },
      "@media (min-width: 1870px)": {
        fontSize: "100%",
      },
    },
  },

  fuentePagoApartados: {
    "@media (min-width: 480px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: " center",
      justifyContent: "center",
    },
    "@media (min-width: 768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: " center",
      justifyContent: "center",
    },
    "@media (min-width: 1140px)": {
      width: "100%",
      flexDirection: "row",
      display: "flex",
      alignItems: " center",
      justifyContent: "space-evenly",
    },
    "@media (min-width: 1400px)": {
      width: "100%",
      flexDirection: "row",
      display: "flex",
      alignItems: " center",
      justifyContent: "space-evenly",
    },
    "@media (min-width: 1870px)": {
      width: "100%",
      flexDirection: "row",
      display: "flex",
      alignItems: " center",
      justifyContent: "space-evenly",
    },
  },

  tablaAsignarFuente: {
    height: "25rem",
    display: "flex",
    justifyContent: "center",
    width: "95%",
    "@media (min-width: 480px)": {
      width: "95%",
    },

    "@media (min-width: 768px)": {
      width: "100%",
      height: "28rem",
    },

    "@media (min-width: 1140px)": {
      width: "100%",
      height: "23rem",
    },

    "@media (min-width: 1400px)": {
      width: "100%",
      height: "20rem",
    },

    "@media (min-width: 1870px)": {
      height: "33rem",
      width: "100%",
    },
  },

  RegistrarNuevaAutorizacion: {
    "@media (min-width: 480px)": {
      height: "10rem",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    "@media (min-width: 768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    "@media (min-width: 1140px)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    "@media (min-width: 1400px)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    "@media (min-width: 1870px)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },

  documentosAgregarNuevaAutorizacion: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "2.5rem",
    color: "#15212f",
    width: "100%",
    fontSize: "60%",
    "@media (min-width: 480px)": {
      fontSize: "60%",
      width: "100%",
    },

    "@media (min-width: 768px)": {
      fontSize: "80%",
      width: "100%",
    },

    "@media (min-width: 1140px)": {
      fontSize: "100%",
    },

    "@media (min-width: 1400px)": {
      fontSize: "90%",
      width: "100%",
    },

    "@media (min-width: 1870px)": {
      fontSize: "90%",
      width: "100%",
    },
  },

  tamañoLetraArcivoFideicomiso: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    fontSize: "60%",
    "@media (min-width: 480px)": {
      fontSize: "70%",
    },

    "@media (min-width: 768px)": {
      fontSize: "75%",
    },

    "@media (min-width: 1140px)": {
      fontSize: "100%",
    },

    "@media (min-width: 1400px)": {
      fontSize: "100%",
    },

    "@media (min-width: 1870px)": {
      fontSize: "100%",
    },
  },

  tablaAgregarFuentesPago: {
    "@media (min-width: 480px)": {
      height: "76vh",
    },

    "@media (min-width: 768px)": {
      height: "84vh",
    },

    "@media (min-width: 1140px)": {
      height: "84vh",
    },

    "@media (min-width: 1400px)": {
      height: "74vh",
    },

    "@media (min-width: 1870px)": {
      height: "80vh",
    },
  },
};
