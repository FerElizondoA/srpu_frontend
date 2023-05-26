import {
  Grid,
  TextField,
  Divider,
  Autocomplete,
  Typography,
  Paper,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  IconButton,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCortoPlazoStore } from "../../../store/main";
import { queries } from "../../../queries";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import { format, lightFormat } from "date-fns";
import {
  CondicionFinanciera,
  IComisiones,
  TasaInteres,
} from "../../../store/condicion_financiera";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IFile } from "./Documentacion";
import CloseIcon from "@mui/icons-material/Close";
import { headsComision, headsTasa } from "./CondicionesFinancieras";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Head {
  label: string;
}
const heads: Head[] = [
  {
    label: "Obligado solidario / aval",
  },
  {
    label: "Tipo de ente público obligado",
  },
  {
    label: "Ente público obligado",
  },
];

const headsCondiciones: Head[] = [
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

export function Resumen() {
  // Encabezado
  const TipoDoc: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const SolicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const CargoSolicitante: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Cargo
  );
  const eTipoEntePublico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const EntePublico: string = useCortoPlazoStore(
    (state) => state.encabezado.organismo.Organismo
  );
  const FechaContratacion: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const gFechaContratacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const gFechaVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const gPlazo: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.plazo
  );
  const gMonto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const gDestino: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino.Descripcion
  );
  const gDenominacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const gInstitucion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const tablaObligados: ObligadoSolidarioAval[] = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  // Condiciones Financieras

  const tablaTasasInteres: TasaInteres[] = useCortoPlazoStore(
    (state) => state.tablaTasaInteres
  );

  const tablaComisiones: IComisiones[] = useCortoPlazoStore(
    (state) => state.tablaComisiones
  );

  const tablaCondicionesFinancieras: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.tablaCondicionesFinancieras
  );

  // Documentación
  const documentos: IFile[] = useCortoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  const [rowTasa, setRowTasa] = useState<Array<TasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "81vh",
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
      <Grid
        item
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid mt={5}>
          <Typography sx={queries.bold_text}>Encabezado</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
              //border: "1px solid"
            }}
          >
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Tipo de Documento: {TipoDoc}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Tipo de Ente Público: {eTipoEntePublico}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Solicitante Autorizado: {SolicitanteAutorizado}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Municipio u Organismo: {EntePublico}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                {"Fecha de Contratacion: " +
                  format(new Date(FechaContratacion), "yyyy-MM-dd")}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Cargo del Solicitante: {CargoSolicitante}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
          </Grid>
        </Grid>

        <Grid mt={5}>
          <Typography sx={queries.bold_text}>Información General</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
          >
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                {"Fecha de Contratación: " +
                  format(new Date(gFechaContratacion), "yyyy-MM-dd")}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                {"Fecha de Vencimiento: " +
                  format(new Date(gFechaVencimiento), "yyyy-MM-dd")}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Plazo(Días): {gPlazo}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Destino: {gDestino}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Monto Original Contratado: {gMonto}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Denominación: {gDenominacion}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid>
              <Typography sx={queries.medium_text}>
                Institución Financiera: {gInstitucion}
              </Typography>
            </Grid>
            <Divider color="lightGrey"></Divider>
            <Grid item>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {heads.map((head, index) => (
                        <StyledTableCell key={index}>
                          {head.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tablaObligados.map((row: any, index: number) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th">
                            {row.obligadoSolidario}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.tipoEntePublicoObligado}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.entePublicoObligado}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid mt={5}>
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
              //border: "1px solid"
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headsCondiciones.map((head, index) => (
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
        </Grid>

        <Grid mt={5} mb={5}>
          <Typography sx={queries.bold_text}>Documentación</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
              //border: "1px solid"
            }}
          >
            {documentos.map((doc, index) => (
              <Grid key={index}>
                <Divider color="lightGrey"></Divider>
                <Typography sx={queries.medium_text}>
                  {doc.descripcionTipo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
