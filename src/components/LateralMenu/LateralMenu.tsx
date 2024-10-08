import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Groups2Icon from "@mui/icons-material/Groups2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HelpIcon from "@mui/icons-material/Help";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";

import InfoIcon from "@mui/icons-material/Info";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/images/logo.svg";
import { queries } from "../../queries";
import { getAyuda } from "../../screens/Ayuda/ServicesAyuda";
import { VisualizadorAyudas } from "../../screens/Ayuda/VisualizadorAyudas";
import { INotificaciones } from "../Interfaces/Notificaciones/INotificaciones";
import { getNotificaciones, leerMensaje } from "./APINotificaciones";
import { TimerCounter } from "./TimerCounter";

export const IconsMenu = (icon: string) => {
  switch (icon) {
    case "HomeOutlinedIcon":
      return <HomeOutlinedIcon sx={queries.icon} />;
    case "PostAddOutlinedIcon":
      return <PostAddOutlinedIcon sx={queries.icon} />;
    case "KeyboardDoubleArrowRightIcon":
      return <KeyboardDoubleArrowRightIcon sx={queries.icon} />;
    case "KeyboardArrowRightIcon":
      return <KeyboardArrowRightIcon sx={queries.icon} />;
    case "CurrencyExchangeIcon":
      return <CurrencyExchangeIcon sx={queries.icon} />;
    case "HandshakeIcon":
      return <HandshakeIcon sx={queries.icon} />;
    case "EditIcon":
      return <EditIcon sx={queries.icon} />;
    case "FolderOpenIcon":
      return <FolderOpenIcon sx={queries.icon} />;
    case "SettingsOutlinedIcon":
      return <SettingsOutlinedIcon sx={queries.icon} />;
    case "LockOutlinedIcon":
      return <LockOutlinedIcon sx={queries.icon} />;
    case "LogoutIcon":
      return <LogoutIcon sx={queries.icon} />;
    case "Groups2Icon":
      return <Groups2Icon sx={queries.icon} />;
    case "AssignmentIcon":
      return <AssignmentIcon sx={queries.icon} />;
    case "HistoryEduIcon":
      return <HistoryEduIcon sx={queries.icon}></HistoryEduIcon>;
    case "InfoIcon":
      return <InfoIcon sx={queries.icon} />;
    case "OndemandVideoIcon":
      return <OndemandVideoIcon sx={queries.icon} />;
    case "MenuBookIcon":
      return <MenuBookIcon sx={queries.icon} />;
    case "HelpIcon":
      return <HelpIcon sx={queries.icon} />;
    case "CancelIcon":
      return <DoNotDisturbAltIcon sx={queries.icon} />;
    case "BuildIcon":
      return <BuildOutlinedIcon sx={queries.icon} />;
    case "ExtensionIcon":
      return <ExtensionIcon sx={queries.icon} />;

    default:
      return <KeyboardDoubleArrowRightIcon sx={queries.icon} />;
  }
};

export function LateralMenu() {
  const menu =
    localStorage.getItem("Menu") !== undefined &&
    localStorage.getItem("Menu") !== null
      ? JSON.parse(localStorage.getItem("Menu")!)
      : [];

  const [arrayAyudas, setArrayAyudas] = useState<any[]>([]);
  const [option, setOption] = useState("Videos");
  const [openVAyudas, setOpenVAyudas] = useState(false);
  const [seccionesHover, setSeccionesHover] = useState(false);

  function handleCloseVAyudas() {
    setOpenVAyudas(false);
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN_FRONT || "");
  };

  const nombre = localStorage.getItem("NombreUsuario") || "";

  function stringAvatar(name: string) {
    return name?.split(" ")[0][0] + (name?.split(" ")[1][0] || " ");
  }

  const ente = localStorage.getItem("EntePublicoObligado");

  const navigate = useNavigate();

  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [openModulo, setOpenModulo] = useState("");
  const [openSubModulo, setOpenSubModulo] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerNotificationOpen, setIsDrawerNotificationOpen] =
    useState(false);

  const [notificaciones, setNotificaciones] = useState<Array<INotificaciones>>(
    []
  );

  const [cantNoti, setCantNoti] = useState<number>();

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < nombre.length; i += 1) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  }

  // let color = "#";
  let color = "#56636a";

  const [show, setShow] = useState(false);

  const [bandejaInfo, setBandejaInfo] = useState<any[]>([]);

  const getBandejas = () => {
    axios
      .post(process.env.REACT_APP_APPLICATION_FIEL + "/api/docsfirmados/menu")
      .then((r) => {
        if (r.status === 200) {
          setBandejaInfo(r.data);
        }
      });
  };

  React.useEffect(() => {
    getBandejas();
  }, []);

  React.useEffect(() => {
    bandejaInfo.length > 0 &&
      bandejaInfo.map(
        (b) =>
          b.Nombre === "Por enviar" &&
          localStorage.setItem(
            "PathPorEnviar",
            "/bandeja/" + b.Nombre + "/" + b.Id
          )
      );
  }, [bandejaInfo]);

  React.useEffect(() => {
    setTimeout(() => {
      getNotificaciones(setNotificaciones, setCantNoti);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (isDrawerOpen === false) {
      limpiaIndex();
      setOpenModulo("");
    }
  }, [isDrawerOpen]);

  const [indexSelect, setIndexSelect] = useState(-1);

  const limpiaIndex = () => {
    setIndexSelect(-1);
  };

  React.useEffect(() => {
    setIndexSelect(-1);
  }, []);

  const [openPasswordChange, setOpenPasswordChange] = useState(false);

  const handleClosePasswordChange = () => {
    setOpenPasswordChange(false);
  };

  const ChangePasswordModal = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState({ label: "", show: false });

    const cambiarContrasena = () => {
      if (newPassword === "") {
        setError({ label: "Ingresa una contraseña.", show: true });
        return null;
      }
      if (newPassword.length < 8) {
        setError({
          label: "Su contraseña debe contar con al menos 8 caracteres.",
          show: true,
        });

        return null;
      }

      const regex3 = /^[a-zA-Z]+$/;
      const regex5 = /^[a-zA-Z-0-9]+$/;

      if (newPassword.match(regex3)) {
        setError({
          label: "Su contraseña debe contar con al menos un numero",
          show: true,
        });
        return null;
      }

      if (newPassword.match(regex5)) {
        setError({
          label: "Su contraseña debe contar con un caracter especial",
          show: true,
        });
        return null;
      }

      axios
        .put(
          process.env.REACT_APP_APPLICATION_LOGIN + "/api/change-password",
          {
            ContrasenaNueva: newPassword,
            IdUsuario: localStorage.getItem("IdCentral"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            handleClosePasswordChange();
            setNewPassword("");
            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              position: "center",
              icon: "success",
              title: "Contraseña actualizada",
              showConfirmButton: true,
              timer: 1500,
            });
          }
        })
        .catch((r) => {
          if (r.response.status === 409) {
            handleClosePasswordChange();

            Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              position: "center",
              icon: "error",
              title: "Error",
              showConfirmButton: true,
              timer: 1500,
            });
          }
        });
    };

    return (
      <Dialog
        onClose={handleClosePasswordChange}
        open={openPasswordChange}
        maxWidth={"lg"}
      >
        <DialogTitle>
          <Grid display={"flex"} justifyContent={"center"}>
            <Typography sx={{ ...queries.bold_text }}>
              MODIFICAR CONTRASEÑA
            </Typography>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ ...queries.medium_text }}>
              Nueva contraseña
            </Typography>
            <OutlinedInput
              error={error.show}
              size="small"
              type={show ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)} edge="end">
                    {show ? (
                      <Tooltip title={"Ocultar contraseña"}>
                        <VisibilityOff
                          sx={{
                            fontSize: {
                              xs: "50%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Ver contraseña"}>
                        <VisibilityIcon
                          sx={{
                            fontSize: {
                              xs: "50%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                          }}
                        />
                      </Tooltip>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(v) => {
                setNewPassword(v.target.value);
                setError({
                  label: "Su contraseña debe contar con al menos 8 caracteres.",
                  show: false,
                });
              }}
            />
            {error.show ? (
              <Typography sx={{ textAlign: "center", color: "red" }}>
                {error.label}
              </Typography>
            ) : null}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => handleClosePasswordChange()}
            variant="outlined"
            sx={{ ...queries.buttonCancelar }}
          >
            <Typography sx={{ ...queries.medium_text, color: "white" }}>
              Cancelar
            </Typography>
          </Button>

          <Button
            disabled={/^[\s]*$/.test(newPassword)}
            variant="outlined"
            onClick={() => cambiarContrasena()}
            sx={{ ...queries.buttonContinuar }}
          >
            <Typography sx={{ ...queries.medium_text, color: "white" }}>
              Cambiar
            </Typography>{" "}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <ChangePasswordModal />
          <Grid item mt={0.5}>
            <Tooltip title="Menú Lateral">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item mt={0.5} ml={3}>
            <img src={logo} style={{ height: "40px" }} alt={"logo"}></img>
          </Grid>

          <Grid mt={1.5} display={"flex"} justifyContent={"space-between"}>
            <Grid position={"absolute"}>
              <TimerCounter />
            </Grid>
            <Grid>
              <Tooltip title="Ayudas">
                <IconButton color="inherit" onClick={handleMenu}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                  <MenuItem
                    onClick={() => {
                      getAyuda(setArrayAyudas, "1", "Videos");
                      setOpenVAyudas(true);
                      setOption("Videos");
                    }}
                  >
                    {IconsMenu("OndemandVideoIcon")} Ver Tutoriales{" "}
                  </MenuItem>
                }
                {
                  <MenuItem
                    onClick={() => {
                      getAyuda(setArrayAyudas, "1", "Guías");
                      setOpenVAyudas(true);
                      setOption("Guías");
                    }}
                  >
                    {IconsMenu("MenuBookIcon")} Ver Guías{" "}
                  </MenuItem>
                }
                {
                  <MenuItem
                    onClick={() => {
                      getAyuda(setArrayAyudas, "1", "Preguntas");
                      setOpenVAyudas(true);
                      setOption("Preguntas");
                    }}
                  >
                    {IconsMenu("HelpIcon")} Preguntas{" "}
                  </MenuItem>
                }
              </Menu>
              {/* </Tooltip> */}
            </Grid>
            {openVAyudas ? (
              <VisualizadorAyudas
                handleClose={() => {
                  handleCloseVAyudas();
                }}
                arrayAyudas={arrayAyudas}
                valueTab={option}
                openState
              />
            ) : null}

            <Grid>
              <Badge badgeContent={cantNoti} color="info">
                <Tooltip title="Notificaciones">
                  <IconButton
                    color="inherit"
                    onClick={() => setIsDrawerNotificationOpen(true)}
                  >
                    <NotificationsActiveIcon />
                  </IconButton>
                </Tooltip>
              </Badge>
            </Grid>
          </Grid>
        </Grid>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          sx={{
            width: query.isXs ? "20rem" : "30vw",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: query.isXs ? "20rem" : "30vw",
              boxSizing: "border-box",
            },
          }}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Grid
            container
            sx={{
              width: query.isXs ? "20rem" : "30vw",
              height: "inherit",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,5)",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Grid item container direction="column" mt={2}>
              <Grid item sx={{ alignSelf: "center" }}>
                <Typography sx={queries.bold_text}>
                  SISTEMA DE GESTIÓN DE CRÉDITO DE MUNICIPIOS
                </Typography>
              </Grid>

              <Grid item sx={{ alignSelf: "center" }}>
                <Avatar
                  sx={{ height: "100px", width: "100px", bgcolor: color }}
                >
                  {stringAvatar(
                    localStorage.getItem("NombreUsuario") as string
                  )}
                </Avatar>
              </Grid>

              <Grid item sx={{ alignSelf: "center" }}>
                <Typography sx={queries.bold_text}>
                  {localStorage.getItem("NombreUsuario")}
                </Typography>
              </Grid>

              <Grid item sx={{ alignSelf: "center" }}>
                <Typography sx={queries.bold_text}>
                  {localStorage.getItem("Rol")}
                </Typography>
              </Grid>

              <Grid item sx={{ alignSelf: "center" }}>
                <Typography sx={queries.bold_text}>
                  {/* {tipoEnte}:  */} {ente}
                </Typography>
              </Grid>

              <Divider />

              <List>
                {menu.length > 0 ? (
                  menu.map(
                    (v: any, i: number) =>
                      ![
                        "Configuración",
                        "Cambiar contraseña",
                        "Cerrar sesión",
                      ].includes(v.ControlInterno) && (
                        <Grid key={i}>
                          <ListItemButton
                            sx={{
                              backgroundColor:
                                i === indexSelect && seccionesHover === true
                                  ? "#AF8C55"
                                  : "#ffff",
                              ":hover": { backgroundColor: "#AF8C55" },
                            }}
                            onClick={() => {
                              setSeccionesHover(seccionesHover ? false : true);
                              setIndexSelect(i);

                              if (v.Path !== "#") {
                                localStorage.setItem("IdMenuActual", v.Id);
                                navigate(v.Path);
                              } else {
                                if (openModulo === v.ControlInterno) {
                                  setOpenModulo("");
                                } else {
                                  setOpenModulo(v.ControlInterno);
                                }
                              }
                            }}
                          >
                            <ListItemIcon>{IconsMenu(v.Icon)}</ListItemIcon>
                            <Typography
                              sx={{
                                ...queries.bold_text,
                                ":hover": { backgroundColor: "#AF8C55" },
                              }}
                            >
                              {v.Menu}
                            </Typography>
                            {v.item.length > 0 ? (
                              v.ControlInterno === openModulo ? (
                                <ExpandMore />
                              ) : (
                                <ExpandLess />
                              )
                            ) : null}
                          </ListItemButton>

                          {v.item.length > 0 && (
                            <Collapse
                              in={openModulo === v.ControlInterno}
                              timeout="auto"
                              unmountOnExit
                              sx={{ ml: 2 }}
                            >
                              <List>
                                {/* CAMPOS PRIMER DESGLOSE */}

                                {v.item.map((v: any, i: number) => (
                                  <Grid key={i}>
                                    <ListItemButton
                                      sx={{
                                        ...queries.bold_text,
                                        ":hover": {
                                          backgroundColor: "#AF8C55",
                                        },
                                      }}
                                      onClick={() => {
                                        if (v.Path !== "#") {
                                          localStorage.setItem(
                                            "IdMenuActual",
                                            v.Id
                                          );
                                          navigate(v.Path);
                                        } else {
                                          if (
                                            openSubModulo === v.ControlInterno
                                          ) {
                                            setOpenSubModulo("");
                                          } else {
                                            setOpenSubModulo(v.ControlInterno);
                                          }
                                        }
                                      }}
                                    >
                                      <ListItemIcon>
                                        {IconsMenu(v.Icon)}
                                      </ListItemIcon>
                                      <Typography sx={queries.medium_text}>
                                        {v.Menu}
                                      </Typography>

                                      {v.item.length > 0 ? (
                                        v.ControlInterno === openSubModulo ? (
                                          <ExpandMore />
                                        ) : (
                                          <ExpandLess />
                                        )
                                      ) : null}
                                    </ListItemButton>
                                    {v.item.length > 0 && (
                                      <Collapse
                                        in={openSubModulo === v.ControlInterno}
                                        timeout="auto"
                                        unmountOnExit
                                        sx={{ ml: 2 }}
                                      >
                                        <List>
                                          {/* CAMPOS SEGUNDO DESGLOSE */}
                                          {v.item.map((v: any, i: number) => (
                                            <Grid key={i}>
                                              <ListItemButton
                                                sx={{
                                                  ":hover": {
                                                    backgroundColor: "#AF8C55",
                                                  },
                                                }}
                                                onClick={() => {
                                                  if (v.Path !== "#") {
                                                    localStorage.setItem(
                                                      "IdMenuActual",
                                                      v.Id
                                                    );
                                                    navigate(v.Path);
                                                    window.location.reload();
                                                  } else {
                                                    if (
                                                      openSubModulo ===
                                                      v.ControlInterno
                                                    ) {
                                                      setOpenSubModulo("");
                                                    } else {
                                                      setOpenSubModulo(
                                                        v.ControlInterno
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                <ListItemIcon>
                                                  {IconsMenu(v.Icon)}
                                                </ListItemIcon>
                                                <Typography
                                                  sx={queries.medium_text}
                                                >
                                                  {v.Menu}
                                                </Typography>
                                              </ListItemButton>
                                            </Grid>
                                          ))}
                                        </List>
                                      </Collapse>
                                    )}
                                  </Grid>
                                ))}
                              </List>
                            </Collapse>
                          )}
                        </Grid>
                      )
                  )
                ) : (
                  <ListItemButton
                    onClick={() => {
                      logout();
                    }}
                  >
                    <ListItemIcon>{IconsMenu("LogoutIcon")}</ListItemIcon>
                    <Typography sx={queries.bold_text}>
                      Cerrar sesión
                    </Typography>
                  </ListItemButton>
                )}
              </List>
            </Grid>

            <Grid item container direction="column" justifyContent={"flex-end"}>
              <List>
                <Divider />
                {menu.length > 0 &&
                  menu.map(
                    (v: any, i: number) =>
                      [
                        "Configuración",
                        "Cambiar contraseña",
                        "Cerrar sesión",
                      ].includes(v.ControlInterno) && (
                        <Grid key={i}>
                          <ListItemButton
                            sx={{
                              backgroundColor:
                                i === indexSelect && seccionesHover === true
                                  ? "#AF8C55"
                                  : "#ffff",
                              //border: i === indexSelect ? "2px solid" : null,
                              ":hover": { backgroundColor: "#AF8C55" },
                            }}
                            onClick={() => {
                              if (v.Path !== "#") {
                                localStorage.setItem("IdMenuActual", v.Id);
                                navigate(v.Path);
                              } else {
                                if (openModulo === v.ControlInterno) {
                                  setOpenModulo("");
                                } else if (
                                  v.ControlInterno === "Cambiar contraseña"
                                ) {
                                  setOpenPasswordChange(true);
                                  setIsDrawerOpen(false);
                                } else if (
                                  v.ControlInterno === "Cerrar sesión"
                                ) {
                                  logout();
                                }
                              }
                            }}
                          >
                            <ListItemIcon>{IconsMenu(v.Icon)}</ListItemIcon>
                            <Typography sx={queries.bold_text}>
                              {v.Menu}
                            </Typography>
                          </ListItemButton>
                        </Grid>
                      )
                  )}
              </List>
            </Grid>
          </Grid>
        </Drawer>

        <Drawer
          anchor="right"
          open={isDrawerNotificationOpen}
          onClose={() => setIsDrawerNotificationOpen(false)}
        >
          <Grid
            container
            sx={{
              width: query.isXs ? "65vw" : "30vw",
              height: "inherit",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                //PARA CAMBIAR EL SCROLL
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
            }}
          >
            <Grid item container direction="column" mt={2}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Tus Notificaciones
              </Typography>

              <Divider variant="fullWidth" />
              <Grid width={"100%"} item>
                <List>
                  {notificaciones.map((noti, index) => (
                    <Grid key={index}>
                      <Grid>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Typography
                            sx={{
                              padding: "1px 4px 1px 0",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#af8c55"
                          >
                            {noti.Titulo}
                          </Typography>

                          <Typography
                            sx={{
                              padding: "1px 4px 1px 0",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#af8c55 "
                          >
                            {noti.FechaDeCreacion}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",

                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              padding: "10px 4px 1px 5px",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                            color="black"
                          >
                            {noti.Mensaje}
                          </Typography>
                        </Box>
                      </Grid>

                      <Box
                        sx={{
                          textAlign: "end",
                        }}
                      >
                        <Button
                          onClick={() => {
                            leerMensaje(noti.Id);
                            getNotificaciones(setNotificaciones, setCantNoti);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                            }}
                            color="#af8c55 "
                          >
                            Marcar Como Leido
                          </Typography>
                        </Button>
                        <Divider variant="fullWidth" />
                      </Box>
                    </Grid>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
