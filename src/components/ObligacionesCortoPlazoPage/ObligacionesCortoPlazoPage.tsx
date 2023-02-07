import { 
    Grid,
    Tabs,
    Tab,
    Typography,
    Box
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";

import { SolicitudInscripcion } from "./Panels/SolicitudInscripcion";

export const text = {
  regular: {
    fontFamily: "MontserratRegular",
    fontSize: "1.0vw",
    color: "#000"
  },
};

export function ObligacionesCortoPlazoPage() {

  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isXLg: useMediaQuery("(min-width: 1535px)")
  }

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        variant={query.isXLg ?  "standard" : "scrollable"}
        scrollButtons="auto"
      >
        <Tab label="Encabezado" sx={text.regular}></Tab>
        <Tab label="Información General" sx={text.regular}></Tab>
        <Tab label="Condiciones Financieras" sx={text.regular}></Tab>
        <Tab label="Documentación" sx={text.regular}></Tab>
        <Tab label="Solicitud de Inscripción" sx={text.regular}></Tab>
      </Tabs>
      {tabIndex === 0 && (
        <Grid container>
          <Typography>Panel 1</Typography>
        </Grid>
      )}
      {tabIndex === 1 && (
          <Typography>Panel 2</Typography>
      )}
      {tabIndex === 2 && (
        <Grid container>
          <Typography>Panel 2</Typography>
        </Grid>
      )}
      {tabIndex === 3 && (
        <Grid container>
          <Typography>Panel 3</Typography>
        </Grid>
      )}
      {tabIndex === 4 && (
        <Grid container>
          <Typography>Panel 4</Typography>
        </Grid>
      )}
    </Box>
  );
}