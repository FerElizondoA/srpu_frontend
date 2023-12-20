/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { queries } from "../../../queries";

import {
  IMecanismoVehiculoPago,
  IRegistro,
} from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { format } from "date-fns";
import { IFideicomisario } from "../../../store/Fideicomiso/fideicomiso";

interface Head {
  label: string;
}

const CatalogoMecanismo: Head[] = [
  {
    label: "Fideicomiso",
  },
  {
    label: "Mandato",
  },
  {
    label: "Instrucción Irrevocable",
  },
];

export function VehiculoDePago() {
  const getMecanismosVehiculosPago: Function = useLargoPlazoStore(
    (state) => state.getMecanismosVehiculosPago
  );
  const tablaMecanismoVehiculoPago: IRegistro[] = useLargoPlazoStore(
    (state) => state.tablaMecanismoVehiculoPago
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );
  const setTipoMecanismoVehiculoPago: Function = useLargoPlazoStore(
    (state) => state.setTipoMecanismoVehiculoPago
  );

  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );
  const setMecanismoVehiculoPago: Function = useLargoPlazoStore(
    (state) => state.setMecanismoVehiculoPago
  );

  // const query = {
  //   movil: useMediaQuery("(min-width: 0px) and (max-width: 479px)"),
  //   tabletaMini: useMediaQuery("(min-width: 480px) and (max-width: 767px)"),
  //   tabletaGrande: useMediaQuery("(min-width: 768px) and (max-width: 1139px)"),
  //   monitorLaptop: useMediaQuery("(min-width: 1140px) and (max-width: 1399px)"),
  //   MonitorEscritorio: useMediaQuery("(min-width: 1870px) "),
  // };

  return (
    <Grid container direction={"column"} justifyContent={"space-around"}>
      <Grid
        container
        width={"100%"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid xs={10} sm={4.5} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Mecanismo o vehículo de pago
          </InputLabel>
          <FormControl fullWidth>
            <Select
              value={tipoMecanismoVehiculoPago}
              fullWidth
              variant="standard"
              onChange={(e) => {
                getMecanismosVehiculosPago(e.target.value, () => {});
                setTipoMecanismoVehiculoPago(e.target.value);
              }}
            >
              {CatalogoMecanismo.map((item, index) => (
                <MenuItem value={item.label} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={10} sm={4.5} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Identificador</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={tablaMecanismoVehiculoPago}
            getOptionLabel={(option) => option.NumeroRegistro}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.NumeroRegistro}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setMecanismoVehiculoPago(text);
            }}
            value={mecanismoVehiculoPago}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
          />
        </Grid>
      </Grid>

      {mecanismoVehiculoPago.FechaRegistro && (
        <Grid container direction={"column"} alignItems={"center"} mt={2}>
          <InputLabel sx={queries.bold_text}>
            {tipoMecanismoVehiculoPago}
          </InputLabel>

          <Grid
            container
            sx={{
              width: "80%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              justifyItems: "center",
            }}
          >
            <Grid
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                alignItems: "center",
              }}
            >
              <Typography>Tipo de Fideicomiso</Typography>
              <TextField
                inputProps={{
                  sx: {
                    fontSize: "0.7rem",
                  },
                }}
                size="small"
                value={mecanismoVehiculoPago.TipoFideicomiso}
              />
              <Typography>Fecha del Fideicomiso</Typography>
              <TextField
                inputProps={{
                  sx: {
                    fontSize: "0.7rem",
                  },
                }}
                size="small"
                value={format(
                  new Date(mecanismoVehiculoPago.FechaRegistro),
                  "dd/MM/yyyy"
                )}
              />
              <Typography>Fiduciario</Typography>
              <TextField
                inputProps={{
                  sx: {
                    fontSize: "0.7rem",
                  },
                }}
                size="small"
                value={mecanismoVehiculoPago.Fiduciario}
              />
            </Grid>

            <Grid item sx={{ width: "80%" }}>
              <InputLabel sx={queries.bold_text}>Fideicomisario</InputLabel>
              {mecanismoVehiculoPago.Fideicomisario &&
                JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                  (fideicomisario: IFideicomisario, index: number) => (
                    <TextField
                      key={index}
                      size="small"
                      sx={{ width: "100%" }}
                      value={fideicomisario.fideicomisario.Descripcion}
                    />
                  )
                )}
            </Grid>

            <Grid>
              <InputLabel sx={queries.bold_text}>
                Orden Fideicomisario
              </InputLabel>
              {mecanismoVehiculoPago.Fideicomisario &&
                JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                  (fideicomisario: IFideicomisario, index: number) => (
                    <TextField
                      key={index}
                      size="small"
                      sx={{ width: "100%" }}
                      value={fideicomisario.ordenFideicomisario.Descripcion}
                    />
                  )
                )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
