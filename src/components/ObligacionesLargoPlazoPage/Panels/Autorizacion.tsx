import {
  Grid,
  Tabs,
  Tab,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { StyledTableCell } from "../../CustomComponents";

interface Head {
  label: string;
}

const heads :Head[] = [
  {
    label: "Tipo de autorización"
  },
  {
    label: "Número de autorización"
  },
  {
    label: "Fecha de publicación"
  },
  {
    label: "Monto autorizado"
  },
  {
    label: "Medio de publicación"
  },
  {
    label: "Tipo de autorización"
  },
  {
    label: "Documento soporte"
  },
  {
    label: "Detalle del destino"
  },
]

export function Autorizacion() {
  const [autorizacion, setAutorizacion] = useState("");

  return (
    <Grid container sx={queries.contenedorAutorizacion} direction={"column"} justifyContent={"space-evenly"}>
      <Grid display={"flex"} justifyContent={"space-evenly"} width={"100%"}>

        <Grid  display={"flex"} justifyContent={"center"}  xs={8} sm={8} md={8} lg={3} xl={7.5}>
          <FormControl fullWidth>
            <InputLabel >Autorización de la Legislatura:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Seleccione el tipo de autorización"
              value={autorizacion}
              onChange={(v) => {
                setAutorizacion(v.target.value);
              }}
            >
              <MenuItem value={"1"}>Autorización 1</MenuItem>
              <MenuItem value={"2"}>Autorización 2</MenuItem>
              <MenuItem value={"3"}>Autorización 3</MenuItem>
              <MenuItem value={"4"}>Autorización 4</MenuItem>
              <MenuItem value={"5"}>Autorización 5</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid width={"20%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
          <Grid lg={3}>
            <Button sx={queries.buttonContinuar} variant="outlined">
              Nuevo
            </Button>
          </Grid>

          <Grid lg={3}>
            <Button sx={queries.buttonCancelar} variant="outlined">
              Asignar
            </Button>
          </Grid>
        </Grid>

      </Grid>

      <Grid display={"flex"} justifyContent={"space-evenly"}>
        <Grid lg={3}>
          <TextField fullWidth label="Tipo de autorización" variant="standard" />
        </Grid>
        <Grid lg={3}>
          <TextField fullWidth label="Número de autorización" variant="standard" />
        </Grid>
        <Grid lg={3}>
          <TextField fullWidth label="Fecha de publicación" variant="standard" />
        </Grid>
      </Grid>

      <Grid display={"flex"} justifyContent={"space-evenly"}>
        <Grid lg={2.1}>
          <TextField fullWidth label="Monto autorizado" variant="standard" />
        </Grid>
        <Grid lg={2}>
          <TextField fullWidth label="Medio de publicación" variant="standard" />
        </Grid>
        <Grid lg={2.1}>
          <TextField fullWidth label="Documento soporte" variant="standard" />
        </Grid>
        <Grid lg={2}>
          <TextField fullWidth label="Detalle del destino" variant="standard" />
        </Grid>
      </Grid>

      <Grid container sx={queries.tablaDisposicionPagosCapital}>
        <Paper sx={{width: "88%"}}> 
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

        </Paper>
      </Grid>
    </Grid>
  );
}
