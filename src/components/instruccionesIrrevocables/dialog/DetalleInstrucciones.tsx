/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as React from "react";
import { useEffect } from "react";
import { queries } from "../../../queries";
import { IDatosInstrucciones } from "../../../screens/fuenteDePago/InstruccionesIrrevocables";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import {
  IDeudorInstrucciones,
  ISoporteDocumentalInstrucciones,
} from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { listFile } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

const headsTipoMovimiento: { label: string }[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente Público Obligado",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
];

const headsSoporteDocumental = [
  {
    label: "Tipo de Documento",
  },
  {
    label: "Fecha del Documento",
  },
  {
    label: "Nombre del Documento",
  },
  {
    label: "Ver Documento",
  },
];

export function DetalleInstruccion({
  open,
  setOpen,
  instruccion,
}: {
  open: boolean;
  setOpen: Function;
  instruccion: IDatosInstrucciones;
}) {
  const [fileSelected, setFileSelected] = React.useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = React.useState(false);

  const idInstruccion: string = instruccion.Id;

  const [arr, setArr] = React.useState<any>([]);

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

  const [loading, setLoading] = React.useState(true);

  return (
    <Dialog
      open={open}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            ...queries.buttonCancelar,
            fontSize: "70%",
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Volver
        </Button>

        <Typography sx={{ ...queries.bold_text, color: "white", ml: 2 }}>
          Detalle de Instruccion
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".5vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Grid
          sx={{
            height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 4,
          }}
        >
          <Typography sx={queries.bold_text}>Datos Generales</Typography>
          <Divider color="lightGrey"></Divider>

          <Typography sx={{ ...queries.medium_text }}>
            <strong> Número de Cuenta:</strong> {instruccion.NumeroCuenta}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Fecha de la Instruccion:</strong>{" "}
            {format(new Date(instruccion.FechaInstruccion), "PPP", {
              locale: es,
            })}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Cuenta CLABE:</strong> {instruccion.CLABE}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Banco:</strong> {instruccion.DescripcionBanco}
          </Typography>

          <Divider color="lightGrey"></Divider>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 4,
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              width: ".1vw",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "grey",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}
        >
          <Typography sx={queries.bold_text}>Tipo de Movimiento</Typography>
          <Divider color="lightGrey"></Divider>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headsTipoMovimiento.map((head, index) => (
                  <StyledTableCell key={index}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: "700" }}>
                      {head.label}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {JSON.parse(instruccion.TipoMovimiento).map(
                (row: IDeudorInstrucciones, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      {/* ID */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      {/* TIPO fideicomitente */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.tipoEntePublicoObligado.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* fideicomitente */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.entePublicoObligado.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* FUENTE DE PAGO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.tipoFuente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* FONDO INGRESO GOBIERNO ESTATAL */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngresoGobiernoEstatal}
                        </Typography>
                      </StyledTableCell>

                      {/* FONDO INGRESO MUNICIPIOS */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngresoMunicipios}
                        </Typography>
                      </StyledTableCell>

                      {/* FONDO INGRESO MUNICIPIO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngresoAsignadoMunicipio}
                        </Typography>
                      </StyledTableCell>

                      {/* INGRESO ORGANISMO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.ingresoOrganismo}
                        </Typography>
                      </StyledTableCell>

                      {/* AFECTADO POR GOBIERNO ESTATAL */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngresoAfectadoXGobiernoEstatal}
                        </Typography>
                      </StyledTableCell>

                      {/* AFECTACION GOBIERNO ESTATAL / 100 */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.afectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                      {/* ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                      {/* AFECTADO POR MUNICIPIO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngresoAfectadoXMunicipio}
                        </Typography>
                      </StyledTableCell>

                      {/* ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {
                            row.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                          }
                        </Typography>
                      </StyledTableCell>

                      {/* AFECTADO POR ORGANISMO */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.ingresoAfectadoXOrganismo}
                        </Typography>
                      </StyledTableCell>

                      {/* ACUMULADO AFECTACION ORGANISMO / 100 */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.acumuladoAfectacionOrganismoEntre100}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
          <Divider color="lightGrey"></Divider>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 4,
          }}
        >
          <Typography sx={queries.bold_text}>Soporte Documental</Typography>
          <Divider color="lightGrey"></Divider>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headsSoporteDocumental.map((head, index) => (
                  <StyledTableCell key={index} align="center">
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "700" }}>
                      {head.label}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {JSON.parse(instruccion.SoporteDocumental).map(
                (row: ISoporteDocumentalInstrucciones, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.tipo}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {format(new Date(row.fechaArchivo), "PPP", {
                            locale: es,
                          })}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.nombreArchivo}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {loading ? (
                          <CircularProgress />
                        ) : arr.filter((td: any) =>
                            td.NOMBREFORMATEADO.includes(row.nombreArchivo)
                          ).length === 0 ? (
                          <Tooltip title={"Error al Cargar el Archivo"}>
                            <SyncProblemIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title={"Mostrar vista previa del documento"}>
                            <IconButton
                              onClick={() => {
                                setFileSelected(
                                  `data:application/pdf;base64,${
                                    arr.filter((td: any) =>
                                      td.NOMBREFORMATEADO.includes(
                                        row.nombreArchivo
                                      )
                                    )[0].FILE
                                  }`
                                );
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
          <Divider color="lightGrey"></Divider>
        </Grid>
      </DialogContent>

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
    </Dialog>
  );
}
