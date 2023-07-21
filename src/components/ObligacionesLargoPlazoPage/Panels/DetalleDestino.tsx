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
    useLargoPlazoStore((state) => state.generalDetalleDestino.detalleDestino);

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.generalDetalleDestino.montoAutorizado
  );

  const tablaDetalleDestino: any = useLargoPlazoStore(
    (state) => state.tablaDetalleDestino
  );

  const changeGeneralDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.changeGeneralDetalleDestino
  );

  const addGeneralDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.addGeneralDetalleDestino
  );

  const removeDetalleDestino: Function = useLargoPlazoStore(
    (state) => state.removeDetalleDestino
  );

  const catalagoOrganismos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const getOrganismosA: Function = useLargoPlazoStore(
    (state) => state.getOrganismosA
  );

  const addRows = () => {
    let tab = {
      detalleDestino: detalleDestino.Descripcion,
      montoAutorizado: montoAutorizado,
    };
    addGeneralDetalleDestino(tab);
  };

  useEffect(() => {
    changeGeneralDetalleDestino({
      detalleDestino: detalleDestino,
      montoAutorizado: montoAutorizado,
    });

    getOrganismosA();
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
        {/* FALTA CAMBIAR EL VERDADERO CATALGOGO, SOLO ES DE PRUEBA*/}
        
        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>
              Detalle del destino autorizado
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalagoOrganismos}
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
                changeGeneralDetalleDestino({
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

          <Grid xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>Monto Autorizado</InputLabel>

            <TextField
              fullWidth
              variant="standard"
              value={montoAutorizado === null ? "" : montoAutorizado.toString()}
              onChange={(v) => {
                if (validator.isNumeric(v.target.value)) {
                  changeGeneralDetalleDestino({
                    detalleDestino: detalleDestino,
                    montoAutorizado: v.target.value,
                  });
                } else if (v.target.value === "") {
                  changeGeneralDetalleDestino({
                    detalleDestino: detalleDestino,
                    montoAutorizado: null,
                  });
                }
              }}
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
                  changeGeneralDetalleDestino({
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
