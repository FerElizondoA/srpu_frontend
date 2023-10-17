const db = require("../config/db.js");
module.exports = {

createPreguntaFrecuente: (req, res) => {
        const {IdMenu,Pregunta,Texto,RutaGuia,RutaVideo,NombreArchivo,NombreArchivoServidor,IdUsuario} = req.body;
        console.log(req.body);
                let contError=0;
                let error = "Ingrese:";
        
                    if (!IdMenu || (/^[\s]*$/.test(IdMenu)))
                    {
                        error += " IdMenu,";
                        contError++;
                    } 
        
                    if (!IdUsuario || (/^[\s]*$/.test(IdUsuario)))
                    {
                        error += " IdUsuario";
                        contError++;
                    } 
                
                    // Elimina la última coma si existe
                    error = error.endsWith(',') ? error.slice(0, -1) : error;
                    //Remplaza la ultima coma por un " y "
                    error = error.replace(/,([^,]*)$/, ' y$1');
            
                 if (contError!=0) {
                    return res.status(400).send({
                        error: error,
                    });
                 }
        
                db.query(`CALL sp_CrearPreguntaFrecunte(?,?,?,?,?,?,?,?)`,[IdUsuario,IdMenu,Pregunta,Texto,RutaGuia,RutaVideo,NombreArchivo,NombreArchivoServidor], (err, result) => {
                 if (err) {
                   return res.status(500).send({
                     error: err,
                   });
                 }
           
                 if (result.length) {
                   const data = result[0];
                   return res.status(200).send({
                     data,
                   });
                 } else {
                   return res.status(409).send({
                     error: "¡Sin Información!",
                   });
                 }
               });
    },
deletePreguntasFrecuentes:(req,res)=>{
           const {IdPreguntaFrecuente,IdUsuario} = req.body;
        
           let contError=0;
                let error = "Ingrese:";
        
                    if (!IdPreguntaFrecuente || (/^[\s]*$/.test(IdPreguntaFrecuente)))
                    {
                        error += " IdPreguntaFrecuente,";
                        contError++;
                    } 
        
                    if (!IdUsuario || (/^[\s]*$/.test(IdUsuario)))
                    {
                        error += " IdUsuario";
                        contError++;
                    } 
                
                    // Elimina la última coma si existe
                    error = error.endsWith(',') ? error.slice(0, -1) : error;
                    //Remplaza la ultima coma por un " y "
                    error = error.replace(/,([^,]*)$/, ' y$1');
            
                 if (contError!=0) {
                    return res.status(400).send({
                        error: error,
                    });
                 }
        
                 db.query(`CALL sp_EliminarPreguntaFrecuente(?,?)`,[IdPreguntaFrecuente,IdUsuario], (err, result) => {
                    if (err) {
                      return res.status(500).send({
                        error: err,
                      });
                    }
              
                    if (result.length) {
                      const data = result[0];
                      return res.status(200).send({
                        data,
                      });
                    } else {
                      return res.status(409).send({
                        error: "¡Sin Información!",
                      });
                    }
                  });
        
    },
getPreguntasFrecuentes:(req,res)=>{
           const {Opcion,IdMenu} = req.query;
        
           let contError=0;
                let error = "Ingrese:";
        
                    if (!Opcion || (/^[\s]*$/.test(Opcion)))
                    {
                        error += " Opcion,";
                        contError++;
                    } 
        
                    if (!IdMenu || (/^[\s]*$/.test(IdMenu)))
                    {
                        error += " IdMenu";
                        contError++;
                    } 
                
                    // Elimina la última coma si existe
                    error = error.endsWith(',') ? error.slice(0, -1) : error;
                    //Remplaza la ultima coma por un " y "
                    error = error.replace(/,([^,]*)$/, ' y$1');
            
                 if (contError!=0) {
                    return res.status(400).send({
                        error: error,
                    });
                 }
        
                 db.query(`CALL sp_ListaPreguntasFrecuentes(?,?)`,[Opcion,IdMenu], (err, result) => {
                    if (err) {
                      return res.status(500).send({
                        error: err,
                      });
                    }
              
                    if (result.length) {
                      const data = result[0];
                      return res.status(200).send({
                        data,
                      });
                    } else {
                      return res.status(409).send({
                        error: "¡Sin Información!",
                      });
                    }
                  });
    },
    

}