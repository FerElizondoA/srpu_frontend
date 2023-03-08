import { Grid } from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Configuracion() {
  const navigate = useNavigate();
  const modulos = [
    { id: 1, label: "Claves de inscripción" },
    { id: 2, label: "Destinos" },
    { id: 3, label: "Entes Público Obligados" },
    { id: 4, label: "Estatus" },
    { id: 5, label: "Fuentes de Pago" },
    { id: 6, label: "Fuentes Alternas de Pago" },
    { id: 7, label: "Instituciones Financieras" },
    { id: 8, label: "Obligados Solidarios / Avales" },
    { id: 9, label: "Tipos de Documento" },
    { id: 10, label: "Tipos de Ente Público" },
    { id: 11, label: "Usuarios" },
  ];
  const navegar = (id: number, label: string) => {
    if (id === 11) {
      navigate("../users");
    } else {
      navigate("../catalogos");
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
          boxShadow: 5,
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
