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
import AddLinkIcon from "@mui/icons-material/AddLink";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import DeleteIcon from '@mui/icons-material/Delete';

import {
  AccountTree as AccountTreeIcon,
  Edit,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
  Input,
} from "@mui/icons-material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { createSolicitud, getListadoUsuarios } from "./APIS/Solicitudes-Usuarios";
import { IUSuarios } from "../../components/Interfaces/InterfacesUsuario/IUsuarios";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { StyledTableCell, StyledTableRow } from "../../components/CustomComponents";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Array<IUSuarios>>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Array<IUSuarios>>([]);

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
      label: "ApellidoPaterno",
    },
    {
      id: "ApellidoMaterno",
      label: "Apellido Materno",
    },
    {
      id: "MunicipioUOrganizacion",
      label: "Municipio u Organizacion",
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
    {
      id: "Curp",
      label: "Curp",
    },
    {
      id: "Rfc",
      label: "Rfc",
    },
  ];

  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid
        item
        //ml={window.innerWidth / 22}
        mt={5}
        mb={5}
        lg={12}
        display="flex"
        justifyContent="flex-end"
      >

        <Grid item xs={8} lg={8} sm={8} sx={{display:'flex',justifyContent:'flex-end'}}>
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

              onChange={(e) => { }}
            //inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon onClick={() => { }} />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={4} lg={4} sm={4} sx={{display:'flex',justifyContent:'flex-end'}}>
          <Button variant="contained" size="large" endIcon={<PersonAddAlt1Icon />} sx={{ mr: '2vw' }}> Añadir Usuario</Button>

        </Grid>



      </Grid>

      <Grid item sx={{height:"80vh"}}>
        <TableContainer>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id} align="center">
                  {head.label}
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {usuariosFiltrados.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">

                    <Tooltip title="Editar Usuario">
                      <IconButton aria-label="delete" size="large" onClick={() => { console.log(row); }}>
                        <Edit fontSize="inherit" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar Usuario">
                      <IconButton aria-label="delete" size="large" onClick={() => { console.log(row.id, row.ApellidoPaterno.toString()); }}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>

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

                  <StyledTableCell component="th" scope="row" align="center">
                    {row.Curp.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {row.Rfc.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
