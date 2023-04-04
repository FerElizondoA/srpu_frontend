import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Chip,
  Tooltip,
} from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";

import { StyledTableCell, StyledTableRow } from "../CustomComponents";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import { getSolicitudes } from "../APIS/APIS Cortoplazo/APISInformacionGeneral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { format } from "date-fns";
import { useCortoPlazoStore } from "../../store/main";
import { SolicitudInscripcion } from "../ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";
import { DescargarConsultaSolicitud } from "../../store/solicitud_inscripcion";

interface IData {
  Id:string;
  Institucion: string;
  TipoEntePublico: string;
  ClaveDeInscripcion: string;
  Estatus: string;
  FechaContratacion: Date;
  MontoOriginalContratado: number;
  Acciones: string;
  Solicitud: string;
  tipoDocumento: string;
}

interface Head {
  id: keyof IData;
  isNumeric: boolean;
  label: string;
}
const heads: readonly Head[] = [
  {
    id: "Institucion",
    isNumeric: true,
    label: "Institucion financiera",
  },
  {
    id: "TipoEntePublico",
    isNumeric: true,
    label: "Tipo de ente público obligado",
  },
  {
    id: "Estatus",
    isNumeric: true,
    label: "Estatus",
  },
  {
    id: "ClaveDeInscripcion",
    isNumeric: true,
    label: "Clave de inscripcion",
  },
  {
    id: "MontoOriginalContratado",
    isNumeric: true,
    label: "Monto original contratado",
  },
  {
    id: "FechaContratacion",
    isNumeric: true,
    label: "Fecha de contratacion",
  },
  {
    id: "Acciones",
    isNumeric: true,
    label: "Acciones",
  },
  {
    id: "tipoDocumento",
    isNumeric: true,
    label: "TipoDocumento",
  },
];

export function ConsultaDeSolicitudPage() {
  
  
  const [datos, setDatos] = useState<Array<IData>>([]);
  // const [datostabla, setDatosTabla] =useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const filtrarDatos = () => {
    let ResultadoBusqueda = datos.filter((elemento) => {
      if (
        elemento.ClaveDeInscripcion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Estatus.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaContratacion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Institucion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MontoOriginalContratado.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoEntePublico.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        

        return elemento;
      }
    });
    setDatosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    getSolicitudes(setDatos);
  }, []);

  useEffect(() => {
    setDatosFiltrados(datos);
  }, [datos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length != 0 ? setDatosFiltrados(datos) : null;
  }, [busqueda]);

  const navigate = useNavigate();

  const handleNavigate = (solicitud: any) => {
    //console.log("solicitud!: ", solicitud);
    let aux: any = JSON.parse(solicitud);
    console.log("aux!: ", aux);
    navigate("../ObligacionesCortoPlazo");
  };
const idsolicitud =(id: any) =>{

  
}
  const fetchDocumento: Function = useCortoPlazoStore(
    (state) => state.fetchDocumento
  );
   
  
    
  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid item mt={5} mb={5} lg={12} display="center" justifyContent="center">
        <Paper
          component="form"
          sx={{
            display: "flex",
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
              if (ev.key === "Enter") {
                handleSearch();
                ev.preventDefault();
                return false;
              }
            }}

            //inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon onClick={() => handleSearch()} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: "900px" }}>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id}>
                  
                  <TableSortLabel>{head.label} </TableSortLabel>
                  
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              
              {datosFiltrados.map((row) => {
                let chip = <></>;
                if (row.Estatus === "En_actualizacion ") {
                  
                  chip = (
                    <Chip
                      label="En verificación"
                      icon={<WarningAmberIcon />}
                      color="warning"
                      variant="outlined"
                    />
                  );
                }

                
                return (
                  <StyledTableRow
                  //sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.Institucion.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {row.TipoEntePublico.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {row.tipoDocumento.toString()}
                    </StyledTableCell> 

                    <StyledTableCell component="th" scope="row">
                      {chip}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {row.ClaveDeInscripcion.toString()}
                    </StyledTableCell>


                    <StyledTableCell component="th" scope="row">
                      {"$" + row.MontoOriginalContratado.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {format(new Date(row.FechaContratacion), "dd/MM/yyyy")}
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{ display: "flex", flexDirection: "row" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <Tooltip title="Ver">
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <VisibilityIcon
                            onClick={() => {
                              handleNavigate(row.Solicitud);
                            }}
                          />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <EditIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Descargar">
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <DownloadIcon
                            onClick={() => {
                              //console.log(JSON.parse(row.Solicitud));
                              DescargarConsultaSolicitud(row.Solicitud)
                            }}
                          />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Comentarios">
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <CommentIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
