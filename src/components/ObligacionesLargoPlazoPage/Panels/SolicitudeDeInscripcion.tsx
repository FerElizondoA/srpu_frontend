import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

export let erroresValidacion: string[] = [];

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Selección",
  },
  {
    label: "Regla",
  },
];
export let errores: string[] = [];

export function SolicituDeInscripcion() {
  const [checkObj, setCheckObj] = useState<checkBoxType>({});

  // eslint-disable-next-line @typescript-eslint/no-array-constructor

  const nombreServidorPublico: string = useLargoPlazoStore(
    (state) => state.inscripcion.servidorPublicoDirigido
  );
  const cargoServidorPublico: string = useLargoPlazoStore(
    (state) => state.inscripcion.cargo
  );
  const solicitanteAutorizado: string = useLargoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const catalogoReglas: ICatalogo[] = useLargoPlazoStore(
    (state) => state.catalogoReglas
  );
  const changeReglasAplicables: Function = useLargoPlazoStore(
    (state) => state.changeReglasAplicables
  );
  const reglasAplicables: string[] = useLargoPlazoStore(
    (state) => state.reglasAplicables
  );
  const getReglas: Function = useLargoPlazoStore((state) => state.getReglas);

  const [openDialogValidacion, setOpenDialogValidacion] = useState(false);

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let arrReglas: Array<string> = [];
  arrReglas = reglasAplicables;

  const removeRegla = (descripcion: string) => {
    let aux: Array<string> = [];
    arrReglas.map((regla, index) => {
      if (regla !== descripcion) {
        return aux.push(regla);
      } else {
        return null;
      }
    });
    arrReglas = aux;
    changeReglasAplicables(arrReglas);
  };
  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 974px)"),
  };
  return (
    <Grid container>
      <Grid
        width={"100%"}
        item
        container
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>
            Servidor público a quien va dirigido:
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={nombreServidorPublico}
            disabled
            sx={queries.medium_text}
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
          />
        </Grid>

        <Grid item xs={10} sm={5} md={4} lg={4} xl={4}>
          <InputLabel sx={queries.medium_text}>Cargo</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={cargoServidorPublico}
            // onChange={(text) => changeCargo(text.target.value)}
            disabled
            sx={queries.medium_text}
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
          />
        </Grid>
      </Grid>

      <Grid item container mt={2} mb={2} justifyContent={"center"}>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={
              solicitanteAutorizado || localStorage.getItem("NombreUsuario")
            }
            // onChange={(text) => changeSolicitanteAutorizado(text.target.value)}
            sx={queries.medium_text}
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
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"flex-start"}
        width={"100%"}
      >
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <Divider
            sx={{
              fontWeight: "bold",
              fontFamily: "MontserratMedium",
              width: "100%",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1.4ch",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            Declaratorias Aplicables al Financiamiento u Obligación:
          </Divider>
        </Grid>

        <Grid
          container
          xs={10}
          sm={11}
          md={10}
          lg={10}
          xl={9}
          display="flex"
          width={"100%"}
        >
          <Grid width={"100%"}>
            <Typography
              sx={{
                "@media (max-width: 600px)": {
                  // XS (extra small) screen
                  fontSize: "1.4ch",
                },
                "@media (min-width: 601px) and (max-width: 900px)": {
                  // SM (small) screen
                  fontSize: "1.5ch",
                },
              }}
            >
              Al seleccionar alguna de las siguientes secciones, estará
              manifestando bajo protesta de decir verdad que cumple con lo
              señalado en cada apartado
            </Typography>

            <Grid container={query.isMobile} display={"flex"} width={"100%"}>
              <Grid width={"100%"}>
                <TableContainer
                  sx={{
                    ...queries.tablaSolicitudInscripcion,
                    width: "100%",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            <TableSortLabel>{head.label}</TableSortLabel>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {catalogoReglas.map((row, index) => {
                        // const stringIndex = index.toString()
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                checked={reglasAplicables.includes(
                                  row.Descripcion
                                )}
                                disabled={
                                  (checkObj[1] === true && index === 2) ||
                                  (checkObj[2] === true && index === 1) ||
                                  (checkObj[3] === true && index === 4) ||
                                  (checkObj[4] === true && index === 3)
                                }
                                onChange={(v) => {
                                  v.target.checked
                                    ? setCheckObj({
                                        ...checkObj,
                                        [index]: true,
                                      })
                                    : setCheckObj({
                                        ...checkObj,
                                        [index]: false,
                                      });

                                  v.target.checked
                                    ? arrReglas.push(row.Descripcion)
                                    : removeRegla(row.Descripcion);
                                  changeReglasAplicables(arrReglas);
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>{row.Descripcion}</StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* {localStorage.getItem("Rol") !== "Administrador" ? ( //BOTONES**************
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    ml: 2,
                    height: "7rem",
                    "@media (max-width: 974px)": {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    },
                    "@media (min-width: 974.1px)": {
                      flexDirection: "column",
                      justifyContent: "end",
                      height: "22rem",
                      width: "10%",
                    },

                    "@media (min-width: 1140px)": {
                      flexDirection: "column",
                      justifyContent: "end",
                      height: "22rem",
                      width: "10%",
                    },

                    "@media (min-width: 1400px)": {
                      width: "10%",
                    },

                    "@media (min-width: 1870px)": {
                      width: "5%",
                      height: "35rem",
                    },
                  }}
                >
                  <Grid
                    mb={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      onClick={() => {
                        setOpenDialogCancelar(!openDialogCancelar);
                      }}
                      sx={{ ...queries.buttonCancelarSolicitudInscripcion }}
                    >
                      Cancelar
                    </Button>
                  </Grid>

                  {localStorage.getItem("Rol") === "Verificador" ? (
                    <Grid
                      mb={2}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        sx={queries.buttonContinuarSolicitudInscripcion}
                        onClick={() => {
                          infoValidaciones("Modificacion");
                        }}
                      >
                        Solicitar Modificación
                      </Button>
                    </Grid>
                  ) : null}


                  <Grid
                    mb={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      sx={queries.buttonContinuarSolicitudInscripcion}
                      onClick={() => {
                        infoValidaciones("Enviar");
                      }}
                    >
                      {localStorage.getItem("Rol") === "Verificador"
                        ? "Finalizar"
                        : "Enviar"}
                    </Button>
                  </Grid>

                  <ConfirmacionBorradorSolicitud
                    handler={setOpenDialogBorrador}
                    openState={openDialogBorrador}
                  />
                  <ConfirmacionDescargaSolicitud
                    handler={setOpenDialogEnviar}
                    openState={openDialogEnviar}
                  />
                  <ConfirmacionCancelarSolicitud
                    handler={setOpenDialogCancelar}
                    openState={openDialogCancelar}
                  />
                  {openDialogModificacion && (
                    <DialogSolicitarModificacion
                      handler={setOpenDialogModificacion}
                      openState={openDialogModificacion}
                    />
                  )}
                </Grid>
              ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openDialogValidacion}>
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            Favor de revisar los siguientes apartados:
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}
        >
          {erroresValidacion?.map((item, index) => {
            const division = item.indexOf(":");

            const markedText =
              division !== -1 ? item.substring(0, division + 1) : item;

            const restText =
              division !== -1 ? item.substring(division + 1) : "";

            return (
              <Typography color={"red"} sx={{ fontSize: ".9rem" }}>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  *{markedText}
                </span>

                <span style={{ color: "red" }}>
                  {restText} <br /> <br />
                </span>
              </Typography>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogValidacion(!openDialogValidacion);
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
