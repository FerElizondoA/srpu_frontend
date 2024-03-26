/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from "@mui/icons-material/Search";
import {
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import { VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { VerBorradorCancelacion } from "../../components/Cancelacion/Dialogs/DialogResumenCancelacion";
import { DialogDescargaArchivos } from "../../components/ConsultaDeSolicitudes/DialogDescargaArchivos";
import { rolesAdmin } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import {
  ConsultaConstancia,
  ConsultaRequerimientos,
  ConsultaSolicitud,
} from "../../store/SolicitudFirma/solicitudFirma";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { IData } from "../consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useCancelacionStore } from "../../store/Cancelacion/main";
import { useInscripcionStore } from "../../store/Inscripcion/main";

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

export function ConsultaDeCancelacionesPage() {
  const [datos, setDatos] = useState<Array<IData>>([]);
  const [busqueda, setBusqueda] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IInscripcion>>([]);

  const setCredito: Function = useCancelacionStore((state) => state.setCredito);

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

  // Corto plazo
  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );
  const setInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.setInformacionGeneral
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
  const setReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.setReglasAplicables
  );

  // Largo plazo
  const changeEncabezadoLP: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );
  const setInformacionGeneralLP: Function = useLargoPlazoStore(
    (state) => state.setInformacionGeneral
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
  const setReglasAplicablesLP: Function = useLargoPlazoStore(
    (state) => state.setReglasAplicables
  );
  const setGastosCostos: Function = useLargoPlazoStore(
    (state) => state.setGastosCostos
  );
  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGastosCostos
  );

  const llenaSolicitud = (solicitud: IData) => {
    setCredito(solicitud);

    if (solicitud.TipoSolicitud === "Crédito Simple a Corto Plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud);

      setReglasAplicables(aux?.inscripcion.declaratorias);
      changeEncabezado(aux?.encabezado);
      setInformacionGeneral(aux?.informacionGeneral);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAval(v);
        }
      );

      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return addCondicionFinanciera(v);
      });

      setTablaDocumentos(aux?.documentacion);
    } else if (solicitud.TipoSolicitud === "Crédito Simple a Largo Plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud!);

      setReglasAplicablesLP(aux?.inscripcion.declaratorias);
      changeEncabezadoLP(aux?.encabezado);
      setInformacionGeneralLP(aux?.informacionGeneral);
      setGastosCostos(aux?.GastosCostos);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAvalLP(v);
        }
      );

      aux?.GastosCostos.gastosCostos.map((v: any, index: number) => {
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

  const [openDialogVer, changeOpenDialogVer] = useState(false);

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const [openDescargar, setOpenDescargar] = useState(false);

  // const solicitud: IInscripcion = useInscripcionStore(
  //   (state) => state.inscripcion
  // );
  // const setinscripcion: Function = useInscripcionStore(
  //   (state) => state.setInscripcion
  // );
  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  useEffect(() => {
    getSolicitudes(
      !rolesAdmin.includes(localStorage.getItem("Rol")!)
        ? "SolicitaCancelacion"
        : "Cancelacion",
      (e: IData[]) => {
        setDatos(e);
        setDatosFiltrados(e);
      }
    );
    cleanSolicitud();
  }, []);

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

    setProceso("Actualizacion");
    navigate("../firmaUrl");
  };

  const getDays = (date: any, days: any) => {
    date.setDate(date.getDate() + days);
    return date;
  };

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
          Cancelaciones
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

                    if (row.NoEstatus === "10") {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="success"
                          variant="outlined"
                        />
                      );
                    } else if (["12", "13", "14"].includes(row.NoEstatus)) {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="secondary"
                          variant="outlined"
                        />
                      );
                    } else if (["15", "16"].includes(row.NoEstatus)) {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="warning"
                          variant="outlined"
                        />
                      );
                    } else if (["16"].includes(row.NoEstatus)) {
                      chip = (
                        <Tooltip
                          title={`${differenceInDays(
                            getDays(new Date(row.FechaRequerimientos), 11),
                            new Date()
                          )} días restantes para denegar la solicitud automáticamente`}
                        >
                          <Chip
                            label={
                              ["16"].includes(row.NoEstatus)
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
                    } else if (["18"].includes(row.NoEstatus)) {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          color="error"
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
                          {chip}
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
                                llenaSolicitud(row);
                                changeOpenDialogVer(!openDialogVer);
                                getCatalogoFirmaDetalle(row.Id);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          {localStorage.getItem("Rol") === row.Control &&
                            ["11", "15", "17"].includes(row.NoEstatus) && (
                              <Tooltip title="Firmar documento">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    llenaSolicitud(row);
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
                                      } else {
                                        ConsultaSolicitud(setUrl);
                                        navigate("../firmaUrl");
                                      }
                                    });
                                  }}
                                >
                                  <HistoryEduIcon />
                                </IconButton>
                              </Tooltip>
                            )}

                          {
                            <Tooltip title="Ver archivos">
                              <IconButton
                                type="button"
                                onClick={() => {
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
      {openDialogVer && (
        <VerBorradorCancelacion
          handler={changeOpenDialogVer}
          openState={openDialogVer}
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
    </Grid>
  );
}
