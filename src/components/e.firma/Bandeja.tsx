/* eslint-disable react-hooks/exhaustive-deps */
// import { TablaDocs } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";

export const Bandeja = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate("../ConsultaDeSolicitudes");
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item sx={{ height: "94vh", backgroundColor: "#f2f2f2" }}>
        {/* <TablaDocs
          TipoBandeja={NombreBandeja!}
          IdTipoBandeja={IdTipo!}
          PathEnvia={"../enviar/"}
          IdCentral={localStorage.getItem("IdCentral")!}
          jwtToken={localStorage.getItem("jwtToken")!}
          IdApp={localStorage.getItem("IdApp")!}
        /> */}
      </Grid>
    </Grid>
  );
};
