import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import {
  IBeneficiarioFideicomiso,
  IDeudorFideicomiso,
  IDeudorFideicomisoNew,
} from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { TableRows } from "@mui/icons-material";

interface HeadLabels {
  label: string;
}

const heads: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Fideicomitente",
  },
  {
    label: "Fideicomitente",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado al Fideicomiso del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado al Fideicomiso del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label: "% Afectado al Fideicomiso del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
  {
    label: "",
  },
];

const headsNews: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Fuente",
  },
  {
    label: "Fondo o Ingreso",
  },
  {
    label: "Fideicomitente",
  },
  {
    label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
  },
  {
    label: "Eliminar",
  },
];

export function TipoDeMovimientoFideicomiso() {
  const tipoMovimientoFideicomiso: IDeudorFideicomiso = useFideicomisoStore(
    (state) => state.tipoMovimientoFideicomiso
  );

  const beneficiario: IBeneficiarioFideicomiso = useFideicomisoStore(
    (state) => state.beneficiario
  );

  const tablaTipoMovimiento: IDeudorFideicomiso[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimientoFideicomiso
  );

  const setTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.setTipoMovimiento
  );

  const setBeneficiario: Function = useFideicomisoStore(
    (state) => state.setBeneficiario
  );

  //catalogo
  const catalogoOrganismos: any = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const catalogoTIpoFideicomitente: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<IFondoOIngreso> = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const addTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.addTipoMovimiento
  );
  const removeTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.removeTipoMovimiento
  );
  const cleanTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.cleanTipoMovimiento
  );

  const [movimiento, setMovimiento] = useState("DEUDOR");

  const addPorcentaje: Function = useFideicomisoStore(
    (state) => state.addPorcentaje
  );

  const idTipoMovimientoSelect: string = useFideicomisoStore(
    (state) => state.idTipoMovimientoSelect
  );

  const setIdTipoMovimientoSelect: Function = useFideicomisoStore(
    (state) => state.setIdTipoMovimientoSelect
  );

  // const ids: string[] = tablaTipoMovimiento.map((row) => {
  //   return row.id;
  // });


  //NUEVA TABLA
  const tablaTipoMovimientoFideicomisoNew: IDeudorFideicomisoNew[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimientoFideicomisoNew
  );

  const ids: string[] = tablaTipoMovimientoFideicomisoNew.map((row) => {
    return row.id;
  });


  const setTipoMovimientoNew: Function = useFideicomisoStore(
    (state) => state.setTipoMovimientoNew
  );


  const addTipoMovimientoNew: Function = useFideicomisoStore(
    (state) => state.addTipoMovimientoNew
  );
  const removeTipoMovimientoNew: Function = useFideicomisoStore(
    (state) => state.removeTipoMovimientoNew
  );
  const cleanTipoMovimientoNew: Function = useFideicomisoStore(
    (state) => state.cleanTipoMovimientoNew
  );

  const tipoMovimientoFideicomisoNew: IDeudorFideicomisoNew = useFideicomisoStore(
    (state) => state.tipoMovimientoFideicomisoNew
  );

  const beneficiarioNew: IBeneficiarioFideicomiso = useFideicomisoStore(
    (state) => state.beneficiarioNew
  );

  const setBeneficiarioNew: Function = useFideicomisoStore(
    (state) => state.setBeneficiarioNew
  );


  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const buttonAgregar = () => {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Button
          disabled={
            tipoMovimientoFideicomiso.tipoFideicomitente.Id === "" ||
            tipoMovimientoFideicomiso.fideicomitente.Id === "" ||
            tipoMovimientoFideicomiso.tipoFuente.Id === "" ||
            tipoMovimientoFideicomiso.fondoIngreso.Id === ""
          }
          sx={{
            ...queries.buttonContinuar,
            width: "15vh",
          }}
          onClick={() => {
            // addTipoMovimiento({
            //   id: tipoMovimientoFideicomiso.id,
            //   tipoFideicomitente: tipoMovimientoFideicomiso.tipoFideicomitente,
            //   fideicomitente: tipoMovimientoFideicomiso.fideicomitente,
            //   tipoFuente: tipoMovimientoFideicomiso.tipoFuente,
            //   fondoIngreso: tipoMovimientoFideicomiso.fondoIngreso,
            //   fondoIngresoGobiernoEstatal:
            //     tipoMovimientoFideicomiso.tipoFuente.Descripcion.toLowerCase() ===
            //       "participaciones"
            //       ? "80.00"
            //       : "100.00",
            //   fondoIngresoMunicipios:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "municipio"
            //       ? tipoMovimientoFideicomiso.tipoFuente.Descripcion.toLowerCase() ===
            //         "participaciones"
            //         ? "20.00"
            //         : "0.00"
            //       : "0.00",
            //   fondoIngresoAsignadoMunicipio:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "municipio"
            //       ? "100.00"
            //       : "0.00",
            //   ingresoOrganismo:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "municipio" &&
            //       tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "gobierno estatal"
            //       ? "0.00"
            //       : "0.00",
            //   fondoIngresoAfectadoXGobiernoEstatal:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "gobierno estatal"
            //       ? ""
            //       : "",
            //   afectacionGobiernoEstatalEntre100:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "gobierno estatal"
            //       ? "0.00"
            //       : "",
            //   acumuladoAfectacionGobiernoEstatalEntre100:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "gobierno estatal"
            //       ? sumaPorcentajeAcumulado.SumaAcumuladoEstado
            //       : "",
            //   fondoIngresoAfectadoXMunicipio:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "municipio"
            //       ? "0"
            //       : "0",
            //   acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() ===
            //       "municipio"
            //       ? sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
            //       : "",
            //   ingresoAfectadoXOrganismo:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "municipio" &&
            //       tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "gobierno estatal"
            //       ? ""
            //       : "",
            //   acumuladoAfectacionOrganismoEntre100:
            //     tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "municipio" &&
            //       tipoMovimientoFideicomiso.tipoFideicomitente.Descripcion.toLowerCase() !==
            //       "gobierno estatal"
            //       ? sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
            //       : "",
            // });


            cleanTipoMovimiento();
          }}
        >
          Agregar
        </Button>
      </ThemeProvider>
    );
  };


  const buttonAgregarNew = () => {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Button
          disabled={
            tipoMovimientoFideicomisoNew.tipoFideicomitente.Id === "" ||
            tipoMovimientoFideicomisoNew.fideicomitente.Id === "" ||
            tipoMovimientoFideicomisoNew.tipoFuente.Id === "" ||
            tipoMovimientoFideicomisoNew.fondoIngreso.Id === ""
          }
          sx={{
            ...queries.buttonContinuar,
            width: "15vh",
          }}
          onClick={() => {
            addTipoMovimientoNew({
              id: tipoMovimientoFideicomisoNew.id,
              tipoFideicomitente: tipoMovimientoFideicomisoNew.tipoFideicomitente,
              fideicomitente: tipoMovimientoFideicomisoNew.fideicomitente,
              tipoFuente: tipoMovimientoFideicomisoNew.tipoFuente,
              fondoIngreso: tipoMovimientoFideicomisoNew.fondoIngreso,
            });


            cleanTipoMovimientoNew();
          }}
        >
          Agregar
        </Button>
      </ThemeProvider>
    );
  };

  useEffect(() => {
    console.log("TipoMovimientoFideicomisoNew", tipoMovimientoFideicomisoNew);
  }, [tipoMovimientoFideicomisoNew])


  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      sx={{
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
      <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RadioGroup
          value={movimiento}
          onChange={(v) => {
            setMovimiento(v.target.value);
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            sx={{ ...queries.medium_text }}
            value="DEUDOR"
            control={<Radio />}
            label="Alta de Fideicomitente"
          />
          {tablaTipoMovimientoFideicomisoNew.length > 0 && (
            <FormControlLabel
              sx={{ ...queries.medium_text }}
              value="BENEFICIARIO"
              control={<Radio />}
              label="Alta de Beneficiario"
            />
          )}
        </RadioGroup>
      </Grid>

      <Grid item
        mb={{ xs: 2, sm: 2, md: 1, lg: 1, xl: 0 }}
      >
        <Divider >
          <Typography
            sx={{
              ...queries.bold_text_Titulos,
              color: "#af8c55 ",
            }}
          >
            FIDEICOMITENTE
          </Typography>
        </Divider>
      </Grid>


      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        // height={{ xs: "18rem", sm: "22rem", md: "22rem", lg: "22rem", xl: "22rem" }}
        mt={2}
      >
        {movimiento === "BENEFICIARIO" ? (
          <Grid
            item
            xs={10}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 4, sm: 0, md: 0, lg: 0 }
                : { xs: 0, sm: 0 }
            }
          >
            <InputLabel sx={queries.medium_text}>Id</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={ids}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    <Typography>{option}</Typography>
                  </li>
                );
              }}
              value={idTipoMovimientoSelect}
              onChange={(event, text) => {
                let row = tablaTipoMovimientoFideicomisoNew.filter((_) => _.id === text)[0];

                setIdTipoMovimientoSelect(text);
                setTipoMovimientoNew(row);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
          </Grid>
        ) : null}

        {/* AQUI EMPIEZA CUESTIONARIO FIDEICOMISO */}
        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 10 : 3}
          md={movimiento === "DEUDOR" ? 10 : 3}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mb={
            movimiento === "BENEFICIARIO"
              ? { xs: 4, sm: 0, md: 0 }
              : { xs: 2, sm: 0, md: 0 }
          }
        >
          <InputLabel sx={queries.medium_text}>
            Tipo de Fideicomitente
          </InputLabel>

          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoTIpoFideicomitente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography sx={{ ...queries.medium_text }}>
                    {option.Descripcion}
                  </Typography>
                </li>
              );
            }}
            value={tipoMovimientoFideicomisoNew.tipoFideicomitente}
            onChange={(event, text) => {
              setTipoMovimientoNew({
                ...tipoMovimientoFideicomisoNew,
                tipoFideicomitente: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
                fideicomitente: {
                  Id: "",
                  Descripcion: "",
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={{ ...queries.medium_text }}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 10 : 3}
          md={movimiento === "DEUDOR" ? 10 : 3}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mb={
            movimiento === "BENEFICIARIO" ? { xs: 0, sm: 0, md: 0 } : { xs: 2, sm: 0, }
          }
        >
          <InputLabel sx={queries.medium_text}>Fideicomitente</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              tipoMovimientoFideicomisoNew.tipoFideicomitente.Descripcion ===
              "No Aplica" ||
              /^[\s]*$/.test(
                tipoMovimientoFideicomisoNew.tipoFideicomitente.Descripcion
              )
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) =>
                td.IdTipoEntePublico ===
                tipoMovimientoFideicomisoNew.tipoFideicomitente.Id
            )}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setTipoMovimientoNew({
                ...tipoMovimientoFideicomisoNew,
                fideicomitente: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            value={tipoMovimientoFideicomisoNew.fideicomitente}
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
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 10 : 4}
          md={movimiento === "DEUDOR" ? 10 : 4}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mt={
            movimiento === "BENEFICIARIO" ? { xs: 4, sm: 0 } : { xs: 1, sm: 1 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Tipo de Fuente
          </InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={tipoMovimientoFideicomisoNew.tipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setTipoMovimientoNew({
                ...tipoMovimientoFideicomisoNew,
                tipoFuente: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
                fondoIngreso: {
                  Id: "",
                  Descripcion: "",
                  TipoDeFuente: "",
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          xs={10}
          sm={movimiento === "DEUDOR" ? 10 : 4}
          md={movimiento === "DEUDOR" ? 10 : 4}
          lg={movimiento === "DEUDOR" ? 5 : 3}
          xl={movimiento === "DEUDOR" ? 5 : 3}
          mb={4}
          mt={
            movimiento === "BENEFICIARIO" ? { xs: 4, sm: 4 } : { xs: 5, sm: 4, md: 4 }
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fondo o Ingreso
          </InputLabel>
          <Autocomplete
            disabled={tipoMovimientoFideicomisoNew.tipoFuente?.Id === ""}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFondosOIngresos?.filter(
              (td) =>
                td.TipoDeFuente === tipoMovimientoFideicomisoNew.tipoFuente?.Id
            )}
            value={tipoMovimientoFideicomisoNew.fondoIngreso}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              // setTipoMovimiento({
              //   ...tipoMovimientoFideicomiso,
              //   id: `${tipoMovimientoFideicomiso.tipoFuente?.Descripcion
              //     }/${text.Descripcion.split(" ")
              //       .map((word) =>
              //         word.charAt(0) === word.charAt(0).toUpperCase()
              //           ? word.charAt(0)
              //           : ""
              //       )
              //       .join("")}/${tablaTipoMovimiento?.length + 1}`,
              //   fondoIngreso: {
              //     Id: text.Id,
              //     Descripcion: text.Descripcion,
              //     TipoDeFuente: text.TipoDeFuente,
              //   },
              // });
              setTipoMovimientoNew({
                ...tipoMovimientoFideicomisoNew,
                id: `${tipoMovimientoFideicomisoNew.tipoFuente?.Descripcion
                  }/${text.Descripcion.split(" ")
                    .map((word) =>
                      word.charAt(0) === word.charAt(0).toUpperCase()
                        ? word.charAt(0)
                        : ""
                    )
                    .join("")}/${tablaTipoMovimientoFideicomisoNew?.length + 1}`,
                fondoIngreso: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                  TipoDeFuente: text.TipoDeFuente,
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>
      </Grid>

      {movimiento === "DEUDOR" && (
        <Grid
          item
          mt={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {buttonAgregarNew()}
        </Grid>
      )}

      {movimiento === "BENEFICIARIO" && (
        <Divider sx={{ mb: 2 }}>
          <Typography
            sx={{
              ...queries.bold_text,
              color: "#af8c55 ",
            }}
          >
            Beneficiario
          </Typography>
        </Divider>
      )}

      {movimiento === "BENEFICIARIO" && (
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={5} md={5} lg={3} xl={3}
            mb={{ xs: 2, sm: 0 }}
          >
            <InputLabel sx={queries.medium_text}>
              Tipo de Beneficiario
            </InputLabel>

            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoTIpoFideicomitente}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography sx={{ ...queries.medium_text }}>
                      {option.Descripcion}
                    </Typography>
                  </li>
                );
              }}
              value={beneficiario.tipoBeneficiario}
              onChange={(event, text) => {
                setBeneficiario({
                  ...beneficiario,
                  tipoBeneficiario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                  fideicomitente: {
                    Id: "",
                    Descripcion: "",
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={{ ...queries.medium_text }}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>

          <Grid item xs={10} sm={5} md={5} lg={3} xl={3}
            mb={{ xs: 2, sm: 0 }}
          >
            <InputLabel sx={queries.medium_text}>Beneficiario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                beneficiario.tipoBeneficiario.Descripcion === "No Aplica" ||
                /^[\s]*$/.test(beneficiario.tipoBeneficiario.Descripcion)
              }
              fullWidth
              options={catalogoOrganismos.filter(
                (td: any) =>
                  td.IdTipoEntePublico === beneficiario.tipoBeneficiario.Id
              )}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                setBeneficiario({
                  ...beneficiario,
                  beneficiario: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                  },
                });
              }}
              value={beneficiario.beneficiario}
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
            sm={8}
            md={5}
            lg={3}
            xl={3}
            mt={{ xs: 2, sm: 2, md: 0 }}
            mb={{ xs: 2, sm: 0 }}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de Alta
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                sx={{
                  width: "100%",
                }}
                value={beneficiario.fechaAlta}
                onChange={(v) => {
                  setBeneficiario({
                    ...beneficiario,
                    fechaAlta: v,
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            mt={2}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {buttonAgregarNew()}
          </Grid>
        </Grid>
      )}

      <Grid container
        mt={3} mb={2}
        display={"flex"}
        justifyContent={"center"}
        height={movimiento === "DEUDOR" ? "30rem" : "24rem"}
      >
        <Paper sx={{ width: "95%", height: "100%" }}>

          <TableContainer
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
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
                  {headsNews.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimientoFideicomisoNew.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      {/* ID */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      {/* TIPO MANDANTE  */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.tipoFuente.Descripcion}
                          {/* {row?.tipoFideicomitente.Descripcion} */}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngreso.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* fideicomitente  */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fideicomitente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <TextField />
                        {/* <Typography sx={{ fontSize: "0.7rem" }}>
                          
                          {row?.tipoFuente.Descripcion} 
                        </Typography> */}
                      </StyledTableCell>

                      {/* FUENTE DE PAGO  */}
                      <StyledTableCell align="center">
                        <TextField />
                        {/* <Typography sx={{ fontSize: "0.7rem" }}>
                          
                          {row?.tipoFuente.Descripcion} 
                        </Typography> */}
                      </StyledTableCell>


                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              //let auxArray = [...tablaTipoMovimientoFideicomisoNew];

                              //addPorcentaje(auxArray);
                              removeTipoMovimientoNew(index);
                            }}
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



          {/* <TableContainer
            sx={{
              height: "100%",
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
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimiento.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                       ID
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      TIPO MANDANTE 
                      <StyledTableCell align="center"> 
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.tipoFideicomitente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                       fideicomitente 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fideicomitente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      FUENTE DE PAGO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.tipoFuente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                       FONDO INGRESO GOBIERNO ESTATAL 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoGobiernoEstatal}
                        </Typography>
                      </StyledTableCell>

                    FONDO INGRESO MUNICIPIOS
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoMunicipios}
                        </Typography>
                      </StyledTableCell>

                      FONDO INGRESO MUNICIPIO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoAsignadoMunicipio}
                        </Typography>
                      </StyledTableCell>

                      INGRESO ORGANISMO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.ingresoOrganismo}
                        </Typography>
                      </StyledTableCell>

                      AFECTADO POR GOBIERNO ESTATAL
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "gobierno estatal" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .fondoIngresoGobiernoEstatal
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXGobiernoEstatal
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                        )
                                      ).toString());
                                  });

                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXGobiernoEstatal =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                    AFECTACION GOBIERNO ESTATAL / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.afectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                     ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                       AFECTADO POR MUNICIPIO 
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .fondoIngresoAsignadoMunicipio
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXMunicipio
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                        )
                                      ).toString());
                                  });

                                  auxArray[index].fondoIngresoAfectadoXMunicipio =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                      ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "municipio" && (
                            <Typography sx={{ fontSize: "0.7rem" }}>
                              {
                                row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                              }
                            </Typography>
                          )}
                      </StyledTableCell>

                      AFECTADO POR ORGANISMO 
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                          "gobierno estatal" &&
                          row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                          "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.ingresoAfectadoXOrganismo}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .ingresoOrganismo
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.ingresoAfectadoXOrganismo
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionOrganismoEntre100 =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                        )
                                      ).toString());
                                  });

                                  auxArray[index].ingresoAfectadoXOrganismo =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                      ACUMULADO AFECTACION ORGANISMO / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.acumuladoAfectacionOrganismoEntre100}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              let auxArray = [...tablaTipoMovimiento];

                              auxArray.forEach((item) => {
                                item.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                  tablaTipoMovimiento
                                    .reduce((accumulator, object) => {
                                      return (
                                        accumulator +
                                        Number(
                                          object.fondoIngresoAfectadoXMunicipio
                                        )
                                      );
                                    }, 0)
                                    .toString();
                              });
                              auxArray.forEach((item) => {
                                item.acumuladoAfectacionOrganismoEntre100 =
                                  tablaTipoMovimiento
                                    .reduce((accumulator, object) => {
                                      return (
                                        accumulator +
                                        Number(object.ingresoAfectadoXOrganismo)
                                      );
                                    }, 0)
                                    .toString();
                              });

                              addPorcentaje(auxArray);
                              removeTipoMovimiento(index);
                            }}
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
          </TableContainer> */}
        </Paper>


      </Grid>
    </Grid>
  );
}
