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
import { useCancelacionStore } from "../../../store/Cancelacion/main";
import {
  ArchivoCancelacion,
  ICancelacion,
  CancelacionSolicitud,
} from "../../../store/Cancelacion/solicitud";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
//import { CancelacionSolicitud } from "../../../store/SolicitudFirma/solicitudFirma";
export function DialogSolicitarCancelacion({
  handler,
  openState, 
}: {
  handler: Function;
  openState: boolean;
}) {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const cancelacion: ICancelacion = useCancelacionStore(
    (state) => state.cancelacion
  );

  const setCancelacion: Function = useCancelacionStore(
    (state) => state.setCancelacion
  );

  const tipoFirmaDetalle: string = useCancelacionStore(
    (state) => state.tipoFirmaDetalle
  );
  const setTipoFirmaDetalle: Function = useCancelacionStore(
    (state) => state.setTipoFirmaDetalle
  );
  const cleanTipoFirmaDetalle: Function = useCancelacionStore(
    (state) => state.cleanTipoFirmaDetalle
  );

  //#region Cancelacion
  const documentacionCancelacion: ArchivoCancelacion[] = useCancelacionStore(
    (state) => state.documentacionCancelacion
  );

  const cleanDocumentacionCancelacion: Function = useCancelacionStore(
    (state) => state.cleanDocumentacionCancelacion
  );

  const addDocumentacionCancelacion: Function = useCancelacionStore(
    (state) => state.addDocumentacionCancelacion
  );

  const justificacion: string = useCancelacionStore(
    (state) => state.justificacion
  );

  const setJustificacion: Function = useCancelacionStore(
    (state) => state.setJustificacion
  );

  //#endregion

  function cargarArchivo(event: any, numero: number) {
    let file = event.target.files[0];

    if (file !== undefined && numero === 1) {
      setCancelacion({
        ...cancelacion,
        AcreditacionDeLaCancelacion: {
          archivo: file,
          nombreArchivo: file.name,
          fechaArchivo: new Date().toString(),
        },
      });
    } else if (file !== undefined && numero === 2) {
      setCancelacion({
        ...cancelacion,
        BajaDeCreditoFederal: {
          archivo: file,
          nombreArchivo: file.name,
          fechaArchivo: new Date().toString(),
        },
      });
    }
  }

  function cargarArchivoCancelacion(event: any, tipo: string) {
    const file = event.target.files[0];
    if (!file) return;

    const nuevoDocumento = {
      archivo: file,
      nombreArchivo: file.name,
      fechaArchivo: new Date().toISOString(),
      TipoArchivoJustificacion: tipo,
    };

    addDocumentacionCancelacion(nuevoDocumento);
  }

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  useEffect(() => {
    if (openState === false) {
      setError(false);
    }
  }, [openState]);

  useEffect(() => {
    cleanTipoFirmaDetalle();
  }, [openState === true])


  return (
    <Dialog fullWidth open={openState} maxWidth={"md"} keepMounted>
      <DialogTitle>
        <Typography sx={queries.medium_text}>Justificación</Typography>
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
                cancelacion.AcreditacionDeLaCancelacion.nombreArchivo === ""
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
            {documentacionCancelacion.find(
              doc => doc.TipoArchivoJustificacion === "Acreditacion De La Cancelacion")?.nombreArchivo
              || "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}

            {/* {cancelacion.AcreditacionDeLaCancelacion.nombreArchivo ||
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"} */}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivoCancelacion(v, "Acreditacion De La Cancelacion");
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
                cancelacion.BajaDeCreditoFederal.nombreArchivo === ""
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
            {documentacionCancelacion.find(
              doc => doc.TipoArchivoJustificacion === "Baja De Credito Federal")?.nombreArchivo
              || "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}

            {/* {cancelacion.BajaDeCreditoFederal.nombreArchivo ||
              "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"} */}
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(v) => {
              cargarArchivoCancelacion(v, "Baja De Credito Federal");
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
            helperText={
              200 - justificacion.length + " caracteres restantes"
            }
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
              documentacionCancelacion.length === 2 && justificacion !== "" 
              ? "Confirmar" : "Favor de llenar todos los campos"
              // cancelacion.BajaDeCreditoFederal.nombreArchivo === "" ||
              //   cancelacion.AcreditacionDeLaCancelacion.nombreArchivo === "" ||
              //   justificacion === ""
              //   ? "Favor de llenar todos los campos"
              //   : null
            }
          >
            <Button
              variant="text"
              sx={{ ...queries.buttonContinuar, cursor: "-moz-initial" }}
              onClick={() => {
                if (documentacionCancelacion.length === 2 && justificacion !== "") {
                  setTipoFirmaDetalle("cancelacion");
                  CancelacionSolicitud(setUrl);
                  handler(false);
                  navigate("../firmaUrl");
                } else {
                  setError(true);
                }
                // if (
                //   cancelacion.BajaDeCreditoFederal.nombreArchivo !== "" &&
                //   cancelacion.AcreditacionDeLaCancelacion.nombreArchivo !==
                //     "" &&
                //   cancelacion.Justificacion !== ""
                // ) {
                //   setTipoFirmaDetalle("cancelacion");
                //   CancelacionSolicitud(setUrl);
                //   handler(false);
                //   navigate("../firmaUrl");
                // } else {
                //   setError(true);
                // }
              }
              }
            >
              <Typography sx={queries.medium_text}>Confirmar</Typography>
            </Button>
          </Tooltip>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
