import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Paper,
  InputBase,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddLinkIcon from "@mui/icons-material/AddLink";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { getListadoUsuarios } from "./APIS/Solicitudes-Usuarios";
import { IUSuarios } from "./Interfaces/IUsuarios";

import {
  AccountTree as AccountTreeIcon,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
  Input,
} from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Array<IUSuarios>>([]);

  useEffect(() => {
    getListadoUsuarios(setUsuarios);
  }, []);

  const heads = [
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
        display="center"
        justifyContent="center"
      >
        {/* <Paper
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
            
            onChange={(e)=>{}}
            //inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon  onClick = {() =>{} }/>
          </IconButton>
        </Paper> */}
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: "900px" }}>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id} align="center">
                  {head.label}
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {usuarios.map((row) => (
                <StyledTableRow>
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
