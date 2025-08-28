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
  Paper,
  Table,
  TableBody,
  TableContainer,
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
import { IDatosFideicomiso, IDatosFideicomisoNew } from "../../../screens/fuenteDePago/Fideicomisos";
import {
  IDeudorFideicomiso,
  IFideicomisario,
  ISoporteDocumentalFuentePago,
} from "../../../store/Fideicomiso/fideicomiso";
import { listFile } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
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
    label: "Fideicomitente",
  },
  {
    label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
  },
  // {
  //   label: "Eliminar",
  // },
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
    label: " ",
  },
];

export function DetalleFideicomiso({
  open,
  setOpen,
  fideicomiso,
}: {
  open: boolean;
  setOpen: Function;
  fideicomiso: IRegistro; // Adjusted type to match the expected structure
}) {
  const [fileSelected, setFileSelected] = React.useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = React.useState(false);

  const idFideicomiso: string = fideicomiso.Id;

  const [arr, setArr] = React.useState<any>([]);

  useEffect(() => {
    if (idFideicomiso !== "") {
      listFile(process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FIDEICOMISOS/FUENTEDEPAGO/FIDEICOMISOS/${idFideicomiso}/`, setArr).then(() => {
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
          Detalle de Fideicomiso
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
          //height={{xs:"20rem", sm:"20rem", md:"15rem"}}
          sx={{ display: "flex", justifyContent: "space-evenly" }}
          //height={"15rem"}
          mb={2}
        >
          <Grid xs={11} sm={6} md={6} lg={6} xl={6}
            //width={"50%"}
            height={"17rem"}
          >
            <Typography sx={{
              fontSize: "1.2rem",
              fontFamily: "MontserratBold",
            }}>Datos Generales</Typography>
            <Divider color="lightGrey" sx={{ width: "80%" }}></Divider>

            <Grid container sx={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}>
              <Typography sx={{ ...queries.medium_text }}>
                <strong> Número de Fideicomiso:</strong>{" "}
                {fideicomiso.NumeroRegistro}
              </Typography>

              <Typography sx={{ ...queries.medium_text }}>
                <strong>Tipo de Fideicomiso:</strong> {fideicomiso.TipoFideicomiso}
              </Typography>

              <Typography sx={{ ...queries.medium_text }}>
                <strong>Fecha de Fideicomiso:</strong>{" "}
                {format(new Date(fideicomiso?.FechaRegistro), "PPP", {
                  locale: es,
                })}
              </Typography>

              <Typography sx={{ ...queries.medium_text }}>
                <strong>Fiduciario:</strong> {fideicomiso.Fiduciario}
              </Typography>
            </Grid>
          </Grid>

          <Grid xs={10.5} sm={6} md={6} lg={6} xl={6}
            mt={{ xs: 4, sm: 0, md: 0, lg: 0, xl: 0 }}
            sx={{
              //width: "50%",
              height: "16rem"
            }}
          >
            <Typography sx={{
              fontSize: "1.2rem",
              fontFamily: "MontserratBold",
            }}>Fideicomisario</Typography>
            <Divider color="lightGrey" sx={{ width: "80%" }}></Divider>

            <Grid
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <Paper sx={{
                width: "100%",
                height: "90%"
              }}>
                <Table aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "700" }}>
                          Fideicomisario
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "700" }}>
                          Orden Fideicomisario
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {JSON.parse(fideicomiso.Fideicomisario).map(
                      (e: IFideicomisario, index: number) => (
                        <StyledTableRow key={index} id={`${index + 1}`}>
                          <StyledTableCell scope="row">
                            <Typography sx={{ fontSize: "1rem" }}>
                              {e.fideicomisario.Descripcion}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell scope="row">
                            <Typography sx={{ fontSize: "1rem" }}>
                              {e.ordenFideicomisario.Descripcion}
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid mt={2}>
          <Divider color="lightGrey" ></Divider>
        </Grid>


        <Grid container
          sx={{
            flexDirection: "column",
            justifyContent: "space-around",
            mt: 4,
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
          <Divider color="lightGrey" sx={{ width: "40%" }}></Divider>
          <Paper
            sx={{
              height: "22rem"
            }}
          >
            <TableContainer
              sx={{
                width: "100%",
                height: "100%"
              }}
            >
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headsTipoMovimiento.map((head, index) => (
                      <StyledTableCell key={index} align="center">
                        <Typography
                          sx={{
                            //fontSize: "0.7rem", 
                            fontWeight: "bold"
                          }}
                        >
                          {head.label}
                        </Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {JSON.parse(fideicomiso.TipoMovimiento).map(
                    (row: any, index: number) => {
                      return (
                        <StyledTableRow key={index}>
                          {/* ID */}
                          <StyledTableCell align="center">
                            <Typography
                            //sx={{ fontSize: "0.8rem" }}
                            >
                              {row?.id}
                            </Typography>
                          </StyledTableCell>

                          {/* TIPO MANDANTE  */}
                          <StyledTableCell align="center">
                            <Typography
                            //sx={{ fontSize: "0.8rem" }}
                            >
                              {row?.tipoFuente.Descripcion}
                              {/* {row?.tipoFuente.Descripcion} */}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <Typography
                            // sx={{ fontSize: "0.8rem" }}
                            >
                              {row?.fondoIngreso.Descripcion}
                            </Typography>
                          </StyledTableCell>

                          {/* fideicomitente  */}
                          <StyledTableCell align="center">
                            <Typography
                            //sx={{ fontSize: "0.8rem" }}
                            >
                              {row?.fideicomitente.Descripcion}
                            </Typography>
                          </StyledTableCell>



                          {/* Porcentaje Afectado Sobre el Total de Ingreso */}
                          <StyledTableCell align="center">
                            {row.AfectadoTotalIngreso || ''}
                            {/* <TextField
                              type="number"
                              disabled
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
                            {row.tipoFideicomitente.Descripcion.toLowerCase() === "gobierno estatal" ? row.EquivalenciaCorrespondienteMunicipios || '' : 0}
                            {/* <TextField
                              type="number"
                              disabled
                              value=
                              // onChange={(e) => {
                              //   const newValue = Number(e.target.value);
                              //   updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', isNaN(newValue) ? 0 : newValue);
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
            </TableContainer>

          </Paper>

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
              {JSON.parse(fideicomiso.SoporteDocumental).map(
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
