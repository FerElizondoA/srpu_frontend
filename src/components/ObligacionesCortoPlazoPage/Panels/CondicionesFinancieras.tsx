import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  IComisiones,
  ICondicionFinanciera,
  IDisposicion,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/condicion_financiera";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, lightFormat } from "date-fns";

import CloseIcon from "@mui/icons-material/Close";
import { queries } from "../../../queries";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";

export const headsTasa: readonly {
  label: string;
}[] = [
  {
    label: "Fecha de Primer Pago",
  },
  {
    label: "Tasa Fija",
  },
  {
    label: "Periodicidad de Pago",
  },
  {
    label: "Tasa de Referencia",
  },
  {
    label: "Sobretasa",
  },
  {
    label: "Dias del Ejercicio",
  },
];

export const headsComision: readonly {
  label: string;
}[] = [
  {
    label: "Tipo de comisión",
  },
  {
    label: "Fecha de primer pago",
  },
  {
    label: "Periodicidad de Pago",
  },
  {
    label: "Porcentaje",
  },
  {
    label: "Monto",
  },
  {
    label: "IVA",
  },
];

export const headsDisposicion: readonly {
  label: string;
}[] = [
  {
    label: "Fecha de Disposición",
  },
  {
    label: "Importe de disposición",
  },
];

const heads: readonly {
  label: string;
}[] = [
  {
    label: "Acciones",
  },
  {
    label: "Fecha Disposición",
  },
  {
    label: "Importe de disposición",
  },
  {
    label: "Fecha de Primer Pago Capital",
  },
  {
    label: "Periodicidad de Pago Capital",
  },
  {
    label: "Fecha de Primer Pago de Interés",
  },
  {
    label: "Tasa de Interés",
  },
  {
    label: "Comisiones",
  },
];

export function CondicionesFinancieras() {
  const [openAgregarCondicion, changeAgregarCondicion] = useState(false);

  const tablaCondicionesFinancieras: ICondicionFinanciera[] =
    useCortoPlazoStore((state) => state.tablaCondicionesFinancieras);

  const loadCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.loadCondicionFinanciera
  );

  const [accion, setAccion] = useState("Agregar");
  const [indexA, setIndexA] = useState(0);

  const changeOpenAgregarState = (open: boolean) => {
    changeAgregarCondicion(open);
  };

  const updatecondicionFinancieraTable: Function = useCortoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );

  const [rowTasa, setRowTasa] = useState<Array<ITasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);
  const [rowDisposicion, setRowDisposicion] = useState<Array<IDisposicion>>([]);

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);
  const [openDisposicion, setOpenDisposicion] = useState(false);

  const setDisposicionesParciales: Function = useCortoPlazoStore(
    (state) => state.setDisposicionesParciales
  );
  const setTasasParciales: Function = useCortoPlazoStore(
    (state) => state.setTasasParciales
  );

  const changeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.changeTasaInteres
  );

  const datosActualizar: Array<string> = useCortoPlazoStore(
    (state) => state.datosActualizar
  );

  let disable =
    datosActualizar.length < 0 &&
    (!datosActualizar.includes("Tabla Condiciones Financieras") ||
      !datosActualizar.includes("Monto Original Contratado"));

  return (
    <Grid
      container
      sx={{
        height: "30rem",
        "@media (min-width: 480px)": {
          height: "39rem",
        },

        "@media (min-width: 768px)": {
          height: "48rem",
        },

        "@media (min-width: 1140px)": {
          height: "31rem",
        },

        "@media (min-width: 1400px)": {
          height: "31rem",
        },

        "@media (min-width: 1870px)": {
          height: "44rem",
        },
      }}
    >
      <Grid container height={"100%"}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
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
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography
                        sx={{
                          fontSize: ".8rem",
                          "@media (min-width: 480px)": {
                            fontSize: "1rem",
                          },
                        }}
                      >
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaCondicionesFinancieras.map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">
                        <Tooltip title="Editar">
                          <IconButton
                            disabled={disable}
                            type="button"
                            onClick={() => {
                              changeOpenAgregarState(!openAgregarCondicion);
                              setAccion("Editar");
                              setIndexA(index);
                              loadCondicionFinanciera(row);

                              if (row.disposicion.length > 1) {
                                setDisposicionesParciales(true);
                              }
                              if (row.tasaInteres.length > 1) {
                                setTasasParciales(true);
                              } else {
                                changeTasaInteres({
                                  tasaFija: row.tasaInteres[0].tasaFija,
                                  tasaVariable: row.tasaInteres[0].tasaVariable,
                                  tasa: row.tasaInteres[0].tasa,
                                  fechaPrimerPago:
                                    row.tasaInteres[0].fechaPrimerPago ||
                                    new Date().toString(),
                                  diasEjercicio: {
                                    Id: "",
                                    Descripcion:
                                      row.tasaInteres[0].diasEjercicio,
                                  },
                                  periocidadPago: {
                                    Id: "",
                                    Descripcion:
                                      row.tasaInteres[0].periocidadPago,
                                  },
                                  tasaReferencia: {
                                    Id: "",
                                    Descripcion:
                                      row.tasaInteres[0].tasaReferencia,
                                  },
                                  sobreTasa: row.tasaInteres[0].sobreTasa,
                                });
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            disabled={disable}
                            type="button"
                            onClick={() => {
                              updatecondicionFinancieraTable(
                                tablaCondicionesFinancieras.filter(
                                  (item) => item.id !== row.id
                                )
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.disposicion.length > 1
                          ? null
                          : format(
                              new Date(row.disposicion[0].fechaDisposicion),
                              "dd/MM/yyyy"
                            )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.disposicion.length > 1 ? (
                          <Button
                            onClick={() => {
                              setRowDisposicion(row.disposicion);
                              setOpenDisposicion(true);
                            }}
                          >
                            <InfoOutlinedIcon />
                          </Button>
                        ) : (
                          row.disposicion[0].importe
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {format(
                          new Date(row.pagosDeCapital.fechaPrimerPago),
                          "dd/MM/yyyy"
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {row.pagosDeCapital.periodicidadDePago}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {format(
                          new Date(row.pagosDeCapital.fechaPrimerPago),
                          "dd/MM/yyyy"
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        <Button
                          onClick={() => {
                            setRowTasa(row.tasaInteres);
                            setOpenTasa(true);
                          }}
                        >
                          <InfoOutlinedIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        <Button
                          onClick={() => {
                            setRowComision(row.comisiones);
                            setOpenComision(true);
                          }}
                        >
                          <InfoOutlinedIcon />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
              <Dialog
                open={openTasa}
                onClose={() => {
                  setOpenTasa(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <IconButton
                    onClick={() => {
                      setOpenTasa(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer sx={{ maxHeight: "400px" }}>
                    <Table>
                      <TableHead sx={{ maxHeight: "200px" }}>
                        <TableRow>
                          {headsTasa.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowTasa.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row">
                                {lightFormat(
                                  new Date(row.fechaPrimerPago),
                                  "dd-MM-yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.tasa}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.periocidadPago}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.tasaReferencia}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.sobreTasa}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.diasEjercicio}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openComision}
                onClose={() => {
                  setOpenComision(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <IconButton
                    onClick={() => {
                      setOpenComision(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsComision.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowComision.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row">
                                {row.tipoDeComision}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {lightFormat(
                                  new Date(row.fechaContratacion),
                                  "dd-MM-yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.periodicidadDePago}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.porcentaje}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.monto}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.iva}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openDisposicion}
                onClose={() => {
                  setOpenDisposicion(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <IconButton
                    onClick={() => {
                      setOpenDisposicion(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsDisposicion.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowDisposicion.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">
                                {lightFormat(
                                  new Date(row.fechaDisposicion),
                                  "dd-MM-yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.importe}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid
        container
        item
        md={12}
        lg={12}
        height={"4rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={disable}
            sx={queries.buttonContinuar}
            variant="outlined"
            onClick={() => {
              changeOpenAgregarState(!openAgregarCondicion);
              setAccion("Agregar");
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>

        <AgregarCondicionFinanciera
          handler={changeOpenAgregarState}
          openState={openAgregarCondicion}
          accion={accion}
          indexA={indexA}
        />
      </Grid>
    </Grid>
  );
}
