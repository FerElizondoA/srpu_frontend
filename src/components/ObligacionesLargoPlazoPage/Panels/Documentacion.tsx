/* eslint-disable react-hooks/exhaustive-deps */
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ITiposDocumento } from "../../Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { alertaInfo } from "../../../generics/Alertas";
import { newFile } from "../../../generics/instanciasObjetosVacios";
import { deleteDocumentos } from "../../../generics/interfaces";

interface Head {
  label: string;
}

export interface IFile {
  archivo: File;
  nombreArchivo: string;
  tipoArchivo: string;
  descripcionTipo: string;
}

const heads: readonly Head[] = [
  {
    label: "Requerido",
  },
  {
    label: "Acciones",
  },
  {
    label: "Nombre del archivo",
  },
  {
    label: "Documento/Archivo",
  },
  {
    label: "Tipo de Documento",
  },
];

export const Documentacion = ( {addDocumentDelete, }:{ addDocumentDelete: Function;}) => {

  // despliega la lista de tipos de documentos
  const tiposDocumentos: ITiposDocumento[] = useLargoPlazoStore(
    (state) => state.catalogoTiposDocumentos
  );

  const catalogoTiposDocumentosObligatorios: ITiposDocumento[] =
    useLargoPlazoStore((state) => state.catalogoTiposDocumentosObligatorios);

  const tablaDocumentos: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const [borrarDoc, setBorrarDoc] = useState<deleteDocumentos[]>([]);
 

  const addDocumento: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const setTablaDocumentos: Function = useLargoPlazoStore(
    (state) => state.setTablaDocumentos
  );

  function cargarArchivo(event: any, index: number) {
    let file = event.target.files[0];

    if (file !== undefined) {
      if (index < tablaDocumentos.length) {
        let auxArrayArchivos = [...tablaDocumentos];
        auxArrayArchivos[index].archivo = file;
        auxArrayArchivos[index].nombreArchivo = file.name;
        setTablaDocumentos(auxArrayArchivos);
      } else {
        addDocumento({
          archivo: file,
          nombreArchivo: file.name,
        });
      }
    }
  }

  const quitDocument: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
  );

  const asignarTpoDoc = (index: number, valor: string, descripcion: string) => {
    let aux = [...tablaDocumentos];
    aux[index].tipoArchivo = valor;
    aux[index].descripcionTipo = descripcion;
    setTablaDocumentos(aux);
  };

  const scroll = () => {
    const element = document.getElementById("divider");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);
  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "Tab",
  });

  const [openEliminar, setOpenEliminar] = useState({ open: false, index: 0 });

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 479px)"),
  };

  const datosActualizar: Array<string> = useLargoPlazoStore(
    (state) => state.datosActualizar
  );

  // IdSolicitud
  // const IdSolicitud: string = useLargoPlazoStore((state) => state.idSolicitud);
  // useEffect(() => {
  //   if (IdSolicitud) {
  //     getDocumentos(
  //       `/SRPU/CORTOPLAZO/DOCSOL/${IdSolicitud}/`,
  //       () => {},
  //       () => {}
  //     );
  //   }
  // }, []);

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const [justificacionRespuesta, setJustificacionRespuesta] = useState<
    Array<ITiposDocumento>
  >([]);
  //const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

  useEffect(() => {
    //const elementos = catalogo.filter(item => item.tipo === 'Justificacion para reestructura');
    setJustificacionRespuesta(
      tiposDocumentos.filter(
        (tipo) => tipo.Descripcion === "Justificacion para Reestructurar"
      )
    );
  }, []);

  function clearArchivo(index: number) {
    if (index < tablaDocumentos.length) {
      let auxArrayArchivos = [...tablaDocumentos];
      auxArrayArchivos[index].archivo = newFile;
      auxArrayArchivos[index].nombreArchivo = "";
      setTablaDocumentos(auxArrayArchivos);
    } else {
      alertaInfo("Ocurrio un error al remover el archivo");
    }
  }

  return (
    <Grid
      item
      container
      sx={{ display: "flex", width: "100%", height: ["75vh"] }}
    >
      <Grid container height={"100%"} width={"100%"}>
        <Grid item height={"100%"} width={"100%"}>
          <TableContainer
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: ".5vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaDocumentos.map((val, index) => (
                  <StyledTableRow key={index} id={`${index + 1}`}>
                    <StyledTableCell scope="row" sx={{ width: "100px" }}>
                      {index < catalogoTiposDocumentosObligatorios.length ? (
                        <Typography>Obligatorio</Typography>
                      ) : (
                        <Typography>Opcional</Typography>
                        // <IconButton
                        //   onClick={() => {
                        //     setOpenEliminar({ open: true, index: index });
                        //   }}
                        // >
                        //   <DeleteIcon />
                        // </IconButton>
                      )}
                    </StyledTableCell>

                    <StyledTableCell sx={{ width: "150px" }}>
                      <Grid sx={{ display: "flex", width: "120px" }}>
                        <Grid>
                          {comentario[val.descripcionTipo] &&
                          comentario[val.descripcionTipo] !== "" ? (
                            <Badge badgeContent={"!"} color="primary">
                              <Tooltip title="Añadir comentario a este apartado">
                                <IconButton
                                  color={
                                    comentario[val.descripcionTipo] &&
                                    comentario[val.descripcionTipo] !== ""
                                      ? "success"
                                      : "primary"
                                  }
                                  size="small"
                                  onClick={() => {
                                    setOpenComentarioApartado({
                                      open: true,
                                      apartado: val.descripcionTipo,
                                      tab: "TabDocumentacion",
                                    });
                                  }}
                                >
                                  <CommentIcon
                                    fontSize="medium"
                                    sx={{ mr: 2 }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Badge>
                          ) : (
                            <Tooltip title="Añadir comentario a este apartado">
                              <IconButton
                                sx={{ ...queries.iconButtonCancelar }}
                                size="small"
                                onClick={() => {
                                  setOpenComentarioApartado({
                                    open: true,
                                    apartado: val.descripcionTipo,
                                    tab: "TabDocumentacion",
                                  });
                                }}
                              >
                                <CommentIcon fontSize="medium" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>

                        <Grid>
                          {index >=
                          catalogoTiposDocumentosObligatorios.length ? (
                            <IconButton
                              sx={{ ...queries.iconButtonCancelar }}
                              onClick={() => {
                                setOpenEliminar({ open: true, index: index });
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
                        </Grid>
                        <Grid></Grid>
                      </Grid>
                    </StyledTableCell>

                    <StyledTableCell scope="row" sx={{ width: "300px" }}>
                      <TextField
                        sx={{ width: "250px" }}
                        disabled={
                          val.archivo?.name ===
                            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO" ||
                          val.nombreArchivo ===
                            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO" ||
                          (datosActualizar.length > 0 &&
                            !datosActualizar.includes(val.tipoArchivo))
                        }
                        size="small"
                        multiline={!query.isMobile}
                        value={val.nombreArchivo}
                        onChange={(v) => {
                          let auxArrayArchivos = [...tablaDocumentos];
                          auxArrayArchivos[index].nombreArchivo = v.target.value
                            .replaceAll("'", "")
                            .replaceAll('"', "")
                            .replaceAll("\n", "");
                          setTablaDocumentos(auxArrayArchivos);
                        }}
                      ></TextField>
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{ position: "relative", width: "400px" }}
                    >
                      <Grid
                        container
                        height="3rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "350px",
                          }}
                        >
                          <Typography
                            position={"absolute"}
                            sx={{
                              display: "flex",
                              fontFamily:
                                val.archivo?.name !==
                                "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                                  ? "MontserratBold"
                                  : "MontserratMedium",
                              textAlign: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              width: {
                                xs: "300px", // 100% width on extra small screens
                                sm: "300px", // 80% width on small screens
                                md: "300px", // 70% width on medium screens
                                lg: "300px", // 60% width on large screens
                              },
                              height: "65%",
                              fontSize: {
                                xs: "60%", // smaller font size on extra small screens
                                sm: "65%", // slightly larger on small screens
                                md: "70%", // normal on medium and larger screens
                              },
                              border:
                                val.archivo?.name !==
                                "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                                  ? "2px dotted #af8c55"
                                  : "2px dotted black",
                            }}
                          >
                            {val.archivo?.name ||
                              val.nombreArchivo ||
                              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                          </Typography>
                          <input
                            disabled={
                              datosActualizar.length > 0 &&
                              !datosActualizar.includes(val.tipoArchivo)
                            }
                            type="file"
                            accept="application/pdf"
                            onChange={(v) => {
                              cargarArchivo(v, index);
                            }}
                            style={{
                              opacity: 0,
                              width: "100%",
                              height: "5vh",
                              cursor: "pointer",
                            }}
                          />
                        </Grid>

                        <Grid sx={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="Remover Archivo">
                            <Button
                              sx={{ position: "absolute", right: 0 }}
                              onClick={() => {
                                clearArchivo(index);
                                // quitDocument(openEliminar.index);
                                // setOpenEliminar({ ...openEliminar, open: false });
                              }}
                            >
                              <CloseIcon />
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </StyledTableCell>

                    <StyledTableCell sx={{ width: "700px" }}>
                      {index < catalogoTiposDocumentosObligatorios.length ? (
                        <Typography
                          // width={query.isMobile ? "350px" : "100%"}
                          width={"700px"}
                        >
                          {tablaDocumentos[index]?.descripcionTipo || ""}
                        </Typography>
                      ) : (
                        <FormControl required variant="standard" fullWidth>
                          <Select
                            error={
                              tablaDocumentos[index]?.tipoArchivo === "" ||
                              tablaDocumentos[index]?.tipoArchivo === undefined
                            }
                            value={tablaDocumentos[index]?.tipoArchivo || ""}
                            onChange={(v) => {
                              asignarTpoDoc(
                                index,
                                v.target.value,
                                tiposDocumentos.filter(
                                  (td: any) => td.Id === v.target.value
                                )[0].Descripcion
                              );
                            }}
                            sx={{
                              display: "flex",
                              pt: 1,
                              backgroundColor:
                                tablaDocumentos[index]?.tipoArchivo === "" ||
                                tablaDocumentos[index]?.tipoArchivo ===
                                  undefined
                                  ? "#ff000057"
                                  : null,
                            }}
                            inputProps={{
                              readOnly:
                                index <
                                catalogoTiposDocumentosObligatorios.length,
                            }}
                            disabled={
                              index < catalogoTiposDocumentosObligatorios.length
                            }
                          >
                            {reestructura === "con autorizacion"
                              ? justificacionRespuesta.map((tipo) => (
                                  <MenuItem key={tipo.Id} value={tipo.Id}>
                                    {tipo.Descripcion}
                                  </MenuItem>
                                ))
                              : tiposDocumentos.map((tipo) => (
                                  <MenuItem key={tipo.Id} value={tipo.Id}>
                                    {tipo.Descripcion}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Divider id="divider" sx={{ height: "10vh" }} />
          </TableContainer>
        </Grid>
      </Grid>

      <Grid
        mt={1}
        container
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
      >
        <Grid
          item
          mb={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          sx={{ position: "relative" }}
        >
          <Typography
            position={"absolute"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px dotted black",

              width: "80%",
              height: "2.5rem",
              fontSize: "0.6rem",

              "@media (min-width: 480px)": {
                width: "100%",
                fontSize: "0.7rem",
              },

              "@media (min-width: 768px)": {
                width: "70%",
                fontSize: "0.8rem",
              },

              "@media (min-width: 1140px)": {
                width: "50%",
                fontSize: "0.8rem",
              },

              "@media (min-width: 1400px)": {
                width: "55%",
                fontSize: "0.9rem",
              },

              "@media (min-width: 1870px)": {
                width: "34%",
                fontSize: "0.9rem",
              },
            }}
          >
            {reestructura === "con autorizacion" ? (
              <Typography>
                ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR LOS ARCHIVOS DE
                JUSTIFICACIÓN PARA REESTRUCTURA
              </Typography>
            ) : (
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
            )}
          </Typography>
          <input
            //disabled={reestructura}
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              scroll();
              cargarArchivo(v, tablaDocumentos.length);
            }}
            style={{
              opacity: 0,
              width: "60%",
              height: "3vh",
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>

      <ComentarioApartado
        setOpen={setOpenComentarioApartado}
        openState={openComentarioApartado}
      />
      <Dialog
        open={openEliminar.open}
        onClose={() => setOpenEliminar({ ...openEliminar, open: false })}
      >
        <DialogContent>
          ¿Eliminar este archivo de la documentación?
        </DialogContent>
        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenEliminar({ ...openEliminar, open: false });
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              quitDocument(openEliminar.index);
              setOpenEliminar({ ...openEliminar, open: false });
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
