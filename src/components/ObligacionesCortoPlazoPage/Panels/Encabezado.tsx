import { Autocomplete, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subDays } from "date-fns/esm";
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import {
  IEncabezado,
  IUsuarios,
} from "../../../store/CreditoCortoPlazo/encabezado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export function Encabezado() {
  const tipoCredito: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.encabezado.tipoCredito
  );

  const tipoDocumento: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );

  const tipoEntePublico: { Id: string; TipoEntePublico: string } =
    useCortoPlazoStore((state) => state.encabezado.tipoEntePublico);

  const organismo: { Id: string; Organismo: string } = useCortoPlazoStore(
    (state) => state.encabezado.organismo
  );
  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );
  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );

  const catalogoTiposSolicitudes: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposSolicitudes
  );


  const getTiposSolicitudes: Function = useCortoPlazoStore(
    (state) => state.getTiposSolicitudes
  );

  const encabezado: IEncabezado = useCortoPlazoStore(
    (state) => state.encabezado
  );

  const listadoUsuarios: Array<IUsuarios> = useCortoPlazoStore(
    (state) => state.listadoUsuarios
  );

  const checkBoxOtroTipoSolicitud: boolean = useCortoPlazoStore(
    (state) => state.checkBoxOtroTipoSolicitud
  );

  const changeCheckBoxOtroTipoSolicitud: Function = useCortoPlazoStore(
    (state) => state.changeCheckBoxOtroTipoSolicitud
  );


  useEffect(() => {
    listadoUsuarios.length <= 0 && getListadoUsuarios();
    getTiposSolicitudes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datosActualizar: Array<string> = useCortoPlazoStore(
    (state) => state.datosActualizar
  );

  const [Otro, setOtro] = useState(Boolean);

  return (
    <Grid container height={"35rem"}>
      <Grid
        item
        container
        mt={{ xs: 2 }}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >

        <Grid item xs={10} sm={10} md={3.5} lg={3} xl={3}
          mb={{ xs: 3, sm: 2, md: 0, lg: 2, xl: 2 }}
        >

          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <InputLabel
              sx={{
                ...queries.medium_text,
                display: "flex",
              }}
            >
              Tipo de Documento
              {/* Tipo de Solicitud */}
            </InputLabel>


            {/* <Grid item xs={10} sm={2} md={1} lg={1} xl={1}
              mb={{ xs: 3, sm: 2, md: 0, lg: 2, xl: 2 }}

            > */}
            <FormControlLabel
              label="Otro Tipo"
              control={
                <Checkbox
                  checked={checkBoxOtroTipoSolicitud}
                  onChange={(v) => {
                    changeCheckBoxOtroTipoSolicitud(!checkBoxOtroTipoSolicitud);
                    changeEncabezado({
                      ...encabezado,
                      tipoCredito: {
                        Id: "",
                        Descripcion: "",
                      }
                    })
                  }}
                />
              }
            ></FormControlLabel>
            {/* </Grid> */}
          </Grid>

          {checkBoxOtroTipoSolicitud === false
            ?
            <Autocomplete
              sx={{ display: "flex", justifyContent: "space-evenly" }}

              disabled={checkBoxOtroTipoSolicitud}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoTiposSolicitudes}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={!checkBoxOtroTipoSolicitud ? encabezado.tipoCredito : null}

              onChange={(event, text) => {

                changeEncabezado({
                  ...encabezado,
                  tipoCredito: {
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


            : // OTRA CONDICION

            <TextField
              type="text"
              //value={AnexoClausulas.Modificacion}

              value={checkBoxOtroTipoSolicitud === true ? encabezado.tipoCredito.Descripcion : ""}
              disabled={checkBoxOtroTipoSolicitud ? false : true}
              //inputProps={{ maxlength: 120 }}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
              error={encabezado.tipoCredito.Descripcion.length === 120}
              // FormHelperTextProps={{
              //   sx: {
              //     color: getHelperTextColor(),
              //   },
              // }}
              // helperText={`El texto de modificación no debe pasar los 120 caracteres. Caracteres Usados: ${Declaratorias.ClaseTitulo.Descripcion
              //   ? Declaratorias.ClaseTitulo.Descripcion.length
              //   : 0
              //   }`}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     "& fieldset": {
              //       borderColor: getBorderColor(),
              //     },
              //     "&:hover fieldset": {
              //       borderColor: getBorderColor(),
              //     },
              //     "&.Mui-focused fieldset": {
              //       borderColor: getBorderColor(),
              //     },
              //   },
              // }}
              onChange={(x) => {
                let inputValue = x.target.value;
                const expRegular = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9@#$%^&*()_+\-=<>?/|{}[\]\\:";'.,!\s]+$/;
                if (
                  (inputValue.length <= 120 && expRegular.test(inputValue)) ||
                  x.target.value === ""
                ) {
                  const nuevaTabla = inputValue;
                  changeEncabezado({
                    ...encabezado,
                    tipoCredito: {
                      id: "otro",
                      Descripcion: nuevaTabla
                    },
                  });
                  console.log("tipo de documento", tipoDocumento);
                }
              }}
            ></TextField>
          }
        </Grid>

        {/* <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>

          <TextField
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Tipo de Documento")
            }
            fullWidth
            value={tipoDocumento}
            variant="standard"
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
        </Grid> */}




        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <TextField sx={queries.medium_text}
            fullWidth

            value={
              listadoUsuarios.length <= 0
                ? ""
                : encabezado.solicitanteAutorizado.Nombre
            }
            variant="standard"

          >

          </TextField>
          
          {/* <Select
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Solicitante Autorizado")
            }
            sx={queries.medium_text}
            fullWidth
            value={
              listadoUsuarios.length <= 0
                ? ""
                : encabezado.solicitanteAutorizado.IdSolicitante
            }
            onChange={(e) => {
              let x = listadoUsuarios.find(
                (usuario) => usuario.Id === e.target.value
              );
              changeEncabezado({
                tipoDocumento: tipoDocumento,
                tipoCredito: tipoCredito,
                solicitanteAutorizado: {
                  IdSolicitante: x?.Id || "",
                  Cargo: x?.Puesto || "",
                  Nombre: `${x?.Nombre} ${x?.ApellidoPaterno} ${x?.ApellidoMaterno}`,
                },
                tipoEntePublico: tipoEntePublico,
                organismo: organismo,
                fechaContratacion: fechaContratacion,
              });
            }}
            variant="standard"
          >
            {listadoUsuarios.map((usuario) => (
              <MenuItem key={usuario.Id} value={usuario.Id}>
                {`${usuario.Nombre} ${usuario.ApellidoPaterno} ${usuario.ApellidoMaterno}`}
              </MenuItem>
            ))}
          </Select> */}
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Cargo del Solicitante
          </InputLabel>

          <TextField
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Cargo del Solicitante")
            }
            fullWidth
            value={encabezado.solicitanteAutorizado.Cargo}
            variant="standard"
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

      </Grid>

      <Grid
        item
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Ente Público</InputLabel>

          <TextField
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Tipo de Ente Público")
            }
            fullWidth
            value={tipoEntePublico.TipoEntePublico}
            variant="standard"
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

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Municipio u Organismo
          </InputLabel>

          <TextField
            disabled={
              datosActualizar.length > 0 &&
              !datosActualizar.includes("Municipio u Organismo")
            }
            multiline
            fullWidth
            value={organismo.Organismo}
            variant="standard"
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

        <Grid xs={10} md={3} lg={3} justifyContent={"center"} >
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              disabled={
                datosActualizar.length > 0 &&
                !datosActualizar.includes("Fecha de Contratación")
              }
              sx={{ width: "100%" }}
              value={new Date(fechaContratacion)}
              onChange={(date) => {
                changeEncabezado({ ...encabezado, fechaContratacion: date });
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>


      </Grid>
      {/* <Grid container display={"flex"} justifyContent={"center"} width={"100%"} alignItems={"center"} >

      </Grid> */}
    </Grid>
  );
}
