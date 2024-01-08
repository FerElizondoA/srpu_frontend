/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queries } from "../../../queries";
import { IDataPrueba } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";
import {
  ArchivosCancelacion,
  CancelacionSolicitud,
} from "../../../store/SolicitudFirma/solicitudFirma";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

export interface IUsuariosAsignables {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Rol: string;
}

export function DialogSolicitarCancelacion({
  handler,
  openState,
  rowSolicitud,
}: {
  handler: Function;
  openState: boolean;
  rowSolicitud: IDataPrueba;
}) {
  const navigate = useNavigate();
  const [justificacion, setJustificacion] = useState("");
  const [error, setError] = useState(false);

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const archivosCancelacion: ArchivosCancelacion = useSolicitudFirmaStore(
    (state) => state.archivosCancelacion
  );
  const setArchivosCancelacion: Function = useSolicitudFirmaStore(
    (state) => state.setArchivosCancelacion
  );
  const cleanArchivosCancelacion: Function = useSolicitudFirmaStore(
    (state) => state.cleanArchivosCancelacion
  );

  function cargarArchivo(event: any, numero: number) {
    let file = event.target.files[0];

    if (file !== undefined && numero === 1) {
      setArchivosCancelacion({
        ...archivosCancelacion,
        acreditacionCancelacion: {
          archivo: file,
          nombreArchivo: file.name,
          fechaArchivo: new Date().toString(),
        },
      });
    } else if (file !== undefined && numero === 2) {
      setArchivosCancelacion({
        ...archivosCancelacion,
        bajaCreditoFederal: {
          archivo: file,
          nombreArchivo: file.name,
          fechaArchivo: new Date().toString(),
        },
      });
    }
  }

  useEffect(() => {
    if (openState === false) {
      cleanArchivosCancelacion();
      setJustificacion("");
      setError(false);
    }
  }, [openState]);

  return (
    <Dialog
      fullWidth
      open={openState}
      maxWidth={"md"}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography sx={queries.medium_text}>Justificación </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid>
          <InputLabel>Acreditación de la cancelación</InputLabel>
          <Typography
            position={"absolute"}
            border={
              error === true &&
              archivosCancelacion.acreditacionCancelacion.nombreArchivo === ""
                ? "2px dotted red"
                : "2px dotted black"
            }
            sx={{
              fontFamily: "MontserratMedium",
              //border: "2px dotted black",
              width: "90%",
              fontSize: "80%",
            }}
          >
            {archivosCancelacion.acreditacionCancelacion.nombreArchivo ||
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivo(v, 1);
            }}
            style={{
              opacity: 0,
              width: "90%",
              cursor: "pointer",
            }}
          />
        </Grid>

        <Grid>
          <InputLabel>Baja de crédito federal</InputLabel>
          <Typography
            position={"absolute"}
            border={
              error === true &&
              archivosCancelacion.bajaCreditoFederal.nombreArchivo === ""
                ? "2px dotted red"
                : "2px dotted black"
            }
            sx={{
              fontFamily: "MontserratMedium",
              //border: "2px dotted black",
              width: "90%",
              fontSize: "80%",
            }}
          >
            {archivosCancelacion.bajaCreditoFederal.nombreArchivo ||
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivo(v, 2);
            }}
            style={{
              opacity: 0,
              width: "90%",
              cursor: "pointer",
            }}
          />
        </Grid>

        <Grid>
          <TextField
            sx={{ width: "95%" }}
            label="Justificación Escrita"
            margin="dense"
            variant="outlined"
            multiline
            onChange={(e) => {
              const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
              if (
                e.target.value.length <= 200 &&
                !format.test(e.target.value)
              ) {
                setJustificacion(e.target.value);
              }
            }}
            value={justificacion}
            helperText={200 - justificacion.length + " caracteres restantes"}
            error={error && !justificacion ? true : false}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => handler(false)}
        >
          <Typography sx={queries.medium_text}>Cancelar</Typography>
        </Button>

        <ThemeProvider theme={buttonTheme}>
          <Tooltip
            title={
              archivosCancelacion.bajaCreditoFederal.nombreArchivo === "" ||
              archivosCancelacion.acreditacionCancelacion.nombreArchivo ===
                "" ||
              justificacion === ""
                ? "Favor de llenar todos los campos"
                : null
            }
          >
            <Button
              variant="text"
              sx={{ ...queries.buttonContinuar, cursor: "-moz-initial" }}
              onClick={() => {
                if (
                  archivosCancelacion.bajaCreditoFederal.nombreArchivo !== "" &&
                  archivosCancelacion.acreditacionCancelacion.nombreArchivo !==
                    "" &&
                  justificacion !== ""
                ) {
                  CancelacionSolicitud(
                    rowSolicitud.Solicitud,
                    rowSolicitud.NumeroRegistro,
                    justificacion,
                    archivosCancelacion,
                    rowSolicitud.UltimaModificacion,
                    setUrl
                  );
                  handler(false);
                  navigate("../firmaUrl");
                } else {
                  setError(true);
                }
              }}
            >
              <Typography sx={queries.medium_text}>Confirmar</Typography>
            </Button>
          </Tooltip>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
