import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { queries } from "../../../queries";
export function InformaciónGeneral() {

  const [destino, setDestino] = useState("");
  const [catalogoDestino, setCatalogoDestino] = useState([
    { IdDestino: "0", Destino: "" },
  ]);

const getDestino =(id: string) =>{
//axios
//.get("http://10.200.4.105:8000")
}



  return (
    <Grid container>

      <Grid
        item
        container 
        spacing={2}
        mt={{ sm: 3, md: 5, lg: 12, xl: 10 }}
        ml={{ md: 5, lg: 12, xl: 25 }}
      >
        <Grid
          item
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Fecha de Contratación</InputLabel>
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

        <Grid
          item
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Plaza (días)</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
          
          
         
          variant="standard"
        />
        </Grid>

        <Grid
          item
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Monto Original Contratado</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
          
          
         
          variant="standard"
        />
        </Grid>

        <Grid
          item
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Periodo de Administracion (Meses)</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
          
          
          variant="standard"
        />
        </Grid>
      </Grid>
      {/* ------------------------------------------------------------------- */}
      <Grid
        item
        container
        spacing={2}
        mt={{ md: 5, lg: 12, xl: 10 }}
        ml={{ md: 5, lg: 12, xl: 25 }}
       
      >
        <Grid
          item
          
          md={2.5}
          lg={3}
          xl={2.5}
        >
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

        <Grid
          item
      
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
          
          
         
          variant="standard"
        />
        </Grid>

        <Grid
          item
          
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
         
          
         
          variant="standard"
        />
        </Grid>

        <Grid
          item
          
          md={2.5}
          lg={3}
          xl={2.5}
        >
            <InputLabel sx={queries.medium_text}>Periodo de Financiamiento (Meses)</InputLabel>
          <TextField
          fullWidth
          id="standard-read-only-input"
                    
          variant="standard"
        />
        </Grid>
      </Grid>

      <Grid
          item
          container
          mt={{ xs: 4, md: 10, lg: 12 }}
          ml={{ xs: 5, md: 2, lg: 20 }}
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
                  <CheckCircleIcon color="success" sx={queries.icon} />
                </Grid>
                <Grid item>
                  <Typography sx={queries.medium_text}>
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
                  <CheckCircleIcon color="success" sx={queries.icon} />
                </Grid>
                <Grid item>
                  <Typography sx={queries.medium_text}>
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
                  <CheckCircleIcon color="success" sx={queries.icon} />
                </Grid>
                <Grid item>
                  <Typography sx={queries.medium_text}>
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
