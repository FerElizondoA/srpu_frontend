/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
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
import { format } from "date-fns";
import * as React from "react";
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

export interface IDatosFideicomiso {
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
    label: "Numero del Fideicomiso",
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Fideicomisos() {
  const [openAgregarFideicomisos, changeAgregarFideicomisos] = useState(false);

  const getFideicomisos: Function = useFideicomisoStore(
    (state) => state.getFideicomisos
  );

  const [fideicomisos, setFideicomisos] = useState<IDatosFideicomiso[]>([]);

  const deleteFideicomiso: Function = useFideicomisoStore(
    (state) => state.deleteFideicomiso
  );

  const idFideicomiso: string = useFideicomisoStore(
    (state) => state.idFideicomiso
  );

  const changeIdFideicomiso: Function = useFideicomisoStore(
    (state) => state.setIdFideicomiso
  );

  const editarFideicomiso: Function = useFideicomisoStore(
    (state) => state.editarFideicomiso
  );

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const [busqueda, setBusqueda] = useState("");
  const [fideicomisosFiltrados, setFideicomisoFiltrados] =
    useState<Array<IDatosFideicomiso>>(fideicomisos);

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

  useEffect(() => {
    setFideicomisoFiltrados(fideicomisos);
  }, [fideicomisos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length !== 0 ? setFideicomisoFiltrados(fideicomisos) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );
  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );
  const getTiposFideicomiso: Function = useFideicomisoStore(
    (state) => state.getTiposFideicomiso
  );
  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );
  const getOrdenesFideicomisario: Function = useFideicomisoStore(
    (state) => state.getOrdenesFideicomisario
  );

  useEffect(() => {
    getFideicomisos(setFideicomisos);
    getOrganismos();
    getTipoEntePublicoObligado();
    getTiposFideicomiso();
    getOrdenesFideicomisario();
    getInstituciones();
    getTiposDeFuenteInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  const catalogoTiposDeFideicomiso: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );
  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const cleanFideicomiso: Function = useFideicomisoStore(
    (state) => state.cleanFideicomiso
  );

  useEffect(() => {
    if (openAgregarFideicomisos === false) {
      cleanFideicomiso();
    }
  }, [openAgregarFideicomisos]);

  useEffect(() => {
    if (!openDialogEliminar) {
      getFideicomisos(setFideicomisos);
    }
  }, [openAgregarFideicomisos]);

  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
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
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
          }}
        >
          Fideicomisos
        </Typography>
      </Grid>

      <Grid
        item
        mb={2}
        lg={12}
        display="center"
        justifyContent="space-between"
        width={"90%"}
      >
        <Grid width={"80%"} display={"flex"} justifyContent={"end"}>
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
                handleChange(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"10%"} display={"flex"} justifyContent={"start"}>
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              changeAgregarFideicomisos(!openAgregarFideicomisos);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Grid
        item
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        sx={{
          marginBottom: "2rem",
          height: "28rem",
          "@media (min-width: 480px)": {
            height: "20rem",
            marginBottom: "0",
          },

          "@media (min-width: 768px)": {
            height: "38rem",
          },

          "@media (min-width: 1140px)": {
            height: "38rem",
          },

          "@media (min-width: 1400px)": {
            height: "32rem",
          },

          "@media (min-width: 1870px)": {
            height: "46rem",
          },
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
                {fideicomisosFiltrados.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.NumeroFideicomiso.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {format(new Date(row.FechaFideicomiso), "dd/MM/yyyy")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.TipoFideicomiso.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Fiduciario.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
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
                                JSON.parse(row.TipoMovimiento),
                                JSON.parse(row.SoporteDocumental)
                              );

                              changeAgregarFideicomisos(
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
                              changeIdFideicomiso(row?.Id || "");
                              setOpenDialogEliminar(!openDialogEliminar);
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

      {openAgregarFideicomisos && (
        <AgregarFideicomisos
          handler={changeAgregarFideicomisos}
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
    </Grid>
  );
}
