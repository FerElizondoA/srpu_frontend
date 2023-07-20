import { useState, forwardRef } from "react";
import { Grid, Slide, createTheme, TextField, InputLabel } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";

import { queries } from "../../../queries";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import validator from "validator";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

export function RegistrarNuevaAutorizacion() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const entidadFederativa: string = useLargoPlazoStore(
    (state) => state.Autorizacion.entidadFederativa
  );

  const numeroAutorizacion: number = useLargoPlazoStore(
    (state) => state.Autorizacion.numeroAutorizacion
  );

  const medioPublicacion: string = useLargoPlazoStore(
    (state) => state.Autorizacion.medioPublicacion
  );

  const fechaPublicacion: string = useLargoPlazoStore(
    (state) => state.Autorizacion.fechaPublicacion
  );

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.Autorizacion.montoAutorizado
  );

  const documentoSoporte: File = useLargoPlazoStore(
    (state) => state.documentoSoporte.archivo
  );

  const acreditacionQuorum: File = useLargoPlazoStore(
    (state) => state.acreditacionQuorum.archivo
  );

  const changeAutorizacion: Function = useLargoPlazoStore(
    (state) => state.changeAutorizacion
  );

  const [busqueda, setBusqueda] = useState("");

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };

  const [pruebaFechaMin, setPruebaFechaMin] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [pruebaFecha, setPruebaFecha] = useState("");

  const [pruebaSelect, setPruebaSelect] = useState("");

  const heads: HeadLabels[] = [
    {
      label: "Prueba 1 ",
      value: pruebaSelect,
    },
    {
      label: "Prueba 2",
      value: pruebaSelect,
    },
    {
      label: "Prueba 3",
      value: pruebaSelect,
    },
    {
      label: "Prueba 4 ",
      value: pruebaSelect,
    },
    {
      label: "Prueba 5",
      value: pruebaSelect,
    },
    {
      label: "Prueba 6",
      value: pruebaSelect,
    },
  ];

  return (
    <>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-around"
        sx={queries.contenedorAgregarAutorizacion.RegistrarAutorizacion}
      >
        <Grid width={"100%"} display={"flex"} justifyContent={"center"}>
          <Grid width={"88%"} display={"flex"} justifyContent={"space-between"}>
            <Grid lg={2.4}>
              <InputLabel>Entidad federativa</InputLabel>
              <TextField
                fullWidth
                placeholder="Nuevo León"
                variant="standard"
                onChange={(v) => changeAutorizacion({})}
              />
            </Grid>

            <Grid lg={2.4}>
              <InputLabel>
                Numero de autorización de la legislatura local
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Nuevo León"
                variant="standard"
                value={numeroAutorizacion <= 0 ? "" : numeroAutorizacion.toString()}
                onChange={(v) => {
                  if (validator.isNumeric(v.target.value)) {
                    changeAutorizacion({
                      entidadFederativa: entidadFederativa,
                      numeroAutorizacion: v.target.value,
                      fechaPublicacion: fechaPublicacion,
                      medioPublicacion: medioPublicacion,
                      montoAutorizado: montoAutorizado,
                    });
                  } else {
                    changeAutorizacion({
                      entidadFederativa: entidadFederativa,
                      numeroAutorizacion: 0,
                      fechaPublicacion: fechaPublicacion,
                      medioPublicacion: medioPublicacion,
                      montoAutorizado: montoAutorizado,
                    });
                  }
                }}
              />
            </Grid>

            <Grid lg={2.1}>
              <InputLabel>Medio de publicación</InputLabel>
              <TextField
                fullWidth
                placeholder="Nuevo León"
                variant="standard"
              />
            </Grid>

            <Grid lg={2.4}>
              <InputLabel>Fecha de publicacion</InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DatePicker
                  value={new Date(pruebaFecha)}
                  // onChange={(date) =>
                  //   changeCapital(
                  //     date?.toString(),
                  //     capitalPeriocidadPago,
                  //     capitalNumeroPago
                  //   )
                  // }
                  minDate={new Date(pruebaFechaMin)}
                  maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                  slots={{
                    textField: DateInput,
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid display={"flex"} justifyContent={"space-evenly"}>
          <Grid lg={2.1}>
            <InputLabel>Monto autorizado</InputLabel>
            <TextField fullWidth placeholder="Nuevo León" variant="standard" />
          </Grid>

          <Grid lg={2.1}>
            <InputLabel>Documento soporte</InputLabel>
            <TextField fullWidth placeholder="Nuevo León" variant="standard" />
          </Grid>

          <Grid lg={2.1}>
            <InputLabel>
              Acreditación del quórum y el sentido de la votación
            </InputLabel>
            <TextField fullWidth placeholder="Nuevo León" variant="standard" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
