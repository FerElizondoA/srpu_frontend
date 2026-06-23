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
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { ICondicionFinanciera } from "../../../store/CreditoCortoPlazo/condicion_financiera";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
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
import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";
import { moneyMask } from "./InformacionGeneral";

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
    useCortoPlazoStore((state) => state.tablaCondicionesFinancieras);

  const loadCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.loadCondicionFinanciera
  );

  const indexRegistro: number = useCortoPlazoStore(
    (state) => state.indexRegistro
  );
  const setIndexRegistro: Function = useCortoPlazoStore(
    (state) => state.setIndexRegistro
  );

  const [accion, setAccion] = useState("Agregar");

  const changeOpenAgregarState = (open: boolean) => {
    changeAgregarCondicion(open);
  };

  const removeCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.removeCondicionFinanciera
  );

  const [rowTasa, setRowTasa] = useState<Array<ITasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);
  const [rowDisposicion, setRowDisposicion] = useState<Array<IDisposicion>>([]);

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);
  const [openDisposicion, setOpenDisposicion] = useState(false);

  const [openFiltroMonto, setOpenFiltroMonto] = useState(false);

  const datosActualizar: Array<string> = useCortoPlazoStore(
    (state) => state.datosActualizar
  );

  const radioValue: number = useCortoPlazoStore((state) => state.radioValue);
  const setRadioValue: Function = useCortoPlazoStore(
    (state) => state.setRadioValue
  );

  let disable =
    datosActualizar.length < 0 &&
    (!datosActualizar.includes("Tabla Condiciones Financieras") ||
      !datosActualizar.includes("Monto Original Contratado"));

  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const [sumaTotal, setSumaTotal] = useState(0);

  const calcularSumaTotal = () => {
    const suma = tablaCondicionesFinancieras.reduce((acumulado, condicion) => {
      // Sumamos todos los importes de las disposiciones de la condición actual
      const sumaDisposicion = condicion.tasaInteres.reduce((sum, disp) => {
        return sum + parseFloat(disp.importe || '0'); // Convertir importe de string a número
      }, 0);
      console.log("acumulado + sumaDisposicion", acumulado, sumaDisposicion);

      return acumulado + sumaDisposicion; // Sumar al acumulado total

    }, 0);
    console.log("suma", suma);

    return suma;
  };

  // useEffect que se dispara cuando las condiciones financieras cambian
  useEffect(() => {
    const total = calcularSumaTotal();
    setSumaTotal(total);
    console.log("sumaTotal", sumaTotal)
  }, [tablaCondicionesFinancieras, !openFiltroMonto]);



  // useEffect(() => {
  //   const sumaTotal = tablaCondicionesFinancieras.disposicion.importe.map()
  //   setnumDisposicionTotal(tablaCondicionesFinancieras.disposicion.importe.map(heads, index) =>(

  //   ))

  //   console.log("tablaCondicionesFinancieras", tablaCondicionesFinancieras)

  // }, [tablaCondicionesFinancieras, !openFiltroMonto])




  return (
    <Grid
      container
      sx={{
        height: "30rem",
        "@media (min-width: 480px)": {
          height: "39rem",
        },

        "@media (min-width: 768px)": {
          height: "48rem",
        },

        "@media (min-width: 1140px)": {
          height: "31rem",
        },

        "@media (min-width: 1400px)": {
          height: "31rem",
        },

        "@media (min-width: 1870px)": {
          height: "44rem",
        },
      }}
    >
      <Grid container height={"100%"}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
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
                            disabled={disable}
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
                            new Date(row.tasaInteres[0].Disposiciones.fechaDisposicion),
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
                            console.log("ROW CONDICION FINANCIER COMPLETA", row)

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
                  <Typography
                    sx={{
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
                            <StyledTableCell key={index} align="center">
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowTasa.map((row, index) => {
                          console.log("|ROW TASA|", row)
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
                                {row?.sobreTasa === 0 || row?.sobreTasa === null || row?.sobreTasa.toString() === "N/A"
                                  ? row?.sobreTasa
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
                maxWidth={"xl"}
              >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  <Typography
                    sx={{
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
                  <Typography
                    sx={{
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
                                {row?.Disposiciones?.fechaIndicativa === true ? "Aplica" : "N/A"}
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
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ThemeProvider theme={buttonTheme}>
          <Button
            disabled={disable}
            // || moneyMask(monto.toString()) === "$ 0.00"
            sx={queries.buttonContinuar}
            variant="outlined"
            onClick={() => {
              if (moneyMask(monto.toString()) === "$ 0.00") {
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
