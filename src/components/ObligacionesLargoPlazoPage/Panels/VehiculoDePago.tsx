/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Checkbox,
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
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import { format } from "date-fns";
import { NumeroFideicomiso, NumeroInstruccion } from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { NumeroMandato } from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { GeneralIntrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";

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

export function VehiculoDePago() {
  const [mecanismo, setMecanismo] = useState<any>("");


  const [asignarFuente, setAsignarFuente] = useState(false);

  const [listadoMandato, setListadoMandato] = useState([])

  //Fideicomiso

  const getFideicomisos: Function = useFideicomisoStore(
    (state) => state.getFideicomisos
  );

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
  )

  const numeroMandato: NumeroMandato[] = useLargoPlazoStore(
    (state) => state.numeroMandato
  )

  const numeroMandatoSelect: NumeroMandato[] = useLargoPlazoStore(
    (state) => state.numeroMandatoSelect
  )

  const setNumeroMandatoSelect: Function = useLargoPlazoStore(
    (state) => state.setNumeroMandatoSelect
  )


  //Instrucciones Irrevocables

  const getNumeroInstruccion : Function = useInstruccionesStore(
    (state) => state.getInstruccion
  )

  const numeroInstruccion: NumeroInstruccion[] = useLargoPlazoStore(
  (state) => state.numeroInstruccion
  )

  const numeroInstruccionSelect: NumeroInstruccion[] = useLargoPlazoStore(
    (state) => state.numeroInstruccionSelect
  )

  const setNumeroInstruccionSelect: Function = useLargoPlazoStore(
    (state) => state.setNumeroInstruccionSelect
  )


  // const numeroMandato: NumeroMandato[] = 


  useEffect(() => {
    getNumeroFideicomiso();
    getFideicomisos();
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
      setNumeroMandatoSelect([]);
    }
  }, [mecanismo])



  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-around"}
      height={"32rem"}
    //height={numeroFideicomisoSelect ? "40rem" : asignarFuente ? "68rem" : "68rem"}
    >
      {/* <Grid>
        <Divider sx={queries.bold_text}>MECANISMO O VEHÍCULO DE PAGO</Divider>
      </Grid> */}
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {/* Cuerpo */}
        <Grid display={"flex"} justifyContent={"space-evenly"}>
          <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Mecanismo o vehículo de pago
            </InputLabel>

            <FormControl fullWidth>
              <Select
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

          {mecanismo === "Fideicomiso"
            ?
            <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Número del fideicomiso
              </InputLabel>

              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={numeroFideicomiso}
                getOptionLabel={(option) => `${option.NumeroDeFideicomiso}`}
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

            : //FIN CONDICIONAL

            mecanismo === "Mandato"
              ?
              <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                <InputLabel sx={queries.medium_text}>
                  Número de Mandato
                </InputLabel>

                <Autocomplete
                  clearText="Borrar"
                  noOptionsText="Sin opciones"
                  closeText="Cerrar"
                  openText="Abrir"
                  fullWidth
                  options={numeroMandato}
                  getOptionLabel={(option) => `${option.NumeroMandato}`}
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
              : //Fin Condicional
              mecanismo === "Instrucciones irrevocables"
                ?
                <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                  <InputLabel sx={queries.medium_text}>
                    Numero de Instrucciones irrevocables
                  </InputLabel>

                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    fullWidth
                    options={numeroInstruccion}
                    getOptionLabel={(option) => `${option.NumeroCuenta}`}
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
                :
                null
          }
        </Grid>
      </Grid>

      {mecanismo === "Fideicomiso" && numeroFideicomisoSelect &&
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
                  md={3.3}
                  lg={3}
                  xl={3}
                  container
                  direction={"column"}
                  justifyContent={"space-between"}
                >
                  <InputLabel>Tipo de fideicomiso</InputLabel>
                  <TextField
                    value={row.DescripcionTipoFideicomiso}
                    fullWidth
                    variant="standard"
                    sx={queries.medium_text}
                  />

                  <InputLabel>Fecha del fideicomiso</InputLabel>
                  <TextField
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
                    value={row.DescripcionFiudiciario}
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

                <Grid width={"55%"}>
                  <Paper>
                    <TableContainer
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
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
                                  <StyledTableCell>
                                    <Typography>
                                      {row.fideicomisario.Descripcion}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell>
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

      {mecanismo === "Mandato" && numeroMandatoSelect &&
        numeroMandatoSelect.map((row: any, index: number) => {

          return (
            <>
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
                  container
                  display={"flex"}
                  justifyContent={"space-evenly"}
                >
                  <Grid xs={10}
                    sm={10}
                    md={3.3}
                    lg={3}
                    xl={3}
                  >
                    <InputLabel>Mandatario</InputLabel>
                    <TextField
                      value={row.Mandatario}
                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>

                  <Grid
                    xs={10}
                    sm={10}
                    md={3.3}
                    lg={3}
                    xl={3}
                  >
                    <InputLabel>Fecha del mandato</InputLabel>
                    <TextField
                      value={(row.FechaMandato)}

                      fullWidth
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  </Grid>



                  {/* <InputLabel>Fiduciario</InputLabel>
                  <TextField
                    value={row.DescripcionFiudiciario}
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

                <Grid width={"85%"} height={"15rem"} mt={2}>
                  <Paper sx={{height:"100%",
                        width: "100%",}}>
                    <TableContainer
                      sx={{
                        height:"100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
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
                                      {row.tipoEntePublicoObligado.Descripcion}
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
                                      {row.tipoEntePublicoObligado.Descripcion}
                                    </Typography>
                                  </StyledTableCell>

                                 </StyledTableRow>

                              ))
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )
        })}

      {mecanismo === "Instrucciones irrevocables" && numeroMandatoSelect &&
        numeroMandatoSelect.map((row: any, index: number) => {

          return (
            <></>
          )

        })}



    </Grid>
  );
}
