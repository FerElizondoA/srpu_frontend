import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { ICondicionFinanciera } from "../../../store/CreditoCortoPlazo/condicion_financiera";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, lightFormat } from "date-fns";

import CloseIcon from "@mui/icons-material/Close";
import { queries } from "../../../queries";
import {
  IDisposicion,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import { IComisiones } from "../../../store/CreditoCortoPlazo/tasa_efectiva";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { AgregarCondicionFinanciera } from "../Dialog/AgregarCondicionFinanciera";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";

export const headsTasa: readonly {
  label: string;
}[] = [
    {
      label: "Fecha de Primer Pago",
    },
    {
      label: "Tasa Fija",
    },
    {
      label: "Periodicidad de Pago",
    },
    {
      label: "Tasa de Referencia",
    },
    {
      label: "Sobretasa",
    },
    {
      label: "Dias del Ejercicio",
    },
  ];

export const headsComision: readonly {
  label: string;
}[] = [
    {
      label: "Tipo de comisión",
    },
    {
      label: "Descripción de la Comisión",
    },
    {
      label: "Fecha de primer pago",
    },
    {
      label: "Periodicidad de Pago",
    },
    {
      label: "Detalle del Perfil Específico",
    },
    {
      label: "Porcentaje",
    },
    {
      label: "Monto",
    },
    {
      label: "IVA",
    },
  ];

export const headsDisposicion: readonly {
  label: string;
}[] = [
    {
      label: "Fecha de Disposición",
    },
    {
      label: "Fecha Indicativa",
    },
    {
      label: "Importe de disposición",
    },
  ];

const heads: readonly {
  label: string;
}[] = [
    {
      label: "Acciones",
    },
    {
      label: "Fecha Disposición",
    },
    {
      label: "Importe de disposición",
    },
    {
      label: "Fecha de Primer Pago Capital",
    },
    {
      label: "Periodicidad de Pago Capital",
    },
    {
      label: "Fecha de Primer Pago de Interés",
    },
    {
      label: "Tasa de Interés",
    },
    {
      label: "Comisiones",
    },
    {
      label: "Periodo de Gracia",
    },
  ];

export function CondicionesFinancieras() {
  const [openAgregarCondicion, changeAgregarCondicion] = useState(false);

  const tablaCondicionesFinancieras: ICondicionFinanciera[] =
    useLargoPlazoStore((state) => state.tablaCondicionesFinancieras);

  const loadCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.loadCondicionFinanciera
  );

  const indexRegistro: number = useLargoPlazoStore(
    (state) => state.indexRegistro
  );
  const setIndexRegistro: Function = useLargoPlazoStore(
    (state) => state.setIndexRegistro
  );

  const [accion, setAccion] = useState("Agregar");

  const changeOpenAgregarState = (open: boolean) => {
    changeAgregarCondicion(open);
  };

  const removeCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.removeCondicionFinanciera
  );

  const [rowTasa, setRowTasa] = useState<Array<ITasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);
  const [rowDisposicion, setRowDisposicion] = useState<Array<IDisposicion>>([]);

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);
  const [openDisposicion, setOpenDisposicion] = useState(false);


  const [openFiltroMonto, setOpenFiltroMonto] = useState(false);

  const datosActualizar: Array<string> = useLargoPlazoStore(
    (state) => state.datosActualizar
  );

  const radioValue: number = useLargoPlazoStore((state) => state.radioValue);
  const setRadioValue: Function = useLargoPlazoStore(
    (state) => state.setRadioValue
  );

  let disable =
    datosActualizar.length > 0 &&
    !datosActualizar.includes("Tabla Condiciones Financieras");

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const [sumaTotal, setSumaTotal] = useState(0);

  const calcularSumaTotal = () => {
    const suma = tablaCondicionesFinancieras.reduce((acumulado, condicion) => {
      const sumaDisposicion = condicion.tasaInteres.reduce((sum, disp) => {
        return sum + parseFloat(disp.importe || '0');
      }, 0);
      return acumulado + sumaDisposicion;
    }, 0);
    return suma;
  };

  useEffect(() => {
    const total = calcularSumaTotal();
    setSumaTotal(total);
  }, [tablaCondicionesFinancieras, !openFiltroMonto]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid container flexGrow={1} minHeight={0}>
        <Paper elevation={3} sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", borderRadius: 2 }}>
          <TableContainer
            sx={{
              width: "100%",
              flexGrow: 1,
              minHeight: {
                xs: "20rem",
                sm: "25rem",
                md: "25rem",
                lg: "28rem",
                xl: "30rem",
                "@media (min-width: 1870px)": {
                  minHeight: "38rem",
                },
              },
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography
                        sx={{
                          fontSize: ".8rem",
                          "@media (min-width: 480px)": {
                            fontSize: "1rem",
                          },
                        }}
                      >
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaCondicionesFinancieras.map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">
                        <Tooltip title="Editar">
                          <IconButton
                            disabled={disable}
                            type="button"
                            onClick={() => {
                              setAccion("Editar");

                              changeOpenAgregarState(!openAgregarCondicion);
                              setIndexRegistro(index);
                              loadCondicionFinanciera(row);
                              setRadioValue(row.tasaInteres[0].tasaFija === "N/A" ? 2 : 1)
                              console.log("row", row)

                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            disabled={disable ||
                              (reestructura === "con autorizacion" ||
                                reestructura === "sin autorizacion"
                              )}
                            type="button"
                            onClick={() => {
                              removeCondicionFinanciera(index);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.tasaInteres.length > 1
                          ? null
                          : format(
                            new Date(row.tasaInteres[0].Disposiciones?.fechaDisposicion),
                            "dd/MM/yyyy"
                          )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.tasaInteres.length > 1 ? (
                          <Button
                            onClick={() => {
                              setRowTasa(row.tasaInteres);
                              setOpenDisposicion(true);
                            }}
                          >
                            <InfoOutlinedIcon />
                          </Button>
                        ) : (
                          row.tasaInteres[0].importe
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {format(
                          new Date(row.pagosDeCapital.fechaPrimerPago),
                          "dd/MM/yyyy"
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {row.pagosDeCapital.periodicidadDePago.Descripcion}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {format(
                          new Date(row.pagosDeCapital.fechaPrimerPago),
                          "dd/MM/yyyy"
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        <Button
                          onClick={() => {
                            setRowTasa(row.tasaInteres);
                            setOpenTasa(true);
                          }}
                        >
                          <InfoOutlinedIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {
                          <Button
                            onClick={() => {
                              setRowComision(row.comisiones);
                              setOpenComision(true);
                            }}
                          >
                            <InfoOutlinedIcon />
                          </Button>
                        }
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                      >
                        {row.pagosDeCapital.periodoGracia === true ? "Aplica" : "N/A"}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>

              <Dialog
                open={openTasa}
                onClose={() => {
                  setOpenTasa(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <Typography sx={{
                    ...queries.bold_text_Titulos,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center"
                  }}>
                    Tasa de Interés
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpenTasa(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer sx={{ maxHeight: "400px" }}>
                    <Table>
                      <TableHead sx={{ maxHeight: "200px" }}>
                        <TableRow>
                          {headsTasa.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowTasa.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row" align="center">
                                {lightFormat(
                                  new Date(row?.fechaPrimerPago),
                                  "dd-MM-yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.tasaFija === "" ? "N/A" : row?.tasaFija}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.periocidadPago?.Descripcion}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.tasaReferencia?.Descripcion || "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.sobreTasa === "" || row?.sobreTasa === null || row?.sobreTasa.toString() === "N/A"
                                  ? row?.sobreTasa === "" ? "N/A" : row?.sobreTasa + "%"
                                  : row?.sobreTasa + "%"
                                }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.diasEjercicio?.Descripcion}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openComision}
                onClose={() => {
                  setOpenComision(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <Typography sx={{
                    ...queries.bold_text_Titulos,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center"
                  }}>
                    Comisiones
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpenComision(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsComision.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowComision.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row" align="center">
                                {row?.tipoDeComision?.Descripcion || "N/A"}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row" align="center">
                                {row?.tipoDeComision?.detallOtrasComisiones || "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.fechaComision !== "N/A"
                                  ? format(
                                    new Date(row?.fechaComision),
                                    "dd/MM/yyyy"
                                  )
                                  : "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.periodicidadDePago?.Descripcion || "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.periodicidadDePago?.detallePerfilEspecifico || "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.porcentaje} %
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.monto}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.iva === true ? "Aplica" : "N/A"}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openDisposicion}
                onClose={() => {
                  setOpenDisposicion(false);
                }}
                maxWidth={"lg"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <Typography sx={{
                    ...queries.bold_text_Titulos,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center"
                  }}>
                    Importe de disposición
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpenDisposicion(false);
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
                <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsDisposicion.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowTasa.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">
                                {row?.Disposiciones?.fechaDisposicion}
                              </StyledTableCell>
                               <StyledTableCell align="center">
                                {row?.Disposiciones?.fechaIndicativa === true ? "Aplica": "N/A"}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.importe}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
              </Dialog>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid
        container
        item
        md={12}
        lg={12}
        height={"4rem"}
        flexShrink={0}
        mt={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={disable || reestructura === "con autorizacion"}
            sx={queries.buttonContinuar}
            variant="outlined"
            onClick={() => {
              if (moneyMask(monto.toString()) === "$0.00") {
                setOpenFiltroMonto(true)
              } else {
                changeOpenAgregarState(!openAgregarCondicion);
                setAccion("Agregar");
              }
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>


        <Dialog open={openFiltroMonto}>
          <DialogTitle>
            <Typography sx={{
              fontSize: "1.2rem",
              fontFamily: "MontserratBold",
            }}>
              Falta de informacion
            </Typography>
          </DialogTitle>


          <DialogContent>
            <Typography sx={{
              ...queries.text,
              color: "red"

            }}>
              * Favor de Ingresar <strong>Monto Original</strong> contratado en informacion general
            </Typography>
          </DialogContent>


          <DialogActions>
            <Button sx={queries.buttonCancelar}
              onClick={() => {
                setOpenFiltroMonto(false)
              }}
            >
              Cerrar
            </Button>

          </DialogActions>

        </Dialog>

        <AgregarCondicionFinanciera
          handler={changeOpenAgregarState}
          openState={openAgregarCondicion}
          accion={accion}
          indexA={indexRegistro}
        />
      </Grid>
    </Grid>
  );
}
