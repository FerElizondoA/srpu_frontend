import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { useEffect } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { DateInput } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";

export function RegistrarNuevaAutorizacion() {
  const entidad: { Id: string; Organismo: string } = useLargoPlazoStore(
    (state) => state.registrarAutorizacion.entidad
  );

  const numeroAutorizacion: number = useLargoPlazoStore(
    (state) => state.registrarAutorizacion.numeroAutorizacion
  );

  const medioPublicacion: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.registrarAutorizacion.medioPublicacion);

  const fechaPublicacion: string = useLargoPlazoStore(
    (state) => state.registrarAutorizacion.fechaPublicacion
  );

  const montoAutorizado: number = useLargoPlazoStore(
    (state) => state.registrarAutorizacion.montoAutorizado
  );

  const documentoSoporte: { archivo: File; nombreArchivo: string } =
    useLargoPlazoStore((state) => state.registrarAutorizacion.documentoSoporte);

  const acreditacionQuorum: { archivo: File; nombreArchivo: string } =
    useLargoPlazoStore(
      (state) => state.registrarAutorizacion.acreditacionQuorum
    );

  const changeAutorizacion: Function = useLargoPlazoStore(
    (state) => state.setRegistrarAutorizacion
  );

  // const getOrganismosA: Function = useLargoPlazoStore(
  //   (state) => state.getOrganismos
  // );
  // const catalagoOrganismos: Array<ICatalogo> = useLargoPlazoStore(
  //   (state) => state.catalogoOrganismos
  // );

  const getMediosDePublicacion: Function = useLargoPlazoStore(
    (state) => state.getMediosDePublicacion
  );
  const catalogoMediosDePublicacion: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoMediosDePublicacion
  );

  function cargarArchivo(event: any, tipoDocumento: string) {
    let file = event.target.files[0];
    if (tipoDocumento === "Soporte") {
      if (file !== undefined) {
        changeAutorizacion({
          entidad: entidad,
          numeroAutorizacion: numeroAutorizacion,
          fechaPublicacion: fechaPublicacion,
          medioPublicacion: medioPublicacion,
          montoAutorizado: montoAutorizado,
          documentoSoporte: {
            archivo: file,
            nombreArchivo: file.name,
          },
          acreditacionQuorum: acreditacionQuorum,
        });
      }
    } else if (tipoDocumento === "Quorum") {
      if (file !== undefined) {
        changeAutorizacion({
          entidad: entidad,
          numeroAutorizacion: numeroAutorizacion,
          fechaPublicacion: fechaPublicacion,
          medioPublicacion: medioPublicacion,
          montoAutorizado: montoAutorizado,
          documentoSoporte: documentoSoporte,
          acreditacionQuorum: {
            archivo: file,
            nombreArchivo: file.name,
          },
        });
      }
    }
  }

  useEffect(() => {
    changeAutorizacion({
      entidad: entidad,
      numeroAutorizacion: numeroAutorizacion,
      fechaPublicacion: fechaPublicacion,
      medioPublicacion: medioPublicacion,
      montoAutorizado: montoAutorizado,
      documentoSoporte: documentoSoporte,
      acreditacionQuorum: acreditacionQuorum,
    });
    getMediosDePublicacion();
  }, []);

  const removeDocumentoSoporte = (tipoDocumento: string) => {
    if (tipoDocumento === "Soporte") {
      changeAutorizacion({
        entidad: entidad,
        numeroAutorizacion: numeroAutorizacion,
        fechaPublicacion: fechaPublicacion,
        medioPublicacion: medioPublicacion,
        montoAutorizado: montoAutorizado,
        documentoSoporte: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
        acreditacionQuorum: acreditacionQuorum,
      });
    } else if (tipoDocumento === "Quorum") {
      changeAutorizacion({
        entidad: entidad,
        numeroAutorizacion: numeroAutorizacion,
        fechaPublicacion: fechaPublicacion,
        medioPublicacion: medioPublicacion,
        montoAutorizado: montoAutorizado,
        documentoSoporte: documentoSoporte,
        acreditacionQuorum: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
      });
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        sx={queries.contenedorAgregarAutorizacion.RegistrarAutorizacion}
      >
        <Grid container sx={{ ...queries.RegistrarNuevaAutorizacion }}>
          <Grid width={"100%"} item xs={5} sm={5} md={1} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>Entidad</InputLabel>
            <TextField
              disabled
              fullWidth
              placeholder="Nuevo León"
              variant="standard"
              value={entidad.Organismo}
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

          <Grid item xs={5} sm={5} md={4} lg={4} xl={4}>
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
                    entidad: entidad,
                    numeroAutorizacion: v.target.value,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: montoAutorizado,
                    documentoSoporte: documentoSoporte,
                    acreditacionQuorum: acreditacionQuorum,
                  });
                } else if (v.target.value === "") {
                  changeAutorizacion({
                    entidad: entidad,
                    numeroAutorizacion: 0,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: montoAutorizado,
                    documentoSoporte: documentoSoporte,
                    acreditacionQuorum: acreditacionQuorum,
                  });
                }
              }}
            />
          </Grid>

          <Grid width={"100%"} item xs={5} sm={5} md={3} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>
              Medio de publicación
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoMediosDePublicacion}
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
                  entidad: entidad,
                  numeroAutorizacion: numeroAutorizacion,
                  fechaPublicacion: fechaPublicacion,
                  medioPublicacion: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  montoAutorizado: montoAutorizado,
                  documentoSoporte: documentoSoporte,
                  acreditacionQuorum: acreditacionQuorum,
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

          <Grid width={"100%"} item xs={5} sm={5} md={2} lg={2} xl={2}>
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
                    entidad: entidad,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: date?.toString(),
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: montoAutorizado,
                    documentoSoporte: documentoSoporte,
                    acreditacionQuorum: acreditacionQuorum,
                  })
                }
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container sx={{ ...queries.RegistrarNuevaAutorizacion }}>
          <Grid width={"50%"} item xs={5} sm={5} md={2} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>Monto Autorizado</InputLabel>
            <TextField
              value={
                montoAutorizado <= 0
                  ? moneyMask("0")
                  : moneyMask(montoAutorizado.toString())
              }
              onChange={(v) => {
                if (
                  validator.isNumeric(v.target.value.replace(/\D/g, "")) &&
                  parseInt(v.target.value.replace(/\D/g, "")) < 9999999999999999
                ) {
                  changeAutorizacion({
                    entidad: entidad,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: moneyMask(v.target.value),
                    documentoSoporte: documentoSoporte,
                    acreditacionQuorum: acreditacionQuorum,
                  });
                } else if (v.target.value === "") {
                  changeAutorizacion({
                    entidad: entidad,
                    numeroAutorizacion: numeroAutorizacion,
                    fechaPublicacion: fechaPublicacion,
                    medioPublicacion: medioPublicacion,
                    montoAutorizado: moneyMask("0"),
                    documentoSoporte: documentoSoporte,
                    acreditacionQuorum: acreditacionQuorum,
                  });
                }
              }}
              fullWidth
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
                // startAdornment: <AttachMoneyIcon />,
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={5} sm={5} md={4} lg={4} xl={4} width={"100%"}>
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
              <Grid sx={{ position: "relative", width: "100%" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    ...queries.documentosAgregarNuevaAutorizacion,
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
                  <Button onClick={() => removeDocumentoSoporte("Soporte")}>
                    <GridCloseIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={5} sm={5} md={4} lg={4} xl={4} item width={"100%"}>
            <InputLabel
              sx={{
                ...queries.medium_text,
                width: "100%",
              }}
            >
              Acreditación del quórum y el sentido de la votación
            </InputLabel>

            <Grid mt={1} display={"flex"} justifyContent={"center"}>
              <Grid sx={{ position: "relative", width: "100%" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    ...queries.documentosAgregarNuevaAutorizacion,
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
                  <Button onClick={() => removeDocumentoSoporte("Quorum")}>
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
