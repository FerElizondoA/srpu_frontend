import { Grid } from "@mui/material";
import escudo from "../../assets/logo/escudo.png";
import { LateralMenu } from "../LateralMenu/LateralMenu";

export function HomePage() {
  return (
    <Grid container direction="column">
      <Grid item>
        <LateralMenu />
        {/* {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />} */}
      </Grid>
      <Grid
        item
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={escudo} alt="Escudo" style={{ width: "25vw" }} />
      </Grid>
    </Grid>
  );
}
