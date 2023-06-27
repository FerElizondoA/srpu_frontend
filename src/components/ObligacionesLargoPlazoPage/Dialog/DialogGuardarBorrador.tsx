import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Dialog, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

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

export function ConfirmacionBorradorSolicitud(props: Props) {
  
  // const crearSolicitud: Function = useCortoPlazoStore(
  //   (state) => state.crearSolicitud
  // );

  // const modificaSolicitud: Function = useCortoPlazoStore(
  //   (state) => state.modificaSolicitud
  // );

  const institucion: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const montoOriginal: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const destino: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.destino.Id
  );


  // const tipoEntePublico: string = useLargoPlazoStore(
  //   (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  // );

  //const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const [info, setInfo] = useState(
    "En este apartado se guardara un borrador de la informacion quepodras visualizar en un futuro"
  );

    const  notnull = () => {
    const isMissingInstitution = institucion === "" || institucion === null;
    const isMissingOriginalAmount =
      montoOriginal === null ||
      montoOriginal === 0 ||
      montoOriginal === undefined;

    if (isMissingInstitution && isMissingOriginalAmount ) {
      setInfo(
        "No se ha seleccionado la institución bancaria y no se ha proporcionado un monto válido en INFORMACIÓN GENERAL."
      );
    } else if (isMissingInstitution) {
      setInfo(
        "No se ha seleccionado la institución bancaria en INFORMACIÓN GENERAL."
      );
    } else if (isMissingOriginalAmount) {
      setInfo("No se ha proporcionado un monto en INFORMACIÓN GENERAL.");
    } else {
      setInfo("La solicitud se guardará como borrador.");
    }
  };

  useEffect(() => {
    notnull();
  }, [institucion, montoOriginal, destino]);



  const navigate = useNavigate();

  return (
    <Dialog
      open={props.openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
      }}
    >
      <DialogTitle>
        <Typography align="center" sx={queries.medium_text} mb={2}>
          Guardar como Borrador
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{info}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => props.handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            props.handler(false);
          }}
          sx={{
            ...queries.buttonContinuar,
            pointerEvents:
            institucion === "" ||
            institucion === null ||
            montoOriginal === null ||
            montoOriginal === 0
              ? "none"
              : "auto",

          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}