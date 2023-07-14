import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  InputLabel,
  TextField,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  Checkbox,
  TableRow,
  TableBody,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import Swal from "sweetalert2";
import { ConfirmacionDescargaSolicitud } from "../Dialog/DialogEnviarSolicitud";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ConfirmacionBorradorSolicitud } from "../Dialog/DialogGuardarBorrador";
import { DialogSolicitarModificacion } from "../Dialog/DialogSolicitarModificacion";
import { ConfirmacionCancelarSolicitud } from "../Dialog/DialogCancelarSolicitud";

export let erroresValidacion: string[] = [];

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

export function SolicituDeInscripcion() {
  const [checkObj, setCheckObj] = useState<checkBoxType>({});

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  let [reglasSeleccionadas] = useState(new Array());

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [openDialogCancelar, setOpenDialogCancelar] = useState(false);

  const [openDialogModificacion, setOpenDialogModificacion] = useState(false);

  const nombreServidorPublico: string = useLargoPlazoStore(
    (state) => state.inscripcion.servidorPublicoDirigido
  );
  const cargoServidorPublico: string = useLargoPlazoStore(
    (state) => state.inscripcion.cargo
  );
  const solicitanteAutorizado: string = useLargoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const catalogoReglas: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoReglas
  );
  const changeReglasAplicables: Function = useLargoPlazoStore(
    (state) => state.changeReglasAplicables
  );
  const reglasAplicables: string[] = useLargoPlazoStore(
    (state) => state.reglasAplicables
  );
  const getReglas: Function = useLargoPlazoStore((state) => state.getReglas);

  const [openDialogValidacion, setOpenDialogValidacion] = useState(false);
  let err = 0;

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infoValidaciones = (filtroValidacion: string) => {
    if (filtroValidacion === "Enviar") {
      erroresValidacion = [];

      const state = useLargoPlazoStore.getState();
      const solicitud: any = {
        encabezado: state.encabezado,
        MontoOriginalContratado: state.informacionGeneral.monto,
        PlazoDias: state.informacionGeneral.plazo,
        Destino: state.informacionGeneral.destino.Descripcion,
        Denominacion: state.informacionGeneral.denominacion,
        InstitucionFinanciera:
          state.informacionGeneral.institucionFinanciera.Descripcion,
      };
      /////////////////// Por definir /////////////////////
      let entePublicoObligado = "";
      let obligadoSolidario = "";
      let tipoEntePublicoObligado = "";

      for (let i = 0; i < state.tablaObligadoSolidarioAval.length; i++) {
        const item = state.tablaObligadoSolidarioAval[0];
        entePublicoObligado = item.entePublicoObligado;
        obligadoSolidario = item.obligadoSolidario;
        tipoEntePublicoObligado = item.tipoEntePublicoObligado;
      }
      ///////////////////   Condiciones Financieras /////////////////////
      let importe = 0;
      let numeroDePago = 0;
      let PeriocidadDePago = "";
      let diasEjercicio = "";
      let tasaEfectiva = "";
      let comisiones: any = [];
      let TasaDeInteres: any = [];

      ///////////////////    Gastos y costos   ///////////////////
      const CostosGastos: any = {
        destinoCG: state.generalGastosCostos.destino.Descripcion,
        detalleInversion: state.generalGastosCostos.detalleInversion,
        //periodoAdministracion: state.generalGastosCostos.periodoAdministracion, // NO SABEMOS AUN
        gastosAdicionales: state.generalGastosCostos.gastosAdicionales,
        claveInscripcionFinanciamiento:
          state.generalGastosCostos.claveInscripcionFinanciamiento, // NO SABEMOS AUN
        descripcion: state.generalGastosCostos.descripcion,
        monto: state.generalGastosCostos.monto,
        //periodoFinanciamiento: state.generalGastosCostos.periodoFinanciamiento, //AUN NO SABEMOS
        saldoVigente: state.generalGastosCostos.saldoVigente, //AUN NO SABEMOS
        montoGastosAdicionales:
          state.generalGastosCostos.montoGastosAdicionales,
      };

      let destinoCG = "";
      let detalleInversion = "";
      //let periodoAdministracion = "";
      let gastosAdicionales = 0;
      let claveInscripcionFinanciamiento = "";
      let descripcion = "";
      let monto = 0;
      //let periodoFinanciamiento = "";
      let saldoVigente = 0;
      let montoGastosAdicionales = 0;

      for (let i = 0; i < state.tablaCondicionesFinancieras.length; i++) {
        const item = state.tablaCondicionesFinancieras[0];
        //importe = item.disposicion.importe;
        numeroDePago = item.pagosDeCapital.numeroDePago;
        PeriocidadDePago = item.pagosDeCapital.periodicidadDePago;
        TasaDeInteres = item.tasaInteres;
        diasEjercicio = item.diasEjercicio;
        tasaEfectiva = item.tasaEfectiva;
        comisiones = item.comisiones;
      }

      for (let i = 0; i < state.tablaGastosCostos.length; i++) {
        const item = state.tablaGastosCostos[0];
        destinoCG = item.destino;
        detalleInversion = item.detalleInversion;
        //periodoAdministracion = item.periodoAdministracion;
        gastosAdicionales = item.gastosAdicionales;
        claveInscripcionFinanciamiento = item.claveInscripcionFinanciamiento;
        descripcion = item.descripcion;
        monto = item.monto;
        //periodoFinanciamiento = item.periodoFinanciamiento;
        saldoVigente = item.saldoVigente;
        montoGastosAdicionales = item.montoGastosAdicionales;
      }

      if (
        solicitud.PlazoDias === undefined ||
        solicitud.PlazoDias === 0 ||
        /^[\s]*$/.test(solicitud.PlazoDias)
      ) {
        err = 1;
        erroresValidacion.push(
          "Sección Información General: El Plazo a Días no puede ser  0."
        );
      }

      if (
        solicitud.MontoOriginalContratado === undefined ||
        solicitud.MontoOriginalContratado === 0 ||
        /^[\s]*$/.test(solicitud.MontoOriginalContratado)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Información General: Ingrese un Monto original contratado valido."
        );
      }
      if (
        solicitud.Destino === undefined ||
        solicitud.Destino === "" ||
        /^[\s]*$/.test(solicitud.Destino)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Información General: Seleccione el Destino."
        );
      }
      if (
        solicitud.InstitucionFinanciera === undefined ||
        solicitud.InstitucionFinanciera === "" ||
        /^[\s]*$/.test(solicitud.InstitucionFinanciera)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Información General: Seleccione la Institución Financiera."
        );
      }

      if (
        state.tablaCondicionesFinancieras[0] === undefined ||
        state.tablaCondicionesFinancieras[0] === null
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Agregar al menos una Condicion Financiera."
        );
      }

      if (TasaDeInteres[0] === undefined || TasaDeInteres[0].tasa === "") {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Agregar al menos una Tasa De Interés."
        );
      }
      if (importe === undefined || importe === 0) {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Ingrese el Importe."
        );
      }
      if (numeroDePago === undefined || numeroDePago === 0) {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Ingrese el Número de pagos."
        );
      }
      if (
        PeriocidadDePago === undefined ||
        PeriocidadDePago === "" ||
        /^[\s]*$/.test(PeriocidadDePago)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Seleccione la periocidad de pago."
        );
      }
      if (
        diasEjercicio === undefined ||
        diasEjercicio === "" ||
        /^[\s]*$/.test(diasEjercicio)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Condiciones Financieras: Seleccione los Díaz del Ejercicio."
        );
      }
      if (
        tasaEfectiva === undefined ||
        tasaEfectiva === "" ||
        /^[\s]*$/.test(tasaEfectiva)
      ) {
        err = 1;
        erroresValidacion.push(
          "Sección Condiciones Financieras: Ingrese la tasa Efectiva."
        );
      }

      ///////////////////NUEVOOOOOOOSSS

      if (
        CostosGastos.destinoCG === undefined ||
        CostosGastos.destinoCG === null ||
        /^[\s]*$/.test(CostosGastos.destinoCG)
      ) {
        err = 1;
        erroresValidacion.push(
          "Sección Información General: Seleccione el Destino en costos y gastos"
        );
      }

      /////////////////// FIN NUEVOOOOOOOSSS

      if (comisiones[0] === undefined || comisiones[0].tipoDeComision === "") {
        err = 1;
        erroresValidacion.push(
          "Sección Condiciones Financieras: Agregar al menos una comision."
        );
      }

      // if (
      //   state.reglasAplicables[0] === undefined ||
      //   state.reglasAplicables[0] === ""
      // ) {
      //     erroresValidacion.push(
      //     "Sección <strong>Solicitud de Inscripción</strong>:Agregar al menos una regla."
      //   );
      // }

      if (err === 0) {
        setOpenDialogEnviar(!openDialogEnviar);
      } else {
        setOpenDialogValidacion(!openDialogValidacion);
      }
    } else if (filtroValidacion === "Modificacion") {
      // <-- OTRA VALIDACION
      erroresValidacion = [];

      const state = useLargoPlazoStore.getState();
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

        erroresValidacion.push(
          "Sección Información General: Ingrese un Monto original contratado valido."
        );
      }
      if (
        solicitud.Destino === undefined ||
        solicitud.Destino === "" ||
        /^[\s]*$/.test(solicitud.Destino)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Información General: Seleccione  el Destino."
        );
      }
      if (
        solicitud.InstitucionFinanciera === undefined ||
        solicitud.InstitucionFinanciera === "" ||
        /^[\s]*$/.test(solicitud.InstitucionFinanciera)
      ) {
        err = 1;

        erroresValidacion.push(
          "Sección Información General: Seleccione la Institución Financiera."
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
        aux.push(regla);
      }
    });
    arrReglas = aux;
    changeReglasAplicables(arrReglas);
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
        <Grid item md={3} lg={3}>
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

        <Grid item md={3} lg={3}>
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

      <Grid item container mt={2} mb={2} justifyContent={"center"}>
        <Grid item md={3} lg={3} xl={4}>
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

      <Grid item container justifyContent={"center"} alignItems={"flex-start"}>
        <Grid item md={9} lg={9} xl={10}>
          <Divider sx={queries.medium_text}>
            Declaratorias aplicables al financiamiento u obligación:
          </Divider>
        </Grid>
        <Grid item md={9} lg={9} xl={9} display="flex">
          <Grid>
            <Typography sx={{ display: "grid", justifyContent: "center" }}>
              Al seleccionar alguna de las siguientes secciones, estará
              manifestando bajo protesta de decir verdad que cumple con lo
              señalado en cada apartado
            </Typography>
            <Grid item display={"flex"} width={"112%"}>
              <TableContainer sx={queries.tablaSolicitudInscripcion}>
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
                      // const stringIndex = index.toString()
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
                                  ? setCheckObj({ ...checkObj, [index]: true })
                                  : setCheckObj({
                                      ...checkObj,
                                      [index]: false,
                                    });

                                v.target.checked
                                  ? arrReglas.push(row.Descripcion)
                                  : removeRegla(row.Descripcion);
                                changeReglasAplicables(arrReglas);
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

              {localStorage.getItem("Rol") !== "Administrador" ? ( //BOTONES**************
                <Grid
                  container
                  ml={1}
                  sx={{
                    width: "15%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpenDialogCancelar(!openDialogCancelar);
                    }}
                    sx={queries.buttonCancelar}
                  >
                    Cancelar
                  </Button>

                  {localStorage.getItem("Rol") === "Verificador" ? (
                    <Button
                      sx={queries.buttonContinuarSolicitudInscripcion}
                      onClick={() => {
                        infoValidaciones("Modificacion");
                      }}
                    >
                      Solicitar Modificación
                    </Button>
                  ) : null}

                  {/* <Button
                    sx={queries.buttonContinuarSolicitudInscripcion}
                    onClick={() => {
                      setOpenDialogBorrador(!openDialogBorrador);
                    }}
                  >
                    Guardar Borrador
                  </Button> */}

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

                  <ConfirmacionBorradorSolicitud
                    handler={setOpenDialogBorrador}
                    openState={openDialogBorrador}
                  />
                  <ConfirmacionDescargaSolicitud
                    handler={setOpenDialogEnviar}
                    openState={openDialogEnviar}
                  />
                  <ConfirmacionCancelarSolicitud
                    handler={setOpenDialogCancelar}
                    openState={openDialogCancelar}
                  />
                  {openDialogModificacion && (
                    <DialogSolicitarModificacion
                      handler={setOpenDialogModificacion}
                      openState={openDialogModificacion}
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
          {erroresValidacion?.map((item, index) => {
            const division = item.indexOf(":");
            const markedText =
              division !== -1 ? item.substring(0, division + 1) : item;
            const restText =
              division !== -1 ? item.substring(division + 1) : "";
            return (
              <Typography key={index} color={"red"}>
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
