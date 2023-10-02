import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListadoUsuarios } from "../../components/APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { IUsuarios } from "../../components/Interfaces/InterfacesUsuario/IUsuarios";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { queries } from "../../queries";
import { useSolicitudUsuarioStore } from "../../store/SolicitudUsuario/main";

export const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Array<IUsuarios>>(
    []
  );

  const heads = [
    {
      id: "Acciones",
      label: "Acciones",
    },
    {
      id: "Nombre",
      label: "Nombre",
    },
    {
      id: "ApellidoPaterno",
      label: "Apellido Paterno",
    },
    {
      id: "ApellidoMaterno",
      label: "Apellido Materno",
    },
    {
      id: "NombreUsuario",
      label: "Nombre Usuario",
    },
    {
      id: "CorreoElectronico",
      label: "Correo Electrónico",
    },
    {
      id: "Puesto",
      label: "Puesto",
    },
    { id: "Dependencia", label: "Dependencia" },
    {
      id: "Telefono",
      label: "Teléfono",
    },
    {
      id: "Ext",
      label: "Ext",
    },
    {
      id: "Celular",
      label: "Teléfono Móvil",
    },
  ];

  /* BUSCADOR */
  // const [datos, setDatos] = useState<Array<IUsuarios>>([]);
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  // const handleSearch = () => {
  //   filtrarDatos();
  // };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    let ResultadoBusqueda = usuarios.filter((elemento) => {
      if (
        elemento.Nombre?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.ApellidoPaterno?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.ApellidoMaterno?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.NombreUsuario?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.CorreoElectronico?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.Puesto?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.Dependencia?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.Telefono?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        ) ||
        elemento.Celular?.toLocaleLowerCase().includes(
          busqueda?.toLocaleLowerCase()
        )
      ) {
        return elemento;
      }
    });
    setUsuariosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    getListadoUsuarios(setUsuarios);
  }, []);

  useEffect(() => {
    setUsuariosFiltrados(usuarios);
  }, [usuarios]);

  useEffect(() => {
    busqueda.length !== 0 && setUsuariosFiltrados(usuarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  const changeIdUsuarioModificado: Function = useSolicitudUsuarioStore(
    (state) => state.changeIdUsuarioModificado
  );

  return (
    <Grid
      container
      direction="column"
      rowSpacing={{ xs: 6, sm: 2, md: 4, xl: 2 }}
    >
      {/* GRID  HEADER */}
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",

            color: "#AF8C55",

            fontFamily: "MontserratBold",
            "@media (max-width: 600px)": {
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
          }}
        >
          Listado de Usuarios
        </Typography>
      </Grid>

      {
        <Grid item width={"100%"} xs={12} lg={12} sm={12}>
          <Grid item lg={12} display="flex" justifyContent="flex-end">
            <Grid
              item
              xs={8}
              lg={8}
              sm={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  //alignItems: "center",
                  width: "80%",
                }}
              >
                <InputBase
                  id="Enter"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Buscar"
                  value={busqueda}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  onKeyPress={(ev) => {
                    //cuando se presiona Enter
                    if (ev.key === "Enter") {
                      filtrarDatos();
                      ev.preventDefault();
                      return false;
                    }
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  title="Buscar"
                  onClick={() => {
                    filtrarDatos();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>

            <Grid
              display={"flex"}
              justifyContent={"space-evenly"}
              width={"25%"}
            >
              <Grid
                item
                xs={2}
                lg={6}
                sm={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  color="info"
                  variant="contained"
                  sx={queries.buttonContinuar}
                  endIcon={<FolderSharedRoundedIcon fontSize="large" />}
                  onClick={() => {
                    navigate("../solicitudes-usuarios");
                  }}
                >
                  Ver Solicitudes
                </Button>
              </Grid>
              <Grid
                item
                xs={2}
                lg={6}
                sm={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  endIcon={<PersonAddAlt1Icon />}
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    changeIdUsuarioModificado("");
                    navigate("../Iframe");
                  }}
                >
                  Añadir Usuario
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Paper sx={queries.tablaUsuarios}>
            <TableContainer
              sx={{
                maxHeight: "100%",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,5)",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {heads.map((head) => (
                      <StyledTableCell
                        key={head.id}
                        align="center"
                        sx={{ height: "10vh" }}
                      >
                        {head.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuariosFiltrados?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <Tooltip title="Editar / Eliminar Usuario">
                          <IconButton
                            size="medium"
                            onClick={() => {
                              changeIdUsuarioModificado(row.Id);
                              navigate(`../Iframe`);
                            }}
                          >
                            <Edit fontSize="inherit" />
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Nombre}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.ApellidoPaterno}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.ApellidoMaterno}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.NombreUsuario}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.CorreoElectronico}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Puesto}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Dependencia}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Telefono}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Ext}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Celular}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      }
      {/* <DialogUsuarios
        ActionButton={butonLabel}
        open={openDialog}
        title={title}
        handleClose={openDialogUser}
        UserObject={usuarioEdit}
      /> */}
    </Grid>
  );
};
