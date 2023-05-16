import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DialogCatalogos, IDialog } from "../../components/Config/dialogCatalogos/DialogCatalogos";
import InfoIcon from "@mui/icons-material/Info";
import { getCatalogo } from "../../components/APIS/Config/APISCatalogos";

export function Catalogos() {
  const params = new URLSearchParams(window.location.search);

  const modulos = [
    {
      id: 0,
      label: "Claves de inscripción",
      fnc: "claveDeInscripcion",
    },
    {
      id: 1,
      label: "Destinos",
      fnc: "destinos",
    },
    {
      id: 2,
      label: "Días del ejercicio",
      fnc: "diasDelEjercicio",
    },
    {
      id: 3,
      label: "Entes público obligados",
      fnc: "entePublicoObligado",
    },
    {
      id: 4,
      label: "Estatus",
      fnc: "estatus",
    },
    {
      id: 5,
      label: "Fuentes de pago",
      fnc: "fuenteDePago",
    },
    {
      id: 6,
      label: "Fuentes alternas de pago",
      fnc: "fuenteAlternaDePago",
    },
    {
      id: 7,
      label: "Instituciones financieras",
      fnc: "institucionesFinancieras",
    },
    {
      id: 8,
      label: "Obligados solidarios / avales",
      fnc: "obligadoSolidarioAval",
    },
    {
      id: 9,
      label: "Periodicidad del pago",
      fnc: "periodicidadDePago",
    },
    {
      id: 10,
      label: "Reglas de financiamiento",
      fnc: "reglaDeFinanciamiento",
    },
    {
      id: 11,
      label: "Tasas de referencia",
      fnc: "tasaDeReferencia",
    },
    {
      id: 12,
      label: "Tipos de comision",
      fnc: "tipoDeComision",
    },
    {
      id: 13,
      label: "Tipos de documento",
      fnc: "tiposDocumento",
    },
    {
      id: 14,
      label: "Tipos de ente público",
      fnc: "tiposEntePublico",
    },
  ];

  const [modulo, setModulo] = useState(
    modulos[parseInt(params.get("id") || "0")].label
  );

  const [catalogo, setCatalogo] = useState<Array<ICatalogo>>([
    {
      Id: "",
      Descripcion: "",
      OCP: 0,
      OLP: 0,
    },
  ]);

  const [edit, setEdit] = useState<IDialog>({
    Crud: "",
    Id: parseInt(params.get("id") || "0"),
    IdDesc: "",
    Descripcion: "",
    OCP: 0,
    OLP: 0,
    Modulo: modulo,
  });

  // const getCatalogos = () => {
  //   getCatalogo(setCatalogo, modulos[edit.Id].fnc);
  // };

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getCatalogo(setCatalogo, modulos[edit.Id].fnc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog, modulo]);

  const [page, setPage] = useState(0);

  const renglonesPagina = 10;
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

  return (
    <Grid container direction="column" alignItems={"center"}>
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
                  fontFamily: "MontserratMedium",
                }}
                onClick={() => {
                  setModulo(item.label);
                  setEdit({
                    ...edit,
                    ...{ Id: index },
                    ...{ Modulo: item.label },
                  });
                  // getCatalogos();
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Grid>
        <Grid
          container
          sx={{ width: "90%", height: "90%", overflow: "auto" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            textAlign={"center"}
            sx={{
              bgcolor: "#f1f1f1",
              width: "90%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              fontFamily: "MontserratMedium",
            }}
          >
            {modulo.toUpperCase()}
          </Typography>
          <Grid
            sx={{
              bgcolor: "#f1f1f1",
              width: "100%",
              height: "70%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
              borderRadius: 5,
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "4fr 1fr",
                    }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Descripción
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Acción
                    </TableCell>
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
                            height: "90%",
                          }}
                        >
                          <TableCell sx={{ fontFamily: "Montserrat" }}>
                            {item.Descripcion}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {modulo === "Reglas de financiamiento" ||
                            modulo === "Tipos de documento" ? (
                              <Tooltip
                                title={
                                  item.OCP === 1 && item.OLP === 1
                                    ? "Obligatorio en corto plazo y largo plazo"
                                    : item.OCP === 1 && item.OLP === 0
                                    ? "Obligatorio en corto plazo"
                                    : item.OCP === 0 && item.OLP === 1
                                    ? "Obligatorio en largo plazo"
                                    : "No obligatorio en corto plazo o largo plazo"
                                }
                              >
                                <IconButton>
                                  <InfoIcon
                                    fontSize="small"
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "orange",
                                        },
                                      },
                                    ]}
                                  ></InfoIcon>
                                </IconButton>
                              </Tooltip>
                            ) : null}
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={() => {
                                  setEdit((edit) => ({
                                    ...edit,
                                    ...{ IdDesc: item.Id },
                                    ...{ Descripcion: item.Descripcion },
                                    ...{ Crud: "edita" },
                                    ...{ OCP: item.OCP },
                                    ...{ OLP: item.OLP },
                                  }));
                                  setOpenDialog(true);
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
                                  setEdit((edit) => ({
                                    ...edit,
                                    ...{ IdDesc: item.Id },
                                    ...{ Descripcion: item.Descripcion },
                                    ...{ Crud: "elimina" },
                                  }));
                                  setOpenDialog(true);
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
            </TableContainer>
          </Grid>

          <DialogCatalogos
            modulos={modulos}
            edit={edit}
            open={openDialog}
            setOpen={setOpenDialog}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Tooltip title={"Agregar nuevo elemento a la tabla actual"}>
              <Button
                onClick={() => {
                  setEdit((edit) => ({
                    ...edit,
                    ...{ Crud: "crea" },
                    ...{ Descripcion: "" },
                    ...{ OCP: 0 },
                    ...{ OLP: 0 },
                  }));
                  setOpenDialog(true);
                }}
              >
                <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
              </Button>
            </Tooltip>
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

export interface ICatalogo {
  Id: string;
  Descripcion: string;
  OCP: number;
  OLP: number;
}

export interface IModulos {
  id: number;
  label: string;
  fnc: string;
}
