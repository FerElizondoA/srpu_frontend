import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
//import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { height } from "@mui/system";

export const text = {
  medium: {
    fontFamily: "MontserratMedium",
    fontSize: "1.0vw",
  },
};

export function Reestructura() {
  const [openAcordion, setopenAcordion] = useState(true);

  const [openModalReestructura, setOpenModalReestructura] = useState(false);

  const handleCloseModalReestructura = () => {
    setOpenModalReestructura(false);
  };
  const handleOpenModalHistorial = () => {
    setOpenModalReestructura(true);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  interface Column {
    id:
      | "Clave_de_Inscripcion"
      | "Estatus"
      | "Fecha_de_inscripción"
      | "Institucion_financiera"
      | "Fecha_de_contratación"
      | "Monto_original_contratado";
    //| 'Destino' | 'Tipo de fuente de pago' | 'Tipode fuente alterna de pago' | 'Plazo(meses)' | 'Plazo(días)' | 'Acción';
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    {
      id: "Clave_de_Inscripcion",
      label: "Clave de Inscripcion",
      minWidth: 170,
    },
    { id: "Estatus", label: "Estatus", minWidth: 100 },
    {
      id: "Fecha_de_inscripción",
      label: "Fecha de Inscripción",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "Institucion_financiera",
      label: "Institucion Financiera",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "Fecha_de_contratación",
      label: "Fecha de Contratación",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "Monto_original_contratado",
      label: "Monto_original_contratado",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
  ];

  interface Data {
    Clave_de_Inscripcion: string;
    Estatus: string;
    Fecha_de_inscripción: string;
    Institucion_financiera: string;
    Fecha_de_contratación: string;
    Monto_original_contratado: string;
  }

  function createData(
    Clave_de_Inscripcion: string,
    Estatus: string,
    Fecha_de_inscripción: string,
    Institucion_financiera: string,
    Fecha_de_contratación: string,
    Monto_original_contratado: string
  ): Data {
    return {
      Clave_de_Inscripcion,
      Estatus,
      Fecha_de_inscripción,
      Institucion_financiera,
      Fecha_de_contratación,
      Monto_original_contratado,
    };
  }

  const rows = [
    createData(
      "1",
      "Correcto",
      "03/02/2023",
      "Banco de Mexico",
      "01/01/2023",
      "1000000"
    ),
    createData(
      "2",
      "Incorrecto",
      "09/01/2023",
      "Bbva",
      "01/01/2023",
      "2000000"
    ),
    createData(
      "3",
      "Pendiente",
      "10/12/2020",
      "Banjico",
      "01/01/2023",
      "3000000"
    ),
    createData(
      "4",
      "Pendiente",
      "01/09/2019",
      "Banregio",
      "01/01/2023",
      "1000000"
    ),
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Grid container direction="column">
      <Grid container direction="row" sx={{ backgroundColor: "yellow" }}>
        <Grid
          item
          container
          mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
          ml={{ sm: 4, md: 9, lg: 10, xl: 0 }}
          sm={5}
          md={4}
          lg={4.5}
          xl={6}
        >
          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Institución financiera
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Destino</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Fecha de contratacion desde"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ display: "grid" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setopenAcordion(!openAcordion);
              }}
            >
              LIMPIAR
            </Button>
          </Grid>
        </Grid>

        {/* //////////////////////////////////////////////            columnas o rows                       ////////////////////////////////////////*/}

        <Grid
          item
          container
          mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
          ml={{ sm: 4, md: 9, lg: 10, xl: 0 }}
          sm={5}
          md={4}
          lg={4.5}
          xl={6}
        >
          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Institución financiera
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Destino</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Institución financiera"
              >
                <MenuItem value={10}>No aplica</MenuItem>
                <MenuItem value={20}>Aplica</MenuItem>
                <MenuItem value={30}>Indefinido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ height: "10%" }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Fecha de contratacion desde"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 10 }}
            sm={5}
            md={4}
            lg={4.5}
            xl={6}
            sx={{ display: "grid" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setopenAcordion(!openAcordion);
              }}
            >
              LIMPIAR
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      <Grid
        container
        direction="column"
        sx={{
          backgroundColor: "green",
          display: "center",
        }}
      >
        <Grid
          item
          mt={{ sm: 2, md: 2, lg: 4, xl: 2 }}
          ml={{ sm: 4, md: 9, lg: 10, xl: 0 }}
          sm={5}
          md={4}
          lg={4.5}
          xl={0}
          //sx={{ display: "grid" }}
        >
          <Paper sx={{ overflow: "hidden", boxShadow: "5", display: "grid" }}>
            <TableContainer sx={{ maxHeight: 270 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Estatus}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
