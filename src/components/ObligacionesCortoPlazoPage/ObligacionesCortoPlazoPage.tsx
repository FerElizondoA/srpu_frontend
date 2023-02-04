import { 
    Grid,
    Tabs,
    Tab,
    Typography,
    Box
 } from "@mui/material"

import { createTheme } from "@mui/material/styles";

import { SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#AF8C55"
    }
  }
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const text = {
  regular: {
    fontFamily: "MontserratRegular",
    fontSize: "1.0vw",
    color: "#000"
  },
};

export function ObligacionesCortoPlazoPage(){

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    }

    return (
      <Box>
        <Tabs value={value} onChange={handleChange} centered sx={{ backgroundColor: "#F2F2F2" }}>
          <Tab label="Información General" sx={text.regular} {...a11yProps(0)}></Tab>
          <Tab label="Condiciones Financieras" sx={text.regular} {...a11yProps(1)}></Tab>
          <Tab label="Documentación" sx={text.regular} {...a11yProps(2)}></Tab>
          <Tab label="Solicitud de Inscripción" sx={text.regular} {...a11yProps(3)}></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          Panel 1
        </TabPanel>
        <TabPanel value={value} index={1}>
          Panel 2
        </TabPanel>
        <TabPanel value={value} index={2}>
          Panel 3
        </TabPanel>
        <TabPanel value={value} index={3}>
          Panel 4
        </TabPanel>
      </Box>
    );
};