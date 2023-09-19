import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useEffect } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { TipoMovimientoMandato } from "../../../store/Mandatos/mandato";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { formatDate } from "@jbcecapmex/pakfirma/dist/screens/tabladocumentos/TablaDocs";

interface HeadLabels {
  label: string;
}

export function TipoDeMovimiento() {
  //const [altaDeudor, setAltaDeudor] = useState(false);

  const heads: HeadLabels[] = [
    {
      label: "Alta Deudor",
    },
    {
      label: "Tipo ente publico obligado",
    },
    {
      label: "Mandatario",
    },
    {
      label: "Tipo de fuente",
    },
    {
      label: "Fondo o ingreso",
    },
    {
      label: "Fecha mandato",
    },
    {
      label: "Acciones",
    },
  ];

  const altaDeudor: string = useLargoPlazoStore(
    (state) => state.tipoMovimientoMandato.altaDeudor
  );

  const tipoEntePublicoObligado: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.tipoMovimientoMandato.tipoEntePublicoObligado
    );

  const mandatario: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.tipoMovimientoMandato.mandatario
  );

  const tipoFuente: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.tipoMovimientoMandato.tipoFuente
  );

  const fondoIngreso: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.tipoMovimientoMandato.fondoIngreso
  );

  const fechaMandato: string = useLargoPlazoStore(
    (state) => state.tipoMovimientoMandato.fechaMandato
  );

  const tablaTipoMovimientoMandato: TipoMovimientoMandato[] =
    useLargoPlazoStore((state) => state.tablaTipoMovimientoMandato);

  // separacion

  const setTipoMovimientoMandato: Function = useLargoPlazoStore(
    (state) => state.setTipoMovimientoMandato
  );

  //catalogo
  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoTiposDeFuente: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const addTipoMovimientoMandato: Function = useLargoPlazoStore(
    (state) => state.addTipoMovimientoMandato
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTiposDeFuenteInstrucciones
  );

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const getFondosOIngresosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getFondosOIngresosInstrucciones
  );

  //

  const removeTipoMovimientoMandato: Function = useLargoPlazoStore(
    (state) => state.removeTipoMovimientoMandato
  );

  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const catalogoOrganismos: any = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const cleanTipoMovimientoMandato: Function = useCortoPlazoStore(
    (state) => state.cleanTipoMovimientoMandato
  );

  const numeroMandato: string = useCortoPlazoStore(
    (state) => state.numeroMandato
  );
  const changeNumeroMandato: Function = useCortoPlazoStore(
    (state) => state.changeNumeroMandato
  );

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getTipoEntePublicoObligado();
    getFondosOIngresosInstrucciones();
    getOrganismos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-around"}
        width={"100%"}
        sx={{
          "@media (min-width: 480px)": {
            height: "50rem",
          },

          "@media (min-width: 768px)": {
            height: "38rem",
          },

          "@media (min-width: 1140px)": {
            height: "38rem",
          },

          "@media (min-width: 1400px)": {
            height: "38rem",
          },

          "@media (min-width: 1870px)": {
            height: "50rem",
          },
        }}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <TextField
            label={"Numero de mandato"}
            title={"Numero de mandato"}
            onChange={(v) => {
              changeNumeroMandato(v.target.value);
            }}
            value={numeroMandato}
          />
          <Grid
            item
            xs={10}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            display={"flex"}
            justifyContent={"center"}
          >
            <FormControlLabel
              label="Alta deudor"
              control={
                <Checkbox
                  checked={altaDeudor === "SI"}
                  onChange={(v) => {
                    setTipoMovimientoMandato({
                      altaDeudor: v.target.checked ? "SI" : "NO",
                      tipoEntePublicoObligado: tipoEntePublicoObligado,
                      mandatario: mandatario,
                      tipoFuente: tipoFuente,
                      fondoIngreso: fondoIngreso,
                      fechaMandato: fechaMandato,
                    });
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de ente público obligado
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoTipoEntePublicoObligado}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={tipoEntePublicoObligado}
              onChange={(event, text) =>
                setTipoMovimientoMandato({
                  altaDeudor: altaDeudor,
                  tipoEntePublicoObligado: text,
                  mandatario: { Id: "", Descripcion: "" },
                  tipoFuente: tipoFuente,
                  fondoIngreso: fondoIngreso,
                  fechaMandato: fechaMandato,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                tipoEntePublicoObligado.Descripcion === "No aplica" ||
                /^[\s]*$/.test(tipoEntePublicoObligado.Descripcion)
              }
              fullWidth
              options={catalogoOrganismos.filter(
                (td: any) => td.IdTipoEntePublico === tipoEntePublicoObligado.Id
              )}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={{
                Id: mandatario.Id || "",
                Descripcion: mandatario.Descripcion || "",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Id === value.Id || value.Descripcion === ""
              }
              onChange={(event, text) => {
                setTipoMovimientoMandato({
                  altaDeudor: altaDeudor,
                  tipoEntePublicoObligado: tipoEntePublicoObligado,
                  mandatario: { Id: text.Id, Descripcion: text.Descripcion },
                  tipoFuente: tipoFuente,
                  fondoIngreso: fondoIngreso,
                  fechaMandato: fechaMandato,
                });
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Tipo de fuente
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFuente}
              value={{
                Id: tipoFuente.Id || "",
                Descripcion: tipoFuente.Descripcion || "",
              }}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoMovimientoMandato({
                  altaDeudor: altaDeudor,
                  tipoEntePublicoObligado: tipoEntePublicoObligado,
                  mandatario: mandatario,
                  tipoFuente: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  fondoIngreso: fondoIngreso,
                  fechaMandato: fechaMandato,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fondo o ingreso
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFondosOIngresos}
              value={{
                Id: fondoIngreso.Id || "",
                Descripcion: fondoIngreso.Descripcion || "",
              }}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoMovimientoMandato({
                  altaDeudor: altaDeudor,
                  tipoEntePublicoObligado: tipoEntePublicoObligado,
                  mandatario: mandatario,
                  tipoFuente: tipoFuente,
                  fondoIngreso: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  fechaMandato: fechaMandato,
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

          <Grid item xs={9} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha mandato
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                value={new Date(fechaMandato)}
                onChange={(date) =>
                  setTipoMovimientoMandato({
                    altaDeudor: altaDeudor,
                    tipoEntePublicoObligado: tipoEntePublicoObligado,
                    mandatario: mandatario,
                    tipoFuente: tipoFuente,
                    fondoIngreso: fondoIngreso,
                    fechaMandato: date,
                  })
                }
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid
          display={"flex"}
          justifyContent={"center"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={ButtonTheme}>
            <Button
              disabled={
                tipoEntePublicoObligado.Id === "" ||
                mandatario.Id === "" ||
                tipoFuente.Id === "" ||
                fondoIngreso.Id === ""
              }
              sx={{
                ...queries.buttonContinuar,
                width: "15vh",
              }}
              onClick={() => {
                addTipoMovimientoMandato({
                  altaDeudor: altaDeudor,
                  tipoEntePublicoObligado: tipoEntePublicoObligado.Descripcion,
                  mandatario: mandatario.Descripcion,
                  tipoFuente: tipoFuente.Descripcion,
                  fondoIngreso: fondoIngreso.Descripcion,
                  fechaMandato: fechaMandato,
                });
                cleanTipoMovimientoMandato();
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
        </Grid>

        <Grid
          width={"100%"}
          height={"25rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Paper sx={{ width: "95%", height: "100%" }}>
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
                    {heads.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <Typography>{head.label}</Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaTipoMovimientoMandato.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Typography>{row.altaDeudor}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography>{row.tipoEntePublicoObligado}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography>{row.mandatario}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography>{row.tipoFuente}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography>{row.fondoIngreso}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography>
                            {format(new Date(row.fechaMandato), "dd/MM/yyyy")}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeTipoMovimientoMandato(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
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
    </>
  );
}
