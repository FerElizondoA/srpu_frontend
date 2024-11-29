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
  {
    Lista: any[];
    setStateFiltered: Function
    CamposFecha: string[]
  }) {
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(null);
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);

  const limpiarFiltro = () => {
    setBusqueda("")
    setFechaInicio(null)
    setFechaFin(null)
    setStateFiltered(filterByWord(Lista, busqueda))
  }

  // useEffect(() => {
  //   setStateFiltered(filterByWord(Lista, busqueda))
  // }, [
  //   //busqueda === "", fechaInicio === null, fechaFin === null
  // ])


  useEffect(() => {
    if (fechaInicio === null) {
      setFechaFin(null)
    }
  }, [fechaInicio])

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
          sm={4}
          md={4}
          lg={4}
          xl={4}
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
                // if (e.target.value === "") {
                //   setBusqueda()
                // }
              }}
              // onKeyPress={(ev) => {
              //   if (ev.key === "Enter") {
              //     fechaInicio === null ?
              //       setStateFiltered(filterByWord(Lista, busqueda))
              //       : setStateFiltered((filtrarPorFecha(Lista, CamposFecha, fechaInicio, fechaFin, busqueda)))
              //    // return false;
              //   }
              // }}
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
          container
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            sx={{ ...queries.buttonContinuar, width: "30%" }}
            onClick={() => {
              console.log("Lista", Lista);
              console.log("Busqueda: ", busqueda);


              fechaInicio === null ?
                setStateFiltered(filterByWord(Lista, busqueda))
                : setStateFiltered((filtrarPorFecha(Lista, CamposFecha, fechaInicio, fechaFin, busqueda)))
            }}
          >
            Buscar
          </Button>

          <Button sx={{ ...queries.buttonCancelar, width: "30%" }}
            onClick={() => {
              limpiarFiltro()

              // setStateFiltered(filterByWord([], ""))
            }}
          >
            Restablecer Filtro
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
