import React from 'react';
import { Container } from '@mui/material';
import logo from '../../assets/images/logo.svg';
import escudo from '../../assets/images/escudo.png'
import { 
    Box, 
    Grid, 
    Typography,
    Avatar
} from '@mui/material';
import Divider from '@mui/material/Divider';

export function LateralMenu(){
    return (
      <Grid container>
        <Grid
          container
          xs={3}
          lg={2}
          sx={{
            backgroundColor: "#0f0",
            height: "100vh",
            boxShadow: 5,
          }}
        >
          <Container>
            <img src={logo}></img>
            <Typography>
              Sistema del Presupuesto Basado en Resultados
            </Typography>

            <Avatar>M</Avatar>

            <Typography
              sx={{ backgroundColor: "#0ff", justifyContent: "center" }}
            >
              Marlon Israel
            </Typography>

            <Typography>Administrador</Typography>

            <Typography>Organismo</Typography>

            <Typography>Municipio Monterrey</Typography>
            <Divider />

          </Container>
        </Grid>
        <Grid
          container
          xs={9}
          lg={10}
          justifyContent="center"
          sx={{
            backgroundColor: "#f00",
          }}
        >
          <img
            src={escudo}
            style={{ height: "50vh", backgroundColor: "#ff0" }}
          ></img>
        </Grid>
      </Grid>
    );
};


