import { Grid, Tabs, Tab, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { InformacionGeneral } from "./InformacionGeneral";
import { GastoCostos } from "./GastosCostos";

export function InfoGeneralGastoCosto() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 900px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Grid>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ width: "100%" }}
        >
          <Tab
            label="Información General"
            sx={queries.bold_text_InfoGeneralGastoCosto}
          />
          <Tab
            label="DESTINO / GASTOS Y COSTOS RELACIONADOS CON LA CONTRATACIÓN"
            sx={queries.bold_text_InfoGeneralGastoCosto}
          />
        </Tabs>
      </Grid>

      {tabIndex === 0 && <InformacionGeneral />}
      {tabIndex === 1 && <GastoCostos />}
    </Grid>
  );
}
