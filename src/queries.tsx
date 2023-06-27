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
  buttonContinuar: {
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

  tablaDisposicionPagosCapital: {
    height: 250,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "@media (min-width: 1870px)": {
      height: 430,
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
    height: "54vh",
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
      height: "64vh",
    },
  },
};
