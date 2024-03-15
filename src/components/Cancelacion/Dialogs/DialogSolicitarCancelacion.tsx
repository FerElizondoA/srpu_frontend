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
  CancelacionSolicitud,
  ICancelacion,
} from "../../../store/Cancelacion/solicitud";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";

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

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  useEffect(() => {
    if (openState === false) {
      setError(false);
    }
  }, [openState]);

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
            {cancelacion.AcreditacionDeLaCancelacion.nombreArchivo ||
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
            {cancelacion.BajaDeCreditoFederal.nombreArchivo ||
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
                setCancelacion({
                  ...cancelacion,
                  Justificacion: e.target.value,
                });
              }
            }}
            value={cancelacion.Justificacion}
            helperText={
              200 - cancelacion.Justificacion.length + " caracteres restantes"
            }
            error={error && !cancelacion.Justificacion ? true : false}
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
              cancelacion.BajaDeCreditoFederal.nombreArchivo === "" ||
              cancelacion.AcreditacionDeLaCancelacion.nombreArchivo === "" ||
              cancelacion.Justificacion === ""
                ? "Favor de llenar todos los campos"
                : null
            }
          >
            <Button
              variant="text"
              sx={{ ...queries.buttonContinuar, cursor: "-moz-initial" }}
              onClick={() => {
                if (
                  cancelacion.BajaDeCreditoFederal.nombreArchivo !== "" &&
                  cancelacion.AcreditacionDeLaCancelacion.nombreArchivo !==
                    "" &&
                  cancelacion.Justificacion !== ""
                ) {
                  CancelacionSolicitud(setUrl);
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
