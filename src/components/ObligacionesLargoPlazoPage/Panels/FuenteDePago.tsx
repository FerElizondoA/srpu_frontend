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
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import CheckIcon from "@mui/icons-material/Check";
import { CheckBox } from "@mui/icons-material";

interface Head {
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
      "% acumulado de afectacion del fobierno del estado a los mecanismos de pago/100",
  },
  {
    label: "% de afectacion del gobierno del estado/100 del ingreso o fondo",
  },
  {
    label: "% afectado al fideicomiso",
  },
  {
    label: "% acumulado de afectación a los mecanismos de pago",
  },
  {
    label:
      "% asignado al financiemieno u obligación respecto del ingreso o fondo",
  },
  {
    label: "% acumulado de la asignacion a las obligaciones",
  },
  {
    label: "Accion",
  },
];

export function FuenteDePago() {
  const [fideicomiso, setFideicomiso] = useState(false);

  const [noAplica, setNoAplica] = useState(false);
  const [asignarFuente, setAsignarFuente] = useState(false);
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-between"}
      height={!fideicomiso ? "35rem" : !asignarFuente ? "40rem": "68rem"}
    >
      <Divider sx={queries.bold_text}>Mecanismo o vehículo de pago</Divider>

      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"10rem"}
      >
        {/* Cuerpo */}
        <Grid display={"flex"} justifyContent={"space-evenly"}>
          <Grid md={4} lg={4} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Mecanismo o vehiculo de pago
            </InputLabel>
            <Select fullWidth variant="standard">
              {headsAF.map((item, index) => (
                <MenuItem key={index}>{item.label}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid md={4} lg={4} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Numero del fideicomiso
            </InputLabel>
            <Select fullWidth variant="standard" value={headsAF}>
              {headsAF.map((item, index) => (
                <MenuItem key={index}>{item.label}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid md={4} lg={4} xl={3}>
            <InputLabel sx={queries.medium_text}>Bono cupón cero</InputLabel>
            <Select fullWidth variant="standard" value={headsAF}>
              {headsAF.map((item, index) => (
                <MenuItem key={index}>{item.label}</MenuItem>
              ))}
            </Select>
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
                <Select fullWidth variant="standard">
                  {headsAF.map((item, index) => (
                    <MenuItem key={index}>{item.label}</MenuItem>
                  ))}
                </Select>
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
          <Divider sx={queries.bold_text}>Mecanismo o vehículo de pago</Divider>
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
              <Divider sx={queries.bold_text}>Asignar Fuente</Divider>
      
              <Grid width={"100%"} display={"flex"} justifyContent={"space-evenly"}>
                <Grid xs={12} sm={12} md={2} lg={2} xl={2} >
                  <InputLabel>Clasiicacion</InputLabel>
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

      <Divider sx={queries.bold_text}>Garantía de pago</Divider>

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
