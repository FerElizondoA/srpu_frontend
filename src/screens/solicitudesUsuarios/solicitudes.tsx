import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ListIcon from "@mui/icons-material/List";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDetailSolicitudUsuario,
  getPreviewSolicitud,
} from "../../components/APIS/solicitudesUsuarios/APIGetSolicitudes";
import {
  IDetailSolicitudUsuario,
  ISolicitudes,
} from "../../components/Interfaces/InterfacesUsuario/ISoliciudes";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { queries } from "../../queries";
import { queriesSolicitud } from "./queriesSolicitudes";

export function Solicitudes() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    buttonMobile: useMediaQuery("(min-width: 0px) and (max-width: 768px)"),
  };
  const [filtro, setFiltro] = useState<number>(4);
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitudes>>([]);
  const [solicitudesFiltered, setSolicitudesFiltered] = useState<
    Array<ISolicitudes>
  >([]);

  const [detailSolicitud, setDetailSolicitud] =
    useState<IDetailSolicitudUsuario>({
      ApellidoMaterno: "",
      ApellidoPaterno: "",
      Celular: "",
      CorreoElectronico: "",
      CreadoPor: "",
      Curp: "",
      Entidad: "",
      Ext: "",
      FechaDeCreacion: "",
      Id: "",
      IdEntidad: "",
      IdTipoUsuario: "",
      Nombre: "",
      NombreApp: "",
      NombreSolicitante: "",
      NombreUsuario: "",
      PuedeFirmar: "",
      Puesto: "",
      Rfc: "",
      Roles: "",
      Telefono: "",
      TpoUsuario: "",
    });

  const getEstatus = (estatus: number) => {
    switch (estatus) {
      case 0:
        return "PENDIENTE";
      case 1:
        return "ACEPTADO";
      case 2:
        return "RECHAZADO";
      case 3:
        return "MODIFICACION";
      default:
        return "DESCONOCIDO";
    }
  };

  const filtros = [
    { id: 4, label: "TODAS LAS SOLICITUDES" },
    { id: 1, label: "ACEPTADAS" },
    { id: 2, label: "RECHAZADAS" },
    { id: 0, label: "PENDIENTES" },
    { id: 3, label: "MODIFICACIÓN" },
  ];

  const FiltraSolicitudes = (id: number) => {
    if (id === 4) {
      setSolicitudesFiltered(solicitudes);
    } else {
      // eslint-disable-next-line array-callback-return
      let aux = solicitudes.filter((item) => item.Estatus === id);
      setSolicitudesFiltered(aux);
    }
  };

  // const indexSelect: number = useSolicitudUsuarioStore(
  //   (state) => state.indexSelect
  // );
  // const setIndexSelect: Function = useSolicitudUsuarioStore(
  //   (state) => state.setIndexSelect
  // )

  // const openDialog: boolean = useSolicitudUsuarioStore(
  //   (state) => state.opendialog
  // );
  // const setOpenDialog: Function = useSolicitudUsuarioStore(
  //   (state) => state.setOpenDialog
  // )

  const [indexSelect, setIndexSelect] = useState(-1);

  const prevSolicitud = () => {
    if (indexSelect !== 0) setIndexSelect(indexSelect - 1);
  };
  const nextSolicitud = () => {
    if (indexSelect < solicitudesFiltered.length - 1)
      setIndexSelect(indexSelect + 1);
  };

  useEffect(() => {
    if (indexSelect >= 0) {
      getDetailSolicitudUsuario(
        solicitudesFiltered[indexSelect].Id,
        setDetailSolicitud
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexSelect]);

  useEffect(() => {
    getPreviewSolicitud(setSolicitudes);
  }, []);

  useEffect(() => {
    setSolicitudesFiltered(solicitudes);
  }, [solicitudes]);

  const limpiaIndex = () => {
    setIndexSelect(-1);
    setSolicitudesFiltered([]);
  };

  useEffect(() => {
    setIndexSelect(-1);
  }, []);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Grid container direction="column">
      {/* grid  columna del encabezado */}
      {/* <Grid>{query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}</Grid> */}
      <Grid>
        <LateralMenu />
      </Grid>
      {/* grid  columna del cuerpo */}
      <Grid
        container
        display={"flex"}
        width={"80%"}
        justifyContent={"space-between"}
      >
        <Grid
          mb={1}
          sx={{
            height: 40,
            display: "flex",
          }}
        >
          <Tooltip title="Volver a consulta de solicitudes">
            <Button
              color="primary"
              variant="contained"
              sx={queries.buttonContinuar}
              onClick={() => {
                navigate("../users");
                limpiaIndex();
              }}
            >
              <KeyboardArrowLeftIcon />
              {query.buttonMobile ? null : "Volver"}
            </Button>
          </Tooltip>
        </Grid>

        {query.buttonMobile ? (
          <Grid
            sx={{
              height: 40,
              width: "54%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              direction: "row",
              marginRight: 3,
            }}
          >
            <Tooltip title="Lista de Solicitudes">
              <Button
                color="primary"
                variant="contained"
                sx={queries.buttonContinuar}
                onClick={() => {
                  setOpenDialog(!openDialog);
                }}
              >
                <ListIcon />
                Lista de Solicitudes
              </Button>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>

      <Grid
        width={"100%"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          direction: "row",
        }}
      >
        {!query.buttonMobile ? (
          <Grid
            width={"35%"}
            item
            flexDirection={"column"}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <Grid xs={9} sm={12} md={12} lg={12} xl={12}>
              <FormControl fullWidth>
                <InputLabel>Filtrado</InputLabel>
                <Select
                  value={filtro}
                  label="Filtrado"
                  onChange={(v) => {
                    setIndexSelect(-4);
                    setFiltro(parseInt(v.target.value.toString()));
                    FiltraSolicitudes(parseInt(v.target.value.toString()));
                  }}
                >
                  {filtros.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid>
              {/* COMPONENTE LISTA */}
              <List
                sx={{
                  //...queriesSolicitud.buscador_solicitudes,

                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                    height: ".5vh",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                  height: "25rem",
                  "@media (min-width: 480px)": {
                    height: "20rem",
                  },

                  "@media (min-width: 768px)": {
                    height: "35rem",
                  },
                  "@media (min-width: 1140px)": {
                    height: "34rem",
                  },

                  "@media (min-width: 1400px)": {
                    height: "34rem",
                  },

                  "@media (min-width: 1870px)": {
                    height: "45rem",
                  },
                }}
              >
                {solicitudesFiltered?.map((dato, index) => {
                  return (
                    <Grid mb={2} container key={index}>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            border: index === indexSelect ? "2px solid" : null,
                            ":hover": { backgroundColor: "none" },
                          }}
                          onClick={() => {
                            getDetailSolicitudUsuario(
                              dato.Id,
                              setDetailSolicitud
                            );
                            setIndexSelect(index);
                            setOpenDialog(false);
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              width: "100%",
                              height: "18vh",
                              justifyContent: "space-evenly",
                              display: "flex",
                            }}
                          >
                            <Grid item width={"100%"}>
                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  USUARIO:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.NombreUsuario.toUpperCase()}
                                </Typography>
                              </Grid>

                              <Grid
                                mt={0.7}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  padding={"1px 4px 1px 0"}
                                  fontSize={"14px"}
                                  fontWeight={"bold"}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  FECHA:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.FechaDeCreacion.toUpperCase()}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container width={"100%"}>
                              <Grid
                                item
                                width={"100%"}
                                display={"flex"}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  TIPO :{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.tipoSoli.toUpperCase()}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                width={"100%"}
                                display={"flex"}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  ESTATUS:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {getEstatus(dato.Estatus)}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              width={"100%"}
                              display={"flex"}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={queriesSolicitud.typograhyCampoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                SOLICITANTE:{" "}
                              </Typography>

                              <Typography
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {dato.NombreSolicitante.toUpperCase()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </Grid>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        ) : null}

        {/********grid Formulario*********/}
        {indexSelect < 0 ||
        solicitudesFiltered.length === 0 ||
        detailSolicitud.Id === "" ? (
          <Grid item width={"100%"}>
            <Grid
              item
              sx={{
                width: "100%",
                height: "60vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",

                "@media (min-width: 480px)": {
                  height: "76vh",
                },

                "@media (min-width: 768px)": {
                  height: "84vh",
                },

                "@media (min-width: 1140px)": {
                  height: "84vh",
                  width: "100%",
                },

                "@media (min-width: 1400px)": {
                  height: "85vh",
                  width: "100%",
                },

                "@media (min-width: 1870px)": {
                  height: "85vh",
                  width: "100%",
                },
              }}
            >
              <InfoIcon
                sx={{ width: "80%", height: "80%", opacity: "10%" }}
                fontSize="large"
              ></InfoIcon>
              {query.buttonMobile ? (
                <Typography color={"#AF8C55"} fontWeight={"bold"}>
                  SELECCIONAR BOTON DE "LISTA DE SOLICITUDES" Y ESCOGER UNA
                </Typography>
              ) : (
                <Typography color={"#AF8C55"} fontWeight={"bold"}>
                  SELECCIONAR UNA SOLICITUD EN EL APARTADO DE BUSQUEDA
                </Typography>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid
            width={"100%"}
            item
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
            }}
          >
            <Grid sx={queriesSolicitud.boxContenidoFormulario}>
              <Grid>
                {/* <Grid sx={queriesSolicitud.boxApartadosFormulario}> */}
                <Grid container justifyContent={"space-around"}>
                  <Grid item sm={2} xl={3} xs={4} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      label="Solicitado Por"
                      variant="standard"
                      value={detailSolicitud?.NombreSolicitante || ""}
                    />
                  </Grid>

                  <Grid item sm={3} xl={3} xs={4} md={4} lg={4}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      label="Fecha de Solicitud"
                      variant="standard"
                      value={
                        detailSolicitud?.FechaDeCreacion.split("T")[0] || ""
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item xs={2.7} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Nombre(s)"
                    variant="standard"
                    value={detailSolicitud?.Nombre || ""}
                  />
                </Grid>

                <Grid item xs={2.7} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Apellido Paterno"
                    variant="standard"
                    value={detailSolicitud?.ApellidoPaterno || ""}
                  />
                </Grid>

                <Grid item xs={2.7} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Apellido Materno"
                    variant="standard"
                    value={detailSolicitud?.ApellidoMaterno || ""}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                {/* grid contenido*/}
                <Grid item xs={4.5} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Usuario"
                    variant="standard"
                    value={detailSolicitud?.NombreUsuario || ""}
                  />
                </Grid>

                <Grid item xs={4.5} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Teléfono Movil"
                    variant="standard"
                    value={detailSolicitud?.Celular || ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={10}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{
                    mt: { xs: 4, sm: 0 },
                  }}
                >
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Correo Electrónico"
                    variant="standard"
                    value={detailSolicitud?.CorreoElectronico || ""}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item xs={4.5} sm={2} md={2} lg={2} xl={2}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="RFC"
                    variant="standard"
                    value={detailSolicitud?.Rfc || ""}
                  />
                </Grid>

                <Grid item xs={4.5} sm={2} md={2} lg={2} xl={2}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="CURP"
                    variant="standard"
                    value={detailSolicitud?.Curp || ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={4.5}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  sx={{
                    mt: { xs: 4, sm: 0 },
                  }}
                >
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Teléfono"
                    variant="standard"
                    value={detailSolicitud?.Telefono || ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={4.5}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  sx={{
                    mt: { xs: 4, sm: 0 },
                  }}
                >
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Extensión"
                    variant="standard"
                    value={detailSolicitud?.Ext || ""}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item xs={10} sm={7} md={7.7} lg={7.7} xl={7.7}>
                  <TextField
                    //multiline
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Entidad"
                    variant="standard"
                    value={detailSolicitud?.Entidad || ""}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  sx={{
                    mt: { xs: 4, sm: 0 },
                  }}
                >
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Rol"
                    variant="standard"
                    value={
                      (detailSolicitud.Roles &&
                        JSON.parse(detailSolicitud.Roles)[0]?.Descripcion) ||
                      ""
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                mt={4}
                item
                display={"flex"}
                justifyContent={"space-evenly"}
              >
                <Tooltip title="Mostrar solicitud anterior">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      prevSolicitud();
                    }}
                    endIcon={<ArrowBackIcon />}
                  ></Button>
                </Tooltip>
                <Tooltip title="Mostrar siguiente solicitud">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      nextSolicitud();
                    }}
                    endIcon={<ArrowForwardIcon />}
                  ></Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* DIALOG FILTRO MOVIL */}

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle>Lista de Solicitudes de Usuarios</DialogTitle>

        <DialogContent>
          <Grid
            width={"100%"}
            mt={2}
            item
            flexDirection={"column"}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} mb={2}>
              <FormControl fullWidth>
                <InputLabel>Filtrado</InputLabel>
                <Select
                  value={filtro}
                  label="Filtrado"
                  onChange={(v) => {
                    setIndexSelect(-4);
                    setFiltro(parseInt(v.target.value.toString()));
                    FiltraSolicitudes(parseInt(v.target.value.toString()));
                  }}
                >
                  {filtros.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid container>
              {/* aqui va el componente de lista*/}
              <List
                sx={{
                  //...queriesSolicitud.buscador_solicitudes,

                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                    height: ".5vh",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                  height: "25rem",
                  "@media (min-width: 480px)": {
                    height: "20rem",
                  },

                  "@media (min-width: 768px)": {
                    height: "35rem",
                  },
                  "@media (min-width: 1140px)": {
                    height: "34rem",
                  },

                  "@media (min-width: 1400px)": {
                    height: "34rem",
                  },

                  "@media (min-width: 1870px)": {
                    height: "45rem",
                  },
                }}
              >
                {solicitudesFiltered?.map((dato, index) => {
                  return (
                    <Grid mb={2} container key={index}>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            border: index === indexSelect ? "2px solid" : null,
                            ":hover": { backgroundColor: "none" },
                          }}
                          onClick={() => {
                            getDetailSolicitudUsuario(
                              dato.Id,
                              setDetailSolicitud
                            );
                            setIndexSelect(index);
                            setOpenDialog(false);
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              width: "100%",
                              height: "18vh",
                              justifyContent: "space-evenly",
                              display: "flex",
                            }}
                          >
                            <Grid item width={"100%"}>
                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  USUARIO:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.NombreUsuario.toUpperCase()}
                                </Typography>
                              </Grid>

                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  padding={"1px 4px 1px 0"}
                                  fontSize={"14px"}
                                  fontWeight={"bold"}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  FECHA:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.FechaDeCreacion.toUpperCase()}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container width={"100%"}>
                              <Grid
                                item
                                width={"100%"}
                                display={"flex"}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  TIPO :{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {dato.tipoSoli.toUpperCase()}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                width={"100%"}
                                display={"flex"}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={queriesSolicitud.typograhyCampoBuscador}
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  ESTATUS:{" "}
                                </Typography>
                                <Typography
                                  sx={
                                    queriesSolicitud.typograhyResultadoBuscador
                                  }
                                  color={
                                    index === indexSelect ? "#af8c55 " : "black"
                                  }
                                >
                                  {getEstatus(dato.Estatus)}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              width={"100%"}
                              display={"flex"}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={queriesSolicitud.typograhyCampoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                SOLICITANTE:{" "}
                              </Typography>

                              <Typography
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {dato.NombreSolicitante.toUpperCase()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </Grid>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ ...queries.buttonCancelar }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
