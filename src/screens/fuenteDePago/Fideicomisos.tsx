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
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { AgregarFideicomisos } from "../../components/fideicomisos/dialog/AgregarFideicomisos";
import { queries } from "../../queries";
import {
  Fideicomisario,
  Fideicomiso,
  GeneralFideicomiso,
  SoporteDocumental,
  TipoMovimiento,
} from "../../store/Fideicomiso/fideicomiso";
import * as React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ICatalogo } from "../Config/Catalogos";
import { useNavigate } from "react-router-dom";
import { IEntePublico } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { format } from "date-fns";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import axios from "axios";
import Swal from "sweetalert2";


export interface IDatos {
  DescripcionFiudiciario: string
  DescripcionTipoFideicomiso: string
  FechaCreacion: string
  FechaDeFideicomiso: string
  Id: string
  IdFiudiciario: string
  IdTipoFideicomiso: string
  ModificadoPor: string
  NumeroDeFideicomiso: string
  SoporteDocumental: string
  TipoDeMovimiento: string
  UltimaModificacion: string
}



interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Numero del fideicomiso",
  },
  {
    label: "Fecha",
  },
  {
    label: "Tipo de fideicomiso",
  },
  {
    label: "Fiudiciario",
  },
  {
    label: "Accion",
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
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const navigate = useNavigate();


  //
  const [openAgregarFideicomisos, changeAgregarFideicomisos] = useState(false);

  const [accion, setAccion] = useState("Agregar");

  const tablaFideicomisos: IDatos[] = useCortoPlazoStore(
    (state) => state.tablaFideicomisos
  );


  const getFideicomisos: Function = useCortoPlazoStore(
    (state) => state.getFideicomisos
  );

  const borrarFideicomiso: Function = useCortoPlazoStore(
    (state) => state.borrarFideicomiso
  );

  const idFideicomiso: string = useCortoPlazoStore(
    (state) => state.idFideicomiso
  );

  const changeIdFideicomiso: Function = useCortoPlazoStore(
    (state) => state.changeIdFideicomiso
  );

  const setGeneralFideicomiso: Function = useCortoPlazoStore(
    (state) => state.setGeneralFideicomiso
  );

  const editarSolicitud: Function = useCortoPlazoStore(
    (state) => state.editarFideicomiso
  );


  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };


  const [datos, setDatos] = useState<Array<IDatos>>([]);
  const [busqueda, setBusqueda] = useState("");
  const [fideicomisos, setFideicomiso] = useState<Array<IDatos>>([]);
  const [fideicomisosFiltrados, setFideicomisoFiltrados] = useState<Array<IDatos>>([]);



  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    let ResultadoBusqueda = datos.filter((elemento) => {
      if (
        elemento.NumeroDeFideicomiso.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaDeFideicomiso.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.DescripcionTipoFideicomiso.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.DescripcionFiudiciario.toString()
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

    setFideicomisoFiltrados(datos);
  }, [datos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length !== 0 ? setFideicomisoFiltrados(datos) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    getFideicomisos(setDatos)
  }, []);


  useEffect(() => {
    getFideicomisos(setFideicomiso);
  }, []);




  useEffect(() => {
    if (openAgregarFideicomisos === false) {
      limpiaFideicomiso();
    }
  }, [openAgregarFideicomisos]);

  useEffect(() => {
    if (!openDialogEliminar) {
      getFideicomisos(setDatos);
    }
  }, [openAgregarFideicomisos]);





  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const limpiaFideicomiso = () => {
    changeIdFideicomiso("");

    setGeneralFideicomiso({
      numeroFideicomiso: "",
      tipoFideicomiso: { Id: "", Descripcion: "" },
      fechaFideicomiso: new Date().toString(),
      fiudiciario: { Id: "", Descripcion: "" },
    });

    editarSolicitud([], [], []);
  };

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
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

      <Grid item mb={5} lg={12} display="center" justifyContent="space-between">
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
              <SearchIcon
                onClick={() => {
                  handleSearch();
                }}
              />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"10%"} display={"flex"} justifyContent={"start"}>
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              setAccion("Agregar");
              changeAgregarFideicomisos(!openAgregarFideicomisos);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Grid item  width={"100%"} display={"flex"} justifyContent={"center"} 
      sx={{
        marginBottom:"2rem",
        height:"32rem",
        "@media (min-width: 480px)": {
          height:"20rem",
          marginBottom:"0",
          
        },
    
        "@media (min-width: 768px)": {
          height:"38rem"
        },
    
        "@media (min-width: 1140px)": {
          height:"38rem"
        },
    
        "@media (min-width: 1400px)": {
          height:"32rem"
        },
    
        "@media (min-width: 1870px)": {
          height:"46rem"
        },
    
      }}
    >
        <Paper sx={{ width:"100%", height:"100%"}}>
          <TableContainer  sx={{ height:"100%",
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
        }}>
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
                        {row.NumeroDeFideicomiso.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {format(new Date(row.FechaDeFideicomiso), "dd/MM/yyyy")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.DescripcionTipoFideicomiso.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.DescripcionFiudiciario.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setAccion("Editar");
                              changeIdFideicomiso(row?.Id);
                              setGeneralFideicomiso({
                                numeroFideicomiso: row.NumeroDeFideicomiso,
                                tipoFideicomiso: {
                                  Id: row.IdTipoFideicomiso,
                                  Descripcion: row.DescripcionTipoFideicomiso,
                                },
                                fechaFideicomiso: row.FechaDeFideicomiso,
                                fiudiciario: {
                                  Id: row.IdFiudiciario,
                                  Descripcion: row.DescripcionFiudiciario,
                                },
                              });
                              editarSolicitud(
                                JSON.parse(row.Fideicomisario),
                                JSON.parse(row.TipoDeMovimiento),
                                JSON.parse(row.SoporteDocumental)
                              );
                              changeAgregarFideicomisos(!openAgregarFideicomisos);
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
                              getFideicomisos(setDatos);
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
      <AgregarFideicomisos
        handler={changeAgregarFideicomisos}
        openState={openAgregarFideicomisos}
        accion={accion}
      />

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
              borrarFideicomiso(idFideicomiso);
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
