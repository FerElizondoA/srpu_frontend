import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  FormControl,
  Select,
  MenuItem,
  TableRow,
  Divider,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import CommentIcon from "@mui/icons-material/Comment";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { ITiposDocumentoLP } from "../../Interfaces/InterfacesLplazo/documentacion/IListTipoDocumento";
import { useEffect, useState } from "react";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
import { queries } from "../../../queries";

interface Head {
  label: string;
}

export interface IFileLP {
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
  const tiposDocumentosLP: ITiposDocumentoLP[] = useLargoPlazoStore(
    (state) => state.catalogoTiposDocumentosLP
  );

  const catalogoTiposDocumentosObligatoriosLP: ITiposDocumentoLP[] =
    useLargoPlazoStore((state) => state.catalogoTiposDocumentosObligatoriosLP);

  const tablaDocumentosLP: IFileLP[] = useLargoPlazoStore(
    (state) => state.tablaDocumentosLP
  );

  const addDocumentoLP: Function = useLargoPlazoStore(
    (state) => state.addDocumentoD
  );

  const setTablaDocumentosLP: Function = useLargoPlazoStore(
    (state) => state.setTablaDocumentosD
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
    (state) => state.removeDocumentoD
  );

  const asignarTpoDoc = (index: number, valor: string, descripcion: string) => {
    let aux = [...tablaDocumentosLP];
    aux[index].tipoArchivo = valor;
    aux[index].descripcionTipo = descripcion;
    setTablaDocumentosLP(aux);
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

  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        maxHeight: "73vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: ".5vw",
          mt: 1,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#AF8C55",
          outline: "1px solid slategrey",
          borderRadius: 1,
        },
      }}
    >
      <Grid item>
        <Grid item ml={window.innerWidth / 90} lg={10}>
          <TableContainer
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
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
                      {index < catalogoTiposDocumentosObligatoriosLP.length ? (
                        <Typography>Obligatorio</Typography>
                      ) : (
                        <IconButton
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
                        size="small"
                        multiline
                        value={val.nombreArchivo}
                        onChange={(v) => {
                          let auxArrayArchivos = [...tablaDocumentosLP];
                          auxArrayArchivos[index].nombreArchivo =
                            v.target.value
                              .replaceAll(".pdf", "")
                              .replaceAll("'", "")
                              .replaceAll('"', "")
                              .replaceAll("\n", "") + ".pdf";
                          setTablaDocumentosLP(auxArrayArchivos);
                        }}
                      ></TextField>
                    </StyledTableCell>

                    <StyledTableCell sx={{ position: "relative" }}>
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
                    </StyledTableCell>
                    <StyledTableCell>
                      {index < catalogoTiposDocumentosObligatoriosLP.length ? (
                        <Typography>
                          {tablaDocumentosLP[index]?.descripcionTipo}
                        </Typography>
                      ) : (
                        <FormControl required variant="standard" fullWidth>
                          <Select
                            value={tablaDocumentosLP[index]?.tipoArchivo}
                            onChange={(v) => {
                              asignarTpoDoc(
                                index,
                                v.target.value,
                                tiposDocumentosLP.filter(
                                  (td: any) => td.Id === v.target.value
                                )[0].Descripcion
                              );
                            }}
                            sx={{ display: "flex", pt: 1 }}
                            inputProps={{
                              readOnly:
                                index <
                                catalogoTiposDocumentosObligatoriosLP.length,
                            }}
                            disabled={
                              index <
                              catalogoTiposDocumentosObligatoriosLP.length
                            }
                          >
                            {tiposDocumentosLP.map((tipo) => (
                              <MenuItem key={tipo.Id} value={tipo.Id}>
                                {tipo.Descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
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
                          <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                        </IconButton>
                      </Tooltip>
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
        item
        container
        position="fixed"
        sx={{
          height: "6%",
          display: "flex",
          justifyContent: "center",
          bottom: 20,
        }}
      >
        <Typography
          position={"absolute"}
          sx={{
            display: "flex",
            border: " 1px solid",
            borderBlockColor: "#AF8C55",
            fontFamily: "MontserratMedium",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "34%",
            height: "100%",
          }}
        >
          ARRASTRE O DE CLIC AQUÍ PARA AGREGAR UN NUEVO ARCHIVO
        </Typography>
        <input
          type="file"
          accept="application/pdf"
          onChange={(v) => {
            cargarArchivo(v, tablaDocumentosLP.length);
            scroll();
          }}
          style={{
            opacity: 0,
            width: "34%",
            height: "100%",
            cursor: "pointer",
          }}
        ></input>
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
