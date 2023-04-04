import { Grid, useMediaQuery } from "@mui/material";
import { LateralMenu } from "../../../src/components/LateralMenu/LateralMenu";
import { Usuarios } from "../../components/Config/Usuarios";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";

export const  Solicitudes = () => {
    const query = {
        isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
      };
   
    return (

        <Grid container direction="column">
            <Grid item>
              {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
            </Grid>
        </Grid>
    )
    
    
}