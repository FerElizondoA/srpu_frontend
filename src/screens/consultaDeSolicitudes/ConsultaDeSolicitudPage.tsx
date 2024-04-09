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
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { DialogDescargaArchivos } from "../../components/ConsultaDeSolicitudes/DialogDescargaArchivos";
import { rolesAdmin } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import {
  ConsultaConstancia,
  ConsultaRequerimientos,
  ConsultaSolicitud,
} from "../../store/SolicitudFirma/solicitudFirma";
import { DialogTrazabilidad } from "./DialogTrazabilidad";
import { queries } from "../../queries";

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
  const [datos, setDatos] = useState<Array<IData>>([]);
  const [busqueda, setBusqueda] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);

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

  const changeIdSolicitud: Function = useCortoPlazoStore(
    (state) => state.changeIdSolicitud
  );
  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);

  const changeNoRegistro: Function = useCortoPlazoStore(
    (state) => state.changeNoRegistro
  );
  const changeEditCreadoPor: Function = useCortoPlazoStore(
    (state) => state.changeEditCreadoPor
  );
  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const setTablaDocumentos: Function = useCortoPlazoStore(
    (state) => state.setTablaDocumentos
  );
  const changeReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.changeReglasAplicables
  );

  // Largo plazo
  const changeEncabezadoLP: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneralLP: Function = useLargoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const addObligadoSolidarioAvalLP: Function = useLargoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const addCondicionFinancieraLP: Function = useLargoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const addDocumentoLP: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const changeReglasAplicablesLP: Function = useLargoPlazoStore(
    (state) => state.changeReglasAplicables
  );

  const changeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGastosCostos
  );

  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGeneralGastosCostos
  );

  const solicitudFirma: IData = useCortoPlazoStore(
    (state) => state.rowSolicitud
  );
  const setSolicitudFirma: Function = useCortoPlazoStore(
    (state) => state.setRowSolicitud
  );

  const llenaSolicitud = (solicitud: IData, TipoDocumento: string) => {
    if (TipoDocumento === "Crédito Simple a Corto Plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud);

      changeReglasAplicables(aux?.inscripcion.declaratorias);
      changeEncabezado(aux?.encabezado);
      changeInformacionGeneral(aux?.informacionGeneral);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAval(v);
        }
      );
      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return addCondicionFinanciera(v);
      });
      // aux?.documentacion.map((v: any, index: number) => {
      //   return addDocumento(v);
      // });
      setTablaDocumentos(aux?.documentacion);
    } else if (TipoDocumento === "Crédito Simple a Largo Plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud!);

      changeReglasAplicablesLP(aux?.inscripcion.declaratorias);
      changeEncabezadoLP(aux?.encabezado);
      changeInformacionGeneralLP(aux?.informacionGeneral);
      changeGastosCostos(aux?.GastosCostos);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAvalLP(v);
        }
      );

      aux?.GastosCostos.generalGastosCostos.map((v: any, index: number) => {
        return addGeneralGastosCostos(v);
      });

      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return addCondicionFinancieraLP(v);
      });

      aux?.documentacion.map((v: any, index: number) => {
        return addDocumentoLP(v);
      });
    }
  };

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

  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);

  const [controlInterno, setControlInterno] = useState("");

  const [solicitud, setSolicitud] = useState({ Id: "", noSolicitud: "" });


  const cleanSolicitud: Function = useCortoPlazoStore(
    (state) => state.cleanSolicitud
  );

  useEffect(() => {
    getSolicitudes(
      !rolesAdmin.includes(localStorage.getItem("Rol")!)
        ? "Inscripcion"
        : "Revision",
      (e: IData[]) => {
        setDatos(e);
        setDatosFiltrados(e);
      }
    );
    cleanSolicitud();
  }, [openEliminar]);

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const requerimientos = (
    Solicitud: string,
    noRegistro: string,
    Requerimiento: any,
    IdSolicitud: string
  ) => {
    let a: any = {};

    Object.keys(JSON.parse(Requerimiento?.Comentarios)).map((v) => {
      return a[v]
        ? (a[v] = a[v] + ` ; ` + JSON.parse(Requerimiento?.Comentarios)[v])
        : (a = { ...a, [v]: JSON.parse(Requerimiento?.Comentarios)[v] });
    });

    ConsultaRequerimientos(Solicitud, a, noRegistro, setUrl);

    setProceso("actualizacion");
    changeIdSolicitud(IdSolicitud);
    navigate("../firmaUrl");
  };

  const getDays = (date: any, days: any) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const setDatosActualizar: Function = useCortoPlazoStore(
    (state) => state.setDatosActualizar
  );

  const getCatalogoFirmaDetalle: Function = useSolicitudFirmaStore(
    (state) => state.getCatalogoFirmaDetalle
  );

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>
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
      <Grid item mb={3} lg={12} display="center" justifyContent="center">
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
      </Grid>

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
                height: "32.5rem",
              },
              "@media (min-width: 768px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1140px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1400px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1870px)": {
                height: "46.5rem",
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
                    } else{
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
                              setOpenTrazabilidad(!openTrazabilidad);
                              setSolicitud({
                                Id: row.Id,
                                noSolicitud: row.NumeroRegistro,
                              });
                              setControlInterno(row.ControlInterno)
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
                                llenaSolicitud(row, row.TipoSolicitud);
                                changeIdSolicitud(row.Id);
                                changeNoRegistro(row.NumeroRegistro);
                                setSolicitudFirma(row);
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
                                    llenaSolicitud(row, row.TipoSolicitud);
                                    changeIdSolicitud(row.Id);
                                    changeNoRegistro(row.NumeroRegistro);
                                    setSolicitudFirma(row);
                                    getComentariosSolicitudPlazo(
                                      row.Id,
                                      () => {}
                                    ).then((data) => {
                                      if (
                                        rolesAdmin.includes(
                                          localStorage.getItem("Rol")!
                                        )
                                      ) {
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
                                            )[0],
                                            row.Id
                                          );
                                        } else {
                                          ConsultaConstancia(
                                            row.Solicitud,
                                            row.NumeroRegistro,
                                            setUrl
                                          );
                                          changeIdSolicitud(row.Id);
                                          navigate("../firmaUrl");
                                        }
                                      } else {
                                        setSolicitudFirma(row);
                                        ConsultaSolicitud(
                                          row.Solicitud,
                                          row.NumeroRegistro,
                                          setUrl
                                        );
                                        setProceso("Por Firmar");
                                        changeIdSolicitud(row.Id);
                                        navigate("../firmaUrl");
                                      }
                                    });
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
                                    llenaSolicitud(row, row.TipoSolicitud);
                                    if (row.NoEstatus === "8") {
                                      getComentariosSolicitudPlazo(
                                        row.Id,
                                        setDatosActualizar
                                      );
                                    }
                                    changeIdSolicitud(row?.Id);
                                    changeNoRegistro(row.NumeroRegistro);
                                    changeEditCreadoPor(row?.CreadoPor);
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
                                  setSolicitud({
                                    Id: row.Id,
                                    noSolicitud: row.NumeroRegistro,
                                  });

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
                                  changeIdSolicitud(row?.Id);
                                  changeEditCreadoPor(row?.CreadoPor);
                                  changeOpenVerComentarios(!openVerComentarios);
                                }}
                              >
                                <CommentIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {localStorage.getItem("IdUsuario") ===
                            row.CreadoPor &&
                            (row.Estatus === "Captura" ||
                              row.Estatus === "Verificacion") && (
                              <Tooltip title="Eliminar">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    changeIdSolicitud(row?.Id || "");
                                    changeEditCreadoPor(row?.CreadoPor);
                                    changeOpenEliminar(!openEliminar);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
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
        idSolicitud={solicitud.Id}
      />
      {openDialogVer && (
        <VerBorradorDocumento
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          rowSolicitud={solicitudFirma}
          rowId={""}
        />
      )}
      {openDescargar && (
        <DialogDescargaArchivos
          open={openDescargar}
          setOpen={setOpenDescargar}
          noSolicitud={solicitud.noSolicitud}
          idSolicitud={solicitud.Id}
        />
      )}

      {openVerComentarios && (
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
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
