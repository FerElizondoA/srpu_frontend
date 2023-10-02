import {
  Button,
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
import { forwardRef, useEffect, useState } from "react";
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

const Transition = forwardRef(function Transition(
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
  {
    label: "Ente Publico",
  },
  {
    label: "Fecha",
  },
  {
    label: "Entidad Federativa",
  },
  {
    label: "Fondo o ingreso",
  },
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

  const [busqueda, setBusqueda] = useState("");
  const [accion, setAccion] = useState("Agregar");

  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };

  const [instrucciones, setInstrucciones] = useState([]);

  const [instruccionesFiltrados, setInstruccionesFiltrados] = useState([]);

  const changeIdInstruccion: Function = useInstruccionesStore(
    (state) => state.changeIdInstruccion
  );

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

  useEffect(() => {
    getInstruccion(setInstrucciones);
    !openAgregarInstruccion && cleanInstruccion();
  }, [openAgregarInstruccion]);

  useEffect(() => {
    setInstruccionesFiltrados(instrucciones);
  }, [instrucciones]);

  const cleanInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanInstruccion
  );

  return (
    <Grid container direction={"column"} height={"75vh"}>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
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
                handleChange(e.target.value);
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

        <Grid width={"15%"} display={"flex"} justifyContent={"center"}>
          <Button
            sx={{ ...queries.buttonContinuar, height: "75%" }}
            onClick={() => {
              setAccion("Agregar");
              setOpenAgregarInstruccion(!openAgregarInstruccion);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%" }}>
        <TableContainer
          sx={{
            width: "98%",

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
              {instruccionesFiltrados.map((row: any, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {row.NumeroCuenta}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.CLABE}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.Institucion}
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

                            setInstruccionSelect(row);

                            setGeneralInstruccion({
                              numeroCuenta: row.NumeroCuenta,
                              cuentaCLABE: row.CLABE,
                              banco: {
                                Id: row.Banco,
                                Descripcion: row.Institucion,
                              },
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
                            // changeIdFideicomiso(row?.Id || "");
                            // setOpenDialogEliminar(!openDialogEliminar);
                            // getFideicomisos(setDatos);
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

      <AgregarInstruccionesIrrevocables
        handler={setOpenAgregarInstruccion}
        openState={openAgregarInstruccion}
        accion={accion}
      />
    </Grid>
  );
}
