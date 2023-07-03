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
  Typography,
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

  // const [comentario, setComentario] = useState("");

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let err = 0;

  const Toast = Swal.mixin({
    width: "690px",
    confirmButtonColor: "#15212f",
    toast: true,
    showConfirmButton: true,
    confirmButtonText: "De acuerdo",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const InfoFaltanteModificacion = () => {
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
    if (err === 0) {
      setOpenDialogModificacion(!openDialogModificacion);
    } else {
      Toast.fire({
        showConfirmButton: false,
        buttonsStyling: true,
        html: `
        <div>
          <h2  >Se han encontrado los siguientes errores:</h2>
          <div style="text-align: left;   color:red;  overflow:auto;">
            *</strong>${errores.join("<br><br><strong>*</strong>")}
          </div>
          <div  style="text-align: right;">

            <Button style="float:right;
            cursor: pointer;
            background-color:#15212f;
            height:30px;
            color:white;
            border-radius: 0.8vh;
            font-size:100%;
            textTransform:capitalize";
            "  >Cerrar</Button>

          </div>
        </div>`,
      });
    }
  };

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
      // importe = item.disposicion.importe;
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
        "Sección <strong>Condiciones Financieras</strong>:Agregar al menos una Condicion Financiera."
      );
    }

    if (TasaDeInteres[0] === undefined || TasaDeInteres[0].tasa === "") {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agregar al menos una Tasa De Interés."
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
        "Sección <strong>Condiciones Financieras</strong>:Ingrese el Número de pagos."
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
        "Sección <strong>Condiciones Financieras</strong>:Agregar al menos una comision."
      );
    }

    if (
      state.reglasAplicables[0] === undefined ||
      state.reglasAplicables[0] === ""
    ) {
      errores.push(
        "Sección <strong>Solicitud de Inscripción</strong>:Agregar al menos una regla."
      );
    }

    if (err === 0) {
      setOpenDialogEnviar(!openDialogEnviar);
    } else {
      Toast.fire({
        showConfirmButton: false,
        buttonsStyling: true,
        html: `
        <div>
        <h2  >Se han encontrado los siguientes errores:</h2>
        <div style="text-align: left;   color:red;  overflow:auto;">
          *</strong>${errores.join("<br><br><strong>*</strong>")}
        </div>
        <div  style="text-align: right;">

            <Button style="float:right;
            cursor: pointer;
            background-color:#15212f;
            height:30px;
            color:white;
            border-radius: 0.8vh;
            font-size:100%;
            textTransform:capitalize";
            "  >Cerrar</Button>
            
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

  // const [botonComentarios, setBotonComentarios] = useState("hola")

  // const labelBotonComentarios = () => {

  //   //POR HACER
  //       // let cont =comentarios.length||0;
  //       // comentarios?.map((elemento)=>{
  //       //   !(/^[\s]*$/.test(elemento?.Comentario) ) ? null:cont--
  //       // })

  //       // cont===0?setBotonComentarios("Enviar sin comentarios"):setBotonComentarios("Enviar con comentarios")

  // }

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
                        InfoFaltanteModificacion();
                      }}
                    >
                      Solicitar Modificación
                    </Button>
                  ) : null}

                  <Button
                    sx={queries.buttonContinuarSolicitudInscripcion}
                    onClick={() => {
                      setOpenDialogBorrador(!openDialogBorrador);
                    }}
                  >
                    Guardar Borrador
                  </Button>

                  <Button
                    sx={queries.buttonContinuarSolicitudInscripcion}
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
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
