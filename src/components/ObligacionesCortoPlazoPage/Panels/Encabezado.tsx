import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect,useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { queries } from "../../../queries";
import { IEncabezado } from "../Interfaces/CortoPlazo/IEncabezado";
import FormControl from "@mui/material/FormControl/FormControl";
import { logRoles } from "@testing-library/react";
import { getMunicipiosUOrganismos, getTipoEntePublico } from "../APIS/APISEncabezado";
import { IMunicipioUOrganizacion, ITipoEntePublico } from "../Interfaces/CortoPlazo/Encabezado/IListEncabezado";


export function Encabezado({
  encabezado,
  setEncabezado,
}: {
  encabezado: IEncabezado;
  setEncabezado: Function;
}) {

  const [municipiosUOrganismos,setMunicipiosUOrganismos]=useState<Array<IMunicipioUOrganizacion>>([]);
  const [tipoEntePublico,setTipoEntePublico]=useState<Array<ITipoEntePublico>>([]);
  

  useEffect(() => {
    getMunicipiosUOrganismos(setMunicipiosUOrganismos);
    getTipoEntePublico(setTipoEntePublico);
  }, [])

  const setSolicitanteAutorizado = (e: any) => {
    let aux = encabezado;
    aux.solicitanteAutorizado = e.target.value;
    setEncabezado({ ...aux });
  };

  const setCargoSolicitante = (e: any) => {
    let aux = encabezado;
    aux.cargoSolicitante = e.target.value;
    setEncabezado({ ...aux });
  };

  const fechaActual = new Date();
  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 10, lg: 20 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel >Tipo de Documento</InputLabel>
          <TextField
            InputProps={{ readOnly: true }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              width: "100%", bgcolor: null
            }}
            value={"Obligación a corto plazo"}
            variant="standard"

          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
        <FormControl required variant="standard" fullWidth>
            <InputLabel sx={queries.medium_text}>Tipo de Ente Publico</InputLabel>
            <Select
              id="MunicipiosuOrganismos"
              value={encabezado.tipoEntePublico}
              onChange={(v) => {
                let aux = encabezado;
                aux.tipoEntePublico = v.target.value;
                setEncabezado({ ...aux });
              }}
              sx={{ display: "flex", pt: 1 }}
            >
              {tipoEntePublico.map((tipo) => (
                  <MenuItem key={tipo.Id} value={tipo.Id}>
                    {tipo.Tipo}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
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
            value={encabezado.solicitanteAutorizado}
            onChangeCapture={setSolicitanteAutorizado}
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
          <FormControl required variant="standard" fullWidth>
            <InputLabel sx={queries.medium_text}>Municipio u Organismo</InputLabel>

            <Select
              id="MunicipiosuOrganismos"
              value={encabezado.municipioOrganismo}
              onChange={(v) => {
                let aux = encabezado;
                aux.municipioOrganismo = v.target.value;
                setEncabezado({ ...aux });
              }}
              sx={{ display: "flex", pt: 1 }}
            >
              {municipiosUOrganismos.map((municipio) => (
                  <MenuItem key={municipio.Id} value={municipio.Id}>
                    {municipio.EntePublicoObligado}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Solicitud
            </InputLabel>
            <TextField
              InputProps={{ readOnly: true }}
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: "1.5vw",
                width: "100%", bgcolor: null
              }}
              value={fechaActual.getDay() + "/" + fechaActual.getMonth() + "/" + fechaActual.getFullYear()}
              variant="standard"

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
            value={encabezado.cargoSolicitante}
            onChangeCapture={setCargoSolicitante}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}