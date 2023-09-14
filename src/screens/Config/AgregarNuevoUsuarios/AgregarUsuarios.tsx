import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../../../../src/App";
import { LateralMenu } from "../../../components/LateralMenu/LateralMenu";
import { queries } from "../../../queries";

export const IFrame = ({
  baseURL,
  source,
}: {
  source: string;
  baseURL: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid
        display={"flex"}
        width={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
        height={"5vh"}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
            width: "52%",
            textAlign: "end",
          }}
        >
          Agregar Usuario
        </Typography>
        <Grid sx={{ width: "40%", textAlign: "end" }}>
          <Button
            sx={{ ...queries.buttonContinuar, fontSize: "90%", width: "20%" }}
            onClick={() => navigate("../users")}
          >
            Volver
          </Button>
        </Grid>
      </Grid>

      <Grid width={"100%"} height={"85vh"}>
        <object
          style={{ width: "100%", height: "100%" }}
          data={String(baseURL) + String(source)}
          type="text/html"
          aria-label="Agregar Usuario"
        ></object>
      </Grid>
    </>
  );
};

export default IFrame;
