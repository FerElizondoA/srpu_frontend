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
  Divider,
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
  listFileAutorizaciones,
} from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IPathDocumentos } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import { DialogEliminarAutorizacion } from "../Dialog/DialogEliminarAutorizacion";
import { DialogNuevaAutorizacion } from "../Dialog/DialogNuevaAutorizacion";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { convertFileToBase64, formatDateToMexican } from "../../../generics/Validation";

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

  const datosActualizar: Array<string> = useLargoPlazoStore(
    (state) => state.datosActualizar
  );

  const disable =
    datosActualizar.length > 0 && !datosActualizar.includes("Autorización");

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

  const autorizacionesReestructura: IAutorizaciones[] = useReestructuraStore(
    (state) => state.autorizacionesReestructura
  );

  const autorizacionSelectReestructura: IAutorizaciones = useReestructuraStore(
    (state) => state.autorizacionSelectReestructura
  );

  const setAutorizacionSelectReestructura: Function = useReestructuraStore(
    (state) => state.setAutorizacionSelectReestructura
  );

  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>([]);

  const [dialogNumAutorizacion, setDialogNumAutorizacion] = useState("");

  const [openDialogEliminarAutorizacion, setOpenDialogEliminarAutorizacion] = useState(false);

  const [arrDocs, setArrDocs] = useState<any>([]);

  const [accion, setAccion] = useState("");

  useEffect(() => {
    getAutorizaciones();
    console.log("autorizaciones", autorizaciones);

  }, [openDialogNuevaAutorizacion, openDialogEliminarAutorizacion]);

  const [fileSelected, setFileSelected] = useState<any>("");

  useEffect(() => {
    if (autorizacionSelect?.Id !== "") {
      getPathDocumentosAut(autorizacionSelect?.Id, setPathDocumentos);
      listFile(`/Autorizaciones/${autorizacionSelect?.Id}`, () => { });
    }
  }, [autorizacionSelect, openDialogNuevaAutorizacion]);

  // useEffect(() => {
  //   if (pathDocumentos.length > 0) {
  //     let loc: any = [...arrDocs];
  //     pathDocumentos?.map((val: any) => {
  //       return getDocumentos(
  //         val?.Ruta?.replaceAll(`${val?.NombreIdentificador}`, "/"),
  //         val?.NombreIdentificador,
  //         (res: any, index: number) => {
  //           loc.push({ file: res, nombre: val.NombreArchivo });
  //         }
  //       );
  //     });
  //     setArrDocs(loc);
  //   }
  // }, [pathDocumentos]);

  const Autorizacion = (FiltroReestructura: string) => {
    if (FiltroReestructura === "") {
      setAutorizacion(
        {
          entidad: {
            Id: autorizacionSelect?.IdEntidad,
            Organismo: autorizacionSelect?.Entidad,
          },
          numeroAutorizacion: autorizacionSelect?.NumeroAutorizacion,
          fechaPublicacion: autorizacionSelect?.FechaPublicacion,
          medioPublicacion: {
            Id: autorizacionSelect?.IdMedioPublicacion,
            Descripcion: autorizacionSelect?.DescripcionMedioPublicacion,
          },
          montoAutorizado: autorizacionSelect?.MontoAutorizado,
          documentoSoporte: autorizacionSelect?.DocumentoSoporte,
          acreditacionQuorum: autorizacionSelect?.AcreditacionQuorum,
        },
        JSON.parse(autorizacionSelect?.DestinoAutorizado),
        JSON.parse(autorizacionSelect?.DetalleDestino)
      );
    } else {
      setAutorizacion(
        {
          entidad: {
            Id: autorizacionSelectReestructura?.IdEntidad,
            Organismo: autorizacionSelectReestructura?.Entidad,
          },
          numeroAutorizacion:
            autorizacionSelectReestructura?.NumeroAutorizacion,
          fechaPublicacion: autorizacionSelectReestructura?.FechaPublicacion,
          medioPublicacion: {
            Id: autorizacionSelectReestructura?.IdMedioPublicacion,
            Descripcion:
              autorizacionSelectReestructura?.DescripcionMedioPublicacion,
          },
          montoAutorizado: autorizacionSelectReestructura?.MontoAutorizado,
          documentoSoporte: autorizacionSelectReestructura?.DocumentoSoporte,
          acreditacionQuorum:
            autorizacionSelectReestructura?.AcreditacionQuorum,
        },
        JSON.parse(autorizacionSelectReestructura?.DestinoAutorizado),
        JSON.parse(autorizacionSelectReestructura?.DetalleDestino)
      );
    }
  };

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const AutorizacionLlenado = (FiltroReestructura: string) => {
    if (FiltroReestructura === "") {
      setAutorizacion(
        {
          entidad: {
            Id: autorizacionSelect?.IdEntidad,
            Organismo: autorizacionSelect?.Entidad,
          },
          numeroAutorizacion: autorizacionSelect?.NumeroAutorizacion,
          fechaPublicacion: autorizacionSelect?.FechaPublicacion,
          medioPublicacion: {
            Id: autorizacionSelect?.IdMedioPublicacion,
            Descripcion: autorizacionSelect?.DescripcionMedioPublicacion,
          },
          montoAutorizado: autorizacionSelect?.MontoAutorizado,
          documentoSoporte: autorizacionSelect?.DocumentoSoporte,
          acreditacionQuorum: autorizacionSelect?.AcreditacionQuorum,
        },
        JSON.parse(autorizacionSelect?.DestinoAutorizado),
        JSON.parse(autorizacionSelect?.DetalleDestino)
      );
    } else {
      setAutorizacion(
        {
          entidad: {
            Id: autorizacionSelectReestructura?.IdEntidad,
            Organismo: autorizacionSelectReestructura?.Entidad,
          },
          numeroAutorizacion:
            autorizacionSelectReestructura?.NumeroAutorizacion,
          fechaPublicacion: autorizacionSelectReestructura?.FechaPublicacion,
          medioPublicacion: {
            Id: autorizacionSelectReestructura?.IdMedioPublicacion,
            Descripcion:
              autorizacionSelectReestructura?.DescripcionMedioPublicacion,
          },
          montoAutorizado: autorizacionSelectReestructura?.MontoAutorizado,
          documentoSoporte: autorizacionSelectReestructura?.DocumentoSoporte,
          acreditacionQuorum:
            autorizacionSelectReestructura?.AcreditacionQuorum,
        },
        JSON.parse(autorizacionSelectReestructura?.DestinoAutorizado),
        JSON.parse(autorizacionSelectReestructura?.DetalleDestino)
      );
    }
  };
  const [loading, setLoading] = useState(true);

  const [arr, setArr] = useState<IAutorizaciones>();

  const [tipoMovAutorizacion, setTipoMovAutorizacion] = useState<IAutorizaciones>();

  useEffect(() => {

    console.log("autorizacionSelect", autorizacionSelect);
    console.log("autorizacionSelectReestructura", autorizacionSelectReestructura);


    if (tipoMovAutorizacion && tipoMovAutorizacion.Id) {
      listFileAutorizaciones(
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/AUTORIZACIONES/${tipoMovAutorizacion.Id}/`,
        setArr,
        reestructura === ""
          ? autorizacionSelect
          : autorizacionSelectReestructura

      ).then(() => {
        console.log("arr", arr)
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

  }, [autorizacionSelect, autorizacionSelectReestructura]);

  useEffect(() => {
console.log("arr", arr)


  }, [arr])


  return (
    <Grid
      container
      height={reestructura === "" ? "25rem" : "35rem"}
      direction={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      {reestructura === "" ? null : (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <Divider
            sx={{
              fontWeight: "bold",
              fontFamily: "MontserratMedium",
              width: "100%",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1.4ch",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            Autorización Solicitud Reestructura
          </Divider>
        </Grid>
      )}

      <Grid container display={"flex"} justifyContent={"center"} width={"100%"}>
        <Grid item xs={10} sm={6} md={6} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>
            Autorización de la legislatura local
          </InputLabel>
          <Autocomplete
            disabled={disable || reestructura === "con autorizacion"}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={autorizaciones}
            value={
              reestructura === ""
                ? autorizacionSelect
                : autorizacionSelectReestructura
            }
            getOptionLabel={(option) =>
              option.NumeroAutorizacion
                ? `${option.NumeroAutorizacion} - ${option.FechaPublicacion}`
                : ""
            }
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>
                    {`${option.NumeroAutorizacion} - ${formatDateToMexican(
                      String(option.FechaPublicacion)
                    )}`}
                  </Typography>
                </li>
              );
            }}
            onChange={(event, text: IAutorizaciones) => {
              setTipoMovAutorizacion(text)
              if (reestructura === "") {
                setAutorizacionSelect(text);
              } else {
                setAutorizacionSelectReestructura(text);
              }
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
                disabled={disable || reestructura === "con autorizacion"}
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

      {autorizacionSelectReestructura?.NumeroAutorizacion && (
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
                        {autorizacionSelectReestructura.NumeroAutorizacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {autorizacionSelectReestructura.FechaPublicacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      sx={{ width: 200 }}
                    >
                      <Typography>
                        {autorizacionSelectReestructura.MontoAutorizado}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {
                          autorizacionSelectReestructura.DescripcionMedioPublicacion
                        }
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Tooltip
                        title={autorizacionSelectReestructura?.DocumentoSoporte.nombreArchivo}
                      >
                        <IconButton
                          onClick={async () => {

                           
                              // console.log("row.archivo", arr.archivo)

                              // let base64String = '';
                              // try {
                              //   if (arr.archivo instanceof File) {
                              //     base64String = await convertFileToBase64(arr.archivo);
                              //     console.log("base64String 1", base64String)

                              //   } else {
                              //     base64String = arr.archivo;
                              //     console.log("base64String 2", base64String)

                              //   }

                              //   const dataUri = `data:application/pdf;base64,${base64String}`;
                              //   console.log("dataUri", dataUri)
                              //   setFileSelected(dataUri);
                              // } catch (error) {
                              //   console.error("Error al convertir el archivo a Base64", error);
                              // }

                              // setShowModalPrevia(true);
                              // setFileSelected(
                              //   `data:application/pdf;base64,${arr.filter((td: any) =>
                              //     td.NOMBREFORMATEADO.includes(
                              //       row.nombreArchivo
                              //     )
                              //   )[0].FILE
                              //   }`
                              // );
                              // setShowModalPrevia(true);
                            }

                            // setFileSelected(
                            //   `data:application/pdf;base64,${arrDocs.filter((td: any) =>
                            //     td.nombre.includes(
                            //       arr?.DocumentoSoporte
                            //     )
                            //   )[0].file
                            //   }`
                            // );

                            // setShowModalPrevia(true);
                          }
                        >
                          <FileOpenIcon></FileOpenIcon>
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {autorizacionSelectReestructura?.DetalleDestino &&
                          JSON.parse(
                            autorizacionSelectReestructura?.DetalleDestino
                          )[0].detalleDestino}
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
                          disabled={disable || reestructura === "con autorizacion"}
                          type="button"
                          onClick={() => {
                            setDialogNumAutorizacion(
                              autorizacionSelectReestructura?.NumeroAutorizacion
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
                          disabled={disable || reestructura !== ""}
                          type="button"
                          onClick={() => {
                            setAccion("Editar");
                            AutorizacionLlenado(reestructura);
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

      {reestructura === "" ? null : (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <Divider
            sx={{
              fontWeight: "bold",
              fontFamily: "MontserratMedium",
              width: "100%",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1.4ch",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            Autorización de la Solicitud
          </Divider>
        </Grid>
      )}

      {arr?.NumeroAutorizacion && (
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
                        {arr?.NumeroAutorizacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {arr?.FechaPublicacion}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      sx={{ width: 200 }}
                    >
                      <Typography>
                        {arr?.MontoAutorizado}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {arr?.DescripcionMedioPublicacion}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center" component="th">
                      <Tooltip title={arr?.DocumentoSoporte.nombreArchivo}>
                        <IconButton
                          onClick={async () => {


                            console.log("row.archivo", arr.DocumentoSoporte)

                            let base64String = '';
                            try {
                              if (arr.DocumentoSoporte.archivo instanceof File) {
                                base64String = await convertFileToBase64(arr.DocumentoSoporte.archivo);
                                console.log("base64String 1", base64String)

                              } else {
                                base64String = arr.DocumentoSoporte.archivo;
                                console.log("base64String 2", base64String)

                              }

                              const dataUri = `data:application/pdf;base64,${base64String}`;
                              console.log("dataUri", dataUri)
                              setFileSelected(dataUri);
                            } catch (error) {
                              console.error("Error al convertir el archivo a Base64", error);
                            }

                            setShowModalPrevia(true);
                          }


                            // setFileSelected(
                            //   `data:application/pdf;base64,${
                            //     arrDocs.filter((td: any) =>
                            //       td.nombre.includes(
                            //         autorizacionSelect?.DocumentoSoporte
                            //       )
                            //     )[0].file
                            //   }`
                            // );

                            // setShowModalPrevia(true);
                          }
                        >
                          <FileOpenIcon></FileOpenIcon>
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>


                    <StyledTableCell align="center" component="th">
                      <Typography>
                        {arr?.DetalleDestino &&
                          JSON.parse(arr?.DetalleDestino)[0]
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
                          disabled={disable || reestructura === "con autorizacion"}
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
                          disabled={disable || reestructura === "con autorizacion"}
                          type="button"
                          onClick={() => {
                            console.log("arr EDITAR", arr)
                            setAccion("Editar");
                            setAutorizacion(
                              {
                                entidad: {
                                  Id: arr?.IdEntidad,
                                  Organismo: arr?.Entidad,
                                },
                                numeroAutorizacion:
                                  arr?.NumeroAutorizacion,
                                fechaPublicacion:
                                  arr?.FechaPublicacion,
                                medioPublicacion: {
                                  Id: arr?.IdMedioPublicacion,
                                  Descripcion:
                                    arr?.DescripcionMedioPublicacion,
                                },
                                montoAutorizado:
                                  arr?.MontoAutorizado,
                                documentoSoporte:
                                  arr?.DocumentoSoporte,

                                acreditacionQuorum:
                                  arr?.AcreditacionQuorum,
                              },
                              JSON.parse(arr?.DestinoAutorizado),
                              JSON.parse(arr?.DetalleDestino)
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
