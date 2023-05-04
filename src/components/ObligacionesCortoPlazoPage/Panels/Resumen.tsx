import {
  Grid,
  TextField,
  Divider,
  Autocomplete,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCortoPlazoStore } from "../../../store/main";
import { queries } from "../../../queries";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import { format } from "date-fns";

export function Resumen() {
  // Encabezado
  const tipoDocumento: string = useCortoPlazoStore(
    (state) => state.tipoDocumento
  );
  const changeTipoDocumento: Function = useCortoPlazoStore(
    (state) => state.changeTipoDocumento
  );
  const tiposEntePublicoMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.entesPublicosMap
  );
  const fetchEntesPublicos: Function = useCortoPlazoStore(
    (state) => state.fetchEntesPublicos
  );
  const tipoEntePublico: string = useCortoPlazoStore(
    (state) => state.tipoEntePublico
  );
  const changeTipoEntePublico: Function = useCortoPlazoStore(
    (state) => state.changeTipoEntePublico
  );
  const solicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.solicitanteAutorizado
  );
  const changeSolicitanteAutorizado: Function = useCortoPlazoStore(
    (state) => state.changeSolicitanteAutorizado
  );
  const organismo: string = useCortoPlazoStore((state) => state.organismo);
  const changeOrganismo: Function = useCortoPlazoStore(
    (state) => state.changeOrganismo
  );
  const organismosMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.organismosMap
  );
  const fetchOrganismos: Function = useCortoPlazoStore(
    (state) => state.fetchOrganismos
  );
  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.fechaContratacion
  );
  const changeFechaContratacion: Function = useCortoPlazoStore(
    (state) => state.changeFechaContratacion
  );
  const cargoSolicitante: string = useCortoPlazoStore(
    (state) => state.cargoSolicitante
  );
  const changeCargoSolicitante: Function = useCortoPlazoStore(
    (state) => state.changeCargoSolicitante
  );

  //////////////////////////////////////////////////////////////////////////////
  // Informacion general

  const institucion: string = useCortoPlazoStore((state) => state.institucion);

  const destino: string = useCortoPlazoStore((state) => state.destino);
  const changeDestino: Function = useCortoPlazoStore(
    (state) => state.changeDestino
  );

  const plazoDias: number = useCortoPlazoStore((state) => state.plazoDias);
  const changePlazoDias: Function = useCortoPlazoStore(
    (state) => state.changePlazoDias
  );
  const montoOriginal: number = useCortoPlazoStore(
    (state) => state.montoOriginal
  );

  const fechaVencimiento: string = useCortoPlazoStore(
    (state) => state.fechaVencimiento
  );

  const denominacion: string = useCortoPlazoStore(
    (state) => state.denominacion
  );

  const obligadoSolidarioAval: string = useCortoPlazoStore(
    (state) => state.obligadoSolidarioAval
  );

  const entePublicoObligado: string = useCortoPlazoStore(
    (state) => state.entePublicoObligado
  );
  const tipoEntePublicoObligado = useCortoPlazoStore.getState().tipoEntePublico;
  /////////////////////////////////////////////////////////////////////////////
  ///Condiciones Financieras
  ///Disposicion/pagos de capital
  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicionFechaContratacion
  );
  const changeDisposicionFechaContratacion: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionFechaContratacion
  );
  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicionImporte
  );
  const changeDisposicionImporte: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionImporte
  );
  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.capitalFechaPrimerPago
  );
  const changeCapitalFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalFechaPrimerPago
  );
  const capitalPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.capitalPeriocidadPago
  );
  const changeCapitalPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalPeriocidadPago
  );
  const periocidadDePagoMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.periocidadDePagoMap
  );
  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.capitalNumeroPago
  );
  const changeCapitalNumeroPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalNumeroPago
  );
  const tasaFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.tasaFechaPrimerPago
  );
  const changeTasaFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeTasaFechaPrimerPago
  );
  const tasaPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.tasaPeriocidadPago
  );
  const changeTasaPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.changeTasaPeriocidadPago
  );
  const tasaReferenciaMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.tasaReferenciaMap
  );
  const tasaReferencia: string = useCortoPlazoStore(
    (state) => state.tasaReferencia
  );
  const changeTasaReferencia: Function = useCortoPlazoStore(
    (state) => state.changeTasaReferencia
  );
  const sobreTasa: string = useCortoPlazoStore((state) => state.sobreTasa);
  const changeSobreTasa: Function = useCortoPlazoStore(
    (state) => state.changeSobreTasa
  );
  const tasaDiasEjercicio: string = useCortoPlazoStore(
    (state) => state.tasaDiasEjercicio
  );

  ///Comisiones/tasa efectiva
  const efectivaFechaContratacion: string = useCortoPlazoStore(
    (state) => state.efectivaFechaContratacion
  );
  const efectivaPorcentajeFijo: number = useCortoPlazoStore(
    (state) => state.efectivaPorcentajeFijo
  );
  const tipoComision: string = useCortoPlazoStore(
    (state) => state.tipoComision
  );
  const efectivaMontoFijo: number = useCortoPlazoStore(
    (state) => state.efectivaMontoFijo
  );

  const efectivaDiasEjercicio: string = useCortoPlazoStore(
    (state) => state.efectivaDiasEjercicio
  );

  const tasaEfectiva: string = useCortoPlazoStore(
    (state) => state.tasaEfectiva
  );

  const [radioValue, setRadioValue] = React.useState("fixedPercentage");
  return (
    <Grid item container>
      <Grid
        item
        container
        flexDirection="row"
         mt={{ sm: 0, md: 0, lg: 0 }}
        // ml={{ sm: 10, md: 7, lg: 0 }}
        
        spacing={{ xs: 2, md: 2, lg: 4 }}
        sx={{
          justifyContent: "space-evenly",
          display: "flex",
          alignItems: "flex-start",
          
        }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <Grid>
            <Typography sx={queries.bold_text}>Encabezado</Typography>
            <Grid
              sx={{
                flexDirection: "row",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
                fontSize: "12px",
                //border: "1px solid"
                
              }}
            >
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tipo de Documento: {tipoDocumento}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tipo de Ente Público: {tipoEntePublico}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Solicitante Autorizado: {solicitanteAutorizado}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Municipio u Organismo: {organismo}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Contratacion: " +
                    format(new Date(fechaContratacion), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Cargo del Solicitante: {cargoSolicitante}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
            </Grid>
          </Grid>

          <Grid mt={5}>
            <Typography sx={queries.bold_text}>INFORMACIÓN GENERAL</Typography>

            <Grid
              sx={{
                flexDirection: "row",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
                fontSize: "12px",
              }}
            >
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Contratación: " +
                    format(new Date(fechaContratacion), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Vencimiento: " +
                    format(new Date(fechaVencimiento), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Plazo(Días): {plazoDias}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Destino: {destino}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Monto Original Contratado: {montoOriginal}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Denominación: {denominacion}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Institución Financiera: {institucion}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Obligado Solidario / Aval: {obligadoSolidarioAval}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tipo de ente público obligado:{" "}
                  {obligadoSolidarioAval === "No aplica "
                    ? "No aplica"
                    : tipoEntePublicoObligado}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Ente público obligado: {entePublicoObligado}
                </Typography>
                <Divider color="lightGrey"></Divider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <Grid>
            <Typography sx={queries.bold_text}>
              CONDICIONES FINANCIERAS
            </Typography>

            <Grid
              sx={{
                flexDirection: "row",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
                fontSize: "12px",
                //border: "1px solid"
              }}
            >
              <Divider color="lightGrey"></Divider>

              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Contratación: " +
                    format(new Date(fechaContratacion), "yyyy-MM-dd")}
                </Typography>
              </Grid>

              <Divider color="lightGrey"></Divider>

              <Grid>
                <Typography sx={queries.medium_text}>
                  Importe: {disposicionImporte}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Primer Pago: " +
                    format(new Date(capitalFechaPrimerPago), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Periocidad de Pago: {capitalPeriocidadPago}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Número de Pago: {capitalNumeroPago}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Primer Pago(Tasa de interés): " +
                    format(new Date(tasaFechaPrimerPago), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Periocidad de Pago(Tasa de interés): {tasaPeriocidadPago}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tasa de Referencia: {tasaReferencia}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Sobre Tasa: {sobreTasa}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Días del Ejercicio: {tasaDiasEjercicio}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  {"Fecha de Contratación(Comisiones): " +
                    format(new Date(efectivaFechaContratacion), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tipo de Comisión: {tipoComision}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Periocidad de Pago(Comisiones): {tipoComision}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Porcentaje o Monto:{" "}
                  {efectivaPorcentajeFijo.toString() === " "
                    ? "Monto " + efectivaMontoFijo
                    : "Porcentaje " + efectivaPorcentajeFijo}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Dias del Ejercicio: {efectivaDiasEjercicio}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
              <Grid>
                <Typography sx={queries.medium_text}>
                  Tasa Efectiva: {tasaEfectiva}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
            </Grid>
          </Grid>

          

        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          
            

          <Grid sx={{alignItems: "flex-start"}}>
            <Typography sx={queries.bold_text}>Proximo resumen</Typography>

            <Grid
              sx={{
                flexDirection: "row",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
                fontSize: "12px",
                //border: "1px solid"
              }}
            >
              <Divider color="lightGrey"></Divider>

              <Grid>
                <Typography sx={queries.medium_text}>
                  Denominación: {denominacion}
                </Typography>
              </Grid>

              <Divider color="lightGrey"></Divider>

              <Grid>
                <Typography sx={queries.medium_text}>
                  Denominación: {denominacion}
                </Typography>
              </Grid>
              <Divider color="lightGrey"></Divider>
            </Grid>
          </Grid>

        </Grid>

      </Grid>
    </Grid>
  );
}
