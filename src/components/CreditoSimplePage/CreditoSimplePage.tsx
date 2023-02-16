import { 
    Grid,
    Tabs,
    Tab,
    Typography,
    Box
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { Autorización } from "./Panels/Autorizacón";
import { Documentacion } from "./Panels/Documentacion";
import { Encabezado } from "./Panels/Encabezado";
import { InformaciónGeneral } from "./Panels/InformacionGeneral";

export const text = {
  regular: {
    fontFamily: "MontserratRegular",
    fontSize: "1.0vw",
    color: "#000"
  },
};

export function CreditoSimplePage() {

  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isXLg: useMediaQuery("(min-width: 1535px)")
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          variant={query.isXLg ? "standard" : "scrollable"}
          scrollButtons="auto"
        >
          <Tab label="Encabezado" sx={text.regular}></Tab>
          <Tab label="Información General" sx={text.regular}></Tab>
          <Tab label="Autorizacón" sx={text.regular}></Tab>
          <Tab label="Condiciones Financieras" sx={text.regular}></Tab>
          <Tab label="Documentación" sx={text.regular}></Tab>
          <Tab label="Solicitud de Inscripción" sx={text.regular}></Tab>
        </Tabs>
      </Grid>
      {tabIndex === 0 && (
        <Grid item container>
          <Encabezado
          CS={""}/>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid item container>
          <InformaciónGeneral/>
        </Grid>
      )}
      {tabIndex === 2 && (
        <Grid item container>
          <Autorización/>
        </Grid>
      )}
      {tabIndex === 3 && (
        <Grid item container>
          <Typography>Condiciones Financieras </Typography>
          
        </Grid>
      )}
      {tabIndex === 4 && (
        <Grid container>
         <Documentacion/>
              
        </Grid>
      )}
      {tabIndex === 5 && (
        <Grid item container>
          
            </Grid>
      )}
    </Grid>
  );
}