/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, InputLabel, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { useEffect } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { DatosGeneralesMandato } from "../../../store/Mandatos/mandato";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IDatosMandatos } from "../../../screens/fuenteDePago/Mandatos";

export function DatosGeneralesMandatos() {
  const setDatosGenerales: Function = useMandatoStore(
    (state) => state.setDatosGenerales
  );

  const datosGenerales: DatosGeneralesMandato = useMandatoStore(
    (state) => state.datosGenerales
  );

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const tablaMandatos: IDatosMandatos[] = useMandatoStore(
    (state) => state.tablaMandatos
  );

  useEffect(() => {
    getTipoEntePublicoObligado();
    getOrganismos();
  }, []);

  useEffect(() => {
    if (catalogoOrganismos.length > 0) {
      setDatosGenerales({
        ...datosGenerales,
        mandante: {
          Id: localStorage.getItem("IdEntePublicoObligado")!,
          Descripcion: localStorage.getItem("EntePublicoObligado")!,
        },
        mandatario: catalogoOrganismos?.filter(
          (v) =>
            v?.Descripcion.toUpperCase() ===
            "SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO"
        )[0],
      });
    }
  }, [catalogoOrganismos]);

  return (
    <Grid
      container
      sx={{
        height: "50vh",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
        justifyItems: "center",
        alignItems: "center",
        alignContent: "space-evenly",
      }}
    >
      <Grid sx={{ width: "70%" }}>
        <InputLabel
          error={
            tablaMandatos.filter(
              (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
            ).length > 0
          }
          sx={queries.medium_text}
        >
          Numero de mandato
        </InputLabel>
        <TextField
          error={
            tablaMandatos.filter(
              (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
            ).length > 0
          }
          helperText={
            tablaMandatos.filter(
              (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
            ).length > 0
              ? "Número de mandato ya existente"
              : ""
          }
          fullWidth
          variant="standard"
          value={datosGenerales.numeroMandato}
          onChange={(v) => {
            setDatosGenerales({
              ...datosGenerales,
              numeroMandato: v.target.value,
            });
          }}
        />
      </Grid>

      <Grid
        sx={{
          width: "70%",
        }}
      >
        <InputLabel sx={{ ...queries.medium_text }}>
          Fecha del mandato
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DesktopDatePicker
            value={datosGenerales.fechaMandato}
            onChange={(v) => {
              setDatosGenerales({
                ...datosGenerales,
                fechaMandato: v,
              });
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid sx={{ width: "70%" }}>
        <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>
        <TextField
          value={datosGenerales.mandatario.Descripcion}
          onChange={(v) => {
            setDatosGenerales({
              ...datosGenerales,
              mandatario: { Id: "", Descripcion: "" },
            });
          }}
          fullWidth
          variant="standard"
          disabled
        />
      </Grid>

      <Grid sx={{ width: "70%" }}>
        <InputLabel sx={queries.medium_text}>
          Municipio / Organismo Mandante
        </InputLabel>
        <TextField
          fullWidth
          variant="standard"
          disabled
          value={datosGenerales.mandante.Descripcion}
          onChange={(v) => {
            setDatosGenerales({
              ...datosGenerales,
              mandante: { Id: "", Descripcion: "" },
            });
          }}
        />
      </Grid>
    </Grid>
  );
}
