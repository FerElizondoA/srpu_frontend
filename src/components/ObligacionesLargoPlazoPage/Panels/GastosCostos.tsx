import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

interface Head {
  label: string;
}

const headsGC: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la inversión",
  },
  {
    label: "Descripción",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Monto",
  },
  {
    label: "Acción",
  },
];

export function GastoCostos() {
  //CATALOGO
  const catalogoDestinos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDestinos
  );

  const catalogoDetallesInversion: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDetallesInversion
  );

  const getDetallesInversion: Function = useLargoPlazoStore(
    (state) => state.getDetallesInversion
  );

  // Datos tabla Gastos costos
  const destino: { Id: string; Descripcion: string } = useLargoPlazoStore(
    (state) => state.generalGastosCostos.destino
  );

  const generalGCDetalleInversion: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.generalGastosCostos.detalleInversion);

  const generalGCClaveInscripcionFinanciamiento: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.claveInscripcionFinanciamiento
  );

  const generalGCDescripcion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.descripcion
  );

  const generalGCMonto: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.monto
  );
  //TABLA GASTOS Y COSTOS

  const changeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGeneralGastosCostos
  );

  const tablaGastosCostos: any = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const removeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.removeGeneralGastosCostos
  );

  // Gastos y costos

  const GCGastosAdicionales: string = useLargoPlazoStore(
    (state) => state.GastosCostos.gastosAdicionales
  );

  const GCSaldoVigente: number = useLargoPlazoStore(
    (state) => state.GastosCostos.saldoVigente
  );

  const GCMontoGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.GastosCostos.montoGastosAdicionales
  );

  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGeneralGastosCostos
  );

  const changeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGastosCostos
  );

  const addDocumento: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const removeDocumento: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
  );

  const detalleInversion: { archivo: File; nombreArchivo: string } =
    useLargoPlazoStore((state) => state.archivoDetalleInversion);

  const addRows = () => {
    let tab = {
      destino: destino.Descripcion,
      detalleInversion: generalGCDetalleInversion.Descripcion,
      claveInscripcionFinanciamiento: generalGCClaveInscripcionFinanciamiento,
      descripcion: generalGCDescripcion,
      monto: moneyMask(generalGCMonto.toString()),
    };
    addGeneralGastosCostos(tab);
  };

  useEffect(() => {
    changeGeneralGastosCostos({
      destino: destino,
      detalleInversion: generalGCDetalleInversion,
      claveInscripcionFinanciamiento: generalGCClaveInscripcionFinanciamiento,
      descripcion: generalGCDescripcion,
      monto: moneyMask(generalGCMonto.toString()),
    });

    changeGastosCostos({
      gastosAdicionales: GCGastosAdicionales,
      saldoVigente: moneyMask(GCSaldoVigente.toString()),
      montoGastosAdicionales: moneyMask(GCMontoGastosAdicionales.toString()),
      //Archivo
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destino, generalGCMonto, GCGastosAdicionales, generalGCDetalleInversion]);

  function cargarArchivo(event: any) {
    let file = event.target.files[0];
    if (file !== undefined) {
      addDocumento(file, file.name);
    }
  }

  useEffect(() => {
    getDetallesInversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  return (
    <Grid
      item
      container
      sx={{
        ...queries.contenedorInformacionGeneral,
        //display: "flex",
        //flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid container display={"flex"} width={"100%"} justifyContent={"space-evenly"}

      >
        <Grid item xs={10} sm={5} md={5} lg={3.3} xl={3.3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
            disabled={reestructura === "con autorizacion"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoDestinos}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: destino.Id || "",
              Descripcion: destino.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeGeneralGastosCostos({
                destino: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                detalleInversion: generalGCDetalleInversion,
                claveInscripcionFinanciamiento:
                  generalGCClaveInscripcionFinanciamiento,
                descripcion: generalGCDescripcion,
                monto: moneyMask(generalGCMonto.toString()),
              });
            }}
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

        {destino.Descripcion === "Inversión pública productiva"
          ?
          <Grid item xs={10} sm={5} md={5} lg={3.3} xl={3.3}
          //width={"90%"}
          >
            <InputLabel sx={queries.medium_text}>
              Detalle de la Inversión
            </InputLabel>
            <Autocomplete
              disabled={reestructura === "con autorizacion"}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoDetallesInversion}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={{
                Id: generalGCDetalleInversion.Id || "",
                Descripcion: generalGCDetalleInversion.Descripcion || "",
              }}
              onChange={(event, text) => {
                changeGeneralGastosCostos({
                  destino: destino,
                  detalleInversion: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: moneyMask(generalGCMonto.toString()),
                });
              }}
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
          :
          null
        }

      </Grid>

      {destino.Descripcion.toLowerCase().includes("refinanciamiento") ?
        (
          <Grid
            container

            sx={{
              flexDirection: "column",
              //height: "12rem",
              //justifyContent: "space-evenly"
            }}
          >
            <Grid container
              width={"100%"}
              display={"flex"}
              justifyContent={"space-evenly"}
              mb={4}
            >
              <Grid item xs={10} sm={3} md={3} lg={3.3} xl={3.3}>
                <InputLabel sx={queries.medium_text}>
                  Clave de Inscripción del Financiamiento a Refinanciar
                </InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  value={generalGCClaveInscripcionFinanciamiento}
                  onChange={(v) => {
                    changeGeneralGastosCostos({
                      destino: destino,
                      detalleInversion: generalGCDetalleInversion,
                      claveInscripcionFinanciamiento: v.target.value,
                      descripcion: generalGCDescripcion,
                      monto: moneyMask(generalGCMonto.toString()),
                    });
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={10} sm={3} md={3} lg={3.3} xl={3.3}
              // width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>Descripción</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  value={generalGCDescripcion}
                  onChange={(v) =>
                    changeGeneralGastosCostos({
                      destino: destino,
                      detalleInversion: generalGCDetalleInversion,
                      claveInscripcionFinanciamiento:
                        generalGCClaveInscripcionFinanciamiento,
                      descripcion: v.target.value,
                      monto: moneyMask(generalGCMonto.toString()),
                    })
                  }
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
                  }}
                  variant="standard"
                />
              </Grid>

              <Grid item
                // width={"90%"}
                xs={10} sm={3} md={3} lg={3.3} xl={3.3}
              >
                <InputLabel sx={queries.medium_text}>Gastos Adicionales</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  value={GCGastosAdicionales}
                  onChange={(v) => {
                    changeGastosCostos({
                      gastosAdicionales: v.target.value,
                      saldoVigente: moneyMask(GCSaldoVigente.toString()),
                      montoGastosAdicionales: moneyMask(
                        GCMontoGastosAdicionales.toString()
                      ),
                    });
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Grid container display={"flex"} justifyContent={"space-evenly"}>
              <Grid item xs={10} sm={3} md={3} lg={3.3} xl={3.3}
              // width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>
                  Monto Gastos Adicionales
                </InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  placeholder="0"
                  value={
                    GCMontoGastosAdicionales <= 0
                      ? ""
                      : GCMontoGastosAdicionales.toString()
                  }
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGastosCostos({
                        gastosAdicionales: GCGastosAdicionales,
                        saldoVigente: moneyMask(GCSaldoVigente.toString()),
                        montoGastosAdicionales: moneyMask(
                          v.target.value.toString()
                        ),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                    //startAdornment: <AttachMoneyIcon />,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={10} sm={3} md={3} lg={3.3} xl={3.3}
              // width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>Monto</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  placeholder="0"
                  value={generalGCMonto <= 0 ? "" : generalGCMonto}
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGeneralGastosCostos({
                        destino: destino,
                        detalleInversion: generalGCDetalleInversion,
                        claveInscripcionFinanciamiento:
                          generalGCClaveInscripcionFinanciamiento,
                        descripcion: generalGCDescripcion,
                        monto: moneyMask(v.target.value),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                    //startAdornment: <AttachMoneyIcon />,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={10} sm={3} md={3} lg={3.3} xl={3.3}

              //width={"90%"}
              >
                <InputLabel disabled sx={queries.medium_text}>
                  Saldo Vigente
                </InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  value={GCSaldoVigente <= 0 ? "" : GCSaldoVigente.toString()}
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGastosCostos({
                        gastosAdicionales: GCGastosAdicionales,
                        saldoVigente: moneyMask(v.target.value.toString()),
                        montoGastosAdicionales: moneyMask(
                          GCMontoGastosAdicionales.toString()
                        ),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            width={"100%"}
            container
            sx={{
              // display: "grid",
              // gridTemplateColumns: "repeat(3,1fr)",
              // justifyItems: "center",
              // height: "25vh",
            }}
          >
            <Grid container
              width={"100%"}
              display={"flex"}
              justifyContent={"space-evenly"}
              mb={4}
            >

              <Grid item xs={10} sm={5} md={3} lg={3.3} xl={3.3}
              //width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>Descripción</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  value={generalGCDescripcion}
                  onChange={(v) =>
                    changeGeneralGastosCostos({
                      destino: destino,
                      detalleInversion: generalGCDetalleInversion,
                      claveInscripcionFinanciamiento:
                        generalGCClaveInscripcionFinanciamiento,
                      descripcion: v.target.value,
                      monto: moneyMask(generalGCMonto.toString()),
                    })
                  }
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
                  }}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={10} sm={5} md={3} lg={3.3} xl={3.3}
              //width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>Monto</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  placeholder="0"
                  value={generalGCMonto <= 0 ? "" : generalGCMonto}
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGeneralGastosCostos({
                        destino: destino,
                        detalleInversion: generalGCDetalleInversion,
                        claveInscripcionFinanciamiento:
                          generalGCClaveInscripcionFinanciamiento,
                        descripcion: generalGCDescripcion,
                        monto: moneyMask(v.target.value),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                    //startAdornment: <AttachMoneyIcon />,
                  }}
                  variant="standard"
                />
              </Grid>


              <Grid item xs={10} sm={10} md={3} lg={3.3} xl={3.3}
              //width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>
                  Adjuntar detalle de la inversión pública productiva
                </InputLabel>

                <Grid mt={1} mb={1} item display={"flex"} justifyContent={"space-between"}>
                  <Grid item sx={{ position: "relative" }}>
                    <Typography
                      position={"absolute"}
                      sx={{
                        ...queries.leyendaArchivoGastosCosto,
                        border:
                          detalleInversion.nombreArchivo !==
                            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                            ? "2px dotted #af8c55"
                            : "2px dotted black",
                      }}
                    >
                      {detalleInversion.nombreArchivo ||
                        "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                    </Typography>
                    <TextField
                    
                      //disabled={reestructura === "con autorizacion"}
                      type="file"
                      //accept="application/pdf"
                      onChange={(v) => {
                        cargarArchivo(v);
                      }}
                      sx={{
                        opacity: 0,
                       
                        height: "3vh",
                        cursor: "pointer",
                        "@media (min-width: 480px)": {
                          width: "22rem",
                        },
                    
                        "@media (min-width: 768px)": {
                          width: "14rem",
                        },
                    
                        "@media (min-width: 1140px)": {
                          width: "18rem",
                        },
                    
                        "@media (min-width: 1400px)": {
                          width: "22rem",
                        },
                    
                        "@media (min-width: 1870px)": {
                          width: "28rem",
                        },

                      }}
                    ></TextField>
                  </Grid>

                  <Grid display={"flex"} justifyContent={"end"}>
                    <Tooltip title={"Remover Archivo"}>
                      <Button onClick={() => removeDocumento()}>
                        <CloseIcon />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            <Grid container display={"flex"} justifyContent={"space-evenly"}>

              <Grid item xs={10} sm={5} md={3} lg={3.3} xl={3.3}
              // width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>Gastos Adicionales</InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  value={GCGastosAdicionales}
                  onChange={(v) => {
                    changeGastosCostos({
                      gastosAdicionales: v.target.value,
                      saldoVigente: moneyMask(GCSaldoVigente.toString()),
                      montoGastosAdicionales: moneyMask(
                        GCMontoGastosAdicionales.toString()
                      ),
                    });
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={10} sm={5} md={3} lg={3.3} xl={3.3}
              // width={"90%"}
              >
                <InputLabel sx={queries.medium_text}>
                  Monto Gastos Adicionales
                </InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  placeholder="0"
                  value={
                    GCMontoGastosAdicionales <= 0
                      ? ""
                      : GCMontoGastosAdicionales.toString()
                  }
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGastosCostos({
                        gastosAdicionales: GCGastosAdicionales,
                        saldoVigente: moneyMask(GCSaldoVigente.toString()),
                        montoGastosAdicionales: moneyMask(
                          v.target.value.toString()
                        ),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                    //startAdornment: <AttachMoneyIcon />,
                  }}
                  variant="standard"
                />
              </Grid>

              <Grid container xs={10} sm={3} md={3} lg={3.3} xl={3.3}
                width={"100%"}
              >
                <InputLabel disabled sx={queries.medium_text}>
                  Saldo Vigente
                </InputLabel>
                <TextField
                  disabled={reestructura === "con autorizacion"}
                  fullWidth
                  value={GCSaldoVigente <= 0 ? "" : GCSaldoVigente.toString()}
                  onChange={(v) => {
                    if (
                      validator.isNumeric(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) &&
                      parseInt(
                        v.target.value
                          .replace(".", "")
                          .replace(",", "")
                          .replace(/\D/g, "")
                      ) < 9999999999999999
                    ) {
                      changeGastosCostos({
                        gastosAdicionales: GCGastosAdicionales,
                        saldoVigente: moneyMask(v.target.value.toString()),
                        montoGastosAdicionales: moneyMask(
                          GCMontoGastosAdicionales.toString()
                        ),
                      });
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
        )}

      <Grid
        width={"94%"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeProvider theme={buttonTheme}>
          <Button
            sx={queries.buttonContinuar}
            variant="outlined"
            disabled={
              /^[\s]*$/.test(destino.Descripcion) ||
              /^[\s]*$/.test(generalGCDetalleInversion.Descripcion) ||
              /^[\s]*$/.test(generalGCDescripcion) ||
              // ||
              // /^[\s]*$/.test(generalGCClaveInscripcionFinanciamiento)
              generalGCMonto < 1
            }
            onClick={() => {
              changeGeneralGastosCostos({
                destino: {
                  Id: "",
                  Descripcion: "",
                },
                detalleInversion: { Id: "", Descripcion: "" },
                claveInscripcionFinanciamiento: "",
                descripcion: "",
                monto: 0,
              });

              addRows();
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>
      </Grid>

      <Grid
        height={"40%"}
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Paper sx={{ width: "95%", overflow: "clip", height: "100%" }}>
          <TableContainer
            sx={{
              height: "100%",
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
                height: ".5vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headsGC.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaGastosCostos.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.destino}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.detalleInversion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.claveInscripcionFinanciamiento}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.monto}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            disabled={reestructura === "con autorizacion"}
                            type="button"
                            onClick={() => removeGeneralGastosCostos(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
