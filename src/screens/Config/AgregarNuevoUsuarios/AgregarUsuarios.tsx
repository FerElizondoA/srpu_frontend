import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { LateralMenuMobile } from "../../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../../components/LateralMenu/LateralMenu";
import { queries } from "../../../queries";
import { useNavigate } from "react-router";
import {getToken} from "../../../../src/App"

export const IFrame = ({
  baseURL,
  source,
}: {
  source: string;
  baseURL: string;
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    getToken()
  },[])

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid display={"flex"}  width={"100%"} height={"4rem"}>
        <Grid display={"flex"} width={"58.5%"} justifyContent={"space-between"}>


          <Grid ml={2} display={"flex"} justifyContent={"start"} width={"10%"}  alignItems={"center"}>
            <Button sx={{ ...queries.buttonContinuar, fontSize:"90%" }}
              onClick={() => navigate("../users")}
            >Volver</Button>
          </Grid>

          <Grid display={"flex"} justifyContent={"start"} width={"25%"} alignItems={"center"}>
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
                  fontSize: "2ch",
                },
              }}
            >
              Agregar Usuario
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid width={"100%"} height={"38.5rem"}
        sx={{
          "@media (min-width: 480px)": {
            height: "55rem"
          },

          "@media (min-width: 768px)": {
            height: "57rem"
          },

          "@media (min-width: 1140px)": {
            height: "38rem"
          },

          "@media (min-width: 1400px)": {
            height: "37rem"
          },

          "@media (min-width: 1870px)": {
            height: "51rem"
          },
        }}
      >
        <Grid width={"100%"} height={"100%"}>
          <object
            style={{ width: "100%", height: "100%" }}
            //className="responsive-iframe"
            data={String(baseURL) + String(source)}
            type="text/html"
          ></object>
        </Grid>
      </Grid>
    </>
  );
};

export default IFrame;
