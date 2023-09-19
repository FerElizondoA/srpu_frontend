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
import { GridCloseIcon } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { SoporteDocumentalMandato } from "../../../store/Mandatos/mandato";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { HeadLabels } from "../../fideicomisos/panels/TipoDeMovimiento";

const heads: HeadLabels[] = [
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

export function SoporteDocumental() {
  const [fileSelected, setFileSelected] = useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    setSoporteDocumentalMandato({
      tipo: (event.target as HTMLInputElement).value,
      fechaArchivo: fechaArchivo,
      archivo: archivo,
      nombreArchivo: nombreArchivo,
    });
  };

  const tipo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.tipo
  );

  const archivo: File = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.archivo
  );

  const nombreArchivo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.nombreArchivo
  );

  const fechaArchivo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.fechaArchivo
  );

  const setSoporteDocumentalMandato: Function = useLargoPlazoStore(
    (state) => state.setSoporteDocumentalMandato
  );

  const addSoporteDocumentalMandato: Function = useLargoPlazoStore(
    (state) => state.addSoporteDocumentalMandato
  );

  const removeSoporteDocumentalMandato: Function = useLargoPlazoStore(
    (state) => state.removeSoporteDocumentalMandato
  );

  const tablaSoporteDocumentalMandato: SoporteDocumentalMandato[] =
    useLargoPlazoStore((state) => state.tablaSoporteDocumentalMandato);

  function cargarArchivo(event: any) {
    let file = event.target.files[0];

    if (file !== undefined) {
      setSoporteDocumentalMandato({
        tipo: tipo,
        fechaArchivo: fechaArchivo,
        archivo: file,
        nombreArchivo: file.name,
      });
    }
  }

  const [radioValue, setRadioValue] = useState("");
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      mt={1}
    >
      <Grid container display={"flex"} justifyContent={"space-evenly"} mt={4}>
        <Grid
          sx={{
            display: "flex",
            width: "40%",
            "@media (min-width: 480px)": {
              width: "40%",
            },

            "@media (min-width: 768px)": {
              width: "15%",
            },
          }}
        >
          <FormControl>
            <RadioGroup
              sx={{ marginLeft: 3 }}
              value={radioValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Mandato"
                control={<Radio />}
                label="Mandato"
              />
              <FormControlLabel
                value="Convenio modificatorio"
                control={<Radio />}
                label="Convenio modificatorio"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
          <Grid width={"90%"}>
            <InputLabel sx={queries.medium_text}>
              Fecha del documento
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                value={new Date(fechaArchivo)}
                onChange={(date) =>
                  setSoporteDocumentalMandato({
                    tipo: tipo,
                    fechaArchivo: date?.toString(),
                    archivo: archivo,
                    nombreArchivo: nombreArchivo,
                  })
                }
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid>
            <InputLabel>Archivo</InputLabel>
            <Typography
              position={"absolute"}
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "45%",
                fontSize: "60%",
                "@media (min-width: 480px)": {
                  fontSize: "60%",
                  width: "30%",
                },

                "@media (min-width: 768px)": {
                  fontSize: "60%",
                  width: "30%",
                },

                "@media (min-width: 1140px)": {
                  fontSize: "90%",
                },

                "@media (min-width: 1400px)": {
                  fontSize: "90%",
                  width: "30%",
                },

                "@media (min-width: 1870px)": {
                  fontSize: "90%",
                  width: "30%",
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
                width: "100%",
                height: "5vh",
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>

        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={1}
        >
          <ThemeProvider theme={ButtonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                width: "15vh",
              }}
              disabled={
                tipo === "" || fechaArchivo === "" || nombreArchivo === ""
              }
              onClick={() => {
                addSoporteDocumentalMandato({
                  tipo: tipo,
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
                {tablaSoporteDocumentalMandato.map(
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
                          {row.tipo}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {format(new Date(row.fechaArchivo), "dd/MM/yyyy")}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.nombreArchivo}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Tooltip title={"Mostrar vista previa del documento"}>
                            <IconButton
                              onClick={() => {
                                toBase64(row.archivo).then((data) => {
                                  setFileSelected(data);
                                });
                                setShowModalPrevia(true);
                              }}
                            >
                              <FileOpenIcon />
                            </IconButton>
                          </Tooltip>
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
        open={false}
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
            <GridCloseIcon />
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
