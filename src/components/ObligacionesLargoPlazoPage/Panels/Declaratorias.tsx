import { Grid, InputLabel, MenuItem, Select, TextField, Divider, Paper, Table, Checkbox, TableContainer, TableHead, TableRow, Typography, FormControlLabel, TableBody, FormControl, Button, Autocomplete, } from "@mui/material";
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
import { LateralMenu } from "../../LateralMenu/LateralMenu";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IAnexoClausula, ICreditoSolicitudReestructura } from "../../../store/Reestructura/reestructura";
import validator from "validator";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

interface Heads {
  Id: string
  label: string;
}

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Anexo ó Cláusula original",
  },
  {
    label: "Anexo ó Cláusula modificada",
  },
  {
    label: "Modificación",
  },
];


const catalogo: readonly Heads[] = [
  {
    Id: "0",
    label: "Anexo ó Cláusula original",

  },
  {
    Id: "1",
    label: "Anexo ó Cláusula modificada",
  },
  {
    Id: "2",
    label: "Modificación",
  },
];

export function Declaratorias() {



  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const [openGuardaComentarios, setOpenGuardaComentarios] = useState("");

  const Declaratorias: ICreditoSolicitudReestructura = useReestructuraStore(
    (state) => state.ReestructuraDeclaratorias
  );

  const setCreditoSolicitudReestructura: Function = useReestructuraStore(
    (state) => state.setCreditoSolicitudReestructura
  );

  const catalogoClaseTitulo: Array<ICatalogo> = useReestructuraStore(
    (state) => state.catalogoClaseTitulo
  );

  const getClaseTitulo: Function = useReestructuraStore(
    (state) => state.getClaseTitulo
  );

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );


  const getBorderColor = (): string => {
    const length = Declaratorias.ClaseTitulo.Descripcion.length;
    if (length === 5) {
      return "orange";
    } else if (length === 10) {
      return "red";
    } else if (length > 10) {
      return "#15212f";
    }
    return "";
  };

  const getHelperTextColor = (): string => {
    return Declaratorias.ClaseTitulo.Descripcion.length === 120 ? "orange" : "";
  };

  const [modificacionDescripcion, setModificacionDescripcion] = useState("");
  const [Otro, setOtro] = useState(false);

  useEffect(() => {
    getClaseTitulo()
  }, [reestructura !== ""])

  useEffect(() => {
    console.log(Declaratorias.ClaseTitulo.Id)
    console.log(Declaratorias.ClaseTitulo.Descripcion)
    
  }, [Declaratorias.ClaseTitulo.Descripcion])

  return (
    <>
      <Grid container
        flexDirection={"column"}
        height={"20rem"}
        justifyContent={"space-evenly"}
      >
        <Grid container sx={{
          display: "flex",
          justifyContent: "space-evenly"
        }}>

          <Grid xs={10} sm={3} md={3} lg={3} xl={3} >
            <InputLabel
              sx={{
                ...queries.medium_text,
                display: "flex",
              }}
            >
              Número de solicitud
            </InputLabel>

            <TextField
              disabled
              fullWidth
              value={inscripcion.NumeroRegistro}
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

          <Grid xs={10} sm={3} md={3} lg={3} xl={3} >
            <InputLabel
              sx={{ ...queries.medium_text }}
            >
              Tipo de convenio
            </InputLabel>

            <FormControl required variant="standard" fullWidth>
              <Select
                // disabled={
                //   datosActualizar.length > 0 &&
                //   !datosActualizar.includes("Solicitante Autorizado")
                // }
                sx={queries.medium_text}
                fullWidth
                value={
                  catalogo.length <= 0
                    ? ""
                    : Declaratorias.TipoConvenio.Id
                }
                onChange={(e) => {
                  let x = catalogo.find(
                    (v) => v.Id === e.target.value
                  );
                  setCreditoSolicitudReestructura({
                    ...Declaratorias,
                    TipoConvenio: { Id: x?.Id, Descripcion: x?.label }
                  });
                }}
                variant="standard"
              >
                {catalogo.map((v) => (
                  <MenuItem key={v.Id} value={v.Id}>
                    {`${v.label}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel
              sx={{
                ...queries.medium_text
              }}
            >
              Fecha del convenio
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DesktopDatePicker
                sx={{ width: "100%" }}
                value={new Date(Declaratorias.FechaConvenio)}
                onChange={(date) => {
                  setCreditoSolicitudReestructura({ ...Declaratorias, FechaConvenio: date });
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container mb={2} sx={{
          display: "flex",
          justifyContent: "space-evenly"
        }}>
          <Grid xs={10} sm={3} md={3} lg={3} xl={3} >
            <InputLabel sx={{ ...queries.medium_text }}>
              Saldo Vigente
            </InputLabel>

            <TextField
              variant="standard"
              fullWidth
              value={Declaratorias.SalgoVigente <= 0 ? "" : Declaratorias.SalgoVigente}
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
                  setCreditoSolicitudReestructura({
                    ...Declaratorias,
                    SalgoVigente: moneyMask(v.target.value.toString()),
                  });
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
            />
          </Grid>



          <Grid xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel
              sx={{ ...queries.medium_text, display: "flex" }}
            >
              Periodo de financiamiento (meses)
            </InputLabel>

            <TextField
              fullWidth
              value={Declaratorias.PeriodoFinanciamiento}
              variant="standard"
              sx={queries.medium_text}
              onChange={(v) => {
                const expRegular = /^\d*\.?\d*$/;

                if (expRegular.test(v.target.value) || v.target.value === "") {
                  setCreditoSolicitudReestructura({
                    ...Declaratorias,
                    PeriodoFinanciamiento: v.target.value,
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
            />
          </Grid>


          <Grid xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel
              sx={{
                ...queries.medium_text,
                display: "flex",
              }}
            >
              Periodo de adminitracion (meses)
            </InputLabel>
            <TextField
              fullWidth
              value={Declaratorias.PeriodoAdminitracion}
              variant="standard"
              sx={queries.medium_text}
              onChange={(v) => {
                const expRegular = /^\d*\.?\d*$/;

                if (expRegular.test(v.target.value) || v.target.value === "") {
                  setCreditoSolicitudReestructura({
                    ...Declaratorias,
                    PeriodoAdminitracion: v.target.value,
                  });
                }
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid item display={"flex"} justifyContent={"space-evenly"} width={"100%"}>
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel
              sx={{
                ...queries.medium_text,
                display: "flex",
              }}
            >
              Clase de Titulo
            </InputLabel>
            <Autocomplete
              sx={{ display: "flex", justifyContent: "space-evenly" }}

              disabled={Otro}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoClaseTitulo}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={!Otro ? Declaratorias.ClaseTitulo : null}
              onChange={(event, text) => {
                setCreditoSolicitudReestructura({
                  ...Declaratorias,
                  ClaseTitulo: {
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

          <Grid item xs={10} sm={2} md={1} lg={1} xl={1.2}>
            <FormControlLabel
              label="Otro"
              control={
                <Checkbox
                  checked={Otro}
                  onChange={(v) => {
                    setOtro(!Otro);
                    setCreditoSolicitudReestructura({
                      ...Declaratorias,
                      ClaseTitulo: {
                        Id: "",
                        Descripcion: "",
                      },
                    });

                  }}
                />
              }
            ></FormControlLabel>
          </Grid>

          <Grid xs={10} sm={5} md={5} lg={4.5} xl={4.8}>
            <TextField
              type="text"
              //value={AnexoClausulas.Modificacion}

              value={Otro === true ? Declaratorias.ClaseTitulo.Descripcion : ""}
              disabled={Otro ? false : true}
              //inputProps={{ maxlength: 120 }}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              //error={Declaratorias.ClaseTitulo.Descripcion.length === 120}
              FormHelperTextProps={{
                sx: {
                  color: getHelperTextColor(),
                },
              }}
              helperText={`El texto de modificación no debe pasar los 120 caracteres. Caracteres Usados: ${Declaratorias.ClaseTitulo.Descripcion
                ? Declaratorias.ClaseTitulo.Descripcion.length
                : 0
                }`}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: getBorderColor(),
                  },
                  "&:hover fieldset": {
                    borderColor: getBorderColor(),
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: getBorderColor(),
                  },
                },
              }}
              onChange={(e) => {
                let inputValue = e.target.value;
                // const expRegular =
                //   /^[a-zA-Z0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
                // if (
                //   (inputValue.length <= 120 && expRegular.test(inputValue)) ||
                //   e.target.value === ""
                // ) {
                //   const nuevaTabla = [inputValue];
                setCreditoSolicitudReestructura({
                  ...Declaratorias,
                  ClaseTitulo: {
                    Id: "Otro",
                    Descripcion: e.target.value || "",
                  },
                });
                //}
              }}
            ></TextField>
          </Grid>
        </Grid>

      </Grid>

      <Divider
        sx={{
          mt: 2,
          mb: 2,
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
        Declaratorias
      </Divider>

      <Grid width={"90%"} display={"flex"} justifyContent={"center"}>
        <Typography sx={{ ...queries.medium_text }} >
          De conformidad al reglamento, indique las declaratorias aplicables al financiamiento u obligación
        </Typography>
      </Grid>

      <Grid item
        //xs={10} sm={3} md={3} lg={3} xl={3}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        height={"14rem"}
      >
        <Grid width={"90%"} display={"flex"} justifyContent={"center"}
          sx={{
            outline: "solid",
            outlineColor: "rgb(175, 140, 85)"
          }}>
          <FormControlLabel
            label="Aqui iran las declaatorias aplicables"
            control={
              <Checkbox
              // checked={disposicionesParciales}
              // onChange={(v) => {
              //   setDisposicionesParciales();
              // }}
              />
            }
          />
        </Grid>

      </Grid>
    </>
  );
}
