/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  ThemeProvider,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { IAutorizaciones } from "../../../store/CreditoLargoPlazo/autorizacion";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import {
  getDocumentos,
  getPathDocumentosAut,
  listFile,
} from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IPathDocumentos } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import { DialogEliminarAutorizacion } from "../Dialog/DialogEliminarAutorizacion";
import { DialogNuevaAutorizacion } from "../Dialog/DialogNuevaAutorizacion";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useReestructuraStore } from "../../../store/Reestructura/main";

interface Head {
  label: string;
}
 const headsAutorizacion: Head[] = [
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
    label: "Acción",
  },
];

export function Autorizacion() {
  const [openDialogNuevaAutorizacion, setOpenNuevaAutorizacion] =
    useState(false);

  const autorizaciones: IAutorizaciones[] = useLargoPlazoStore(
    (state) => state.autorizaciones
  );

  const getAutorizaciones: Function = useLargoPlazoStore(
    (state) => state.getAutorizaciones
  );

  const setAutorizacion: Function = useLargoPlazoStore(
    (state) => state.setAutorizacion
  );

  const autorizacionSelect: IAutorizaciones = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );

  const setAutorizacionSelect: Function = useLargoPlazoStore(
    (state) => state.setAutorizacionSelect
  );

  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>(
    []
  );

  const [dialogNumAutorizacion, setDialogNumAutorizacion] = useState("");

  const [openDialogEliminarAutorizacion, setOpenDialogEliminarAutorizacion] =
    useState(false);

  const [arrDocs, setArrDocs] = useState<any>([]);

  const [accion, setAccion] = useState("");

  useEffect(() => {
    getAutorizaciones();
  }, [openDialogNuevaAutorizacion, openDialogEliminarAutorizacion]);

  const [fileSelected, setFileSelected] = useState<any>("");

  useEffect(() => {
    if (autorizacionSelect?.Id !== "") {
      getPathDocumentosAut(autorizacionSelect?.Id, setPathDocumentos);
      listFile(`/Autorizaciones/${autorizacionSelect?.Id}`, () => {});
    }
  }, [autorizacionSelect, openDialogNuevaAutorizacion]);

  useEffect(() => {
    if (pathDocumentos.length > 0) {
      let loc: any = [...arrDocs];
      pathDocumentos?.map((val: any) => {
        return getDocumentos(
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

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  return (
    <Grid
      container
      sx={{ height: "25rem" }}
      direction={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Grid container display={"flex"} justifyContent={"center"} width={"100%"}>
        <Grid item xs={10} sm={6} md={6} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>
            Autorización de la legislatura local
          </InputLabel>
          <Autocomplete
            disabled={reestructura === "con autorizacion"}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={autorizaciones}
            value={autorizacionSelect}
            getOptionLabel={(option) =>
              option.NumeroAutorizacion
                ? `${option.NumeroAutorizacion} - ${option.FechaPublicacion}`
                : ""
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
            onChange={(event, text: IAutorizaciones) => {
              setAutorizacionSelect(text);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id ||
              value.NumeroAutorizacion === "" ||
              value.Id === ""
            }
          />
        </Grid>

        <Grid
          width={"20%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          mt={{ xs: 4, md: 0 }}
        >
          <Grid item width={"100%"} display={"flex"} justifyContent={"end"}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                disabled={reestructura === "con autorizacion"}
                sx={{
                  backgroundColor: "#15212f",
                  color: "white",
                  "&&:hover": {
                    backgroundColor: "rgba(47, 47, 47, 0.4)",
                    color: "#000",
                  },
                  borderRadius: "0.8vh",
                  textTransform: "capitalize",
                  fontSize: "75%",
                  "@media (min-width: 480px)": {
                    fontSize: "80%",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: "85%",
                  },
                }}
                variant="outlined"
                onClick={() => {
                  setAccion("Agregar");
                  setOpenNuevaAutorizacion(!openDialogNuevaAutorizacion);
                }}
              >
                Nuevo
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Grid>

      {autorizacionSelect?.NumeroAutorizacion && (
        <Grid sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
          <Paper
            sx={{
              width: "95%",
            }}
          >
            <TableContainer
              sx={{
                width: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  height: ".6vh",
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
                    {headsAutorizacion.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {autorizacionSelect?.NumeroAutorizacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {autorizacionSelect?.FechaPublicacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      sx={{ width: 200 }}
                    >
                      <Typography>
                        {autorizacionSelect?.MontoAutorizado}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {autorizacionSelect?.DescripcionMedioPublicacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Tooltip title={autorizacionSelect?.DocumentoSoporte}>
                        <IconButton
                          onClick={() => {
                            setFileSelected(
                              `data:application/pdf;base64,${
                                arrDocs.filter((td: any) =>
                                  td.nombre.includes(
                                    autorizacionSelect?.DocumentoSoporte
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
                        {autorizacionSelect?.DetalleDestino &&
                          JSON.parse(autorizacionSelect?.DetalleDestino)[0]
                            .detalleDestino}
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
                          disabled={reestructura === "con autorizacion"}
                          type="button"
                          onClick={() => {
                            setDialogNumAutorizacion(
                              autorizacionSelect?.NumeroAutorizacion
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
                          disabled={reestructura === "con autorizacion"}
                          type="button"
                          onClick={() => {
                            setAccion("Editar");
                            setAutorizacion(
                              {
                                entidad: {
                                  Id: autorizacionSelect?.IdEntidad,
                                  Organismo: autorizacionSelect?.Entidad,
                                },
                                numeroAutorizacion:
                                  autorizacionSelect?.NumeroAutorizacion,
                                fechaPublicacion:
                                  autorizacionSelect?.FechaPublicacion,
                                medioPublicacion: {
                                  Id: autorizacionSelect?.IdMedioPublicacion,
                                  Descripcion:
                                    autorizacionSelect?.DescripcionMedioPublicacion,
                                },
                                montoAutorizado:
                                  autorizacionSelect?.MontoAutorizado,
                                documentoSoporte:
                                  autorizacionSelect?.DocumentoSoporte,
                                acreditacionQuorum:
                                  autorizacionSelect?.AcreditacionQuorum,
                              },
                              JSON.parse(autorizacionSelect?.DestinoAutorizado),
                              JSON.parse(autorizacionSelect?.DetalleDestino)
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
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      )}

      {openDialogEliminarAutorizacion && (
        <DialogEliminarAutorizacion
          handler={setOpenDialogEliminarAutorizacion}
          openState={openDialogEliminarAutorizacion}
          numeroAutorizacion={dialogNumAutorizacion}
        />
      )}

      {openDialogNuevaAutorizacion && (
        <DialogNuevaAutorizacion
          handler={setOpenNuevaAutorizacion}
          openState={openDialogNuevaAutorizacion}
          accion={accion}
        />
      )}

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
