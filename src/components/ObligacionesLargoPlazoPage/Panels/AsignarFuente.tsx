/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IDeudorFideicomiso, IDeudorFideicomisoNew } from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import DeleteIcon from "@mui/icons-material/Delete";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";


interface HeadSelect {
  Label: string;
}
const headsNews: HeadSelect[] = [
  {
    Label: "Id",
  },
  {
    Label: "Tipo de Fuente",
  },
  {
    Label: "Fuente de Pago",// Label: "Fondo o Ingreso",
  },
  {
    Label: "Ente Publico Obligado",//Label: "Fideicomitente",
  },
  {
    Label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    Label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
  },
  {
    Label: "Eliminar",
  },
];

const headFP: HeadSelect[] = [
  {
    Label: "Tipo de fuente de pago",
  },
  {
    Label: "Fuente de pago",
  },
  {
    Label: "% Asignado del ingreso o fondo al fideicomiso",
  },
  {
    Label:
      "% Acumulado de afectación del gobierno del estado a los mecanismos de pago / 100",
  },
  {
    Label: "% De afectación del gobierno del estado / 100 del ingreso o fondo",
  },
  {
    Label: "% Afectado al fideicomiso",
  },
  {
    Label: "% Acumulado de afectación a los mecanismos de pago",
  },
  {
    Label:
      "% Asignado al financiamiento u obligación respecto de lo fideicomitido",
  },
  {
    Label:
      "% Asignado al financiamiento u obligaciónes respecto del ingreso o fondo",
  },
  {
    Label: "% Acumulado de la asignación a las obligaciones",
  },
  {
    Label: " ",
  },
];

export function AsignarFuente({
  filtroCampoTipoFuente,
  setFiltroCampoTipoFuente
}: {
  filtroCampoTipoFuente: IDeudorFideicomisoNew[],
  setFiltroCampoTipoFuente: Function
}) {
  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );

  const garantiaPago: string = useLargoPlazoStore(
    (state) => state.garantiaPago
  );
  const setGarantiaPago: Function = useLargoPlazoStore(
    (state) => state.setGarantiaPago
  );

  const getTiposDeFuente: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );
  const getFuentesPago: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );
  const getSumaPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.getSumaPorcentajeAcumulado
  );

  const catalogoTiposDeFuente: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );
  const catalogoFuentesDePago: IFondoOIngreso[] = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );
  const tablaAsignarFuente: IDeudorFideicomiso[] = useLargoPlazoStore(
    (state) => state.tablaAsignarFuente
  );

  const tablaAsignarFuenteNew: IDeudorFideicomisoNew[] = useLargoPlazoStore(
    (state) => state.tablaAsignarFuenteNew
  );

  const OriginalTablaAsignarFuenteNew: IDeudorFideicomisoNew[] = useLargoPlazoStore(
    (state) => state.OriginalTablaAsignarFuenteNew
  );

  const setTablaAsignarFuenteNew: Function = useLargoPlazoStore(
    (state) => state.setTablaAsignarFuenteNew
  );


  const setTablaAsignarFuente: Function = useLargoPlazoStore(
    (state) => state.setTablaAsignarFuente
  );

  const addPorcentaje: Function = useLargoPlazoStore(
    (state) => state.addPorcentaje
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const [filtro, setFiltro] = useState({
    Clasificacion: { Descripcion: "Fuente de Pago" },
    TipoFuente: { Id: "", Descripcion: "" },
    FuentePago: { Id: "", Descripcion: "" },
    RespectoA: { Descripcion: "" },
  });

  //Para el Filtro y agregado de la tabla
  const setTipoMovimientoFuentesPago: Function = useLargoPlazoStore(
    (state) => state.setTipoMovimientoFuentesPago
  );

  const tipoMovimientoFuentesPago: IDeudorFideicomisoNew[] = useLargoPlazoStore(
    (state) => state.tipoMovimientoFuentesPago
  );

  const removeTablaAsignarFuente: Function = useLargoPlazoStore(
    (state) => state.removeTablaAsignarFuente
  );

  const updateTipoMovimientoField: Function = useLargoPlazoStore(
    (state) => state.updateTipoMovimientoField
  );




  const [validacionDialogAsignarFuente, setValidacioDialogAsignarFuente] = useState({
    openDialog: false,
    message: "",
    montoOriginal: 0
  });


  useEffect(() => {
    getTiposDeFuente();
    getFuentesPago();
    getSumaPorcentajeAcumulado(mecanismoVehiculoPago.MecanismoPago);
  }, []);



  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       console.log("Asingar Fuente - Tabla Asignar Fuente", filtroCampoTipoFuente);
  //       filtradoOpcionesAsignarFuente();
  //     }, 100); // 100ms suele ser suficiente

  //     return () => clearTimeout(timeout);
  //   }, [filtroCampoTipoFuente]);

  useEffect(() => {
    console.log(" tipoMecanismoVehiculoPago", tipoMecanismoVehiculoPago);
  }, []);

  useEffect(() => {
    console.log("OriginalTablaAsignarFuenteNew", OriginalTablaAsignarFuenteNew);
  }, [OriginalTablaAsignarFuenteNew]);




  // useEffect(() => {
  //   if (tablaAsignarFuenteNew.length > 0 && porcentajesTablaEnCeros.length === 0) {
  //     agregarRegistrosAFideicomiso(tablaAsignarFuenteNew);
  //   }
  // }, [tablaAsignarFuenteNew]);



  return (
    <Grid
      container
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Grid mt={2}>
        <Divider sx={queries.bold_text}>ASIGNAR FUENTE</Divider>
      </Grid>

      <Grid
        container
        height={{ xs: "20rem", sm: "4rem" }}
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          mt: 2,
        }}
        mb={{ xs: 0, sm: 15 }}
      >
        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Clasificación</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={[{ Descripcion: "Fuente de Pago" }]}
            value={filtro.Clasificacion}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              console.log("text", text);
              setFiltro({
                Clasificacion: {
                  Descripcion: text?.Descripcion || "",
                },
                TipoFuente: { Id: "", Descripcion: "" },
                FuentePago: { Id: "", Descripcion: "" },
                RespectoA: { Descripcion: "" },
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Tipo de Fuente</InputLabel>
          <Autocomplete
            disabled={filtro.Clasificacion.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            // options={catalogoTiposDeFuente}
            options={catalogoTiposDeFuente}
            value={filtro.TipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                TipoFuente: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },

                FuentePago: { Id: "", Descripcion: "" },
                RespectoA: { Descripcion: "" },
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Fuente de Pago</InputLabel>
          <Autocomplete
            disabled={filtro.TipoFuente.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFuentesDePago?.filter(
              (td) => td.TipoDeFuente === filtro.TipoFuente?.Id
            )}
            value={filtro.FuentePago}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                FuentePago: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                RespectoA: { Descripcion: "" },
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={10} sm={5} md={5} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Respecto A</InputLabel>
          <Autocomplete
            disabled={filtro.FuentePago.Descripcion === ""}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={[
              { Descripcion: "Fondo" },
              { Descripcion: "Fideicomitido" },
            ]}
            value={filtro.RespectoA}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setFiltro({
                ...filtro,
                RespectoA: {
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          display={"flex"}
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
          xs={10}
          sm={5}
          md={5}
          lg={1}
          xl={1}
          mt={{ xs: 0, sm: 4 }}
        >
          <ThemeProvider theme={buttonTheme}>
            <Button
              disabled={filtro.RespectoA.Descripcion === ""}
              onClick={() => {
                setTablaAsignarFuenteNew(
                  JSON.parse(mecanismoVehiculoPago.TipoMovimiento).filter(
                    (i: IDeudorFideicomisoNew) =>
                      i.tipoFuente.Descripcion ===
                      filtro.TipoFuente.Descripcion &&
                      i.fondoIngreso.Descripcion === filtro.FuentePago.Descripcion
                  )
                );
                setFiltro({
                  Clasificacion: {
                    Descripcion: "Fuente de Pago",
                  },
                  TipoFuente: { Id: "", Descripcion: "" },
                  FuentePago: { Id: "", Descripcion: "" },
                  RespectoA: { Descripcion: "" },
                });
              }}
              sx={queries.buttonContinuar}
            >
              Aceptar
            </Button>
          </ThemeProvider>

        </Grid>
      </Grid>

      <Grid
        container
        mt={1}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
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
                  {headsNews.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography
                        sx={{
                          // fontSize: ".7rem",
                          fontFamily: "MontserratRegular",
                        }}
                      >
                        {head.Label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaAsignarFuenteNew.map((movimiento: any, index: number) => {

                  // const agregarRegistrosAFideicomiso = (registro: any) => {
                  //   const registrosParaTabla = tablaAsignarFuenteNew.map((reg) => ({
                  //     ...reg,
                  //     AfectadoTotalIngreso: 0, // o ""
                  //     EquivalenciaCorrespondienteMunicipios: 0, // o ""
                  //   }));
                  //   setPorcentajesTablaEnCeros(registrosParaTabla);
                  console.log("movimiento", movimiento)
                  // };

                  return (

                    <StyledTableRow key={index}>

                      <StyledTableCell align="center">
                        {movimiento.id}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {movimiento.tipoFuente.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {movimiento.fondoIngreso.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {movimiento?.fideicomitente?.Descripcion ||
                          movimiento?.mandatario?.Descripcion ||
                          movimiento?.entePublicoObligado?.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {/* Poner la funcion updateTipoMovimientoField en cada fuente de pago*/}
                        <TextField
                          type="number"
                          value={
                            movimiento.AfectadoTotalIngreso === 0 || movimiento.AfectadoTotalIngreso
                              ? movimiento.AfectadoTotalIngreso
                              : ""
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (parseFloat(newValue) > OriginalTablaAsignarFuenteNew[index].AfectadoTotalIngreso) {
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', "" as any);
                              setValidacioDialogAsignarFuente({
                                openDialog: true,
                                message: "AfectadoTotalIngreso",
                                montoOriginal: OriginalTablaAsignarFuenteNew[index].AfectadoTotalIngreso
                              });

                            } else {
                              // Permitimos vacío (input en blanco) temporalmente
                              if (newValue === "") {
                                updateTipoMovimientoField(index, 'AfectadoTotalIngreso', "" as any);
                              } else {
                                updateTipoMovimientoField(index, 'AfectadoTotalIngreso', Number(newValue));
                              }
                            }

                          }}
                          inputProps={{ min: 0 }}
                        />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <TextField
                          type="number"
                          disabled={movimiento?.tipoEntePublicoObligado?.Descripcion?.toLowerCase() !== "gobierno estatal"}
                          value={movimiento?.tipoEntePublicoObligado?.Descripcion?.toLowerCase() === "gobierno estatal"
                            ? (movimiento?.EquivalenciaCorrespondienteMunicipios || '')
                            : movimiento?.tipoFideicomitente?.Descripcion?.toLowerCase() === "gobierno estatal"
                              ? (movimiento?.EquivalenciaCorrespondienteMunicipios || '') : 0}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (parseFloat(newValue) > OriginalTablaAsignarFuenteNew[index].EquivalenciaCorrespondienteMunicipios) {
                              updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', "" as any);
                              setValidacioDialogAsignarFuente({
                                openDialog: true,
                                message: "EquivalenciaCorrespondienteMunicipios",
                                montoOriginal: OriginalTablaAsignarFuenteNew[index].EquivalenciaCorrespondienteMunicipios
                              });
                            } else {
                              if (newValue === "") {
                                updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', "" as any);
                              } else {
                                updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', Number(newValue));
                              }
                            }
                          }}
                          inputProps={{ min: 0 }}
                        />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <IconButton
                          type="button"
                          // disabled={
                          //   reestructura === "con autorizacion" ||
                          //   reestructura === "sin autorizacion"
                          // }
                          onClick={() =>
                            removeTablaAsignarFuente(index)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {sumaPorcentajeAcumulado.SumaAcumuladoEstado}
                      </StyledTableCell>
                      <StyledTableCell align="center">0.00</StyledTableCell>

                      <StyledTableCell align="center">
                        <TextField
                          disabled={
                            mecanismoVehiculoPago.MecanismoPago.toLowerCase() ===
                            "mandato" ||
                            mecanismoVehiculoPago.MecanismoPago.toLowerCase() ===
                            "instruccion irrevocable"
                          }
                          type="number"
                          inputProps={{
                            sx: {
                              fontSize: "0.7rem",
                            },
                          }}
                          size="small"
                          value={movimiento.fondoIngresoAfectadoXMunicipio}
                          onChange={(v) => {
                            let auxArray = [...tablaAsignarFuente];
                            let val = Number(v.target.value);

                            auxArray[index].fondoIngresoAfectadoXMunicipio =
                              val.toString();

                            addPorcentaje(auxArray);
                          }}
                        />
                      </StyledTableCell> */}
                      <StyledTableCell />
                      <StyledTableCell />
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid mt={4}>
        <Divider sx={queries.bold_text}>GARANTÍA DE PAGO</Divider>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
      >
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Tipo de Garantía de Pago
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={["No Aplica"]}
            value={garantiaPago}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  <Typography>{option}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => setGarantiaPago(text)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ""
            }
          />
        </Grid>
      </Grid>

      <Dialog open={validacionDialogAsignarFuente.openDialog}
        onClose={() => setValidacioDialogAsignarFuente({
          ...validacionDialogAsignarFuente,
          openDialog: !validacionDialogAsignarFuente.openDialog
        })}
      >
        <DialogTitle>
          <Typography sx={queries.bold_text_Largo_Plazo}>
            {validacionDialogAsignarFuente.message === "AfectadoTotalIngreso"
              ? "Se Excedio el Porcentaje Afectado Sobre el Total de Ingreso"
              : "Se Excedio la Equivalencia Sobre Sin incluir el Monto que Corresponde a los Municipios"}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography sx={queries.medium_text}>
            Por favor, verifica el monto ingresado o modifique el registro de la fuente de pago para aumentar el porcentaje.
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <br /> Porcentaje Original del Registro:  <strong>{validacionDialogAsignarFuente.montoOriginal}%</strong>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Grid display={"flex"} justifyContent={"space-evenly"} width={"100%"}>
            <Button sx={queries.buttonContinuar}
              onClick={() => {
                setValidacioDialogAsignarFuente({
                  ...validacionDialogAsignarFuente,
                  openDialog: !validacionDialogAsignarFuente.openDialog
                });
              }}
            >
              <Typography sx={queries.medium_text}>Aceptar</Typography>
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
