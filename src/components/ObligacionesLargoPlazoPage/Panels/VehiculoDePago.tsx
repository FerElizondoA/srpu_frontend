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

import { format } from "date-fns";
import { IRegistro } from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
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

  return (
    <Grid container direction={"column"} justifyContent={"space-around"}>
      <Grid
        container
        width={"100%"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid item xs={10} sm={4.5} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Mecanismo o vehículo de pago
          </InputLabel>
          <FormControl fullWidth>
            <Select
              value={tipoMecanismoVehiculoPago}
              fullWidth
              variant="standard"
              onChange={(e) => {
                setMecanismoVehiculoPago({
                  Id: "",
                  NumeroRegistro: "",
                  FechaRegistro: "",

                  TipoFideicomiso: "",
                  Fiduciario: "",
                  Fideicomisario: "",

                  Mandatario: "",
                  Mandante: "",
                  TipoEntePublicoObligado: "",

                  CLABE: "",
                  Banco: "",
                  EntePublicoObligado: "",
                  // TipoEntePublicoObligado: "",

                  TipoMovimiento: "",
                });
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

        <Grid item xs={10} sm={4.5} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Identificador</InputLabel>
          <Autocomplete
            disabled={tipoMecanismoVehiculoPago.length < 1}
            disableClearable
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

      {mecanismoVehiculoPago.NumeroRegistro && (
        <Grid
          container
          mt={2}
          p={4}
          border={"1px solid black"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "95%",
            alignSelf: "center",
            maxHeight: "60vh",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".5vw",
              height: "1vh",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}
        >
          <InputLabel sx={{ ...queries.bold_text, mb: 2 }}>
            {tipoMecanismoVehiculoPago}
          </InputLabel>

          {tipoMecanismoVehiculoPago === "Fideicomiso" && (
            <Grid
              container
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                justifyItems: "center",
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  alignItems: "center",
                  alignContent: "center",
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
                        inputProps={{
                          sx: {
                            fontSize: "0.7rem",
                          },
                        }}
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
                        inputProps={{
                          sx: {
                            fontSize: "0.7rem",
                          },
                        }}
                        value={fideicomisario.ordenFideicomisario.Descripcion}
                      />
                    )
                  )}
              </Grid>
            </Grid>
          )}

          {tipoMecanismoVehiculoPago === "Mandato" && (
            <Grid container justifyContent={"center"}>
              <Grid
                sx={{
                  width: "45%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  alignContent: "center",
                }}
              >
                <Typography>Fecha del Mandato</Typography>
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
                <Typography>Tipo de Ente Público Obligado</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.TipoEntePublicoObligado}
                />
                <Typography>Mandatario</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.Mandatario}
                />
                <Typography>Organismo / Municipio Mandante</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.Mandante}
                />
              </Grid>
            </Grid>
          )}

          {tipoMecanismoVehiculoPago === "Instrucción Irrevocable" && (
            <Grid container justifyContent={"center"}>
              <Grid
                sx={{
                  width: "45%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  alignContent: "center",
                }}
              >
                <Typography>Banco</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.Banco}
                />
                <Typography>CLABE</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.CLABE}
                />
                <Typography>Fecha de la Instrucción</Typography>
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
                <Typography>Tipo de Ente Público Obligado</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.TipoEntePublicoObligado}
                />
                <Typography>Ente Público Obligado</Typography>
                <TextField
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.EntePublicoObligado}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
