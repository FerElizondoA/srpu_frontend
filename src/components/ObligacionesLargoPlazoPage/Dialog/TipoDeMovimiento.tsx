import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
 
} from "@mui/material";
import { queries } from "../../../queries";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { addDays, lightFormat } from "date-fns";

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

export function TipoDeMovimiento() {
  const [pruebaSelect, setPruebaSelect] = useState("");
  const [pruebaFecha, setPruebaFecha] = useState("");
  const [pruebaFechaMin, setPruebaFechaMin] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");

  const heads: HeadLabels[] = [
    {
      label: "Prueba 1 ",
      value: pruebaSelect,
    },
    {
      label: "Prueba 2",
      value: pruebaFecha,
    },
    {
      label: "Prueba 3",
      value: pruebaFechaMin,
    },
    {
      label: "Prueba 4 ",
      value: fechaContratacion,
    },
    {
      label: "Prueba 5",
      value: pruebaSelect,
    },
    {
      label: "Prueba 6",
      value: pruebaSelect,
    },
  ];

  return (
    <Grid container sx={queries.contenedorTipoMovimiento}>
      <Grid
        item
        container
        mt={2}
        direction="column"
        justifyContent={"space-evenly"}
      >
        {/* <Grid item>
            
          <Typography color={"#af8c55 "} fontWeight={"bold"}>
            HOLA
          </Typography>
          <Divider/>
        </Grid> */}

        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>
              Alta de fideicomitente
            </InputLabel>
            <FormControl fullWidth>
              <Select
                value={pruebaSelect}
                onChange={(e) => {
                  setPruebaSelect(e.target.value);
                }}
              >
                {heads.map((item, index) => {
                  return (
                    <MenuItem value={item.label} key={index}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>
              Tipo de fideicomitente
            </InputLabel>
            <FormControl fullWidth>
              <Select
                value={pruebaSelect}
                onChange={(e) => {
                  setPruebaFecha(e.target.value);
                }}
              >
                {heads.map((item, index) => {
                  return (
                    <MenuItem value={item.label} key={index}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>Entidad federativa</InputLabel>
            <FormControl fullWidth>
              <Select
                value={pruebaSelect}
                onChange={(e) => {
                  setPruebaFechaMin(e.target.value);
                }}
              >
                {heads.map((item, index) => {
                  return (
                    <MenuItem value={item.label} key={index}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>Tipo de fuente</InputLabel>
            <FormControl fullWidth>
              <Select
                value={pruebaSelect}
                onChange={(e) => {
                  setFechaContratacion(e.target.value);
                }}
              >
                {heads.map((item, index) => {
                  return (
                    <MenuItem value={item.label} key={index}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>Fondo o ingreso</InputLabel>
            <FormControl fullWidth>
              <Select
                value={pruebaSelect}
                onChange={(e) => {
                  setPruebaSelect(e.target.value);
                }}
              >
                {heads.map((item, index) => {
                  return (
                    <MenuItem value={item.label} key={index}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            lg={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                width: "15vh",
              }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
        
        <Grid>
          <Divider>
          <Typography sx={{ ...queries.bold_text, color: "#af8c55 " }}>
            SOPORTE DOCUMENTAL
          </Typography>
        </Divider>


        </Grid>
        
        <Grid
          container
          mt={2}
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Grid width={"60%"} display={"flex"} justifyContent={"space-between"}>
            <Grid
              direction={"column"}
              justifyContent={"space-evenly"}
              width={"35%"}
            >
              <Grid justifyContent={"center"}>
                <FormControl>
                  <FormLabel
                    sx={queries.medium_text}
                    id="demo-radio-buttons-group-label"
                  >
                    Apartados
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Fideicomiso"
                      control={<Radio />}
                      label="Fideicomiso"
                    />
                    <FormControlLabel
                      value="Convenio de adhesión"
                      control={<Radio />}
                      label="Convenio de adhesión"
                    />
                    <FormControlLabel
                      value="Convenio Modificatorio"
                      control={<Radio />}
                      label="Convenio Modificatorio"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              direction={"column"}
              justifyContent={"space-between"}
              width={"30%"}
              height={"10rem"}
            >
              <Grid>
                <InputLabel sx={queries.medium_text}>
                  Fecha de Primer Pago
                </InputLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={enGB}
                >
                  <DatePicker
                    value={new Date(pruebaFecha)}
                    // onChange={(date) =>
                    //   changeCapital(
                    //     date?.toString(),
                    //     capitalPeriocidadPago,
                    //     capitalNumeroPago
                    //   )
                    // }
                    minDate={new Date(pruebaFechaMin)}
                    maxDate={
                      new Date(addDays(new Date(fechaContratacion), 365))
                    }
                    slots={{
                      textField: DateInput,
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid>
                <InputLabel sx={queries.medium_text}>Archivo</InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={pruebaSelect}
                    onChange={(e) => {
                      setPruebaSelect(e.target.value);
                    }}
                  >
                    {heads.map((item, index) => {
                      return (
                        <MenuItem value={item.label} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            sx={{
              ...queries.buttonContinuarSolicitudInscripcion,
              width: "15vh",
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
