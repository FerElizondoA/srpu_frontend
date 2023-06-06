import {
  Grid,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tooltip,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCortoPlazoStore } from "../../../store/main";
import { queries } from "../../../queries";
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
import CommentIcon from "@mui/icons-material/Comment";
import { ComentarioApartado } from "../Dialogs/DialogComentarioApartado";
import { IComentario } from "../../../store/comentarios_apartado";

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
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
  const TipodeDocumento: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const SolicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const CargodelSolicitante: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Cargo
  );
  const TipodeEntePúblico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const MunicipiouOrganismo: string = useCortoPlazoStore(
    (state) => state.encabezado.organismo.Organismo
  );
  const FechadeContratación: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const gFechadeContratación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const FechadeVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const Plazo: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.plazo.toString()
  );
  const MontoOriginalContratado: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.monto.toString()
  );
  const Destino: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino.Descripcion
  );
  const Denominación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const InstituciónFinanciera: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const tablaObligados: ObligadoSolidarioAval[] = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.tablaCondicionesFinancieras
  );

  const comentarios: IComentario[] = useCortoPlazoStore(
    (state) => state.comentarios
  );

  // Documentación
  const documentos: IFile[] = useCortoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  const [rowTasa, setRowTasa] = useState<Array<TasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);

  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "",
  });

  const encabezado: HeadLabels[] = [
    {
      label: "Tipo de Documento",
      value: TipodeDocumento,
    },
    {
      label: "Tipo de Ente Público",
      value: TipodeEntePúblico,
    },
    {
      label: "Solicitante Autorizado",
      value: SolicitanteAutorizado,
    },
    {
      label: "Municipio u Organismo",
      value: MunicipiouOrganismo,
    },
    {
      label: "Fecha de Contratación (Encabezado)",
      value: FechadeContratación,
    },
    {
      label: "Cargo del Solicitante",
      value: CargodelSolicitante,
    },
  ];

  const infoGeneral: HeadLabels[] = [
    {
      label: "Fecha de Contratación (Informacion General)",
      value: gFechadeContratación,
    },
    {
      label: "Fecha de Vencimiento",
      value: FechadeVencimiento,
    },
    {
      label: "Plazo",
      value: Plazo,
    },
    {
      label: "Monto Original Contratado",
      value: MontoOriginalContratado,
    },
    {
      label: "Destino",
      value: Destino,
    },
    {
      label: "Denominación",
      value: Denominación,
    },
    {
      label: "Institución Financiera",
      value: InstituciónFinanciera,
    },
    // {
    //   label: "Tabla Info General",
    //   value: ""
    // }
  ];


  // useEffect(() => {

  //   console.log('Documentacion apartados: ',documentos)

  // }, [])

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "79vh",
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
            }}
          >
            <Divider color="lightGrey"></Divider>
            {encabezado.map((head, index) => (
              <Grid sx={{ display: "flex", alignItems: "center" }}>


                {/* Revisar */}

                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios.filter(
                        (_, i) =>
                          _.Apartado === head.label && _.Tab === "Encabezado"
                      ).length > 0
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Encabezado",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>

                {/* Revisar */}

                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
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
            {infoGeneral.map((head, index) => (
              <Grid sx={{ display: "flex", alignItems: "center" }}>

                {/* Revisar */}
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios.filter(
                        (_, i) =>
                          _.Apartado === head.label &&
                          _.Tab === "Información General"
                      ).length > 0
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Información General",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                {/* Revisar */}

                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid item display="flex" height={350}>
            <Grid mt={2} >
              {/* Revisar */}

              <Tooltip title="Añadir comentario a este apartado">
                <IconButton
                  color={
                    comentarios.filter(
                      (_, i) => _.Tab === "Informacion General"
                    ).length > 0
                      ? "success"
                      : "primary"
                  }
                  size="small"
                  onClick={() => {
                    setOpenComentarioApartado({
                      open: true,
                      apartado: 'Tabla Obligado Solidario Aval',
                      tab: "Informacion General",
                    });
                  }}
                >
                  <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>

              {/* Revisar */}
            </Grid>

            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{
                maxHeight: "100%",
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
              }}>
                {tablaObligados.length > 0 ?
                  <Table stickyHeader>
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

                  :
                  //Condicional

                  <Table stickyHeader>
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

                      <StyledTableRow >
                        <StyledTableCell component="th">
                        </StyledTableCell>

                        <StyledTableCell component="th" align="left">
                          <Typography
                          sx={{padding: "1px 4px 1px 45px"}}
                          >Sin contenido</Typography>
                        </StyledTableCell>

                        <StyledTableCell component="th">
                        </StyledTableCell>
                      </StyledTableRow>


                    </TableBody>
                  </Table>

                }

              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        <Divider color="lightGrey"></Divider>


        <Grid mt={3} >
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
          <Grid item display={"flex"}
            height={350}
          // sx={{
          //   display: "flex",
          //   flexDirection: "row",
          //   mt: 1,
          //   alignItems: "center",
          //   borderBottom: 1,
          //   borderColor: "#cfcfcf",
          //   fontSize: "12px",
          //   border: "1px solid"
          // }}
          >
            <Grid mt={4} >
              {/* Revisar */}
              <Tooltip title="Añadir comentario a este apartado">
                <IconButton
                  color={
                    comentarios.filter(
                      (_, i) => _.Tab === "Condiciones Financieras"
                    ).length > 0
                      ? "success"
                      : "primary"
                  }
                  size="small"
                  onClick={() => {
                    setOpenComentarioApartado({
                      open: true,
                      apartado: ' Tabla Condiciones Financieras',
                      tab: "Condiciones Financieras",
                    });
                  }}
                >
                  <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
              {/* Revisar */}
            </Grid>


            <Paper>
              {tablaCondicionesFinancieras.length > 0 ?
                <TableContainer sx={{
                  maxHeight: "100%",
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
                }}>
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
                    <ComentarioApartado
                      setOpen={setOpenComentarioApartado}
                      openState={openComentarioApartado}
                    />
                  </Table>
                </TableContainer>

                : //**********CONDICIONAL************

                <TableContainer sx={{
                  maxHeight: "100%",
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
                }}>
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

                      <StyledTableRow >
                        <StyledTableCell component="th" scope="row">
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        </StyledTableCell>

                        <StyledTableCell >
                          <Typography>Sin contenido</Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        </StyledTableCell>
                      </StyledTableRow>


                    </TableBody>
                  </Table>
                </TableContainer>
                //*********FIN TERNARIO ************/
              }

            </Paper>
          </Grid>
        </Grid>

        <Divider color="lightGrey"></Divider>
        <Grid mt={5}>
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
              <Grid key={index} display={"flex"}>
                {/* Revisar */}

                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios.filter(
                        /*documentos accesa al array de objetos; [index]: es para obtener solo 1 objeto de dicho array; .descripcionTipo: el valor del objeto en especifico que queremos accesar */
                        (_, i) => _.Apartado === documentos[index].descripcionTipo &&
                          _.Tab === "Documentacion"
                      ).length > 0
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: documentos[index].descripcionTipo,
                        tab: "Documentacion",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                {/* Revisar */}

                <Typography sx={queries.medium_text}>
                  {doc.descripcionTipo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <ComentarioApartado
        setOpen={setOpenComentarioApartado}
        openState={openComentarioApartado}
      />
    </Grid>
  );
}
