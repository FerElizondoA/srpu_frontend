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
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { GridSearchIcon } from "@mui/x-data-grid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { AgregarMandatos } from "../../components/mandatos/dialog/AgregarMandatos";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useMandatoStore } from "../../store/Mandatos/main";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DetalleMandato } from "../../components/mandatos/dialog/DetalleMandato";
import { useFideicomisoStore } from "../../store/Fideicomiso/main";
import { BarraFiltros } from "../../generics/BarraFiltros";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import { rolesAdmin } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { IRegistro } from "../../store/CreditoLargoPlazo/fuenteDePago";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { IDataAsignacionTipoMoviSolicitudes } from "./Fideicomisos";
import { BarraFiltrosFuentesPago } from "../../generics/BarraFiltrosFuentesPago";
import {getCatalogo as getMandatarios} from "../../components/APIS/Config/APISCatalogos";

export interface IDatosMandatos {
  AcumuladoEstado: string;
  AcumuladoMunicipios: string;
  AcumuladoOrganismos: string;
  CreadoPor: string;
  Deleted: string;
  FechaCreacion: string;
  FechaMandato: string;
  Id: string;
  Mandatario: string;
  MecanismoPago: string;
  ModificadoPor: string;
  MunicipioOrganismoMandante: string;
  NumeroMandato: string;
  SoporteDocumental: string;
  TipoEntePublicoObligado: string;
  TipoMovimiento: string;
  UltimaModificacion: string;
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Número de Mandato",
  },
  {
    label: "Fecha del Mandato",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Tipo de Mandante",
  },
  {
    label: "Organismo / Municipio Mandante",
  },
  {
    label: "Acción",
  },
];

export function Mandatos() {
  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const idMandato: string = useMandatoStore((state) => state.idMandato);

  // const getMandatos: Function = useMandatoStore((state) => state.getMandatos);

  const getMecanismosVehiculosPago: Function = useLargoPlazoStore(
    (state) => state.getMecanismosVehiculosPago
  );
  const cleanMandato: Function = useMandatoStore((state) => state.cleanMandato);
  const deleteMandato: Function = useMandatoStore(
    (state) => state.deleteMandato
  );

  const setIdMandato: Function = useMandatoStore((state) => state.setIdMandato);
  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );


  const setTablaPruebaEditarFideicomiso: Function = useFideicomisoStore(
    (state) => state.setTablaPruebaEditarFideicomiso
  );


  //Todo lo que necesito para la barra de filtros***********

  const tablaMecanismoVehiculoPago: IRegistro[] = useLargoPlazoStore(
    (state) => state.tablaMecanismoVehiculoPago
  );
  const [mandatos, setMandatos] = useState<IDatosMandatos[]>([]);


  const [datos, setDatos] = useState<Array<IRegistro>>([]);
  const [mandatosFiltrados, setMandatosFiltrados] = useState<Array<IRegistro>>([]);


  useEffect(() => {
    getMecanismosVehiculosPago("Mandato", () => { })
    getOrganismos();
    
    //getMandatos(setMandatos);
  }, []);


  useEffect(() => {
    setDatos(tablaMecanismoVehiculoPago);
    setMandatosFiltrados(tablaMecanismoVehiculoPago);
  }, [tablaMecanismoVehiculoPago]);

  //Fin barra de filtros*************



  // const filtrarDatos = () => {
  //   let ResultadoBusqueda = mandatos.filter((elemento) => {
  //     if (
  //       elemento.NumeroMandato.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.FechaCreacion.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.Mandatario.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.MunicipioOrganismoMandante.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase()) ||
  //       elemento.TipoEntePublicoObligado.toString()
  //         .toLocaleLowerCase()
  //         .includes(busqueda.toLocaleLowerCase())
  //     ) {
  //       return elemento;
  //     } else return null;
  //   });
  //   setMandatosFiltrados(ResultadoBusqueda);
  // };

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );
  const getSumaPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.getSumaPorcentajeAcumulado
  );

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  // useEffect(() => {
  //   getMecanismosVehiculosPago("Mandato", () => { })
  //   //getMandatos(setMandatos);
  //   getOrganismos();
  //   // getSumaPorcentajeAcumulado("Mandatos");
  // }, []);

  useEffect(() => {
    if (busqueda.length !== 0) {
      setMandatos(mandatos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  // useEffect(() => {
  //   setMandatosFiltrados(mandatos);
  // }, [mandatos]);

  useEffect(() => {
    if (openAgregarMandato === false) {
      cleanMandato();
    }
    if (!openDialogEliminar) {
      getMecanismosVehiculosPago("Mandato", () => { });
      // getMandatos(setMandatos);
    }
  }, [openAgregarMandato]);

  const [openDetalle, setOpenDetalle] = useState(false);

  // const getDatos = () => {
  //   getSolicitudes(
  //     !rolesAdmin.includes(localStorage.getItem("Rol")!)
  //       ? "Inscripcion"
  //       : "Revision",
  //     (e: IInscripcion[]) => {
  //       setDatos(e);
  //     },
  //     setDatosFiltrados
  //   );
  // };

  const [detalleMandato, setDetalleMandato] = useState<IRegistro>({

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
  });

  const DetalleAsignacionTipoMoviSolicitudes: Function = useFideicomisoStore(
    (state) => state.DetalleAsignacionTipoMoviSolicitudes
  );

  const [dataAsignacionTipoMoviSolicitudes, setDataAsignacionTipoMoviSolicitudes] = useState<IDataAsignacionTipoMoviSolicitudes[]>([]);
    const [mandatarios, setMandatarios] = useState<ICatalogo[]>([]);

  useEffect(() => {
    getMandatarios(setMandatarios, "mandatario");
  }, []);


  // useEffect(() => {
  // setDataAsignacionTipoMoviSolicitudes([]);    
  // console.log("dataAsignacionTipoMoviSolicitudes limpiado")
  // }, [openAgregarMandato])


  return (
    <Grid >
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
          Mandatos
        </Typography>
      </Grid>



      <BarraFiltrosFuentesPago
        Lista={datos}
        setStateFiltered={setMandatosFiltrados}
        CamposFecha={["FechaRegistro"]}
        setOpenDialogAgregar={setOpenAgregarMandato}
        openDialogAgregar={openAgregarMandato}
        BooleaDialog={true}
      />



      {/* <Grid
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
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              //height: 520,

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
              height: "35rem",
              "@media (min-width: 480px)": {
                height: "30.5rem",
              },
              "@media (min-width: 768px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1140px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1400px)": {
                height: "30.5rem",
              },
              "@media (min-width: 1870px)": {
                height: "44.5rem",
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
                {mandatosFiltrados.map((row: IRegistro, index: number) => {
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
                        {row.Mandatario}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.TipoEntePublicoObligado}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.Mandante}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Ver detalle">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setDetalleMandato(row);
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


                              console.log("MANDATARIO FILTER", mandatarios.filter(
                                    (v, index) =>
                                      v.Descripcion === row.Mandatario
                                  )[0])
                                  console.log("MANDANTE FILTER", catalogoOrganismos.filter(
                                    (v, index) =>
                                      v.Descripcion === row.Mandante
                                  )[0])
                              editarMandato(
                                row.Id,
                                {
                                  numeroMandato: row.NumeroRegistro,
                                  fechaMandato: new Date(row.FechaRegistro),
                                  mandatario: mandatarios.filter(
                                    (v, index) =>
                                      v.Descripcion === row.Mandatario
                                  )[0],
                                  mandante: catalogoOrganismos.filter(
                                    (v, index) =>
                                      v.Descripcion ===
                                      row.Mandante
                                  )[0],
                                },
                                auxArray,
                                JSON.parse(row.SoporteDocumental)
                              );
                              setIdMandato(row?.Id || "");
                               setTimeout(() => {
                              setOpenAgregarMandato(!openAgregarMandato);
                                }, 1000);

                              setTablaPruebaEditarFideicomiso(JSON.parse(row.TipoMovimiento))

                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setIdMandato(row?.Id || "");
                              setOpenDialogEliminar(!openDialogEliminar);
                              DetalleAsignacionTipoMoviSolicitudes(row.Id, setDataAsignacionTipoMoviSolicitudes)


                              //Tabla prueba antes de la edicion solo para comparar.

                            }}
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

      {openAgregarMandato && (
        <AgregarMandatos
          handler={setOpenAgregarMandato}
          openState={openAgregarMandato}
          getMecanismosVehiculosPago={getMecanismosVehiculosPago}
          DataAsignacionTipoMoviSolicitudes={dataAsignacionTipoMoviSolicitudes}
          setDataAsignacionTipoMoviSolicitudes={setDataAsignacionTipoMoviSolicitudes}
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
              ? "No es posible eliminar este Mandato, ya que tiene al menos una asignación vinculada a una solicitud."
              : "¿Seguro que desea eliminar este Mandato?"}

          </Typography>
        </DialogContent>

        <DialogActions>
          {dataAsignacionTipoMoviSolicitudes.length <= 0 ? (
            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogEliminar(!openDialogEliminar);
                deleteMandato(idMandato);
              }}
            >
              Aceptar
            </Button>
          ) : null}


          {/* <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              deleteMandato(idMandato);
            }}
          >
            Aceptar
          </Button> */}
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

      {openDetalle && (
        <DetalleMandato
          open={openDetalle}
          setOpen={setOpenDetalle}
          mandato={detalleMandato}
        />
      )}
    </Grid>
  );
}
