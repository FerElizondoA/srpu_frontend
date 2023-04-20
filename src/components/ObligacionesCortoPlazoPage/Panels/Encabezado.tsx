import * as React from "react";
import { Grid, TextField, InputLabel, Autocomplete } from "@mui/material";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import { subDays } from "date-fns/esm";

import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";

export function Encabezado() {
  const tipoDocumento: string = useCortoPlazoStore(
    (state) => state.tipoDocumento
  );
  const changeTipoDocumento: Function = useCortoPlazoStore(
    (state) => state.changeTipoDocumento
  );
  const fetchEntesPublicos: Function = useCortoPlazoStore(
    (state) => state.fetchEntesPublicos
  );
  const entesPublicosMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.entesPublicosMap
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
  const organismosMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.organismosMap
  );
  const organismo: string = useCortoPlazoStore((state) => state.organismo);
  const changeOrganismo: Function = useCortoPlazoStore(
    (state) => state.changeOrganismo
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

  React.useEffect(() => {
    fetchEntesPublicos();
    fetchOrganismos();

    if (localStorage.getItem("EntePublicoObligado")?.length !== 0) {
      changeTipoEntePublico(
        entesPublicosMap.get(localStorage.getItem("TipoEntePublicoObligado")),
        localStorage.getItem("TipoEntePublicoObligado")
      );
    }

    if (localStorage.getItem("EntePublicoObligado")?.length !== 0) {
      changeOrganismo(
        organismosMap.get(localStorage.getItem("EntePublicoObligado")),
        localStorage.getItem("EntePublicoObligado")
      ); 
    }
    if (localStorage.getItem("NombreUsuario")?.length !== 0) {
      // change(
      //   NombreUsuario.get(localStorage.getItem("NombreUsuario")),
      //   localStorage.getItem("NombreUsuario")
      // );

    
    }
    changeSolicitanteAutorizado(localStorage.getItem("NombreUsuario"));
  });

  if (localStorage.getItem("Puesto")?.length !== 0) {
    changeCargoSolicitante(
        //entesPublicosMap.get(localStorage.getItem("Puesto")),
        localStorage.getItem("Puesto")
      );
    }
  let usuario = localStorage.getItem("NombreUsuario")
 // useCortoPlazoStore.setState({ solicitanteAutorizado: usuario });

  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 10, lg: 10 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>

          <TextField
            fullWidth
            value={tipoDocumento}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>

          <TextField
            fullWidth
            value={solicitanteAutorizado || localStorage.getItem("NombreUsuario")}
            variant="standard"
            onChange={(text) => {
              changeSolicitanteAutorizado(
                localStorage.getItem("NombreUsuario")
              );
            }}
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Cargo del Solicitante
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            
            value={cargoSolicitante ||localStorage.getItem("Puesto") }
            onChange={(text) => changeCargoSolicitante(text.target.value)}
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
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
        mt={{ xs: 10, sm: 10, md: 20, lg: 10 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Ente Público</InputLabel>

          <TextField
            fullWidth
            value={
              tipoEntePublico || localStorage.getItem("TipoEntePublicoObligado")
            }
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Municipio u Organismo
          </InputLabel>

          <TextField
            fullWidth
            value={organismo || localStorage.getItem("EntePublicoObligado")}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaContratacion)}
              onChange={(date) => changeFechaContratacion(date?.toString())}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
