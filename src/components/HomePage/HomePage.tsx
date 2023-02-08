import escudo from '../../assets/images/escudo.png'
import { IconButton, Grid, Toolbar, AppBar} from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"
import MenuIcon from '@mui/icons-material/Menu'
import App from '../../App';
import { ObligacionesCortoPlazoPage } from '../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage';

export function HomePage(){
    return (
      <Grid container>
        <Grid item xs={3.5} md={3} lg={2.2}>
          <LateralMenu />
        </Grid>
        <Grid item xs={8.5} md={9} lg={9.8}>
          <ObligacionesCortoPlazoPage />
        </Grid>
      </Grid>
    );
};