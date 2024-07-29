import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ConfirmacionCancelarSolicitud } from "../Dialogs/DialogCancelarSolicitud";
import { ConfirmacionEnviarSolicitud } from "../Dialogs/DialogEnviarSolicitud";
import { DialogGuardarBorrador } from "../Dialogs/DialogGuardarBorrador";
import { DialogSolicitarModificacion } from "../Dialogs/DialogSolicitarModificacion";
import { IDocsEliminados } from "./InterfacesCortoPlazo";

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Selección",
  },
  {
    label: "Regla",
  },
];
export let errores: string[] = [];

export function SolicitudInscripcion({arrDocsEliminados}:{arrDocsEliminados?:IDocsEliminados[]}) {
  const [checkObj, setCheckObj] = useState<checkBoxType>({});

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [openDialogCancelar, setOpenDialogCancelar] = useState(false);

  const [openDialogModificacion, setOpenDialogModificacion] = useState(false);

  const nombreServidorPublico: string = useCortoPlazoStore(
    (state) => state.inscripcion.servidorPublicoDirigido
  );
  const cargoServidorPublico: string = useCortoPlazoStore(
    (state) => state.inscripcion.cargo
  );
  const solicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const catalogoReglas: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoReglas
  );
  const setReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.setReglasAplicables
  );
  const reglasAplicables: string[] = useCortoPlazoStore(
    (state) => state.reglasAplicables
  );

  const getReglas: Function = useCortoPlazoStore((state) => state.getReglas);

  useEffect(() => {
    catalogoReglas.length <= 0 && getReglas();
    console.log('arrDocsEliminados SolicitudInscripcion',arrDocsEliminados);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openDialogValidacion, setOpenDialogValidacion] = useState(false);
  let err = 0;

  const infoValidaciones = (filtroValidacion: string) => {
    if (filtroValidacion === "Enviar") {
      errores = [];

      const state = useCortoPlazoStore.getState();
      const solicitud: any = {
        encabezado: state.encabezado,
        MontoOriginalContratado: state.informacionGeneral.monto,
        PlazoDias: state.informacionGeneral.plazo,
        Destino: state.informacionGeneral.destino.Descripcion,
        Denominacion: state.informacionGeneral.denominacion,
        InstitucionFinanciera:
          state.informacionGeneral.institucionFinanciera.Descripcion,
      };

      let importe = "$ 0.00";
      let numeroDePago = 0;
      let PeriocidadDePago = "";
      let diasEjercicio = "";
      let tasaEfectiva = "";
      let comisiones: any = [];
      let TasaDeInteres: any = [];

      for (let i = 0; i < state.tablaCondicionesFinancieras.length; i++) {
        const item = state.tablaCondicionesFinancieras[0];
        importe = item.disposicion[0].importe;
        numeroDePago = item.pagosDeCapital.numeroDePago;
        PeriocidadDePago = item.pagosDeCapital.periodicidadDePago.Descripcion;
        TasaDeInteres = item.tasaInteres;
        //diasEjercicio = item.tasaEfectiva.diasEjercicio.Descripcion;
        tasaEfectiva = item.tasaEfectiva.tasaEfectiva;
        comisiones = item.comisiones;
      }
      if (
        solicitud.PlazoDias === undefined ||
        solicitud.PlazoDias === 0 ||
        /^[\s]*$/.test(solicitud.PlazoDias)
      ) {
        err = 1;
        errores.push(
          "Sección Información General: El Plazo a Días no puede ser  0."
        );
      }

      if (
        solicitud.MontoOriginalContratado === undefined ||
        solicitud.MontoOriginalContratado === 0 ||
        /^[\s]*$/.test(solicitud.MontoOriginalContratado)
      ) {
        err = 1;

        errores.push(
          "Sección Información General: Ingrese un Monto original contratado valido."
        );
      }
      if (
        solicitud.Destino === undefined ||
        solicitud.Destino === "" ||
        /^[\s]*$/.test(solicitud.Destino)
      ) {
        err = 1;

        errores.push("Sección Información General: Seleccione  el Destino.");
      }
      if (
        solicitud.InstitucionFinanciera === undefined ||
        solicitud.InstitucionFinanciera === "" ||
        /^[\s]*$/.test(solicitud.InstitucionFinanciera)
      ) {
        err = 1;

        errores.push(
          "Sección Información General: Seleccione la Institución Financiera."
        );
      }

      if (
        state.tablaCondicionesFinancieras[0] === undefined ||
        state.tablaCondicionesFinancieras[0] === null
      ) {
        err = 1;

        errores.push(
          "Sección Condiciones Financieras :Agregar al menos una Condicion Financiera."
        );
      }

      if (TasaDeInteres[0] === undefined || TasaDeInteres[0].tasa === "") {
        err = 1;

        errores.push(
          "Sección Condiciones Financieras:Agregar al menos una Tasa De Interés."
        );
      }
      if (
        importe === undefined ||
        importe === "$ 0.00" ||
        importe === "$ 0.00"
      ) {
        err = 1;
        errores.push("Sección Condiciones Financieras: Ingrese el Importe.");
      }
      if (numeroDePago === undefined || numeroDePago === 0) {
        err = 1;

        errores.push(
          "Sección Condiciones Financieras: Ingrese el Número de pagos."
        );
      }
      if (
        PeriocidadDePago === undefined ||
        PeriocidadDePago === "" ||
        /^[\s]*$/.test(PeriocidadDePago)
      ) {
        err = 1;

        errores.push(
          "Sección Condiciones Financieras: Seleccione la Periodicidad de pago."
        );
      }
      // if (
      //   diasEjercicio === undefined ||
      //   diasEjercicio === "" ||
      //   /^[\s]*$/.test(diasEjercicio)
      // ) {
      //   err = 1;

      //   errores.push(
      //     "Sección Condiciones Financieras: Seleccione los Díaz del Ejercicio."
      //   );
      // }
      if (
        tasaEfectiva === undefined ||
        tasaEfectiva === "" ||
        /^[\s]*$/.test(tasaEfectiva)
      ) {
        err = 1;
        errores.push(
          "Sección Condiciones Financieras: Ingrese la tasa Efectiva."
        );
      }

      if (comisiones[0] === undefined || comisiones[0].tipoDeComision === "") {
        errores.push(
          "Sección Condiciones Financieras: Agregar al menos una comision."
        );
      }

      if (
        state.reglasAplicables[0] === undefined ||
        state.reglasAplicables[0] === ""
      ) {
        errores.push(
          "Sección Solicitud de Inscripción: Agregar al menos una regla."
        );
      }

      if (err === 0) {
        setOpenDialogEnviar(!openDialogEnviar);
      } else {
        setOpenDialogValidacion(!openDialogValidacion);
      }
    } else if (filtroValidacion === "Modificacion") {
      errores = [];

      const state = useCortoPlazoStore.getState();
      const solicitud: any = {
        encabezado: state.encabezado,
        MontoOriginalContratado: state.informacionGeneral.monto,
        PlazoDias: state.informacionGeneral.plazo,
        Destino: state.informacionGeneral.destino.Descripcion,
        Denominacion: state.informacionGeneral.denominacion,
        InstitucionFinanciera:
          state.informacionGeneral.institucionFinanciera.Descripcion,
      };
      if (
        solicitud.MontoOriginalContratado === undefined ||
        solicitud.MontoOriginalContratado === 0 ||
        /^[\s]*$/.test(solicitud.MontoOriginalContratado)
      ) {
        err = 1;

        errores.push(
          "Sección Información General:Ingrese un Monto original contratado valido."
        );
      }
      if (
        solicitud.Destino === undefined ||
        solicitud.Destino === "" ||
        /^[\s]*$/.test(solicitud.Destino)
      ) {
        err = 1;

        errores.push("Sección Información General:Seleccione  el Destino.");
      }
      if (
        solicitud.InstitucionFinanciera === undefined ||
        solicitud.InstitucionFinanciera === "" ||
        /^[\s]*$/.test(solicitud.InstitucionFinanciera)
      ) {
        err = 1;

        errores.push(
          "Sección Información General:Seleccione la Institución Financiera."
        );
      }
      if (err === 0) {
        setOpenDialogModificacion(!openDialogModificacion);
      } else {
        setOpenDialogValidacion(!openDialogValidacion);
      }
    }
  };

  let arrReglas: Array<string> = [];
  arrReglas = reglasAplicables;

  const removeRegla = (descripcion: string) => {
    let aux: Array<string> = [];
    arrReglas.map((regla, index) => {
      if (regla !== descripcion) {
        return aux.push(regla);
      } else {
        return null;
      }
    });
    arrReglas = aux;
    setReglasAplicables(arrReglas);
  };

  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 974px)"),
  };

  return (
    <Grid container>
      <Grid
        width={"100%"}
        item
        container
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>
            Servidor público a quien va dirigido:
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={nombreServidorPublico}
            disabled
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>Cargo</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={cargoServidorPublico}
            // onChange={(text) => changeCargo(text.target.value)}
            disabled
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container mt={2} mb={2} justifyContent={"center"}>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={
              solicitanteAutorizado || localStorage.getItem("NombreUsuario")
            }
            // onChange={(text) => changeSolicitanteAutorizado(text.target.value)}
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"flex-start"}
        width={"100%"}
      >
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <Divider
            sx={{
              fontWeight: "bold",
              fontFamily: "MontserratMedium",
              width: "100%",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1.4ch",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            Declaratorias Aplicables al Financiamiento u Obligación:
          </Divider>
        </Grid>

        <Grid
          item
          container
          xs={10}
          sm={11}
          md={10}
          lg={10}
          xl={9}
          display="flex"
          width={"100%"}
        >
          <Grid width={"100%"}>
            <Typography
              sx={{
                "@media (max-width: 600px)": {
                  // XS (extra small) screen
                  fontSize: "1.4ch",
                },
                "@media (min-width: 601px) and (max-width: 900px)": {
                  // SM (small) screen
                  fontSize: "1.5ch",
                },
              }}
            >
              Al seleccionar alguna de las declaratorias, se estará manifestando
              bajo protesta en decir verdad que cumplen con lo señalado en cada
              una de ellas
            </Typography>

            <Grid container={query.isMobile} display={"flex"} width={"100%"}>
              <Grid width={"100%"}>
                <TableContainer
                  sx={{
                    ...queries.tablaSolicitudInscripcion,
                    width: "100%",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            <TableSortLabel>{head.label}</TableSortLabel>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {catalogoReglas.map((row, index) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                checked={reglasAplicables.includes(
                                  row.Descripcion
                                )}
                                disabled={
                                  (checkObj[1] === true && index === 2) ||
                                  (checkObj[2] === true && index === 1) ||
                                  (checkObj[3] === true && index === 4) ||
                                  (checkObj[4] === true && index === 3)
                                }
                                onChange={(v) => {
                                  v.target.checked
                                    ? setCheckObj({
                                        ...checkObj,
                                        [index]: true,
                                      })
                                    : setCheckObj({
                                        ...checkObj,
                                        [index]: false,
                                      });

                                  v.target.checked
                                    ? arrReglas.push(row.Descripcion)
                                    : removeRegla(row.Descripcion);
                                  setReglasAplicables(arrReglas);
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>{row.Descripcion}</StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {localStorage.getItem("Rol") !== "Administrador" ? (
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    ml: 2,
                    height: "7rem",
                    "@media (max-width: 974px)": {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    },
                    "@media (min-width: 974.1px)": {
                      flexDirection: "column",
                      justifyContent: "end",
                      height: "22rem",
                      width: "10%",
                    },

                    "@media (min-width: 1140px)": {
                      flexDirection: "column",
                      justifyContent: "end",
                      height: "22rem",
                      width: "10%",
                    },

                    "@media (min-width: 1400px)": {
                      width: "10%",
                    },

                    "@media (min-width: 1870px)": {
                      width: "5%",
                      height: "35rem",
                    },
                  }}
                >
                  <Grid
                    mb={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      onClick={() => {
                        setOpenDialogCancelar(!openDialogCancelar);
                      }}
                      sx={{ ...queries.buttonCancelarSolicitudInscripcion }}
                    >
                      Cancelar
                    </Button>
                  </Grid>

                  {localStorage.getItem("Rol") === "Verificador" ? (
                    <Grid
                      mb={2}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        sx={queries.buttonContinuarSolicitudInscripcion}
                        onClick={() => {
                          infoValidaciones("Modificacion");
                        }}
                      >
                        Solicitar Modificación
                      </Button>
                    </Grid>
                  ) : null}

                  <Grid
                    mb={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      sx={queries.buttonContinuarSolicitudInscripcion}
                      onClick={() => {
                        infoValidaciones("Enviar");
                      }}
                    >
                      {localStorage.getItem("Rol") === "Verificador"
                        ? "Finalizar"
                        : "Enviar"}
                    </Button>
                  </Grid>

                  {openDialogBorrador && (
                    <DialogGuardarBorrador
                      handler={setOpenDialogBorrador}
                      openState={openDialogBorrador}
                    />
                  )}

                  {openDialogEnviar && (
                    <ConfirmacionEnviarSolicitud
                      handler={setOpenDialogEnviar}
                      openState={openDialogEnviar}
                      arrDocsEliminados={arrDocsEliminados}
                    />
                  )}

                  {openDialogCancelar && (
                    <ConfirmacionCancelarSolicitud
                      handler={setOpenDialogCancelar}
                      openState={openDialogCancelar}
                    />
                  )}

                  {openDialogModificacion && (
                    <DialogSolicitarModificacion
                      handler={setOpenDialogModificacion}
                      openState={openDialogModificacion}
                      accion={"modificacion"}
                      arrDocsEliminados={arrDocsEliminados}
                    />
                  )}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openDialogValidacion}>
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            Favor de revisar los siguientes apartados:
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}
        >
          {errores?.map((item, index) => {
            const division = item.indexOf(":");

            const markedText =
              division !== -1 ? item.substring(0, division + 1) : item;

            const restText =
              division !== -1 ? item.substring(division + 1) : "";

            return (
              <Typography color={"red"} sx={{ fontSize: ".9rem" }} key={index}>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  *{markedText}
                </span>

                <span style={{ color: "red" }}>
                  {restText} <br /> <br />
                </span>
              </Typography>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogValidacion(!openDialogValidacion);
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
