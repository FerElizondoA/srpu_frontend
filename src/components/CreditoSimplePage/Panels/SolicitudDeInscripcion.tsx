import { react } from "@babel/types";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { queries } from "../../../queries";

export function SolicitudDeInscripcion() {
  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ sm: 1, md: 1, lg: 1, xl: 5 }}
        ml={{ sm: 1, md: 0, lg: 0, xl: 60 }}
      >
        <Grid item container xs={12} md={12} lg={12} spacing={5}>
          <Grid item xs={6} md={6} lg={4}>
            <InputLabel sx={queries.medium_text}>
              Tipo de Fideicomiso
            </InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6} md={6} lg={4}>
            <InputLabel sx={queries.medium_text}>Cargo</InputLabel>
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
        mt={{ sm: 1, md: 1, lg: 1, xl: 10 }}
        ml={{ sm: 1, md: 0, lg: 0, xl: 50 }}
      >
        <Grid item container xs={12} md={12} lg={12} spacing={5}>
          <Grid item xs={6} md={6} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Solicitante autorizado
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

          <Grid item xs={6} md={6} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Documento de autorización
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

          <Grid item xs={6} md={6} lg={3}>
            <InputLabel sx={queries.medium_text}>Identificación</InputLabel>
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

      <Grid item
        container
        mt={{ sm: 1, md: 1, lg: 1, xl: 5 }}
        ml={{ sm: 1, md: 0, lg: 0, xl: 0 }}>
          <Typography sx={queries.medium_text}>De conformidad al reglamento, indique las declaratorias aplicables al financiamiento u obligación.</Typography>
        </Grid>
    </Grid>
  );
}
