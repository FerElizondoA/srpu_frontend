import { Grid } from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Configuracion() {
  const navigate = useNavigate();
  const modulos = [
    { id: 0, label: "Claves de inscripción" },
    { id: 1, label: "Destinos" },
    { id: 2, label: "Días del ejercicio" },
    { id: 3, label: "Entes público obligados" },
    { id: 4, label: "Estatus" },
    { id: 5, label: "Fuentes de pago" },
    { id: 6, label: "Fuentes alternas de Pago" },
    { id: 7, label: "Instituciones financieras" },
    { id: 8, label: "Obligados solidarios / avales" },
    { id: 9, label: "Periodicidad del pago" },
    { id: 10, label: "Reglas de financiamiento" },
    { id: 11, label: "Tasas de referencia" },
    { id: 12, label: "Tipos de comision" },
    { id: 13, label: "Tipos de Documento" },
    { id: 14, label: "Tipos de Ente Público" },
    { id: 15, label: "Usuarios" },
  ];
  const navegar = (id: number, label: string) => {
    if (label === 'Usuarios') {
      navigate("../users");
    } else {
      navigate(`../catalogos?id=${id}&label=${label}`);
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>
      <Grid
        item
        sx={{
          width: "65%",
          height: "70vh",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          justifyItems: "center",
          alignItems: "center",
          mt: 15,
          borderRadius: 10,
        }}
      >
        {modulos.map((item, index) => {
          return (
            <Button
              key={item.id}
              sx={{
                width: "80%",
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                boxShadow: 1,
              }}
              onClick={() => {
                navegar(item.id, item.label);
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
}