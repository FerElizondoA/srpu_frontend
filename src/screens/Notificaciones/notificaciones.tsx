import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  InputBase,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCommentIcon from "@mui/icons-material/AddComment";

export function Notificaciones() {
  //Declaraciones
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [busqueda, setBusqueda] = useState("");
  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const filtrarDatos = () => { };

  const heads = [
    {
      id: "CreadoPor",
      label: "Usuario",
    },
    {
      id: "FechaCreacion",
      label: "Fecha Envio",
    },
    {
      id: "Estatus",
      label: "Estatus",
    },
    {
      id: "Titulo",
      label: "Titulo",
    },
    {
      id: "Mensaje",
      label: "Mensaje",
    },
  ];

  return (
    <Grid
      container
      direction="column"
      rowSpacing={{ xs: 6, sm: 2, md: 4, xl: 3 }}
    >
      <Grid item width={"100%"}>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>



      <Grid item xl={10} xs={12} lg={12} sm={12} >

        <Grid item xl={12} display="flex" justifyContent="Center">
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              height: 50,
              color: "#AF8C55",
            }}
          >
            Historial de Notificaciones
          </Typography>
        </Grid>

        <Grid
          item
          //ml={window.innerWidth / 22}
          xl={12}
          lg={12}
          display="flex"
          justifyContent="Center"
          alignItems={"center"}
        >
          <Grid
            item
            xl={8}
            xs={8}
            lg={8}
            sm={8}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                //alignItems: "center"
                borderRadius: "10px",
                width: 600
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                onKeyPress={(ev) => {
                  //cuando se presiona Enter
                  if (ev.key === "Enter") {
                    handleSearch();
                    ev.preventDefault();
                    return false;
                  }
                }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </IconButton>
            </Paper>

          </Grid>
          <Grid
            item
            xl={4}
            xs={2}
            lg={2}
            sm={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              color="info"
              variant="contained"
              size="large"
              endIcon={<AddCommentIcon />}
              sx={{ width: 300 }}
              onClick={() => {
                //Abrir dialog
              }}
            >
              Añadir Notificacion
            </Button>
          </Grid>




        </Grid>

      </Grid>
    </Grid>
  );
}
