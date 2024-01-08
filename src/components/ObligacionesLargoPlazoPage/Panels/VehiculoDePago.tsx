/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import { format } from "date-fns";
import {
  NumeroFideicomiso,
  NumeroInstruccion,
  NumeroMandato,
} from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

interface Head {
  label: string;
}

interface HeadSelect {
  label: string;
}

const CatalogoMecanismo: HeadSelect[] = [
  {
    label: "Fideicomiso",
  },
  {
    label: "Mandato",
  },
  {
    label: "Instrucciones irrevocables",
  },
];

const headFideicomiso: Head[] = [
  {
    label: "Fideicomisario",
  },
  {
    label: "Orden fideicomisario",
  },
];

const headMandato: Head[] = [
  {
    label: "Tipo ente publico obligado",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Tipo fuente",
  },
  {
    label: "Fondo o ingreso",
  },
  // {
  //   label: "Fecha mandato",
  // },
  // {
  //   label: "Acciones",
  // },
];

const headInstrucciones: Head[] = [
  {
    label: "Alta deudor",
  },
  {
    label: "Tipo ente público",
  },
  {
    label: "Entidad federativa",
  },
  {
    label: "Tipo de fuente",
  },
  {
    label: "Fondo o ingreso",
  },
  // {
  //   label: "Acciones",
  // },
];

export function VehiculoDePago() {
  const [mecanismo, setMecanismo] = useState<any>("");

  //Fideicomiso

  const numeroFideicomiso: NumeroFideicomiso[] = useLargoPlazoStore(
    (state) => state.numeroFideicomiso
  );
  const numeroFideicomisoSelect: NumeroFideicomiso[] = useLargoPlazoStore(
    (state) => state.numeroFideicomisoSelect
  );

  const setNumerodelFideicomiso: Function = useLargoPlazoStore(
    (state) => state.setNumeroFideicomisoSelect
  );

  const getNumeroFideicomiso: Function = useLargoPlazoStore(
    (state) => state.getNumeroFideicomiso
  );

  // const getMandatos: Function = useMandatoStore(
  //   (state) => state.getMandato
  // );

  //Mandatos

  const getNumeroMandato: Function = useLargoPlazoStore(
    (state) => state.getNumeroMandato
  );

  const numeroMandato: NumeroMandato[] = useLargoPlazoStore(
    (state) => state.numeroMandato
  );

  const numeroMandatoSelect: NumeroMandato[] = useLargoPlazoStore(
    (state) => state.numeroMandatoSelect
  );

  const setNumeroMandatoSelect: Function = useLargoPlazoStore(
    (state) => state.setNumeroMandatoSelect
  );

  //Instrucciones Irrevocables

  const getNumeroInstruccion: Function = useLargoPlazoStore(
    (state) => state.getNumeroInstruccion
  );

  const numeroInstruccion: NumeroInstruccion[] = useLargoPlazoStore(
    (state) => state.numeroInstruccion
  );

  const numeroInstruccionSelect: NumeroInstruccion[] = useLargoPlazoStore(
    (state) => state.numeroInstruccionSelect
  );

  const setNumeroInstruccionSelect: Function = useLargoPlazoStore(
    (state) => state.setNumeroInstruccionSelect
  );

  // const numeroMandato: NumeroMandato[] =

  useEffect(() => {
    getNumeroFideicomiso();
    // getFideicomisos();
    getNumeroMandato();
    getNumeroInstruccion();
  }, []);

  useEffect(() => {
    if (mecanismo !== "Fideicomiso") {
      setNumerodelFideicomiso([]);
    }
    if (mecanismo !== "Mandato") {
      setNumeroMandatoSelect([]);
    }
    if (mecanismo !== "Instrucciones irrevocables") {
      setNumeroInstruccionSelect([]);
    }
  }, [mecanismo]);

  const query = {
    movil: useMediaQuery("(min-width: 0px) and (max-width: 479px)"),
    tabletaMini: useMediaQuery("(min-width: 480px) and (max-width: 767px)"),
    tabletaGrande: useMediaQuery("(min-width: 768px) and (max-width: 1139px)"),
    monitorLaptop: useMediaQuery("(min-width: 1140px) and (max-width: 1399px)"),
    MonitorEscritorio: useMediaQuery("(min-width: 1870px) "),
  };

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );


  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-around"}
      height={
        query.movil // (min-width: 0px) and (max-width: 479px)
          ? numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
            ? "50rem"
            : "10rem"
          : query.tabletaMini // (min-width: 480px) and (max-width: 767px)
          ? numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
            ? "40rem"
            : "20rem"
          : query.tabletaGrande //768px a 1139px
          ? numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
            ? "36rem"
            : "10rem"
          : query.monitorLaptop //1140px a 1399px
          ? numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
            ? "38rem"
            : "10rem"
          : query.MonitorEscritorio
          ? numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
            ? "42rem"
            : "10rem"
          : numeroFideicomisoSelect.length > 0 ||
            numeroMandatoSelect.length > 0 ||
            numeroInstruccionSelect.length > 0
          ? "31rem"
          : "10rem"
      }
    >
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        {/* Cuerpo */}
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
              disabled={reestructura === "con autorizacion"}
                value={mecanismo}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setMecanismo(e.target.value);
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

          {mecanismo === "Fideicomiso" ? (
            <Grid xs={10} sm={4.5} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Número del fideicomiso
              </InputLabel>

              <Autocomplete
              disabled={reestructura === "con autorizacion"}
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={numeroFideicomiso}
                getOptionLabel={(option) =>
                  option.NumeroDeFideicomiso === undefined
                    ? ""
                    : `${option.NumeroDeFideicomiso}`
                }
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{`${option.NumeroDeFideicomiso}`}</Typography>
                    </li>
                  );
                }}
                onChange={(event, text) => {
                  let loc = numeroFideicomiso.filter(
                    (_i, index) => _i.Id === text?.Id
                  );

                  setNumerodelFideicomiso(loc!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Id === value.Id || value.NumeroDeFideicomiso === 0
                }
              />
            </Grid>
          ) : //FIN CONDICIONAL

          mecanismo === "Mandato" ? (
            <Grid xs={10} sm={4.5} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Número de Mandato
              </InputLabel>

              <Autocomplete
              disabled={reestructura === "con autorizacion"}
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={numeroMandato}
                getOptionLabel={(option) =>
                  option.NumeroMandato === undefined
                    ? ""
                    : `${option.NumeroMandato}`
                }
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{`${option.NumeroMandato}`}</Typography>
                    </li>
                  );
                }}
                onChange={(event, text) => {
                  let loc = numeroMandato.filter(
                    (_i, index) => _i.Id === text?.Id
                  );

                  setNumeroMandatoSelect(loc!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Id === value.Id || value.NumeroMandato === 0
                }
              />
            </Grid>
          ) : //Fin Condicional
          mecanismo === "Instrucciones irrevocables" ? (
            <Grid xs={10} sm={4.5} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Numero de Instrucciones irrevocables
              </InputLabel>

              <Autocomplete
              disabled={reestructura === "con autorizacion"}
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={numeroInstruccion}
                getOptionLabel={(option) =>
                  option.NumeroCuenta === undefined
                    ? ""
                    : `${option.NumeroCuenta}`
                }
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{`${option.NumeroCuenta}`}</Typography>
                    </li>
                  );
                }}
                onChange={(event, text) => {
                  let loc = numeroInstruccion.filter(
                    (_i, index) => _i.Id === text?.Id
                  );

                  setNumeroInstruccionSelect(loc!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Id === value.Id || value.NumeroCuenta === 0
                }
              />
            </Grid>
          ) : null}
        </Grid>
      </Grid>

      {mecanismo === "Fideicomiso" &&
        numeroFideicomisoSelect &&
        numeroFideicomisoSelect.map((row: any, index: number) => {
          // let Orden = JSON.parse(row.Fideicomisario).;
          // let Fiduciario = JSON.parse(row.Fideicomisario)
          return (
            <>
              <Grid>
                <Divider sx={queries.bold_text}>FIDEICOMISO</Divider>
              </Grid>

              <Grid
                container
                display={"flex"}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Grid
                  xs={10}
                  sm={10}
                  md={10}
                  lg={3}
                  xl={3}
                  container
                  direction={"column"}
                  justifyContent={"space-between"}
                >
                  <InputLabel>Tipo de fideicomiso</InputLabel>
                  <TextField
                    disabled
                    value={row.DescripcionTipoFideicomiso}
                    fullWidth
                    variant="standard"
                    sx={queries.medium_text}
                  />

                  <InputLabel>Fecha del fideicomiso</InputLabel>
                  <TextField
                    disabled
                    value={format(
                      new Date(row.FechaDeFideicomiso),
                      "dd/MM/yyyy"
                    )}
                    fullWidth
                    variant="standard"
                    sx={queries.medium_text}
                  />

                  <InputLabel>Fiduciario</InputLabel>
                  <TextField
                    disabled
                    value={row.DescripcionFiduciario}
                    fullWidth
                    variant="standard"
                    sx={queries.medium_text}
                  />
                  {/* <FormControlLabel
                    value={"start"}
                    label={"Asignar fuente"}
                    labelPlacement="start"
                    control={
                      <Checkbox
                        checked={asignarFuente}
                        onClick={() => setAsignarFuente(!asignarFuente)}
                      />
                    }
                  ></FormControlLabel> */}
                </Grid>

                <Grid
                  sx={{
                    height: "25rem",
                    width: "85%",
                    display: "flex",
                    justifyContent: "center",
                    "@media (min-width: 480px)": {
                      height: "15rem",
                      width: "85%",
                    },

                    "@media (min-width: 768px)": {
                      height: "15rem",
                      width: "85%",
                    },

                    "@media (min-width: 1140px)": {
                      height: "15rem",
                      width: "85%",
                    },

                    "@media (min-width: 1199px)": {
                      height: "15rem",
                      width: "60%",
                    },

                    "@media (min-width: 1400px)": {
                      height: "14rem",
                      width: "60%",
                    },

                    "@media (min-width: 1870px)": {
                      height: "18rem",
                      width: "60%",
                    },
                  }}
                >
                  <Paper
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TableContainer
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headFideicomiso.map((head, index) => (
                              <StyledTableCell align="center" key={index}>
                                {head.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {JSON.parse(row.Fideicomisario).lengt !== 0
                            ? JSON.parse(row.Fideicomisario).map(
                                (row: any, index: number) => (
                                  <StyledTableRow>
                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.fideicomisario.Descripcion}
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.ordenFideicomisario.Descripcion}
                                      </Typography>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                )
                              )
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </>
          );
        })}

      {mecanismo === "Mandato" &&
        numeroMandatoSelect &&
        numeroMandatoSelect.map((row: any, index: number) => {
          return (
            <Grid width={"100%"}>
              <Grid>
                <Divider sx={queries.bold_text}>Mandatos</Divider>
              </Grid>

              <Grid
                container
                display={"flex"}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Grid
                  width={"100%"}
                  container
                  display={"flex"}
                  justifyContent={"space-evenly"}
                >
                  <Grid xs={5} sm={5} md={3.3} lg={3} xl={3}>
                    <InputLabel>Mandatario</InputLabel>
                    <TextField
                    disabled
                      value={row.Mandatario}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>

                  <Grid xs={5} sm={5} md={3.3} lg={3} xl={3}>
                    <InputLabel>Fecha del mandato</InputLabel>
                    <TextField
                    disabled
                      value={row.FechaMandato}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>
                </Grid>

                <Grid
                  width={"100%"}
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "25rem",
                    width: "85%",
                    "@media (min-width: 480px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 768px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 1140px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 1400px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 1870px)": {
                      height: "20rem",
                      width: "85%",
                    },
                  }}
                >
                  <Paper
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TableContainer
                      sx={{
                        height: "100%",
                        width: "100%",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: ".5vw",
                          height: ".5vh",
                          mt: 1,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#AF8C55",
                          outline: "1px solid slategrey",
                          borderRadius: 1,
                        },
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            {headMandato.map((head, index) => (
                              <StyledTableCell align="center" key={index}>
                                {head.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {JSON.parse(row.TipoMovimiento).lengt !== 0
                            ? JSON.parse(row.TipoMovimiento).map(
                                (row: any, index: number) => (
                                  <StyledTableRow>
                                    <StyledTableCell align="center">
                                      <Typography>
                                        {
                                          row.tipoEntePublicoObligado
                                            .Descripcion
                                        }
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.tipoFuente.Descripcion}
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.fondoIngreso.Descripcion}
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {
                                          row.tipoEntePublicoObligado
                                            .Descripcion
                                        }
                                      </Typography>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                )
                              )
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

      {mecanismo === "Instrucciones irrevocables" &&
        numeroInstruccionSelect &&
        numeroInstruccionSelect.map((row: any, index: number) => {
          return (
            <>
              <Grid>
                <Divider sx={queries.bold_text}>
                  Instrucciones Irrevocables
                </Divider>
              </Grid>

              <Grid
                container
                display={"flex"}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Grid
                  container
                  display={"flex"}
                  justifyContent={"space-evenly"}
                >
                  {/* <Grid xs={10}
                    sm={10}
                    md={3.3}
                    lg={3}
                    xl={3}
                  >
                    <InputLabel>Numero de cuenta</InputLabel>
                    <TextField
                       value={row.NumeroCuenta}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid> */}

                  <Grid xs={10} sm={6} md={6} lg={6} xl={3}>
                    <InputLabel>Banco</InputLabel>
                    <TextField
                    disabled
                      value={row.DescripcionBanco}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>

                  <Grid xs={10} sm={3} md={3} lg={3} xl={3}>
                    <InputLabel>CLABE</InputLabel>
                    <TextField
                    disabled
                      value={row.CLABE}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>

                  {/* <InputLabel>Fiduciario</InputLabel>
                  <TextField
                    value={row.DescripcionFiduciario}
                    fullWidth
                    variant="standard"
                    sx={queries.medium_text}
                  /> */}
                  {/* <FormControlLabel
                    value={"start"}
                    label={"Asignar fuente"}
                    labelPlacement="start"
                    control={
                      <Checkbox
                        checked={asignarFuente}
                        onClick={() => setAsignarFuente(!asignarFuente)}
                      />
                    }
                  ></FormControlLabel> */}
                </Grid>

                <Grid
                  width={"100%"}
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "25rem",
                    width: "85%",
                    "@media (min-width: 480px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 768px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 1140px)": {
                      height: "20rem",
                      width: "85%",
                    },

                    "@media (min-width: 1400px)": {
                      height: "19rem",
                      width: "85%",
                    },

                    "@media (min-width: 1870px)": {
                      height: "24rem",
                      width: "85%",
                    },
                  }}
                >
                  <Paper
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TableContainer
                      sx={{
                        height: "100%",
                        width: "100%",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: ".5vw",
                          height: ".5vh",
                          mt: 1,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#AF8C55",
                          outline: "1px solid slategrey",
                          borderRadius: 1,
                        },
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            {headInstrucciones.map((head, index) => (
                              <StyledTableCell align="center" key={index}>
                                {head.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {JSON.parse(row.TipoMovimiento).lengt !== 0
                            ? JSON.parse(row.TipoMovimiento).map(
                                (row: any, index: number) => (
                                  <StyledTableRow>
                                    <StyledTableCell align="center">
                                      <Typography>{row.altaDeudor}</Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.tipoEntePublico}
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.entidadFederativa}
                                      </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>{row.tipoFuente}</Typography>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                      <Typography>
                                        {row.fondoIngreso}
                                      </Typography>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                )
                              )
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </>
          );
        })}
    </Grid>
  );
}
