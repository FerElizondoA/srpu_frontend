import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  ThemeProvider,
  Button,
  createTheme,
  TableBody,
  Checkbox,
  Paper,
  FormControl,
  Autocomplete,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import { Fideicomisario } from "../../../store/Fideicomiso/fideicomiso";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { NumeroFideicomiso } from "../../../store/CreditoLargoPlazo/FuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { format } from "date-fns";
interface Head {
  label: string;
}

interface HeadSelect {
  id: number;
  label: string;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

const CatalogoMecanismo: HeadSelect[] = [
  {
    id: 1,
    label: "Fideicomiso",
  },
  {
    id: 2,
    label: "Institucion irrevocable",
  },
  {
    id: 3,
    label: "Mandato",
  },
];

const CatalogoBonos: HeadSelect[] = [
  {
    id: 1,
    label: "No aplica",
  },
  {
    id: 2,
    label: "Prueba1",
  },
  {
    id: 3,
    label: "Prueba2",
  },
];

const CatalogoGarantiaPago: HeadSelect[] = [
  {
    id: 1,
    label: "No aplica",
  },
  {
    id: 2,
    label: "Pago 1",
  },
  {
    id: 3,
    label: "Pago 2",
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

const headsAF: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la Inversión",
  },
  {
    label: "Inversión Pública Productiva",
  },
  {
    label: "Periodo de Administración",
  },
  {
    label: "Gastos Adicionales",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Descripcion",
  },
  {
    label: "Monto",
  },
  {
    label: "Periodo de Financiamiento (Meses)",
  },
  {
    label: "Saldo Vigente",
  },
  {
    label: "Monto Gastos Adicionales",
  },
];

const headFP: Head[] = [
  {
    label: "TIPO DE FUENTE DE PAGO",
  },
  {
    label: "FUENTE DE PAGO",
  },
  {
    label: "% ASIGNADO DEL INGRESO O FONDO al FIDEICOMISO ",
  },
  {
    label:
      "% ACUMULADO DE AFECTACIÓN DEL GOBIERNO DEL ESTADO A LOS MECANISMOS DE PAGO / 100",
  },
  {
    label: "% DE AFECTACIÓN DEL GOBIERNO DEL ESTADO / 100 DEL INGRESO O FONDO",
  },
  {
    label: "% AFECTADO AL FIDEICOMISO",
  },
  {
    label: "% ACUMULADO DE AFECTACIÓN A LOS MECANISMOS DE PAGO",
  },
  {
    label:
      "% ASIGNADO AL FINANCIAMIENTO U OBLIGACIÓN RESPECTO DE LO FIDEICOMITIDO",
  },
  {
    label:
      "% ASIGNADO AL FINANCIAMIENTO U OBLIGACIÓN RESPECTO DEL INGRESO O FONDO",
  },
  {
    label: "% ACUMULADO DE LA ASIGNACIÓN A LAS OBLIGACIONES",
  },
  {
    label: " ",
  },
];

export function FuenteDePago() {
  const [fideicomiso, setFideicomiso] = useState(false);

  const [mecanismo, setMecanismo] = useState<any>("");

  const [bonoCero, setBonoCero] = useState<any>("");

  const [asignarFuente, setAsignarFuente] = useState(false);

  const getFideicomisos: Function = useCortoPlazoStore(
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

  const garantiaPago: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.garantiaPago
  );

  const changeGarantiaPago: Function = useLargoPlazoStore(
    (state) => state.changeGarantiaPago
  );

  useEffect(() => {
    getNumeroFideicomiso();
    getFideicomisos();
  }, []);
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-evenly"}
      height={!asignarFuente ? "38rem" : "90rem"}
      //height={numeroFideicomisoSelect ? "40rem" : asignarFuente ? "68rem" : "68rem"}
    >
      <Grid>
        <Divider sx={queries.bold_text}>MECANISMO O VEHÍCULO DE PAGO</Divider>
      </Grid>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"10rem"}
      >
        {/* Cuerpo */}
        <Grid display={"flex"} justifyContent={"space-evenly"}>
          <Grid xs={3} sm={3.3} md={3.3} lg={3} xl={3.06}>
            <InputLabel sx={queries.medium_text}>
              Mecanismo o vehículo de pago
            </InputLabel>

            <FormControl fullWidth>
              <Select
                value={mecanismo}
                fullWidth
                variant="outlined"
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

          <Grid xs={3} sm={3.3} md={3.3} lg={3} xl={3}>
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

          <Grid xs={3} sm={3.3} md={3.3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Bono cupón cero</InputLabel>

            <FormControl fullWidth>
              <Select
                fullWidth
                variant="standard"
                value={bonoCero}
                onChange={(e) => {
                  setBonoCero(e.target.value);
                }}
              >
                {CatalogoBonos.map((item, index) => (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid width={"100%"}>
          <Grid display={"flex"} width={"100%"} justifyContent={"center"}>
            <Grid
              width={"88%"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Grid xs={7} md={4} lg={4} xl={3.5}>
                <InputLabel sx={queries.medium_text}>
                  Clasificación del bono del cupón cero
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    variant="standard"
                    value={bonoCero}
                    onChange={(e) => {
                      setBonoCero(e.target.value);
                    }}
                  >
                    {CatalogoBonos.map((item, index) => (
                      <MenuItem value={item.label} key={index}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                xs={4}
                sm={3.3}
                md={3.3}
                lg={3}
                xl={3}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ThemeProvider theme={theme}>
                  <Button
                    sx={queries.buttonContinuar}
                    variant="outlined"
                    onClick={(e) => {
                      setFideicomiso(fideicomiso ? false : true);
                    }}
                  >
                    {/* <CheckIcon fontSize="small" /> */}
                    AGREGAR
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {numeroFideicomisoSelect &&
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
                  height={"15rem"}
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
                  <FormControlLabel
                    value={"start"}
                    label={"Asignar fuente"}
                    labelPlacement="start"
                    control={
                      <Checkbox
                        checked={asignarFuente}
                        onClick={() => setAsignarFuente(!asignarFuente)}
                      />
                    }
                  ></FormControlLabel>
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

      {asignarFuente ? (
        <Grid
          container
          width={"100%"}
          direction={"column"}
          justifyContent={"space-between"}
        >
          <Grid>
            <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
          </Grid>

          <Grid
            sx={{
              ...queries.fuentePagoApartados,
              width: "100%",
              // display:"flex",
              justifyContent: "space-evenly",
            }}
          >
            <Grid
              item
              sx={{ width: "100%" }}
              xs={10}
              sm={10}
              md={10}
              lg={2}
              xl={2}
            >
              <InputLabel>Clasificación</InputLabel>
              <Select fullWidth variant="standard" value={headsAF}>
                {headsAF.map((item, index) => (
                  <MenuItem key={index}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid
              item
              sx={{ width: "100%" }}
              xs={10}
              sm={10}
              md={10}
              lg={2}
              xl={2}
            >
              <InputLabel>Tipo de fuente</InputLabel>
              <Select fullWidth variant="standard" value={headsAF}>
                {headsAF.map((item, index) => (
                  <MenuItem key={index}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid
              item
              sx={{ width: "100%" }}
              xs={10}
              sm={10}
              md={10}
              lg={2}
              xl={2}
            >
              <InputLabel>Fuente de pago</InputLabel>
              <Select fullWidth variant="standard" value={headsAF}>
                {headsAF.map((item, index) => (
                  <MenuItem key={index}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid
              item
              sx={{ width: "100%" }}
              xs={10}
              sm={10}
              md={10}
              lg={2}
              xl={2}
            >
              <InputLabel>Respecto a: </InputLabel>
              <Select fullWidth variant="standard" value={headsAF}>
                {headsAF.map((item, index) => (
                  <MenuItem key={index}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid
            mt={4}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Paper sx={{ ...queries.tablaAsignarFuente }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {headFP.map((head, index) => (
                        <StyledTableCell align="center" key={index}>
                          {head.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      ) : null}

      <Grid>
        <Divider sx={queries.bold_text}>GARANTÍA DE PAGO</Divider>
      </Grid>

      <Grid
        container
        height={"7rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid xs={10} sm={10} md={10} lg={10} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Tipo de garantía de pago
          </InputLabel>
          <Select
            fullWidth
            variant="standard"
            value={garantiaPago}
            onChange={(e, text) => {
              changeGarantiaPago(e);
            }}
          >
            {CatalogoGarantiaPago.map((item, index) => (
              <MenuItem key={index} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
}
