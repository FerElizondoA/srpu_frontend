import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { IGastosCostos } from "../../../store/CreditoLargoPlazo/informacion_general";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { IFile } from "./Documentacion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    label: "Gastos Adicionales",
  },
  {
    label: "Monto Gastos Adicionales",
  },
  {
    label: "Saldo Vigente",
  },
  {
    label: "Detalle de la Inversión",
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
  const gastosCostos: IGastosCostos = useLargoPlazoStore(
    (state) => state.gastosCostos
  );

  const addGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGastosCostos
  );
  const setGastosCostos: Function = useLargoPlazoStore(
    (state) => state.setGastosCostos
  );
  const removeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.removeGastosCostos
  );

  const tablaGastosCostos: IGastosCostos[] = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const addDocumento: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const removeDocumento: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
  );

  const cleanGastosCostos: Function = useLargoPlazoStore(
    (state) => state.cleanGastosCostos
  );

  const addRows = () => {
    addGastosCostos(gastosCostos);
  };

  const [fileSelected, setFileSelected] = useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = useState(false);
  const [arrDocs, setArrDocs] = useState<any>([]);

  const documentos: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const tablaDocumentos: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentos
  );

  function cargarArchivo(event: any, index: number) {
    let file = event.target.files[0];

    if (file !== undefined) {
      let auxArrayArchivos = [...tablaDocumentos];
      auxArrayArchivos[index].archivo = file;
      auxArrayArchivos[index].nombreArchivo = file.name;
      setGastosCostos({
        ...gastosCostos,
        archivoDetalleInversion: {
          archivo: file,
          nombreArchivo: `DIPP-${file.name}`,
        },
      });
    } else {
    }
  }

  useEffect(() => {
    catalogoDetallesInversion.length < 1 && getDetallesInversion();
    setGastosCostos({
      ...gastosCostos,
      monto: "$ 0.00",
      montoGastosAdicionales: "$ 0.00",
      saldoVigente: "$ 0.00",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(
    "(max-width: 400px) and (max-height: 700px)"
  );

  const smallScreenStyles = {
    flexDirection: "column",
    gap: 2, // Esto añade un espacio vertical entre los grids
  };

  const gridItemStyle = {
    marginBottom: 2, // Esto añade un margen inferior para separar los grids
  };

  return (
    <Grid
      container
      display={"flex"}
      width={"100%"}
      justifyContent={"space-evenly"}
    >
      <Grid
        item
        xs={10}
        sm={5}
        md={5}
        lg={3.3}
        xl={3.3}
        sx={isSmallScreen ? gridItemStyle : {}}
      >
        <InputLabel sx={queries.medium_text}>Destino</InputLabel>
        <Autocomplete
          // disabled={
          //   reestructura === "con autorizacion" ||
          //   reestructura === "sin autorizacion"
          // }
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
          value={gastosCostos.destino}
          onChange={(event, text) => {
            setGastosCostos({
              ...gastosCostos,
              destino: {
                Id: text?.Id || "",
                Descripcion: text?.Descripcion || "",
              },
              detalleInversion: { Id: "", Descripcion: "" },
              archivoDetalleInversion: {
                archivo: new File([], ""),
                nombreArchivo: "",
              },
              claveInscripcionFinanciamiento: "",
              descripcion: "",
              monto: "$ 0.00",
              gastosAdicionales: "",
              montoGastosAdicionales: "$ 0.00",
              saldoVigente: "$ 0.00",
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

      {gastosCostos.destino.Descripcion && (
        <Grid
          container
          display={"flex"}
          width={"100%"}
          sx={isSmallScreen ? gridItemStyle : {}}
        >
          {gastosCostos.destino.Descripcion.toLowerCase().includes(
            "inversión"
          ) && (
            <Grid
              container
              item
              display={"flex"}
              justifyContent={"space-evenly"}
              xs={12}
              sm={5}
              md={5}
              lg={3.3}
              xl={12}
            >
              <Grid
                item
                xs={10}
                sm={8}
                md={10}
                lg={11}
                xl={4}
                sx={isSmallScreen ? gridItemStyle : {}}
              >
                <InputLabel sx={queries.medium_text}>
                  Detalle de la Inversión
                </InputLabel>
                <Autocomplete
                  // disabled={
                  //   reestructura === "con autorizacion" ||
                  //   reestructura === "sin autorizacion"
                  // }
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
                  value={gastosCostos.detalleInversion}
                  onChange={(event, text) => {
                    setGastosCostos({
                      ...gastosCostos,
                      detalleInversion: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
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

              <Grid
                item
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={4}
                sx={isSmallScreen ? gridItemStyle : {}}
              >
                <InputLabel sx={queries.medium_text}>
                  Adjuntar detalle de la inversión pública productiva
                </InputLabel>

                <Grid
                  mt={1}
                  mb={1}
                  item
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Grid item sx={{ position: "relative" }}>
                    <Typography
                      position={"absolute"}
                      sx={{
                        ...queries.leyendaArchivoGastosCosto,
                        border:
                          gastosCostos.archivoDetalleInversion.nombreArchivo !==
                          "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                            ? "2px dotted #af8c55"
                            : "2x dotted black",
                      }}
                    >
                      {gastosCostos.archivoDetalleInversion.nombreArchivo ||
                        "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
                    </Typography>
                    <input
                      disabled={
                        reestructura === "con autorizacion" ||
                        reestructura === "sin autorizacion"
                      }
                      type="file"
                      accept="application/pdf"
                      onChange={(v) => {
                        cargarArchivo(v, tablaGastosCostos.length);
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
                      <Button
                        onClick={() => {
                          removeDocumento();
                          setGastosCostos({
                            ...gastosCostos,
                            archivoDetalleInversion: {
                              archivo: new File([], ""),
                              nombreArchivo: ``,
                            },
                          });
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {gastosCostos.destino.Descripcion.toLowerCase().includes(
            "refinanciamiento"
          ) && (
            <Grid
              container
              item
              display={"flex"}
              justifyContent={"space-evenly"}
              xs={12}
              sm={5}
              md={5}
              lg={3.3}
              xl={12}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <Grid item xs={10} sm={10} md={10} lg={10} xl={4}>
                <InputLabel sx={queries.medium_text}>
                  Clave de Inscripción del Financiamiento a Refinanciar
                </InputLabel>
                <TextField
                  // disabled={
                  //   reestructura === "con autorizacion" ||
                  //   reestructura === "sin autorizacion"
                  // }
                  fullWidth
                  value={gastosCostos.claveInscripcionFinanciamiento}
                  onChange={(v) => {
                    setGastosCostos({
                      ...gastosCostos,
                      claveInscripcionFinanciamiento: v.target.value,
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
          )}

          <Grid
            container
            item
            display={"flex"}
            justifyContent={"space-evenly"}
            xs={12}
            sm={5}
            md={5}
            lg={3.3}
            xl={12}
            marginBottom={2}
          >
            <Grid
              item
              xs={10}
              sm={8}
              md={10}
              lg={11}
              xl={3.3}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <InputLabel sx={queries.medium_text}>Descripción</InputLabel>
              <TextField
                //   disabled={
                //     reestructura === "con autorizacion" ||
                //   reestructura === "sin autorizacion"
                // }
                value={gastosCostos.descripcion}
                onChange={(v) =>
                  setGastosCostos({
                    ...gastosCostos,
                    descripcion: v.target.value,
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

            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={3.3}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <InputLabel sx={queries.medium_text}>Monto</InputLabel>
              <TextField
                //   disabled={
                //     reestructura === "con autorizacion" ||
                //   reestructura === "sin autorizacion"
                // }
                fullWidth
                placeholder="0"
                value={gastosCostos.monto}
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
                    setGastosCostos({
                      ...gastosCostos,
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

            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={3.3}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <InputLabel sx={queries.medium_text}>
                Gastos Adicionales
              </InputLabel>
              <TextField
                //   disabled={
                //     reestructura === "con autorizacion" ||
                //   reestructura === "sin autorizacion"
                // }
                fullWidth
                value={gastosCostos.gastosAdicionales}
                onChange={(v) => {
                  setGastosCostos({
                    ...gastosCostos,
                    gastosAdicionales: v.target.value,
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

          <Grid
            container
            item
            display={"flex"}
            justifyContent={"space-evenly"}
            xs={12}
            sm={5}
            md={5}
            lg={3.3}
            xl={12}
            marginBottom={2}
          >
            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={4}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <InputLabel sx={queries.medium_text}>
                Monto Gastos Adicionales
              </InputLabel>
              <TextField
                // disabled={reestructura === "con autorizacion" ||
                // reestructura === "sin autorizacion" }
                fullWidth
                placeholder="0"
                value={gastosCostos.montoGastosAdicionales}
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
                    setGastosCostos({
                      ...gastosCostos,
                      montoGastosAdicionales: moneyMask(v.target.value),
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

            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={4}
              sx={isSmallScreen ? gridItemStyle : {}}
            >
              <InputLabel disabled sx={queries.medium_text}>
                Saldo Vigente
              </InputLabel>
              <TextField
                disabled={
                  reestructura === "con autorizacion" ||
                  reestructura === "sin autorizacion"
                }
                fullWidth
                value={gastosCostos.saldoVigente}
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
                    setGastosCostos({
                      ...gastosCostos,
                      saldoVigente: moneyMask(v.target.value.toString()),
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

      {gastosCostos.destino.Descripcion && (
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
                /^[\s]*$/.test(gastosCostos.destino.Descripcion) ||
                /^[\s]*$/.test(gastosCostos.descripcion) ||
                gastosCostos.monto === "$ 0.00"
              }
              onClick={() => {
                addRows();
                if (gastosCostos.archivoDetalleInversion.nombreArchivo !== "") {
                  addDocumento({
                    archivo: gastosCostos.archivoDetalleInversion.archivo,
                    nombreArchivo:
                      gastosCostos.archivoDetalleInversion.nombreArchivo,
                    tipoArchivo: "",
                    descripcionTipo: "",
                  });
                }
                cleanGastosCostos();
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
        </Grid>
      )}

      <Grid
        // height={"40%"}
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
                {tablaGastosCostos.map((row: IGastosCostos, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.destino.Descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.detalleInversion.Descripcion}
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

                      <StyledTableCell align="center" component="th">
                        {row.gastosAdicionales}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.montoGastosAdicionales}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.saldoVigente}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        <Tooltip title={"Ver Documento"}>
                          <IconButton
                            onClick={() => {
                              toBase64(documentos[index].archivo)
                                .then((data) => {
                                  setFileSelected(data);
                                })
                                .catch((err) => {
                                  setFileSelected(
                                    `data:application/pdf;base64,${
                                      arrDocs.filter((td: any) =>
                                        td.NOMBREFORMATEADO.includes(
                                          row?.detalleInversion.Descripcion
                                        )
                                      )[0].FILE
                                    }`
                                  );
                                });

                              setShowModalPrevia(true);
                            }}
                          >
                            <FileOpenIcon></FileOpenIcon>
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            disabled={
                              reestructura === "con autorizacion" ||
                              reestructura === "sin autorizacion"
                            }
                            type="button"
                            onClick={() => removeGastosCostos(index)}
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

      <Dialog
        open={showModalPrevia}
        onClose={() => {
          setShowModalPrevia(false);
          setArrDocs([]);
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
  );
}
