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
import TextField from "@mui/material/TextField";
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
  const [disabledButton, setDisabledButton] = useState(true);
  const [uploadFile, setUploadFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tiposDocumentos, setTiposDocumentos] = useState<Array<ITiposDocumento>>([]);




  useEffect(() => {
    getTiposDocumentos(setTiposDocumentos)
  }, [])

  const [nombreArchivo, setNombreArchivo] = useState(
    "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  );

  const [archivos, setArchivos] = useState<Array<File>>([]);

  function enCambioFile(event: any) {
    setUploadFile(event.target.files[0]);

    if (event.target.value !== "") {
      setNombreArchivo(event.target.value.split("\\")[2]);
    }
  }



  const submitForm = () => {

    if (lastFile !== uploadFile && uploadFile !== undefined) {
      let aux = archivos;
      aux?.push(uploadFile);
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
    let aux: File[] = [];
    archivos.map((archivo, x) => {
      if (x !== index) aux.push(archivo);
    });

    setArchivos(aux);
  };
  const AlertDisplay = () => {
    setDisabledButton(true);
    return (
      <Alert
        sx={{ borderRadius: 5, width: "80%", alignItems: "center", mt: 2 }}
        severity="error"
        onClose={() => {
          setShowAlert(false);
          setNombreArchivo("Arrastre o de click aquí para seleccionar archivo");
        }}
      >
        {errorMsg}
      </Alert>
    );

  };
  return (
    <Grid item container direction="column" sx={{ display: "flex" }}>
      <Grid item>
        <Grid item ml={window.innerWidth / 50} lg={8}>
          <TableContainer sx={{ maxHeight: "600px" }}>
            <Table>
              <TableHead>
                {heads.map((head) => (
                  <StyledTableCell key={head.id}>
                    <TableSortLabel>{head.label}</TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody sx={{ margin: "100px" }}>
                {archivos.map((archivo, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">
                      <IconButton
                        onClick={() => {
                          quitDocument(index);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell component="th">
                      {archivo.name.toString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControl required variant="standard" fullWidth>
                        <InputLabel sx={queries.medium_text}>Tipo  de Documento</InputLabel>
                        <Select
                          value={tipoDocumento}
                          onChange={(v) => {
                            let  aux= v.target.value;
                            setTipoDocumento(aux);
                            console.log(aux);
                          }}
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
          {showAlert ? (
            <AlertDisplay />
          ) : (
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
          )}

          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => enCambioFile(v)}
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
