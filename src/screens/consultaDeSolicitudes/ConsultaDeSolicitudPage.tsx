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
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { format } from "date-fns";
import { useCortoPlazoStore } from "../../store/main";
import { DescargarConsultaSolicitud } from "../../store/solicitud_inscripcion";
import { VerBorradorDocumento } from "../../components/ObligacionesCortoPlazoPage/dialogs/VerBorradorDocumento";
import { VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/dialogs/VerComentariosSolicitud";

interface IData {
  Id: string;
  Institucion: string;
  TipoEntePublico: string;
  ClaveDeInscripcion: string;
  Estatus: string;
  FechaContratacion: Date;
  MontoOriginalContratado: number;
  Acciones: string;
  Solicitud: string;
  tipoDocumento: string;
  TipoSolicitud: string;
  IdEditor: string;
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
    id: "tipoDocumento",
    isNumeric: true,
    label: "TipoDocumento",
  },
  {
    id: "Acciones",
    isNumeric: true,
    label: "Acciones",
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
    // eslint-disable-next-line array-callback-return
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
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.tipoDocumento
          .toString()
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
    busqueda.length !== 0 ? setDatosFiltrados(datos) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  const navigate = useNavigate();
  const changeEncabezado: Function = useCortoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneral: Function = useCortoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const editarSolicitud = (solicitud: IData) => {
    let aux: any = JSON.parse(solicitud.Solicitud);
    aux.IdSolicitud = solicitud.Id;
    // useCortoPlazoStore.setState(aux);
    console.log(aux);
    changeEncabezado(aux?.encabezado);
    changeInformacionGeneral(aux?.informacionGeneral);
    aux?.informacionGeneral.obligadosSolidarios.map((v: any, index: number) => {
      addObligadoSolidarioAval(v);
    });
    aux?.condicionesFinancieras.map((v: any, index: number) => {
      addCondicionFinanciera(v);
    });
    navigate("../ObligacionesCortoPlazo");
  };

  // const fetchBorrarSolicitud: Function = useCortoPlazoStore(
  //   (state) => state.fetchBorrarSolicitud
  // );

  /////////////////////////////////////////////
  const [selected] = useState<number[]>([]); //, setSelected

  const [openDialogVer, changeOpenDialogVer] = useState(false);

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

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

                    <StyledTableCell component="th" scope="row">
                      {row.TipoSolicitud}
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{ flexDirection: "row" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <Tooltip title="Ver">
                        <IconButton
                          type="button"
                          aria-label="search"
                          onClick={() => {
                            changeOpenDialogVer(!openDialogVer);
                          }}
                        >
                          <VisibilityIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit">
                        <IconButton
                          type="button"
                          aria-label="search"
                          onClick={() => {
                            editarSolicitud(row);
                          }}
                        >
                          <EditIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Descargar">
                        <IconButton
                          type="button"
                          aria-label="search"
                          onClick={() => {
                            DescargarConsultaSolicitud(row.Solicitud);
                          }}
                        >
                          <DownloadIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Comentarios">
                        <IconButton
                          type="button"
                          aria-label="search"
                          onClick={() => {
                            changeOpenVerComentarios(!openVerComentarios);
                          }}
                        >
                          <CommentIcon />
                          {row.Acciones}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Borrar">
                        <IconButton
                          type="button"
                          disabled={
                            localStorage.getItem("Rol") === "Capturador"
                              ? true
                              : false
                          }
                          aria-label="search"
                          onClick={() => {
                            getSolicitudes(setDatos);
                            // fetchBorrarSolicitud(row.Id);
                            getSolicitudes(setDatos);
                          }}
                        >
                          <DeleteIcon />
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
        <VerBorradorDocumento
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          selected={selected}
        />
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
          selected={selected}
        />
      </Grid>
    </Grid>
  );
}
