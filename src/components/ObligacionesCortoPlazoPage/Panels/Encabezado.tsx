import * as React from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Autocomplete
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateInput } from "../../CustomComponents";

export function Encabezado(){
    
    const tipoDocumento: string = useCortoPlazoStore(state => state.tipoDocumento);
    const changeTipoDocumento: Function = useCortoPlazoStore(state => state.changeTipoDocumento);
    const tiposEntePublicoCatalog: string[] = useCortoPlazoStore(state => state.entesPublicosCatalog);
    const fetchEntesPublicos: Function = useCortoPlazoStore(state => state.fetchEntesPublicos);
    const tipoEntePublico: string = useCortoPlazoStore(state => state.tipoEntePublico);
    const changeTipoEntePublico: Function = useCortoPlazoStore(state => state.changeTipoEntePublico);
    const solicitanteAutorizado: string = useCortoPlazoStore(state => state.solicitanteAutorizado);
    const changeSolicitanteAutorizado: Function = useCortoPlazoStore(state => state.changeSolicitanteAutorizado);
    const organismo: string = useCortoPlazoStore(state => state.organismo);
    const changeOrganismo: Function = useCortoPlazoStore(state => state.changeOrganismo);
    const organismosCatalog: string[] = useCortoPlazoStore(state => state.organismosCatalog);
    const fetchOrganismos: Function = useCortoPlazoStore(state => state.fetchOrganismos);
    const fechaContratacionEncabezado: string = useCortoPlazoStore(state => state.fechaContratacionEncabezado);
    const changeFechaContratacionEncabezado: Function = useCortoPlazoStore(state => state.changeFechaContratacionEncabezado);
    const cargoSolicitante: string = useCortoPlazoStore(state => state.cargoSolicitante);
    const changeCargoSolicitante: Function = useCortoPlazoStore(state => state.changeCargoSolicitante);


    React.useEffect(() => {
      fetchEntesPublicos();
      fetchOrganismos();
    });

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
            <Autocomplete
              fullWidth
              value={tipoDocumento}
              onChange={(event: any, text: string | null) =>
                changeTipoDocumento(text)
              }
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
            />
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de Ente Público
            </InputLabel>
            <Autocomplete
              fullWidth
              value={tipoEntePublico}
              onChange={(event: any, text: string | null) =>
                changeTipoEntePublico(text)
              }
              options={tiposEntePublicoCatalog}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
            />
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Solicitante Autorizado
            </InputLabel>
            <TextField
              fullWidth
              value={solicitanteAutorizado}
              variant="standard"
              onChange={(text) => {
                changeSolicitanteAutorizado(text.target.value);
              }}
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
          mt={{ xs: 10, sm: 10, md: 20, lg: 10 }}
          ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
          spacing={{ xs: 2, md: 5, lg: 10 }}
        >
          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Municipio u Organismo
            </InputLabel>
            <Autocomplete
              fullWidth
              value={organismo}
              onChange={(event: any, text: string | null) =>
                changeOrganismo(text)
              }
              options={organismosCatalog}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
            />
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Contratación
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slots={{
                  textField: DateInput
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3.5} md={3.5} lg={3}>
            <InputLabel sx={queries.medium_text}>
              Cargo del Solicitante
            </InputLabel>
            <TextField
              fullWidth
              variant="standard"
              value={cargoSolicitante}
              onChange={(text) => changeCargoSolicitante(text.target.value)}
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
      </Grid>
    );
}
