import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
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
  createTheme,
} from "@mui/material";
import { useEffect } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

interface Head {
  label: string;
}
const headsMontoAutorizado: Head[] = [
  {
    label: "Destino autorizado",
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

export function MontoAutorizado() {
  const destinoAutorizado: { Id: string; Descripcion: string } =
    useLargoPlazoStore(
      (state) => state.generalMontoAutorizado.destinoAutorizado
    );

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.generalMontoAutorizado.montoAutorizado
  );

  const tablaMontoAutorizado: any = useLargoPlazoStore(
    (state) => state.tablaMontoAutorizado
  );

  const changeGeneralMontoAutorizado: Function = useLargoPlazoStore(
    (state) => state.changeGeneralMontoAutorizado
  );

  const addGeneralMontoAutorizado: Function = useLargoPlazoStore(
    (state) => state.addGeneralMontoAutorizado
  );

  const removeGeneralMontoAutorizado: Function = useLargoPlazoStore(
    (state) => state.removeGeneralMontoAutorizado
  );

  const catalagoOrganismos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const getOrganismosA: Function = useLargoPlazoStore(
    (state) => state.getOrganismosA
  );

  const addRows = () => {
    let tab = {
      destinoAutorizado: destinoAutorizado.Descripcion,
      montoAutorizado: montoAutorizado,
    };
    addGeneralMontoAutorizado(tab);
  };

  useEffect(() => {
    changeGeneralMontoAutorizado({
      destinoAutorizado: destinoAutorizado,
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
        sx={queries.contenedorAgregarAutorizacion.MontoAutorizado}
      >
        {/* FALTA CAMBIAR EL VERDADERO CATALGOGO, SOLO ES DE PRUEBA*/}

        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>Destino Autorizado</InputLabel>
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
                Id: destinoAutorizado.Id || "",
                Descripcion: destinoAutorizado.Descripcion || "",
              }}
              onChange={(event, text) =>
                changeGeneralMontoAutorizado({
                  destinoAutorizado: {
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
                  changeGeneralMontoAutorizado({
                    destinoAutorizado: destinoAutorizado,
                    montoAutorizado: v.target.value,
                  });
                } else if (v.target.value === "") {
                  changeGeneralMontoAutorizado({
                    destinoAutorizado: destinoAutorizado,
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
                  /^[\s]*$/.test(destinoAutorizado.Descripcion) ||
                  montoAutorizado === null ||
                  montoAutorizado === 0
                }
                onClick={() => {
                  changeGeneralMontoAutorizado({
                    destinoAutorizado: "",
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

        <Grid sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
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
                    {headsMontoAutorizado.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tablaMontoAutorizado.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center" component="th">
                          <Typography>{row.destinoAutorizado}</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th">
                          <Typography align="center">
                            {row.montoAutorizado}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() =>
                                removeGeneralMontoAutorizado(index)
                              }
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
