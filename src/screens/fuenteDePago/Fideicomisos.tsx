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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { AgregarFideicomisos } from "../../components/fideicomisos/dialog/AgregarFideicomisos";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../store/Fideicomiso/main";
import { Transition } from "./Mandatos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DetalleFideicomiso } from "../../components/fideicomisos/dialog/DetalleFideicomiso";

export interface IDatosFideicomiso {
  AcumuladoEstado: string;
  AcumuladoMunicipios: string;
  AcumuladoOrganismos: string;
  CreadoPor: string;
  Fiduciario: string;
  TipoFideicomiso: string;
  FechaCreacion: string;
  FechaFideicomiso: string;
  Fideicomisario: string;
  Id: string;
  ModificadoPor: string;
  NumeroFideicomiso: string;
  SoporteDocumental: string;
  TipoMovimiento: string;
  UltimaModificacion: string;
}

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Número del Fideicomiso",
  },
  {
    label: "Fecha",
  },
  {
    label: "Tipo de Fideicomiso",
  },
  {
    label: "Fiduciario",
  },
  {
    label: "Acción",
  },
];

export function Fideicomisos() {
  const [openAgregarFideicomisos, setOpenAgregarFideicomiso] = useState(false);
  const [fideicomisos, setFideicomisos] = useState<IDatosFideicomiso[]>([]);
  const [fideicomisosFiltrados, setFideicomisoFiltrados] =
    useState<IDatosFideicomiso[]>(fideicomisos);
  const [busqueda, setBusqueda] = useState("");
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const idFideicomiso: string = useFideicomisoStore(
    (state) => state.idFideicomiso
  );

  const getFideicomisos: Function = useFideicomisoStore(
    (state) => state.getFideicomisos
  );
  const cleanFideicomiso: Function = useFideicomisoStore(
    (state) => state.cleanFideicomiso
  );
  const deleteFideicomiso: Function = useFideicomisoStore(
    (state) => state.deleteFideicomiso
  );

  const setIdFideicomiso: Function = useFideicomisoStore(
    (state) => state.setIdFideicomiso
  );
  const editarFideicomiso: Function = useFideicomisoStore(
    (state) => state.editarFideicomiso
  );

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    let ResultadoBusqueda = fideicomisos.filter((elemento) => {
      if (
        elemento.NumeroFideicomiso.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaFideicomiso.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        return elemento;
      }
    });
    setFideicomisoFiltrados(ResultadoBusqueda);
  };

  const catalogoTiposDeFideicomiso: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );
  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const getTiposFideicomiso: Function = useFideicomisoStore(
    (state) => state.getTiposFideicomiso
  );
  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );
  const getSumaPorcentajeAcumulado: Function = useFideicomisoStore(
    (state) => state.getSumaPorcentajeAcumulado
  );

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  useEffect(() => {
    getFideicomisos(setFideicomisos);
    getTiposFideicomiso();
    getInstituciones();
    getSumaPorcentajeAcumulado("Fideicomisos");
  }, []);

  useEffect(() => {
    setFideicomisoFiltrados(fideicomisos);
  }, [fideicomisos]);

  useEffect(() => {
    if (busqueda.length !== 0) {
      setFideicomisoFiltrados(fideicomisos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    if (openAgregarFideicomisos === false) {
      cleanFideicomiso();
    }
    if (!openDialogEliminar) {
      getFideicomisos(setFideicomisos);
    }
  }, [openAgregarFideicomisos]);

  const [openDetalle, setOpenDetalle] = useState(false);

  const [detalleFideicomiso, setDetalleFideicomiso] =
    useState<IDatosFideicomiso>({
      AcumuladoEstado: "",
      AcumuladoMunicipios: "",
      AcumuladoOrganismos: "",
      CreadoPor: "",
      Fiduciario: "",
      TipoFideicomiso: "",
      FechaCreacion: "",
      FechaFideicomiso: "",
      Fideicomisario: "",
      Id: "",
      ModificadoPor: "",
      NumeroFideicomiso: "",
      SoporteDocumental: "",
      TipoMovimiento: "",
      UltimaModificacion: "",
    });

  return (
    <Grid height={"74vh"}>
      <Grid item>
        <LateralMenu />
      </Grid>

      <Grid
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
          Fideicomisos
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

        <Grid width={"15%"} display={"flex"} justifyContent={"center"}>
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              setOpenAgregarFideicomiso(!openAgregarFideicomisos);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

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
                width: ".7vw",
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
                {fideicomisosFiltrados.map(
                  (row: IDatosFideicomiso, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {row.NumeroFideicomiso}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {format(new Date(row.FechaFideicomiso), "PPP", {
                            locale: es,
                          })}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.TipoFideicomiso}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.Fiduciario}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Ver detalle">
                            <IconButton
                              type="button"
                              onClick={() => {
                                setDetalleFideicomiso(row);
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

                                auxArray.map((column: any) => {
                                  return (
                                    (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                      Number(
                                        sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                      ).toString()),
                                    (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                      Number(
                                        sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                      ).toString()),
                                    (column.acumuladoAfectacionOrganismoEntre100 =
                                      Number(
                                        sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                      ).toString())
                                  );
                                });

                                editarFideicomiso(
                                  row.Id,
                                  {
                                    numeroFideicomiso: row.NumeroFideicomiso,
                                    fechaFideicomiso: new Date(
                                      row.FechaFideicomiso
                                    ),
                                    tipoFideicomiso:
                                      catalogoTiposDeFideicomiso.filter(
                                        (v, index) =>
                                          v.Descripcion === row.TipoFideicomiso
                                      )[0],
                                    fiduciario: catalogoInstituciones.filter(
                                      (v, index) =>
                                        v.Descripcion === row.Fiduciario
                                    )[0],
                                  },
                                  JSON.parse(row.Fideicomisario),
                                  auxArray,
                                  JSON.parse(row.SoporteDocumental)
                                );

                                setOpenAgregarFideicomiso(
                                  !openAgregarFideicomisos
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
                                setIdFideicomiso(row?.Id || "");
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

      {openAgregarFideicomisos && (
        <AgregarFideicomisos
          handler={setOpenAgregarFideicomiso}
          openState={openAgregarFideicomisos}
        />
      )}

      <Dialog
        open={openDialogEliminar}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle sx={queries.bold_text}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography>¿Seguro que desea eliminar este fideicomiso?</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              deleteFideicomiso(idFideicomiso);
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
      </Dialog>

      {openDetalle && (
        <DetalleFideicomiso
          open={openDetalle}
          setOpen={setOpenDetalle}
          fideicomiso={detalleFideicomiso}
        />
      )}
    </Grid>
  );
}
