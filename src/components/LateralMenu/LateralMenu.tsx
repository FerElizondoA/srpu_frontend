import * as React from "react"
import logo from '../../assets/images/logo.svg';
import {
  Grid,
  Typography,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Collapse,
  Drawer,
  AppBar,
  Toolbar

} from "@mui/material";

// icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PivotTableChartOutlinedIcon from '@mui/icons-material/PivotTableChartOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';

import {useState} from 'react';

import { queries } from "../../queries";

import useMediaQuery from "@mui/material/useMediaQuery";

export function LateralMenu(){

  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
  };

  const [openInscripcion, setOpenInscripcion] = React.useState(false);
  const [openFinanciamiento, setOpenFinanciamiento] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleInscripcionClick = () => {
    setOpenInscripcion(!openInscripcion);
  };

  const handleFinanciamientoClick = () => {
    setOpenFinanciamiento(!openFinanciamiento);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container>
          <Grid item mt={0.5}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item ml={3} mt={0.5}>
            <img src={logo} style={{ height: "40px" }}></img>
          </Grid>
        </Grid>
        <Grid item>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Grid container sx={{width: query.isXs? "40vw": "30vw"}}>
              <Grid item container direction="column" mt={2}>
                <Grid item sx={{ alignSelf: "center" }}>
                  <Avatar sx={{ height: "100px", width: "100px" }}>JG</Avatar>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.text}>Josvan Gonzalez</Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.bold_text}>Administrador</Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.italic_text}>Organismo</Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.text}>Municipio Monterrey</Typography>
                </Grid>

                <Grid item>
                  <Divider />
                </Grid>
              </Grid>

              <Grid item container direction="column">
                <Grid item>
                  <List>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Inicio</Typography>
                    </ListItemButton>

                    <ListItemButton onClick={handleInscripcionClick}>
                      <ListItemIcon>
                        <PostAddOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Inscripción</Typography>
                      {openInscripcion ? <ExpandMore /> : <ExpandLess />}
                    </ListItemButton>

                    <Collapse in={openInscripcion} timeout="auto" unmountOnExit>
                      <List>
                        <ListItemButton
                          sx={{ marginLeft: 2 }}
                          onClick={handleFinanciamientoClick}
                        >
                          <ListItemIcon>
                            <KeyboardDoubleArrowRightIcon sx={queries.icon} />
                          </ListItemIcon>
                          <Typography sx={queries.text}>
                            Financiamiento y Obligaciones
                          </Typography>
                          {openFinanciamiento ? <ExpandMore /> : <ExpandLess />}
                        </ListItemButton>
                        <Collapse
                          in={openFinanciamiento}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List>
                            <ListItemButton sx={{ marginLeft: 4 }}>
                              <ListItemIcon>
                                <KeyboardArrowRightIcon sx={queries.icon} />
                              </ListItemIcon>
                              <Typography sx={queries.text}>
                                Obligaciones a Corto Plazo
                              </Typography>
                            </ListItemButton>

                            <ListItemButton sx={{ marginLeft: 4 }}>
                              <ListItemIcon>
                                <KeyboardArrowRightIcon sx={queries.icon} />
                              </ListItemIcon>
                              <Typography sx={queries.text}>
                                Credito Simple
                              </Typography>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton sx={{ marginLeft: 2 }}>
                          <ListItemIcon>
                            <KeyboardDoubleArrowRightIcon sx={queries.icon} />
                          </ListItemIcon>
                          <Typography sx={queries.text}>
                            Consulta de solicitudes
                          </Typography>
                        </ListItemButton>
                      </List>
                    </Collapse>

                    <ListItemButton>
                      <ListItemIcon>
                        <PivotTableChartOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Reestructuración
                      </Typography>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <HighlightOffOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Cancelación</Typography>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <AttachMoneyOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Mecanismos de pago
                      </Typography>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <CampaignOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Tablero electrónico
                      </Typography>
                    </ListItemButton>
                  </List>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
              </Grid>
              <Grid item container direction="column">
                <Grid item>
                  <List>
                    <ListItemButton>
                      <ListItemIcon>
                        <SettingsOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Configuración</Typography>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <LockOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Cambiar Contraseña
                      </Typography>
                    </ListItemButton>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};


/*

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
*/

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
