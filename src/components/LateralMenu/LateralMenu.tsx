import * as React from "react";
import logo from "../../assets/images/logo.svg";
import {
  Dialog,
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Collapse,
  Drawer,
  AppBar,
  Toolbar,
  OutlinedInput,
  Tooltip,
  Badge,
} from "@mui/material";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
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
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { useCortoPlazoStore } from "../../store/main";
import { useState } from "react";

import { queries } from "../../queries";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { TimerCounter } from "./TimerCounter";
import axios from "axios";
import Swal from "sweetalert2";
import { getListadoUsuarios } from "../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { INotificaciones } from "../Interfaces/Notificaciones/INotificaciones";
import { getNotificaciones, leerMensaje } from "./APINotificaciones";
import { format } from "date-fns";

export function LateralMenu() {
  const logout = () => {
    localStorage.clear();
    window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN_FRONT || "");
  };

  const nombre = localStorage.getItem("NombreUsuario") || "";
  const iniciales = `${nombre?.split(" ")[0].split("")[0] || ""} ${nombre?.split(" ")[2].split("")[0] || ""
    }`;

  const tipoEnte = localStorage.getItem("TipoEntePublicoObligado");
  const ente = localStorage.getItem("EntePublicoObligado");

  const navigate = useNavigate();

  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
  };



  const [openInscripcion, setOpenInscripcion] = React.useState(false);
  const [openFinanciamiento, setOpenFinanciamiento] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerNotificationOpen, setIsDrawerNotificationOpen] = useState(false);

  const [notificaciones, setNotificaciones] = useState<Array<INotificaciones>>([]);

  const [cantNoti, setCantNoti] = useState<number>();

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

  const [openBandejas, setOpenBandejas] = useState(false);

  const [show, setShow] = useState(false);

  const handleClickBandejas = () => {
    setOpenBandejas(!openBandejas);
  };

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
      getNotificaciones(

      setNotificaciones,
      setCantNoti);
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
              position: "top-end",
              icon: "success",
              title: "Contraseña actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((r) => {
          if (r.response.status === 409) {
            handleClosePasswordChange();

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    };

    return (
      <Dialog
        onClose={handleClosePasswordChange}
        open={openPasswordChange}
        maxWidth={"sm"}
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
                    {show ? <VisibilityOff /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(v) => setNewPassword(v.target.value)}
            />
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

  const reset = () => {
    useCortoPlazoStore.setState({
      obligadoSolidarioAvalTable: [],
    });

    useCortoPlazoStore.setState({
      condicionFinancieraTable: [],
    });

    useCortoPlazoStore.setState({
      plazoDias: 0,
    });

    useCortoPlazoStore.setState({
      montoOriginal: 0,
    });

    useCortoPlazoStore.setState({
      fechaVencimiento: "",
    });

    useCortoPlazoStore.setState({
      institucion: "",
    });

    useCortoPlazoStore.setState({
      tipoEntePublicoObligado: "",
    });

    useCortoPlazoStore.setState({
      entePublicoObligado: "",
    });

    useCortoPlazoStore.setState({
      obligadoSolidarioAval: "",
    });

    useCortoPlazoStore.setState({
      documentoAutorizado: "",
    });

    useCortoPlazoStore.setState({
      identificacion: "",
    });

    useCortoPlazoStore.setState({
      reglas: [],
    });
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

          <Grid mt={1.5} display={"flex"} justifyContent={"space-between"} width={85}>
            <Grid>
              <Badge badgeContent={cantNoti} color='info'>
                <Tooltip title='Notificaciones'>
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
            sx={{ width: query.isXs ? "40vw" : "30vw", height: "inherit" }}
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
                  {iniciales.toUpperCase()}
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

              <Divider />

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
                        Financiamiento y obligaciones
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
                            Crédito simple corto plazo
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

                <ListItemButton
                  onClick={() => {
                    navigate("../firmar");
                  }}
                >
                  <ListItemIcon>
                    <EditIcon sx={queries.icon} />
                  </ListItemIcon>
                  <Typography sx={queries.text}>Firmar con e.firma</Typography>
                </ListItemButton>

                <ListItemButton onClick={handleClickBandejas}>
                  <ListItemIcon>
                    <FolderOpenIcon sx={queries.icon} />
                  </ListItemIcon>
                  <Typography sx={queries.text}>Documentos</Typography>
                  {openBandejas ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>



                <Collapse in={openBandejas} timeout="auto" unmountOnExit>
                  <List>
                    {bandejaInfo.length > 0 &&
                      bandejaInfo.map((b) => (
                        <ListItemButton
                          key={b.Id}
                          onClick={() => {
                            navigate("../bandeja/" + b.Nombre + "/" + b.Id);
                          }}
                          sx={{ marginLeft: 4 }}
                        >
                          <ListItemIcon>
                            <KeyboardArrowRightIcon sx={queries.icon} />
                          </ListItemIcon>
                          <Typography sx={queries.text}>{b.Nombre}</Typography>
                        </ListItemButton>
                      ))}
                  </List>
                </Collapse>


                <ListItemButton
                  onClick={() => {
                    navigate("../notificaciones");
                  }}
                >
                  <ListItemIcon>
                    <NotificationsActiveIcon sx={queries.icon} />
                  </ListItemIcon>
                  <Typography sx={queries.text}>Notificaciones</Typography>
                </ListItemButton>


                {/* <ListItemButton>
                      <ListItemIcon>
                        <NotificationsActiveIcon sx={queries.icon} />
                      </ListItemIcon>
                      <Typography sx={queries.text}>
                        Notificaciones
                      </Typography>
                    </ListItemButton>

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

            <Grid item container direction="column" justifyContent={"flex-end"}>
              <List>
                <Divider />
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

                <ListItemButton onClick={() => setOpenPasswordChange(true)}>
                  <ListItemIcon>
                    <LockOutlinedIcon sx={queries.icon} />
                  </ListItemIcon>
                  <Typography sx={queries.text}>Cambiar Contraseña</Typography>
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
              "&::-webkit-scrollbar": { //PARA CAMBIAR EL SCROLL
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

              <Typography sx={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
                Tus Notificaciones
              </Typography>

              <Divider variant='fullWidth' />
              <Grid width={"100%"} item  >
                <List sx={{
                }}
                >

                  {notificaciones.map((noti, index) => (
                    <Grid>
                      <Grid>
                        <Box sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",

                        }}>
                          <Typography
                            sx={{
                              padding: "1px 4px 1px 0",
                              fontSize: "14px",
                              fontWeight: "bold"
                            }}
                            color="#af8c55"
                          >
                            {noti.Titulo}
                          </Typography>

                          <Typography
                            sx={
                              {
                                padding: "1px 4px 1px 0",
                                fontSize: "14px",
                                fontWeight: "bold"
                              }}
                            color="#af8c55 "
                          >
                            {noti.FechaDeCreacion}
                          </Typography>

                        </Box>

                        <Box sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}>
                          <Typography
                            sx={{
                              width: "100%",
                              padding: "10px 4px 1px 0",
                              fontSize: "14px",
                              textAlign: "justify"
                            }}
                            color="black"
                          >
                            {noti.Mensaje}
                          </Typography>
                        </Box>
                      </Grid>

                      <Box sx={{
                        textAlign: "end"
                      }}>
                        <Button sx={{}}
                          onClick={() => {
                            console.log(noti.Id);
                            leerMensaje(noti.Id); 
                            getNotificaciones(
                              setNotificaciones,
                              setCantNoti)
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
                        <Divider variant='fullWidth' />
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
