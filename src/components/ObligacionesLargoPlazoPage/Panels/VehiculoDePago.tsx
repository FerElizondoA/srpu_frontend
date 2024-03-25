/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IFideicomisario } from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { AgregarInstruccionesIrrevocables } from "../../instruccionesIrrevocables/dialog/AgregarInstruccionesIrrevocables.tsx";
import {
  AgregarMandatos,
  buttonTheme,
} from "../../mandatos/dialog/AgregarMandatos";

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

  const cleanTablaAsignarFuente: Function = useLargoPlazoStore(
    (state) => state.cleanTablaAsignarFuente
  );

  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );

  const editarInstruccion: Function = useInstruccionesStore(
    (state) => state.editarInstruccion
  );

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);
  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);

  const llenarFuentePago = (mecanismoPago: string) => {
    let auxArray = JSON.parse(mecanismoVehiculoPago.TipoMovimiento);
    auxArray.map((column: any) => {
      return (
        (column.acumuladoAfectacionGobiernoEstatalEntre100 = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoEstado
        ).toString()),
        (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
        ).toString()),
        (column.acumuladoAfectacionOrganismoEntre100 = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
        ).toString())
      );
    });

    if (mecanismoPago === "Mandato") {
      editarMandato(
        mecanismoVehiculoPago.Id,
        {
          numeroMandato: mecanismoVehiculoPago.NumeroRegistro,
          fechaMandato: new Date(mecanismoVehiculoPago.FechaRegistro),
          mandatario: catalogoOrganismos.filter(
            (v, index) => v.Descripcion === mecanismoVehiculoPago.Mandatario
          )[0],
          mandante: catalogoOrganismos.filter(
            (v, index) => v.Descripcion === mecanismoVehiculoPago.Mandante
          )[0],
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setOpenAgregarMandato(!openAgregarMandato);
    } else {
      editarInstruccion(
        mecanismoVehiculoPago.Id,
        {
          numeroCuenta: mecanismoVehiculoPago.NumeroRegistro,
          cuentaCLABE: mecanismoVehiculoPago.CLABE,
          banco: mecanismoVehiculoPago.Banco,
          fechaInstruccion: new Date(mecanismoVehiculoPago.FechaRegistro),
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setOpenAgregarInstruccion(!openAgregarInstruccion);
    }
  };

  return (
    <Grid container direction={"column"} justifyContent={"space-around"}>
      <Grid
        container
        width={"100%"}
        display={"flex"}
        justifyContent={"space-evenly"}
        mt={2}
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
                  SoporteDocumental: "",
                });
                getMecanismosVehiculosPago(e.target.value, () => {});
                setTipoMecanismoVehiculoPago(e.target.value);
                cleanTablaAsignarFuente();
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
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.Id === ""
            }
          />
        </Grid>
      </Grid>

      {tipoMecanismoVehiculoPago === "Mandato" ||
      tipoMecanismoVehiculoPago === "Instrucción Irrevocable" ? (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"5rem"}
        >
          <ThemeProvider theme={buttonTheme}>
            <Button
              sx={queries.buttonContinuar}
              disabled={tablaMecanismoVehiculoPago === null}
              onClick={() => {
                llenarFuentePago(tipoMecanismoVehiculoPago);
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3ch",
                  fontFamily: "MontserratMedium",
                  "@media (min-width: 480px)": {
                    fontSize: ".8rem",
                  },
                }}
              >
                Agregar
              </Typography>
            </Button>
          </ThemeProvider>
        </Grid>
      ) : null}

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
              <Grid
                container
                display={"flex"}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Grid
                  container
                  item
                  xs={10}
                  sm={10}
                  md={3}
                  lg={4}
                  xl={3}
                  mb={{ xs: 4, sm: 4, md: 0 }}
                  flexDirection={"column"}
                >
                  <Grid item display={"flex"} justifyContent={"center"}>
                    <InputLabel sx={{ ...queries.bold_text, mb: 2 }}>
                      {tipoMecanismoVehiculoPago}
                    </InputLabel>
                  </Grid>

                  <Grid display={"flex"} mb={2}>
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>
                      Tipo de Fideicomiso
                    </Typography>
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
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>
                      Fecha del Fideicomiso
                    </Typography>
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

                  <Grid display={"flex"}>
                    <Typography sx={{ width: "90%", fontSize: ".9rem" }}>
                      Fiduciario
                    </Typography>
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

                <Grid
                  container
                  item
                  xs={10}
                  sm={10}
                  md={3}
                  lg={3}
                  xl={3}
                  flexDirection={"column"}
                >
                  <Grid item display={"flex"} justifyContent={"center"} mb={2}>
                    <InputLabel sx={queries.bold_text}>
                      Fideicomisario
                    </InputLabel>
                  </Grid>

                  <Grid width={"100%"}>
                    {mecanismoVehiculoPago.Fideicomisario &&
                      JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                        (fideicomisario: IFideicomisario, index: number) => (
                          <Grid mb={2} key={index}>
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

                <Grid
                  item
                  container
                  flexDirection={"column"}
                  xs={10}
                  sm={10}
                  md={3}
                  lg={3}
                  xl={3}
                  mt={{ xs: 4, sm: 4, md: 0 }}
                >
                  <Grid item display={"flex"} justifyContent={"center"} mb={2}>
                    <InputLabel sx={queries.bold_text}>
                      Fideicomisario
                    </InputLabel>
                  </Grid>

                  <Grid width={"100%"}>
                    {mecanismoVehiculoPago.Fideicomisario &&
                      JSON.parse(mecanismoVehiculoPago.Fideicomisario).map(
                        (fideicomisario: IFideicomisario, index: number) => (
                          <Grid mb={2} key={index}>
                            <TextField
                              key={index}
                              size="small"
                              sx={{ width: "100%" }}
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              value={
                                fideicomisario.ordenFideicomisario.Descripcion
                              }
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
            <Grid
              container
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              width={{ xs: "100%", sm: "100%", md: "50%" }}
              height={"18rem"}
            >
              <Grid display={"flex"} justifyContent={"center"}>
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Fecha del Mandato
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Tipo de Ente Público Obligado
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Mandatario
                </Typography>
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

              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Organismo / Municipio Mandante
                </Typography>
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
            <Grid
              container
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              width={{ xs: "100%", sm: "100%", md: "50%" }}
              height={"18rem"}
            >
              <Grid display={"flex"} justifyContent={"center"}>
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Banco
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  CLABE
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Fecha de la Instrucción
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Tipo de Ente Público Obligado
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    width: "50%",
                    justifyContent: "start",
                  }}
                >
                  Ente Público Obligado
                </Typography>
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

          {openAgregarInstruccion && (
            <AgregarInstruccionesIrrevocables
              handler={setOpenAgregarInstruccion}
              openState={openAgregarInstruccion}
            />
          )}

          {openAgregarMandato && (
            <AgregarMandatos
              handler={setOpenAgregarMandato}
              openState={openAgregarMandato}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
}
