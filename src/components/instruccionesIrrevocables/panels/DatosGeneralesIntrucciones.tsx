/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IDatosGeneralesInstrucciones, IDeudorInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { ICatalogo, IFondoOIngreso } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IDatosInstrucciones } from "../../../screens/fuenteDePago/InstruccionesIrrevocables";
import { getMunicipiosUOrganismos as getMandateUOrganismos } from "../../APIS/APIS Cortoplazo/APISEncabezado";
import { getCatalogo } from "../../APIS/Config/APISCatalogos";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";


export function DatosGeneralesIntrucciones() {
  //DATOS GENERALES

  const datosGenerales: IDatosGeneralesInstrucciones = useInstruccionesStore(
    (state) => state.datosGenerales
  );

  const setDatosGenerales: Function = useInstruccionesStore(
    (state) => state.setDatosGenerales
  );

  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const tablaInstrucciones: IDatosInstrucciones[] = useInstruccionesStore(
    (state) => state.tablaInstrucciones
  );


  const IdInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  // useEffect(() => {
  //   setDatosGenerales({
  //     IdgiraInstruccion: datosGenerales.giraIntruccion?.Id || "",
  //     NombreGiraIntruccion: datosGenerales.giraIntruccion?.Descripcion || "",
  //     IdBeneficiario: datosGenerales.beneficiario?.Id || "",
  //     NombreBeneficiario: datosGenerales.beneficiario?.Descripcion || "",
  //     // numeroCuenta: datosGenerales.numeroCuenta,
  //     // cuentaCLABE: datosGenerales.cuentaCLABE,
  //     // banco: datosGenerales.banco,
  //     fechaInstruccion: new Date(),
  //   });
  // }, []);

  const [catalogoDirigidoInstruccion, setCatalogoDirigidoInstruccion] = useState([]);
  const [otroGiroInstruccion, setOtroGiroInstruccion] = useState(false);
  const [otroDireccionInstruccion, setOtroDireccionInstruccion] = useState(false);
  const [OrganismosOMunicipios, setOrganismosOMunicipios] = useState([]);

  // const tablaInstrucciones: IDatosInstrucciones[] = useInstruccionesStore(
  //   (state) => state.tablaInstrucciones
  // );

  useEffect(() => {
    getMandateUOrganismos(setOrganismosOMunicipios)
    getCatalogo(setCatalogoDirigidoInstruccion, "mandatario")
  }, []);

  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );


  const catalogoFondosOIngresos: Array<IFondoOIngreso> = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const tablaTipoMovimiento: IDeudorInstrucciones[] = useInstruccionesStore(
    (state) => state.tablaTipoMovimiento
  );

  useEffect(() => {
    //  setDatosGenerales({
    //      ...datosGenerales,
    //      fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
    //    });
    console.log("datosGenerales", datosGenerales);
    console.log("Benefeciario seleccionado: ", datosGenerales.beneficiario);
    console.log("buscando Institucion: ", catalogoInstituciones.find(
      (o) => o.Descripcion === datosGenerales?.beneficiario?.Descripcion
    ) || "Hola")
  }, [
    datosGenerales
  ])


  return (
    <Grid
      container
      flexDirection="column"
      justifyContent={"space-evenly"}
      sx={{
        height: "23rem",
        "@media (min-width: 480px)": {
          height: "24rem",
        },

        "@media (min-width: 768px)": {
          height: "25rem",
        },

        "@media (min-width: 1140px)": {
          height: "25rem",
        },

        "@media (min-width: 1400px)": {
          height: "31rem",
        },

        "@media (min-width: 1870px)": {
          height: "40rem",
        },
      }}
    >

      {/* <Button
        onClick={() => console.log("Datos Generales:", datosGenerales)}
      >Prueba de datosgenerales</Button> */}

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          // gridTemplateColumns: "repeat(2,1fr)",
          justifyContent: "space-evenly",
        }}
      >
        <Grid xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 3 }}
        >
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Quien gira la instrucción
            </InputLabel>

            <FormControlLabel
              label="Otro"
              control={
                <Checkbox
                  checked={otroGiroInstruccion}
                  onChange={(v) => {
                    setOtroGiroInstruccion(!otroGiroInstruccion);
                    setDatosGenerales({
                      ...datosGenerales,
                      giraIntruccion: { Id: "", Descripcion: "" },
                    });
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>

          {otroGiroInstruccion === false
            ?
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={OrganismosOMunicipios}
              getOptionLabel={(option) => option.Descripcion}
              value={{
                Id: datosGenerales?.giraIntruccion?.Id || "",
                Descripcion: datosGenerales?.giraIntruccion?.Descripcion || "",
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}

              onChange={(event, text) => {
                setDatosGenerales({
                  ...datosGenerales,
                  giraIntruccion: { Id: text?.Id, Descripcion: text?.Descripcion },
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
            :
            <TextField
              type="text"
              //value={AnexoClausulas.Modificacion}

              value={otroGiroInstruccion === true ? datosGenerales.giraIntruccion.Descripcion : ""}
              disabled={otroGiroInstruccion ? false : true}
              //inputProps={{ maxlength: 120 }}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
              error={datosGenerales.giraIntruccion.Descripcion.length === 120}
              onChange={(x) => {
                let inputValue = x.target.value;
                const expRegular = /^[a-zA-ZñÑ0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
                if (
                  (inputValue.length <= 120 && expRegular.test(inputValue)) ||
                  x.target.value === ""
                ) {
                  const nuevoMandatario = inputValue;
                  setDatosGenerales({
                    ...datosGenerales,
                    mandatario: {
                      id: "otro",
                      Descripcion: nuevoMandatario
                    },
                  });
                }
              }}
            ></TextField>
          }
        </Grid>

        <Grid xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 3 }}
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fecha de la Instrucción
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              disabled={tipoMecanismoVehiculoPago === "Instrucción Irrevocable"}
              sx={{
                width: "100%",
              }}
              value={datosGenerales.fechaInstruccion}
              onChange={(v) => {
                setDatosGenerales({
                  ...datosGenerales,
                  fechaInstruccion: v,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          // gridTemplateColumns: "repeat(2,1fr)",
          justifyContent: "space-evenly",
        }}
      >
        <Grid xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 3 }}
        >
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <InputLabel sx={{ ...queries.medium_text }}>A quien va dirigida la instruccion</InputLabel>

            <FormControlLabel
              label="Otro"
              control={
                <Checkbox
                  checked={otroDireccionInstruccion}
                  onChange={(v) => {
                    setOtroDireccionInstruccion(!otroDireccionInstruccion);
                    setDatosGenerales({
                      ...datosGenerales,
                      vaDirigidaA: { Id: "", Descripcion: "" },
                    });
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>
          {otroDireccionInstruccion === false
            ?
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoDirigidoInstruccion}
              getOptionLabel={(option) => option.Descripcion}
              value={{
                Id: datosGenerales?.vaDirigidaA?.Id || "",
                Descripcion: datosGenerales?.vaDirigidaA?.Descripcion || "",
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}

              onChange={(event, text) => {
                setDatosGenerales({
                  ...datosGenerales,
                  vaDirigidaA: { Id: text?.Id, Descripcion: text?.Descripcion },
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
            :
            <TextField
              type="text"
              //value={AnexoClausulas.Modificacion}

              value={otroDireccionInstruccion === true ? datosGenerales.vaDirigidaA.Descripcion : ""}
              disabled={otroDireccionInstruccion ? false : true}
              //inputProps={{ maxlength: 120 }}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
              error={datosGenerales.vaDirigidaA.Descripcion.length === 120}
              onChange={(x) => {
                let inputValue = x.target.value;
                const expRegular = /^[a-zA-ZñÑ0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
                if (
                  (inputValue.length <= 120 && expRegular.test(inputValue)) ||
                  x.target.value === ""
                ) {
                  const nuevoMandatario = inputValue;
                  setDatosGenerales({
                    ...datosGenerales,
                    vaDirigidaA: {
                      id: "otro",
                      Descripcion: nuevoMandatario
                    },
                  });
                }
              }}
            ></TextField>
          }

        </Grid>

        <Grid xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 3 }}
          mt={{ xs: 2 }}
          alignItems={"center"}        >
          <InputLabel sx={{ ...queries.medium_text }}>Beneficiario</InputLabel>
          <Autocomplete
            disabled={tipoMecanismoVehiculoPago === "Instrucción Irrevocable"}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
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
            //value={datosGenerales.beneficiario}
            value={
              catalogoInstituciones.find(
                (o) => o.Descripcion === datosGenerales?.beneficiario?.Descripcion
              ) || null
            }
            onChange={(event, text) =>
              setDatosGenerales({
                ...datosGenerales,
                beneficiario: {
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
              option.Id === value.Id
            }
          />
        </Grid>
      </Grid>
      {/* <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
        mb={{ xs: 3 }}
      >
        <InputLabel sx={{ ...queries.medium_text }}>A quien va dirigida la instruccion</InputLabel>
        <TextField
          disabled={
            tipoMecanismoVehiculoPago === "Mandato" ||
            tipoMecanismoVehiculoPago === "Instrucción Irrevocable"
          }
          fullWidth
          variant="standard"
          value={datosGenerales.vaDirigidaA}
          onChange={(text) => {

            // setDatosGenerales({
            //   ...datosGenerales,
            //   vaDirigidaA: {
            //   Id: text?.Id || "",
            //   Descripcion: text?.Descripcion || "",
            // },
            // });

          }}
        />
      </Grid> */}

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 2, sm: 0 }}
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Tipo de Fuente
          </InputLabel>
          <Autocomplete
            fullWidth
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={datosGenerales.tipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setDatosGenerales({
                ...datosGenerales,
                fondoIngreso: {
                  Id: "",
                  Descripcion: "",
                  TipoDeFuente: "",
                },
                tipoFuente: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
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
              option?.Descripcion === value?.Descripcion ||
              value?.Descripcion === ""
            }
          />
        </Grid>

        <Grid item width={"100%"} xs={10} sm={5} md={5} lg={5} xl={5}
          mb={{ xs: 2, sm: 0 }}
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fondo o Ingreso
          </InputLabel>
          <Autocomplete
            fullWidth
            disabled={datosGenerales.tipoFuente?.Id === ""}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFondosOIngresos?.filter(
              (td) =>
                td.TipoDeFuente === datosGenerales.tipoFuente?.Id
            )}
            value={datosGenerales.fondoIngreso}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setDatosGenerales({
                ...datosGenerales,
                // id: `${datosGenerales.tipoFuente?.Descripcion
                //   }/${text.Descripcion.split(" ")
                //     .map((word : string ) =>
                //       word.charAt(0) === word.charAt(0).toUpperCase()
                //         ? word.charAt(0)
                //         : ""
                //     ).join("")}/${tablaTipoMovimientoFideicomisoNew?.length + 1}`,
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
              option?.Descripcion === value?.Descripcion ||
              value?.Descripcion === ""
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
