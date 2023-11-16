import {
  Chip,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";

import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { differenceInDays, format, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSolicitudes,
  getSolicitudesAdmin,
} from "../../components/APIS/cortoplazo/APISInformacionGeneral";
import {
  IComentarios,
  VerComentariosSolicitud,
} from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { DialogEliminar } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogEliminar";
import { VerBorradorDocumento } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogResumenDocumento";
import { Autorizaciones } from "../../store/Autorizacion/agregarAutorizacion";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";

import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { DialogDescargaArchivos } from "../../components/ConsultaDeSolicitudes/DialogDescargaArchivos";
import { rolesAdmin } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import {
  CambiaEstatus,
  ConsultaConstancia,
  ConsultaRequerimientos,
  ConsultaSolicitud,
  IDataFirmaDetalle,
} from "../../store/SolicitudFirma/solicitudFirma";
import InfoIcon from "@mui/icons-material/Info";

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
  IdPathDoc: string;
  UltimaModificacion: string;
  FechaRequerimientos: string;
}

export interface IDataPrueba {
  ClaveDeInscripcion: string;
  CreadoPor: string;
  Estatus: string;
  FechaContratacion: string;
  FechaCreacion: string;
  FechaRequerimientos: string;
  Id: string;
  IdEditor: string;
  IdPathDoc: string;
  Institucion: string;
  ModificadoPor: string;
  MontoOriginalContratado: string;
  Nombre: string;
  NumeroRegistro: number;
  Solicitud: string;
  TipoEntePublico: string;
  TipoSolicitud: string;
  UltimaModificacion: string;
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
    label: "Número de Solicitud",
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
    id: "FechaRequerimientos",
    isNumeric: true,
    label: "Fecha Requerimientos",
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
  const [busqueda, setBusqueda] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);
  const [rowId, setRowId] = useState("");

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
        elemento.ClaveDeInscripcion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Estatus?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaContratacion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Institucion?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MontoOriginalContratado?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoEntePublico?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoSolicitud?.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        return elemento;
      }
    });

    setDatosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    if (
      localStorage.getItem("Rol") === "Capturador" ||
      localStorage.getItem("Rol") === "Verificador"
    ) {
      getSolicitudes(setDatos);
    } else if (localStorage.getItem("Rol") === "Revisor") {
      getSolicitudesAdmin("Revision", setDatos);
    } else if (localStorage.getItem("Rol") === "Validador") {
      getSolicitudesAdmin("Validacion", setDatos);
    } else if (localStorage.getItem("Rol") === "Autorizador") {
      getSolicitudesAdmin("Autorizacion", setDatos);
    }
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
  const changeEstatus: Function = useCortoPlazoStore(
    (state) => state.changeEstatus
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

  // Largo plazo
  const changeIdSolicitudLP: Function = useLargoPlazoStore(
    (state) => state.changeIdSolicitud
  );
  const changeNoRegistroLP: Function = useLargoPlazoStore(
    (state) => state.changeNoRegistro
  );
  const changeEditCreadoPorLP: Function = useLargoPlazoStore(
    (state) => state.changeEditCreadoPor
  );
  const changeEncabezadoLP: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );
  const changeInformacionGeneralLP: Function = useLargoPlazoStore(
    (state) => state.changeInformacionGeneral
  );
  const addObligadoSolidarioAvalLP: Function = useLargoPlazoStore(
    (state) => state.addObligadoSolidarioAval
  );
  const addCondicionFinancieraLP: Function = useLargoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const setTablaDocumentosLP: Function = useLargoPlazoStore(
    (state) => state.setTablaDocumentosLP
  );

  const cleanObligadoSolidarioAvalLP: Function = useLargoPlazoStore(
    (state) => state.cleanObligadoSolidarioAval
  );

  const updatecondicionFinancieraTableLP: Function = useLargoPlazoStore(
    (state) => state.updatecondicionFinancieraTable
  );

  const addDocumentoLP: Function = useLargoPlazoStore(
    (state) => state.addDocumentoLP
  );

  const changeReglasAplicablesLP: Function = useLargoPlazoStore(
    (state) => state.changeReglasAplicables
  );

  const autorizacionSelect: Autorizaciones[] = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );

  const setAutorizacionSelect: Function = useLargoPlazoStore(
    (state) => state.setAutorizacionSelect
  );

  const changeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGastosCostos
  );

  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGeneralGastosCostos
  );

  //START Row Solicitud

  const rowSolicitud: IDataPrueba = useSolicitudFirmaStore(
    (state) => state.rowSolicitud
  );

  const setRowSolicitud: Function = useSolicitudFirmaStore(
    (state) => state.setRowSolicitud
  );

  const cleanRowSolicitud: Function = useSolicitudFirmaStore(
    (state) => state.cleanRowSolicitud
  );

  //END Row Solicitud

  //const [rowSolicitud, setRowSolicitud] = useState<Array<IDataPrueba>>([]);

  const llenaSolicitud = (solicitud: IData, TipoDocumento: string) => {
    // const state = useCortoPlazoStore.getState();

    if (TipoDocumento === "Crédito simple a corto plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud);

      changeReglasAplicables(aux?.inscripcion.declaratorias);
      changeEncabezado(aux?.encabezado);
      changeInformacionGeneral(aux?.informacionGeneral);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAval(v);
        }
      );
      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return addCondicionFinanciera(v);
      });
      aux?.documentacion.map((v: any, index: number) => {
        return addDocumento(v);
      });
    } else if (TipoDocumento === "Crédito simple a largo plazo") {
      let aux: any = JSON.parse(solicitud.Solicitud!);

      changeReglasAplicablesLP(aux?.inscripcion.declaratorias);
      changeEncabezadoLP(aux?.encabezado);
      changeInformacionGeneralLP(aux?.informacionGeneral);
      changeGastosCostos(aux?.GastosCostos);

      aux?.informacionGeneral.obligadosSolidarios.map(
        (v: any, index: number) => {
          return addObligadoSolidarioAvalLP(v);
        }
      );

      aux?.GastosCostos.generalGastosCostos.map((v: any, index: number) => {
        return addGeneralGastosCostos(v);
      });

      //aux?.registrarAutorizacion.autorizacionSelect.map((v: any, index: number) => {
      //  return setAutorizacionSelect(v);
      //});

      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return addCondicionFinancieraLP(v);
      });

      aux?.documentacion.map((v: any, index: number) => {
        return addDocumentoLP(v);
      });
    }
  };

  const [datosComentario, setDatosComentarios] = useState<Array<IComentarios>>(
    []
  );

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

    useCortoPlazoStore.setState({
      comentarios: {},
      idComentario: "",
    });
  };

  const editarSolicitud = (Tipo: string) => {
    if (Tipo === "Crédito simple a corto plazo") {
      navigate("../ObligacionesCortoPlazo");
    } else {
      navigate("../ObligacionesLargoPlazo");
    }
  };

  const [openDialogVer, changeOpenDialogVer] = useState(false);

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const [openEliminar, changeOpenEliminar] = useState(false);

  const [openDescargar, setOpenDescargar] = useState(false);

  const [solicitud, setSolicitud] = useState({ Id: "", noSolicitud: "" });

  useEffect(() => {
    if (openDialogVer === false) {
      limpiaSolicitud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialogVer]);

  useEffect(() => {
    if (!openEliminar) {
      if (!rolesAdmin.includes(localStorage.getItem("Rol")!)) {
        getSolicitudes(setDatos);
      } else {
        getSolicitudesAdmin("Autorizacion", setDatos);
      }
    }
  }, [openEliminar]);

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const requerimientos = (
    Solicitud: string,
    noRegistro: string,
    Requerimiento: any,
    IdSolicitud: string
  ) => {
    let a: any = {};

    Object.keys(JSON.parse(Requerimiento?.Comentarios)).map((v) => {
      return a[v]
        ? (a[v] = a[v] + ` ; ` + JSON.parse(Requerimiento?.Comentarios)[v])
        : (a = { ...a, [v]: JSON.parse(Requerimiento?.Comentarios)[v] });
    });

    ConsultaRequerimientos(Solicitud, a, noRegistro, setUrl);

    changeEstatus("Actualizacion");
    changeIdSolicitud(IdSolicitud);
    navigate("../firmaUrl");
  };

  const getDays = (date: any, days: any) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const setDatosActualizar: Function = useCortoPlazoStore(
    (state) => state.setDatosActualizar
  );

  const getCatalogoFirmaDetalle: Function = useSolicitudFirmaStore(
    (state) => state.getCatalogoFirmaDetalle
  )
  const catalogoFirmaDetalle: IDataFirmaDetalle = useSolicitudFirmaStore(
    (state) => state.catalogoFirmaDetalle
  )

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item width={"100%"}>
        {/* {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />} */}
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
      <Grid container display={"flex"} justifyContent={"center"}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              //height: 520,

              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
              height: "35rem",
              "@media (min-width: 480px)": {
                height: "32.5rem",
              },
              "@media (min-width: 768px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1140px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1400px)": {
                height: "32.5rem",
              },
              "@media (min-width: 1870px)": {
                height: "46.5rem",
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
                    <StyledTableCell />
                    <StyledTableCell>Sin registros</StyledTableCell>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell />
                  </StyledTableRow>
                ) : (
                  datosFiltrados.map((row, index) => {
                    let chip = <></>;

                    if (
                      row.Estatus === "Captura" ||
                      row.Estatus === "Revision"
                    ) {
                      chip = (
                        <Chip
                          label={row.Estatus === "Revision" ? "En Revisión" : "En " + row.Estatus}
                          // icon={<WarningAmberIcon />}
                          color="default"
                          variant="outlined"
                        />
                      );
                    } else if (
                      row.Estatus === "Verificacion" ||
                      row.Estatus === "Validacion"
                    ) {
                      chip = (
                        <Chip
                          label={row.Estatus === "Verificacion"
                            ? "En Verificación"
                            : row.Estatus === "Validacion"
                              ? "En Validación"
                              : "En " + row.Estatus
                          }
                          // icon={<RateReviewSharpIcon />}
                          color="info"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus === "Autorizacion") {
                      chip = (
                        <Chip
                          label={row.Estatus === "Autorizacion" ? "En Autorización" : "En " + row.Estatus}
                          // icon={<RateReviewSharpIcon />}
                          color="warning"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus.includes("Por Firmar")) {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          // icon={<CheckIcon />}
                          color="secondary"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus === "Autorizado") {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          // icon={<CheckIcon />}
                          color="success"
                          variant="outlined"
                        />
                      );
                    } else if (row.Estatus === "Actualizacion") {
                      chip = (
                        <Tooltip
                          title={`${differenceInDays(
                            getDays(new Date(row.FechaRequerimientos), 11),
                            new Date()
                          )} días restantes para cancelación automática`}
                          onClick={() => CambiaEstatus("Cancelado", row.Id)}
                        >
                          <Chip
                            label={row.Estatus === "Actualizacion" ? "Actualización" : row.Estatus}
                            color={
                              differenceInDays(
                                getDays(new Date(row.FechaRequerimientos), 10),
                                new Date()
                              ) > 5
                                ? "warning"
                                : "error"
                            }
                            variant="filled"
                          />
                        </Tooltip>
                      );
                    } else {
                      chip = (
                        <Chip
                          label={row.Estatus}
                          // icon={<CheckIcon />}
                          color="default"
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
                          sx={{ padding: "1px 15px 1px 0", width: "300px" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.Institucion?.toString()}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 30px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.TipoEntePublico?.toString()}
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
                          {row.ClaveDeInscripcion?.toString()}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 30px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.MontoOriginalContratado?.toString()}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {format(
                            new Date(row.FechaContratacion),
                            "dd/MM/yyyy"
                          )}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{ padding: "1px 25px 1px 0" }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.Estatus === "Actualizacion"
                            ? format(
                              new Date(row.FechaRequerimientos),
                              "dd/MM/yyyy"
                            )
                            : " "}
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
                            height: "7rem",
                            gridTemplateColumns: "repeat(4,1fr)",
                          }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <Tooltip title="Ver solicitud">
                            <IconButton
                              type="button"
                              onClick={() => {
                                llenaSolicitud(row, row.TipoSolicitud);
                                changeIdSolicitud(row.Id);
                                changeEstatus(row.Estatus);
                                changeNoRegistro(row.NumeroRegistro);
                                changeOpenDialogVer(!openDialogVer);


                                setRowSolicitud(row);

                                getCatalogoFirmaDetalle(row.Id)
                              }}
                            >
                              <VisibilityIcon />
                              {row.Acciones}
                            </IconButton>
                          </Tooltip>

                          {((localStorage.getItem("Rol") === "Verificador" &&
                            row.Estatus.toLowerCase() === "por firmar" &&
                            !row.Estatus.includes("Autorizado")) ||
                            (localStorage.getItem("Rol") === "Autorizador" &&
                              row.Estatus.includes("Por Firmar"))) && (
                              <Tooltip title="Firmar documento">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    getComentariosSolicitudPlazo(
                                      row.Id,
                                      setDatosComentarios
                                    ).then((data) => {
                                      if (
                                        rolesAdmin.includes(
                                          localStorage.getItem("Rol")!
                                        )
                                      ) {
                                        if (
                                          data.filter(
                                            (a: any) => a.Tipo === "Requerimiento"
                                          ).length > 0
                                        ) {
                                          requerimientos(
                                            row.Solicitud,
                                            row.NumeroRegistro,
                                            data.filter(
                                              (a: any) =>
                                                a.Tipo === "Requerimiento"
                                            )[0],
                                            row.Id
                                          );
                                        } else {
                                          ConsultaConstancia(
                                            row.Solicitud,
                                            row.NumeroRegistro,
                                            setUrl
                                          );
                                          changeEstatus(row.Estatus);
                                          changeIdSolicitud(row.Id);
                                          navigate("../firmaUrl");
                                        }
                                      } else {
                                        ConsultaSolicitud(
                                          row.Solicitud,
                                          row.NumeroRegistro,
                                          setUrl
                                        );
                                        changeEstatus("Autorizado");
                                        changeIdSolicitud(row.Id);
                                        navigate("../firmaUrl");
                                      }
                                    });
                                  }}
                                >
                                  <HistoryEduIcon />
                                  {row.Acciones}
                                </IconButton>
                              </Tooltip>
                            )}

                          {((localStorage.getItem("Rol") === "Verificador" &&
                            (row.Estatus === "Verificacion" ||
                              row.Estatus === "Actualizacion")) ||
                            (localStorage.getItem("Rol") === "Capturador" &&
                              row.Estatus === "Captura")) &&
                            localStorage.getItem("Rol") !== "Administrador" && (
                              <Tooltip title="Editar">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    changeIdSolicitud(row?.Id);
                                    changeNoRegistro(row.NumeroRegistro);
                                    changeEditCreadoPor(row?.CreadoPor);
                                    llenaSolicitud(row, row.TipoSolicitud);
                                    if (row.Estatus === "Actualizacion") {
                                      getComentariosSolicitudPlazo(
                                        row.Id,
                                        setDatosActualizar
                                      );
                                    }
                                    editarSolicitud(row.TipoSolicitud);

                                  }}
                                >
                                  <EditIcon />
                                  {row.Acciones}
                                </IconButton>
                              </Tooltip>
                            )}

                          {row.Estatus !== "Captura" &&
                            row.Estatus !== "Verificacion" && (
                              <Tooltip title="Ver archivos">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    setSolicitud({
                                      Id: row.Id,
                                      noSolicitud: row.NumeroRegistro,
                                    });

                                    setOpenDescargar(true);
                                  }}
                                >
                                  <BrowserUpdatedIcon />
                                  {row.Acciones}
                                </IconButton>
                              </Tooltip>
                            )}

                          {localStorage.getItem("Rol") !== "Administrador" && (
                            <Tooltip title="Comentarios">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  changeIdSolicitud(row?.Id);
                                  changeEditCreadoPor(row?.CreadoPor);
                                  changeOpenVerComentarios(!openVerComentarios);
                                }}
                              >
                                <CommentIcon />
                                {row.Acciones}
                              </IconButton>
                            </Tooltip>
                          )}

                          {row.Estatus === "Autorizado" && (
                            <Tooltip title="Solicitar Cancelación">
                              <IconButton
                                type="button"
                                onClick={() => {
                                  llenaSolicitud(row, row.TipoSolicitud);
                                  changeIdSolicitud(row.Id);
                                 
                                  changeNoRegistro(row.NumeroRegistro);
                                  changeOpenDialogVer(!openDialogVer);
                                 

                                  changeEstatus(row.Estatus);
                                  setRowSolicitud(row);
                                  //setRowSolicitud(row)
                                }}
                              >
                                <DoDisturbOnIcon />
                                {row.Acciones}
                              </IconButton>
                            </Tooltip>
                          )}

                          {localStorage.getItem("IdUsuario") ===
                            row.CreadoPor &&
                            localStorage.getItem("Rol") !== "Administrador" &&
                            (row.Estatus === "Captura" ||
                              row.Estatus === "Verificacion") && (
                              <Tooltip title="Borrar">
                                <IconButton
                                  type="button"
                                  onClick={() => {
                                    changeIdSolicitud(row?.Id || "");
                                    changeEditCreadoPor(row?.CreadoPor);
                                    changeOpenEliminar(!openEliminar);
                                    if (
                                      localStorage.getItem("Rol") ===
                                      "Capturador" ||
                                      localStorage.getItem("Rol") ===
                                      "Verificador"
                                    ) {
                                      getSolicitudes(setDatos);
                                    } else {
                                      getSolicitudesAdmin(
                                        "Autorizacion",
                                        setDatos
                                      );
                                    }
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
        </Paper>
      </Grid>
      {openDialogVer && (
        <VerBorradorDocumento
          handler={changeOpenDialogVer}
          openState={openDialogVer}
          rowSolicitud={rowSolicitud}
          rowId={rowId}
        />
      )}
      {openDescargar && (
        <DialogDescargaArchivos
          open={openDescargar}
          setOpen={setOpenDescargar}
          noSolicitud={solicitud.noSolicitud}
          idSolicitud={solicitud.Id}
        />
      )}

      {openVerComentarios && (
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
        />
      )}
      <DialogEliminar
        handler={changeOpenEliminar}
        openState={openEliminar}
        texto={"Solicitud"}
      />
    </Grid>
  );
}
