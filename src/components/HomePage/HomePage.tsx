import escudo from '../../assets/images/escudo.png'
import { IconButton, Grid, Toolbar, AppBar} from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"
import MenuIcon from '@mui/icons-material/Menu'
import App from '../../App';
import { ObligacionesCortoPlazoPage } from '../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage';
import { Reestructura } from '../reestructura/Reestructura';

export function HomePage(){
    return (
      <Grid container>
        <Grid item xs={3} md={3} lg={2.5}>
          <LateralMenu />
        </Grid>
        <Grid item xs={9} md={9} lg={9.5}>
          <Reestructura />
        </Grid>
      </Grid>
    );
};