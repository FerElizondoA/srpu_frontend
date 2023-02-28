import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  InputLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";

import CloseIcon from "@mui/icons-material/Close";

import { queries } from "../../../queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class ObligadoSolidarioAval extends React.Component<{
  handler: Function;
  openState: boolean;
}> {
  state = {
    obligadoCatalog: [""],
    enteCatalog: [""],
  };

  fetchObligadoCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-obligadoSolidarioAval", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.obligadoCatalog.push(element.ObligadoSolidarioAval);
        });
      });
    this.state.obligadoCatalog.shift();
  }

  fetchEnteCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-entePublicoObligado", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.enteCatalog.push(element.EntePublicoObligado);
        });
      });
    this.state.enteCatalog.shift();
  }

  componentDidMount() {
    this.fetchObligadoCatalog();
    this.fetchEnteCatalog();
  }

  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.openState}
        onClose={() => this.props.handler(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => this.props.handler(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={queries.bold_text}>
              Obligado Solidario / Aval
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>

          <Grid item container>
            <Grid
              item
              container
              spacing={5}
              mt={{ xs: 10, sm: 10, md: 5, lg: 5 }}
              ml={{ xs: 5, sm: 35, md: 60, lg: 30 }}
            >
              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>Obligado solidario / aval</InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.obligadoCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>Tipo de ente público obligado</InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.enteCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>Ente público obligado</InputLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                />
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
