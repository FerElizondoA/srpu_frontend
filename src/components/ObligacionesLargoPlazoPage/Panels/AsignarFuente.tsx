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
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ICatalogoClasificacion, IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IDeudorFideicomiso, IDeudorFideicomisoNew, IPorcentajeAcumulados } from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import DeleteIcon from "@mui/icons-material/Delete";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { TransitionProps } from '@mui/material/transitions';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOff';


interface HeadSelect {
  Label: string;
}

interface IDataAsignacionTipoMoviSolicitudes {
  Id: string;
  IdSolicitud: string;
  IdFuentePago: string;
  TipoMovRelacionado: string;
  NombreTipoFuentePago: string;
  IdEntePublicoObligado: string;
  IdFondoIngreso: string;
  PorcentajeOriginalIngreso: number;
  PorcentajeOriginalEquivalencia: number;
  PorcentajeUtilizadoIngreso: number;
  PorcentajeUtilizadoEquivalenci: number;
}


const headsNews: HeadSelect[] = [
  {
    Label: "Id",
  },
  {
    Label: "Clasificación"
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

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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

  const DetalleAsignacionTipoMoviSolicitudes: Function = useFideicomisoStore(
    (state) => state.DetalleAsignacionTipoMoviSolicitudes
  );

  const tablaAsignarFuente: IDeudorFideicomiso[] = useLargoPlazoStore(
    (state) => state.tablaAsignarFuente
  );

  const tablaAsignarFuenteNew: any[] = useLargoPlazoStore(
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
    Clasificacion: { Id: "", Descripcion: "" },
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

  const getCatalogoClasificacion: Function = useLargoPlazoStore(
    (state) => state.getCatalogoClasificacion
  );

  const setPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.setPorcentajeAcumulado
  );

  const porcentajeAcumuladoRegistros: IPorcentajeAcumulados = useFideicomisoStore(
    (state) => state.porcentajeAcumuladoRegistros
  );


  const DetallePorcentajesAcumuladosMultiples: Function = useFideicomisoStore(
    (state) => state.DetallePorcentajesAcumuladosMultiples
  );

  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );

  const [catalogoClasificacion, setCatalogoClasificacion] = useState<Array<ICatalogoClasificacion>>([])

  useEffect(() => {
    console.log("Entre a el useEffect de DetallePorcentajesAcumuladosMultiples")

    if (tablaAsignarFuenteNew.length > 0) {
      console.log("Entre la validacion de DetallePorcentajesAcumuladosMultiples", tablaAsignarFuenteNew)
      DetallePorcentajesAcumuladosMultiples(
        tablaAsignarFuenteNew.map((reg) => ({
          IdEntePublicoObligado: reg?.fideicomitente?.Id || reg?.entePublicoObligado?.Id || reg?.mandatario?.Id,
          IdFondoOIngreso: reg.fondoIngreso.Id,
        })),
        // (datos: any) => {
        //   // Guardarlos en zustand o estado local:
        //   addArregloPorcetajesAcumuladosRegistros(datos);
        // }
      );
    }
  }, [tablaAsignarFuenteNew]);

  useEffect(() => {

    console.log("arregloPorcetajesAcumuladosRegistros", arregloPorcetajesAcumuladosRegistros)
  }, [arregloPorcetajesAcumuladosRegistros])




  const [validacionDialogAsignarFuente, setValidacionDialogAsignarFuente] = useState({
    openDialog: false,
    registroPrevio: "",
    message: "",
    montoOriginal: 0,
    montoUtilizado: 0,
    nombreEntePublicoObligado: "",
    nombreFondoOIngreso: "",
  });

  // const ChceckAsignacionYPorcentajeAcumulado = () => {
  //   //Aqui validar que no se pase del 100% de asignacion en porcentaje y en la fuente de pago


  //   setTablaAsignarFuenteNew(
  //     JSON.parse(mecanismoVehiculoPago.TipoMovimiento)
  //       .filter(
  //         (i: IDeudorFideicomisoNew) =>
  //           i.tipoFuente.Descripcion === filtro.TipoFuente.Descripcion &&
  //           i.fondoIngreso.Descripcion === filtro.FuentePago.Descripcion
  //       )
  //       .map((item: IDeudorFideicomisoNew) => ({
  //         ...item,
  //         Clasificacion: filtro.Clasificacion, // aquí agregas la clasificación del hook
  //       }))
  //   );
  //   setFiltro({
  //     Clasificacion: {
  //       Id: "", Descripcion: "",
  //     },
  //     TipoFuente: { Id: "", Descripcion: "" },
  //     FuentePago: { Id: "", Descripcion: "" },
  //     RespectoA: { Descripcion: "" },
  //   });
  // }
  const ChceckAsignacionYPorcentajeAcumulado = () => {
    // 1️⃣ Parseamos los movimientos
    const movimientos = JSON.parse(mecanismoVehiculoPago.TipoMovimiento) as IDeudorFideicomisoNew[];

    // 2️⃣ Filtramos solo los que concuerdan con el filtro actual
    const nuevosFiltrados = movimientos
      .filter(
        (i) =>
          i.tipoFuente.Descripcion === filtro.TipoFuente.Descripcion &&
          i.fondoIngreso.Descripcion === filtro.FuentePago.Descripcion
      )
      .map((item) => ({
        ...item,
        Clasificacion: filtro.Clasificacion, // agrega la clasificación actual
      }));

    // 3️⃣ Quitamos duplicados con base en el id
    const idsExistentes = new Set(tablaAsignarFuenteNew.map((m) => m.id));
    const nuevosSinDuplicar = nuevosFiltrados.filter((n) => !idsExistentes.has(n.id));

    // 4️⃣ Unimos los nuevos con los anteriores
    const merged: IDeudorFideicomisoNew[] = [...tablaAsignarFuenteNew, ...nuevosSinDuplicar];

    // 5️⃣ Actualizamos el estado en el store
    setTablaAsignarFuenteNew(merged);

    // 6️⃣ Limpiamos el filtro como antes
    setFiltro({
      Clasificacion: { Id: "", Descripcion: "" },
      TipoFuente: { Id: "", Descripcion: "" },
      FuentePago: { Id: "", Descripcion: "" },
      RespectoA: { Descripcion: "" },
    });
  };
  const [asignacionRegistrosPrevios, setAsignacionRegistrosPrevios] = useState<Array<IDataAsignacionTipoMoviSolicitudes>>([])



  useEffect(() => {
    getCatalogoClasificacion(setCatalogoClasificacion)
    getTiposDeFuente();
    getFuentesPago();
    getSumaPorcentajeAcumulado(mecanismoVehiculoPago.MecanismoPago);
    DetalleAsignacionTipoMoviSolicitudes(mecanismoVehiculoPago.Id, setAsignacionRegistrosPrevios)
  }, []);

  useEffect(() => {
    console.log("asignacionRegistrosPrevios DATOS", asignacionRegistrosPrevios)
  }, [asignacionRegistrosPrevios])






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


  const tablaConValoresAjustados = tablaAsignarFuenteNew.map((mov) => {
    const registroPrevio = asignacionRegistrosPrevios.find(
      (r) => r.TipoMovRelacionado === mov.id
    );

    if (registroPrevio) {
      return {
        ...mov,
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0,
      };
    }
    return mov;
  });

  const handleChange = (index: number, field: "AfectadoTotalIngreso" | "EquivalenciaCorrespondienteMunicipios", value: number) => {
    updateTipoMovimientoField(
      index,
      field,
      value,
      asignacionRegistrosPrevios,
      () => setValidacionDialogAsignarFuente(
        {
          openDialog: true,
          registroPrevio: "",
          message: "",
          montoOriginal: 0,
          montoUtilizado: 0,
          nombreEntePublicoObligado: "",
          nombreFondoOIngreso: "",
        }
      ) // 👈 callback cuando hay error
    );
  };


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
            options={catalogoClasificacion}
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
                  Id: text?.Id || "", Descripcion: text?.Descripcion || "",
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
            getOptionDisabled={(option) =>
              option.Descripcion === "Garantía" &&
              tablaAsignarFuenteNew.some(
                (item) => item.Clasificacion.Descripcion === "Garantía"
              )
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
                // setTablaAsignarFuenteNew(
                //   JSON.parse(mecanismoVehiculoPago.TipoMovimiento).filter(
                //     (i: IDeudorFideicomisoNew) =>
                //       i.tipoFuente.Descripcion ===
                //       filtro.TipoFuente.Descripcion &&
                //       i.fondoIngreso.Descripcion === filtro.FuentePago.Descripcion
                //   )
                // );

                ChceckAsignacionYPorcentajeAcumulado()

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
                  console.log("movimiento", movimiento)
                  return (

                    <StyledTableRow key={index}>

                      <StyledTableCell align="center">
                        {movimiento.id}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {movimiento?.Clasificacion?.Descripcion}
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
                        <TextField
                          type="number"
                          value={
                            movimiento.AfectadoTotalIngreso
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;

                            const registroPrevio = asignacionRegistrosPrevios.find(
                              (r) => r.TipoMovRelacionado === movimiento.id
                            );
                            const registroPrevioPorcentajeAcumulado = arregloPorcetajesAcumuladosRegistros.find(
                              (R) => R.IdEntePublicoObligado === (movimiento?.fideicomitente?.Id
                                || movimiento?.entePublicoObligado?.Id || movimiento.mandatario?.Id))

                            console.log("registroPrevioPorcentajeAcumulado", registroPrevioPorcentajeAcumulado)

                            console.log("registroPrevio", registroPrevio)


                            if (registroPrevioPorcentajeAcumulado && (parseFloat(newValue) > 100 - registroPrevioPorcentajeAcumulado.AfectadoTotalIngreso)) {
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', "" as any);
                              setValidacionDialogAsignarFuente({
                                openDialog: true,
                                registroPrevio: "PorcentajeAcumulado",
                                message: "AfectadoTotalIngreso",
                                montoOriginal: 100,
                                montoUtilizado: registroPrevioPorcentajeAcumulado.AfectadoTotalIngreso,
                                nombreEntePublicoObligado: registroPrevioPorcentajeAcumulado.NombreEntePublico,
                                nombreFondoOIngreso: registroPrevioPorcentajeAcumulado.NombreFondoOIngreso,
                              });
                            } else if (registroPrevio && (parseFloat(newValue) > registroPrevio?.PorcentajeOriginalIngreso - registroPrevio.PorcentajeUtilizadoIngreso)) {
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', "" as any);
                              setValidacionDialogAsignarFuente({
                                openDialog: true,
                                registroPrevio: "Asignacion",
                                message: "AfectadoTotalIngreso",
                                montoOriginal: OriginalTablaAsignarFuenteNew[index].AfectadoTotalIngreso,
                                montoUtilizado: registroPrevio?.PorcentajeOriginalIngreso - registroPrevio.PorcentajeUtilizadoIngreso,
                                nombreEntePublicoObligado: "",
                                nombreFondoOIngreso: "",
                              });
                            } else if (parseFloat(newValue) > OriginalTablaAsignarFuenteNew[index].AfectadoTotalIngreso) {
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', "" as any);
                              setValidacionDialogAsignarFuente({
                                openDialog: true,
                                registroPrevio: "SinRegistro",
                                message: "AfectadoTotalIngreso",
                                montoOriginal: OriginalTablaAsignarFuenteNew[index].AfectadoTotalIngreso,
                                montoUtilizado: 0,
                                nombreEntePublicoObligado: "",
                                nombreFondoOIngreso: "",
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
                          disabled={
                            movimiento?.tipoEntePublicoObligado?.Descripcion?.toLowerCase() !==
                            "gobierno estatal"
                          }
                          value={
                            movimiento?.tipoEntePublicoObligado?.Descripcion?.toLowerCase() ===
                              "gobierno estatal"
                              ? movimiento.EquivalenciaCorrespondienteMunicipios
                              : movimiento?.tipoFideicomitente?.Descripcion?.toLowerCase() ===
                                "gobierno estatal"
                                ? movimiento.EquivalenciaCorrespondienteMunicipios
                                : 0
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;
                            const registroPrevio = asignacionRegistrosPrevios.find(
                              (r) => r.TipoMovRelacionado === movimiento.id
                            );

                            let maxPermitido = 0;
                            if (registroPrevio) {
                              maxPermitido =
                                registroPrevio.PorcentajeOriginalEquivalencia -
                                registroPrevio.PorcentajeUtilizadoEquivalenci;
                            } else {
                              maxPermitido =
                                OriginalTablaAsignarFuenteNew[index].EquivalenciaCorrespondienteMunicipios;
                            }

                            if (parseFloat(newValue) > maxPermitido) {
                              updateTipoMovimientoField(index, "EquivalenciaCorrespondienteMunicipios", "" as any);
                              setValidacionDialogAsignarFuente({
                                openDialog: true,
                                registroPrevio: "NoPrevio",
                                message: "EquivalenciaCorrespondienteMunicipios",
                                montoOriginal: maxPermitido,
                                montoUtilizado: 0,
                                nombreEntePublicoObligado: "",
                                nombreFondoOIngreso: "",
                              });
                              console.log("validacionDialogAsignarFuente.montoOriginal", validacionDialogAsignarFuente.montoOriginal)
                              return;
                            }

                            if (newValue === "") {
                              updateTipoMovimientoField(index, "EquivalenciaCorrespondienteMunicipios", "" as any);
                            } else {
                              updateTipoMovimientoField(index, "EquivalenciaCorrespondienteMunicipios", Number(newValue));
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
        maxWidth='lg'
        fullWidth
        keepMounted
        onClose={() => setValidacionDialogAsignarFuente({
          ...validacionDialogAsignarFuente,
          openDialog: !validacionDialogAsignarFuente.openDialog
        })}
      >
        <DialogTitle sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Typography sx={{
            fontSize: "1.2rem", fontWeight: "bold", fontFamily: "MontserratBold",
          }}>
            {validacionDialogAsignarFuente.registroPrevio === "Asingacion" ?
              validacionDialogAsignarFuente.message === "AfectadoTotalIngreso"
                ? "Se Excedio el Porcentaje Disponible en Afectado Sobre el Total de Ingreso"
                : "Se Excedio la Porcentaje Disponible en Equivalencia Sobre Sin incluir el Monto que Corresponde a los Municipios"
              : validacionDialogAsignarFuente.message === "AfectadoTotalIngreso"
                ? "Se Excedio el Porcentaje Afectado Sobre el Total de Ingreso"
                : "Se Excedio la Equivalencia Sobre Sin incluir el Monto que Corresponde a los Municipios"}
          </Typography>
        </DialogTitle>


        <DialogContent>
          <HighlightOffSharpIcon sx={{ width: "100%", fontSize: "5rem", color: "red", display: "flex", justifyContent: "center" }} />


          {validacionDialogAsignarFuente.registroPrevio === "Asignacion" || validacionDialogAsignarFuente.registroPrevio === "SinRegistro" ?

            <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex" }}>
              Por favor, verifica el monto ingresado o modifique el registro de la fuente de pago para aumentar el porcentaje.
            </Typography>
            : validacionDialogAsignarFuente.registroPrevio === "PorcentajeAcumulado" ?
              <Typography sx={queries.medium_text}>
                Se ha excedido el porcentaje acumulado disponible de la fuente de pago seleccionada
              </Typography>

              : null
          }



          {validacionDialogAsignarFuente.registroPrevio === "Asignacion" ?
            <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Typography sx={{ ...queries.medium_text }}>
                <br /> Porcentaje Original del Registro:  <strong>{validacionDialogAsignarFuente.montoOriginal}%</strong>
              </Typography>
              <Typography sx={{ ...queries.medium_text }}>
                <br /> Porcentaje Disponible del Registro:  <strong>{validacionDialogAsignarFuente.montoUtilizado}%</strong>
              </Typography>
            </Grid>
            : validacionDialogAsignarFuente.registroPrevio === "PorcentajeAcumulado" ?
              <Grid>
                <Typography sx={{ ...queries.medium_text }}>
                  <br /> Para el ente publico obligado: <strong>{validacionDialogAsignarFuente.nombreEntePublicoObligado}</strong>
                  <br /> Con el fondo o ingreso: <strong>{validacionDialogAsignarFuente.nombreFondoOIngreso}</strong>,
                  <br /> Porcentaje acumulado utilizado es de:  <strong>{validacionDialogAsignarFuente.montoUtilizado}%</strong>
                  {/* <br /> <br /> Favor de revisar el porcentaje ingresado. */}
                </Typography>
                <Typography sx={{ ...queries.medium_text, display: "flex", justifyContent: "center" }}>
                  <br />  Favor de revisar el porcentaje ingresado.
                </Typography>
              </Grid>
              : validacionDialogAsignarFuente.registroPrevio === "SinRegistro" ?
                <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex", alignItems: "end" }}>
                  <br /> Porcentaje Original del Registro:  <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoOriginal}%</strong>
                </Typography>
                : null
          }
        </DialogContent>




        <DialogActions>
          <Grid display={"flex"} justifyContent={"space-evenly"} width={"100%"}>
            <Button sx={queries.buttonContinuar}
              onClick={() => {
                setValidacionDialogAsignarFuente({
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
    </Grid >
  );
}
