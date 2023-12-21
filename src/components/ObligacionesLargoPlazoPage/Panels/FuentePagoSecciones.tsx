import { Grid, Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../../queries";
import { VehiculoDePago } from "./VehiculoDePago";
import { AsignarFuente } from "./AsignarFuente";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IRegistro } from "../../../store/CreditoLargoPlazo/FuenteDePago";

export function FuentePagoSecciones() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 499)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );

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
          <Tab
            label="mecanismo o vehiculo de pago"
            sx={queries.bold_text_InfoGeneralGastoCosto}
          />
          {mecanismoVehiculoPago.NumeroRegistro && (
            <Tab
              label="asignar fuente"
              sx={queries.bold_text_InfoGeneralGastoCosto}
            />
          )}
        </Tabs>
      </Grid>

      {tabIndex === 0 && <VehiculoDePago />}
      {tabIndex === 1 && <AsignarFuente />}
    </Grid>
  );
}
