import { 
    Grid,
    Tabs,
    Tab,
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";

import { CondicionesFinancieras } from "./Panels/CondicionesFinancieras";
import { Encabezado } from "./Panels/Encabezado";
import { InformacionGeneral } from "./Panels/InformacionGeneral";
import { SolicitudInscripcion } from "./Panels/SolicitudInscripcion";
import { queries } from "../../queries";
import { Documentacion } from "./Panels/Documentacion";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../LateralMenu/LateralMenu";

export function ObligacionesCortoPlazoPage() {
  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)")
  } 

  return (
    <Grid container direction="column">
      <Grid item>
          {query.isMobile? <LateralMenuMobile/> : <LateralMenu/>}
        </Grid>
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
      
      {tabIndex === 0 && <Encabezado/>}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion/>}
      {tabIndex === 4 && <SolicitudInscripcion />}
    </Grid>
  );
}