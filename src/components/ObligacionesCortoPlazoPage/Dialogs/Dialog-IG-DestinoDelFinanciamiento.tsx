import React from "react";
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  InputLabel,
  TextField,
  Autocomplete,
  Dialog
} from "@mui/material";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";

import CloseIcon from "@mui/icons-material/Close";
import { queries } from "../../../queries";
import { ConfirmButton } from "../../CustomComponents";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class DestinoDelFinanciamiento extends React.Component<{
  handler: Function;
  openState: boolean;
}> {
  state = {
    destinoCatalog: [""],
  };

  fetchDestinoCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-destinos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.destinoCatalog.push(element.Destino);
        });
      });
    this.state.destinoCatalog.shift();
  }

  componentDidMount() {
    this.fetchDestinoCatalog();
  }

  render() {
    return (
      <Dialog
        fullWidth
        maxWidth={"lg"}
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
              Destino del Financiamiento
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item container>
            <Grid
              item
              container
              spacing={8}
              mt={{ xs: 0, sm: 0, md: 0, lg: 0 }}
              ml={{ xs: 0, sm: 0, md: 0, lg: 0 }}
              sx={{
                borderBlockColor: "black",
              }}
            >
              <Grid item xs={5} md={5} lg={5} xl={6}>
                <InputLabel sx={queries.medium_text}>Destino</InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.destinoCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={5} md={5} lg={5}>
                <InputLabel sx={queries.medium_text}>Monto</InputLabel>
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
          <Grid
            item
            container
            mt={{ xs: 10, sm: 10, md: 10, lg: 10 }}
            ml={{ xs: 0, sm: 0, md: 0, lg: 0 }}
            mb={{ xs: 5, sm: 5, md: 5, lg: 5 }}
            sx={{ top: "auto", bottom: 0, justifyContent: "center" }}
          >
            <Grid item xs={4} md={4} lg={4}>
              <ConfirmButton
                variant="outlined"
                onClick={() => this.props.handler(false)}
              >
                ACEPTAR
              </ConfirmButton>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
