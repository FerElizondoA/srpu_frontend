import { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Badge,
  Tooltip,
  IconButton,
} from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import InfoIcon from "@mui/icons-material/Info";
import {
  getComentariosUsuarios,
  getDetailSolicitudUsuario,
  getPreviewSolicitud,
} from "../../components/APIS/solicitudesUsuarios/APIGetSolicitudes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { queriesSolicitud } from "./queriesSolicitudes";
import {
  IComentarios,
  IDatosAdicionales,
  IDetailSolicitudUsuario,
  ISolicitudes,
} from "../../components/Interfaces/InterfacesUsuario/ISoliciudes";
import { DialogSolicitudesUsuarios } from "./DialogSolicitudesUsuarios";
import { useNavigate } from "react-router-dom";

export function Solicitudes() {
  //Declaraciones
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };
  // Llamada a la base de datos
  const [filtro, setFiltro] = useState<number>(4);
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitudes>>([]);
  const [solicitudesFiltered, setSolicitudesFiltered] = useState<
    Array<ISolicitudes>
  >([]);
  const [cantidadComentarios, setCantidadComentarios] = useState(0);
  const [comentarios, setComentarios] = useState<Array<IComentarios>>([]);

  const [detailSolicitud, setDetailSolicitud] =
    useState<IDetailSolicitudUsuario>({
      ApellidoMaterno: "",
      ApellidoPaterno: "",
      Celular: "",
      CorreoElectronico: "",
      CreadoPor: "",
      Curp: "",
      DatosAdicionales: "",
      Estatus: "",
      Ext: "",
      FechaDeCreacion: "",
      Id: "",
      Mensaje: "",
      Nombre: "",
      NombreApp: "",
      NombreSolicitante: "",
      NombreUsuario: "",
      Puesto: "",
      Respuesta: "",
      Rfc: "",
      Telefono: "",
    });
  const [datosAdicionales, setDatosAdicionales] = useState<IDatosAdicionales>({
    idRol: "",
    rol: "",
    cargo: "",
    idEntePublico: "",
    entePublico: "",
    correoDeRecuperacion: "",
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

  //const elmento Seleccionado
  const [indexSelect, setIndexSelect] = useState(-1);

  const prevSolicitud = () => {
    if (indexSelect !== 0) setIndexSelect(indexSelect - 1);
  };
  const nextSolicitud = () => {
    if (indexSelect < solicitudesFiltered.length - 1)
      setIndexSelect(indexSelect + 1);
  };

  useEffect(() => {
    if (detailSolicitud.DatosAdicionales !== "")
      setDatosAdicionales(JSON.parse(detailSolicitud.DatosAdicionales));
  }, [detailSolicitud]);

  useEffect(() => {
    if (indexSelect >= 0) {
      getDetailSolicitudUsuario(
        solicitudesFiltered[indexSelect].Id,
        setDetailSolicitud
      );
      getComentariosUsuarios(
        solicitudesFiltered[indexSelect].Id,
        setCantidadComentarios,
        setComentarios
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

  const [openDialogComentarios, setOpenDialogComentarios] = useState(false);
  const openDialogUser = () => {
    setOpenDialogComentarios(!openDialogComentarios);
  };

  const navigate = useNavigate();

  return (
    <Grid container direction="column">
      {/* grid  columna del encabezado */}
      <Grid>{query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}</Grid>

      {/* grid  columna del cuerpo */}

      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          direction: "row",
          //marginBottom: "20px"
        }}
      >
        {/* grid  columna del previsualizacion y filtro*/}

        <Grid
          sm={4}
          xl={3.5}
          xs={12}
          md={4}
          lg={4}
          ml={2}
          flexDirection={"column"}
          display={"flex"}
          justifyContent={"space-evenly"}
          
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              direction: "row",
              //marginBottom: "20px"
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("../users");
              }}
            >
              Volver a la lista solicitudes de usuarios
            </Button>
          </Grid>

          <Grid>
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

          <Grid
            xs={11}
            sm={11}
            md={11}
            lg={11}
            xl={12}
            sx={{
              //background: "red",
              overflow: "auto",
              //maxHeight: "calc(96vh - 200px)",
              "&::-webkit-scrollbar": {
                //PARA CAMBIAR EL SCROLL
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <List sx={queriesSolicitud.buscador_solicitudes}>
              {solicitudesFiltered?.map((dato, index) => {
                return (
                  <>
                    <ListItem disablePadding key={index}>
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
                        }}
                      >
                        {/* boxContenedorBuscador*/}
                        <Box sx={queriesSolicitud.boxContenedorBuscador}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={queriesSolicitud.boxContenidoBuscador}>
                              <Typography
                                sx={queriesSolicitud.typograhyCampoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                USUARIO:{" "}
                              </Typography>
                              <Typography
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {dato.NombreUsuario.toUpperCase()}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
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
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {dato.FechaDeCreacion.toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
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
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {dato.tipoSoli.toUpperCase()}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
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
                                sx={queriesSolicitud.typograhyResultadoBuscador}
                                color={
                                  index === indexSelect ? "#af8c55 " : "black"
                                }
                              >
                                {getEstatus(dato.Estatus)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
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
                          </Box>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Grid>
        </Grid>

        {/********grid Formulario*********/}
        {indexSelect < 0 ||
        solicitudesFiltered.length === 0 ||
        detailSolicitud.Id === "" ? (
          <Grid
            xs={6}
            sm={7}
            md={8}
            lg={9}
            xl={9}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{
                width: "40vw",
                height: "90vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoIcon
                sx={{ width: "80%", height: "80%", opacity: "10%" }}
                fontSize="large"
              ></InfoIcon>
              <Typography color={"#AF8C55"} fontWeight={"bold"}>
                SELECCIONAR UNA SOLICITUD EN EL APARTADO DE BUSQUEDA
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid xs={6} sm={7} md={7} lg={7} xl={9}>
            <Box sx={queriesSolicitud.botonComentario}>
              <Badge badgeContent={cantidadComentarios} color="info">
                <Tooltip title="Comentarios">
                  <IconButton
                    onClick={() => {
                      openDialogUser();
                    }}
                  >
                    <SpeakerNotesIcon fontSize="large" color="primary" />
                  </IconButton>
                </Tooltip>
              </Badge>
            </Box>

            <Box sx={queriesSolicitud.boxContenidoFormulario}>
              <Box sx={queriesSolicitud.boxApartadosFormulario}>
                <Grid
                  container
                  sm={11}
                  xl={11}
                  xs={11}
                  md={11}
                  lg={11}
                  justifyContent={"space-between"}
                >
                  {/* grid contenido*/}
                  <Grid item sm={2} xl={3} xs={6} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Solicitado Por"
                      variant="standard"
                      value={detailSolicitud?.NombreSolicitante || ""}
                    />
                  </Grid>

                  <Grid item sm={3} xl={3} xs={7} md={4} lg={4}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Fecha de Creación"
                      variant="standard"
                      value={
                        detailSolicitud?.FechaDeCreacion.split("T")[0] || ""
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={queriesSolicitud.boxApartadosFormulario}>
                <Grid
                  container
                  sm={12}
                  xl={11}
                  xs={12}
                  md={12}
                  lg={12}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={8} sm={3} md={3} lg={3} xl={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Nombre(s)"
                      variant="standard"
                      value={detailSolicitud?.Nombre || ""}
                    />
                  </Grid>

                  <Grid item sm={2} xl={3} xs={8} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Apellido Paterno"
                      variant="standard"
                      value={detailSolicitud?.ApellidoPaterno || ""}
                    />
                  </Grid>

                  <Grid item sm={2} xl={3} xs={8} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Apellido Materno"
                      variant="standard"
                      value={detailSolicitud?.ApellidoMaterno || ""}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={queriesSolicitud.boxApartadosFormulario}>
                <Grid
                  container
                  sm={12}
                  xl={11}
                  xs={12}
                  md={12}
                  lg={12}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={8} sm={3} md={3} lg={3} xl={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Cargo"
                      variant="standard"
                      value={datosAdicionales.cargo || ""}
                    />
                  </Grid>

                  <Grid item sm={2} xl={3} xs={8} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Rol"
                      variant="standard"
                      value={datosAdicionales?.rol || ""}
                    />
                  </Grid>

                  <Grid item sm={2} xl={3} xs={8} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Ente Público"
                      variant="standard"
                      value={datosAdicionales?.entePublico || ""}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={queriesSolicitud.boxApartadosFormulario}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  sm={12}
                  xl={11}
                  xs={12}
                  md={12}
                  lg={12}
                >
                  {/* grid contenido*/}
                  <Grid item xl={2} md={2} sm={1.5}>
                    <TextField
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Usuario"
                      variant="standard"
                      value={detailSolicitud?.NombreUsuario || ""}
                    />
                  </Grid>

                  <Grid item sm={3} xl={3} md={3} lg={3}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Correo Electrónico"
                      variant="standard"
                      value={detailSolicitud?.CorreoElectronico || ""}
                    />
                  </Grid>

                  <Grid item xl={2} md={2} sm={2}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Teléfono Movil"
                      variant="standard"
                      value={detailSolicitud?.Celular || ""}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={queriesSolicitud.boxApartadosFormulario}>
                <Grid
                  container
                  item
                  justifyContent={"space-between"}
                  sm={12}
                  xl={11}
                  xs={12}
                  md={12}
                  lg={12}
                >
                  {/* grid contenido*/}

                  <Grid item sm={2} xl={2} xs={8} md={2} lg={2}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="RFC"
                      variant="standard"
                      value={detailSolicitud?.Rfc || ""}
                    />
                  </Grid>

                  <Grid item sm={2.5} xl={3} xs={8} md={3} lg={2}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="CURP"
                      variant="standard"
                      value={detailSolicitud?.Curp || ""}
                    />
                  </Grid>

                  <Grid item xl={2} sm={1.5} xs={8}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Teléfono"
                      variant="standard"
                      value={detailSolicitud?.Telefono || ""}
                    />
                  </Grid>

                  <Grid item xl={2} md={1} sm={1} xs={8}>
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      id="outlined-basic"
                      label="Extensión"
                      variant="standard"
                      value={detailSolicitud?.Ext || ""}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Grid item display={"flex"} justifyContent={"space-evenly"}>
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
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Se manda como ternario para que los valores de los comentarios no se intenten mostrar
      luego luego al abrir la pagina por el userEffect
      */}
      {openDialogComentarios ? (
        <DialogSolicitudesUsuarios
          open={openDialogComentarios}
          handleClose={openDialogUser}
          comentarios={comentarios}
        />
      ) : null}
    </Grid>
  );
}
