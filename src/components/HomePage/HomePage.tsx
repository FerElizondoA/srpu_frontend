import escudo from '../../assets/images/escudo.png'
import { Box, Grid} from "@mui/material"
import { LateralMenu} from "../LateralMenu/LateralMenu"

export function HomePage(){
    return (
      <>
        <Grid container>
          <Grid item xs={3.5} md={3.5} lg={2.5}>
            <LateralMenu />
          </Grid>
          <Grid item xs={8.5} sx={{justifyContent: "center"}}>
              <img
                src={escudo}
                style={{ height: "50vh", backgroundColor: "#ff0"}}
              ></img>
          </Grid>
        </Grid>
      </>
    );
};