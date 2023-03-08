import { 
    Grid,
    Tabs,
    Tab,
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";

import { CondicionesFinancieras } from "./Panels/CondicionesFinancieras";
import { Encabezado } from "./Panels/Encabezado";
import { InformacionGeneral } from "./Panels/InformacionGeneral";
import { SolicitudInscripcion } from "./Panels/SolicitudInscripcion";
import { queries } from "../../queries";
import { IEncabezado } from "./Interfaces/CortoPlazo/IEncabezado";
import { getDestinos, getObligadoSolidarioAval } from "./APIS/APISInformacionGeneral";
import { Documentacion } from "./Panels/Documentacion";

export function ObligacionesCortoPlazoPage() {

  useEffect(() => {
   getDestinos();
   getObligadoSolidarioAval();
  }, [])
  

  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)")
  } 



  const [encabezado,setEncabezado]=useState<IEncabezado>(
    
     { tipoDocumento: "",
      municipioOrganismo: "",
      tipoEntePublico: "",
      fechaSolicitud: "",
      solicitanteAutorizado: "",
      cargoSolicitante:"",
    }
  );
  
  

  return (
    <Grid container direction="column">
      <Grid item>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Encabezado" sx={queries.text}/>
          <Tab label="Información General" sx={queries.text}/>
          <Tab label="Condiciones Financieras" sx={queries.text}/>
          <Tab label="Documentación" sx={queries.text}/>
          <Tab label="Solicitud de Inscripción" sx={queries.text}/>
        </Tabs>
      </Grid>
      
      {tabIndex === 0 ? <Encabezado encabezado={encabezado} setEncabezado={setEncabezado}/>:null}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion/>}
      {tabIndex === 4 && <SolicitudInscripcion />}
    </Grid>
  );
}