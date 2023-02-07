import { 
    Grid,
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment
 } from "@mui/material"
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";

export const text = {
  medium: {
    fontFamily: "MontserratMedium",
    fontSize: "1.0vw",
  },
};

export function SolicitudInscripcion(){
    return (
      <Grid container spacing={5}>
        <Grid item mt={{md: 5, lg:10}} ml={{md: 5, lg: 15}} md={3} lg={4}>
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

        <Grid item mt={{md: 5, lg:10}}>
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

        <Grid item mt={{md: 5, lg:10}} lg={4} md={4}>
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

        <Grid item mt={{md: 5, lg:10}} ml={{md: 5, lg: 15}} md={3} lg={4}>
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

        <Grid item mt={{md: 5, lg:10}}>
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

        <Grid item mt={{md: 5, lg:10}} lg={4} md={4}>
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
    );
}

/*


            <Grid item mt={5} lg={4}>
                <TextField
                fullWidth
                label="Monto Original Contratado"
                InputLabelProps={{
                    style: {
                        fontFamily: "MontserratMedium"
                    }
                }}
                InputProps={{
                    style: {
                        fontFamily: "MontserratMedium"
                    },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                variant="standard"
                />
            </Grid>
            */