import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";

import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import useMediaQuery from "@mui/material/useMediaQuery";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function SolicitudInscripcion() {

    const query = {
      isXs: useMediaQuery("(min-width: 0px) and (max-width: 899px)"),
    };

    const text = {
      medium: {
        fontFamily: "MontserratMedium",
        fontSize: query.isXs? "1.5vw" : "2vh",
      },
      icon: {
        fontSize: query.isXs? "5vw" : "10vh",
      },
    };

    return (
      <Grid container>
        <Grid item container spacing={5}>
          <Grid
            item
            mt={{ xs: 3, md: 5, lg: 10 }}
            ml={{ xs: 4, md: 7, lg: 15 }}
            xs={4}
            md={3}
            lg={3}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Fecha de Contratación"
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

          <Grid item mt={{ xs: 3, md: 5, lg: 10 }} xs={3} lg={3}>
            <TextField
              fullWidth
              label="Plazo (Días)"
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

          <Grid item mt={{ xs: 3, md: 5, lg: 10 }} xs={4} md={4} lg={4}>
            <TextField
              fullWidth
              label="Monto Original Contratado"
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

          <Grid
            item
            mt={{ md: 5, lg: 10 }}
            ml={{ xs: 4, md: 7, lg: 15 }}
            xs={4}
            md={3}
            lg={3}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Fecha de Vencimiento"
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

          <Grid item mt={{ md: 5, lg: 10 }} xs={3} lg={3}>
            <TextField
              fullWidth
              label="Destino"
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

          <Grid item mt={{ md: 5, lg: 10 }} xs={4} md={4} lg={4}>
            <TextField
              fullWidth
              label="Denominación"
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
          mt={{ xs: 4, md: 10, lg: 15 }}
          ml={{ xs: 5, md: 2, lg: 12 }}
          spacing={{ xs: 1, md:2, lg: 2 }}
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
                  <Typography sx={text.medium}>
                    Institución Financiera
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
