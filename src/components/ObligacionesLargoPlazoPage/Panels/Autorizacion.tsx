/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { queries } from "../../../queries";
import { Autorizaciones } from "../../../store/Autorizacion/agregarAutorizacion";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { DialogNuevaAutorizacion } from "../Dialog/DialogNuevaAutorizacion";
import CloseIcon from "@mui/icons-material/Close";
import { IPathDocumentos } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import {
  getDocumento,
  getPathDocumentosAut,
  listFile,
} from "../../APIS/pathDocSol/APISDocumentos";
import EditIcon from "@mui/icons-material/Edit";
import { DialogEliminarAutorizacion } from "../Dialog/DialogEliminarAutorizacion";

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Tipo de autorización",
  },
  {
    label: "Número de autorización",
  },
  {
    label: "Fecha de publicación",
  },
  {
    label: "Monto autorizado",
  },
  {
    label: "Medio de publicación",
  },
  {
    label: "Documento soporte",
  },
  {
    label: "Detalle del destino",
  },
  {
    label: "Accion",
  },
];

export function Autorizacion() {
  const [openDialogNuevaAutorizacion, setOpenNuevaAutorizacion] =
    useState(false);

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const autorizaciones: Autorizaciones[] = useLargoPlazoStore(
    (state) => state.autorizaciones
  );

  const getAutorizaciones: Function = useLargoPlazoStore(
    (state) => state.getAutorizaciones
  );

  const idAutorizacion: string = useLargoPlazoStore(
    (state) => state.idAutorizacion
  );

  const changeIdAutorizacion: Function = useLargoPlazoStore(
    (state) => state.changeIdAutorizacion
  );

  const setAutorizacion: Function = useLargoPlazoStore(
    (state) => state.setAutorizacion
  );

  const autorizacionSelect: Autorizaciones[] = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );
  const setAutorizacionSelect: Function = useLargoPlazoStore(
    (state) => state.setAutorizacionSelect
  );

  const [indexTabla, setIndexTabla] = useState(0);

  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>(
    []
  );

  const [dialogNumAutorizacion, setDialogNumAutorizacion] = useState("");

  const [openDialogEliminarAutorizacion, setOpenDialogEliminarAutorizacion] =
    useState(false);

  const [arrDocs, setArrDocs] = useState<any>([]);

  const [fileSelected, setFileSelected] = useState<any>("");

  const [accion, setAccion] = useState("");

  useEffect(() => {
    getAutorizaciones();
  }, [openDialogNuevaAutorizacion, openDialogEliminarAutorizacion]);

  useEffect(() => {
    if (autorizacionSelect.length !== 0) {
      getPathDocumentosAut(autorizacionSelect[0]?.Id, setPathDocumentos);
      listFile(`/Autorizaciones/${autorizacionSelect[0]?.Id}`);
    }
  }, [autorizacionSelect, openDialogNuevaAutorizacion]);

  useEffect(() => {
    if (pathDocumentos.length > 0) {
      let loc: any = [...arrDocs];
      pathDocumentos?.map((val: any) => {
        return getDocumento(
          val?.Ruta?.replaceAll(`${val?.NombreIdentificador}`, "/"),
          val?.NombreIdentificador,
          (res: any, index: number) => {
            loc.push({ file: res, nombre: val.NombreArchivo });
          }
        );
      });
      setArrDocs(loc);
    }
  }, [pathDocumentos]);

  return (
    <Grid
      container
      sx={{ height: "25rem" }}
      direction={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Grid display={"flex"} justifyContent={"center"} width={"60%"}>
        <Grid item lg={4}>
          <InputLabel sx={queries.medium_text}>
            Autorización de la legislatura local
          </InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={autorizaciones}
            value={autorizacionSelect[0]}
            getOptionLabel={(option) =>
              `${option.NumeroAutorizacion} - ${format(
                new Date(option.FechaPublicacion),
                "dd/MM/yyyy"
              )}`
            }
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{`${option.NumeroAutorizacion} - ${format(
                    new Date(option.FechaPublicacion),
                    "dd/MM/yyyy"
                  )}`}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              let loc = autorizaciones.filter(
                (_i, index) => _i.Id === text?.Id
              );
              console.log("vairiable loc: ", loc);
              setAutorizacionSelect(loc!);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.NumeroAutorizacion === ""
            }
          />
        </Grid>

        <Grid
          width={"20%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          {/* <Grid item lg={3}>
            <Button sx={queries.buttonContinuar} variant="outlined">
              Asignar
            </Button>
          </Grid> */}

          <Grid item lg={3}>
            <Button
              sx={queries.buttonContinuar}
              variant="outlined"
              onClick={() => {
                setAccion("Agregar");
                setOpenNuevaAutorizacion(!openDialogNuevaAutorizacion);
              }}
            >
              Nuevo
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
        <Paper
          sx={{
            width: "90%",
          }}
        >
          <TableContainer sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {autorizacionSelect &&
                  autorizacionSelect.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center" component="th">
                          <Typography>{"row.destinoAutorizado"}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Typography>{row.NumeroAutorizacion}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Typography>
                            {format(
                              new Date(row.FechaPublicacion),
                              "dd/MM/yyyy"
                            )}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Typography>{row.MontoAutorizado}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Typography>
                            {row.DescripcionMedioPublicacion}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Tooltip
                            title={
                              JSON.parse(row.DocumentoSoporte)?.nombreArchivo
                            }
                          >
                            <IconButton
                              onClick={() => {
                                setFileSelected(
                                  `data:application/pdf;base64,${
                                    arrDocs.filter((td: any) =>
                                      td.nombre.includes(
                                        JSON.parse(row.DocumentoSoporte)
                                          ?.nombreArchivo
                                      )
                                    )[0].file
                                  }`
                                );

                                setShowModalPrevia(true);
                              }}
                            >
                              <FileOpenIcon></FileOpenIcon>
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th">
                          <Typography>
                            {JSON.parse(row.DetalleDestino)[0].detalleDestino}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                          }}
                          align="center"
                        >
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                setIndexTabla(index);
                                changeIdAutorizacion(row.Id || "");
                                setDialogNumAutorizacion(
                                  row.NumeroAutorizacion
                                );
                                setOpenDialogEliminarAutorizacion(
                                  !openDialogEliminarAutorizacion
                                );
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Editar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                setAccion("Editar");
                                changeIdAutorizacion(row?.Id);
                                setAutorizacion(
                                  {
                                    entidad: {
                                      Id: row.IdEntidad,
                                      Organismo: row.DescripcionEntidad,
                                    },
                                    numeroAutorizacion: row.NumeroAutorizacion,
                                    fechaPublicacion: row.FechaPublicacion,
                                    medioPublicacion: {
                                      Id: row.IdMedioPublicacion,
                                      Descripcion:
                                        row.DescripcionMedioPublicacion,
                                    },
                                    montoAutorizado: row.MontoAutorizado,
                                    documentoSoporte: JSON.parse(
                                      row.DocumentoSoporte
                                    ),
                                    acreditacionQuorum: JSON.parse(
                                      row.AcreditacionQuorum
                                    ),
                                  },
                                  JSON.parse(row.DestinoAutorizado),
                                  JSON.parse(row.DetalleDestino)
                                );
                                setOpenNuevaAutorizacion(
                                  !openDialogNuevaAutorizacion
                                );
                              }}
                            >
                              <EditIcon />
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

      <DialogEliminarAutorizacion
        idAutorizacion={idAutorizacion}
        handler={setOpenDialogEliminarAutorizacion}
        openState={openDialogEliminarAutorizacion}
        numeroAutorizacion={dialogNumAutorizacion}
        index={indexTabla}
      />

      <DialogNuevaAutorizacion
        handler={setOpenNuevaAutorizacion}
        openState={openDialogNuevaAutorizacion}
        accion={accion}
      />

      <Dialog
        open={showModalPrevia}
        onClose={() => {
          setShowModalPrevia(false);
          setArrDocs([]);
        }}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle sx={{ mb: 2 }}>
          <IconButton
            onClick={() => {
              setShowModalPrevia(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: "100vh" }}>
          <iframe
            style={{
              width: "100%",
              height: "85vh",
            }}
            src={`${fileSelected}`}
            title="description"
          ></iframe>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
