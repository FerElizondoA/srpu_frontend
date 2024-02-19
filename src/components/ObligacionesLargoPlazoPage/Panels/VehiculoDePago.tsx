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
        mt={2}
      >
        <Grid item xs={10} sm={4.5} md={3} lg={3} xl={3} >
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
                getMecanismosVehiculosPago(e.target.value, () => { });
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
          p={{ xs: 2, sm: 2, md: 4 }}
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
              width: "1vw",
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

          <Grid display={"flex"} justifyContent={"space-evenly"} width={"100%"}>
            {tipoMecanismoVehiculoPago === "Fideicomiso" && (

              <Grid container
                display={"flex"}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Grid container xs={10} sm={10} md={3} lg={4} xl={3}
                  mb={{ xs: 4, sm: 4, md: 0 }}
                  flexDirection={"column"}
                >

                  <Grid item display={"flex"} justifyContent={"center"} >
                    <InputLabel sx={{ ...queries.bold_text, mb: 2 }}>
                      {tipoMecanismoVehiculoPago}
                    </InputLabel>
                  </Grid>

                  <Grid display={"flex"} mb={2}>
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>Tipo de Fideicomiso</Typography>
                    <TextField
                      fullWidth
                      inputProps={{
                        sx: {
                          fontSize: "0.7rem",
                        },
                      }}
                      size="small"
                      value={mecanismoVehiculoPago.TipoFideicomiso}
                    />
                  </Grid>

                  <Grid display={"flex"} mb={2}>
                    {/* <Typography sx={{ width: "85%", fontSize: ".9rem" }}>Fecha del Fideicomiso</Typography> */}
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>Fecha del Fideicomiso</Typography>
                    <TextField
                      fullWidth
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
                  </Grid>

                  <Grid display={"flex"} >
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>Fiduciario</Typography>
                    <TextField
                      fullWidth
                      inputProps={{
                        sx: {
                          fontSize: "0.7rem",
                        },
                      }}
                      size="small"
                      value={mecanismoVehiculoPago.Fiduciario}
                    />
                  </Grid>

                </Grid>

                <Grid container xs={10} sm={10} md={3} lg={3} xl={3}
                  flexDirection={"column"}
                >
                  <Grid item display={"flex"} justifyContent={"center"} mb={2} >
                    <InputLabel sx={queries.bold_text} >
                      Fideicomisario
                    </InputLabel>
                  </Grid>

                  <Grid width={"100%"}>
                    {mecanismoVehiculoPago.Fideicomisario &&
                      JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                        (fideicomisario: IFideicomisario, index: number) => (
                          <Grid mb={2}>
                            <TextField
                              fullWidth
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
                          </Grid>

                        )
                      )}
                  </Grid>
                </Grid>


                <Grid container
                  flexDirection={"column"}
                  xs={10} sm={10} md={3} lg={3} xl={3}
                  mt={{ xs: 4, sm: 4, md: 0 }}
                >
                  <Grid item display={"flex"} justifyContent={"center"} mb={2} >
                    <InputLabel sx={queries.bold_text}>
                      Fideicomisario
                    </InputLabel>

                  </Grid>

                  <Grid width={"100%"} >
                    {mecanismoVehiculoPago.Fideicomisario &&
                      JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                        (fideicomisario: IFideicomisario, index: number) => (

                          <Grid mb={2}>
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
                          </Grid>

                        )
                      )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          {tipoMecanismoVehiculoPago === "Mandato" && (
            <Grid container
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              width={{ xs: "100%", sm: "100%", md: "50%" }}
              height={"18rem"}
            >
              <Grid display={"flex"} justifyContent={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Fecha del Mandato</Typography>
                <TextField
                  fullWidth
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
              </Grid>

              <Grid display={"flex"} justifyContent={"center"} >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start"
                  }}
                >Tipo de Ente Público Obligado</Typography>
                <TextField
                  fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.TipoEntePublicoObligado}
                />
              </Grid>


              <Grid display={"flex"} justifyContent={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Mandatario</Typography>
                <TextField
                  fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.Mandatario}
                />
              </Grid>


              <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start",



                }}>Organismo / Municipio Mandante</Typography>
                <TextField
                  fullWidth
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
            <Grid container
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              width={{ xs: "100%", sm: "100%", md: "50%" }}
              height={"18rem"}
            >
              <Grid display={"flex"} justifyContent={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Banco</Typography>
                <TextField
                  fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.Banco}
                />
              </Grid>

              <Grid display={"flex"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>CLABE</Typography>
                <TextField
                fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.CLABE}
                />
              </Grid>

              <Grid display={"flex"} justifyContent={"center"}>

                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Fecha de la Instrucción</Typography>
                <TextField
                fullWidth
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
              </Grid>


              <Grid display={"flex"} justifyContent={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Tipo de Ente Público Obligado</Typography>
                <TextField
                fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "0.7rem",
                    },
                  }}
                  size="small"
                  value={mecanismoVehiculoPago.TipoEntePublicoObligado}
                />
              </Grid>

              <Grid display={"flex"} justifyContent={"center"}>
                <Typography sx={{
                  fontSize: ".9rem",
                  width: "50%",
                  justifyContent: "start"

                }}>Ente Público Obligado</Typography>
                <TextField
                fullWidth
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
