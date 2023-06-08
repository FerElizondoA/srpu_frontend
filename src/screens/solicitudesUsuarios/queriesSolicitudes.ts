export const queriesSolicitud = {
  ////Dimenciones Filtro y Buscador
  buscador: {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      //PARA CAMBIAR EL SCROLL
      width: ".3vw",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#AF8C55",
      outline: "1px solid slategrey",
      borderRadius: 10,
    },

    "@media (min-width: 513px)": {
      height: 470,
    },
    "@media (min-width: 600px)": {
      height: 470,
    },
    "@media (min-width: 900px)": {
      height: 500,
    },
    "@media (min-width: 1485px)": {
      height: 570,
    },
    "@media (min-width: 1870px)": {
      height: 790,
    },
  },

  buscador_solicitudes: {
    overflow: "auto",

    "@media (min-width: 513px)": {
      height: 450,
    },
    "@media (min-width: 600px)": {
      height: 450,
    },
    "@media (min-width: 900px)": {
      height: 480,
    },
    "@media (min-width: 1485px)": {
      height: 550,
    },
    "@media (min-width: 1870px)": {
      height: 770,
    },
  },

  //Leyenda de busqueda
  leyendaBusqueda: {
    backgroundColor: "#af8c55",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    opacity: 0.7,
    "@media (min-width: 513px)": {
      height: 470,
    },
  },

  /////Estilos Buscador

  boxContenedorBuscador: {
    width: "100%",
    height: "13vh",
    flexDirection: "column",
    justifyContent: "space-evenly",
    display: "flex",
  },

  boxContenidoBuscador: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  typograhyCampoBuscador: {
    padding: "1px 4px 1px 0",
    fontSize: "14px",
    fontWeight: "bold",
  },

  typograhyResultadoBuscador: {
    fontSize: "14px",
  },
  /////////////////

  ///// Estilos Formulario
  boxContenidoFormulario: {
    flexDirection: "column",
    height: "35rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",

    "@media (min-width: 1870px)": {
      height: "42rem",
    },
  },

  boxApartadosFormulario: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  /////////////////////
  botonComentario: {
    width: "95%",
    justifyContent: "flex-end",
    height: 80,
    alignItems: "center",
    display: "flex",
  },
};
