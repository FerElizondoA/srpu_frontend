import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { queries } from "../../../queries";

export function Encabezado(){
    return (
      <Grid container>
        <Grid
          item
          container
          mt={{ xs: 10, sm: 10, md: 5, lg: 15 }}
          ml={{ xs: 5, sm: 10, md: 7, lg: 25 }}
          spacing={{ xs: 2, md: 5, lg: 10 }}
        >
          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>Tipo de Registro</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de Ente Público
            </InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Solicitante Autorizado
            </InputLabel>
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

        <Grid
          item
          container
          mt={{ xs: 10, sm: 10, md: 5, lg: 15 }}
          ml={{ xs: 5, sm: 10, md: 7, lg: 25 }}
          spacing={{ xs: 2, md: 5, lg: 10 }}
        >
          <Grid item xs={3.5} md={3.5} lg={3}>
                <InputLabel sx={queries.medium_text}>Municipio u Organismo</InputLabel>
              <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
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

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Cargo del Solicitante
            </InputLabel>
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
    );
}