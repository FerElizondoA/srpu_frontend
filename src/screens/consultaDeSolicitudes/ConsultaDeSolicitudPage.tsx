import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Chip,
  Tooltip,
  Typography,
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
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import { getSolicitudes } from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { format } from "date-fns";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { DescargarConsultaSolicitud } from "../../store/CreditoCortoPlazo/solicitud_inscripcion";
import { VerBorradorDocumento } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogResumenDocumento";
import { VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { DialogEliminar } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogEliminar";
export interface IData {
  Id: string;
  NumeroRegistro: string;
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
  CreadoPor: string;
}

interface Head {
  id: keyof IData;
  isNumeric: boolean;
  label: string;
}
const heads: readonly Head[] = [
  {
    id: "NumeroRegistro",
    isNumeric: true,
    label: "Numero de Registro",
  },
  {
    id: "Institucion",
    isNumeric: true,
    label: "Institución financiera",
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
    label: "Clave de inscripción",
  },
  {
    id: "MontoOriginalContratado",
    isNumeric: true,
    label: "Monto original contratado",
  },
  {
    id: "FechaContratacion",
    isNumeric: true,
    label: "Fecha de contratación",
  },
  {
    id: "tipoDocumento",
    isNumeric: true,
    label: "Tipo de Documento",
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
        elemento.TipoSolicitud.toString()
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

  // const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const changeIdSolicitud: Function = useCortoPlazoStore(
    (state) => state.changeIdSolicitud
  );
  const changeNoRegistro: Function = useCortoPlazoStore(
    (state) => state.changeNoRegistro
  );
  const changeEditCreadoPor: Function = useCortoPlazoStore(
    (state) => state.changeEditCreadoPor
  );
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
  const setTablaDocumentos: Function = useCortoPlazoStore(
    (state) => state.setTablaDocumentos
  );

  const cleanObligadoSolidarioAval: Function = useCortoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );

  const updatecondicionFinancieraTable: Function = useCortoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );

  const addDocumento: Function = useCortoPlazoStore(
    (state) => state.addDocumento
  );

  const changeReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.changeReglasAplicables
  );

  const llenaSolicitud = (solicitud: IData) => {
    // const state = useCortoPlazoStore.getState();
    let aux: any = JSON.parse(solicitud.Solicitud);

    changeReglasAplicables(aux?.inscripcion.declaratorias);
    changeEncabezado(aux?.encabezado);

    changeInformacionGeneral(aux?.informacionGeneral);

    aux?.informacionGeneral.obligadosSolidarios.map((v: any, index: number) => {
      return addObligadoSolidarioAval(v);
    });
    aux?.condicionesFinancieras.map((v: any, index: number) => {
      return addCondicionFinanciera(v);
    });
    aux?.documentacion.map((v: any, index: number) => {
      return addDocumento(v);
    });
  };
  const idSolicitud: String = useCortoPlazoStore((state) => state.idSolicitud);

  const limpiaSolicitud = () => {
    changeIdSolicitud("");
    changeEncabezado({
      tipoDocumento: "",
      solicitanteAutorizado: {
        Solicitante: "",
        Cargo: "",
        Nombre: "",
      },
      tipoEntePublico: { Id: "", TipoEntePublico: "" },
      organismo: { Id: "", Organismo: "" },
      fechaContratacion: new Date(),
    });
    changeInformacionGeneral({
      fechaContratacion: new Date(),
      fechaVencimiento: new Date(),
      plazo: 0,
      destino: { Id: "", Descripcion: "" },
      monto: 0,
      denominacion: "",
      institucionFinanciera: { Id: "", Descripcion: "" },
    });
    cleanObligadoSolidarioAval([]);
    updatecondicionFinancieraTable([]);
    setTablaDocumentos([]);
  };

  const editarSolicitud = (Tipo : string) => {

    if(Tipo === "Crédito simple a corto plazo"){
      navigate("../ObligacionesCortoPlazo");
    }else{
      navigate("../ObligacionesLargoPlazo");
    }

    
  };

  const [openDialogVer, changeOpenDialogVer] = useState(false);

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const [openEliminar, changeOpenEliminar] = useState(false);

  useEffect(() => {
    if (openDialogVer === false) {
      limpiaSolicitud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialogVer]);

  useEffect(() => {
    if (!openEliminar) {
      getSolicitudes(setDatos);
    }
  }, [openEliminar]);

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
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
          Consulta de Solicitudes
        </Typography>
      </Grid>

      <Grid item mb={5} lg={12} display="center" justifyContent="center">
        <Paper
          component="form"
          sx={{
            display: "flex",
            width: "50%",
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
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => handleSearch()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item>
        <TableContainer
          sx={{
            height: 520,
            overflow: "auto",
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
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}>
                    <TableSortLabel>{head.label} </TableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {datosFiltrados.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell>Sin registros</StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                </StyledTableRow>
              ) : (
                datosFiltrados.map((row, index) => {
                  let chip = <></>;

                  if (row.Estatus === "Captura") {
                    chip = (
                      <Chip
                        label={row.Estatus}
                        // icon={<WarningAmberIcon />}
                        color="warning"
                        variant="outlined"
                      />
                    );
                  }

                  if (row.Estatus === "Verificacion") {
                    chip = (
                      <Chip
                        label={row.Estatus}
                        // icon={<RateReviewSharpIcon />}
                        color="info"
                        variant="outlined"
                      />
                    );
                  }

                  if (row.Estatus === "Por Firmar") {
                    chip = (
                      <Chip
                        label={row.Estatus}
                        // icon={<CheckIcon />}
                        color="secondary"
                        variant="outlined"
                      />
                    );
                  }
                  if (row.Estatus === "Firmado") {
                    chip = (
                      <Chip
                        label={row.Estatus}
                        // icon={<CheckIcon />}
                        color="success"
                        variant="outlined"
                      />
                    );
                  }

                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        sx={{ padding: "1px 15px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.NumeroRegistro}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ padding: "1px 15px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.Institucion.toString()}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.TipoEntePublico.toString()}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 20px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {chip}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 25px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.ClaveDeInscripcion.toString()}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 30px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.MontoOriginalContratado.toString()}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 25px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {format(new Date(row.FechaContratacion), "dd/MM/yyyy")}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{ padding: "1px 25px 1px 0" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.TipoSolicitud}
                      </StyledTableCell>

                      <StyledTableCell
                        sx={{
                          flexDirection: "row",
                          display: "grid",
                          gridTemplateColumns: "repeat(4,1fr)",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Tooltip title="Ver">
                          <IconButton
                            type="button"
                            onClick={() => {
                              llenaSolicitud(row);
                              changeIdSolicitud(row.Id);
                              changeNoRegistro(row.NumeroRegistro);
                              changeOpenDialogVer(!openDialogVer);
                            }}
                          >
                            <VisibilityIcon />
                            {row.Acciones}
                          </IconButton>
                        </Tooltip>

                        {localStorage.getItem("IdUsuario") === row.IdEditor &&
                          localStorage.getItem("Rol") !== "Administrador" && (
                            <Tooltip title="Editar">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  changeIdSolicitud(row?.Id);
                                  changeNoRegistro(row.NumeroRegistro);
                                  changeEditCreadoPor(row?.CreadoPor);
                                  llenaSolicitud(row);
                                  editarSolicitud(row.TipoSolicitud);
                                }}
                              >
                                <EditIcon />
                                {row.Acciones}
                              </IconButton>
                            </Tooltip>
                          )}

                        {row.Estatus === "Por Firmar" && (
                          <Tooltip title="Descargar">
                            <IconButton
                              type="button"
                              onClick={() => {
                                DescargarConsultaSolicitud(row.Solicitud);
                              }}
                            >
                              <DownloadIcon />
                              {row.Acciones}
                            </IconButton>
                          </Tooltip>
                        )}

                        {localStorage.getItem("Rol") !== "Administrador" && (
                          <Tooltip title="Comentarios">
                            <IconButton
                              type="button"
                              onClick={() => {
                                changeIdSolicitud(row?.Id || "");
                                changeEditCreadoPor(row?.CreadoPor);
                                changeOpenVerComentarios(!openVerComentarios);
                              }}
                            >
                              <CommentIcon />
                              {row.Acciones}
                            </IconButton>
                          </Tooltip>
                        )}

                        {localStorage.getItem("IdUsuario") === row.CreadoPor &&
                          localStorage.getItem("Rol") !== "Administrador" && (
                            <Tooltip title="Borrar">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  changeIdSolicitud(row?.Id || "");
                                  changeEditCreadoPor(row?.CreadoPor);
                                  changeOpenEliminar(!openEliminar);
                                  getSolicitudes(setDatos);
                                }}
                              >
                                <DeleteIcon />
                                {row.Acciones}
                              </IconButton>
                            </Tooltip>
                          )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <VerBorradorDocumento
          handler={changeOpenDialogVer}
          openState={openDialogVer}
        />
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
        />
        <DialogEliminar
          handler={changeOpenEliminar}
          openState={openEliminar}
          texto={"Solicitud"}
        />
      </Grid>
    </Grid>
  );
}
