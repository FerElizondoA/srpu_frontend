import {
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { queries } from "../../../queries";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function FuenteDePago() {
  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 5, sm: 0, md: 5, lg: 0 }}
        ml={{ xs: 0, sm: 0, md: 0, lg: 0 }}
        spacing={{ xs: 2, md: 5, lg: 2 }}
        sx={{ backgroundColor: "green" }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Mecanismo o vehículo de pago
          </InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Número del fideicomiso
          </InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Bono cupón cero</InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Clasificacíon del bono cero
          </InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid
        item
        container
        mt={{ xs: 0, sm: 0, md: 0, lg: 0 }}
        ml={{ xs: 0, sm: 0, md: 0, lg: 0 }}
        spacing={{ xs: 2, md: 5, lg: 2 }}
        sx={{ backgroundColor: "red" }}
      >
        <Grid item xs={6} md={6} lg={6}>
          <Typography>hola</Typography>
          
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Typography>hola</Typography>
          
        </Grid>
      </Grid>


    </Grid>
  );
}
