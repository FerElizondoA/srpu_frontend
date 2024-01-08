/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

interface HeadSelect {
  Id: string;
  Descripcion: string;
}

const CatalogoGarantiaPago: HeadSelect[] = [
  {
    Id: "0",
    Descripcion: "No Aplica",
  },
  {
    Id: "1",
    Descripcion: "Pago 1",
  },
  {
    Id: "2",
    Descripcion: "Pago 2",
  },
];

const headFP: HeadSelect[] = [
  {
    Id: "1",
    Descripcion: "Tipo de fuente de pago",
  },
  {
    Id: "2",
    Descripcion: "Fuente de pago",
  },
  {
    Id: "3",
    Descripcion: "% Asignado del ingreso o fondo al fideicomiso",
  },
  {
    Id: "4",
    Descripcion:
      "% Acumulado de afectación del gobierno del estado a los mecanismos de pago / 100",
  },
  {
    Id: "5",
    Descripcion:
      "% De afectación del gobierno del estado / 100 del ingreso o fondo",
  },
  {
    Id: "6",
    Descripcion: "% Afectado al fideiomiso",
  },
  {
    Id: "7",
    Descripcion: "% Acumulado de afectación a los mecanismos de pago",
  },
  {
    Id: "8",
    Descripcion:
      "% Asignado al financiamiento u obligación respecto de lo fideicomitido",
  },
  {
    Id: "9",
    Descripcion:
      "% Asignado al financiamiento u obligaciónes respecto del ingreso o fondo",
  },
  {
    Id: "10",
    Descripcion: "% Acumulado de la asignación a las obligaciones",
  },
  {
    Id: "0",
    Descripcion: "Acciones",
  },
];

export function AsignarFuente() {
  const garantiaPago: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.garantiaPago
  );

  const changeGarantiaPago: Function = useLargoPlazoStore(
    (state) => state.changeGarantiaPago
  );

  //Asignar Fuente
  const changeAsignarFuente: Function = useLargoPlazoStore(
    (state) => state.changeAsignarFuente
  );

  const clasificacion: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.AsignarFuenteV.clasificacion
  );

  const tipoFuente: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.AsignarFuenteV.tipoFuente
  );

  const fuentePago: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.AsignarFuenteV.fuentePago
  );

  const Respecto: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.AsignarFuenteV.RespectoA
  );

  const catalogoTiposDeFuente: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const getTiposDeFuente: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getClasificacion: Function = useLargoPlazoStore(
    (state) => state.getClasificacion
  );

  const catalogoClasificacion: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoClasificacion
  );

  const catalogoRespecto: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoRespecto
  );

  const getRespecto: Function = useLargoPlazoStore(
    (state) => state.getRespecto
  );

  const catalogoFuenteDePago: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoFuenteDePago
  );

  const getFuentePago: Function = useLargoPlazoStore(
    (state) => state.getFuentePago
  );

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  useEffect(() => {
    getTiposDeFuente();
    getClasificacion();
    getRespecto();
    getFuentePago();
  }, []);

  return (
    <Grid
      container
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Grid>
        <Divider sx={queries.bold_text}>GARANTÍA DE PAGO</Divider>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={4}
      >
        <Grid xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Tipo de garantía de pago
          </InputLabel>
          <Autocomplete
          disabled={reestructura === "con autorizacion"}
            //disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={CatalogoGarantiaPago}
            value={garantiaPago}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              changeGarantiaPago({
                garantiaPago: {
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
          {/* <Select
            fullWidth
            variant="standard"
            value={garantiaPago}
            onChange={(e, text) => {
              changeGarantiaPago({
                AsignarFuenteV:{
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
              });
            }}
          >
            {CatalogoGarantiaPago.map((item, index) => (
              <MenuItem key={index} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select> */}
        </Grid>
      </Grid>

      <Grid>
        <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          //...queries.fuentePagoApartados,
          width: "100%",
          // display:"flex",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Clasificación</InputLabel>
          <Autocomplete
            //disableClearable
            disabled={reestructura === "con autorizacion"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoClasificacion}
            value={
              clasificacion.Descripcion === undefined ? null : clasificacion
            }
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              changeAsignarFuente({
                clasificacion: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
                tipoFuente: tipoFuente,
                fuentePago: fuentePago,
                RespectoA: Respecto,
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

          {/* <Select fullWidth variant="standard" value={headsAF}>
            {headsAF.map((item, index) => (
              <MenuItem key={index}>{item.Descripcion}</MenuItem>
            ))}

          </Select> */}
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Tipo de fuente</InputLabel>

          <Autocomplete
            //disableClearable
            disabled={reestructura === "con autorizacion"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={tipoFuente.Descripcion === undefined ? null : tipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              changeAsignarFuente({
                clasificacion: clasificacion,
                tipoFuente: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
                fuentePago: fuentePago,
                RespectoA: Respecto,
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

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Fuente de pago</InputLabel>
          <Autocomplete
            //disableClearable
            disabled={reestructura === "con autorizacion"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFuenteDePago}
            value={fuentePago.Descripcion === undefined ? null : fuentePago}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              changeAsignarFuente({
                clasificacion: clasificacion,
                tipoFuente: tipoFuente,
                fuentePago: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
                RespectoA: Respecto,
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

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Respecto a: </InputLabel>
          <Autocomplete
            //disableClearable
            disabled={reestructura === "con autorizacion"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoRespecto}
            value={Respecto.Descripcion === undefined ? null : Respecto}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              changeAsignarFuente({
                clasificacion: clasificacion,
                tipoFuente: tipoFuente,
                fuentePago: fuentePago,
                RespectoA: {
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

      <Grid mt={1} width={"100%"} display={"flex"} justifyContent={"center"}>
        <Paper sx={{ ...queries.tablaAsignarFuente }}>
          <TableContainer
            sx={{
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
            <Table>
              <TableHead>
                <TableRow>
                  {headFP.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography
                        sx={{
                          fontSize: ".7rem",
                          fontFamily: "MontserratRegular",
                        }}
                      >
                        {head.Descripcion}
                      </Typography>
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
                  <StyledTableCell />
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
