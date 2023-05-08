import { useState } from "react";
import {
  CondicionFinanciera,
  IComisiones,
  TasaInteres,
} from "../../../store/condicion_financiera";
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
} from "@mui/material";


import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { format, lightFormat } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CloseIcon from "@mui/icons-material/Close";
import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";

interface Head {
  label: string;
}

const headsTasa: readonly Head[] = [
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

const headsComision: readonly Head[] = [
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

const heads: readonly Head[] = [
  {
    label: "Acciones",
  },
  {
    label: "Fecha de Disposición",
  },
  {
    label: "Importe de Disposición",
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

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  return (
    <Grid container direction="column">
      <Grid item>
        <TableContainer sx={{ minHeight: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {heads.map((head, index) => (
                  <StyledTableCell key={index}>
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

                    <StyledTableCell component="th" scope="row">
                      {format(
                        new Date(row.disposicion.fechaDisposicion),
                        "dd/MM/yyyy"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {"$" + row.disposicion.importe}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(
                        new Date(row.pagosDeCapital.fechaPrimerPago),
                        "dd/MM/yyyy"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pagosDeCapital.periodicidadDePago}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(
                        new Date(row.pagosDeCapital.fechaPrimerPago),
                        "dd/MM/yyyy"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          setRowTasa(row.tasaInteres);
                          setOpenTasa(true);
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
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
                <TableContainer sx={{ maxHeight: "400px" }}>
                  <Table>
                    <TableHead sx={{ maxHeight: "200px" }}>
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
          </Table>
        </TableContainer>
      </Grid>

      <Grid item container position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Grid item md={12} lg={12}>
          <ConfirmButton
            variant="outlined"
            onClick={() => {
              changeOpenAgregarState(!openAgregarCondicion);
              setAccion("Agregar");
            }}
          >
            AGREGAR
          </ConfirmButton>
          {/* {changeOpenAgregarState ? ( */}
            <AgregarCondicionFinanciera
              handler={changeOpenAgregarState}
              openState={openAgregarCondicion}
              accion={accion}
              indexA={indexA}
            />
          {/* ) : null} */}
        </Grid>

        {/* <Grid item md={6} lg={6}>
          <DeleteButton variant="outlined" 
          //onClick={() =>
             //deleteRows()}
             >ELIMINAR</DeleteButton>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
