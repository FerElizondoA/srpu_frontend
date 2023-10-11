/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { useEffect, useState } from "react";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { queries } from "../../../queries";
import { Fideicomisario } from "../../../store/Fideicomiso/fideicomiso";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { ICatalogo } from "../../../screens/Config/Catalogos";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { IDatosFideicomiso } from "../../../screens/fuenteDePago/Fideicomisos";

interface HeadLabels {
  label: string;
}

export function DatoGeneralesFideicomiso() {
  // DATOS GENERALES
  const numeroFideicomiso: string = useFideicomisoStore(
    (state) => state.generalFideicomiso.numeroFideicomiso
  );
  const tipoFideicomiso: { Id: string; Descripcion: string } =
    useFideicomisoStore((state) => state.generalFideicomiso.tipoFideicomiso);

  const fechaFideicomiso: string = useFideicomisoStore(
    (state) => state.generalFideicomiso.fechaFideicomiso
  );

  const fiudiciario: { Id: string; Descripcion: string } = useFideicomisoStore(
    (state) => state.generalFideicomiso.fiudiciario
  );

  // FIDEICOMISARIO
  const fideicomisario: { Id: string; Descripcion: string } =
    useFideicomisoStore((state) => state.fideicomisario.fideicomisario);
  const ordenFideicomisario: { Id: string; Descripcion: string } =
    useFideicomisoStore((state) => state.fideicomisario.ordenFideicomisario);

  const tablaFideicomisario: Fideicomisario[] = useFideicomisoStore(
    (state) => state.tablaFideicomisario
  );

  // TABLA FIDEICOMISARIO
  const setGeneralFideicomiso: Function = useFideicomisoStore(
    (state) => state.setGeneralFideicomiso
  );

  const [error, setError] = useState(false);

  const setFideicomisario: Function = useFideicomisoStore(
    (state) => state.setFideicomisario
  );

  const addFideicomisario: Function = useFideicomisoStore(
    (state) => state.addFideicomisario
  );

  const removeFideicomisario: Function = useFideicomisoStore(
    (state) => state.removeFideicomisario
  );

  const cleanFideicomisario: Function = useFideicomisoStore(
    (state) => state.cleanFideicomisario
  );

  const catalogoTiposDeFideicomiso: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );

  const getTiposFideicomiso: Function = useFideicomisoStore(
    (state) => state.getTiposFideicomiso
  );

  const catalogoFiudiciarios: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoFiudiciarios
  );

  const getFiudiciarios: Function = useFideicomisoStore(
    (state) => state.getFiudiciarios
  );

  const catalogoFideicomisarios: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoFideicomisarios
  );

  const getFideicomisarios: Function = useFideicomisoStore(
    (state) => state.getFideicomisarios
  );

  const catalogoOrdenesFideicomisario: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoOrdenesFideicomisario
  );

  const getOrdenesFideicomisario: Function = useFideicomisoStore(
    (state) => state.getOrdenesFideicomisario
  );

  useEffect(() => {
    getTiposFideicomiso();
    getFiudiciarios();
    getFideicomisarios();
    getOrdenesFideicomisario();
  }, []);

  const headsFideicomisario: HeadLabels[] = [
    {
      label: "Acciones",
    },
    {
      label: "Fideicomisario",
    },
    {
      label: "Orden Fideicomisario",
    },
  ];

  // const idFideicomiso : string = useCortoPlazoStore(
  //   (state) => state.idFideicomiso
  // );

  useEffect(() => {
    setGeneralFideicomiso({
      numeroFideicomiso: numeroFideicomiso,
      tipoFideicomiso: tipoFideicomiso,
      fechaFideicomiso: fechaFideicomiso,
      fiudiciario: fiudiciario,
    });
  }, []);

  const tablaFideicomisos: IDatosFideicomiso[] = useFideicomisoStore(
    (state) => state.tablaFideicomisos
  );

  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent={"space-evenly"}
        sx={{
          height: "46rem",
          "@media (min-width: 480px)": {
            height: "50rem",
          },

          "@media (min-width: 768px)": {
            height: "60rem",
          },

          "@media (min-width: 1140px)": {
            height: "35rem",
          },

          "@media (min-width: 1400px)": {
            height: "38rem",
          },

          "@media (min-width: 1870px)": {
            height: "51rem",
          },
        }}
      >
        <Grid container display={"flex"} justifyContent={"space-evenly"}>
          <Grid item xs={10} sm={4} md={4} lg={5} xl={4}>
            <InputLabel sx={queries.medium_text}>
              Numero del fideicomiso
            </InputLabel>
            <TextField
              fullWidth
              variant="standard"
              type="number"
              value={numeroFideicomiso}
              onChange={(v) => {
                tablaFideicomisos.filter(
                  (_) => _.NumeroDeFideicomiso === v.target.value
                ).length > 0
                  ? setError(true)
                  : setError(false);
                setGeneralFideicomiso({
                  numeroFideicomiso: /^[a-zA-Z0-9 ()$_,.-]*$/.test(
                    v.target.value
                  )
                    ? v.target.value
                    : numeroFideicomiso,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: fiudiciario,
                });
              }}
              error={error}
              helperText={error && "Número de registro ya existente"}
            />
          </Grid>
          <Grid item xs={10} sm={4} md={4} lg={5} xl={4}>
            <InputLabel sx={queries.medium_text}>
              Tipo de fideicomiso
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFideicomiso}
              value={tipoFideicomiso}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: fiudiciario,
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>
        </Grid>

        <Grid container display={"flex"} justifyContent={"space-evenly"}>
          <Grid mt={2} xs={10} sm={4} md={4} lg={5} xl={4} item>
            <InputLabel sx={queries.medium_text}>
              Fecha de Fideicomiso
            </InputLabel>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DesktopDatePicker
                sx={{ width: "100%" }}
                value={new Date(fechaFideicomiso)}
                onChange={(date) =>
                  setGeneralFideicomiso({
                    numeroFideicomiso: numeroFideicomiso,
                    tipoFideicomiso: tipoFideicomiso,
                    fechaFideicomiso: date?.toString(),
                    fiudiciario: fiudiciario,
                  })
                }
                // slots={{
                //   textField: DateInput,
                // }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={10} sm={4} md={4} lg={5} xl={4}>
            <InputLabel sx={queries.medium_text}>Fiduciario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              value={fiudiciario}
              options={catalogoFiudiciarios}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              // value={numeroFideicomiso}
              onChange={(event, text) =>
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>
        </Grid>

        <Divider>
          <Typography
            sx={{ ...queries.bold_text, color: "#af8c55 ", marginTop: "1rem" }}
          >
            FIDEICOMISARIO
          </Typography>
        </Divider>

        <Grid item container display={"flex"} justifyContent={"center"} mt={2}>
          <Grid
            width={"100%"}
            display={"flex"}
            justifyItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Grid item xs={5} sm={4} md={4} lg={3} xl={4}>
              <InputLabel sx={queries.medium_text}>Fideicomisario</InputLabel>
              <Autocomplete
                disableClearable
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                options={catalogoFideicomisarios}
                value={fideicomisario}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
                }}
                onChange={(event, text) =>
                  setFideicomisario({
                    fideicomisario: text,
                    ordenFideicomisario: ordenFideicomisario,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Descripcion === value.Descripcion ||
                  value.Descripcion === ""
                }
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={3} xl={4}>
              <InputLabel sx={queries.medium_text}>
                Orden fideicomisario
              </InputLabel>
              <Autocomplete
                disableClearable
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                options={catalogoOrdenesFideicomisario}
                value={ordenFideicomisario}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
                }}
                onChange={(event, text) =>
                  setFideicomisario({
                    fideicomisario: fideicomisario,
                    ordenFideicomisario: text,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Descripcion === value.Descripcion ||
                  value.Descripcion === ""
                }
              />
            </Grid>
          </Grid>

          <ThemeProvider theme={ButtonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                width: "15vh",
                marginBottom: "1rem",
              }}
              disabled={
                fideicomisario.Descripcion === "" ||
                ordenFideicomisario.Descripcion === ""
              }
              onClick={() => {
                addFideicomisario({
                  fideicomisario: fideicomisario,
                  ordenFideicomisario: ordenFideicomisario,
                });
                cleanFideicomisario();
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
          <Grid
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            sx={{
              height: "18rem",
              "@media (min-width: 480px)": {
                height: "30",
              },

              "@media (min-width: 768px)": {
                height: "30rem",
              },

              "@media (min-width: 1140px)": {
                height: "30rem",
              },

              "@media (min-width: 1400px)": {
                height: "15rem",
              },

              "@media (min-width: 1870px)": {
                height: "22rem",
              },
            }}
          >
            <Paper sx={{ width: "90%", height: "100%" }}>
              <TableContainer
                sx={{
                  height: "100%",
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
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {headsFideicomisario.map((head, index) => (
                        <StyledTableCell align="center" key={index}>
                          <Typography>{head.label}</Typography>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tablaFideicomisario.map((row: any, index: number) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            <Tooltip title="Eliminar">
                              <IconButton
                                type="button"
                                onClick={() => removeFideicomisario(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.fideicomisario.Descripcion}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.ordenFideicomisario.Descripcion}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
