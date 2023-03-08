import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Checkbox,
  Button,
  Alert,
  InputLabel,
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

const currencies = [
  {
    value: "Documento",
    label: "Documento ",
  },
  {
    value: "Documento2",
    label: "Documento 1",
  },
  {
    value: "Documento2",
    label: "Documento 2",
  },
  {
    value: "Documento3",
    label: "Documendo 3",
  },
];

function createDummyData(Documento: String) {
  return {
    Documento,
  };
}

//const rows = [createDummyData("Documento cualquiera.pdf")];

const MAX_COUNT = 5;

export function Documentacion() {
  const [file, setFile] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [uploadFile, setUploadFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const AlertDisplay = () => {
    setDisabledButton(true);
    setLoadingFile(false);
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

  const submitForm = () => {
    let aux = archivos;
    console.log(uploadFile);

    if (uploadFile !== undefined) {
      aux?.push(uploadFile);
      setArchivos(aux);
    }

    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
    console.log("aux", aux);
  };

  const cancelar = () => {
    setNombreArchivo("ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO");
  };

  const quitDocument = (index: number) => {
    console.log("soy el index de la row", index);

    let aux: File[] = [];
    archivos.map((archivo, x) => {
      if (x !== index) aux.push(archivo);
    });

    setArchivos(aux);
    console.log("aux", aux);
  };

  const [checked, setChecked] = useState(true);

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
                  //const isItemSelected = isSelected(row.name);
                  <StyledTableRow>
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
                      <TextField
                        id="standard-select-currency-native"
                        select
                        
                        SelectProps={{
                          native: true,
                        }}
                        variant="standard"
                      >
                        {currencies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
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
        //gap={0}
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

          {/* <Button
            //onClick={submitForm}
            sx={{
              backgroundColor: "red",
              color: "black",
              height: "3vh",
              width: "10vw",
              mb: 0.5,
            }}
          >
            Cargar
          </Button> */}
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
