import { LateralMenu } from "../LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function Catalogos() {
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

  const [modulo, setModulo] = useState("");

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
          height: "80vh",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          justifyItems: "center",
          alignItems: "center",
          boxShadow: 5,
          mt: 10,
          borderRadius: 10,
        }}
      >
        <Grid>
          {modulos.map((item, index) => {
            return (
              <Button
                key={item.id}
                sx={{
                  width: "100%",
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "start",
                }}
                onClick={() => {
                  setModulo(item.label);
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Grid>
        <Grid
          container
          sx={{ width: "90%", height: "90%" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            sx={{ bgcolor: "lightGrey", width: "90%", height: "10%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography textAlign={"center"}>{modulo.toUpperCase()}</Typography>
          </Grid>
          <Grid
            sx={{ bgcolor: "lightGrey", width: "90%", height: "70%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "4fr 1fr",
                    width: "39vw",
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>
                    Descripción
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "4fr 1fr",
                    width: "39vw",
                  }}
                >
                  <TableCell>Descripción</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
