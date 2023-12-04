/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { SoporteDocumentalMandato } from "../../../store/Mandatos/mandato";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { HeadLabels } from "../../fideicomisos/panels/TipoDeMovimiento";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { CamposSoporteDocumentalInstrucciones, TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";

const heads: HeadLabels[] = [
  {
    label: "Eliminar",
  },
  {
    label: "Fecha",
  },
  {
    label: "Nombre",
  },
  {
    label: "Archivo",
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

  const archivo: File = useInstruccionesStore(
    (state) => state.soporteDocumentalInstruccion.archivo
  );

  const nombreArchivo: string = useInstruccionesStore(
    (state) => state.soporteDocumentalInstruccion.nombreArchivo
  );

  const fechaArchivo: string = useInstruccionesStore(
    (state) => state.soporteDocumentalInstruccion.fechaArchivo
  );

  const setSoporteDocumentalInstruccion: Function = useInstruccionesStore(
    (state) => state.setSoporteDocumentalInstruccion
  );

  const addSoporteDocumentalInstrucciones: Function = useInstruccionesStore(
    (state) => state.addSoporteDocumentalInstrucciones
  );

  const removeSoporteDocumentalMandato: Function = useMandatoStore(
    (state) => state.removeSoporteDocumentalMandato
  );

  const tablaSoporteDocumentalInstrucciones: CamposSoporteDocumentalInstrucciones[] =
    useInstruccionesStore((state) => state.tablaSoporteDocumentalInstrucciones);

  const cleanSoporteDocumentalInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanSoporteDocumentalInstruccion
  );

  useEffect(() => {
    cleanSoporteDocumentalInstruccion();

  }, [tablaSoporteDocumentalInstrucciones]);

  function cargarArchivo(event: any) {
    let file = event.target.files[0];

    if (file !== undefined) {
      setSoporteDocumentalInstruccion({
        fechaArchivo: fechaArchivo,
        archivo: file,
        nombreArchivo: file.name,
      });
    }
  }



  const arrDocs: any[] = useMandatoStore((state) => state.arrDocs);

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      mt={1}
    >
      <Grid container display={"flex"} justifyContent={"space-evenly"} mt={4}>


        <Grid xs={10} sm={10} md={3} lg={3} xl={3} mb={2} >
          <InputLabel>Archivo</InputLabel>
          <Typography
            position={"absolute"}
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "75%",
              fontSize: "90%",
              "@media (min-width: 480px)": {
                fontSize: "90%",
                width: "75%",
              },

              "@media (min-width: 768px)": {
                fontSize: "90%",
                width: "83%",
              },

              "@media (min-width: 900px)": {
                fontSize: "90%",
                width: "25%",
              },

              "@media (min-width: 1140px)": {
                fontSize: "90%",
                width: "20%",
              },

              "@media (min-width: 1400px)": {
                fontSize: "90%",
                width: "20%",
              },

              "@media (min-width: 1870px)": {
                fontSize: "90%",
                width: "20%",
              },
              fontFamily:
                nombreArchivo !== "" ? "MontserratBold" : "MontserratMedium",

              border:
                nombreArchivo !== ""
                  ? "2px dotted #af8c55"
                  : "2px dotted black",
            }}
          >
            {nombreArchivo ||
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
              width: "80%",
              height: "5vh",
              cursor: "pointer",
            }}
          />
        </Grid>

        <Grid xs={10} sm={10} md={3} lg={3} xl={3} mb={2} >
          <InputLabel sx={queries.medium_text}>
            Fecha del documento
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DesktopDatePicker
              sx={{
                width: "90%",
                "@media (min-width: 480px)": {
                  width: "90%",
                },

                "@media (min-width: 768px)": {
                  width: "100%",
                },

                "@media (min-width: 1140px)": {
                  width: "90%",
                },

                "@media (min-width: 1400px)": {
                  width: "90%",
                },

                "@media (min-width: 1870px)": {
                  width: "90%",
                },
              }}
              value={new Date(fechaArchivo)}
              onChange={(date) =>
                setSoporteDocumentalInstruccion({
                  fechaArchivo: date?.toString(),
                  archivo: archivo,
                  nombreArchivo: nombreArchivo,
                })
              }
            />
          </LocalizationProvider>
        </Grid>


        <Grid xs={10} sm={10} md={3} lg={3} xl={3} mb={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
        >
          <ThemeProvider theme={ButtonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                width: "15vh",
              }}
              disabled={
                fechaArchivo === "" || nombreArchivo === ""
              }
              onClick={() => {
                addSoporteDocumentalInstrucciones({
                  fechaArchivo: fechaArchivo,
                  archivo: archivo,
                  nombreArchivo: nombreArchivo,
                });
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
                              onClick={() =>
                                removeSoporteDocumentalMandato(index)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {format(new Date(row.fechaArchivo), "dd/MM/yyyy")}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.nombreArchivo}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Grid display={"flex"} justifyContent={"center"}>
                            <Tooltip title={"Mostrar vista previa del documento"}>
                              <IconButton
                                onClick={() => {
                                  toBase64(row.archivo)
                                    .then((data) => {
                                      setFileSelected(data);
                                    })
                                    .catch((err) => {
                                      setFileSelected(
                                        `data:application/pdf;base64,${arrDocs.filter((td: any) =>
                                          td.nombre.includes(row.nombreArchivo)
                                        )[0].file
                                        }`
                                      );
                                    });
                                  setShowModalPrevia(true);
                                }}
                              >
                                <FileOpenIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
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
