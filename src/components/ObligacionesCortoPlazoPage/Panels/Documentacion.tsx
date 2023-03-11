import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Alert,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import { queries } from "../../../queries";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { getTiposDocumentos } from "../APIS/APISDocumentacion";
import { ITiposDocumento } from "../Interfaces/CortoPlazo/Documentacion/IListTipoDocumento";

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

interface IFiLe {
  archivo: File;
  tipoArchivo: string;
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
    label: "Documento/File",
  },
  {
    id: "TipoDocumento",
    isNumeric: false,
    label: "Tipo de Documento",
  },
];

export function Documentacion() {
  const [lastFile, setLastFile] = useState<File>();
  const [uploadFile, setUploadFile] = useState<File>();
  const [tiposDocumentos, setTiposDocumentos] = useState<Array<ITiposDocumento>>([]);

  const [numArchivos, setNumArchivos] = useState([0, 1, 2, 3, 4]);

  const archivoVacio = {archivo: new File([], "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO", { type: "text/plain" }),tipoArchivo:''};
  const [archivos, setArchivos] = useState<Array<IFiLe>>(
    numArchivos.map(() => {
      return {archivo: new File([], "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO", { type: "text/plain" }),tipoArchivo:''} ;
    })
  );

  useEffect(() => {
    getTiposDocumentos(setTiposDocumentos);
  }, []);

  const [nombreArchivo, setNombreArchivo] = useState(
    "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  );

  function enCambioFile(event: any, index: number) {
    let auxFile = event.target.files[0]

    setUploadFile(event.target.files[0]);


    if (index < 5 && auxFile !== undefined) {
      let aux = archivos;
      aux[index].archivo = auxFile;
      setArchivos(aux);
      setLastFile(event.target.files[0]);
    } else {

      if (event.target.value !== "") {
        setNombreArchivo(event.target.value.split("\\")[2]);
      }
    }
  }


  const submitForm = () => {

    if (lastFile !== uploadFile && uploadFile !== undefined) {
      setNumArchivos([...numArchivos, (numArchivos.length + 1)])
      let aux = archivos;
      aux?.push({archivo:uploadFile,tipoArchivo: ''});
      
      setArchivos(aux);
      setLastFile(uploadFile);
    }

    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
    console.log(archivos);
  };

  const cancelar = () => {
    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const quitDocument = (index: number) => {
    let aux: IFiLe[] = [];
    archivos.map((archivo, x) => {
      if (x !== index) aux.push(archivo);
    });
    setArchivos(aux);
  };

  const asignarTpoDoc = (index: number, valor: string) => {
    let aux = archivos
    aux[index].tipoArchivo = valor;
    setArchivos({...aux});
    console.log(index);
    
  }

  // useEffect(() => {
  //   console.log(tipoDocumento);

  // }, [tipoDocumento])


  return (
    <Grid item container direction="column" sx={{ display: "flex" }}>
      <Grid item>
        <Grid item ml={window.innerWidth / 50} lg={8} sx={{ overflow: "auto" }}>
          <TableContainer >
            <Table sx={{}}>
              <TableHead>
                {heads.map((head) => (
                  <StyledTableCell key={head.id}>
                    <TableSortLabel>{head.label}</TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>


                {numArchivos?.map((index) => (
                  <StyledTableRow>
                    <StyledTableCell scope="row">
                      <IconButton disabled>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell sx={{ position: "relative" }}>
                      <Typography
                        position={"absolute"}
                        sx={{
                          display: "flex",
                          border: "1px solid",
                          borderBlockColor: "#AF8C55",
                          fontFamily: "MontserratMedium",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "90%",
                          height: "30%",
                        }}
                      >
                        {archivos[index]?.archivo.name ? archivos[index]?.archivo.name  : "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"}
                      </Typography>

                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(v) => enCambioFile(v, index)}
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
                      ></input>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControl required variant="standard" fullWidth>

                        <Select
                          value={archivos[index].tipoArchivo}
                          onChange={(v) => { asignarTpoDoc(index, v.target.value); }}
                          sx={{ display: "flex", pt: 1 }}
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
              //backgroundColor: "#AF8C55",
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
            onChange={(v) => enCambioFile(v, 1)}
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          ></input>
        </Grid>
        <Grid item md={4} lg={4}>
          <ConfirmButton variant="outlined" onClick={submitForm}>
            AGREGAR
          </ConfirmButton>
        </Grid>

        <Grid item md={4} lg={4}>
          <DeleteButton variant="outlined" onClick={cancelar}>
            CANCELAR
          </DeleteButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
