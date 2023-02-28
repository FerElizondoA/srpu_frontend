import React from "react";
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

import { ConfirmButton } from "../../CustomComponents";
import { queries } from "../../../queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class InstitucionFinanciera extends React.Component<{
  handler: Function;
  openState: boolean;
}> {
  state = {
    institucionCatalog: [""],
  };

  fetchInstitucionFinancieraCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-institucionesFinancieras", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.institucionCatalog.push(element.Institucion);
        });
      });
    this.state.institucionCatalog.shift();
  }

  componentDidMount() {
    this.fetchInstitucionFinancieraCatalog();
  }

  render() {
    return (
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={this.props.openState}
        TransitionComponent={Transition}
        onClose={() => this.props.handler(false)}
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
              Institución Financiera
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item container>
            <Grid
              item
              container
              mt={{ xs: 10, sm: 10, md: 0, lg: 4 }}
            >
              <Grid item lg={10} ml={window.outerWidth/150}>
                <InputLabel sx={queries.medium_text}>
                  Institución Financiera
                </InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.institucionCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                container
                mt={{ xs: 10, sm: 10, md: 10, lg: 10 }}
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
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
