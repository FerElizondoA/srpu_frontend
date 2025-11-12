import { Button, Grid, Paper, Typography } from "@mui/material";
import escudo from "../../assets/logo/escudo.png";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { FavIconAvisos } from "../../avisosPAUA/componentes/FavIconAvisos";
import "../../GlobalPruebasPAME.css";

// const listaBotones = [
//   {
//     nombre: "Boton 1",
//   },
//   {
//     nombre: "Boton 2",
//   },
//   {
//     nombre: "Boton 3",
//   },
//   {
//     nombre: "Boton 4",
//   },
//   {
//     nombre: "Boton 5",
//   },
//   {
//     nombre: "Boton 6",
//   },
//   {
//     nombre: "Boton 7",
//   },
//   {
//     nombre: "Boton 8",
//   },
//   {
//     nombre: "Boton 9",
//   },
// ]

export function HomePage() {
  return (
    <Grid container direction="column">
      <Grid item>
        <LateralMenu />
        {/* {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />} */}
      </Grid>
      <Grid
        item
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={escudo} alt="Escudo" style={{ width: "25vw", height: 'auto' }} />

      </Grid>
      <FavIconAvisos />

      {/* <Grid container width={"100%"}>
        <Button className="boton-Acciones">
          <Typography>Boton ACCION Oscuro</Typography>
        </Button>
      </Grid>


      <Grid className="FondoBotonesEquipo" >
        <Grid container className="lista-botones">
          {listaBotones.map((boton) => (
            <Button className="boton-prueba">
              {boton.nombre}
            </Button>
          ))}
        </Grid>
      </Grid> */}

    </Grid>
  );
}
