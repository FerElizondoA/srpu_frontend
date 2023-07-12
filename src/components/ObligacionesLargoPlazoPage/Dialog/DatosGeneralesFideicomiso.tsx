import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
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
  createTheme,
} from "@mui/material";
import { queries } from "../../../queries";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { moneyMask } from "../Panels/InformacionGeneral";
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

export function DatoGeneralesFideicomiso() {
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
      value: pruebaSelect,
    },
    {
      label: "Prueba 3",
      value: pruebaSelect,
    },
    {
      label: "Prueba 4 ",
      value: pruebaSelect,
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
    <Grid container sx={queries.contenedorDatoGenerales}>
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
          <Grid xs={12} sm={12} lg={2}>
            <InputLabel sx={queries.medium_text}>
              Numero del fideicomiso
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

          <Grid xs={12} sm={12} lg={2}>
            <InputLabel sx={queries.medium_text}>
              Tipo de fideicomiso
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

          <Grid xs={12} sm={12} lg={2}>
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
                maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid xs={12} sm={12} lg={2}>
            <InputLabel sx={queries.medium_text}>Fiduciario</InputLabel>
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

        <Grid>
          <Divider>
            <Typography sx={{ ...queries.bold_text, color: "#af8c55 " }}>
              FIDEICOMISARIO
            </Typography>
          </Divider>
        </Grid>

        <Grid container mt={2} display={"flex"} justifyContent={"space-evenly"}>
          <Grid lg={2}>
            <InputLabel sx={queries.medium_text}>Fideicomisario</InputLabel>
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
              Orden fideicomisario
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
          <Grid
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
      </Grid>
    </Grid>
  );
}
