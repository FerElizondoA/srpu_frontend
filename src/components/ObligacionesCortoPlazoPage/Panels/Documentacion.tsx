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
  //guarda el ultimo archivo para comparar y no agregar 2 veces el mismo archivo
  const [lastFile, setLastFile] = useState<File>();
  //archivo cargado en el input antes  de dar click al boton  guardar
  const [uploadFile, setUploadFile] = useState<File>();
  // despliega la lista de tipos de documentos
  const [tiposDocumentos, setTiposDocumentos] = useState<Array<ITiposDocumento>>([]);
  // array que mapea la  cantidad de numero d e archivos para que se actualice bien la informacion
  const [numArchivos, setNumArchivos] = useState<Array<number>>([]);

  const [numArchivosObligatorios, setNumArchivosObligatosios] = useState<number>(0);
  const [archivosObligatorios, setarchivosObligatosios] = useState<Array<ITiposDocumento>>([]);
  //array con objeto que tiene  archivo:File y tipoArchivo:string
  const [archivos, setArchivos] = useState<Array<IFiLe>>(
    numArchivos.map(() => {
      return {archivo: new File([], "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO", { type: "text/plain" }), tipoArchivo: ''} ;
    })
  );

  useEffect(() => {

    getTiposDocumentos(setTiposDocumentos);
  }, []);

  useEffect(() => {
    let auxNumTpoDocFiltered = tiposDocumentos.filter(tpoDco =>tpoDco.Obligatorio === 1 ).map((tpo,index)=>{return index;})
    let auxTpoDocFiltered = tiposDocumentos.filter(tpoDco =>tpoDco.Obligatorio === 1 ).map((tpo)=>{return tpo;})
    setarchivosObligatosios(auxTpoDocFiltered);
    setNumArchivosObligatosios(auxNumTpoDocFiltered.length);
    setNumArchivos(auxNumTpoDocFiltered);
    setArchivos(
      auxNumTpoDocFiltered.map((num,index) => {
        return {archivo: new File([], "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO", { type: "text/plain" }), tipoArchivo: auxTpoDocFiltered[index].Id} ;
      })
    );
    
    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    
    console.log([...archivosObligatorios]);
  }, [tiposDocumentos]);

  useEffect(() => {
    console.log("------------------------------------------------------------actualizado");
    
    console.log(numArchivos);
    console.log((archivos));
    
  }, [numArchivos]);
// nombre del archivo antes de dar click en agregar
  const [nombreArchivo, setNombreArchivo] = useState(
    "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  );


  function cargarArchivo(event: any, index = -1) {
    let auxFile = event.target.files[0]

    setUploadFile(event.target.files[0]);

    if (index >= 0 && auxFile !== undefined) {
      let auxArrayArchivos = archivos;
      auxArrayArchivos[index].archivo = auxFile;
      setArchivos(auxArrayArchivos);
      setLastFile(event.target.files[0]);
    } else {

      if (event.target.value !== "") {
        setNombreArchivo(event.target.value.split("\\")[2]);
      }
    }
  }


  const agregarArchivo = () => {

    if (lastFile !== uploadFile && uploadFile !== undefined) {
      setNumArchivos([...numArchivos,numArchivos.length]);
      let prevState=[...archivos]
      prevState.push({archivo:uploadFile,tipoArchivo: ''});
      setArchivos(prevState);
      setLastFile(uploadFile);
    }

    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const cancelar = () => {
    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const quitDocument = (index: number) => {
    let auxArrayFile: IFiLe[] = [];
    archivos.map((archivo, x) => {
      if (x !== index) auxArrayFile.push(archivo);
    });
    setArchivos(auxArrayFile);
    let auxCountFile=numArchivos;
    auxCountFile.pop();
    setNumArchivos(auxCountFile);
  };

  const asignarTpoDoc = (index: number, valor: string) => {
    let aux = [...archivos]
    aux[index].tipoArchivo = valor;
    setArchivos(aux);
    console.log(archivos);
    
  }

  return (
    <Grid item container direction="column" sx={{ display: "flex" }}>
      <Grid item>
        <Grid item ml={window.innerWidth / 90} lg={10} sx={{ overflow: "auto" }}>
          <TableContainer  sx={{ maxHeight: "600px" }}>
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
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">
                      {index < numArchivosObligatorios ?<Typography>Obligatorio</Typography>:
                      <IconButton  onClick={()=>{quitDocument(index);}}>
                        <DeleteIcon />
                      </IconButton>}
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
                        onChange={(v) => cargarArchivo(v, index)}
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControl required variant="standard" fullWidth>

                        <Select
                          value={archivos[index]?.tipoArchivo}
                          onChange={(v) =>  {  asignarTpoDoc(index, v.target.value);}}
                          sx={{ display: "flex", pt: 1 }}
                          inputProps={{ readOnly: index<numArchivosObligatorios }}
                          // disabled={}
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
            onChange={(v) => cargarArchivo(v)}
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          ></input>
        </Grid>
        <Grid item md={4} lg={4}>
          <ConfirmButton variant="outlined" onClick={()=>{agregarArchivo();}}>
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
