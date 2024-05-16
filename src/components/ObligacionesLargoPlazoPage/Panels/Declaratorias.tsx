import { Grid, InputLabel, MenuItem, Select, TextField, Divider, Paper, Table, Checkbox, TableContainer, TableHead, TableRow, Typography, FormControlLabel, TableBody, FormControl, Button, } from "@mui/material";
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

  const [openGuardaComentarios, setOpenGuardaComentarios] = useState("");

  const Declaratorias: ICreditoSolicitudReestructura = useReestructuraStore(
    (state) => state.ReestructuraDeclaratorias
  );
  const setCreditoSolicitudReestructura: Function = useReestructuraStore(
    (state) => state.setCreditoSolicitudReestructura
  );

  return (
    <>
      <Grid container
        flexDirection={"column"}
        height={"12rem"}
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
              // disabled={
              //     reestructura === "con autorizacion" ||
              //     (datosActualizar.length > 0 &&
              //         !datosActualizar.includes("Tipo de Documento"))
              // }
              fullWidth
              // value={tipoDocumento}
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

        <Grid container sx={{
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
              Pediodo de adminitracion (meses)
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
      </Grid>
      <Divider
        sx={{
          mt:2,
          mb:2,
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
            outlineColor:"rgb(175, 140, 85)"
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
