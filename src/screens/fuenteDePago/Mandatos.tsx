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
  const [mandatos, setMandatos] = useState<IDatosMandatos[]>([]);
  const [mandatosFiltrados, setMandatosFiltrados] = useState<IDatosMandatos[]>(
    []
  );
  const [busqueda, setBusqueda] = useState("");
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const idMandato: string = useMandatoStore((state) => state.idMandato);

  const getMandatos: Function = useMandatoStore((state) => state.getMandatos);
  const cleanMandato: Function = useMandatoStore((state) => state.cleanMandato);
  const deleteMandato: Function = useMandatoStore(
    (state) => state.deleteMandato
  );

  const setIdMandato: Function = useMandatoStore((state) => state.setIdMandato);
  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
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

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  useEffect(() => {
    getMandatos(setMandatos);
    getOrganismos();
  }, []);

  useEffect(() => {
    if (busqueda.length !== 0) {
      setMandatos(mandatos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    setMandatosFiltrados(mandatos);
  }, [mandatos]);

  useEffect(() => {
    if (openAgregarMandato === false) {
      cleanMandato();
    }
    if (!openDialogEliminar) {
      getMandatos(setMandatos);
    }
  }, [openAgregarMandato]);

  const [openDetalle, setOpenDetalle] = useState(false);

  const [detalleMandato, setDetalleMandato] = useState<IDatosMandatos>({
    AcumuladoEstado: "",
    AcumuladoMunicipios: "",
    AcumuladoOrganismos: "",
    CreadoPor: "",
    Deleted: "",
    FechaCreacion: "",
    FechaMandato: "",
    Id: "",
    Mandatario: "",
    MecanismoPago: "",
    ModificadoPor: "",
    MunicipioOrganismoMandante: "",
    NumeroMandato: "",
    SoporteDocumental: "",
    TipoEntePublicoObligado: "",
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
            sx={{
              ...queries.buttonContinuar,
              height: "75%",
            }}
            onClick={() => {
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
                {mandatosFiltrados.map((row: IDatosMandatos, index: number) => {
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
                        {row.TipoEntePublicoObligado}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.MunicipioOrganismoMandante}
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
                              editarMandato(
                                row.Id,
                                {
                                  numeroMandato: row.NumeroMandato,
                                  fechaMandato: new Date(row.FechaMandato),
                                  mandatario: catalogoOrganismos.filter(
                                    (v, index) =>
                                      v.Descripcion === row.Mandatario
                                  )[0],
                                  mandante: catalogoOrganismos.filter(
                                    (v, index) =>
                                      v.Descripcion ===
                                      row.MunicipioOrganismoMandante
                                  )[0],
                                },
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
                              setIdMandato(row?.Id || "");
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
        />
      )}

      <Dialog
        open={openDialogEliminar}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle sx={queries.bold_text}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography>¿Seguro que desea eliminar este mandato?</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              setOpenDialogEliminar(!openDialogEliminar);
              deleteMandato(idMandato);
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
        <DetalleMandato
          open={openDetalle}
          setOpen={setOpenDetalle}
          mandato={detalleMandato}
        />
      )}
    </Grid>
  );
}
