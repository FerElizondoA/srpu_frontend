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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import Swal from "sweetalert2";
import { ConfirmacionDescargaSolicitud } from "../Dialog/DialogEnviarSolicitud"

export let erroresValidacion: string[] = [];

export function SolicituDeInscripcion() {
  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);
  const [openDialogValidacion, setOpenDialogValidacion] = useState(false);
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

  const InfoFaltante = () => {
    erroresValidacion = [];

    const state = useLargoPlazoStore.getState();
    const solicitud: any = {
      encabezado: state.encabezado,
      MontoOriginalContratado: state.informacionGeneral.monto,
      PlazoDias: state.informacionGeneral.plazo,
      Destino: state.informacionGeneral.destino.Descripcion,
      Denominacion: state.informacionGeneral.denominacion,
      InstitucionFinanciera: state.informacionGeneral.institucionFinanciera.Descripcion,
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
      periodoAdministracion: state.generalGastosCostos.periodoAdministracion, // NO SABEMOS AUN
      gastosAdicionales: state.generalGastosCostos.gastosAdicionales,
      claveInscripcionFinanciamiento:
        state.generalGastosCostos.claveInscripcionFinanciamiento, // NO SABEMOS AUN
      descripcion: state.generalGastosCostos.descripcion,
      monto: state.generalGastosCostos.monto,
      periodoFinanciamiento: state.generalGastosCostos.periodoFinanciamiento, //AUN NO SABEMOS
      saldoVigente: state.generalGastosCostos.saldoVigente, //AUN NO SABEMOS
      montoGastosAdicionales: state.generalGastosCostos.montoGastosAdicionales,
    };

    let destinoCG = "";
    let detalleInversion = "";
    let periodoAdministracion = "";
    let gastosAdicionales = 0;
    let claveInscripcionFinanciamiento = "";
    let descripcion = "";
    let monto = 0;
    let periodoFinanciamiento = "";
    let saldoVigente = 0;
    let montoGastosAdicionales = 0;

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

    for (let i = 0; i < state.tablaGastosCostos.length; i++) {
      const item = state.tablaGastosCostos[0];
      destinoCG = item.destino;
      detalleInversion = item.detalleInversion;
      periodoAdministracion = item.periodoAdministracion;
      gastosAdicionales = item.gastosAdicionales;
      claveInscripcionFinanciamiento = item.claveInscripcionFinanciamiento;
      descripcion = item.descripcion;
      monto = item.monto;
      periodoFinanciamiento = item.periodoFinanciamiento;
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



    if (CostosGastos.destinoCG === undefined || CostosGastos.destinoCG === null ||
      /^[\s]*$/.test(CostosGastos.destinoCG)) {
      err = 1;
      erroresValidacion.push(
        "Sección Información General: Seleccione el Destino en costos y gastos HOLA!?"
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
      setOpenDialogValidacion(!openDialogValidacion)
    }
    //     Toast.fire({
    //         showConfirmButton: false,
    //         buttonsStyling: true,
    //         //     html: `
    //         //     <div>
    //         //     <h2  >Se han encontrado los siguientes errores:</h2>
    //         //     <div style="text-align: left;   color:red;  overflow:auto;">
    //         //       *</strong>${erroresValidacion.join("<br><br><strong>*</strong>")}
    //         //     </div>
    //         //     <div  style="text-align: right;">

    //         //         <Button style="float:right;
    //         //         cursor: pointer;
    //         //         background-color:#15212f;
    //         //         height:30px;
    //         //         color:white;
    //         //         border-radius: 0.8vh;
    //         //         font-size:100%;
    //         //         textTransform:capitalize";
    //         //         "  >Cerrar</Button>

    //         //       </div>
    //         //   </div>`,
    //     });
    // }
  };

  // useEffect(() => {
  //   InfoFaltante()
  // }, []);

  return (
    <Grid>
      <Grid>
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            InfoFaltante();
            // setOpenDialogEnviar(!openDialogEnviar);
          }}
        >
          {localStorage.getItem("Rol") === "Verificador" ? "Finalizar" : "Enviar"}
        </Button>

        <ConfirmacionDescargaSolicitud
          handler={setOpenDialogEnviar}
          openState={openDialogEnviar}
        />

      </Grid>

      <Dialog open={openDialogValidacion}>
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            Favor de revisar los siguientes apartados:
          </Typography>
        </DialogTitle>
        <DialogContent sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".3vw",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#AF8C55",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}>
          {erroresValidacion?.map((item, index) => {
            const division = item.indexOf(":");
            const markedText = division !== -1 ? item.substring(0, division + 1) : item;
            const restText = division !== -1 ? item.substring(division + 1) : "";
            return (
              <Typography
                key={index}
                color={"red"}
              >
                <span style={{ color: "red", fontWeight: "bold" }}>*{markedText}</span>
                <span style={{ color: "red" }}>{restText} <br /><br /> </span>
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
