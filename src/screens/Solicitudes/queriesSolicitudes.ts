export const queriesSolicitud = {

////Dimenciones Filtro y Buscador
  buscador: {
    overflow: "auto",

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
      
      height: 575,
    },
    "@media (min-width: 1870px)": {
      
      height: 782,
    },
  },

/////Estilos Buscador 
  boxContenedorBuscador: {
    width:'100%',
    height:'12vh',
    flexDirection:'column',
    justifyContent:'space-evenly',
    display:'flex'
  },

  boxContenidoBuscador: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:"center"
  },
  typograhyCampoBuscador:{
    padding:"1px 4px 1px 0",
    fontSize:"14px",
    fontWeight:"bold",
    
  },
  typograhyResultadoBuscador:{
    fontSize:"14px" 
  },
/////////////////


///// Estilos Formulario
  boxContenidoFormulario:{
    flexDirection:"column", 
    height:"100%" ,
    display:"flex", 
    width:"100%", 
    justifyContent:"space-evenly"
  },

  boxApartadosFormulario:{
    display:"flex",
    width:"100%", 
    justifyContent:"center"
  }
/////////////////////

};
