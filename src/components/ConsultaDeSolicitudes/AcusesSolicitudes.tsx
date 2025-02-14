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
  descargaDocumentoAcuse,
  getPathAcuses,
  getPathDocumentos,
} from "../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";
import { queries } from "../../queries";
import { IDocumentos } from "./DialogDescargaArchivos";


//Cambiar interface con los nombres que vas a utilizar con el sp 
export interface IDocumentosAcuses {
  IdDocumento: string;
  IdTipoDocumento: string;
  NombreTipoDocumento: string;
  NombreArchivo: string;
  IdSolicitud: string;
  RutaDocumento: string;
  FechaCreacionDocumento: string
  Descargas: number

  //Tipo: string;
}

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

export function AcusesSolicitudes() {
  const [archivos, setArchivos] = useState<Array<IDocumentosAcuses>>([]);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  useEffect(() => {
    getPathAcuses(inscripcion.Id, setArchivos);

    console.log("archivos", archivos)
  }, [inscripcion]);

  return (
    <Grid height={"32rem"}>
      {/* <Grid>
      <Typography>
        Descarga de archivos de la solicitud:{" "}
        <strong>{inscripcion.NumeroRegistro}</strong>
      </Typography>
    </Grid> */}
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
                        {new Date(e.FechaCreacionDocumento).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })} {/* Convierte y formatea la fecha a Día/Mes/Año */}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>
                        {e.FechaCreacionDocumento.split("T")[1].split(".")[0]} {/* Obtiene la hora sin ".000" */}
                        {/* {e.FechaCreacionDocumento}  */}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>
                        {" "}
                        <Tooltip title="Descargar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              //if (e.Tipo === "oficio") {
                              console.log("archivos", archivos)
                              descargaDocumentoAcuse(
                                "/" + e.RutaDocumento,
                                e.NombreArchivo,
                                e.Descargas === 0 ? e.IdDocumento : ""
                              );
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>{" "}
                      </Typography>
                    </StyledTableCell>



                  </StyledTableRow>
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
