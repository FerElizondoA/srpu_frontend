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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as React from "react";
import { useEffect } from "react";
import { queries } from "../../../queries";
import {
  IDatosMandatos,
  Transition,
} from "../../../screens/fuenteDePago/Mandatos";
import {
  IDeudorMandatoNew,
} from "../../../store/Mandatos/mandato";
import { listFile, listFileFuentesPago } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { ISoporteDocumentalFuentePago } from "../../../store/Fideicomiso/fideicomiso";
import { convertFileToBase64 } from "../../../generics/Validation";

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
    label: "Mandatario",
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

export function DetalleMandato({
  open,
  setOpen,
  mandato,
}: {
  open: boolean;
  setOpen: Function;
  mandato: IRegistro;
}) {
  const [fileSelected, setFileSelected] = React.useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = React.useState(false);

  const idMandato: string = mandato.Id;

  const [arr, setArr] = React.useState<any>([]);

  // useEffect(() => {
  //   if (idMandato !== "") {
  //     listFile(`/SRPU/MANDATOS/${idMandato}/`, setArr).then(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (idMandato !== "") {
      console.log("Entré al useEffect de IDMANDATO:");
      listFileFuentesPago(process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/MANDATOS/${idMandato}/`,
        setArr,
        JSON.parse(mandato.SoporteDocumental)
      ).then(() => {
        setLoading(false);
      });
    }
    console.log("idMandato:", idMandato);
  }, [idMandato !== ""]);

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
          Detalle de Mandato
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
          mt={{ xs: 4, sm: 8, md: 2 }}
          height={{ xs: "20rem", sm: "20rem", md: "20rem" }}
          sx={{
            // height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 4,
          }}
        >
          <Typography sx={queries.bold_text}>Datos Generales</Typography>
          <Divider color="lightGrey"></Divider>

          <Typography sx={{ ...queries.medium_text }}>
            <strong> Número de Mandato:</strong> {mandato.NumeroRegistro}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Fecha de Mandato:</strong>{" "}
            {format(new Date(mandato.FechaRegistro), "PPP", {
              locale: es,
            })}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Mandatario:</strong> {mandato.Mandatario}
          </Typography>

          <Typography sx={{ ...queries.medium_text }}>
            <strong>Municipio / Organismo Mandante:</strong>{" "}
            {mandato.EntePublicoObligado}

            {/* {mandato.MunicipioOrganismoMandante} */}
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
              {JSON.parse(mandato.TipoMovimiento).map(
                (row: IDeudorMandatoNew, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      {/* ID */}
                      {/* ID */}
                      <StyledTableCell align="center">
                        <Typography>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      {/* TIPO MANDANTE  */}
                      <StyledTableCell align="center">
                        <Typography>
                          {row?.tipoFuente.Descripcion}
                          {/* {row?.tipoFideicomitente.Descripcion} */}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography>
                          {row?.fondoIngreso.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* fideicomitente  */}
                      <StyledTableCell align="center">
                        <Typography>
                          {row?.mandatario.Descripcion}
                        </Typography>
                      </StyledTableCell>


                      {/* Porcentaje Afectado Sobre el Total de Ingreso */}
                      <StyledTableCell align="center">
                        {row.AfectadoTotalIngreso || ''}
                        {/* <TextField
                          type="number"
                          value={row.AfectadoTotalIngreso || ''}
                          // onChange={(e) => {
                          //   const newValue = Number(e.target.value);
                          //   updateTipoMovimientoField(index, 'AfectadoTotalIngreso', isNaN(newValue) ? 0 : newValue);
                          // }}
                          inputProps={{ min: 0 }}
                        /> */}
                      </StyledTableCell>

                      {/* Equivalencia Sin incluir el monto de municipios */}
                      <StyledTableCell align="center">
                        {row.EquivalenciaCorrespondienteMunicipios || ''}
                        {/* <TextField
                          type="number"
                          disabled={row.tipoEntePublicoObligado.Descripcion.toLowerCase() !== "gobierno estatal"}
                          value={row.tipoEntePublicoObligado.Descripcion.toLowerCase() === "gobierno estatal" ?
                            row.EquivalenciaCorrespondienteMunicipios || '' : 0}
                          // onChange={(e) => {
                          //   const newValue = Number(e.target.value);
                          //   updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', isNaN(newValue)
                          //     ? 0 : newValue);
                          // }}
                          inputProps={{ min: 0 }}
                        /> */}
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
              {arr.map(
                (row: ISoporteDocumentalFuentePago, index: number) => {
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

                        <Tooltip title={"Mostrar vista previa del documento"}>
                          <IconButton
                            onClick={
                              async () => {
                                console.log("row.archivo", row.archivo)

                                let base64String = '';
                                try {
                                  if (row.archivo instanceof File) {
                                    base64String = await convertFileToBase64(row.archivo);
                                    console.log("base64String 1", base64String)

                                  } else {
                                    base64String = row.archivo;
                                    console.log("base64String 2", base64String)

                                  }

                                  const dataUri = `data:application/pdf;base64,${base64String}`;
                                  console.log("dataUri", dataUri)
                                  setFileSelected(dataUri);
                                } catch (error) {
                                  console.error("Error al convertir el archivo a Base64", error);
                                }

                                setShowModalPrevia(true);
                                // setFileSelected(
                                //   `data:application/pdf;base64,${arr.filter((td: any) =>
                                //     td.NOMBREFORMATEADO.includes(
                                //       row.nombreArchivo
                                //     )
                                //   )[0].FILE
                                //   }`
                                // );
                                // setShowModalPrevia(true);
                              }
                            }
                          >
                            <FileOpenIcon />
                          </IconButton>
                        </Tooltip>

                      </StyledTableCell>

                      {/* <StyledTableCell align="center">
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
                      </StyledTableCell> */}
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
