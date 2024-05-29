/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
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
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ISoporteDocumentalInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { listFile } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

const heads = [
  {
    label: " ",
  },
  {
    label: "Tipo de documento",
  },
  {
    label: "Fecha del documento",
  },
  {
    label: "Archivo",
  },
  {
    label: " ",
  },
];

export function SoporteDocumentalInstrucciones() {
  const [fileSelected, setFileSelected] = useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones =
    useInstruccionesStore((state) => state.soporteDocumentalInstruccion);

  const setSoporteDocumentalInstruccion: Function = useInstruccionesStore(
    (state) => state.setSoporteDocumental
  );

  const addSoporteDocumentalInstrucciones: Function = useInstruccionesStore(
    (state) => state.addSoporteDocumental
  );

  const tablaSoporteDocumentalInstrucciones: ISoporteDocumentalInstrucciones[] =
    useInstruccionesStore((state) => state.tablaSoporteDocumentalInstruccion);

  const cleanSoporteDocumentalInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanSoporteDocumental
  );

  const removeSoporteDocumental: Function = useInstruccionesStore(
    (state) => state.removeSoporteDocumental
  );

  function cargarArchivo(event: any) {
    let file = event.target.files[0];

    if (file !== undefined) {
      setSoporteDocumentalInstruccion({
        ...soporteDocumentalInstruccion,
        archivo: file,
        nombreArchivo: file.name,
      });
    }
  }

  useEffect(() => {
    cleanSoporteDocumentalInstruccion();
  }, [tablaSoporteDocumentalInstrucciones]);

  const idInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  );

  const [arr, setArr] = useState<any>([]);

  useEffect(() => {
    if (idInstruccion !== "") {
      listFile(
        `/SRPU/INSTRUCCIONESIRREVOCABLES/${idInstruccion}/`,
        setArr
      ).then(() => {
        setLoading(false);
      });
    }
  }, []);

  const [loading, setLoading] = useState(true);

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      mt={1}
    >
      <Grid
        container
        sx={{
          //display: "grid",
          //gridTemplateColumns: "repeat(2,1fr)",
          display: "flex",
          justifyContent: "space-evenly",
          height: "40%",
        }}
      >
        <Grid item xs={10} sm={10} md={5} lg={4} xl={4}>
          <InputLabel sx={{ ...queries.medium_text }}>
            Tipo de Documento
          </InputLabel>
          <TextField
            fullWidth
            size="small"
            // sx={{
            //   width: "100%",
            //   fontSize: "60%",
            //   fontFamily: "MontserratMedium",
            // }}
            value={soporteDocumentalInstruccion.tipo}
            onChange={(v) => {
              setSoporteDocumentalInstruccion({
                ...soporteDocumentalInstruccion,
                tipo: v.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={10} sm={10} md={5} lg={4} xl={4}>
          <InputLabel>Archivo</InputLabel>
          <Typography
            position={"absolute"}
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "83%",
              fontSize: "80%",
              "@media (min-width: 480px)": {
                fontSize: "80%",
                width: "83%",
              },

              "@media (min-width: 768px)": {
                fontSize: "90%",
                width: "83%",
              },

              "@media (min-width: 900px)": {
                fontSize: "90%",
                width: "40%",
              },

              "@media (min-width: 1140px)": {
                fontSize: "90%",
                width: "40%",
              },

              "@media (min-width: 1400px)": {
                fontSize: "90%",
                width: "35%",
              },

              "@media (min-width: 1870px)": {
                fontSize: "90%",
                width: "35%",
              },
              fontFamily:
                soporteDocumentalInstruccion.nombreArchivo !== ""
                  ? "MontserratBold"
                  : "MontserratMedium",

              border:
                soporteDocumentalInstruccion.nombreArchivo !== ""
                  ? "2px dotted #af8c55"
                  : "2px dotted black",
            }}
          >
            {soporteDocumentalInstruccion.nombreArchivo ||
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivo(v);
            }}
            style={{
              opacity: 0,
              width: "100%",
              height: "5vh",
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>

      <Grid container display={"flex"} justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={10} md={5} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>Fecha del Documento</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              sx={{
                width: "100%",
              }}
              value={new Date(soporteDocumentalInstruccion.fechaArchivo)}
              onChange={(date) =>
                setSoporteDocumentalInstruccion({
                  ...soporteDocumentalInstruccion,
                  fechaArchivo: date?.toString(),
                })
              }
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          xs={10}
          sm={10}
          md={5}
          lg={4}
          xl={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={{ xs: 2, sm: 2, md: 0 }}
        >
          <ThemeProvider theme={buttonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
              }}
              disabled={
                soporteDocumentalInstruccion.tipo === "" ||
                soporteDocumentalInstruccion.nombreArchivo === ""
              }
              onClick={() => {
                addSoporteDocumentalInstrucciones(soporteDocumentalInstruccion);
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid
        container
        flexDirection={"column"}
        alignItems={"center"}
        gridColumn={"1/4"}
        mt={4}
      >
        <Paper sx={{ width: "91%", height: "50vh" }}>
          <TableContainer
            sx={{
              height: "100%",
              maxHeight: "50vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
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
                    <StyledTableCell align="center" key={index}>
                      <Typography>{head.label}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaSoporteDocumentalInstrucciones.map(
                  (row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                removeSoporteDocumental(index);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipo}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {format(new Date(row.fechaArchivo), "dd/MM/yyyy")}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.nombreArchivo}
                        </StyledTableCell>

                        <StyledTableCell>
                          {loading && !row.archivo ? (
                            <CircularProgress />
                          ) : (
                            <Tooltip
                              title={"Mostrar vista previa del documento"}
                            >
                              <IconButton
                                onClick={() => {
                                  toBase64(row.archivo)
                                    .then((data) => {
                                      setFileSelected(data);
                                    })
                                    .catch((err) => {
                                      setFileSelected(
                                        `data:application/pdf;base64,${
                                          arr.filter((td: any) =>
                                            td.NOMBREFORMATEADO.includes(
                                              row.nombreArchivo
                                            )
                                          )[0].FILE
                                        }`
                                      );
                                    });
                                  setShowModalPrevia(true);
                                }}
                              >
                                <FileOpenIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Dialog
        open={showModalPrevia}
        onClose={() => {
          setShowModalPrevia(false);
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
