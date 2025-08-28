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
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";

const headsTipoMovimiento: { label: string }[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Fuente",
  },
  {
    label: "Fondo o Ingreso",
  },
  {
    label: "Ente Público Obligado",
  },
  {
    label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
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
  instruccion: IRegistro;
}) {
  const [fileSelected, setFileSelected] = React.useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = React.useState(false);

  const idInstruccion: string = instruccion.Id;

  const [arr, setArr] = React.useState<any>([]);

  useEffect(() => {
    if (idInstruccion !== "") {
      listFile(
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/INSTRUCCIONESIRREVOCABLES/${idInstruccion}/`,
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
        <Grid container
          mt={{ xs: 4, sm: 8, md: 2 }}
          height={{ xs: "20rem", sm: "20rem", md: "20rem" }}
          sx={{
            //height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 4,
          }}
        >
          <Typography sx={queries.bold_text}>Datos Generales</Typography>
          <Divider color="lightGrey"></Divider>

          <Typography sx={{ ...queries.medium_text }}>
            <strong> Número de Cuenta:</strong> {instruccion.NumeroRegistro}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Fecha de la Instruccion:</strong>{" "}
            {format(new Date(instruccion.FechaRegistro), "PPP", {
              locale: es,
            })}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Cuenta CLABE:</strong> {instruccion.CLABE}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Banco:</strong> {instruccion.NombreBanco}
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
              height: ".5vh",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
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
                  <StyledTableCell key={index} align="center">
                    <Typography sx={{ fontWeight: "700" }}>
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
                        <Typography >
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      {/* FUENTE DE PAGO */}
                      <StyledTableCell align="center">
                        <Typography >
                          {row?.tipoFuente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography >
                          {row?.fondoIngreso.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* TIPO MANDANTE
                        <StyledTableCell align="center">
                          <Typography >
                            {row?.tipoEntePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell> */}


                      {/* entePublicoObligado */}
                      <StyledTableCell align="center">
                        <Typography >
                          {row?.entePublicoObligado.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* Porcentaje Afectado Sobre el Total de Ingreso */}
                      <StyledTableCell align="center">
                        {row.AfectadoTotalIngreso || ''}
                      </StyledTableCell>

                      {/* Equivalencia Sin incluir el monto de municipios */}
                      <StyledTableCell align="center">
                        {row.tipoEntePublicoObligado.Descripcion.toLowerCase() === "gobierno estatal" ? row.EquivalenciaCorrespondienteMunicipios || '' : "No aplica"}
                        {/* {row.EquivalenciaCorrespondienteMunicipios || ''} */}
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
                        <Typography  >
                          {row?.tipo}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography  >
                          {format(new Date(row.fechaArchivo), "PPP", {
                            locale: es,
                          })}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography  >
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
                                  `data:application/pdf;base64,${arr.filter((td: any) =>
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
