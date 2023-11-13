import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../../../../src/App";
import { LateralMenu } from "../../../components/LateralMenu/LateralMenu";

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
        justifyContent={"space-evenly"}
        alignItems={"center"}
        height={"5vh"}
      >
        <Grid width={"100%"} display={"flex"}>
          <Grid width={"35%"} ml={2}
            sx={{
              width: "28%",
              "@media (min-width: 480px)": {
                width: "32%",
              },
          
              "@media (min-width: 768px)": {
                width: "40%",
              },
          
              "@media (min-width: 1140px)": {
                width: "40%",
              },
          
              "@media (min-width: 1400px)": {
                width: "42%",
              },
          
              "@media (min-width: 1870px)": {
                width: "44.5%",
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "50%",
                "@media (min-width: 480px)": {
                  fontSize: "70%",
                },

                "@media (min-width: 768px)": {
                  fontSize: "80%",
                },
              }}
              onClick={() => navigate("../users")}
            >
              Volver
            </Button>
          </Grid>

          <Grid >
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
              }}
            >
              Agregar Usuario
            </Typography>

          </Grid>


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
