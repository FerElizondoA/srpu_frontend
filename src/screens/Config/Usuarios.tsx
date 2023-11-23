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
  useMediaQuery,
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
import IFrame from "./AgregarNuevoUsuarios/AgregarUsuarios";

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
    (state: any) => state.changeIdUsuarioModificado
  );

  const [openAgregar, setOpenAgregar] = useState(0);

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 768px)"),
  };

  const idUsuarioModificado: string = useSolicitudUsuarioStore(
    (state) => state.idUsuarioModificado
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
        <Grid container width={"100%"} mb={2}>
          <Grid container display="flex" width={"100%"} mb={2}>
            <Grid
              item
              height={"3.2rem"}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "60%",
                "@media (min-width: 480px)": {
                  width: "65%",
                },

                "@media (min-width: 768px)": {
                  width: "55%",
                },

                "@media (min-width: 1140px)": {
                  width: "65%",
                },

                "@media (min-width: 1400px)": {
                  width: "75%",
                },

                "@media (min-width: 1870px)": {
                  width: "75%",
                },
              }}
            >
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "90%",
                  "@media (min-width: 480px)": {
                    width: "90%",
                  },

                  "@media (min-width: 768px)": {
                    width: "90%",
                  },

                  "@media (min-width: 1140px)": {
                    width: "70%",
                  },
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
              container
              display={"flex"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              sx={{
                width: "40%",
                "@media (min-width: 480px)": {
                  width: "35%",
                },

                "@media (min-width: 768px)": {
                  width: "45%",
                },

                "@media (min-width: 1140px)": {
                  width: "35%",
                },

                "@media (min-width: 1400px)": {
                  width: "25%",
                },

                "@media (min-width: 1870px)": {
                  width: "25%",
                },
              }}
            >
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"50%"}
              >
                <Button
                  color="info"
                  variant="contained"
                  sx={{
                    backgroundColor: "#15212f",
                    color: "white",
                    "&&:hover": {
                      backgroundColor: "rgba(47, 47, 47, 0.4)",
                      color: "#000",
                    },
                    //fontSize: "90%",
                    borderRadius: "0.8vh",
                    textTransform: "capitalize",
                    fontSize: ".7rem",
                    width: "2rem",
                    "@media (min-width: 480px)": {
                      fontSize: ".7rem",
                    },

                    "@media (min-width: 768px)": {
                      fontSize: "80%",
                      width: "10rem",
                    },
                  }}
                  endIcon={
                    query.isMobile ? null : (
                      <FolderSharedRoundedIcon fontSize="large" />
                    )
                  }
                  onClick={() => {
                    navigate("../solicitudes-usuarios");
                    //window.location.reload();
                  }}
                >
                  Ver Solicitudes
                </Button>
              </Grid>
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"50%"}
                //sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  endIcon={query.isMobile ? null : <PersonAddAlt1Icon />}
                  sx={{
                    backgroundColor: "#15212f",
                    color: "white",
                    "&&:hover": {
                      backgroundColor: "rgba(47, 47, 47, 0.4)",
                      color: "#000",
                    },
                    //fontSize: "90%",
                    borderRadius: "0.8vh",
                    textTransform: "capitalize",
                    fontSize: ".7rem",
                    width: "2rem",
                    "@media (min-width: 480px)": {
                      fontSize: "70%",
                      width: "3rem",
                    },

                    "@media (min-width: 768px)": {
                      fontSize: "80%",
                      width: "10rem",
                    },
                  }}
                  onClick={() => {
                    changeIdUsuarioModificado("");
                    setOpenAgregar(1);
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
                  width: ".4vw",
                  height: ".5vh",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#AF8C55",
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
                              setOpenAgregar(2);
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
      <IFrame
        source={
          "?jwt=" +
          localStorage.getItem("jwtToken")! +
          "&IdApp=" +
          localStorage.getItem("IdApp") +
          "&idUsuarioModificado=" +
          idUsuarioModificado
        }
        baseURL={String(process.env.REACT_APP_APPLICATION_LOGIN_FRONT)}
        open={openAgregar}
        setOpen={setOpenAgregar}
      />
    </Grid>
  );
};
