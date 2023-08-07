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
        <Grid display={"flex"} width={"85%"} justifyContent={"space-evenly"}>


          <Grid display={"flex"} justifyContent={"start"} width={"40%"}  alignItems={"center"}>
            <Button sx={{ ...queries.buttonContinuar, fontSize:"90%" }}
              onClick={() => navigate("../users")}
            >Volver</Button>
          </Grid>

          <Grid display={"flex"} justifyContent={"start"} width={"43%"} alignItems={"center"}>
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

      <Grid width={"100%"} height={"55rem"}>
        <Grid width={"100%"} height={"100%"}>
          <object
            style={{ width: "100%", height: "100%" }}
            className="responsive-iframe"
            data={String(baseURL) + String(source)}
            type="text/html"
          ></object>
        </Grid>
      </Grid>
    </>
  );
};

export default IFrame;
