import escudo from '../../assets/images/escudo.png'
import { Box, Grid} from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"
import { Reestructura } from "../reestructura/Reestructura";
export function HomePage(){
    return (
      <>
        <Grid container>
          <Grid item xs={2} md={2} lg={2}>
            <LateralMenu />
          </Grid>
          <Grid item xs={10} lg={10} md={10} sx={{justifyContent: "center"}}>
              <Reestructura/>
          </Grid>
        </Grid>
      </>
    );
};