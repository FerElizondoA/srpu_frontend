

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

//Leyenda de busqueda
leyendaBusqueda: {
  backgroundColor:"#af8c55",
  fontWeight:"bold",
  color:"white",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderRadius: "20px",
  opacity: .7,
  "@media (min-width: 513px)": {
      
    height: 470,
  },
  "@media (min-width: 600px)": {
    
    fontSize: 16,
    width:400,
    height:50
  },
  "@media (min-width: 900px)": {
    
    fontSize: 18,
    width:450,
    height:60  },
  "@media (min-width: 1485px)": {
    fontSize: 18,
    width:650,
    height:80
  },
  "@media (min-width: 1870px)": {
    fontSize: 20,
    width:750,
    height:100
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
  height:"80%" ,
  display:"flex", 
  width:"100%", 
  justifyContent:"space-evenly"
},

boxApartadosFormulario:{
  display:"flex",
  width:"100%", 
  justifyContent:"center",
},
/////////////////////
botonComentario: {
   width:"95%",
   justifyContent:"flex-end",
   height: 80,
   alignItems: "center",
   display:"flex"
}

};
