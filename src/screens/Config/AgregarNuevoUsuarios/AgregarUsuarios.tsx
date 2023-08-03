import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { LateralMenuMobile } from "../../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../../components/LateralMenu/LateralMenu";



export const IFrame = ({
  baseURL,
  source,
}:{
  source: string;
  baseURL: string;
}) => {
  if (!source) {
    return <div>Loading...</div>;
  }




  return (
    <>
      <Grid item width={"100%"} >
        <LateralMenu />
      </Grid>
      <Grid  width={"100%"} height={"34rem"}>
        <Grid mt={10} width={"100%"} height={"100%"}>
          <object
            style={{width:"100%", height:"100%"}}
            className="responsive-iframe"
            data={String(baseURL) + String(source)}
            type="text/html"
          ></object>
        </Grid>
      </Grid>
    </>

    // basic bootstrap classes. you can change with yours.
  );
};

 export default IFrame;

