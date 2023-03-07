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
import { getMunicipiosUOrganismos } from "../APIS/APISEncabezado";
import FormControl from "@mui/material/FormControl/FormControl";

export interface IMunicipioUOrganizacion {
  Id: string;
  EntePublicoObligado: string;
  Tipo: string;
  IdTipoEntePublico: string;
  FechaCreacion: string;
  CreadoPor: number;
  UltimaModificacion: string;
  ModificadoPor: number;
  Deleted: number;
}

export function Encabezado({
  encabezado,
  setEncabezado,
}: {
  encabezado: IEncabezado;
  setEncabezado: Function;
}) {

  const [municipiosUOrganismos,setMunicipiosUOrganismos]=useState<Array<IMunicipioUOrganizacion>>([]);

  useEffect(() => {
    let aux  : IMunicipioUOrganizacion []
    aux =  []
    setMunicipiosUOrganismos(aux)
    
  }, [])
  


  const setsolicitanteAutorizado = (e: any) => {
    let aux = encabezado;
    aux.solicitanteAutorizado = e.target.value;
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
          {/* 
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select> */}
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
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público
          </InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
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
            onChangeCapture={setsolicitanteAutorizado}
          />

          {/* <FormControl required variant="standard" fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Tipo de Usuario
              </InputLabel>

              <Select
                id="tipousuario"
                value={tipousuario}
                onChange={(v) => setTipoUsuario(v.target.value) }
                sx={{ display: "flex", pt: 1 }}
              >
                {usertypes.map((types) => (
                  <MenuItem key={types.Id} value={types.Id}>
                    {types.Descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
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
              value={encabezado.solicitanteAutorizado}
              onChange={(v) => {
                let aux = encabezado;
                aux.solicitanteAutorizado = v.target.value;
                setEncabezado({ ...aux });
              }}
              sx={{ display: "flex", pt: 1 }}
            >
              {/* {usertypes.map((types) => (
                  <MenuItem key={types.Id} value={types.Id}>
                    {types.Descripcion}
                  </MenuItem>
                ))} */}
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
            value={encabezado.solicitanteAutorizado}
            onChangeCapture={setsolicitanteAutorizado}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}