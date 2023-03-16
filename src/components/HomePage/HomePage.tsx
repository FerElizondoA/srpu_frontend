import { Grid } from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import escudo from "../../assets/logo/escudo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";

export function HomePage() {
  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
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
