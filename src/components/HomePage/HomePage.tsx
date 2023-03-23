import { Grid } from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import escudo from "../../assets/logo/escudo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import { ObligacionesCortoPlazoPageMobile } from "../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPageMobile";
import { ObligacionesCortoPlazoPage } from "../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage";

export function HomePage() {
  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  return (
    <Grid container direction="column">
    
       
        <Grid item>

          {query.isMobile? <ObligacionesCortoPlazoPageMobile/> : <ObligacionesCortoPlazoPage/>}
        </Grid>
      </Grid>
   
  );
}
