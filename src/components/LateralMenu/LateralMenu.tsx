import React from 'react';
import { Container } from '@mui/material';
import logo from '../../assets/images/logo.svg';
import escudo from '../../assets/images/escudo.png'
import { 
    Box, 
    Grid, 
    Typography,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

export function LateralMenu(){
    return (
      <Grid container>
        <Grid
          item
          container
          xs={3}
          lg={2}
          sx={{
            backgroundColor: "#0f0",
            height: "100vh",
            boxShadow: 5,
          }}
          direction="column"
        >
          <Grid item container direction="column">
            <img src={logo}></img>
            <Typography>
              Sistema del Presupuesto Basado en Resultados
            </Typography>

            <Avatar>M</Avatar>

            <Typography>Marlon Israel</Typography>

            <Typography>Administrador</Typography>

            <Typography>Organismo</Typography>

            <Typography>Municipio Monterrey</Typography>

            <Divider />
          </Grid>

          <Grid item>
            <nav>
              <List>

                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>

                </ListItem>
              </List>
            </nav>
          </Grid>
        </Grid>

        <Grid item container xs={9} lg={10} direction='column'>
          <Grid item lg={1}>
            <header>Inicio</header>
          </Grid>
          <Grid item container lg={11} justifyContent="center">
            <img
              src={escudo}
              style={{ height: "50vh", backgroundColor: "#ff0" }}
            ></img>
          </Grid>
        </Grid>
      </Grid>
    );
};


/*

            <Typography sx={{}}>
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
*/
