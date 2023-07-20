import { useState, forwardRef, useEffect } from "react";
import {
  Grid,
  Slide,
  createTheme,
  TextField,
  InputLabel,
  Autocomplete,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";

import { queries } from "../../../queries";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { addDays, subDays } from "date-fns";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB, id } from "date-fns/locale";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import validator from "validator";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
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

  const entidadFederativa: { Id: string; Organismo: string } =
    useLargoPlazoStore((state) => state.Autorizacion.entidadFederativa);

  const numeroAutorizacion: number = useLargoPlazoStore(
    (state) => state.Autorizacion.numeroAutorizacion
  );

  const medioPublicacion: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.Autorizacion.medioPublicacion);

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

  const getOrganismosA: Function = useLargoPlazoStore(
    (state) => state.getOrganismosA
  );

  const catalagoOrganismos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const [fechaDePublicacion, setFechaDePublicacion] =
    useState(fechaPublicacion);

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

  useEffect(() => {
    getOrganismosA();
  }, []);

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
              <InputLabel sx={queries.medium_text}>Municipio</InputLabel>
              <TextField
                fullWidth
                placeholder="Nuevo León"
                variant="standard"
                value={entidadFederativa.Organismo}
                sx={queries.medium_text}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid lg={2.4}>
              <InputLabel sx={queries.medium_text}>
                Numero de autorización de la legislatura local
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Nuevo León"
                variant="standard"
                value={
                  numeroAutorizacion <= 0 ? "" : numeroAutorizacion.toString()
                }
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
              <InputLabel sx={queries.medium_text}>
                Medio de publicación
              </InputLabel>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={catalagoOrganismos}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
                }}
                value={{
                  Id: medioPublicacion.Id || "",
                  Descripcion: medioPublicacion.Descripcion || "",
                }}
                onChange={(event, text) =>
                  changeAutorizacion({
                    entidadFederativa: entidadFederativa,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: {
                      Id: text?.Id || "",
                      Descripcion: text?.Descripcion || "",
                    },
                    montoAutorizado: montoAutorizado,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.Id === value.Id || value.Descripcion === ""
                }
              />
            </Grid>

            <Grid lg={2.4}>
              <InputLabel sx={queries.medium_text}>
                Fecha de publicacion
              </InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DatePicker
                  value={new Date(fechaDePublicacion)}
                  onChange={(date) =>
                    setFechaDePublicacion(date?.toString() || "")
                  }
                  minDate={new Date(subDays(new Date(), 365))}
                  maxDate={new Date(addDays(new Date(fechaDePublicacion), 365))}
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
            <InputLabel sx={queries.medium_text}>Monto autorizado</InputLabel>
            <TextField
              sx={queries.medium_text}
              fullWidth
              placeholder="Nuevo León"
              variant="standard"
              value={montoAutorizado <= 0 ? "" : montoAutorizado.toString()}
              onChange={(v) => {
                if (validator.isNumeric(v.target.value)) {
                  changeAutorizacion({
                    entidadFederativa: entidadFederativa,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: v.target.value,
                  });
                } else {
                  changeAutorizacion({
                    entidadFederativa: entidadFederativa,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: 0,
                  });
                }
              }}
            />
          </Grid>

          <Grid lg={2.1}>
            <InputLabel sx={queries.medium_text}>Documento soporte</InputLabel>
            <TextField
              sx={queries.medium_text}
              fullWidth
              placeholder="Nuevo León"
              variant="standard"
            />
          </Grid>

          <Grid lg={2.1}>
            <InputLabel sx={queries.medium_text}>
              Acreditación del quórum y el sentido de la votación
            </InputLabel>
            <TextField
              sx={queries.medium_text}
              fullWidth
              placeholder="Nuevo León"
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
