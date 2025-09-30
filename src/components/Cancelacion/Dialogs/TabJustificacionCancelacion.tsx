import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { HeadLabels } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import { format, lightFormat } from "date-fns";
import { queries } from "../../../queries";
import { ICancelacionJustificaciones } from "./DialogTabsCancelacionArchivos";
import { useState } from "react";
import { GridCloseIcon } from "@mui/x-data-grid";
import { convertFileToBase64 } from "../../../generics/Validation";
import FileOpenIcon from "@mui/icons-material/FileOpen";


export interface IFileCancelaciones {
  FILE: string;
  NOMBRE: string;
  NOMBREFORMATEADO: string;
  SIZE: number;
}

export function TabJustificacionCancelacion({
  DetailPathCancelaciones,
  arr,
  cargados
}: {
  DetailPathCancelaciones?: ICancelacionJustificaciones[];
  arr: IFileCancelaciones[];
  cargados: boolean;
}) {
  const [showModalPrevia, setShowModalPrevia] = useState(false);
  const [fileSelected, setFileSelected] = useState<any>("");



  const JustificacionCancelacion: HeadLabels[] = [
    {
      label: "Fecha de Solicitud de Cancelación",
      // value: FechadeContratación,
      value: DetailPathCancelaciones?.[0]?.FechaCreacion || "N/A",
    },
    {
      label: "Usuario Solicitante",
      value: DetailPathCancelaciones?.[0]?.Ruta || "No iniciado el proceso",
    },
    {
      label: "Acreditación de la cancelación",
      value: DetailPathCancelaciones?.find(
        doc => doc.TipoArchivoJustificacion === "Acreditacion De La Cancelacion")?.NombreArchivo
        || "SIN ARCHIVOS"

    },
    {
      label: "Baja de crédito federal",
      value: DetailPathCancelaciones?.find(
        doc => doc.TipoArchivoJustificacion === "Baja De Credito Federal")?.NombreArchivo
        || "SIN ARCHIVOS"
    },
  ];

  return (
    <>
      <Grid container width={"100%"} display={"flex"} justifyContent={"center"}
        sx={{
          height: "25rem",
          borderBottom: 1,
          borderColor: "#cfcfcf"
        }}>
        <Grid container
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
        >
          {JustificacionCancelacion.map((head, index) => (
            <Grid xs={10} sm={5} md={5} lg={5} display={"flex"} justifyContent={"start"} sx={{ alignItems: "center" }} key={index}>
              <Typography key={index} sx={{ ...queries.medium_text, mb: 4 }}>
                <strong> {head.label}: </strong>
                {head.label.includes("Fecha") && head.value
                  ? !isNaN(new Date(head.value).getTime())
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : "No iniciado el proceso"
                  // "Sin Fecha Registrada"
                  : head.value}
              </Typography>

              {head.label.includes("Acreditación") ?
                <Grid display={"flex"} sx={{ mb: 3 }}>
                  <Button
                    disabled={head.value === "SIN ARCHIVOS"}

                    onClick={async () => {


                      let base64String = '';
                      try {
                        if (arr instanceof File) {
                          base64String = await convertFileToBase64(arr);
                        } else {
                          base64String = arr[0]?.FILE || '';
                        }

                        const dataUri = `data:application/pdf;base64,${base64String}`;
                        setFileSelected(dataUri);
                      } catch (error) {
                        console.error("Error al convertir el archivo a Base64", error);
                      }

                      setShowModalPrevia(true);
                    }}
                  >
                    <Tooltip title="Descargar archivo">

                      <Typography>
                        <FileOpenIcon />
                        {/* {head.value} */}
                      </Typography>
                    </Tooltip>
                  </Button>

                </Grid>

                : head.label.includes("federal") ?
                  <Grid display={"flex"} sx={{ mb: 3 }}>
                    <Button
                      disabled={head.value === "SIN ARCHIVOS"}
                      onClick={async () => {


                        let base64String = '';
                        try {
                          if (arr instanceof File) {
                            base64String = await convertFileToBase64(arr);
                          } else {
                            base64String = arr[1]?.FILE || '';
                          }

                          const dataUri = `data:application/pdf;base64,${base64String}`;
                          setFileSelected(dataUri);
                        } catch (error) {
                          console.error("Error al convertir el archivo a Base64", error);
                        }

                        setShowModalPrevia(true);
                      }}
                    >
                      <Tooltip title="Descargar archivo">

                        <Typography>
                          <FileOpenIcon />
                          {/* {head.value} */}
                        </Typography>
                      </Tooltip>
                    </Button>

                  </Grid>
                  : null

              }


            </Grid>
          ))}
        </Grid>
      </Grid>

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
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: "100vh" }}>
          {/*     <iframe
            style={{
              width: "100%",
              height: "85vh",
            }}
            src={fileSelected}
            title="description"
          ></iframe>*/}
          <iframe
            style={{
              width: "100%",
              height: "85vh",
            }}
            src={fileSelected}
            title="PDF Viewer"
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
}
