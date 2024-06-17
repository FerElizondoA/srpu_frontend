/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Chip,
  Grid,
  InputBase,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";

import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import { VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { DialogEliminar } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogEliminar";
import { VerBorradorDocumento } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogResumenDocumento";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { DialogDescargaArchivos } from "../../components/ConsultaDeSolicitudes/DialogDescargaArchivos";
import { rolesAdmin } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import {
  ConsultaConstancia,
  ConsultaRequerimientos,
  ConsultaSolicitud,
} from "../../store/SolicitudFirma/solicitudFirma";
import { DialogTrazabilidad } from "./DialogTrazabilidad";
import { queries } from "../../queries";
import { createNotification } from "../../components/LateralMenu/APINotificaciones";
import { BarraFiltros } from "../../generics/BarraFiltros";
import { DialogVerRestrucuturas } from "../Reestructura/DialogVerRestructuras";
import BuildIcon from '@mui/icons-material/Build';

export interface IData {
  Id: string;
  NumeroRegistro: string;
  Nombre: string;
  TipoEntePublico: string;
  TipoSolicitud: string;
  Institucion: string;
  NoEstatus: string;
  Estatus: string;
  ControlInterno: string;
  IdClaveInscripcion: string;
  MontoOriginalContratado: string;
  FechaContratacion: string;
  Solicitud: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  IdEditor: string;
  FechaRequerimientos: string;
  IdPathDoc?: string;
  Control: string;
}

const heads: Array<{ label: string }> = [
  {
    label: "Número de Solicitud",
  },
  {
    label: "Institución financiera",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Estatus",
  },
  {
    label: "Clave de inscripción",
  },
  {
    label: "Monto original contratado",
  },
  {
    label: "Fecha de contratación",
  },
  {
    label: "Fecha Requerimientos",
  },
  {
    label: "Tipo de Documento",
  },
  {
    label: "Acciones",
  },
];

export function ConsultaDeSolicitudPage() {
  const [datos, setDatos] = useState<Array<IInscripcion>>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IInscripcion>>([]);
  const [busqueda, setBusqueda] = useState("");

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    let ResultadoBusqueda = datos.filter((elemento) => {
      if (
        elemento.IdClaveInscripcion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Estatus?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaContratacion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Institucion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MontoOriginalContratado?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoEntePublico?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoSolicitud?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        return elemento;
      }
    });

    setDatosFiltrados(ResultadoBusqueda);
  };

  const navigate = useNavigate();

  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);

  const editarSolicitud = (Tipo: string) => {
    if (Tipo === "Crédito Simple a Corto Plazo") {
      navigate("../ObligacionesCortoPlazo");
    } else {
      navigate("../ObligacionesLargoPlazo");
    }
  };

  const [openDialogVer, changeOpenDialogVer] = useState(false);

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const [openEliminar, changeOpenEliminar] = useState(false);

  const [openDescargar, setOpenDescargar] = useState(false);

  const [openDialogRestructura, changeOpenDialogRestructura] = useState(false);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );
  const setInscripcion: Function = useInscripcionStore(
    (state) => state.setInscripcion
  );
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );
  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );

  const getDatos = () => {
    getSolicitudes(
      !rolesAdmin.includes(localStorage.getItem("Rol")!)
        ? "Inscripcion"
        : "Revision",
      (e: IInscripcion[]) => {
        setDatos(e);
      },
      setDatosFiltrados
    );
  };
  useEffect(() => {
    getDatos();
    cleanSolicitudCortoPlazo();
    cleanSolicitudLargoPlazo();
  }, [openEliminar]);

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const requerimientos = (
    Solicitud: string,
    noRegistro: string,
    Requerimiento: any
  ) => {
    let a: any = {};

    Object.keys(JSON.parse(Requerimiento?.Comentarios)).map((v) => {
      return a[v]
        ? (a[v] = a[v] + ` ; ` + JSON.parse(Requerimiento?.Comentarios)[v])
        : (a = { ...a, [v]: JSON.parse(Requerimiento?.Comentarios)[v] });
    });

    ConsultaRequerimientos(Solicitud, a, noRegistro, setUrl);

    setProceso("actualizacion");
    navigate("../firmaUrl");
  };

  const getDays = (date: any, days: any) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const getCatalogoFirmaDetalle: Function = useSolicitudFirmaStore(
    (state) => state.getCatalogoFirmaDetalle
  );

  const [accion, setAccion] = useState("");
  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item width={"100%"}>
        <LateralMenu fnc={getDatos} />
      </Grid>

      {/* <Button
        onClick={() => {
          createNotification(
            "Crédito simple a corto plazo",
            `Se te ha asignado una solicitud de PRUEBA CON ESTATUS PRUEBA`,
            
            // ${
            //   localStorage.getItem("Rol") === "Autorizador"
            //     ? accion === "enviar"
            //       ? "firmar"
            //       : "validación"
            //     : localStorage.getItem("Rol") === "Validador"
            //     ? accion === "enviar"
            //       ? "autorización"
            //       : "revisión"
            //     : "validación"
            // }`,
            [
              localStorage.getItem("IdUsuario") === "d9e88484-759c-11ed-aad1-040300000000"
                ? "9f6071e8-156b-11ee-ba60-3cd92b4d9bf4"
                : "d9e88484-759c-11ed-aad1-040300000000",
            ],
            "7f70db71-1308-11ef-b2e9-c4346b72f0ba"
            ,"3"
              
          );
        }}
      >
        prueba
      </Button> */}
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              fontSize: "1.5ch",
            },
          }}
        >
          Consulta de Solicitudes
        </Typography>
      </Grid>

      {/* <Grid item mb={3} lg={12} display="center" justifyContent="center">
        <Paper
          component="form"
          sx={{
            display: "flex",
            width: "50%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              if (e.target.value === "") {
                setDatosFiltrados(datos);
              }
            }}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                filtrarDatos();
                ev.preventDefault();
                return false;
              }
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => filtrarDatos()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid> */}

      <BarraFiltros
        Lista={datos}
        setStateFiltered={setDatosFiltrados}
        CamposFecha={["FechaContratacion", "FechaRequerimientos"]}
      />

      <Grid container display={"flex"} justifyContent={"center"}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              //height: 520,

              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
              height: "35rem",
              "@media (min-width: 480px)": {
                height: "30.5rem",
              },
              "@media (min-width: 768px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1140px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1400px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1870px)": {
                height: "44.5rem",
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <TableSortLabel>{head.label} </TableSortLabel>
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {datosFiltrados.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell>Sin registros</StyledTableCell>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                  </StyledTableRow>
                ) : (
                  datosFiltrados.map((row, index) => {
                    let chip = <></>;

                    if (row.ControlInterno === "inscripcion") {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="info"
                          variant="outlined"
                        />
                      );
                    } else if (row.ControlInterno === "revision") {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="secondary"
                          variant="outlined"
                        />
                      );
                    } else if (row.ControlInterno === "autorizado") {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="success"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus.includes("Requerimientos")) {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="warning"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus === "actualizacion") {
                    }
                    // else if (row.Estatus.includes("Inscrito")) {
                    //   chip = (
                    //     <Chip
                    //       label={row.Estatus}
                    //       color="warning"
                    //       variant="outlined"
                    //     />
                    //   );
                    // }
                    else if (row.ControlInterno === "Inscrito") {
                      chip = (
                        <Tooltip title={"Registro de trazabilidad"}>
                          <Button>
                            <Chip
                              label={row.Estatus}
                              color="secondary"
                              variant="outlined"
                            />
                          </Button>
                        </Tooltip>
                      );
                    } else if (row.Estatus === "Actualizacion") {
                      chip = (
                        <Tooltip
                          title={`${differenceInDays(
                            getDays(new Date(row.FechaRequerimientos), 11),
                            new Date()
                          )} días restantes para cancelación automática`}
                        >
                          <Chip
                            label={
                              row.Estatus === "Actualizacion"
                                ? "Actualización"
                                : row.Estatus
                            }
                            color={
                              differenceInDays(
                                getDays(new Date(row.FechaRequerimientos), 11),
                                new Date()
                              ) > 5
                                ? "warning"
                                : "error"
                            }
                            variant="filled"
                          />
                        </Tooltip>
                      );
                    } else {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="warning"
                          variant="outlined"
                        />
                      );
                    }

                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          sx={{ padding: "1px 15px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.NumeroRegistro}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ padding: "1px 15px 1px 0", width: "300px" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.Institucion}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 30px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.TipoEntePublico}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 20px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <Button
                            onClick={() => {
                              setInscripcion(row);
                              setOpenTrazabilidad(!openTrazabilidad);
                            }}
                          >
                            <Typography sx={queries.medium_text}>
                              {chip}
                            </Typography>
                          </Button>
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.IdClaveInscripcion}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 30px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.MontoOriginalContratado}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {format(
                            new Date(row.FechaContratacion),
                            "dd/MM/yyyy"
                          )}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.Estatus.includes("Actualización")
                            ? format(
                                new Date(row.FechaRequerimientos),
                                "dd/MM/yyyy"
                              )
                            : " "}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.TipoSolicitud}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            flexDirection: "row",
                            display: "grid",
                            height: "7rem",
                            gridTemplateColumns: "repeat(3,1fr)",
                          }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <Tooltip title="Ver solicitud">
                            <IconButton
                              type="button"
                              onClick={() => {
                                setInscripcion(row);
                                changeOpenDialogVer(!openDialogVer);
                                getCatalogoFirmaDetalle(row.Id);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          {localStorage.getItem("Rol") === row.Control &&
                            ["3", "7", "9"].includes(row.NoEstatus) && (
                              <Tooltip title="Firmar documento">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    setInscripcion(row);

                                    if (row.NoEstatus === "3") {
                                      setInscripcion(row);
                                      ConsultaSolicitud(setUrl);
                                      setProceso("Por Firmar");
                                      navigate("../firmaUrl");
                                    } else {
                                      getComentariosSolicitudPlazo(
                                        row.Id,
                                        () => {}
                                      ).then((data) => {
                                        if (
                                          data.filter(
                                            (a: any) =>
                                              a.Tipo === "Requerimiento"
                                          ).length > 0
                                        ) {
                                          requerimientos(
                                            row.Solicitud,
                                            row.NumeroRegistro,
                                            data.filter(
                                              (a: any) =>
                                                a.Tipo === "Requerimiento"
                                            )[0]
                                          );
                                        } else {
                                          ConsultaConstancia(
                                            row.Solicitud,
                                            row.NumeroRegistro,
                                            setUrl
                                          );
                                          navigate("../firmaUrl");
                                        }
                                      });
                                    }
                                  }}
                                >
                                  <HistoryEduIcon />
                                </IconButton>
                              </Tooltip>
                            )}

                          {localStorage.getItem("Rol") === row.Control &&
                            ["1", "2", "8"].includes(row.NoEstatus) && (
                              <Tooltip title="Editar">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    setInscripcion(row);
                                    editarSolicitud(row.TipoSolicitud);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            )}

                          {
                            <Tooltip title="Ver archivos">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  setInscripcion(row);
                                  setOpenDescargar(true);
                                }}
                              >
                                <BrowserUpdatedIcon />
                              </IconButton>
                            </Tooltip>
                          }

                          {localStorage.getItem("Rol") !== "Administrador" && (
                            <Tooltip title="Comentarios">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  changeOpenVerComentarios(!openVerComentarios);
                                }}
                              >
                                <CommentIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {localStorage.getItem("IdUsuario") ===
                            row.CreadoPor &&
                            (row.NoEstatus === "1" ||
                              row.NoEstatus === "2") && (
                              <Tooltip title="Eliminar">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    setInscripcion(row);
                                    changeOpenEliminar(!openEliminar);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}

{
                            <Tooltip title="Ver Restructuras">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  setInscripcion(row);
                                  changeOpenDialogRestructura(!openDialogRestructura);
                                }}
                              >
                                <BuildIcon></BuildIcon>
                              </IconButton>
                            </Tooltip>
                          }
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <DialogTrazabilidad
        handler={setOpenTrazabilidad}
        openState={openTrazabilidad}
        row={inscripcion}
      />
      {openDialogVer && (
        <VerBorradorDocumento
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          rowSolicitud={inscripcion}
          rowId={""}
        />
      )}
      {openDescargar && (
        <DialogDescargaArchivos
          open={openDescargar}
          setOpen={setOpenDescargar}
        />
      )}

      {openVerComentarios && (
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
          
        />
      )}

      {openDialogRestructura && (
        <DialogVerRestrucuturas
        showRestructura={changeOpenDialogRestructura}
        openRestructura={openDialogRestructura}
        IdSolicitud={inscripcion.Id}
        solicitud={inscripcion.Solicitud}
        />
      )}

      <DialogEliminar
        handler={changeOpenEliminar}
        openState={openEliminar}
        texto={"Solicitud"}
      />
    </Grid>
  );
}
