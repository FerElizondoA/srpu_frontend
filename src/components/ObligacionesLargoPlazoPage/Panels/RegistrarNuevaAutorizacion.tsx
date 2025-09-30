/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { IGeneralAutorizado } from "../../../store/CreditoLargoPlazo/autorizacion";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { convertFileToBase64 } from "../../../generics/Validation";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CloseIcon from "@mui/icons-material/Close";



export interface IFileAutorizacion {
  archivo: string;
  nombreArchivo: string;
}

export function RegistrarNuevaAutorizacion({
  tipoAccion
}: {
  tipoAccion?: string
}) {
  const autorizacion: IGeneralAutorizado = useLargoPlazoStore(
    (state) => state.autorizacion
  );

  const setRegistrarAutorizacion: Function = useLargoPlazoStore(
    (state) => state.setRegistrarAutorizacion
  );

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
        setRegistrarAutorizacion({
          ...autorizacion,
          documentoSoporte: {
            tipo: tipoDocumento,
            archivo: file,
            nombreArchivo: file.name,
          },
        });
      }
    } else if (tipoDocumento === "Quorum") {
      if (file !== undefined) {
        setRegistrarAutorizacion({
          ...autorizacion,
          acreditacionQuorum: {
            tipo: tipoDocumento,
            archivo: file,
            nombreArchivo: file.name,
          },
        });
      }
    }
  }
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const [fileSelected, setFileSelected] = useState<any>("");


  useEffect(() => {
    getMediosDePublicacion();
  }, []);

  const removeDocumentoSoporte = (tipoDocumento: string) => {
    if (tipoDocumento === "Soporte") {
      setRegistrarAutorizacion({
        ...autorizacion,
        documentoSoporte: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
      });
    } else if (tipoDocumento === "Quorum") {
      setRegistrarAutorizacion({
        ...autorizacion,
        acreditacionQuorum: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
      });
    }
  };

  const [arrayDocumentosCargados, setArrayDocumentosCargados] = useState<Array<IFileAutorizacion>>([]);


  // useEffect(() => {

  //   console.log("autorizacion EDITAR", autorizacion);
  //   setArrayDocumentosCargados([
  //     {
  //       ...autorizacion.documentoSoporte,
  //       archivo: autorizacion.documentoSoporte.archivo,
  //     },
  //     {
  //       ...autorizacion.acreditacionQuorum,
  //       archivo: autorizacion.acreditacionQuorum.archivo,
  //     },
  //   ]);


  // }, [tipoAccion === "Editar"])

  useEffect(() => {
    console.log("autorizacion EDITAR", autorizacion);
  }, [])



  return (
    <>
      <Grid container width={"100%"}>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          height={"20rem"}
        >
          <Grid width={"100%"} item xs={10} sm={5} md={1} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>Entidad</InputLabel>
            <TextField
              disabled
              fullWidth
              placeholder="Nuevo León"
              variant="standard"
              value={autorizacion.entidad.Organismo}
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

          <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
            <InputLabel sx={queries.medium_text}>
              Número de autorización de la legislatura local
            </InputLabel>
            <TextField
              fullWidth
              variant="standard"
              value={
                autorizacion.numeroAutorizacion <= 0
                  ? ""
                  : autorizacion.numeroAutorizacion.toString()
              }
              onChange={(v) => {
                if (validator.isNumeric(v.target.value)) {
                  setRegistrarAutorizacion({
                    ...autorizacion,
                    numeroAutorizacion: v.target.value,
                  });
                } else if (v.target.value === "") {
                  setRegistrarAutorizacion({
                    ...autorizacion,
                    numeroAutorizacion: 0,
                  });
                }
              }}
            />
          </Grid>

          <Grid width={"100%"} item xs={10} sm={5} md={3} lg={2} xl={2}>
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
              value={autorizacion.medioPublicacion}
              onChange={(event, text) =>
                setRegistrarAutorizacion({
                  ...autorizacion,
                  medioPublicacion: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
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

          <Grid width={"100%"} item xs={10} sm={5} md={2} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>
              Fecha de publicacion
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                sx={{ width: "100%" }}
                value={new Date(autorizacion.fechaPublicacion)}
                onChange={(date) =>
                  setRegistrarAutorizacion({
                    ...autorizacion,
                    fechaPublicacion: format(date!, "MM/dd/yyyy"),
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={5} md={2} lg={2} xl={2}>
            <InputLabel sx={queries.medium_text}>Monto Autorizado</InputLabel>
            <TextField
              value={
                autorizacion.montoAutorizado <= 0
                  ? moneyMask("0")
                  : moneyMask(autorizacion.montoAutorizado.toString())
              }
              onChange={(v) => {
                if (
                  validator.isNumeric(v.target.value.replace(/\D/g, "")) &&
                  parseInt(v.target.value.replace(/\D/g, "")) < 9999999999999999
                ) {
                  setRegistrarAutorizacion({
                    ...autorizacion,
                    montoAutorizado: moneyMask(v.target.value),
                  });
                } else if (v.target.value === "") {
                  setRegistrarAutorizacion({
                    ...autorizacion,
                    montoAutorizado: moneyMask("0"),
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

          <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
            <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
              <Button
                sx={{ display: "flex", justifyContent: "end" }}
                onClick={async () => {
                  try {
                    console.log("autorizacion.DocumentoSoporte", autorizacion.documentoSoporte);

                    let base64String = "";

                    if (autorizacion.documentoSoporte && autorizacion.documentoSoporte.archivo) {
                      if (autorizacion.documentoSoporte.archivo instanceof File) {
                        base64String = await convertFileToBase64(autorizacion.documentoSoporte.archivo);
                      } else {
                        base64String = autorizacion.documentoSoporte.archivo; // string base64 desde backend
                      }
                    } else {
                      console.warn("DocumentoSoporte vacío o sin archivo");
                    }

                    if (base64String) {
                      const dataUri = `data:application/pdf;base64,${base64String}`;
                      setFileSelected(dataUri);
                      setShowModalPrevia(true);
                    } else {
                      console.error("El archivo no contiene datos en base64");
                    }
                  } catch (error) {
                    // 🔹 Aquí ya no deberías llegar salvo error inesperado (axios, etc.)
                    console.error("Error inesperado al convertir el archivo a Base64:", error);
                  }
                }}
              >
                <Tooltip title="Ver archivo">
                  <Typography>
                    <FileOpenIcon />
                  </Typography>
                </Tooltip>
              </Button>
            </Grid>

            <Grid mt={1} display={"flex"} justifyContent={"center"}>
              <Grid sx={{ position: "relative", width: "100%" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    ...queries.documentosAgregarNuevaAutorizacion,
                    border:
                      autorizacion.documentoSoporte?.nombreArchivo !==
                        "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                        ? "2px dotted #af8c55"
                        : "2px dotted black", // Ojo, aquí estaba "2x", debería ser "2px"
                  }}
                >
                  {autorizacion.documentoSoporte?.nombreArchivo ||
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

          <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>

              <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>

                <InputLabel
                  sx={{
                    ...queries.medium_text,
                    width: "100%",
                  }}
                >
                  Acreditación del quórum y el sentido de la votación
                </InputLabel>

                <Button
                  sx={{ display: "flex", justifyContent: "center" }}
                  onClick={async () => {
                    try {
                      console.log("autorizacion.DocumentoSoporte", autorizacion.acreditacionQuorum);

                      let base64String = "";

                      if (autorizacion.acreditacionQuorum && autorizacion.acreditacionQuorum.archivo) {
                        if (autorizacion.acreditacionQuorum.archivo instanceof File) {
                          base64String = await convertFileToBase64(autorizacion.acreditacionQuorum.archivo);
                        } else {
                          base64String = autorizacion.acreditacionQuorum.archivo; // string base64 desde backend
                        }
                      } else {
                        console.warn("DocumentoSoporte vacío o sin archivo");
                      }

                      if (base64String) {
                        const dataUri = `data:application/pdf;base64,${base64String}`;
                        setFileSelected(dataUri);
                        setShowModalPrevia(true);
                      } else {
                        console.error("El archivo no contiene datos en base64");
                      }
                    } catch (error) {
                      // 🔹 Aquí ya no deberías llegar salvo error inesperado (axios, etc.)
                      console.error("Error inesperado al convertir el archivo a Base64:", error);
                    }
                  }}
                >
                  <Tooltip title="Ver archivo">
                    <Typography>
                      <FileOpenIcon />
                    </Typography>
                  </Tooltip>
                </Button>
              </Grid>


            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mb={{ xs: 2, sm: 2, md: 0 }}
            >
              <Grid sx={{ position: "relative", width: "100%" }}>
                <Typography
                  position={"absolute"}
                  sx={{
                    ...queries.documentosAgregarNuevaAutorizacion,
                    border:
                      autorizacion.acreditacionQuorum.nombreArchivo !==
                        "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                        ? "2px dotted #af8c55"
                        : "2x dotted black",
                  }}
                >
                  {autorizacion.acreditacionQuorum.nombreArchivo ||
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
        <Dialog
          open={showModalPrevia}
          onClose={() => {
            setShowModalPrevia(false);
          }}
          fullWidth
          maxWidth={"lg"}
        >
          <DialogTitle sx={{ mb: 2 }}>
            <IconButton
              onClick={() => {
                setShowModalPrevia(false);
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "black",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ height: "100vh" }}>
            <iframe
              style={{
                width: "100%",
                height: "85vh",
              }}
              src={`${fileSelected}`}
              title="description"
            ></iframe>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
}
