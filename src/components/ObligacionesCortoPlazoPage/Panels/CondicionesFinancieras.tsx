import { useState, useEffect } from "react";
import {
  CondicionFinanciera,
  Disposicion,
  IComisiones,
  TasaInteres,
} from "../../../store/CreditoCortoPlazo/condicion_financiera";
import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TableRow,
  Paper,
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { format, lightFormat } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CloseIcon from "@mui/icons-material/Close";
import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";
import { queries } from "../../../queries";

interface Head {
  label: string;
}

export const headsTasa: readonly Head[] = [
  {
    label: "Fecha de Primer Pago",
  },
  {
    label: "Tasa Fija",
  },
  {
    label: "Periocidad de Pago",
  },
  {
    label: "Tasa de Referencia",
  },
  {
    label: "Sobre Tasa",
  },
  {
    label: "Dias del Ejercicio",
  },
];

export const headsComision: readonly Head[] = [
  {
    label: "Tipo de comisión",
  },
  {
    label: "Fecha de primer pago",
  },
  {
    label: "Periocidad de Pago",
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

export const headsDisposicion: readonly Head[] = [
  {
    label: "Fecha de disposición",
  },
  {
    label: "Importe",
  },
];

const heads: readonly Head[] = [
  {
    label: "Acciones",
  },
  {
    label: "Fecha Disposición",
  },
  {
    label: "Importe",
  },
  {
    label: "Fecha de Primer Pago Capital",
  },
  {
    label: "Periocidad de Pago Capital",
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
  const tablaCondicionesFinancieras: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.tablaCondicionesFinancieras
  );
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

  const [rowTasa, setRowTasa] = useState<Array<TasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);
  const [rowDisposicion, setRowDisposicion] = useState<Array<Disposicion>>([]);

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

  return (
    <Grid container>
      <Grid item sx={queries.tablaCondicionFinanciera}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <TableContainer
            sx={{
              height: "100%",
              width: "100%",
              overflow: "auto",
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
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
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
        item
        md={12}
        lg={12}
        height={75}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          sx={queries.buttonContinuar}
          variant="outlined"
          onClick={() => {
            changeOpenAgregarState(!openAgregarCondicion);
            setAccion("Agregar");
          }}
        >
          Agregar
        </Button>
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
