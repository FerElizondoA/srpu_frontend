import CloseIcon from "@mui/icons-material/Close";
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
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { IGastosCostos } from "../../../store/CreditoLargoPlazo/informacion_general";

interface Head {
  label: string;
}

const headsGC: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la inversión",
  },
  {
    label: "Descripción",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Monto",
  },
  {
    label: "Acción",
  },
];

export function GastoCostos() {
  //CATALOGO
  const catalogoDestinos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDestinos
  );

  const catalogoDetallesInversion: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDetallesInversion
  );

  const getDetallesInversion: Function = useLargoPlazoStore(
    (state) => state.getDetallesInversion
  );

  // Datos tabla Gastos costos
  const gastosCostos: IGastosCostos = useLargoPlazoStore(
    (state) => state.gastosCostos
  );

  const addGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGastosCostos
  );
  const setGastosCostos: Function = useLargoPlazoStore(
    (state) => state.setGastosCostos
  );
  const removeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.removeGastosCostos
  );

  const tablaGastosCostos: IGastosCostos[] = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const addDocumento: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const removeDocumento: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
  );

  const cleanGastosCostos: Function = useLargoPlazoStore(
    (state) => state.cleanGastosCostos
  );

  const addRows = () => {
    addGastosCostos(gastosCostos);
  };

  function cargarArchivo(event: any) {
    let file = event.target.files[0];
    if (file !== undefined) {
      addDocumento(file, file.name);
    }
  }

  useEffect(() => {
    getDetallesInversion();
    setGastosCostos({
      ...gastosCostos,
      monto: moneyMask("0"),
      montoGastosAdicionales: moneyMask("0"),
      saldoVigente: moneyMask("0"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  return (
    <Grid
      item
      container
      sx={{
        ...queries.contenedorInformacionGeneral,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid item width={"30%"}>
        <InputLabel sx={queries.medium_text}>Destino</InputLabel>
        <Autocomplete
          disabled={reestructura === "con autorizacion"}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          fullWidth
          options={catalogoDestinos}
          getOptionLabel={(option) => option.Descripcion}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Descripcion}>
                <Typography>{option.Descripcion}</Typography>
              </li>
            );
          }}
          value={gastosCostos.destino}
          onChange={(event, text) => {
            setGastosCostos({
              ...gastosCostos,
              destino: {
                Id: text?.Id || "",
                Descripcion: text?.Descripcion || "",
              },
            });
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
        />
      </Grid>

      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          justifyItems: "center",
          height: "25vh",
        }}
      >
        {gastosCostos.destino.Descripcion.toLowerCase().includes(
          "refinanciamiento"
        ) && (
          <Grid item width={"90%"}>
            <InputLabel sx={queries.medium_text}>
              Clave de Inscripción del Financiamiento a Refinanciar
            </InputLabel>
            <TextField
              disabled={reestructura === "con autorizacion"}
              fullWidth
              value={gastosCostos.claveInscripcionFinanciamiento}
              onChange={(v) => {
                setGastosCostos({
                  ...gastosCostos,
                  claveInscripcionFinanciamiento: v.target.value,
                });
              }}
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
        )}

        {gastosCostos.destino.Descripcion.toLowerCase().includes(
          "inversión"
        ) && (
          <Grid item width={"90%"}>
            <InputLabel sx={queries.medium_text}>
              Detalle de la Inversión
            </InputLabel>
            <Autocomplete
              disabled={reestructura === "con autorizacion"}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoDetallesInversion}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={gastosCostos.detalleInversion}
              onChange={(event, text) => {
                setGastosCostos({
                  ...gastosCostos,
                  detalleInversion: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                });
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
            />
          </Grid>
        )}
        {gastosCostos.destino.Descripcion.toLowerCase().includes(
          "inversión"
        ) && (
          <Grid item width={"90%"}>
            <InputLabel sx={queries.medium_text}>
              Adjuntar detalle de la inversión pública productiva
            </InputLabel>
            <Grid mt={1} mb={1} item display={"flex"} justifyContent={"center"}>
              <Grid item sx={{ position: "relative" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    ...queries.leyendaArchivoGastosCosto,
                    border:
                      gastosCostos.archivoDetalleInversion.nombreArchivo !==
                      "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                        ? "2px dotted #af8c55"
                        : "2x dotted black",
                  }}
                >
                  {gastosCostos.archivoDetalleInversion.nombreArchivo ||
                    "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                </Typography>
                <input
                  disabled={reestructura === "con autorizacion"}
                  type="file"
                  accept="application/pdf"
                  onChange={(v) => {
                    cargarArchivo(v);
                  }}
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "3vh",
                    cursor: "pointer",
                  }}
                />
              </Grid>

              <Grid display={"flex"} justifyContent={"end"}>
                <Tooltip title={"Remover Archivo"}>
                  <Button onClick={() => removeDocumento()}>
                    <CloseIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item width={"90%"}>
          <InputLabel sx={queries.medium_text}>Descripción</InputLabel>
          <TextField
            disabled={reestructura === "con autorizacion"}
            value={gastosCostos.descripcion}
            onChange={(v) =>
              setGastosCostos({
                ...gastosCostos,
                descripcion: v.target.value,
              })
            }
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

        <Grid item width={"90%"}>
          <InputLabel sx={queries.medium_text}>Monto</InputLabel>
          <TextField
            disabled={reestructura === "con autorizacion"}
            fullWidth
            placeholder="0"
            value={gastosCostos.monto <= 0 ? "" : gastosCostos.monto}
            onChange={(v) => {
              if (
                validator.isNumeric(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) &&
                parseInt(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) < 9999999999999999
              ) {
                setGastosCostos({
                  ...gastosCostos,
                  monto: moneyMask(v.target.value),
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              //startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>

        <Grid item width={"90%"}>
          <InputLabel sx={queries.medium_text}>Gastos Adicionales</InputLabel>
          <TextField
            disabled={reestructura === "con autorizacion"}
            fullWidth
            value={gastosCostos.gastosAdicionales}
            onChange={(v) => {
              setGastosCostos({
                ...gastosCostos,
                gastosAdicionales: v.target.value,
              });
            }}
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
        <Grid item width={"90%"}>
          <InputLabel sx={queries.medium_text}>
            Monto Gastos Adicionales
          </InputLabel>
          <TextField
            disabled={reestructura === "con autorizacion"}
            fullWidth
            placeholder="0"
            value={
              gastosCostos.montoGastosAdicionales <= 0
                ? ""
                : gastosCostos.montoGastosAdicionales
            }
            onChange={(v) => {
              if (
                validator.isNumeric(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) &&
                parseInt(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) < 9999999999999999
              ) {
                setGastosCostos({
                  ...gastosCostos,
                  montoGastosAdicionales: moneyMask(v.target.value),
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              //startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item width={"90%"}>
          <InputLabel disabled sx={queries.medium_text}>
            Saldo Vigente
          </InputLabel>
          <TextField
            disabled={reestructura === "con autorizacion"}
            fullWidth
            value={
              gastosCostos.saldoVigente <= 0
                ? ""
                : gastosCostos.saldoVigente.toString()
            }
            onChange={(v) => {
              if (
                validator.isNumeric(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) &&
                parseInt(
                  v.target.value
                    .replace(".", "")
                    .replace(",", "")
                    .replace(/\D/g, "")
                ) < 9999999999999999
              ) {
                setGastosCostos({
                  ...gastosCostos,
                  saldoVigente: moneyMask(v.target.value.toString()),
                });
              }
            }}
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
      </Grid>

      <Grid
        width={"94%"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeProvider theme={buttonTheme}>
          <Button
            sx={queries.buttonContinuar}
            variant="outlined"
            disabled={
              /^[\s]*$/.test(gastosCostos.destino.Descripcion) ||
              /^[\s]*$/.test(gastosCostos.descripcion) ||
              gastosCostos.monto < 1
            }
            onClick={() => {
              addRows();
              cleanGastosCostos();
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>
      </Grid>

      <Grid
        height={"40%"}
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Paper sx={{ width: "95%", overflow: "clip", height: "100%" }}>
          <TableContainer
            sx={{
              height: "100%",
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
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
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headsGC.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaGastosCostos.map((row: IGastosCostos, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.destino.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.detalleInversion.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.claveInscripcionFinanciamiento}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.monto}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            disabled={reestructura === "con autorizacion"}
                            type="button"
                            onClick={() => removeGastosCostos(index)}
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
  );
}
