/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { da, es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IDatosMandatos } from "../../../screens/fuenteDePago/Mandatos";
import { IDatosGeneralesMandato } from "../../../store/Mandatos/mandato";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { getMunicipiosUOrganismos as getMandateUOrganismos } from "../../APIS/APIS Cortoplazo/APISEncabezado";
import { getCatalogo as getMandatarios } from "../../APIS/Config/APISCatalogos";
import { set } from "date-fns";

export function DatosGeneralesMandato() {
  interface HeadSelect {
    Id: string;
    Descripcion: string;
  }

  const headsNews: HeadSelect[] = [
    {
      Id: "1",
      Descripcion: "Gobierno del estado de Nuevo León",
    },
    {
      Id: "2",
      Descripcion: "Otro"
    },
  ];

  const setDatosGenerales: Function = useMandatoStore(
    (state) => state.setDatosGenerales
  );

  const datosGenerales: IDatosGeneralesMandato = useMandatoStore(
    (state) => state.datosGenerales
  );

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const tablaMandatos: IDatosMandatos[] = useMandatoStore(
    (state) => state.tablaMandatos
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const IdMandato: string = useMandatoStore((state) => state.idMandato);
  const [mandatarios, setMandatarios] = useState([]);
  const [mandateUOrganismos, setMandateUOrganismos] = useState([]);
  const [otroBoxMandatario, setOtroBoxMandatario] = useState(false);
  const [otroBoxMandante, setOtroBoxMandante] = useState(false);

  // useEffect(() => {
  //   if (catalogoOrganismos.length > 0) {
  //     setDatosGenerales({
  //       ...datosGenerales,
  //       mandante: {
  //         Id: "",
  //         Descripcion: "",
  //       },
  //       mandatario: { Id: "", Descripcion: "" },
  //     });
  //   }
  // }, [catalogoOrganismos]);

  useEffect(() => {
    getMandatarios(setMandatarios, "mandatario");
    getMandateUOrganismos(setMandateUOrganismos)
    console.log("datosgenerales", datosGenerales);
  }, []);

  return (
    <Grid
      container
      sx={{
        height: "50vh",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
        justifyItems: "center",
        alignItems: "center",
        alignContent: "space-evenly",
      }}
    >
      <Grid sx={{ width: "70%" }}>
        <InputLabel
          error={
            IdMandato !== "" ? false :
              tablaMandatos.filter(
                (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
              ).length > 0
          }
          sx={queries.medium_text}
        >
          Número de Mandato
        </InputLabel>
        <TextField
          disabled={tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instruccion Irrevocable"}
          error={
            IdMandato !== "" ? false :
              tablaMandatos.filter(
                (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
              ).length > 0
          }
          helperText={
            IdMandato !== "" ? "" :
              tablaMandatos.filter(
                (v) => v.NumeroMandato.toString() === datosGenerales.numeroMandato
              ).length > 0
                ? "Número de mandato ya existente"
                : ""
          }
          fullWidth
          variant="standard"
          value={datosGenerales.numeroMandato}
          onChange={(v) => {
            setDatosGenerales({
              ...datosGenerales,
              numeroMandato: v.target.value,
            });
          }}
        />
      </Grid>

      <Grid
        sx={{
          width: "70%",
        }}
      >
        <InputLabel sx={{ ...queries.medium_text }}>
          Fecha del Mandato
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DesktopDatePicker
            disabled={tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instruccion Irrevocable"}
            sx={{
              width: "100%",
            }}
            value={datosGenerales.fechaMandato}
            onChange={(v) => {
              setDatosGenerales({
                ...datosGenerales,
                fechaMandato: v,
              });
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid sx={{ width: "70%" }}>

        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>

          <FormControlLabel
            label="Otro"
            control={
              <Checkbox
                checked={otroBoxMandatario}
                onChange={(v) => {
                  setOtroBoxMandatario(!otroBoxMandatario);
                  setDatosGenerales({
                    ...datosGenerales,
                    mandatario: { Id: "", Descripcion: "" },
                  });
                }}
              />
            }
          ></FormControlLabel>
        </Grid>


        {otroBoxMandatario === false
          ?
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={mandatarios}
            getOptionLabel={(option) => option.Descripcion}
            value={{
              Id: datosGenerales?.mandatario.Id || "",
              Descripcion: datosGenerales.mandatario.Descripcion || "",
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
                mandatario: { Id: text?.Id, Descripcion: text?.Descripcion },
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

            value={otroBoxMandatario === true ? datosGenerales.mandatario.Descripcion : ""}
            disabled={otroBoxMandatario ? false : true}
            //inputProps={{ maxlength: 120 }}
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            error={datosGenerales.mandatario.Descripcion.length === 120}
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

      <Grid sx={{ width: "70%" }}>

        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <InputLabel sx={queries.medium_text}>
            Municipio / Organismo Mandante
          </InputLabel>
          <FormControlLabel
            label="Otro Tipo"
            control={
              <Checkbox
                checked={otroBoxMandante}
                onChange={(v) => {
                  setOtroBoxMandante(!otroBoxMandante);
                  setDatosGenerales({
                    ...datosGenerales,
                    mandante: { Id: "", Descripcion: "" },
                  });
                  // changeCheckBoxOtroTipoSolicitud(!checkBoxOtroTipoSolicitud);
                  // changeEncabezado({
                  //   ...encabezado,
                  //   tipoCredito: {
                  //     Id: "",
                  //     Descripcion: "",
                  //   }
                  // })
                }}
              />
            }
          ></FormControlLabel>

        </Grid>
        
        {otroBoxMandante === false
          ?
         <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          placeholder="Selecciona"
          fullWidth
          options={mandateUOrganismos}
          getOptionLabel={(option) => option.Descripcion}
          value={{
            Id: datosGenerales?.mandante?.Id || "",
            Descripcion: datosGenerales?.mandante?.Descripcion || "",
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
              mandante: { Id: text?.Id, Descripcion: text?.Descripcion },
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

            value={otroBoxMandante === true ? datosGenerales.mandante.Descripcion : ""}
            disabled={otroBoxMandante ? false : true}
            //inputProps={{ maxlength: 120 }}
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            error={datosGenerales.mandante.Descripcion.length === 120}
            onChange={(x) => {
              let inputValue = x.target.value;
              const expRegular = /^[a-zA-ZñÑ0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
              if (
                (inputValue.length <= 120 && expRegular.test(inputValue)) ||
                x.target.value === ""
              ) {
                const nuevoMandante = inputValue;
                setDatosGenerales({
                  ...datosGenerales,
                  mandante: {
                    id: "otro",
                    Descripcion: nuevoMandante
                  },
                });
              }
            }}
          ></TextField>
        }
       
      </Grid>
    </Grid>
  );
}
