import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Autocomplete,
  ThemeProvider,
  createTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import validator from "validator";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import DeleteIcon from "@mui/icons-material/Delete";
import { moneyMask } from "./InformacionGeneral";

interface Head {
  label: string;
}

const headsDetalleMontoAutorizado: Head[] = [
  {
    label: "Detalle destino autorizado",
  },
  {
    label: "Monto Autorizado",
  },
  {
    label: "Acción",
  },
];

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

export function DestalleDestino() {
  const detalleDestino: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.detalleDestino.detalleDestino);

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.detalleDestino.montoAutorizado
  );

  const tablaDetalleDestino: any = useLargoPlazoStore(
    (state) => state.tablaDetalleDestino
  );

  const changeDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.setDetalleDestino
  );

  const addDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.addDetalleDestino
  );

  const removeDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.removeDetalleDestino
  );

  const catalogoDetalleDestinosAutorizados: Array<ICatalogo> =
    useLargoPlazoStore((state) => state.catalogoDetalleDestinosAutorizados);

  const getDetalleDestinosAutorizados: Function = useLargoPlazoStore(
    (state) => state.getDetalleDestinosAutorizados
  );

  const addRows = () => {
    let tab = {
      detalleDestino: detalleDestino.Descripcion,
      montoAutorizado: montoAutorizado,
    };
    addDetalleDestino(tab);
  };

  useEffect(() => {
    changeDetalleDestino({
      detalleDestino: detalleDestino,
      montoAutorizado: montoAutorizado,
    });

    getDetalleDestinosAutorizados();
  }, []);

  return (
    <>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-evenly"
        sx={queries.contenedorAgregarAutorizacion.DetalleDestino}
      >
        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid item xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>
              Detalle del destino autorizado
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoDetalleDestinosAutorizados}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={{
                Id: detalleDestino.Id || "",
                Descripcion: detalleDestino.Descripcion || "",
              }}
              onChange={(event, text) =>
                changeDetalleDestino({
                  detalleDestino: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  montoAutorizado: montoAutorizado,
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
                option.Id === value.Id || value.Descripcion === ""
              }
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>Monto Autorizado</InputLabel>
            <TextField
              value={
                montoAutorizado <= 0
                  ? moneyMask("0")
                  : moneyMask(montoAutorizado.toString())
              }
              onChange={(v) => {
                if (
                  validator.isNumeric(v.target.value.replace(/\D/g, "")) &&
                  parseInt(v.target.value.replace(/\D/g, "")) < 9999999999999999
                ) {
                  changeDetalleDestino({
                    detalleDestino: detalleDestino,
                    montoAutorizado: moneyMask(v.target.value),
                  });
                } else if (v.target.value === "") {
                  changeDetalleDestino({
                    detalleDestino: detalleDestino,
                    montoAutorizado: moneyMask("0"),
                  });
                }
              }}
              fullWidth
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
                // startAdornment: <AttachMoneyIcon />,
              }}
              variant="standard"
            />
          </Grid>

          <Grid
            height={"5rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ThemeProvider theme={theme}>
              <Button
                sx={queries.buttonContinuar}
                variant="outlined"
                disabled={
                  /^[\s]*$/.test(detalleDestino.Descripcion) ||
                  montoAutorizado === null ||
                  montoAutorizado === 0
                }
                onClick={() => {
                  changeDetalleDestino({
                    detalleDestino: "",
                    montoAutorizado: null,
                  });
                  addRows();
                }}
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid width={"100%"} display={"flex"} justifyContent={"center"}>
          <Paper
            sx={{
              ...queries.contenedorAgregarAutorizacion.Tablas,
              width: "86%",
            }}
          >
            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headsDetalleMontoAutorizado.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tablaDetalleDestino.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center" component="th">
                          <Typography>{row.detalleDestino}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th">
                          <Typography align="center">
                            {row.montoAutorizado}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeDetalleDestino(index)}
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
