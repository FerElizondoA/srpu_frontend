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
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Collapse,
  Dialog,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
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
import logo2 from "../../assets/images/logo2.svg";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
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

    default:
      return <KeyboardDoubleArrowRightIcon sx={queries.icon} />;
  }
};

export interface IData {
  Id: string;
  Institucion: string;
  TipoEntePublico: string;
  ClaveDeInscripcion: string;
  Estatus: string;
  FechaContratacion: Date;
  MontoOriginalContratado: number;
  Acciones: string;
  Solicitud: string;
  tipoDocumento: string;
  TipoSolicitud: string;
}
export function LateralMenu() {
  const menu =
    localStorage.getItem("Menu") !== undefined &&
    localStorage.getItem("Menu") !== null
      ? JSON.parse(localStorage.getItem("Menu")!)
      : [];
  const logout = () => {
    localStorage.clear();
    window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN_FRONT || "");
  };

  const nombre = localStorage.getItem("NombreUsuario") || "";

  function stringAvatar(name: string) {
    return `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`;
  }

  const tipoEnte = localStorage.getItem("TipoEntePublicoObligado");
  const ente = localStorage.getItem("EntePublicoObligado");

  const navigate = useNavigate();

  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
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

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 5)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 1,
            height: "5vh",
            boxShadow: 1,
            borderColor: "#ccc",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}>
            MODIFICAR CONTRASEÑA
          </Typography>
        </Box>
        <Box
          sx={{
            height: "20vh",
            width: "20vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Nueva contraseña</Typography>
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
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Button
              color="error"
              onClick={() => handleClosePasswordChange()}
              variant="outlined"
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              disabled={/^[\s]*$/.test(newPassword)}
              variant="outlined"
              onClick={() => cambiarContrasena()}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cambiar
              </Typography>{" "}
            </Button>
          </Box>
        </Box>
      </Dialog>
    );
  };

  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const cleanObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );
  const updatecondicionFinancieraTable: Function = useCortoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );
  // const addCondicionFinanciera: Function = useCortoPlazoStore(
  //   (state) => state.addCondicionFinanciera
  // );
  const cleanComentario: Function = useCortoPlazoStore(
    (state) => state.cleanComentario
  );

  const reset = () => {
    changeEncabezado({
      tipoDocumento: "Crédito simple a corto plazo",
      solicitanteAutorizado: {
        Solicitante: localStorage.getItem("IdUsuario") || "",
        Cargo: localStorage.getItem("Puesto") || "",
        Nombre: localStorage.getItem("NombreUsuario") || "",
      },
      tipoEntePublico: {
        Id: "",
        TipoEntePublico: localStorage.getItem("TipoEntePublicoObligado") || "",
      },
      organismo: {
        Id: "",
        Organismo: localStorage.getItem("EntePublicoObligado") || "",
      },
      fechaContratacion: new Date().toString(),
    });

    changeInformacionGeneral({
      fechaContratacion: new Date().toString(),
      fechaVencimiento: new Date().toString(),
      plazo: 1,
      destino: { Id: "", Descripcion: "" },
      monto: 0,
      denominacion: "Pesos",
      institucionFinanciera: { Id: "", Descripcion: "" },
    });

    cleanObligadoSolidarioAval();
    updatecondicionFinancieraTable([]);
    cleanComentario();
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
            <Tooltip title="Menu Lateral">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item mt={0.5}>
            <img src={logo} style={{ height: "40px" }} alt={"logo"}></img>
          </Grid>

          <Grid
            mt={1.5}
            display={"flex"}
            justifyContent={"space-between"}
            width={85}
          >
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
            <Grid>
              <TimerCounter />
            </Grid>
          </Grid>
        </Grid>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Grid
            container
            sx={{
              width: query.isXs ? "40vw" : "30vw",
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
                <img
                  src={logo2}
                  alt="Logo2"
                  style={{ width: "100%", height: "70%" }}
                />
              </Grid>

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
                  {tipoEnte}: {ente}
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
                            onClick={() => {
                              if (v.Path !== "#") {
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
                            <Typography sx={queries.bold_text}>
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
                                {v.item.map((v: any, i: number) => (
                                  <Grid key={i}>
                                    <ListItemButton
                                      onClick={() => {
                                        if (v.Path !== "#") {
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
                                      <Typography sx={queries.bold_text}>
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
                                          {v.item.map((v: any, i: number) => (
                                            <Grid key={i}>
                                              <ListItemButton
                                                onClick={() => {
                                                  if (v.Path !== "#") {
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
                                                  sx={queries.bold_text}
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
                            onClick={() => {
                              if (v.Path !== "#") {
                                navigate(v.Path);
                              } else {
                                if (openModulo === v.ControlInterno) {
                                  setOpenModulo("");
                                } else if (
                                  v.ControlInterno === "Cambiar contraseña"
                                ) {
                                  setOpenPasswordChange(true);
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
              width: query.isXs ? "35vw" : "25vw",
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
