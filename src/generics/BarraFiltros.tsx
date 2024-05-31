import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid, IconButton, InputBase, InputLabel, Paper } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { queries } from "../queries";
import { filterByWord, filtrarPorFecha } from "./buscador";

export function BarraFiltros({
  Lista,
  setStateFiltered,
  CamposFecha,
}:
{Lista:any[];
  setStateFiltered:Function
  CamposFecha: string[]
}) {
    const [busqueda, setBusqueda] = useState("");
    const [fechaInicio, setFechaInicio] = useState<Dayjs|null>(null);
    const [fechaFin, setFechaFin] = useState<Dayjs| null>(null);

    useEffect(()=>{
        if(fechaInicio===null){
            setFechaFin(null)
        }
    },[fechaInicio])
  return (
    <>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          display="center"
          justifyContent="center"
          alignItems={"center"}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              height: ["100%", "50%", "50%", "50%", "50%"],
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                if (e.target.value === "") {
                  // setDatosFiltrados(datos);
                }
              }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  // filtrarDatos();
                  ev.preventDefault();
                  return false;
                }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={5} sm={2} md={2} lg={2} xl={2} mb={{ xs: 3 }}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de la Inicial
            </InputLabel>
            <IconButton onClick={() => setFechaInicio(null)}>
              <ClearIcon />
            </IconButton>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              sx={{ width: "100%" }}
              format="dd/MM/yyyy" // El formato correcto es 'dd/MM/yyyy'
              value={fechaInicio}
              onChange={(v) => {
                if (v == fechaInicio) {
                  setFechaInicio(null);
                } else {
                  setFechaInicio(v);
                }
              }}
            />
          </LocalizationProvider>
        </Grid>

        {fechaInicio != null ? (
          <Grid item xs={5} sm={2} md={2} lg={2} xl={2} sx={{ mb: "3" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <InputLabel sx={{ ...queries.medium_text }}>
                Fecha de la Final
              </InputLabel>
              <IconButton onClick={() => setFechaFin(null)}>
                <ClearIcon />
              </IconButton>
            </Grid>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                sx={{ width: "100%" }}
                format="dd/MM/yyyy" // El formato correcto es 'dd/MM/yyyy'
                value={fechaFin}
                onChange={(v) => {
                  if (v == fechaFin) {
                    setFechaFin(null);
                  } else {
                    setFechaFin(v);
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
        ) : null}

        <Grid
          item
          xs={12}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ ...queries.buttonContinuar, minWidth: "60%" }}
            onClick={() => {
                console.log('condition',fechaInicio===null);
                
                fechaInicio===null?
                    setStateFiltered(filterByWord(Lista, busqueda))
                    :setStateFiltered((filtrarPorFecha(Lista,CamposFecha,fechaInicio,fechaFin, busqueda)))
            }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
