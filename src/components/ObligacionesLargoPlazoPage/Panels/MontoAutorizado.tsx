/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@mui/material";
import { useEffect } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

interface Head {
  label: string;
}
const headsDestinoAutorizado: Head[] = [
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

export function DestinoAutorizado() {
  const destinoAutorizado: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.montoAutorizado.destinoAutorizado);

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.montoAutorizado.montoAutorizado
  );

  const tablaMontoAutorizado: any = useLargoPlazoStore(
    (state) => state.tablaMontoAutorizado
  );

  const setMontoAutorizado: Function = useLargoPlazoStore(
    (state) => state.setMontoAutorizado
  );

  const addMontoAutorizado: Function = useLargoPlazoStore(
    (state) => state.addMontoAutorizado
  );

  const removeDestinoAutorizado: Function = useLargoPlazoStore(
    (state) => state.removeDestinoAutorizado
  );

  const catalogoDestinosAutorizados: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDestinosAutorizados
  );
  const getDestinosAutorizados: Function = useLargoPlazoStore(
    (state) => state.getDestinosAutorizados
  );

  const addRows = () => {
    let tab = {
      destinoAutorizado: destinoAutorizado.Descripcion,
      montoAutorizado: montoAutorizado,
    };
    addMontoAutorizado(tab);
  };

  useEffect(() => {
    getDestinosAutorizados();
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
        <Grid container display={"flex"} justifyContent={"space-evenly"}>
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Destino Autorizado</InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoDestinosAutorizados}
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
                setMontoAutorizado({
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
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
                  setMontoAutorizado({
                    destinoAutorizado: destinoAutorizado,
                    montoAutorizado: moneyMask(v.target.value),
                  });
                } else if (v.target.value === "") {
                  setMontoAutorizado({
                    destinoAutorizado: destinoAutorizado,
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
              }}
              variant="standard"
            />
          </Grid>

          <Grid
            item
            xs={10}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            height={"5rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ThemeProvider theme={buttonTheme}>
              <Button
                sx={queries.buttonContinuar}
                variant="outlined"
                disabled={
                  /^[\s]*$/.test(destinoAutorizado.Descripcion) ||
                  montoAutorizado === null ||
                  montoAutorizado === 0
                }
                onClick={() => {
                  setMontoAutorizado({
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

        <Grid
          item
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          mb={{}}
          sx={{
            ...queries.contenedorAgregarAutorizacion.Tablas,
          }}
        >
          <Paper
            sx={{
              height: "100",
              width: "86%",
            }}
          >
            <TableContainer sx={{ width: "100%", height: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headsDestinoAutorizado.map((head, index) => (
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
                              onClick={() => removeDestinoAutorizado(index)}
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
