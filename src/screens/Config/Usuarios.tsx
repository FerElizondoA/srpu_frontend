import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  InputBase,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import { Navigate, Route, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AccountTree as AccountTreeIcon,
  Edit,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
  Input,
} from "@mui/icons-material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { createSolicitud, getListadoUsuarios } from "./APIS/Solicitudes-Usuarios";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { IUsuarios } from "../../components/Interfaces/InterfacesUsuario/IUsuarios";
import { StyledTableCell, StyledTableRow } from "../../components/CustomComponents";
import { DialogUsuarios } from "../../components/Config/DialogUsuarios/DialogUsuarios";


export const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Array<IUsuarios>>([]);

  useEffect(() => {
    getListadoUsuarios(setUsuarios);
  }, []);

  useEffect(() => {
    setUsuariosFiltrados(usuarios);
  }, [usuarios]);

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
      id: "EntePublico",
      label: "Ente Publico",
    },
    {
      id: "Cargo",
      label: "Cargo",
    },
    {
      id: "Rol",
      label: "Rol",
    },
    {
      id: "CorreoElectronico",
      label: "Correo Electronico",
    },
    {
      id: "Telefono",
      label: "Telefono",
    },
    {
      id: "Ext",
      label: "Ext",
    },
    {
      id: "Celular",
      label: "Celular",
    },
    // {
    //   id: "Curp",
    //   label: "Curp",
    // },
    // {
    //   id: "Rfc",
    //   label: "Rfc",
    // },
  ];

  /* BUSCADOR */

  const [datos, setDatos] = useState<Array<IUsuarios>>([]);
  const [busqueda, setBusqueda] = useState("");


  const [datosFiltrados, setDatosFiltrados] = useState<Array<IUsuarios>>([]);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const filtrarDatos = () => {
    let ResultadoBusqueda = datos.filter((elemento) => {
      if (
        elemento.Nombre.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.ApellidoPaterno.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.ApellidoMaterno.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MunicipioUOrganizacion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Cargo.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Rol.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.CorreoElectronico.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Telefono.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Ext.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Celular.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Curp.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Rfc.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {

        return elemento;
      }
    });
    setUsuariosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    getListadoUsuarios(setDatos);
  }, []);

  useEffect(() => {
    setUsuariosFiltrados(datos);
  }, [datos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length != 0 ? setUsuariosFiltrados(datos) : null;
  }, [busqueda]);
  /*  FIN BUSCADOR */




  const [usuarioEdit, setUsuarioEdit] = useState<IUsuarios>();

  const openNewUsuario = () => {
    setButonLabel('Agregar');
    setTitle('AGREGAR USUARIO.');

    setUsuarioEdit({
      id: '',
      IdCentral: '',
      Nombre: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      NombreUsuario: '',
      CorreoElectronico: '',
      Curp: '',
      Rfc: '',
      Telefono: '',
      Ext: '',
      Celular: '',
      Cargo: '',
      CorreoDeRecuperacion: '',
      IdRol: '',
      Rol: '',
      MunicipioUOrganizacion: '',
      IdMunicipioUOrganizacion: '',
    })
    openDialogUser();
  }
  const openEditarUsuario = (name: string, usuario: IUsuarios) => {
    setButonLabel('Editar');
    setTitle('EDITAR USUARIO ' + name.toUpperCase + '.');

    setUsuarioEdit(usuario);
    openDialogUser();
  }

  const [butonLabel, setButonLabel] = useState('Agregar');
  const [title, setTitle] = useState("AGREGAR  USUARIO.");

  /*DIALOG */
  const [openDialog, setOpenDialog] = useState(false);
  const openDialogUser = () => {
    setOpenDialog(!openDialog);

  };

  return (
    <Grid container direction="column" rowSpacing={{ xs: 6,sm:2, md: 4,xl:4,}}>
      {/* GRID  HEADER */}
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      {/* GRID BODY */}
      <Grid item 
        xs={12}
        lg={12}
        sm={12}
        
        >

            {/* GRRID Filtro Y BOTONES */}
        <Grid
          item
          //ml={window.innerWidth / 22}
          lg={12}
          display="flex"
          justifyContent="flex-end"
          alignItems={''}
          
        >
          <Grid
            item
            xs={8}
            lg={8}
            sm={8}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                //alignItems: "center",
                width: 800,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                onKeyPress={(ev) => {
                  //cuando se presiona Enter
                  if (ev.key === "Enter") {
                    handleSearch();
                    ev.preventDefault();
                    return false;
                  }
                }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </IconButton>
            </Paper>
          </Grid>

          <Grid
            item
            xs={2}
            lg={2}
            sm={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              color="info"
              variant="contained"
              sx={{ width: "80%" }}
              endIcon={<FolderSharedRoundedIcon fontSize="large" />}
              onClick={() => { navigate("../solicitudes-usuarios") }}
            >
              Ver Solicitudes
            </Button>
          </Grid>
          <Grid
            item
            xs={2}
            lg={2}
            sm={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              size="medium"
              endIcon={<PersonAddAlt1Icon />}
              sx={{ width: "80%" }}
              onClick={() => {
                openNewUsuario();
              }}
            >
              Añadir Usuario
            </Button>
          </Grid>
        </Grid>

        <Grid item sx={{height: "80vh"}}>
          <TableContainer>
            <Table>
              <TableHead>
                {heads.map((head) => (
                  <StyledTableCell key={head.id} align="center" sx={{height:'10vh' }}>
                    {head.label}
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {usuariosFiltrados?.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell
                      sx={{ display: "flex",height:'10vh' }}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      <>
                        <Tooltip title="Editar Usuario">
                          <IconButton
                            size="large"
                            onClick={() => {
                              openEditarUsuario(
                                row.Nombre + " " + row.ApellidoPaterno,
                                row
                              );
                            }}
                          >
                            <Edit fontSize="inherit" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar Usuario">
                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              console.log(row.id, row.ApellidoPaterno.toString());
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Nombre.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.ApellidoPaterno.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.ApellidoMaterno.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.MunicipioUOrganizacion.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Cargo.toString()}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Rol.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.CorreoElectronico.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Telefono.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Ext.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Celular.toString()}
                    </StyledTableCell>

                    {/* <StyledTableCell component="th" scope="row" align="center">
                    {row.Curp.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {row.Rfc.toString()}
                  </StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <DialogUsuarios
        ActionButton={butonLabel}
        open={openDialog}
        title={title}
        handleClose={openDialogUser}
        UserObject={usuarioEdit}
      />
    </Grid>
  );
};
