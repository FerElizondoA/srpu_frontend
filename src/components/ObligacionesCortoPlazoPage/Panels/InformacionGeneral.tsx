import * as React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { DestinoDelFinanciamiento } from "../Dialogs/Dialog-IG-DestinoDelFinaciamiento";
import { InstitucionFinanciera } from "../Dialogs/Dialog-IG-InstitucionFinanciera";
import { ObligadoSolidarioAval } from "../Dialogs/Dialog-IG-ObligadoSolidiario";
import { queries } from "../../../queries";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export class  InformacionGeneral extends  React.Component {

  state = {
    openDestino: false,
    openObligado: false,
    openInstitucion: false,
  }

  constructor(props: any){
    super(props);
    this.changeOpenDestinoState.bind(this);
    this.changeOpenObligado.bind(this);
    this.changeOpenInstitucione.bind(this);
  }
  
  changeOpenDestinoState = (open: boolean) => {
    this.setState({openDestino: open});
  }

  changeOpenObligado = (open: boolean) => {
    this.setState({openObligado: open});
  }

  changeOpenInstitucione = (open: boolean) => {
    this.setState({openInstitucion: open});
  }
  render()  {
  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 5, lg: 0 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth/50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              fullWidth
              format="DD-MM-YYYY"
              variant="standard"
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
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Plazo (Días)</InputLabel>
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Original Contratado
          </InputLabel>
          <TextField
            fullWidth
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        mt={{ xs: 10, sm: 2, md: 5, lg: 5 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth/50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              fullWidth
              format="DD-MM-YYYY"
              variant="standard"
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
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <TextField
            fullWidth
            variant="standard"
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <TextField
            fullWidth
            variant="standard"
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

      <Grid
        item
        container
        mt={{ xs: 10, sm: 2, md: 5, lg: 2 }}
        ml={{ xs: 5, sm: 10, md: 2, lg: 15 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.8} lg={3.5}>
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: "30vh",
            }}
            onClick={() => this.changeOpenDestinoState(!this.state.openDestino)}
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={queries.icon} />
              </Grid>
              <Grid item>
                <Typography sx={queries.medium_text}>
                  Destino del financiamiento
                </Typography>
              </Grid>
            </Grid>
          </Button>
          <DestinoDelFinanciamiento handler={this.changeOpenDestinoState} openState={this.state.openDestino}/>
        </Grid>

        <Grid item xs={3.5} md={3.8} lg={3.5}>
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: "30vh",
            }}
            onClick={() => this.changeOpenObligado(!this.state.openObligado)}
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={queries.icon} />
              </Grid>
              <Grid item>
                <Typography sx={queries.medium_text}>
                  Obligado Solidario / Aval
                </Typography>
              </Grid>
            </Grid>
          </Button>
          <ObligadoSolidarioAval handler={this.changeOpenObligado} openState={this.state.openObligado}/>
        </Grid>

        <Grid item xs={3.5} md={3.8} lg={3.5}>
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: "30vh",
            }}
            onClick={() => this.changeOpenInstitucione(!this.state.openObligado)}
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={queries.icon} />
              </Grid>
              <Grid item>
                <Typography sx={queries.medium_text}>Institución Financiera</Typography>
              </Grid>
            </Grid>
          </Button>
          <InstitucionFinanciera handler={this.changeOpenInstitucione} openState={this.state.openInstitucion} />
        </Grid>
      </Grid>
      
    </Grid>
  );
}
}
