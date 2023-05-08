import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Typography, Dialog, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCortoPlazoStore } from "../../../store/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

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
  // selected: number[];
};

export function ConfirmacionBorradorSolicitud(props: Props) {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );
  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );
  const institucion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );
  const tipoEntePublico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const montoOriginal: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const navigate = useNavigate();

  const [info, setInfo] = useState(
    "En este apartado se guardara un borrador de la informacion quepodras visualizar en un futuro"
  );

  const notnull = () => {
    const isMissingInstitution = institucion === "" || institucion === null;
    const isMissingOriginalAmount =
      montoOriginal === null ||
      montoOriginal === 0 ||
      montoOriginal === undefined;

    if (isMissingInstitution && isMissingOriginalAmount) {
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
      setInfo(
        "En este apartado se guardará un borrador de la información que podrás visualizar en el futuro."
      );
    }
  };

  useEffect(() => {
    // console.log("hola", tipoEntePublico);
    notnull();
  }, []);

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
        <Grid container>
          <Grid
            sx={{
              flexDirection: "row",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            <Grid mb={1}>
              <DialogContentText>{info}</DialogContentText>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item md={6} lg={6}>
              <Button
                onClick={() => {
                  props.handler(false);
                  
                  if (idSolicitud !== "") {
                    modificaSolicitud(
                      localStorage.getItem("IdUsuario"),
                      localStorage.getItem("IdUsuario"),
                      "Captura"
                    );
                  } else {
                    crearSolicitud(
                      localStorage.getItem("IdUsuario"),
                      localStorage.getItem("IdUsuario"),
                      "Captura"
                    );
                  }
                  if(localStorage.getItem("Rol") === "Capturador"){
                    estatus = "Captura" 
                  }

                

                  crearSolicitud(props.selected, estatus);
                  navigate("../ConsultaDeSolicitudes");
                }}
                variant="text"
                disabled={
                  institucion === "" ||
                  institucion === null ||
                  tipoEntePublico === "" ||
                  tipoEntePublico === null ||
                  montoOriginal === null ||
                  montoOriginal === 0
                }
              >
                Confirmar
              </Button>
            </Grid>

            <Grid item md={6} lg={6}>
              <Button
                //sx={queries.medium_text}
                variant="text"
                onClick={() => props.handler(false)}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
