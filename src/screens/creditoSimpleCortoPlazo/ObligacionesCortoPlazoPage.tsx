import { Grid, Tabs, Tab, Typography } from "@mui/material";

import { SyntheticEvent, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { queries } from "../../queries";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { useCortoPlazoStore } from "../../store/main";
import {
  Documentacion,
  IFile,
} from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../components/ObligacionesCortoPlazoPage/Panels/Encabezado";
import { InformacionGeneral } from "../../components/ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { CondicionesFinancieras } from "../../components/ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { SolicitudInscripcion } from "../../components/ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";

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
        <Grid display={"flex"} justifyContent={"center"}>
          <Typography sx={{
            fontSize: "2.5ch",
            fontFamily: "MontserratBold",
            color:"#AF8C55",
            "@media (max-width: 600px)": {
              // XS (extra small) screen
              fontSize: "1rem",
              
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
          }}>Credito Simple a Corto Plazo</Typography>

        </Grid>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Encabezado" sx={queries.bold_text} />
          <Tab label="Información General" sx={queries.bold_text} />
          <Tab label="Condiciones Financieras" sx={queries.bold_text} />
          <Tab label="Documentación" sx={queries.bold_text} />
          <Tab label="Resumen" sx={queries.bold_text} />
          <Tab label="Solicitud de Inscripción" sx={queries.bold_text} />
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
