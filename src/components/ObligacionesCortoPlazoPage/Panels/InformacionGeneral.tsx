import { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  InputAdornment,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  TableRow,
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  hashFunctionCYRB53,
} from "../../CustomComponents";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import { subDays, addDays } from "date-fns/esm";
import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";
import { differenceInDays, startOfDay } from "date-fns";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { IInformacionGeneral } from "../../Interfaces/InterfacesCplazo/CortoPlazo/IEncabezado";

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Acción",
  },
  {
    label: "Obligado solidario / aval",
  },
  {
    label: "Tipo de ente público obligado",
  },
  {
    label: "Ente público obligado",
  },
];

export function InformacionGeneral() {
  // GET CATALOGOS
  const getDestinos: Function = useCortoPlazoStore(
    (state) => state.getDestinos
  );
  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );
  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const getObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.getObligadoSolidarioAval
  );

  // CATALOGOS
  const catalogoOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );
  const catalogoObligadoSolidarioAval: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoObligadoSolidarioAval
  );
  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );
  const catalogoDestinos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDestinos
  );
  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  // INFORMACION GENERAL
  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const fechaVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const plazo: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.plazo
  );
  const destino: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino
  );
  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );
  const denominacion: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const institucionFinanciera: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.informacionGeneral.institucionFinanciera
    );

  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );

  // OBLIGADO SOLIDARIO AVAL
  const generalObligadoSolidario: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.obligadoSolidario
    );
  const generalTipoEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.tipoEntePublicoObligado
    );
  const generalEntePublico: { Id: string; Descripcion: string } =
    useCortoPlazoStore(
      (state) => state.generalObligadoSolidarioAval.entePublicoObligado
    );

  // TABLA OBLIGADO SOLIDARIO AVAL
  const tablaObligados: any = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const changeObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.changeObligadoSolidarioAval
  );

  const removeObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.removeObligadoSolidarioAval
  );

  const addRows = () => {
    let tab = {
      obligadoSolidario: generalObligadoSolidario.Descripcion,
      tipoEntePublicoObligado: generalTipoEntePublico.Descripcion,
      entePublicoObligado: generalEntePublico.Descripcion,
    };
    addObligadoSolidarioAval(tab);
  };

  useEffect(() => {
    getInstituciones();
    getDestinos();
    getTipoEntePublicoObligado();
    getObligadoSolidarioAval();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (/^[\s]*$/.test(obligadoSolidarioAval.ObligadoSolidarioAval)) {
  //     changeTipoEntePublicoObligado("", "");
  //     changeEntePublicoObligado("", "");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [obligadoSolidarioAval]);

  const [contratacion, setContratacion] = useState(fechaContratacion);

  const [vencimiento, setVencimiento] = useState(fechaVencimiento);

  const [plazoD, setPlazo] = useState(0);

  useEffect(() => {
    const res = differenceInDays(
      startOfDay(new Date(vencimiento)),
      startOfDay(new Date(contratacion))
    );

    setPlazo(res);

    changeInformacionGeneral({
      fechaContratacion: contratacion,
      fechaVencimiento: vencimiento,
      plazo: res,
      destino: destino,
      monto: monto,
      denominacion: denominacion,
      institucionFinanciera: institucionFinanciera,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratacion, vencimiento]);

  return (
    <Grid container>
      <Grid
        item
        container
        mt={5}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={5}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(contratacion)}
              onChange={(date) => {
                setContratacion(date?.toString() || "");
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Plazo (Días)</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={plazoD}
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
            disabled
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Original Contratado
          </InputLabel>
          <TextField
            fullWidth
            value={monto}
            onChange={(v) =>
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: destino,
                monto: v.target.value,
                denominacion: denominacion,
                institucionFinanciera: institucionFinanciera,
              })
            }
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        mt={2}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={5}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(vencimiento)}
              onChange={(date) => setVencimiento(date?.toString() || "")}
              minDate={new Date(addDays(new Date(contratacion), 1))}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
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
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                monto: monto,
                denominacion: denominacion,
                institucionFinanciera: institucionFinanciera,
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <TextField
            fullWidth
            value={denominacion || ""}
            onChange={(v) =>
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: destino,
                monto: monto,
                denominacion: v.target.value,
                institucionFinanciera: institucionFinanciera,
              })
            }
            variant="standard"
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

      <Grid item container mt={2} ml={window.innerWidth / 50 - 13} spacing={5}>
        <Grid item lg={8.5} ml={window.outerWidth / 150}>
          <InputLabel sx={queries.medium_text}>
            Institución Financiera
          </InputLabel>
          <Autocomplete
            fullWidth
            options={catalogoInstituciones}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: institucionFinanciera.Id || "",
              Descripcion: institucionFinanciera.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeInformacionGeneral({
                fechaContratacion: contratacion,
                fechaVencimiento: vencimiento,
                plazo: plazo,
                destino: destino,
                monto: monto,
                denominacion: denominacion,
                institucionFinanciera: {
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
      </Grid>

      <Grid
        item
        container
        mt={{ xs: 10, sm: 2, md: 5, lg: 2 }}
        ml={38}
        spacing={5}
      >
        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Obligado Solidario / Aval
          </InputLabel>
          <Autocomplete
            fullWidth
            options={catalogoObligadoSolidarioAval}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalObligadoSolidario.Id || "",
              Descripcion: generalObligadoSolidario.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeObligadoSolidarioAval({
                obligadoSolidario: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                tipoEntePublicoObligado: {
                  Id: "",
                  Descripcion: "",
                },
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
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

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Tipo de ente público obligado
          </InputLabel>
          <Autocomplete
            disabled={
              generalObligadoSolidario.Descripcion === "No aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion)
            }
            fullWidth
            options={catalogoTipoEntePublicoObligado}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalTipoEntePublico.Id || "",
              Descripcion: generalTipoEntePublico.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeObligadoSolidarioAval({
                obligadoSolidario: generalObligadoSolidario,
                tipoEntePublicoObligado: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                entePublicoObligado: {
                  Id: "",
                  Descripcion: "",
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Ente público obligado
          </InputLabel>
          <Autocomplete
            disabled={
              generalObligadoSolidario.Descripcion === "No aplica" ||
              /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
              /^[\s]*$/.test(generalTipoEntePublico.Descripcion)
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) => td.IdTipoEntePublico === generalTipoEntePublico.Id
            )}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalEntePublico.Id || "",
              Descripcion: generalEntePublico.Descripcion || "",
            }}
            onChange={(event, text) =>
              changeObligadoSolidarioAval({
                obligadoSolidario: generalObligadoSolidario,
                tipoEntePublicoObligado: generalTipoEntePublico,
                entePublicoObligado: {
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

        <Grid item container>
          <Grid item lg={9}>
            <TableContainer sx={{ maxHeight: "200px" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {heads.map((head, index) => (
                      <StyledTableCell key={index}>
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {generalObligadoSolidario.Descripcion === "No aplica" ? (
                    <StyledTableRow>
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell>No aplica</StyledTableCell>
                      <StyledTableCell />
                    </StyledTableRow>
                  ) : (
                    tablaObligados.map((row: any, index: number) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            <Tooltip title="Eliminar">
                              <IconButton
                                type="button"
                                onClick={() =>
                                  removeObligadoSolidarioAval(index)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.obligadoSolidario}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.tipoEntePublicoObligado}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.entePublicoObligado}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item>
              <ConfirmButton
                disabled={
                  generalObligadoSolidario.Descripcion === "No aplica" ||
                  /^[\s]*$/.test(generalObligadoSolidario.Descripcion) ||
                  /^[\s]*$/.test(generalTipoEntePublico.Descripcion) ||
                  /^[\s]*$/.test(generalEntePublico.Descripcion)
                }
                variant="outlined"
                onClick={() => addRows()}
              >
                AGREGAR
              </ConfirmButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
