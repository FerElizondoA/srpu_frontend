import { 
    Grid,
    Tabs,
    Tab,
    Typography,
    Divider
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";

import { CondicionesFinancieras } from "./Panels/CondicionesFinancieras";
import { Encabezado } from "./Panels/Encabezado";
import { InformacionGeneral } from "./Panels/InformacionGeneral";

import { queries } from "../../queries";

export function ObligacionesCortoPlazoPage() {

  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)")
  }

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
          <Tab label="Encabezado" sx={queries.text}></Tab>
          <Divider orientation="vertical" flexItem />
          <Tab label="Información General" sx={queries.text}></Tab>
          <Divider orientation="vertical" flexItem />
          <Tab label="Condiciones Financieras" sx={queries.text}></Tab>
          <Divider orientation="vertical" flexItem />
          <Tab label="Documentación" sx={queries.text}></Tab>
          <Divider orientation="vertical" flexItem />
          <Tab label="Solicitud de Inscripción" sx={queries.text}></Tab>
        </Tabs>
      </Grid>
      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 2 && <InformacionGeneral />}
      {tabIndex === 4 && <CondicionesFinancieras />}
      {tabIndex === 6 && (
        <Grid item container>
          <Typography>Panel 4</Typography>
        </Grid>
      )}
      {tabIndex === 8 && (
        <Grid item container>
          <Typography>Panel 5</Typography>
        </Grid>
      )}
    </Grid>
  );
}