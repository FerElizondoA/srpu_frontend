/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { AgregarInstruccionesIrrevocables } from "../../components/instruccionesIrrevocables/dialog/AgregarInstruccionesIrrevocables.tsx";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useInstruccionesStore } from "../../store/InstruccionesIrrevocables/main";
import { Transition } from "./Mandatos";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DetalleInstruccion } from "../../components/instruccionesIrrevocables/dialog/DetalleInstrucciones";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFideicomisoStore } from "../../store/Fideicomiso/main";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { BarraFiltros } from "../../generics/BarraFiltros";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { IRegistro } from "../../store/CreditoLargoPlazo/fuenteDePago";
import { BarraFiltrosFuentesPago } from "../../generics/BarraFiltrosFuentesPago";
import { IDataAsignacionTipoMoviSolicitudes } from "./Fideicomisos";

export interface IDatosInstrucciones {
  Id: string;
  NumeroCuenta: string;
  CLABE: string;
  FechaInstruccion: string;
  DescripcionBanco: string;
  TipoEntePublicoObligado: string;
  EntePublicoObligado: string;
  TipoMovimiento: string;
  AcumuladoEstado: string;
  AcumuladoMunicipios: string;
  AcumuladoOrganismos: string;
  SoporteDocumental: string;
  FechaCreacion: string;
  CreadoPor: string;
}

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Número de Cuenta",
  },
  {
    label: "Fecha de la Instrucción",
  },
  {
    label: "Cuenta CLABE",
  },
  {
    label: "Banco",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente Público Obligado",
  },
  {
    label: "Acciones",
  },
];

export function InstruccionesIrrevocables() {
  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);
  const [instrucciones, setInstrucciones] = useState<IRegistro[]>([]);

  const [busqueda, setBusqueda] = useState("");
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const idInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  );

  const getInstrucciones: Function = useInstruccionesStore(
    (state) => state.getInstrucciones
  );
  const cleanInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanInstruccion
  );
  const deleteInstruccion: Function = useInstruccionesStore(
    (state) => state.deleteInstruccion
  );

  const setIdInstruccion: Function = useInstruccionesStore(
    (state) => state.setIdInstruccion
  );
  const editarInstruccion: Function = useInstruccionesStore(
    (state) => state.editarInstruccion
  );


  // const filtrarDatos = () => {
  //   let ResultadoBusqueda = instrucciones.filter((elemento) => {
  //     if (
  //       elemento.NumeroCuenta.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.CLABE.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.DescripcionBanco.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.TipoEntePublicoObligado.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase())
  //     ) {
  //       return elemento;
  //     } else {
  //       return null;
  //     }
  //   });
  //   return setInstruccionesFiltrados(ResultadoBusqueda);
  // };

  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );

  const getSumaPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.getSumaPorcentajeAcumulado
  );

  const setTipoMecanismoVehiculoPago: Function = useLargoPlazoStore(
    (state) => state.setTipoMecanismoVehiculoPago
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const getMecanismosVehiculosPago: Function = useLargoPlazoStore(
    (state) => state.getMecanismosVehiculosPago
  );



  const DetalleAsignacionTipoMoviSolicitudes: Function = useFideicomisoStore(
    (state) => state.DetalleAsignacionTipoMoviSolicitudes
  );

  const [dataAsignacionTipoMoviSolicitudes, setDataAsignacionTipoMoviSolicitudes] = useState<IDataAsignacionTipoMoviSolicitudes[]>([]);



  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const tablaMecanismoVehiculoPago: IRegistro[] = useLargoPlazoStore(
    (state) => state.tablaMecanismoVehiculoPago
  );

  const [instruccionesFiltrados, setInstruccionesFiltrados] = useState<Array<IRegistro>>([]);
  const [datos, setDatos] = useState<Array<IRegistro>>([]);


  useEffect(() => {
    getMecanismosVehiculosPago("Instruccion Irrevocable", () => { })
    //getInstrucciones(setInstrucciones);
    getInstituciones();
    getSumaPorcentajeAcumulado("InstruccionesIrrevocables");
    setTipoMecanismoVehiculoPago("")
  }, []);

  useEffect(() => {
    setDatos(tablaMecanismoVehiculoPago);
    setInstruccionesFiltrados(tablaMecanismoVehiculoPago);
  }, [tablaMecanismoVehiculoPago]);



  useEffect(() => {
    if (busqueda.length !== 0) {
      setInstrucciones(tablaMecanismoVehiculoPago);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    if (openAgregarInstruccion === false) {
      cleanInstruccion();
    }
    if (!openDialogEliminar) {
       getMecanismosVehiculosPago("Instruccion Irrevocable", () => { })
      //getInstrucciones(setInstrucciones);
    }
  }, [openAgregarInstruccion]);

  const [openDetalle, setOpenDetalle] = useState(false);

  const [detalleInstruccion, setDetalleInstruccion] =
    useState<IRegistro>({

      MecanismoPago: "",
      Id: "",
      NumeroRegistro: "",
      FechaRegistro: "",

      TipoFideicomiso: "",
      Fiduciario: "",
      Fideicomisario: "",

      Mandatario: "",
      Mandante: "",
      TipoEntePublicoObligado: "",



      CLABE: "",
      IdBanco: "",
      NombreBanco: "",
      EntePublicoObligado: "",

      TipoMovimiento: "",
      SoporteDocumental: "",

      // Id: "",
      // NumeroCuenta: "",
      // CLABE: "",
      // FechaInstruccion: "",
      // DescripcionBanco: "",
      // TipoEntePublicoObligado: "",
      // EntePublicoObligado: "",
      // TipoMovimiento: "",
      // AcumuladoEstado: "",
      // AcumuladoMunicipios: "",
      // AcumuladoOrganismos: "",
      // SoporteDocumental: "",
      // FechaCreacion: "",
      // CreadoPor: "",
    });

  return (
    <Grid height={"74vh"}>
      <Grid item>
        <LateralMenu />
      </Grid>



      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              fontSize: "1.5ch",
            },
          }}
        >
          Instrucciones Irrevocables
        </Typography>
      </Grid>



      <BarraFiltrosFuentesPago
        Lista={datos}
        setStateFiltered={setInstruccionesFiltrados}
        CamposFecha={["FechaRegistro"]}
        setOpenDialogAgregar={setOpenAgregarInstruccion}
        openDialogAgregar={openAgregarInstruccion}
        BooleaDialog={true}
      />

      {/* <Grid
        display={"flex"}
        justifyContent={"center"}
        width={"97%"}
        height={"4rem"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              fontSize: "1.5ch",
            },
          }}
        >
          Instrucciones Irrevocables
        </Typography>
      </Grid>

      <Grid display="center" justifyContent="space-between" height={"4rem"}>
        <Grid
          width={"80%"}
          height={"75%"}
          display={"flex"}
          justifyContent={"end"}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              width: "80%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => {
                if (e.target.value === "") {
                  filtrarDatos();
                }
                setBusqueda(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => filtrarDatos()}
            >
              <GridSearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"10%"} height={"3rem"} display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              setOpenAgregarInstruccion(!openAgregarInstruccion);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid> */}

      <Grid
        container
        sx={{
          ...queries.tablaAgregarFuentesPago,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ width: "100%", height: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell key={index} align="center">
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {instruccionesFiltrados.map(
                  (row: IRegistro, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {row.NumeroRegistro}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {format(new Date(row.FechaRegistro), "PPP", {
                            locale: es,
                          })}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.CLABE}
                        </StyledTableCell>

                        <StyledTableCell align="center" >
                          <Typography sx={{
                            width: "300px",
                            fontFamily: "MontserratRegular",
                            fontSize: "1.6ch"
                          }}>
                            {row.NombreBanco}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.TipoEntePublicoObligado}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.EntePublicoObligado}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Ver detalle">
                            <IconButton
                              type="button"
                              onClick={() => {
                                setDetalleInstruccion(row);
                                setOpenDetalle(true);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Editar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                let auxArray = JSON.parse(row.TipoMovimiento);
                                DetalleAsignacionTipoMoviSolicitudes(row.Id, setDataAsignacionTipoMoviSolicitudes)
                                // auxArray.map((column: any) => {
                                //   return (
                                //     (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                //       Number(
                                //         sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                //       ).toString()),
                                //     (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                //       Number(
                                //         sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                //       ).toString()),
                                //     (column.acumuladoAfectacionOrganismoEntre100 =
                                //       Number(
                                //         sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                //       ).toString())
                                //   );
                                // });

                                editarInstruccion(
                                  row.Id,
                                  {
                                    numeroCuenta: row.NumeroRegistro,
                                    cuentaCLABE: row.CLABE,
                                    banco: catalogoInstituciones.filter(
                                      (i: ICatalogo) =>
                                        i.Descripcion === row.NombreBanco
                                    )[0],
                                    fechaInstruccion: new Date(
                                      row.FechaRegistro
                                    ),
                                  },
                                  auxArray,
                                  JSON.parse(row.SoporteDocumental)
                                );
                                setIdInstruccion(row.Id);

                                setOpenAgregarInstruccion(
                                  !openAgregarInstruccion
                                );
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                console.log("row", row);
                                DetalleAsignacionTipoMoviSolicitudes(row.Id, setDataAsignacionTipoMoviSolicitudes)
                                //setIdFideicomiso(row?.Id || "");
                                // setOpenDialogEliminar(!openDialogEliminar);
                                setIdInstruccion(row?.Id || "");
                                setOpenDialogEliminar(!openDialogEliminar);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {openAgregarInstruccion && (
        <AgregarInstruccionesIrrevocables
          handler={setOpenAgregarInstruccion}
          openState={openAgregarInstruccion}
          getMecanismosVehiculosPago={getMecanismosVehiculosPago}
          DataAsignacionTipoMoviSolicitudes={dataAsignacionTipoMoviSolicitudes}

        />
      )}

      <Dialog
        open={openDialogEliminar}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ ...queries.bold_text, display: "flex", justifyContent: "center" }}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography sx={{ ...queries.text }}>
            {dataAsignacionTipoMoviSolicitudes.length > 0
              ? "No es posible eliminar esta Instruccion Irrevocable, ya que tiene al menos una asignación vinculada a una solicitud."
              : "¿Seguro que desea eliminar esta instruccion irrevocable?"}

          </Typography>
        </DialogContent>

        <DialogActions>
          {dataAsignacionTipoMoviSolicitudes.length <= 0 ? (
            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogEliminar(!openDialogEliminar);
                //deleteFideicomiso(idFideicomiso);
                deleteInstruccion(idInstruccion);
              }}
            >
              Aceptar
            </Button>
          ) : null}

          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              setDataAsignacionTipoMoviSolicitudes([]);

            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={openDialogEliminar}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle sx={queries.bold_text}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que desea eliminar este instruccion irrevocable?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              deleteInstruccion(idInstruccion);
            }}
          >
            Aceptar
          </Button>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog> */}

      {openDetalle && (
        <DetalleInstruccion
          open={openDetalle}
          setOpen={setOpenDetalle}
          instruccion={detalleInstruccion}
        />
      )}
    </Grid>
  );
}
