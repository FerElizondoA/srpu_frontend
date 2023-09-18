import { Button, Grid, IconButton, InputBase, InputLabel, Paper, Slide, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { queries } from "../../queries";
import { GridSearchIcon } from "@mui/x-data-grid";
import { StyledTableCell, StyledTableRow } from "../../components/CustomComponents";
import { AgregarMandatos } from "../../components/mandatos/dialog/AgregarMandatos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";

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

export interface IDatosMandatos {
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

const heads: Head[] = [
  {
    label: "Tipo de mecanismo de pago",
  },
  {
    label: "Número de mandato",
  },
  {
    label: "Fecha",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Municipio mandante",
  },
  {
    label: "Organismo mandante",
  },
  {
    label: "Acciones"
  },
];



export function Mandatos() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [accion, setAccion] = useState("Agregar");

  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);

  const getMandatos: Function = useCortoPlazoStore(
    (state) => state.getMandato
  )

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };

  const [datos, setDatos] = useState<Array<[]>>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mandatos, setMandatos] = useState<Array<[]>>([]);
  const [mandatosFiltrados, setMandatosFiltrados] = useState<Array<[]>>([]);


  // const filtrarDatos = () => {
  //   // eslint-disable-next-line array-callback-return
  //   let ResultadoBusqueda = datos.filter((elemento) => {
  //     if (
  //       // elemento.NumeroDeFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.FechaDeFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.DescripcionTipoFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.DescripcionFiudiciario.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase())
  //     ) {
  //       return elemento;
  //     }
  //   });
  //   setMandatosFiltrados(ResultadoBusqueda);
  // };

  useEffect(() => {
    setMandatosFiltrados(mandatos);
  }, [mandatos]);

  useEffect(() => {
    setMandatosFiltrados(datos);
  }, [datos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length !== 0 ? setMandatosFiltrados(datos) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  
  useEffect(() => {
    getMandatos(setDatos)
    getMandatos(setMandatos);
  }, []);

  return (
    <Grid direction={"column"} height={"75vh"}>

      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>

      <Grid display={"flex"} justifyContent={"center"} width={"97%"} height={"4rem"} alignItems={"center"} >
        <Typography sx={{
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
        }}>
          Mandatos
        </Typography>
      </Grid>

      <Grid display="center" justifyContent="space-between" height={"4rem"}>
        <Grid width={"80%"} height={"75%"} display={"flex"} justifyContent={"end"}>
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
            sx={{
              ...queries.buttonContinuar,
              height: "75%"
            }}
            onClick={() => {
              setAccion("Agregar");
              setOpenAgregarMandato(!openAgregarMandato);
            }}
          >
            Agregar
          </Button>
        </Grid>

      </Grid>
      <Grid container sx={{
        ...queries.tablaAgregarFuentesPago,
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }} 
      >
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{
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

          }}>
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
                {mandatosFiltrados.map((row: any, index: number) => {
                  return (
                    <StyledTableRow>

                      <StyledTableCell align="center">
                        {row.mecanismoPago}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.numeroMandato}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.fechaMandato}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.Mandatario}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.MunicipioMandante}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.OrganismoMandante}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setAccion("Editar");
                              // changeIdFideicomiso(row?.Id);
                              // setGeneralFideicomiso({
                              //   numeroFideicomiso: row.NumeroDeFideicomiso,
                              //   tipoFideicomiso: {
                              //     Id: row.IdTipoFideicomiso,
                              //     Descripcion: row.DescripcionTipoFideicomiso,
                              //   },
                              //   fechaFideicomiso: row.FechaDeFideicomiso,
                              //   fiudiciario: {
                              //     Id: row.IdFiudiciario,
                              //     Descripcion: row.DescripcionFiudiciario,
                              //   },
                              // });
                              // editarSolicitud(
                              //   JSON.parse(row.Fideicomisario),
                              //   JSON.parse(row.TipoDeMovimiento),
                              //   JSON.parse(row.SoporteDocumental)
                              // );
                              // changeAgregarFideicomisos(!openAgregarFideicomisos);
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
                  )
                })}

              </TableBody>

            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <AgregarMandatos
        handler={setOpenAgregarMandato}
        openState={openAgregarMandato}
        accion={accion}
      />

    </Grid>
  );
}
