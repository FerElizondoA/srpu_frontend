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
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";
import { ICatalogo } from "../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export let erroresValidacion: string[] = [];

interface Head {
  label: string;
}

const headsClausulas: readonly Head[] = [
  {
    label: "Anexo ó Cláusula Original",
  },
  {
    label: "Anexo ó Clausula Modificada",
  },
  {
    label: "Modificación",
  },
];
const heads: readonly Head[] = [
  {
    label: " ",
  },
  {
    label: "Declaratorias",
  },
];
export let errores: string[] = [];

export function SolicitudDeReestructuracion() {
  const [checkObj, setCheckObj] = useState<checkBoxType>({});

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

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infoValidaciones = (filtroValidacion: string) => {
    let err = 0;
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
      let numeroDePago = 0;
      let PeriocidadDePago = "";
      let diasEjercicio = "";
      let tasaEfectiva = "";
      let comisiones: any = [];
      let TasaDeInteres: any = [];

      const CostosGastos: any = {
        destinoCG: state.generalGastosCostos.destino.Descripcion,
        detalleInversion: state.generalGastosCostos.detalleInversion,
        gastosAdicionales: state.GastosCostos.gastosAdicionales,
        claveInscripcionFinanciamiento:
          state.generalGastosCostos.claveInscripcionFinanciamiento,
        descripcion: state.generalGastosCostos.descripcion,
        monto: state.generalGastosCostos.monto,
        saldoVigente: state.GastosCostos.saldoVigente,
        montoGastosAdicionales: state.GastosCostos.montoGastosAdicionales,
      };

      for (let i = 0; i < state.tablaCondicionesFinancieras.length; i++) {
        const item = state.tablaCondicionesFinancieras[0];
        numeroDePago = item.pagosDeCapital.numeroDePago;
        PeriocidadDePago = item.pagosDeCapital.periodicidadDePago;
        TasaDeInteres = item.tasaInteres;
        diasEjercicio = item.diasEjercicio;
        tasaEfectiva = item.tasaEfectiva;
        comisiones = item.comisiones;
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
          "Sección Condiciones Financieras: Seleccione la periodicidad de pago."
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

      if (err === 0) {
        setOpenDialogEnviar(!openDialogEnviar);
      } else {
        setOpenDialogValidacion(!openDialogValidacion);
      }
    } else if (filtroValidacion === "Modificacion") {
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
        return aux.push(regla);
      } else {
        return null;
      }
    });
    arrReglas = aux;
    changeReglasAplicables(arrReglas);
  };
  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 974px)"),
  };
  return (
    <Grid container>
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          justifyItems: "center",
        }}
      >
        <Grid item sx={{ width: "40%" }}>
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>Tipo de Convenio</InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={"Convenio de Reestructura y Reconocimiento"}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>Fecha de Solicitud</InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={format(new Date("03/25/2023"), "PPP", {
              locale: es,
            })}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>Número de Solicitud</InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={"DDPYPF-50/2024"}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>
            Fecha de firma del convenio
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={format(new Date("12/04/2023"), "PPP", {
              locale: es,
            })}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>
            Periodo de administración (meses)
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={"30"}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>Saldo vigente</InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={"$3,212,040,512.00"}
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

        <Grid item sx={{ width: "40%" }}>
          <InputLabel sx={queries.medium_text}>
            Periodo de financiamiento (meses)
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={"123"}
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
                fontSize: "1.4ch",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                fontSize: "1.5ch",
              },
            }}
          >
            Reestructura
          </Divider>
        </Grid>

        <Grid width={"100%"}>
          <TableContainer
            sx={{
              width: "100%",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headsClausulas.map((head, index) => (
                    <StyledTableCell key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {"IX"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {"III"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "80%" }}>
                    {
                      "En el caso de la amortización anticipada del crédito, se incluye la opción para que el Gobierno del Estado cubra el importe total del crédito con recursos propios, inclusive los provenientes de la contratación de nuevos financiamientos, en cuyo caso el Banco entregará al Estado el valor de la redención anticipada del bono cupón cero"
                    }
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell sx={{ width: "10%" }}>{"X"}</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {"III"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "80%" }}>
                    {
                      "En el caso de la amortización anticipada del crédito, se incluye la opción para que el Gobierno del Estado cubra el importe total del crédito con recursos propios, inclusive los provenientes de la contratación de nuevos financiamientos, en cuyo caso el Banco entregará al Estado el valor de la redención anticipada del bono cupón cero"
                    }
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {"XVI"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {"III"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "80%" }}>
                    {
                      "En el caso de la amortización anticipada del crédito, se incluye la opción para que el Gobierno del Estado cubra el importe total del crédito con recursos propios, inclusive los provenientes de la contratación de nuevos financiamientos, en cuyo caso el Banco entregará al Estado el valor de la redención anticipada del bono cupón cero"
                    }
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid
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
                  fontSize: "1.4ch",
                },
                "@media (min-width: 601px) and (max-width: 900px)": {
                  fontSize: "1.5ch",
                },
              }}
            >
              De conformidad al reglamento, indique las declaratorias aplicables
              al financiamiento u obligación
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
                      <StyledTableRow>
                        <StyledTableCell padding="checkbox">
                          <Checkbox onChange={(v) => {}} />
                        </StyledTableCell>
                        <StyledTableCell>
                          {
                            "b) Cumple con las disposiciones jurídicas aplicables"
                          }
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

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
                      // setOpenDialogCancelar(!openDialogCancelar);
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

                {/* {openDialogBorrador && (
                      <DialogGuardarBorrador
                        handler={setOpenDialogBorrador}
                        openState={openDialogBorrador}
                      />
                    )}
                   {openDialogEnviar && (
                      <ConfirmacionEnviarSolicitud
                        handler={setOpenDialogEnviar}
                        openState={openDialogEnviar}
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
                        />
                      )} */}
              </Grid>
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
              <Typography color={"red"} sx={{ fontSize: ".9rem" }}>
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
