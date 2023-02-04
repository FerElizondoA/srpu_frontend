import escudo from '../../assets/images/escudo.png'
import { IconButton, Grid, Toolbar, AppBar} from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"
import MenuIcon from '@mui/icons-material/Menu'
import App from '../../App';
import { ObligacionesCortoPlazoPage } from '../ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage';

export function HomePage(){
    return (
      <Grid container>
        <Grid item xs={3.5} md={3.5} lg={2.5}>
          <LateralMenu />
        </Grid>
        <Grid item md={8.5} lg={9.5}>
          <ObligacionesCortoPlazoPage />
        </Grid>
      </Grid>
    );
};