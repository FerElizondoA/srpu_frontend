import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { queries } from "../../../queries";
import { Resumen } from "../Panels/Resumen";
import { DialogSolicitarModificacion } from "./DialogSolicitarModificacion";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import Swal from "sweetalert2";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelación";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
};

export function VerBorradorDocumento(props: Props) {
  const [openDialogModificacion, setOpenDialogModificacion] =
    React.useState(false);
  const [openDialogCancelacion, setOpenDialogCancelacion] =
    React.useState(false);

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);
  const estatus: string = useCortoPlazoStore((state) => state.estatus);
  return (
    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "8%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            ...queries.buttonCancelar,
            fontSize: "70%",
          }}
          onClick={() => {
            props.handler(false);
          }}
        >
          Cancelar
        </Button>
        {((estatus === "Revision" &&
          localStorage.getItem("Rol") === "Revisor") ||
          (estatus === "Validacion" &&
            localStorage.getItem("Rol") === "Validador") ||
          (estatus === "Autorizacion" &&
            localStorage.getItem("Rol") === "Autorizador")) && (
          <Grid
            justifyContent={"space-evenly"}
            sx={{ width: "20%", display: "flex" }}
          >
            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenDialogModificacion(true);
              }}
            >
              Solicitar Modificación
            </Button>
            <Button
              sx={{
                ...queries.buttonContinuar,
                fontSize: "70%",
              }}
              onClick={() => {
                localStorage.getItem("Rol") === "Revisor"
                  ? CambiaEstatus("Validacion", idSolicitud)
                  : localStorage.getItem("Rol") === "Validador"
                  ? CambiaEstatus("Autorizacion", idSolicitud)
                  : CambiaEstatus("Autorizado, Por Firmar", idSolicitud);
                props.handler(false);
                Swal.fire({
                  confirmButtonColor: "#15212f",
                  icon: "success",
                  title: "Mensaje",
                  text: "La solicitud se envió con éxito",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }}
            >
              Confirmar{" "}
              {localStorage.getItem("Rol") === "Revisor"
                ? "revisión"
                : localStorage.getItem("Rol") === "Validador"
                ? "validación"
                : "autorización"}
            </Button>
          </Grid>
        )}

        {estatus === "Autorizado" &&
          localStorage.getItem("Rol") === "Verificador" && (
            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenDialogCancelacion(true);
              }}
            >
              Solicitar Cancelación
            </Button>
          )}
      </DialogTitle>
      <DialogContent
        sx={{
          mt: 2,
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
        <Resumen coments={false} />
      </DialogContent>
      <DialogSolicitarModificacion
        handler={setOpenDialogModificacion}
        openState={openDialogModificacion}
      />

      <DialogSolicitarCancelacion
        handler={setOpenDialogCancelacion}
        openState={openDialogCancelacion}
      />
    </Dialog>
  );
}
