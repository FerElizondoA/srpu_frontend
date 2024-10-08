/* eslint-disable react-hooks/exhaustive-deps */
import FindInPageIcon from "@mui/icons-material/FindInPage";
import {
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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { VerBorradorDocumento } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogResumenDocumento";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { IData } from "../consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { DialogVerDetalle } from "./DialogVerDetalle";

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
  const [datos, setDatos] = useState<Array<IData>>([]);
  // const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);

  const setDatosActualizar: Function = useCortoPlazoStore(
    (state) => state.setDatosActualizar
  );

  const changeRestructura: Function = useCortoPlazoStore(
    (state) => state.changeRestructura
  );

  const changeReglasAplicablesLP: Function = useLargoPlazoStore(
    (state) => state.changeReglasAplicables
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

  const llenaSolicitud = (solicitud: IData, TipoDocumento: string) => {
    // const state = useCortoPlazoStore.getState();
    let aux: any = JSON.parse(solicitud.Solicitud!);

    changeReglasAplicablesLP(aux?.inscripcion.declaratorias);
    changeEncabezadoLP(aux?.encabezado);
    setInformacionGeneralLP(aux?.informacionGeneral);
    setGastosCostos(aux?.GastosCostos);

    aux?.informacionGeneral.obligadosSolidarios.map((v: any, index: number) => {
      return addObligadoSolidarioAvalLP(v);
    });

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

  const [openDialogVer, changeOpenDialogVer] = useState(false);
  useEffect(() => {
    getSolicitudes("Reestructura", (e: IData[]) => {
      setDatos(e);
      // setDatosFiltrados(e);
    });
  }, []);

  return (
    <Grid>
      <Grid>
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
              //value={busqueda}
              onChange={(e) => {
                //handleChange(e.target.value);
              }}
              onKeyPress={(ev) => {
                //cuando se presiona Enter
                // if (ev.key === "Enter") {
                //   filtrarDatos();
                //   ev.preventDefault();
                //   return false;
                // }
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              title="Buscar"
              onClick={() => {
                //filtrarDatos();
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
              {datos.map((row, index) => {
                let chip = <></>;
                if (row.Estatus === "Autorizado") {
                  chip = (
                    <Chip
                      label={row.Estatus}
                      color="success"
                      variant="outlined"
                    />
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
                      {chip}
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

                    <StyledTableCell>
                      <Tooltip title="Ver Detalle">
                        <IconButton
                          type="button"
                          onClick={() => {
                            llenaSolicitud(row, row.TipoSolicitud);
                            getComentariosSolicitudPlazo(
                              row.Id,
                              setDatosActualizar
                            );
                            changeRestructura(true);
                            changeOpenDialogVer(!openDialogVer);
                          }}
                        >
                          <FindInPageIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    {openDialogVer && (
                      <VerBorradorDocumento
                        handler={changeOpenDialogVer}
                        openState={openDialogVer}
                        rowSolicitud={row}
                        rowId={row.Id}
                      />
                    )}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {openDialogVer && (
        <DialogVerDetalle
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          rowSolicitud={solicitud}
          rowId={rowId}
        />
      )}
    </Grid>
  );
}
