import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment
} from "@mui/material";

import { queries } from "../../../queries";

import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function CondicionesGenerales(){

    return (
      <Grid container>
        <Grid
          item
          container
          mt={{ xs: 10, sm: 10, md: 5, lg: 10 }}
          ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
          spacing={{ xs: 2, md: 5, lg: 10 }}
        >
          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Ente Público Obligado
            </InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
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
          mt={{ xs: 10, sm: 10, md: 5, lg: 10 }}
          ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 - 15}}
          spacing={{ xs: 2, md: 5, lg: 10 }}
        >
          <Grid item lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel sx={queries.medium_text}>
                Fecha de Contratación
              </InputLabel>
              <DateField
                fullWidth
                format="DD-MM-YYYY"
                variant="standard"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                    fontSize: "2ch",
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

          <Grid item lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel sx={queries.medium_text}>
                Fecha de Vencimiento
              </InputLabel>
              <DateField
                fullWidth
                format="DD-MM-YYYY"
                variant="standard"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                    fontSize: "2ch",
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

          <Grid item lg={2.5}>
            <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
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

          <Grid item lg={2.5}>
            <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>
        </Grid>
        
      </Grid>
    );
}