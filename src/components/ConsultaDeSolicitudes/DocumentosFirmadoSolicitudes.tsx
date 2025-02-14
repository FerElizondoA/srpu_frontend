import DownloadIcon from "@mui/icons-material/Download";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { getPdf } from "../../store/SolicitudFirma/solicitudFirma";
import {
  descargaDocumento,
  getPathDocumentos,
} from "../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";
import { queries } from "../../queries";
import { IDocumentos } from "./DialogDescargaArchivos";

const heads: Array<{ label: string }> = [
  {
    label: "Nombre del archivo",
  },
  {
    label: "Fecha",
  },
  {
    label: "Hora",
  },
  {
    label: "Descargar",
  },
];

export function DocumentosFirmados() {
  const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  useEffect(() => {
    getPathDocumentos(inscripcion.Id, setArchivos);
  }, [inscripcion]);

  return (
    <Grid height={"32rem"}>
      <Grid container display={"flex"} justifyContent={"center"} mt={3}>
        <Paper
          sx={{
            width: "90%",
            height: "30rem",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".5vw",
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
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}>
                    <TableSortLabel>
                      {" "}
                      <strong>{head.label}</strong>{" "}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {archivos.length > 0 ? (
                archivos.map((e, i) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      <Typography> {e.NombreArchivo} </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>
                        {/* {e.FechaCreacionDocumento}  */}
                        {new Date(e.FechaCreacion).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })} {/* Convierte y formatea la fecha a Día/Mes/Año */}

                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography> 
                        {e.FechaCreacion.split("T")[1].split(".")[0]} {/* Obtiene la hora sin ".000" */}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>
                        {" "}
                        <Tooltip title="Descargar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              if (e.Tipo === "oficio") {
                                descargaDocumento(
                                  e.Ruta.replaceAll(
                                    `${e.NombreIdentificador}`,
                                    "/"
                                  ),
                                  e.NombreIdentificador,
                                  e.Descargas === 0 ? e.Id : ""
                                );
                              } else {
                                getPdf(
                                  e.IdPathDoc,
                                  inscripcion.NumeroRegistro,
                                  new Date().toString(),
                                  e.Descargas === 0 ? e.Id : ""
                                );
                              }
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>{" "}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                  // <Grid key={i}>
                  //   <Grid
                  //     sx={{
                  //       display: "grid",
                  //       gridTemplateColumns: "4fr 1fr",
                  //       alignItems: "center",
                  //     }}
                  //   >

                  //   </Grid>
                  //   <Divider />
                  // </Grid>
                ))
              ) : (
                <Typography>
                  {" "}
                  Sin archivos disponibles para descargar{" "}
                </Typography>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
