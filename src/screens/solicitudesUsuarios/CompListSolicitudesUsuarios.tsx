import { Divider, Grid, List, ListItem, ListItemButton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IDetailSolicitudUsuario, ISolicitudes } from "../../components/Interfaces/InterfacesUsuario/ISoliciudes";
import { getDetailSolicitudUsuario, getPreviewSolicitud } from "../../components/APIS/solicitudesUsuarios/APIGetSolicitudes";
import { useNavigate } from "react-router-dom";
import { queriesSolicitud } from "./queriesSolicitudes";
import { useSolicitudUsuarioStore } from "../../store/SolicitudUsuario/main";



export function CompListSolicitudesUsuarios() {
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

  // const [indexSelect, setIndexSelect] = useState(-1);

  const indexSelect: number = useSolicitudUsuarioStore(
    (state) => state.indexSelect
  );
  const setIndexSelect: Function = useSolicitudUsuarioStore(
    (state) => state.setIndexSelect

  );
  // const openDialog: boolean = useSolicitudUsuarioStore(
  //   (state) => state.opendialog
  // );
  // const setOpenDialog: Function = useSolicitudUsuarioStore(
  //   (state) => state.setOpenDialog
  // )

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


  const [openDialog, setOpenDialog] = useState(false)


  return (
    <Grid >
      <List sx={{
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
      }}>
        {solicitudesFiltered?.map((dato, index) => {
          return (
            <Grid mb={2} container key={index}>
              <ListItem disablePadding >
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
                    setOpenDialog(false)
                  }}
                >

                  <Grid container sx={{
                    width: "100%",
                    height: "18vh",
                    justifyContent: "space-evenly",
                    display: "flex",
                  }}
                  >
                    <Grid item width={"100%"}>
                      <Grid sx={{
                        display: "flex",
                        alignItems: "center",
                      }}>
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
                          sx={queriesSolicitud.typograhyResultadoBuscador}
                          color={
                            index === indexSelect ? "#af8c55 " : "black"
                          }
                        >
                          {dato.FechaDeCreacion.toUpperCase()}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container width={"100%"}>

                      <Grid item width={"100%"} display={"flex"}
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
                          sx={queriesSolicitud.typograhyResultadoBuscador}
                          color={
                            index === indexSelect ? "#af8c55 " : "black"
                          }
                        >
                          {dato.tipoSoli.toUpperCase()}
                        </Typography>
                      </Grid>

                      <Grid item width={"100%"} display={"flex"}
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
                          sx={queriesSolicitud.typograhyResultadoBuscador}
                          color={
                            index === indexSelect ? "#af8c55 " : "black"
                          }
                        >
                          {getEstatus(dato.Estatus)}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item width={"100%"} display={"flex"}
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
  )
}