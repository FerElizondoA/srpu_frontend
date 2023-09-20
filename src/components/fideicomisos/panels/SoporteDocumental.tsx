/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { ThemeProvider } from "@emotion/react";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import { queries } from "../../../queries";
import { SoporteDocumental } from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { HeadLabels } from "./TipoDeMovimiento";

export function SDocumental() {
  const heads: HeadLabels[] = [
    {
      label: "Accion",
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
      label: "Ver Archivo",
    },
  ];

  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const soporteDocumental: SoporteDocumental = useFideicomisoStore(
    (state) => state.soporteDocumental
  );

  const setSoporteDocumental: Function = useFideicomisoStore(
    (state) => state.setSoporteDocumental
  );

  const addSoporteDocumental: Function = useFideicomisoStore(
    (state) => state.addSoporteDocumental
  );

  const tablaSoporteDocumental: SoporteDocumental[] = useFideicomisoStore(
    (state) => state.tablaSoporteDocumental
  );

  const removeSoporteDocumental: Function = useFideicomisoStore(
    (state) => state.removeSoporteDocumental
  );

  const cleanSoporteDocumental: Function = useFideicomisoStore(
    (state) => state.cleanSoporteDocumental
  );

  const [radioValue, setRadioValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    setSoporteDocumental({
      tipo: (event.target as HTMLInputElement).value,
      fechaArchivo: soporteDocumental.fechaArchivo,
      archivo: soporteDocumental.archivo,
      nombreArchivo: soporteDocumental.nombreArchivo,
    });
  };

  function cargarArchivo(event: any) {
    let file = event.target.files[0];

    if (file !== undefined) {
      setSoporteDocumental({
        tipo: soporteDocumental.tipo,
        fechaArchivo: soporteDocumental.fechaArchivo,
        archivo: file,
        nombreArchivo: file.name,
      });
    }
  }

  useEffect(() => {
    cleanSoporteDocumental();
  }, [tablaSoporteDocumental]);

  const [fileSelected, setFileSelected] = useState<any>("");

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const arrDocs: any[] = useFideicomisoStore((state) => state.arrDocs);
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      //gridTemplateColumns={"repeat(3,1fr)"}
      //justifyItems={"center"}
      mt={3}
    >
      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        //height={"10rem"}
      >
        <Grid
          height={"4rem"}
          width={"40%"}
          sx={{
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
            <RadioGroup value={radioValue} onChange={handleChange}>
              <FormControlLabel
                value="Fideicomiso"
                control={<Radio />}
                label="Fideicomiso"
              />
              <FormControlLabel
                value="Convenio de adhesión"
                control={<Radio />}
                label="Convenio de adhesión"
              />
              <FormControlLabel
                value="Convenio Modificatorio"
                control={<Radio />}
                label="Convenio Modificatorio"
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
                value={new Date(soporteDocumental.fechaArchivo)}
                onChange={(date) =>
                  setSoporteDocumental({
                    tipo: soporteDocumental.tipo,
                    fechaArchivo: date,
                    archivo: soporteDocumental.archivo,
                    nombreArchivo: soporteDocumental.nombreArchivo,
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
                  soporteDocumental.nombreArchivo !== ""
                    ? "MontserratBold"
                    : "MontserratMedium",

                border:
                  soporteDocumental.nombreArchivo !== ""
                    ? "2px dotted #af8c55"
                    : "2px dotted black",
              }}
            >
              {soporteDocumental.nombreArchivo ||
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
                soporteDocumental.tipo === "" ||
                soporteDocumental.fechaArchivo === "" ||
                soporteDocumental.nombreArchivo === ""
              }
              onClick={() => {
                addSoporteDocumental({
                  tipo: soporteDocumental.tipo,
                  fechaArchivo: soporteDocumental.fechaArchivo,
                  archivo: soporteDocumental.archivo,
                  nombreArchivo: soporteDocumental.nombreArchivo,
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
        <Paper sx={{ width: "88%", height: "50vh" }}>
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
                {tablaSoporteDocumental.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => removeSoporteDocumental(index)}
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
                              toBase64(row.archivo)
                                .then((data) => {
                                  setFileSelected(data);
                                })
                                .catch((err) => {
                                  setFileSelected(
                                    `data:application/pdf;base64,${
                                      arrDocs.filter((td: any) =>
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
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
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
