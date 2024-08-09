/* eslint-disable react-hooks/exhaustive-deps */
import FindInPageIcon from "@mui/icons-material/FindInPage";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import {
  ConsultaRequerimientos,
  GeneraFormatoReestructura,
  ConsultaConstancia,
  ConsultaSolicitud,
  ConsultaSolicitudReestructura,
  ConsultaRequerimientosReestructura,
} from "../../store/SolicitudFirma/solicitudFirma";
import { IData } from "../consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { DialogTrazabilidad } from "../consultaDeSolicitudes/DialogTrazabilidad";
import { DialogVerDetalle } from "./DialogVerDetalle";
import { useReestructuraStore } from "../../store/Reestructura/main";
import { IDatosSolicitudReestructura } from "../../store/Reestructura/reestructura";
import { VerComentariosSolicitudReestructura } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogComentariosSolicitudReestructura";


interface Head {
  label: string;
}
const heads: readonly Head[] = [
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



export function SolicitudesReestructura() {
  const getDatos = () => {
    getSolicitudes("Reestructura",
      (e: IData[]) => {
        setDatos(e);
      },
      setDatosFiltrados)
  }
  const navigate = useNavigate();
  const [datos, setDatos] = useState<Array<IData>>([]);

  const setDatosActualizar: Function = useCortoPlazoStore(
    (state) => state.setDatosActualizar
  );

  const changeRestructura: Function = useReestructuraStore(
    (state) => state.changeRestructura
  );

  const setReglasAplicablesLP: Function = useLargoPlazoStore(
    (state) => state.setReglasAplicables
  );

  const setGastosCostos: Function = useLargoPlazoStore(
    (state) => state.setGastosCostos
  );

  const setInformacionGeneralLP: Function = useLargoPlazoStore(
    (state) => state.setInformacionGeneral
  );
  const [rowId] = useState("");

  const solicitud: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const setInscripcion: Function = useInscripcionStore(
    (state) => state.setInscripcion
  );

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const changeEncabezadoLP: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );

  const addObligadoSolidarioAvalLP: Function = useLargoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );

  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGastosCostos
  );

  const addCondicionFinancieraLP: Function = useLargoPlazoStore(
    (state) => state.addCondicionFinanciera
  );

  const addDocumentoLP: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const getCatalogoFirmaDetalle: Function = useSolicitudFirmaStore(
    (state) => state.getCatalogoFirmaDetalle
  );

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const llenaSolicitud = (solicitud: IDatosSolicitudReestructura) => {
    let aux: any = JSON.parse(solicitud.SolicitudReestructura!);

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
  };

  const getDays = (date: any, days: any) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const [openDialogVer, changeOpenDialogVer] = useState(false);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IInscripcion>>([]);

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );
  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );




  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const requerimientos = (
    Solicitud: string,
    noRegistro: string,
    Requerimiento: any,
    idClaveInscripcion: string
  ) => {
    let a: any = {};

    Object.keys(JSON.parse(Requerimiento?.Comentarios)).map((v) => {
      return a[v]
        ? (a[v] = a[v] + ` ; ` + JSON.parse(Requerimiento?.Comentarios)[v])
        : (a = { ...a, [v]: JSON.parse(Requerimiento?.Comentarios)[v] });
    });
    console.log("Requeriemito solicitud", solicitud)

    ConsultaRequerimientosReestructura(Solicitud, a, noRegistro, setUrl, idClaveInscripcion);

    setProceso("actualizacion");
    navigate("../firmaUrl");
  };



  const SolicitudReestructuraFirma: IDatosSolicitudReestructura = useReestructuraStore(
    (state) => state.SolicitudReestructuraFirma
  );


  const inscripcionReestructura: IDatosSolicitudReestructura = useInscripcionStore(
    (state) => state.inscripcionReestructura
  );

  const setInscripcionRestructura: Function = useInscripcionStore(
    (state) => state.setInscripcionRestructura
  );

  const getSolicitudReestructuraFirma: Function = useReestructuraStore(
    (state) => state.getSolicitudReestructuraFirma
  );
  const [constanciaReestructura, setConstanciaReestructura] = useState(false);


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

  const firmaSolicitudReestructura = (row: IInscripcion) => {

    getSolicitudReestructuraFirma(row.Id, setConstanciaReestructura)

    //APLICAR BIEN EL FILTRO! *************************************
    if (row.NoEstatus === "19") {
      // if (constanciaReestructura === true) {
      setProceso("solicitud")
      setInscripcionRestructura(SolicitudReestructuraFirma)
      ConsultaSolicitudReestructura(setUrl);
      console.log("constanciaReestructura CONSULTA INSCRIPCION", constanciaReestructura)
      navigate("../firmaUrl");
      // }
    } else {
      getComentariosSolicitudPlazo(
        row.Id,
        () => { }
      ).then((data) => {
        if (
          data.filter(
            (a: any) =>
              a.Tipo === "RequerimientoReestructura"
          ).length > 0
        ) {
          console.log("SI HUBO REQUERIMIENTOS");

          requerimientos(
            row.Solicitud,
            row.NumeroRegistro,
            data.filter(
              (a: any) =>
                a.Tipo === "RequerimientoReestructura"
            )[0],
            row.IdClaveInscripcion
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
  }

  useEffect(() => {
    getDatos()
    cleanSolicitudCortoPlazo();
    cleanSolicitudLargoPlazo();
  }, []);

  return (
    <Grid>
      <Grid>
        <LateralMenu fnc={getDatos} />
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
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.2rem",
            },
          }}
        >
          Reestructura
        </Typography>
      </Grid>
      <Grid container display="flex" width={"100%"} mb={2}>
        <Grid
          item
          height={"3.2rem"}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "90%",
              "@media (min-width: 480px)": {
                width: "90%",
              },

              "@media (min-width: 768px)": {
                width: "90%",
              },

              "@media (min-width: 1140px)": {
                width: "70%",
              },
            }}
          >
            <InputBase
              id="Enter"
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
                //cuando se presiona Enter
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
              title="Buscar"
              onClick={() => {
                filtrarDatos();
              }}
            >
              <GridSearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", height: "100%" }}>
        <TableContainer
          sx={{
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
              <TableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="left" key={index}>
                    <Typography
                      sx={{
                        fontSize: ".8rem",
                        display: "flex",
                        justifyContent: "center",
                        width:
                          head.label === "Clave de inscripción" ||
                            head.label === "Institución financiera" ||
                            head.label === "Monto original contratado" ||
                            head.label === "Tipo de Documento" ||
                            head.label === "Tipo de Ente Público Obligado"
                            ? "180px"
                            : "100%",

                        "@media (min-width: 480px)": {
                          width:
                            head.label === "Clave de inscripción" ||
                              head.label === "Institución financiera" ||
                              head.label === "Monto original contratado" ||
                              head.label === "Tipo de Documento" ||
                              head.label === "Tipo de Ente Público Obligado"
                              ? "180px"
                              : "100%",
                        },

                        "@media (min-width: 768px)": {
                          width:
                            head.label === "Clave de inscripción" ||
                              head.label === "Institución financiera" ||
                              head.label === "Monto original contratado" ||
                              head.label === "Tipo de Documento" ||
                              head.label === "Tipo de Ente Público Obligado"
                              ? "200x"
                              : "100%",
                        },

                        "@media (min-width: 1140px)": {
                          width:
                            head.label === "Clave de inscripción" ||
                              head.label === "Institución financiera" ||
                              head.label === "Monto original contratado" ||
                              head.label === "Tipo de Documento" ||
                              head.label === "Tipo de Ente Público Obligado"
                              ? "180px"
                              : "100%",
                        },

                        "@media (min-width: 1400px)": {
                          width:
                            head.label === "Clave de inscripción"
                              ? "150px"
                              : "100%",
                        },

                        "@media (min-width: 1870px)": {
                          width:
                            head.label === "Clave de inscripción"
                              ? "150px"
                              : "100%",
                        },
                      }}
                    >
                      {head.label}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
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
              ) : datosFiltrados.map((row, index) => {
                let chip = <></>;
                if (row.Estatus === "Autorizado") {
                  chip = (
                    <Chip
                      label={row.Estatus}
                      color="success"
                      variant="outlined"
                    />
                  );
                } else if (row.ControlInterno === "inscripcion") {
                  chip = (
                    <Chip label={row.Estatus} color="info" variant="outlined" />
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
                // else if (row.ControlInterno === "Inscrito") {
                //   chip = (
                //         <Chip
                //           label={row.Estatus}
                //           color="secondary"
                //           variant="outlined"
                //         />
                //   );
                // }
                else if (row.Estatus === "Actualizacion") {
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
                    <Chip label={row.Estatus} color="info" variant="outlined" />
                  );
                }

                return (
                  <StyledTableRow>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.NumeroRegistro}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Institucion}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {row.TipoEntePublico}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      <Button
                        onClick={() => {
                          setInscripcion(row)
                          setOpenTrazabilidad(!openTrazabilidad);

                        }}
                      >
                        <Typography sx={queries.medium_text}>{chip}</Typography>
                      </Button>
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {row.IdClaveInscripcion}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {row.MontoOriginalContratado}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {format(new Date(row.FechaContratacion), "dd/MM/yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {format(new Date(row.FechaRequerimientos), "dd/MM/yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th" scope="row">
                      {row.TipoSolicitud}
                    </StyledTableCell>

                    <StyledTableCell size="medium" sx={{ width: "120px" }}>
                      <Tooltip title="Ver Detalle">
                        <IconButton
                          type="button"
                          onClick={() => {
                            setInscripcion(row)
                            changeOpenDialogVer(!openDialogVer);
                            changeRestructura("con autorizacion");
                            getCatalogoFirmaDetalle(row.Id);
                          }}
                        >
                          <FindInPageIcon />
                        </IconButton>
                      </Tooltip>

                      {localStorage.getItem("Rol") === row.Control &&
                        ["19", "23", "25"].includes(row.NoEstatus) && (
                          <Tooltip title="Firmar documento">
                            <IconButton
                              type="button"
                              onClick={() => {
                                firmaSolicitudReestructura(row)

                                // getSolicitudReestructuraFirma(row.Id, setConstanciaReestructura)
                                // setInscripcionRestructura(SolicitudReestructuraFirma)

                                // getComentariosSolicitudPlazo(
                                //   row.Id,
                                //   () => { }
                                // ).then((data) => {
                                //   if (
                                //     data.filter(
                                //       (a: any) =>
                                //         a.Tipo === "RequerimientoReestructura"
                                //     ).length > 0
                                //   ) {
                                //     console.log("Si hay requerimeintos reestructura")
                                //     requerimientos(
                                //       SolicitudReestructuraFirma.SolicitudReestructura,
                                //       SolicitudReestructuraFirma.NumeroRegistro,
                                //       data.filter(
                                //         (a: any) =>
                                //           a.Tipo === "RequerimientoReestructura"
                                //       )[0],
                                //       SolicitudReestructuraFirma.IdClaveInscripcion
                                //     );
                                //     navigate("../firmaUrl");
                                //   } else {
                                //     console.log("No se hay o no se detectaron requerimientos reestructura");

                                //     // ConsultaConstancia(
                                //     //   row.Solicitud,
                                //     //   row.NumeroRegistro,
                                //     //   setUrl
                                //     // );
                                //     // navigate("../firmaUrl")

                                //   }
                                // });

                                // navigate("../firmaUrl");

                                //firmaSolicitudReestructura(row)
                                // // if (row.Id !== "") {
                                // //   getSolicitudReestructuraFirma(row.Id, setConstanciaReestructura)
                                // //   // setProceso("solicitud")
                                // //   //console.log("constanciaReestructura", constanciaReestructura)
                                // //   // navigate("../firmaUrl");

                                // //   if (row.NoEstatus === "19") {
                                // //     console.log("constanciaReestructura", constanciaReestructura)
                                // //     if (constanciaReestructura === true) {
                                // //       setProceso("solicitud")
                                // //       setInscripcionRestructura(SolicitudReestructuraFirma)
                                // //       ConsultaSolicitudReestructura(setUrl);
                                // //       navigate("../firmaUrl");
                                // //     }
                                // //   } else {
                                // //     getComentariosSolicitudPlazo(
                                // //       row.Id,
                                // //       () => { }
                                // //     ).then((data) => {
                                // //       if (
                                // //         data.filter(
                                // //           (a: any) =>
                                // //             a.Tipo === "RequerimientoReestructura"
                                // //         ).length > 0
                                // //       ) {
                                // //         requerimientos(
                                // //           row.Solicitud,
                                // //           row.NumeroRegistro,
                                // //           data.filter(
                                // //             (a: any) =>
                                // //               a.Tipo === "RequerimientoReestructura"
                                // //           )[0]
                                // //         );
                                // //       } else {
                                // //         ConsultaConstancia(
                                // //           row.Solicitud,
                                // //           row.NumeroRegistro,
                                // //           setUrl
                                // //         );
                                // //         navigate("../firmaUrl");
                                // //       }
                                // //     });
                                // //   }
                                // }
                              }}
                            >
                              <HistoryEduIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                      {localStorage.getItem("Rol") !== "Administrador" && (
                        <Tooltip title="Comentarios">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setInscripcion(row);
                              changeOpenVerComentarios(!openVerComentarios);
                            }}
                          >
                            <CommentIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </StyledTableCell>
                    {openDialogVer && (
                      <DialogVerDetalle
                        handler={changeOpenDialogVer}
                        openState={openDialogVer}
                        rowSolicitud={solicitud}
                        rowId={rowId}
                      />
                    )}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>


      {openVerComentarios && (
        <VerComentariosSolicitudReestructura
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
        />
      )}


      {openDialogVer && (
        <DialogVerDetalle
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          rowSolicitud={solicitud}
          rowId={rowId}
        />
      )}
      <DialogTrazabilidad
        handler={setOpenTrazabilidad}
        openState={openTrazabilidad}
        row={inscripcion}
      />
    </Grid>
  );
}
