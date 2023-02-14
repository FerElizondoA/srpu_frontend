import { Grid } from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"
import { ObligacionesCortoPlazoPage } from '../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage';

import useMediaQuery from "@mui/material/useMediaQuery";
import { LateralMenuMobile } from '../LateralMenu/LateralMenuMobile';
import { ObligacionesCortoPlazoPageMobile } from '../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPageMobile';

export function HomePage(){

    const query = {
      isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)")
    }

    return (
      <Grid container direction="column">
        <Grid item>
          {query.isMobile? <LateralMenuMobile/> : <LateralMenu/>}
        </Grid>
        <Grid item>

          {query.isMobile? <ObligacionesCortoPlazoPageMobile/> : <ObligacionesCortoPlazoPage/>}
        </Grid>
      </Grid>
    );
};