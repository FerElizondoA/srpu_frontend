import { Grid } from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import Button from "@mui/material/Button";

export function Configuracion() {
  const modulos = [
    "Claves de inscripción",
    "Destinos",
    "Entes Público Obligados",
    "Estatus",
    "Fuentes de Pago",
    "Fuentes Alternas de Pago",
    "Instituciones Financieras",
    "Obligados Solidarios / Avales",
    "Tipos de Documento",
    "Tipos de Ente Público",
    "Usuarios",
  ];
  return (
    <Grid container direction="column" alignItems={"center"} sx={{height:'100vh'}}>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>
      <Grid
        item
        sx={{
          width: "65%",
          height: "78vh",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          justifyItems: "center",
          alignItems: "end",
        }}
      >
        {modulos.map((item, index) => {
          return (
            <Button
              sx={{ width: "80%", height: "20%", display:'flex', justifyContent:'center', alignItems:'center', borderRadius:20 }}
            >
              {item}
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
}
