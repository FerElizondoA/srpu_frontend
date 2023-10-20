import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { queries } from "../../../queries";
import { useState } from "react";
import { DatosGMandatos } from "../../../store/Mandatos/mandato";
interface HeadSelect {
  label: string;
}

const CatalogoMecanismo: HeadSelect[] = [
  {
    label: "Fideicomiso",
  },
  {
    label: "Instrucciones irrevocable",
  },
  {
    label: "Mandato",
  },
];

export function DatosGeneralesMandatos() {
  const numeroMandato: string = useMandatoStore(
    (state) => state.numeroMandato
  );

  const changeNumeroMandato: Function = useMandatoStore(
    (state) => state.changeNumeroMandato
  );

  const setDatosGMandatos: Function = useMandatoStore(
    (state) => state.setDatosGMandatos
  )

  const datosGMandatos: DatosGMandatos = useMandatoStore(
    (state) => state.datosGMandatos
  )



  return (
    <Grid container
      width={"100%"}
      height={{ xs: "20rem", sm: "30rem" }}
      flexDirection={"column"}
      justifyContent={{ xs: "center", sm: "space-around" }}
    >
      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Numero de mandato
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Numero de mandato"}
            // title={"Numero de mandato"}
            onChange={(v) => {
              changeNumeroMandato(v.target.value);
            }}
            value={numeroMandato}
          />
        </Grid>

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Mecanismo o vehículo de pago
          </InputLabel>

          <TextField
            value={datosGMandatos.mecanismoPago}
            fullWidth
            variant="standard"
            disabled
          />
        </Grid>
      </Grid >

      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Municipio / Organismo Mandante
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Municipio mandante"}
            // title={"Municipio mandante"}
            disabled
            value={datosGMandatos.MunicipioOrganismoMandante}
          />
        </Grid>

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Tipo ente publico obligado
          </InputLabel>

          <TextField
            fullWidth
            variant="standard"
            disabled
            value={datosGMandatos.TipoEntePublicoObligado}
          />
        </Grid>
      </Grid>

    </Grid>
  );
}
