import { LateralMenu } from "../LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getClavesDeInscripcion,
  getDestinos,
  getEntePublico,
  getEstatus,
  getFuentesAlternasDePago,
  getFuentesDePago,
  getInstitucionesFinancieras,
  getTipoEntePublico,
  getTiposDeDocumento,
} from "./APIS/APISCatalogos";
import { Box } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { getObligadoSolidarioAval } from "../ObligacionesCortoPlazoPage/APIS/APISInformacionGeneral";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export function Catalogos() {
  const modulos = [
    { id: 0, label: "Claves de inscripción", get: getClavesDeInscripcion },
    { id: 1, label: "Destinos", get: getDestinos },
    {
      id: 2,
      label: "Entes Público Obligados",
      get: getEntePublico,
    },
    { id: 3, label: "Estatus", get: getEstatus },
    { id: 4, label: "Fuentes de Pago", get: getFuentesDePago },
    {
      id: 5,
      label: "Fuentes Alternas de Pago",
      get: getFuentesAlternasDePago,
    },
    {
      id: 6,
      label: "Instituciones Financieras",
      get: getInstitucionesFinancieras,
    },
    {
      id: 7,
      label: "Obligados Solidarios / Avales",
      get: getObligadoSolidarioAval,
    },
    { id: 8, label: "Tipos de Documento", get: getTiposDeDocumento },
    { id: 9, label: "Tipos de Ente Público", get: getTipoEntePublico },
  ];

  const [modulo, setModulo] = useState("Claves de inscripción");

  const [desc, setDesc] = useState("Claves de inscripción");

  const [catalogo, setCatalogo] = useState<Array<ICatalogo>>([
    {
      Id: "",
      Descripcion: "",
    },
  ]);

  const getCatalogos = (id: number) => {
    modulos[id].get(setCatalogo);
  };

  // const modifDesc = (id: number) => {
  //   modulos[id].get();
  // };

  const [page, setPage] = useState(0);

  const renglonesPagina = 5;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const [edit, setEdit] = useState(
    {
      Id: "",
      Descripcion: "",
    },
  );
  
  const [item, setItem] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

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
                  getCatalogos(index);
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
            sx={{
              bgcolor: "#f1f1f1",
              width: "90%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Typography textAlign={"center"}>{modulo.toUpperCase()}</Typography>
          </Grid>
          <Grid
            sx={{
              bgcolor: "#f1f1f1",
              width: "100%",
              height: "70%",
              overflow: "auto",
              borderRadius: 5,
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TableContainer sx={{ overflow: "unset" }}>
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
                <TableBody
                  sx={{
                    overflow: "auto",
                    "&::-webkit-scrollbar": {
                      width: ".3vw",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,.5)",
                      outline: "1px solid slategrey",
                      borderRadius: 10,
                    },
                  }}
                >
                  {catalogo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "4fr 1fr",
                          }}
                        >
                          <TableCell>{item.Descripcion}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={() => {
                                  setEdit(item);
                                  setOpenEdit(true);
                                }}
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={[
                                    {
                                      "&:hover": {
                                        color: "blue",
                                      },
                                    },
                                  ]}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={() => {
                                  setEdit(item);
                                  setOpenEdit(true);
                                }}
                              >
                                <DeleteIcon
                                  fontSize="small"
                                  sx={[
                                    {
                                      "&:hover": {
                                        color: "red",
                                      },
                                    },
                                  ]}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>

              <Dialog
                open={openEdit}
                onClose={() => {
                  setOpenEdit(false);
                }}
                fullWidth
                maxWidth={"sm"}
              >
                <DialogTitle sx={{ fontFamily: "MontserratMedium" }}>
                  Modificar Descripción: {edit.Descripcion}
                </DialogTitle>
                <DialogContent sx={{ display: "grid" }}>
                  <TextField
                    size="small"
                    label={
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "60%",
                            sm: "70%",
                            md: "80%",
                            lg: "80%",
                            xl: "100%",
                          },
                          fontFamily: "Montserrat",
                        }}
                      >
                        Nueva Descripción
                      </Typography>
                    }
                    sx={{ m: 2 }}
                    inputProps={{
                      sx: {
                        fontSize: {
                          xs: "70%",
                          sm: "80%",
                          md: "80%",
                          lg: "80%",
                          xl: "100%",
                        },
                      },
                    }}
                    value={item || ""}
                    onChange={(v) => {
                      setItem(v.target.value);
                    }}
                  ></TextField>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="error"
                    onClick={() => {
                      setOpenEdit(false);
                      setItem("");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => {}}>Aceptar</Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          </Grid>
          <Box sx={{ width: "100%" }}>
            <TablePagination
              rowsPerPageOptions={[renglonesPagina]}
              component="div"
              count={catalogo.length}
              rowsPerPage={renglonesPagina}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

interface ICatalogo {
  Id: string;
  Descripcion: string;
}
