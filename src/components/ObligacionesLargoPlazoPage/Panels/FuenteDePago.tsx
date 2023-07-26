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
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { Fideicomiso } from "../../../store/Fideicomiso/fideicomiso";

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
    label: "Tipo de fuente de pago",
  },
  {
    label: "Fuente de pago",
  },
  {
    label: "% asignado del ingreso fondo ",
  },
  {
    label:
      "% acumulado de afectación del gobierno del estado a los mecanismos de pago / 100",
  },
  {
    label: "% de afectacion del gobierno del estado / 100 del ingreso o fondo",
  },
  {
    label: "% afectado al fideicomiso",
  },
  {
    label: "% acumulado de afectación a los mecanismos de pago",
  },
  {
    label:
      "% asignado al financiamiento u obligación respecto de lo fideicomitido",
  },
  {
    label:
      "% asignado al financiamiento u obligación respecto del ingreso o fondo",
  },
  {
    label: "% acumulado de la asignación a las obligaciones",
  },
  {
    label: " ",
  },
];

export function FuenteDePago() {
  const [fideicomiso, setFideicomiso] = useState(false);

  const [mecanismo, setMecanismo] = useState<any>("");
  const [numeroFideicomiso, setNumerodelFideicomiso] = useState<any>("");
  const [bonoCero, setBonoCero] = useState<any>("");

  const [asignarFuente, setAsignarFuente] = useState(false);

  const getFideicomisos: Function = useCortoPlazoStore(
    (state) => state.getFideicomisos
  );

  const tablaFideicomisos: Fideicomiso[] = useCortoPlazoStore(
    (state) => state.tablaFideicomisos
  );
  const changeIdFideicomiso: Function = useCortoPlazoStore(
    (state) => state.changeIdFideicomiso
  );

  useEffect(() => {
    getFideicomisos();
  }, []);
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-evenly"}
      height={!fideicomiso ? "30rem" : !asignarFuente ? "37rem" : "68rem"}
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
          <Grid md={4} lg={4} xl={3.06}>
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

          <Grid md={4} lg={4} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Número del fideicomiso
            </InputLabel>
            <Select
              fullWidth
              variant="standard"
              value={numeroFideicomiso}
              onChange={(e) => {
                setNumerodelFideicomiso(e.target.value);
              }}
            >
              {tablaFideicomisos.map((row: any, index: number) => (
                <MenuItem value={row.NumeroDeFideicomiso} key={index}>
                  {row.NumeroDeFideicomiso}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid md={4} lg={4} xl={3}>
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
              <Grid md={4} lg={4} xl={3.5}>
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
                md={4}
                lg={4}
                xl={2}
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

      {fideicomiso && (
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
              container
              direction={"column"}
              justifyContent={"space-between"}
              height={"15rem"}
              md={3}
            >
              <InputLabel>Tipo de fideicomiso</InputLabel>
              <TextField
                fullWidth
                variant="standard"
                sx={queries.medium_text}
              />

              <InputLabel>Fecha del fideicomiso</InputLabel>
              <TextField
                fullWidth
                variant="standard"
                sx={queries.medium_text}
              />

              <InputLabel>Fiduciario</InputLabel>
              <TextField
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
                      <StyledTableRow>
                        <StyledTableCell />
                        <StyledTableCell />
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>

          {asignarFuente ? (
            <Grid
              container
              width={"100%"}
              height={"25rem"}
              direction={"column"}
              justifyContent={"space-between"}
            >
              <Grid>
                <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
              </Grid>

              <Grid
                width={"100%"}
                display={"flex"}
                justifyContent={"space-evenly"}
              >
                <Grid xs={12} sm={12} md={2} lg={2} xl={2}>
                  <InputLabel>Clasificación</InputLabel>
                  <Select fullWidth variant="standard" value={headsAF}>
                    {headsAF.map((item, index) => (
                      <MenuItem key={index}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid xs={12} sm={12} md={2} lg={2} xl={2}>
                  <InputLabel>Tipo de fuente</InputLabel>
                  <Select fullWidth variant="standard" value={headsAF}>
                    {headsAF.map((item, index) => (
                      <MenuItem key={index}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid xs={12} sm={12} md={2} lg={2} xl={2}>
                  <InputLabel>Fuente de pago</InputLabel>
                  <Select fullWidth variant="standard" value={headsAF}>
                    {headsAF.map((item, index) => (
                      <MenuItem key={index}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid xs={12} sm={12} md={2} lg={2} xl={2}>
                  <InputLabel>Respecto a: </InputLabel>
                  <Select fullWidth variant="standard" value={headsAF}>
                    {headsAF.map((item, index) => (
                      <MenuItem key={index}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Grid>
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
        </>
      )}

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
        <Grid md={4} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>
            Tipo de garantía de pago
          </InputLabel>
          <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
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
