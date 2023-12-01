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
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { AgregarMandatos } from "../../components/mandatos/dialog/AgregarMandatos";
import { queries } from "../../queries";
import { useMandatoStore } from "../../store/Mandatos/main";
import { DatosGeneralesMandato } from "../../store/Mandatos/mandato";

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

const heads: Head[] = [
  {
    label: "Número de mandato",
  },
  {
    label: "Fecha del mandato",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Organismo / Municipio Mandante",
  },
  {
    label: "Tipo ente publico obligado",
  },
  {
    label: "Acciones",
  },
];

export function Mandatos() {
  const [accion, setAccion] = useState("Agregar");

  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);

  const getMandatos: Function = useMandatoStore((state) => state.getMandato);

  const cleanMandato: Function = useMandatoStore((state) => state.cleanMandato);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const [busqueda, setBusqueda] = useState("");
  const [mandatos, setMandatos] = useState<IDatosMandatos[]>([]);
  const [mandatosFiltrados, setMandatosFiltrados] = useState<IDatosMandatos[]>(
    []
  );

  const filtrarDatos = () => {
    let ResultadoBusqueda = mandatos.filter((elemento) => {
      if (
        elemento.NumeroMandato.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaCreacion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Mandatario.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MunicipioOrganismoMandante.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoEntePublicoObligado.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        return elemento;
      } else return null;
    });
    setMandatosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    if (busqueda.length !== 0) {
      setMandatos(mandatos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    getMandatos(setMandatos);
  }, []);

  const borrarMandato: Function = useMandatoStore(
    (state) => state.borrarMandato
  );

  const idMandato: string = useMandatoStore((state) => state.idMandato);

  const changeIdMandato: Function = useMandatoStore(
    (state) => state.changeIdMandato
  );

  const setMandatoSelect: Function = useMandatoStore(
    (state) => state.setMandatoSelect
  );

  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );

  const setDatosGenerales: Function = useMandatoStore(
    (state) => state.setDatosGenerales
  );

  const datosGenerales: DatosGeneralesMandato = useMandatoStore(
    (state) => state.datosGenerales
  );

  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  useEffect(() => {
    setMandatosFiltrados(mandatos);
  }, [mandatos]);

  useEffect(() => {
    getMandatos(setMandatos);
    !openAgregarMandato && cleanMandato();
  }, [openAgregarMandato]);

  return (
    <Grid height={"74vh"}>
      <Grid item>
        {/* {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />} */}
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
          Mandatos
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

        <Grid width={"15%"} display={"flex"} justifyContent={"center"}>
          <Button
            sx={{
              ...queries.buttonContinuar,
              height: "75%",
            }}
            onClick={() => {
              setDatosGenerales({
                ...datosGenerales,
                numeroMandato: "",
                fechaMandato: new Date(),
              });
              editarMandato([], []);
              setAccion("Agregar");
              setOpenAgregarMandato(!openAgregarMandato);
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
                {mandatosFiltrados.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.NumeroMandato}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {format(new Date(row.FechaMandato), "PPP", {
                          locale: es,
                        })}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.Mandatario}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.MunicipioOrganismoMandante}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.TipoEntePublicoObligado}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setAccion("Editar");

                              changeIdMandato(row?.Id);

                              setMandatoSelect(row);
                              setDatosGenerales({
                                ...datosGenerales,
                                numeroMandato: row.NumeroMandato,
                                fechaMandato: new Date(row.FechaMandato),
                              });
                              editarMandato(
                                JSON.parse(row.TipoMovimiento),
                                JSON.parse(row.SoporteDocumental)
                              );

                              setOpenAgregarMandato(!openAgregarMandato);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              changeIdMandato(row?.Id || "");
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

      {openAgregarMandato && (
        <AgregarMandatos
          handler={setOpenAgregarMandato}
          openState={openAgregarMandato}
          accion={accion}
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
              borrarMandato(idMandato);
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
