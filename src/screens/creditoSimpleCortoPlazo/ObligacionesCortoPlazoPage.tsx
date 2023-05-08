import { Grid, Tabs, Tab } from "@mui/material";

import { SyntheticEvent, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { CondicionesFinancieras } from "../../components/ObligacionesCortoPlazoPage/panels/CondicionesFinancieras";
import { Encabezado } from "../../components/ObligacionesCortoPlazoPage/panels/Encabezado";
import { InformacionGeneral } from "../../components/ObligacionesCortoPlazoPage/panels/InformacionGeneral";
import { SolicitudInscripcion } from "../../components/ObligacionesCortoPlazoPage/panels/SolicitudInscripcion";
import { queries } from "../../queries";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/panels/Resumen";
import { useCortoPlazoStore } from "../../store/main";
import { Documentacion } from "../../components/ObligacionesCortoPlazoPage/panels/Documentacion";

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

  const getTiposDocumentos: Function = useCortoPlazoStore(
    (state) => state.getTiposDocumentos
  );
  useEffect(() => {
    getTiposDocumentos();
  }, []);

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

      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion />}
      {tabIndex === 4 && <Resumen />}
      {tabIndex === 5 && <SolicitudInscripcion />}
    </Grid>
  );
}
