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
import ModalReestructura from "../reestructuraModals/ModalReestrucutra"

export function Reestructura() {
  const [openAcordion, setopenAcordion] = useState(true);

  const [openModalReestructura, setOpenModalReestructura] = useState(false);


  const handleCloseModalReestructura = () => {
    setOpenModalReestructura(false);
  }
  const handleOpenModalHistorial = () => {
    setOpenModalReestructura(true);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  interface Column {
    id:
      | "Clave_de_Inscripcion"
      | "Estatus"
      | "Fecha_de_inscripción"
      | "Institucion_financiera"
      | "Fecha_de_contratación";
    //'Monto original contratado' | 'Destino' | 'Tipo de fuente de pago' | 'Tipode fuente alterna de pago' | 'Plazo(meses)' | 'Plazo(días)' | 'Acción';
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
  ];

  interface Data {
    Clave_de_Inscripcion: string;
    Estatus: string;
    Fecha_de_inscripción: string;
    Institucion_financiera: string;
    Fecha_de_contratación: string;
  }

  function createData(
    Clave_de_Inscripcion: string,
    Estatus: string,
    Fecha_de_inscripción: string,
    Institucion_financiera: string,
    Fecha_de_contratación: string
  ): Data {
    return {
      Clave_de_Inscripcion,
      Estatus,
      Fecha_de_inscripción,
      Institucion_financiera,
      Fecha_de_contratación,
    };
  }

  const rows = [
    createData("1", "Correcto", "03/02/2023", "Banco de Mexico", "01/01/2023"),
    createData("2", "Incorrecto", "09/01/2023", "Bbva", "01/01/2023"),
    createData("3", "Pendiente", "10/12/2020", "Banjico", "01/01/2023"),
    createData("4", "Pendiente", "01/09/2019", "Banregio", "01/01/2023"),
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
    <Grid container>
      <Grid
        item
        container
        xs={12}
        lg={12}
        md={12}
        sx={{
          //backgroundColor: "#0f0",
          height: "100vh",
          //boxShadow: 5,
        }}
      >
        <Container>
          

           

         

              <List
                sx={{
                  alignItems: "center",

                  justifyItems: "center",
                }}
              >
                <ListItem
                  sx={{
                    alignItems: "center",

                    justifyItems: "center",
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1, width: "33%" }}>
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

                  

                  <FormControl fullWidth sx={{ m: 1, width: "33%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de fuente de pago
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

                  <FormControl fullWidth sx={{ m: 1, width: "33%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Estatus
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
                </ListItem>

                <ListItem
                  sx={{
                    alignItems: "center",
                    backgroundColor: "white",
                    justifyItems: "center",
                  }}
                >
                 

                  <FormControl fullWidth sx={{ m: 1, width: "33%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de fuente alterna de pago
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

                  <FormControl fullWidth sx={{ m: 1, width: "33%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Destino
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

                  <TextField
                    sx={{ m: 1, width: "33%" }}
                    id="outlined-basic"
                    label="Clave de inscripción"
                    variant="outlined"
                  />
                </ListItem>
                <ListItem>
                 
                 
                    <TextField
                      sx={{ m: 1, width: "25%" }}
                      id="outlined-basic"
                      label="Fecha de contratacion desde"
                      variant="outlined"
                    />
                    <TextField
                      sx={{ m: 1, width: "25%" }}
                      id="outlined-basic"
                      label="Monto original contratado"
                      variant="outlined"
                    />
                    <Button
                      sx={{ m: 1, width: "25%" }}
                      variant="contained"
                      onClick={() => {
                        setopenAcordion(!openAcordion);
                      }}
                    >
                      LIMPIAR
                    </Button>
                  
                    <Button
                      sx={{ m: 1, width: "25%" }}
                      variant="contained"
                      onClick={() => {
                        setopenAcordion(!openAcordion);
                      }}
                    >
                      Consultar
                    </Button>
                  

                </ListItem>
              </List>

         
       




            <Grid container sx={{ width: "100%", justifyContent: 'center' }}>
              <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "5" }}>
                <TableContainer sx={{ maxHeight: 400 }}>
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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

              <Button variant="contained" sx={{ width: "15%"}}  onClick={() => { handleOpenModalHistorial()}}>ver Historial</Button>
              <ModalReestructura open={openModalReestructura} handleClose={handleCloseModalReestructura}></ModalReestructura>
            </Grid>

           
         

        </Container>

      </Grid>
    </Grid>
  );
}
