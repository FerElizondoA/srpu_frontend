import * as React from "react";
import logo from "../../assets/images/logo.svg";
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
  Toolbar,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";

import { queries } from "../../queries";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { TimerCounter } from "../../screens/Config/TimerCounter";

export function LateralMenu() {
  const logout = () => {
    localStorage.clear();
    window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN_FRONT || "");
  };

  const nombre = localStorage.getItem("NombreUsuario") || "";
  const iniciales = `${nombre?.split(" ")[0].split("")[0] || ""} ${
    nombre?.split(" ")[2].split("")[0] || ""
  }`;

  const tipoEnte = localStorage.getItem("TipoEntePublicoObligado");
  const ente = localStorage.getItem("EntePublicoObligado");

  const navigate = useNavigate();

  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
  };

  const [openInscripcion, setOpenInscripcion] = React.useState(true);
  const [openFinanciamiento, setOpenFinanciamiento] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleInscripcionClick = () => {
    setOpenInscripcion(!openInscripcion);
  };

  const handleFinanciamientoClick = () => {
    setOpenFinanciamiento(!openFinanciamiento);
  };

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < nombre.length; i += 1) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item mt={0.5}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item mt={0.5}>
            <img src={logo} style={{ height: "40px" }} alt={"logo"}></img>
          </Grid>
          <Grid>
            <TimerCounter />
          </Grid>
        </Grid>
        <Grid item>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Grid container sx={{ width: query.isXs ? "40vw" : "30vw" }}>
              <Grid item container direction="column" mt={2}>
                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.bold_text}>
                    Sistema del Registro Público Único
                  </Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Avatar
                    sx={{ height: "100px", width: "100px", bgcolor: color }}
                  >
                    {iniciales}
                  </Avatar>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.text}>
                    {localStorage.getItem("NombreUsuario")}
                  </Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.bold_text}>
                    {localStorage.getItem("Rol")}
                  </Typography>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Typography sx={queries.text}>
                    {tipoEnte}: {ente}
                  </Typography>
                </Grid>

                <Grid item>
                  <Divider />
                </Grid>
              </Grid>

              <Grid item container direction="column">
                <Grid item>
                  <List>
                    <ListItemButton
                      onClick={() => {
                        navigate("../home");
                      }}
                    >
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
                            <ListItemButton
                              sx={{ marginLeft: 4 }}
                              onClick={() => {
                                navigate("../ObligacionesCortoPlazo");
                              }}
                            >
                              <ListItemIcon>
                                <KeyboardArrowRightIcon sx={queries.icon} />
                              </ListItemIcon>
                              <Typography sx={queries.text}>
                                Obligaciones a Corto Plazo
                              </Typography>
                            </ListItemButton>

                            {/* <ListItemButton sx={{ marginLeft: 4 }}>
                              <ListItemIcon>
                                <KeyboardArrowRightIcon sx={queries.icon} />
                              </ListItemIcon>
                              <Typography sx={queries.text}>
                                Credito Simple
                              </Typography>
                            </ListItemButton> */}
                          </List>
                        </Collapse>

                        <ListItemButton
                          sx={{ marginLeft: 2 }}
                          onClick={() => {
                            navigate("../ConsultaDeSolicitudes");
                          }}
                        >
                          <ListItemIcon>
                            <KeyboardDoubleArrowRightIcon sx={queries.icon} />
                          </ListItemIcon>
                          <Typography sx={queries.text}>
                            Consulta de solicitudes
                          </Typography>
                        </ListItemButton>
                      </List>
                    </Collapse>

                    {/* <ListItemButton>
                      <ListItemIcon>
                        <PivotTableChartOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Reestructuración
                      </Typography>
                    </ListItemButton> */}

                    {/* <ListItemButton>
                      <ListItemIcon>
                        <HighlightOffOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Cancelación</Typography>
                    </ListItemButton> */}

                    {/* <ListItemButton>
                      <ListItemIcon>
                        <AttachMoneyOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Mecanismos de pago
                      </Typography>
                    </ListItemButton> */}

                    {/* <ListItemButton>
                      <ListItemIcon>
                        <CampaignOutlinedIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Tablero electrónico
                      </Typography>
                    </ListItemButton> */}
                  </List>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
              </Grid>
              <Grid item container direction="column">
                <Grid item>
                  <List>
                    <ListItemButton
                      onClick={() => {
                        navigate("../Config");
                      }}
                    >
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

                    <ListItemButton
                      onClick={() => {
                        logout();
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>Cerrar Sesión</Typography>
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
}
