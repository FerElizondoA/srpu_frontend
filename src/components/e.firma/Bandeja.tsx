
import {  TablaDocs  } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { useParams } from "react-router";

export const Bandeja = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const { NombreBandeja, IdTipo } = useParams();

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item  sx={{height:'94vh', backgroundColor:'#f2f2f2'}}>
        <TablaDocs
          TipoBandeja={NombreBandeja!}
          IdTipoBandeja={IdTipo!}
          PathEnvia={"../enviar/"}
        />
      </Grid>
    </Grid>
  );
};
