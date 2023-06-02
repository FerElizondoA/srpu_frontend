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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { useCortoPlazoStore } from "../../../store/main";
import { ITiposDocumento } from "../../Interfaces/InterfacesCplazo/CortoPlazo/documentacion/IListTipoDocumento";
import { queries } from "../../../queries";

interface Data {
  Documento: String;
  TipoDocumento: String;
  isSelected: boolean;
}

interface Head {
  id: keyof Data;
  isNumeric: boolean;
  label: string;
}

export interface IFile {
  archivo: File;
  tipoArchivo: string;
  descripcionTipo: string;
}

const heads: readonly Head[] = [
  {
    id: "isSelected",
    isNumeric: false,
    label: "Borrar",
  },
  {
    id: "Documento",
    isNumeric: false,
    label: "Documento/Archivo",
  },
  {
    id: "TipoDocumento",
    isNumeric: false,
    label: "Tipo de Documento",
  },
];

export function Documentacion() {
  //guarda el ultimo archivo para comparar y no agregar 2 veces el mismo archivo
  const [lastFile, setLastFile] = useState<File>();

  //archivo cargado en el input antes  de dar click al boton  guardar
  const [uploadFile, setUploadFile] = useState<File>();

  // despliega la lista de tipos de documentos
  const tiposDocumentos: ITiposDocumento[] = useCortoPlazoStore(
    (state) => state.catalogoTiposDocumentos
  );

  const catalogoTiposDocumentosObligatorios: ITiposDocumento[] =
    useCortoPlazoStore((state) => state.catalogoTiposDocumentosObligatorios);

  const tablaDocumentos: IFile[] = useCortoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const addDocumento: Function = useCortoPlazoStore(
    (state) => state.addDocumento
  );

  const setTablaDocumentos: Function = useCortoPlazoStore(
    (state) => state.setTablaDocumentos
  );

  // nombre del archivo antes de dar click en agregar
  const [nombreArchivo, setNombreArchivo] = useState(
    "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
  );

  function cargarArchivo(event: any, index = -1) {
    let auxFile = event.target.files[0];

    setUploadFile(event.target.files[0]);

    if (index >= 0 && auxFile !== undefined) {
      let auxArrayArchivos = tablaDocumentos;
      auxArrayArchivos[index].archivo = auxFile;
      // setArchivos(auxArrayArchivos);
      setLastFile(event.target.files[0]);
    } else {
      if (event.target.value !== "") {
        setNombreArchivo(event.target.value.split("\\")[2]);
      }
    }
  }

  const agregarArchivo = () => {
    if (lastFile !== uploadFile && uploadFile !== undefined) {
      let prevState = [...tablaDocumentos];
      prevState.push({
        archivo: uploadFile,
        tipoArchivo: "",
        descripcionTipo: "",
      });
      // setArchivos(prevState);
      addDocumento({ archivo: uploadFile, tipoArchivo: "" });
      setLastFile(uploadFile);
    }

    setNombreArchivo("ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const cancelar = () => {
    setNombreArchivo("ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const quitDocument: Function = useCortoPlazoStore(
    (state) => state.removeDocumento
  );

  const asignarTpoDoc = (index: number, valor: string, descripcion: string) => {
    let aux = [...tablaDocumentos];
    aux[index].tipoArchivo = valor;
    aux[index].descripcionTipo = descripcion;
    // setArchivos(aux);
    setTablaDocumentos(aux);
  };

  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        maxHeight: "73vh", overflow: "auto",
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
      <Grid item >
        <Grid item ml={window.innerWidth / 90}  lg={10} >
          <TableContainer sx={{height: "100%"}} >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {heads.map((head) => (
                    <StyledTableCell key={head.id}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaDocumentos.map((val, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">
                      {index < catalogoTiposDocumentosObligatorios.length ? (
                        <Typography>Obligatorio</Typography>
                      ) : (
                        <IconButton
                          onClick={() => {
                            quitDocument(index);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </StyledTableCell>

                    <StyledTableCell sx={{ position: "relative" }}>
                      <Typography
                        position={"absolute"}
                        sx={{
                          display: "flex",
                          fontFamily: "MontserratBold",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "90%",
                          height: "60%",
                          fontSize: "80%",
                          border: "2px dotted black",
                        }}
                      >
                        {val.archivo?.name ||
                          "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                      </Typography>

                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(v) => cargarArchivo(v, index)}
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "5vh",
                          cursor: "pointer",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControl required variant="standard" fullWidth>
                        <Select
                          value={tablaDocumentos[index]?.tipoArchivo}
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
                          {tiposDocumentos.map((tipo) => (
                            <MenuItem key={tipo.Id} value={tipo.Id}>
                              {tipo.Descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
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
          justifyContent: "flex-end",
          top: "auto",
          bottom: 0,
        }}
      >
        <Grid
          item
          md={4}
          lg={4}
          sx={{
            height: 50,
            display: "flex",
            justifyContent: "flex-end",
            top: "auto",
            bottom: 0,
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
              margin: "auto 0",
              width: "34%",
              height: "100%",
            }}
          >
            {nombreArchivo}
          </Typography>

          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => cargarArchivo(v)}
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          ></input>
        </Grid>
        
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} item md={4} lg={4} >
          <Button sx={queries.buttonContinuar}
            variant="outlined"
            onClick={() => {
              agregarArchivo();
            }}
          >
            Agregar
          </Button>
        </Grid>

        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} item md={4} lg={4}>
          <Button sx={queries.buttonCancelar} variant="outlined" onClick={cancelar}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
