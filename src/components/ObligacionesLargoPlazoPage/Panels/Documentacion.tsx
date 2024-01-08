import CommentIcon from "@mui/icons-material/Comment";
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
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ITiposDocumento } from "../../Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

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
    label: "Borrar",
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
  {
    label: "Comentarios",
  },
];

export function Documentacion() {
  // despliega la lista de tipos de documentos
  const tiposDocumentos: ITiposDocumento[] = useLargoPlazoStore(
    (state) => state.catalogoTiposDocumentos
  );

  const catalogoTiposDocumentosObligatorios: ITiposDocumento[] =
    useLargoPlazoStore((state) => state.catalogoTiposDocumentosObligatorios);

  const tablaDocumentosLP: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentosLP
  );

  const addDocumentoLP: Function = useLargoPlazoStore(
    (state) => state.addDocumentoLP
  );

  const setTablaDocumentosLP: Function = useLargoPlazoStore(
    (state) => state.setTablaDocumentosLP
  );

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  function cargarArchivo(event: any, index: number) {
    let file = event.target.files[0];

    if (file !== undefined) {
      if (index < tablaDocumentosLP.length) {
        let auxArrayArchivos = [...tablaDocumentosLP];
        auxArrayArchivos[index].archivo = file;
        auxArrayArchivos[index].nombreArchivo = file.name;
        setTablaDocumentosLP(auxArrayArchivos);
      } else {
        addDocumentoLP({
          archivo: file,
          nombreArchivo: file.name,
        });
      }
    }
  }

  const quitDocument: Function = useLargoPlazoStore(
    (state) => state.removeDocumentoLP
  );

  const datosActualizar: Array<string> = useCortoPlazoStore(
    (state) => state.datosActualizar
  );

  const asignarTpoDoc = (index: number, valor: string, descripcion: string) => {
    let aux = [...tablaDocumentosLP];
    aux[index].tipoArchivo = valor;
    aux[index].descripcionTipo = descripcion;
    setTablaDocumentosLP(aux);
  };

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);
  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "Tab",
  });

  const [openEliminar, setOpenEliminar] = useState({ open: false, index: 0 });
  const [opciones, setOpciones] = useState(tiposDocumentos)

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 479px)"),
  };

  const handleBotonClick = () => {
    // Filtrar y mostrar solo la opción de justificación
    //let justificacion = tiposDocumentos.filter((opcion: any) => opcion.Descripcion = 'Justificacion para Reestructurar')[0].Descripcion;

    if (reestructura === "con autorizacion") {
      let justificacion = tiposDocumentos.filter((opcion: ITiposDocumento) => opcion.Descripcion = 'Justificacion para Reestructurar')
      setOpciones(justificacion);
    } else {
      let justificacion = tiposDocumentos.filter((opcion: ITiposDocumento) => opcion.Descripcion !== 'Justificacion para Reestructurar')
      setOpciones(justificacion);
    }


  };

  useEffect(() => {
    handleBotonClick()
  }, [])

  return (
    <Grid
      item
      container
      display="flex"
      //height={"30rem"}
      width={"100%"}
      sx={{
        height: "27rem",
        "@media (min-width: 480px)": {
          height: "28rem",
        },

        "@media (min-width: 768px)": {
          height: "26rem",
        },

        "@media (min-width: 1140px)": {
          height: "26rem",
        },

        "@media (min-width: 1400px)": {
          height: "30rem",
        },

        "@media (min-width: 1870px)": {
          height: "42rem",
        },
      }}
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
                {tablaDocumentosLP.map((val, index) => (
                  <StyledTableRow key={index} id={`${index + 1}`}>
                    <StyledTableCell scope="row">
                      {index < catalogoTiposDocumentosObligatorios.length ? (
                        <Typography>Obligatorio</Typography>
                      ) : (
                        <IconButton
                          disabled={reestructura === "con autorizacion"}
                          onClick={() => {
                            setOpenEliminar({ open: true, index: index });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </StyledTableCell>

                    <StyledTableCell scope="row">
                      <TextField
                        sx={{
                          width: "250px",
                        }}
                        disabled={
                          (val.archivo?.name ===
                            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO" ||
                            val.nombreArchivo ===
                            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO" ||
                            (datosActualizar.length > 0 &&
                              !datosActualizar.includes(val.tipoArchivo))) || reestructura === "con autorizacion"

                        }
                        size="small"
                        multiline={!query.isMobile}
                        value={val.nombreArchivo}
                        onChange={(v) => {
                          let auxArrayArchivos = [...tablaDocumentosLP];
                          auxArrayArchivos[index].nombreArchivo = v.target.value
                            .replaceAll("'", "")
                            .replaceAll('"', "")
                            .replaceAll("\n", "");
                          setTablaDocumentosLP(auxArrayArchivos);
                        }}
                      ></TextField>
                    </StyledTableCell>

                    <StyledTableCell sx={{ position: "relative" }}>
                      <Grid container height={"3rem"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
                            width: "90%",
                            height: "60%",
                            fontSize: "80%",
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
                            (datosActualizar.length > 0 &&
                              !datosActualizar.includes(val.tipoArchivo)) || reestructura === "con autorizacion"
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
                            cursor: reestructura ? "" : "pointer",
                          }}
                        />
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell>
                      {index < catalogoTiposDocumentosObligatorios.length ? (
                        <Typography>
                          {tablaDocumentosLP[index]?.descripcionTipo}
                        </Typography>
                      ) : (
                        <FormControl required variant="standard" fullWidth>
                          <Select
                            value={tablaDocumentosLP[index]?.tipoArchivo || ""}
                            onChange={(v) => {
                              asignarTpoDoc(
                                index,
                                v.target.value,
                                tiposDocumentos.filter(
                                  (td: any) => td.Id === v.target.value
                                )[0].Descripcion
                              );
                            }}
                            sx={{ display: "flex", pt: 1 }}
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
                              ? <MenuItem key={opciones[5].Id} value={opciones[5].Id} >
                                {opciones[5].Descripcion}
                              </MenuItem>
                              : opciones.map((tipo) => (
                                <MenuItem key={tipo.Id} value={tipo.Id}>
                                  {tipo.Descripcion}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
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
                              <CommentIcon fontSize="medium" sx={{ mr: 2 }} />
                            </IconButton>
                          </Tooltip>
                        </Badge>
                      ) : (
                        // <Badge badgeContent={"!"} color="primary">
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
                            <CommentIcon fontSize="medium" sx={{ mr: 2 }} />
                          </IconButton>
                        </Tooltip>
                        // </Badge>
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
                width: "40%",
                fontSize: "0.9rem",
              },

              "@media (min-width: 1870px)": {
                width: "34%",
                fontSize: "0.9rem",
              },
            }}
          >
            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
          </Typography>
          <input
            // disabled={reestructura}
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivo(v, tablaDocumentosLP.length);
            }}
            style={{
              opacity: 0,
              width: "60%",
              height: "3vh",
              cursor: reestructura ? "" : "pointer",
            }}
          />
        </Grid>

        {/* <Grid display={"flex"} justifyContent={"end"}>
          <Tooltip title={"Remover Archivo"}>
            <Button onClick={() => removeDocumento()}>
              <GridCloseIcon />
            </Button>
          </Tooltip>
        </Grid> */}
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
