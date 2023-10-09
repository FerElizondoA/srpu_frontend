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
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { GridSearchIcon } from "@mui/x-data-grid";
import React, { forwardRef, useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { AgregarInstruccionesIrrevocables } from "../../components/instruccionesIrrevocables/dialog/AgregarInstruccionesIrrevocables.tsx";
import { queries } from "../../queries";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useInstruccionesStore } from "../../store/InstruccionesIrrevocables/main";


export interface IDatosInstrucciones {
  Id: string,
  NumeroCuenta: string,
  CLABE: string,
  IdBanco: string,
  DescripcionBanco: string, //Revisar nombre
  MecanismoPago: string,
  TipoMovimiento: string,
  EntePublico: string, //REVISAR NOMBRE
  FechaCreacion: string,
  CreadoPor: string,
}

const Transition = React.forwardRef(function Transition(
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
    label: "Tipo de mecanismo de pago",
  },
  {
    label: "Numero de cuenta",
  },
  {
    label: "Cuenta CLABE",
  },
  {
    label: "Banco",
  },
  // {
  //   label: "Ente Publico",
  // },
  // {
  //   label: "Fecha",
  // },
  // {
  //   label: "Entidad Federativa",
  // },
  // {
  //   label: "Fondo o ingreso",
  //},
  // {
  //   label: "Banco",
  // },
  {
    label: "Municipio",
  },
  {
    label: "Acciones",
  },
];

export function InstruccionesIrrevocables() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [accion, setAccion] = useState("Agregar");

  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);




  const setInstruccionSelect: Function = useInstruccionesStore(
    (state) => state.setInstruccionSelect
  );

  const setGeneralInstruccion: Function = useInstruccionesStore(
    (state) => state.setGeneralInstruccion
  );

  const editarInstruccion: Function = useInstruccionesStore(
    (state) => state.editarInstruccion
  );

  const getInstruccion: Function = useInstruccionesStore(
    (state) => state.getInstruccion
  );

  const changeIdInstruccion: Function = useInstruccionesStore(
    (state) => state.changeIdInstruccion
  )

  const borrarInstruccion: Function = useInstruccionesStore(
    (state) => state.borrarInstruccion
  )

  const idInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  )

  const cleanInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanInstruccion
  );
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);


  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };
  
  const [busqueda, setBusqueda] = useState("");
  const [instruccionesIrrevocables, setInstruccionesIrrevocables] = useState<IDatosInstrucciones[]>([]);
  const [instruccionesIrrevocablesFiltrado, setInstruccionesIrrevocablesFiltrado] = useState<IDatosInstrucciones[]>([]);

  // const [instrucciones, setInstrucciones] = useState([]);
  // const [instruccionesFiltrados, setInstruccionesFiltrados] = useState([]);

  const filtrarDatos = () => {

    let ResultadoBusqueda = instruccionesIrrevocables.filter((elemento) => {
      if (
        elemento.MecanismoPago.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||

        elemento.NumeroCuenta.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||

        elemento.CLABE.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||

        elemento.DescripcionBanco.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||

        elemento.EntePublico.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) 
      ) {
        return elemento;
      }
    });
    setInstruccionesIrrevocablesFiltrado(ResultadoBusqueda);
  };

  useEffect(() => {
    setInstruccionesIrrevocablesFiltrado(instruccionesIrrevocables);
  }, [instruccionesIrrevocables]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length !== 0 ? setInstruccionesIrrevocablesFiltrado(instruccionesIrrevocables) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    getInstruccion(setInstruccionesIrrevocables);
  }, []);

  useEffect(() => {
    if (openAgregarInstruccion=== false) {
      cleanInstruccion();
    }
  }, [openAgregarInstruccion]);

  useEffect(() => {
    if (!openDialogEliminar) {
      getInstruccion(setInstruccionesIrrevocables);
    }
  }, [openAgregarInstruccion]);

  useEffect(() => {
    getInstruccion(setInstruccionesIrrevocables);
    !openAgregarInstruccion && cleanInstruccion();
  }, [openAgregarInstruccion]);





  return (
    <Grid container flexDirection={"column"} justifyContent={"space-between"} >
      <Grid item>
        <LateralMenu />
        {/* //{query.isMobile ? <LateralMenuMobile /> : } */}
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

      <Grid item mb={2} lg={12} display="center" justifyContent="space-between" width={"95%"}>
        <Grid
          item
          width={"80%"}
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
                  handleSearch();
                }
                handleChange(e.target.value);
              }}
              onKeyPress={(ev) => {
                //cuando se presiona Enter
                if (ev.key === "Enter") {
                  handleSearch();
                  ev.preventDefault();
                  return false;
                }
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <GridSearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"10%"} display={"flex"} justifyContent={"center"}>
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              setAccion("Agregar");
              setOpenAgregarInstruccion(!openAgregarInstruccion);
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
        }}>
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
            <Table>
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
                {instruccionesIrrevocablesFiltrado.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.MecanismoPago}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.NumeroCuenta}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.CLABE}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.DescripcionBanco}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.EntePublico}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setAccion("Editar");
                              changeIdInstruccion(row?.Id);

                              setInstruccionSelect([row]);

                              setGeneralInstruccion({
                                //numeroCuenta: row.NumeroCuenta,
                                cuentaCLABE: row.CLABE,
                                // banco: {
                                //   Id: row.Banco,
                                //   Descripcion: row.Banco.Descripcion,
                                // },
                                 mecanismo: row.mecanismo,
                                //  municipio: row.municipio
                              });

                              editarInstruccion(JSON.parse(row.TipoMovimiento));

                              setOpenAgregarInstruccion(!openAgregarInstruccion);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              changeIdInstruccion(row?.Id || "");
                              setOpenDialogEliminar(!openDialogEliminar);
                             // getInstruccion(setDatos);
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

      <AgregarInstruccionesIrrevocables
        handler={setOpenAgregarInstruccion}
        openState={openAgregarInstruccion}
        accion={accion}
      />

      <Dialog
        open={openDialogEliminar}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle sx={queries.bold_text}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography>¿Seguro que desea eliminar este instruccion irrevocable?</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              borrarInstruccion(idInstruccion);
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
