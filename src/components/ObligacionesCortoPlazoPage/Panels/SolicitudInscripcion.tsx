import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  TextField,
  Divider,
  Checkbox,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ConfirmacionDescargaSolicitud } from "../Dialogs/DialogEnviarSolicitud";
import { ConfirmacionBorradorSolicitud } from "../Dialogs/DialogGuardarBorrador";
import { ConfirmacionCancelarSolicitud } from "../Dialogs/DialogCancelarSolicitud";
import { DialogSolicitarModificacion } from "../Dialogs/DialogSolicitarModificacion";
import Swal from "sweetalert2";

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
export function SolicitudInscripcion() {
  const [checkObj, setCheckObj] = React.useState<checkBoxType>({});

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  let [reglasSeleccionadas] = React.useState(new Array());

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [openDialogCancelar, setOpenDialogCancelar] = React.useState(false);

  const [openDialogModificacion, setOpenDialogModificacion] =
    React.useState(false);

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
  const changeReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.changeReglasAplicables
  );
  const reglasAplicables: string[] = useCortoPlazoStore(
    (state) => state.reglasAplicables
  );
  const getReglas: Function = useCortoPlazoStore((state) => state.getReglas);

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let err = 0;

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: true,
    // confirmButtonColor: "red",
    confirmButtonText: "De acuerdo",
    // timer: 2000,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const InfoFaltante = () => {
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

    for (let i = 0; i < state.tablaCondicionesFinancieras.length; i++) {
      const item = state.tablaCondicionesFinancieras[0];
      importe = item.disposicion.importe;
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
      errores.push(
        "Sección <strong>Información General</strong>:El Plazo a Días no puede ser  0."
      );
    }

    if (
      solicitud.MontoOriginalContratado === undefined ||
      solicitud.MontoOriginalContratado === 0 ||
      /^[\s]*$/.test(solicitud.MontoOriginalContratado)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Ingrese un Monto original contratado valido."
      );
    }
    if (
      solicitud.Destino === undefined ||
      solicitud.Destino === "" ||
      /^[\s]*$/.test(solicitud.Destino)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Seleccione  el Destino."
      );
    }
    if (
      solicitud.InstitucionFinanciera === undefined ||
      solicitud.InstitucionFinanciera === "" ||
      /^[\s]*$/.test(solicitud.InstitucionFinanciera)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Seleccione la Institución Financiera."
      );
    }

    if (
      state.tablaCondicionesFinancieras[0] === undefined ||
      state.tablaCondicionesFinancieras[0] === null
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agruege al menos una Condicion Financiera."
      );
    }

    if (TasaDeInteres[0] === undefined || TasaDeInteres[0].tasa === "") {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agruege al menos una Tasa De Interés."
      );
    }
    if (importe === undefined || importe === 0) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese el Importe."
      );
    }
    if (numeroDePago === undefined || numeroDePago === 0) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese el Numero de pagos."
      );
    }
    if (
      PeriocidadDePago === undefined ||
      PeriocidadDePago === "" ||
      /^[\s]*$/.test(PeriocidadDePago)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Seleccione la periocidad de pago."
      );
    }
    if (
      diasEjercicio === undefined ||
      diasEjercicio === "" ||
      /^[\s]*$/.test(diasEjercicio)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Seleccione los Díaz del Ejercicio."
      );
    }
    if (
      tasaEfectiva === undefined ||
      tasaEfectiva === "" ||
      /^[\s]*$/.test(tasaEfectiva)
    ) {
      err = 1;
      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese la tasa Efectiva."
      );
    }

    if (comisiones[0] === undefined || comisiones[0].tipoDeComision === "") {
      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agregue al menos una comision."
      );
    }

    if (
      state.reglasAplicables[0] === undefined ||
      state.reglasAplicables[0] === ""
    ) {
      errores.push(
        "Sección <strong>Solicitud de Inscripción</strong>:Agregue al menos una regla."
      );
    }

    if (err === 0) {
      setOpenDialogEnviar(!openDialogEnviar);
    } else {
      Toast.fire({
        icon: "error",
        html: `
      <div style="height:100%; width:100%">
      <h3>Se han encontrado los siguientes errores:</h3>
      <div style="text-align: left; margin-left: 10px; color: red; height: 300px; overflow: auto;">
    <small>
    <strong>
    *</strong>${errores.join("<br><strong>*</strong>")}
    </small>
    </div>
    </div>`,
      });
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
    <Grid item container>
      <Grid
        item
        container
        flexDirection="row"
        mt={{ sm: 0, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 10, lg: 10 }}
      >
        <Grid item md={4.5} lg={4.5}>
          <InputLabel sx={queries.medium_text}>
            Servidor publico a quien va dirigido
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

        <Grid item md={4.5} lg={4.5}>
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

      <Grid
        item
        container
        flexDirection="row"
        mt={4}
        mb={4}
        justifyContent={"center"}
      >
        <Grid item md={3} lg={3} xl={3}>
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
        item
        container
        justifyContent={"center"}
        alignItems={"flex-start"}
        spacing={{ md: 10, lg: 10 }}
      >
        <Grid item md={9} lg={9} xl={9}>
          <Divider sx={queries.medium_text}>
            Declaratorias aplicables al financiamiento u obligación.
          </Divider>
        </Grid>
        <Grid item md={9} lg={9} xl={9}>
          <Grid container direction="column">
            <Grid item>
              <TableContainer
                sx={{
                  height: "50vh",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".2vw",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table>
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
            </Grid>
          </Grid>
        </Grid>

        {localStorage.getItem("Rol") !== "Administrador" ? (
          <Grid
            item
            position="fixed"
            sx={{
              bottom: 50,
              left: window.innerWidth - 300,
              display: "flex",
              flexDirection: "column",
              height: "27%",
              justifyContent: "space-around",
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
                sx={queries.buttonContinuar}
                onClick={() => {
                  setOpenDialogModificacion(!openDialogModificacion);
                }}
              >
                Solicitar Modificacion
              </Button>
            ) : null}

            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogBorrador(!openDialogBorrador);
              }}
            >
              Guardar Borrador
            </Button>

            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                InfoFaltante();
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
            <DialogSolicitarModificacion
              handler={setOpenDialogModificacion}
              openState={openDialogModificacion}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
