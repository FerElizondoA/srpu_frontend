/* eslint-disable react-hooks/exhaustive-deps */
import DownloadIcon from "@mui/icons-material/Download";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPdf } from "../../store/SolicitudFirma/solicitudFirma";
import {
  descargaDocumento,
  getPathDocumentos,
} from "../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";

export interface IDocumentos {
  Id: string;
  IdPathDoc: string;
  IdSolicitud: string;
  NombreArchivo: string;
  NombreIdentificador: string;
  Ruta: string;
  Tipo: string;
  Descargas: number;
  FechaDescarga: string;
}

const heads: Array<{ label: string }> = [
  {
    label: "Nombre del archivo",
  },
  {
    label: "Descargar",
  },
];

export function DialogDescargaArchivos({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  useEffect(() => {
    getPathDocumentos(inscripcion.Id, setArchivos);
  }, [inscripcion]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Descarga de archivos de la solicitud:{" "}
        <strong>{inscripcion.NumeroRegistro}</strong>
      </DialogTitle>
      <DialogContent>
        <Table>
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
                  <StyledTableCell>
                    <Typography> {e.NombreArchivo} </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
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
              <Typography> Sin archivos disponibles para descargar </Typography>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
