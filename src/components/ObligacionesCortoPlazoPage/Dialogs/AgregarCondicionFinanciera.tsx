import * as React from "react";

import {
    Grid,
    Tabs,
    Tab,
    Typography,
    Divider,
    Fab,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Slide
  } from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';

import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CondicionesGenerales } from "../Panels/CondicionesGenerales";
import { DisposicionPagosCapital } from "../Panels/DisposicionPagosCapital";
import { ComisionesTasaEfectiva } from "../Panels/ComisionesTasaEfectiva";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    handler: Function,
    openState: boolean
}

export function AgregarCondicionFinanciera(props: Props){

  const [tabIndex, setTabIndex] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  return (
    <Dialog fullScreen open={props.openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => props.handler(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={queries.bold_text}>
            Agregar Condición Financiera
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item container direction="column">
        <Grid item>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            centered={query.isScrollable ? false : true}
            variant={query.isScrollable ? "scrollable" : "standard"}
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="Condiciones Generales" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
            <Tab label="Disposición/Pagos de Capital" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
            <Tab label="Comisiones/Tasa Efectiva" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
          </Tabs>
          {tabIndex === 0 && <CondicionesGenerales />}

          {tabIndex === 2 && <DisposicionPagosCapital />}

          {tabIndex === 4 && <ComisionesTasaEfectiva />}
        </Grid>
      </Grid>
    </Dialog>
  );
}