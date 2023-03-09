import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";

import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { queries } from "../../../queries";
import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";

interface EncabezadoCS {
  ente_publico: string;
  //tipo_documento: string;
}

export function Encabezado({ CS }: { CS: string }) {
  const [encabezado, setEncabezado] = useState<Array<EncabezadoCS>>([]);

  const [entepublico, setEntePublico] = useState(
    CS === "" ? "" : JSON.parse(CS).encabezado.entepublico || ""
  );

  const [catalogoEntePublico, setCatalogoEntePublico] = useState([
    { IdEntePublico: "0", EntePublicoObligado: "" },
  ]);

  const enCambioEntePublico = (Id: string, EnteP: string) => {
    setEntePublico(EnteP);
    getDestino(Id);
  };

  const getDestino = (id: string) => {
    axios

      .get("http://10.200.4.199:8000/api/get-entePublicoObligado", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEntePublico(r.data.data);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    setEncabezado([
      {
        ente_publico: entepublico,
      },
    ]);
  }, [entepublico]);

  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 5, lg: 5 }}
        ml={{ xs: 5, sm: 2, md: 7, lg: 30 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <Autocomplete
            disablePortal
            size="small"
            options={catalogoEntePublico}
            getOptionLabel={(option) => option.EntePublicoObligado || ""}
            value={{
              IdEntePublico: catalogoEntePublico[0].IdEntePublico,
              EntePublicoObligado: entepublico,
            }}
            //size="small"
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.IdEntePublico}>
                  <p style={queries.medium_text}>
                    {option.EntePublicoObligado}
                  </p>
                </li>
              );
            }}
            renderInput={(params) => (
              <Grid container>
                <Grid item>
                <InputLabel sx={queries.medium_text}>Tipo de Ente Público</InputLabel>
                  <TextField
                    {...params}
                    variant="standard"
                    style={queries.medium_text}
                    sx={queries.medium_text}
                    fullWidth
                  ></TextField>
                </Grid>
              </Grid>
            )}
            onChange={(event, value) =>
              enCambioEntePublico(
                value?.IdEntePublico as string,
                (value?.EntePublicoObligado as string) || ""
              )
            }
            isOptionEqualToValue={(option, value) =>
              option.IdEntePublico === value.IdEntePublico
            }
          />
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
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 5, lg: 20 }}
        ml={{ xs: 5, sm: 2, md: 7, lg: 30 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Entidad Federativa</InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Contratación
            </InputLabel>
            <DateField
              fullWidth
              format="DD-MM-YYYY"
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "2ch",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
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
