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

import useMediaQuery from "@mui/material/useMediaQuery";

import { queries } from "../../../queries";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function InformacionGeneral() {
  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 899px)"),
  };

  const text = {
    medium: {
      fontFamily: "MontserratMedium",
      fontSize: query.isXs ? "1.5v" : "2ch",
    },
    icon: {
      fontSize: query.isXs ? "5vw" : "10vh",
    },
  };

  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 5, lg: 5 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: 25 }}
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
            sx={text.medium}
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
        ml={{ xs: 5, sm: 10, md: 7, lg: 25 }}
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
        mt={{ xs: 10, sm: 2, md: 5, lg: 5 }}
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
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={text.icon} />
              </Grid>
              <Grid item>
                <Typography sx={text.medium}>
                  Destino del financiamiento
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>

        <Grid item xs={3.5} md={3.8} lg={3.5}>
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: "30vh",
            }}
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={text.icon} />
              </Grid>
              <Grid item>
                <Typography sx={text.medium}>
                  Obligado Solidario / Aval
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>

        <Grid item xs={3.5} md={3.8} lg={3.5}>
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: "30vh",
            }}
          >
            <Grid container direction="column">
              <Grid item xs={12}>
                <CheckCircleIcon color="success" sx={text.icon} />
              </Grid>
              <Grid item>
                <Typography sx={text.medium}>Institución Financiera</Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
