import { useState, forwardRef } from "react";
import {
  Grid,
  Typography,
  Slide,
  Button,
  TextField,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { queries } from "../../../queries";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

const headsMontoAutorizado: Head[] = [
  {
    label: "Destino autorizado",
  },
  {
    label: "Monto Autorizado",
  },
  {
    label: "Acción",
  },
];

export function MontoAutorizado() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [busqueda, setBusqueda] = useState("");

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };


  const [pruebaSelect, setPruebaSelect] = useState("");

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
    <>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-evenly"
        sx={queries.contenedorAgregarAutorizacion.MontoAutorizado}
      >
        <Grid item display={"flex"} justifyContent={"space-evenly"}>
          <Grid xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>Destino Autorizado</InputLabel>
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

          <Grid xs={12} sm={12} lg={4}>
            <InputLabel sx={queries.medium_text}>Monto Autorizado</InputLabel>
            <TextField fullWidth variant="standard" />
          </Grid>

          <Grid
            height={"5rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button sx={queries.buttonContinuar}>Agregar</Button>
          </Grid>
        </Grid>

        <Grid sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
          <Paper
            sx={{
              ...queries.contenedorAgregarAutorizacion.Tablas,
              width: "86%",
            }}
          >
            <TableContainer sx={{ width: "100%"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headsMontoAutorizado.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <StyledTableCell>
                    <Typography></Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography align="center">Vacio</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography></Typography>
                  </StyledTableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
