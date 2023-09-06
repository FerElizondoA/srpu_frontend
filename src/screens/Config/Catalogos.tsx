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
  TextField,
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
import {
  DialogCatalogos,
  IDialog,
} from "../../components/Config/dialogCatalogos/DialogCatalogos";
import InfoIcon from "@mui/icons-material/Info";
import { getCatalogo } from "../../components/APIS/Config/APISCatalogos";
import { modulos } from "./Configuracion";
import SearchIcon from "@mui/icons-material/Search";
import { queries } from "../../queries";

export function Catalogos() {
  const params = new URLSearchParams(window.location.search);

  const [modulo, setModulo] = useState(
    modulos[parseInt(params.get("id") || "0")].label
  );

  const [catalogo, setCatalogo] = useState<Array<ICatalogo>>([
    {
      Id: "",
      Descripcion: "",
      OCP: 0,
      OLP: 0,
      Tipo: "",
    },
  ]);

  const [edit, setEdit] = useState<IDialog>({
    Crud: "",
    Id: parseInt(params.get("id") || "0"),
    IdDesc: "",
    Descripcion: "",
    Tipo: { Id: "", Descripcion: "" },
    OCP: 0,
    OLP: 0,
    Modulo: modulo,
    TipoEntePublico: "",
  });

  // const getCatalogos = () => {
  //   getCatalogo(setCatalogo, modulos[edit.Id].fnc);
  // };

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getCatalogo(setCatalogo, modulos[edit.Id].fnc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog, modulo]);

  useEffect(() => {
    setCatalogoFiltrado(catalogo);
  }, [catalogo]);

  const [page, setPage] = useState(0);

  const renglonesPagina = [10, 50, 100];
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina[0]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const [txt, setTxt] = useState("");

  const [catalogoFiltrado, setCatalogoFiltrado] = useState(catalogo);

  const filtrar = (str: string) => {
    if (str !== "") {
      setCatalogoFiltrado(
        catalogo.filter(
          (x: ICatalogo) =>
            x.Descripcion.toLowerCase().includes(str.toLowerCase()) ||
            x.Descripcion.toLowerCase().includes(str.toLowerCase())
        )
      );
    } else {
      setCatalogoFiltrado(catalogo);
    }
  };

  const vaciarBuscador = () => {
    let vacio = "";

    return setTxt(vacio)
  }

  return (
    <Grid container direction="column" alignItems={"center"} >
      <Grid width={"100%"}>
        <LateralMenu />
      </Grid>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}
        sx={{ ...queries.catalogosConfig, width: "100%" }}
      >
        <Grid sx={{ ...queries.configuracion }}>

          <Grid sx={{ ...queries.catalogosConfig.contenedorListado }}>
            {modulos.map((item, index) => {

              if (item.label !== "Usuarios") {
                return (

                  <Button
                    key={index}
                    sx={{ ...queries.catalogosConfig.botonListado }}
                    onClick={() => {
                      vaciarBuscador()
                      setModulo(item.label);
                      setEdit({
                        ...edit,
                        ...{ Id: index },
                        ...{ Modulo: item.label },
                      });
                      setPage(0);
                      // getCatalogos();
                    }}
                  >
                    {item.label}
                  </Button>


                );
              }
            })}
          </Grid>
          <Grid
            container
            sx={{ width: "90%", height: "100%", overflow: "auto" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid
              sx={{
                bgcolor: "#f1f1f1",
                width: "90%",
                height: "10%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 5,
                fontFamily: "MontserratMedium",
              }}
            >
              <Typography
                sx={{
                  ...queries.catalogosConfig.modulo
                }}
                textAlign={"center"}
              >
                {modulo.toUpperCase()}
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "MontserratMedium",
                }}
              >
                <TextField
                  size="small"
                  sx={{ borderRadius: "50%" }}
                  label={"Buscar"}
                  multiline
                  value={txt}

                  onChange={(v) => {
                    if (v.target.value === "") {
                      setCatalogoFiltrado(catalogo);
                    }

                    setTxt(v.target.value);
                  }}
                  onKeyPress={(ev) => {
                    //cuando se presiona Enter
                    if (ev.key === "Enter") {
                      filtrar(txt);
                      ev.preventDefault();
                      return false;
                    }
                  }}
                />

                <Tooltip title="Buscar">
                  <IconButton
                    onClick={(v) => {
                      filtrar(txt);
                    }}
                  >
                    <SearchIcon
                      sx={{
                        ...queries.buttonCancelar,
                      }}
                    />
                  </IconButton>
                </Tooltip>

            </Grid>
          </Grid>

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
                borderRadius: 1,
              },
              borderRadius: 5,
            }}

          >
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        modulo === "Entes Público Obligados"
                          ? "3fr 1fr 1fr"
                          : "4fr 1fr ",
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
                    {edit.Modulo === "Entes Público Obligados" ? (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        Tipo
                      </TableCell>
                    ) : null}
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
                  {catalogoFiltrado
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns:
                              modulo === "Entes Público Obligados"
                                ? "3fr 1fr 1fr"
                                : "4fr 1fr ",
                            height: "90%",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: "Montserrat",
                            }}
                          >
                            {item.Descripcion}
                          </TableCell>
                          {modulo === "Entes Público Obligados" ? (
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                textAlign: "center",
                              }}
                            >
                              {item.Tipo}
                            </TableCell>
                          ) : null}
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
                                  // sx={[
                                  //   {
                                  //     "&:hover": {
                                  //       color: "orange",
                                  //     },
                                  //   },
                                  // ]}
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
                                // sx={[
                                //   {
                                //     "&:hover": {
                                //       color: "blue",
                                //     },
                                //   },
                                // ]}
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
                                // sx={[
                                //   {
                                //     "&:hover": {
                                //       color: "red",
                                //     },
                                //   },
                                // ]}
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
            <Tooltip title={"Agregar"}>
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
              rowsPerPageOptions={renglonesPagina}
              labelRowsPerPage="Registros por página:"
              component="div"
              count={catalogo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
    </Grid >
  );
}

export interface ICatalogo {
  Id: string;
  Descripcion: string;
  OCP: number;
  OLP: number;
  Tipo: string;
}

export interface IModulos {
  label: string;
  fnc: string;
}
