import { Grid, Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../../queries";
import { GastoCostos } from "./GastosCostos";
import { InformacionGeneral } from "./InformacionGeneral";

export function InfoGeneralGastoCosto() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Tab label="Información General" sx={queries.bold_text_InfoGeneralGastoCosto} />
          <Tab label="DESTINO / GASTOS Y COSTOS RELACIONADOS CON LA CONTRATACIÓN" sx={queries.bold_text_InfoGeneralGastoCosto}/>
        </Tabs>
      </Grid>

      {tabIndex === 0 && <InformacionGeneral />}
      {tabIndex === 1 && <GastoCostos />}
    </Grid>
  );
}
