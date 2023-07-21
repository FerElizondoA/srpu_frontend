import {useEffect } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { queries } from "../../../queries";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  DateInput,
} from "../../CustomComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import validator from "validator";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { GridCloseIcon } from "@mui/x-data-grid";


export function RegistrarNuevaAutorizacion() {

  const entidadFederativa: { Id: string, Organismo: string } =
    useLargoPlazoStore((state) => state.Autorizacion.entidadFederativa);

  const numeroAutorizacion: number = useLargoPlazoStore(
    (state) => state.Autorizacion.numeroAutorizacion
  );

  const medioPublicacion: { Id: string, Descripcion: string } =
    useLargoPlazoStore((state) => state.Autorizacion.medioPublicacion);

  const fechaPublicacion: string = useLargoPlazoStore(
    (state) => state.Autorizacion.fechaPublicacion
  );

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.Autorizacion.montoAutorizado
  );

  const documentoSoporte: { archivo: File, nombreArchivo: string } =
    useLargoPlazoStore((state) => state.documentoSoporte);

  const removeDocumentoSoporte: Function = useLargoPlazoStore(
    (state) => state.removeDocumentoSoporte
  );

  const addDocumentoSoporte: Function = useLargoPlazoStore(
    (state) => state.addDocumentoSoporte
  );

  const acreditacionQuorum: { archivo: File, nombreArchivo: string } =
    useLargoPlazoStore((state) => state.acreditacionQuorum);

  const removeDocumentoQuorum: Function = useLargoPlazoStore(
    (state) => state.removeDocumentoQuorum
  );

  const addDocumentoQuorum: Function = useLargoPlazoStore(
    (state) => state.addDocumentoQuorum
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

  function cargarArchivo(event: any, tipoDocumento: string) {
    let file = event.target.files[0];
    if (tipoDocumento === "Soporte") {
      if (file !== undefined) {
        addDocumentoSoporte(file, file.name);
      }
    } else if (tipoDocumento === "Quorum") {
      if (file !== undefined) {
        addDocumentoQuorum(file, file.name);
      }
    }
  }

  useEffect(() => {
    changeAutorizacion({
      entidadFederativa: entidadFederativa,
      numeroAutorizacion: numeroAutorizacion,
      fechaPublicacion: fechaPublicacion,
      medioPublicacion: medioPublicacion,
      montoAutorizado: montoAutorizado,
    });

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
                  } else if (v.target.value === ""){
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

            {/* FALTA CAMBIAR EL VERDADERO CATALGOGO, SOLO ES DE PRUEBA*/}

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
                  value={new Date(fechaPublicacion)}
                  onChange={(date) =>
                    changeAutorizacion({
                      entidadFederativa: entidadFederativa,
                      numeroAutorizacion: numeroAutorizacion,
                      fechaPublicacion: date?.toString(),
                      medioPublicacion: medioPublicacion,
                      montoAutorizado: montoAutorizado,
                    })
                  }
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
                } else if (v.target.value === ""){
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

          <Grid item lg={3} width={"100%"}>
            <InputLabel
              sx={{
                ...queries.medium_text,
                width: "82%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Documento Soporte
            </InputLabel>

            <Grid mt={1} display={"flex"} justifyContent={"center"}>
              <Grid sx={{ position: "relative" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    fontSize: "80%",
                    color: "#15212f",
                    border:
                      documentoSoporte.nombreArchivo !==
                      "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                        ? "2px dotted #af8c55"
                        : "2x dotted black",
                  }}
                >
                  {documentoSoporte.nombreArchivo ||
                    "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                </Typography>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(v) => {
                    cargarArchivo(v, "Soporte");
                  }}
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "3vh",
                    cursor: "pointer",
                  }}
                />
              </Grid>

              <Grid display={"flex"} justifyContent={"end"}>
                <Tooltip title={"Remover Archivo"}>
                  <Button onClick={() => removeDocumentoSoporte()}>
                    <GridCloseIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={3} width={"100%"}>
            <InputLabel
              sx={{
                ...queries.medium_text,

                "@media (min-width: 1485px)": {
                  fontSize: "1.62ch",
                },
                "@media (min-width: 1870px)": {
                  fontSize: "2ch",
                },
              }}
            >
              Acreditación del quórum y el sentido de la votación
            </InputLabel>
            <Grid mt={1} display={"flex"} justifyContent={"center"}>
              <Grid sx={{ position: "relative" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    fontSize: "80%",
                    color: "#15212f",
                    border:
                      acreditacionQuorum.nombreArchivo !==
                      "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                        ? "2px dotted #af8c55"
                        : "2x dotted black",
                  }}
                >
                  {acreditacionQuorum.nombreArchivo ||
                    "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                </Typography>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(v) => {
                    cargarArchivo(v, "Quorum");
                  }}
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "3vh",
                    cursor: "pointer",
                  }}
                />
              </Grid>

              <Grid display={"flex"} justifyContent={"end"}>
                <Tooltip title={"Remover Archivo"}>
                  <Button onClick={() => removeDocumentoQuorum()}>
                    <GridCloseIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
