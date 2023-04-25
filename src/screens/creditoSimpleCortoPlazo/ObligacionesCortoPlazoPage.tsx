import { Grid, Tabs, Tab } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../queries";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { Encabezado } from "../../components/ObligacionesCortoPlazoPage/Panels/Encabezado";
import { InformacionGeneral } from "../../components/ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { CondicionesFinancieras } from "../../components/ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { SolicitudInscripcion } from "../../components/ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";

//export const [ste,setste]=useState<array<tipo>>([]);


export function ObligacionesCortoPlazoPage() {

  // useEffect(() => {
    
  // }, [third])
  
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
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
          <Tab label="Encabezado" sx={queries.text} />
          <Tab label="Información General" sx={queries.text} />
          <Tab label="Condiciones Financieras" sx={queries.text} />
          <Tab label="Documentación" sx={queries.text} />
          <Tab label="Resumen" sx={queries.text} />
          <Tab label="Solicitud de Inscripción" sx={queries.text} />
        </Tabs>
      </Grid>
      
      {tabIndex === 0 && <Encabezado/>}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion />}
      {tabIndex === 4 && <Resumen />}
      {tabIndex === 5 && <SolicitudInscripcion />}
    </Grid>
  );
}
