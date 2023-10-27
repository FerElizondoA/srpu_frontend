import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPdf } from "../../store/SolicitudFirma/solicitudFirma";
import {
  descargaDocumento,
  getPathDocumentos,
} from "../APIS/pathDocSol/APISDocumentos";
import DownloadIcon from "@mui/icons-material/Download";

export interface IDocumentos {
  Id: string;
  IdPathDoc: string;
  IdSolicitud: string;
  NombreArchivo: string;
  NombreIdentificador: string;
  Ruta: string;
  Tipo: string;
}

export function DialogDescargaArchivos({
  open,
  setOpen,
  noSolicitud,
  idSolicitud,
}: {
  open: boolean;
  setOpen: Function;
  noSolicitud: string;
  idSolicitud: string;
}) {
  const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

  useEffect(() => {
    getPathDocumentos(idSolicitud, setArchivos);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Descarga de archivos de la solicitud: {noSolicitud}
      </DialogTitle>
      <DialogContent>
        {archivos.length > 0 ? (
          archivos.map((e, i) => (
            <Grid key={i}>
              <Grid
                sx={{
                  display: "grid",
                  gridTemplateColumns: "4fr 1fr",
                  alignItems: "center",
                }}
              >
                <Typography> {e.NombreArchivo} </Typography>

                <Tooltip title="Descargar">
                  <IconButton
                    type="button"
                    onClick={() => {
                      if (e.Tipo === "oficio") {
                        descargaDocumento(
                          e.Ruta.replaceAll(`${e.NombreIdentificador}`, "/"),
                          e.NombreIdentificador
                        );
                      } else {
                        getPdf(e.IdPathDoc, noSolicitud, new Date().toString());
                      }
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Divider />
            </Grid>
          ))
        ) : (
          <Typography> Sin archivos disponibles para descargar </Typography>
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
