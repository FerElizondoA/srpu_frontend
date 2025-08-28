/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { LateralMenu } from "../../LateralMenu/LateralMenu";
import { DialogGuardarBorrador } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogGuardarBorrador";
import { CondicionesFinancieras } from "../../ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../ObligacionesCortoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../ObligacionesCortoPlazoPage/Panels/Encabezado";
import { InformacionGeneral } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { Resumen } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import { SolicitudInscripcion } from "../../ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { getDocumentos, getPathDocumentosCancelacion } from "../../APIS/pathDocSol/APISDocumentos";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { IDocsEliminados } from "../../ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { IComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { rolesAdmin } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelacion";
import { DialogGuardarComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogGuardarComentarios";
import { VerBorradorCancelacion } from "./DialogResumenCancelacion";
import { TabJustificacionCancelacion } from "./TabJustificacionCancelacion";
import { IDocumentosAcuses } from "../../ConsultaDeSolicitudes/AcusesSolicitudes";

export interface ICancelacionJustificaciones {
  Deleted: number;
  FechaCreacion: string
  Id: string;
  IdSolicitud: string;
  Justificacion: string;
  NombreArchivo: string;
  NombreIdentificador: string;
  Ruta: string;
  TipoArchivoJustificacion: string;
}

export function TabsCancelacionArchivos({
  handler,
  openState,
  rowSolicitud,
}: {
  handler: Function;
  openState: boolean;
  rowSolicitud: IInscripcion
}) {
  const [openSolicitarCancelacion, setOpenSolicitarCancelacion] =
    useState(false);

  const [openGuardaComentarios, setOpenGuardaComentarios] = useState(false);

  // // SOLICITUD
  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);
  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);
  //const credito: IData = useCancelacionStore((state) => state.credito);
  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  // REQUERIMIENTOS
  useEffect(() => {
    if (inscripcion.Id !== "") {
      getComentariosSolicitudPlazo(inscripcion.Id, setDatosComentarios);
    }
  }, [inscripcion]);

  const [datosComentario, setDatosComentarios] = useState<Array<IComentarios>>(
    []
  );
  useEffect(() => {
    let a: any = {};

    datosComentario
      ?.filter((td) => td.Tipo === "Requerimiento")
      .map((_) => {
        return Object.keys(JSON.parse(_?.Comentarios)).map((v) => {
          return a[v]
            ? (a[v] = a[v] + ` ; ` + JSON.parse(_?.Comentarios)[v])
            : (a = { ...a, [v]: JSON.parse(_?.Comentarios)[v] });
        });
      });

    setComentarios(a);

    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "Requerimiento")[0]
        ?.Id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosComentario]);

  const setComentarios: Function = useCortoPlazoStore(
    (state) => state.setComentarios
  );

  const cleanSolicitud: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 467px)"),
  };
  const [archivos, setArchivos] = useState<Array<ICancelacionJustificaciones>>([]);
  
  const [arr, setArr] = useState<any>([]);
  const [cargados, setCargados] = useState(true);
  
  useEffect(() => {
    if (inscripcion.Id)
      getDocumentos(
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/CANCELACIONES/${inscripcion.Id}/`,
        setArr,
        setCargados
      );
  }, []);


  useEffect(() => {
    getPathDocumentosCancelacion(inscripcion.Id, setArchivos);
  }, [])

  return (
    <Dialog
      open={openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
        cleanSolicitud();
      }}
    >

      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "8%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "40%",
            justifyContent:
              // inscripcion.NoEstatus !== "11" ? "space-around" :
              "flex-start",
          }}
        >
          <Button
            sx={{
              backgroundColor: "rgb(175, 140, 85)",
              color: "white",
              "&&:hover": {
                backgroundColor: "rgba(175, 140, 85, 0.6)",
                color: "#000",
              },
              height: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0.8vh",
              textTransform: "capitalize",
              fontSize: "60%",
              "@media (min-width: 480px)": {
                fontSize: "70%",
              },

              "@media (min-width: 768px)": {
                fontSize: "80%",
              },
            }}
            onClick={() => {
              handler(false);
              useCortoPlazoStore.setState({
                comentarios: {},
                idComentario: "",
              });
              cleanSolicitud();
            }}
          >
            Volver
          </Button>

          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
              sx={{ width: "100%", fontSize: ".8rem" }}
            >
              <Tab label="Resumen Solicitud" sx={{ ...queries.bold_text_Largo_Plazo }} />
              <Tab label="Solicitud de Cancelación" sx={{ ...queries.bold_text_Largo_Plazo }} />
            </Tabs>
          </Grid>
          {/* 
          {inscripcion.NoEstatus === "10" && (
            <Tabs
              variant={"standard"}
              scrollButtons
              allowScrollButtonsMobile
              value={value}
              onChange={(e, number) => {
                setValue(number);
              }}
            >
              <Tab
                key={1}
                label="Datos del Crédito"
                sx={queries.medium_text}
                value={1}
              />
              <Tab
                key={2}
                label="Datos de la Cancelación"
                sx={queries.medium_text}
                value={2}
              />
            </Tabs>
          )} */}
        </Box>

        {localStorage.getItem("Rol") === "Verificador" &&
          inscripcion.NoEstatus === "10" && (
            <Grid
              justifyContent={"space-evenly"}
              sx={{ width: "50rem", display: "flex" }}
            >
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "50%",
                }}
                onClick={() => {
                  setOpenSolicitarCancelacion(true);
                  setProceso("cancelacion");
                }}
              >
                Solicitar Cancelación
              </Button>
            </Grid>
          )}

        {((localStorage.getItem("IdUsuario") === inscripcion.IdEditor &&
          rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
          (inscripcion.NoEstatus === "12" &&
            localStorage.getItem("Rol") === "Revisor")) &&
          ["12", "13", "14"].includes(inscripcion.NoEstatus) && (
            <Grid
              justifyContent={"space-evenly"}
              sx={{ width: "50rem", display: "flex" }}
            >
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "50%",
                }}
                onClick={() => {
                  setOpenGuardaComentarios(true);
                }}
              >
                Guardar Comentarios
              </Button>
              {localStorage.getItem("Rol") !== "Revisor" && (
                <Button
                  sx={{
                    ...queries.buttonCancelar,
                    fontSize: "50%",
                  }}
                  onClick={() => {
                    // setOpenDialogRegresar(true);
                    // setAccion("modificar");
                  }}
                >
                  {`Devolver para ${localStorage.getItem("Rol") === "Autorizador"
                    ? "validación"
                    : "revisión"
                    }`}
                </Button>
              )}

              <Button
                sx={{
                  ...queries.buttonContinuar,
                  fontSize: "50%",
                }}
                onClick={() => {
                  //   setOpenDialogRegresar(true);
                  //   setAccion("enviar");
                }}
              >
                Confirmar{" "}
                {localStorage.getItem("Rol") === "Validador"
                  ? "Validación"
                  : localStorage.getItem("Rol") === "Revisor"
                    ? "Revisión"
                    : Object.keys(comentarios).length > 0
                      ? "Solicitud de Requerimientos"
                      : "Autorización"}
              </Button>
            </Grid>
          )}
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".5vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Grid
          container
          mt={2}
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
        >
          {inscripcion.NumeroRegistro && (
            <Grid
              width={"80%"}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}

            >
              <Typography
                sx={{
                  ...queries.bold_text,
                }}
              >
                <strong>{`Número de Registro: ${inscripcion.NumeroRegistro}`}</strong>
              </Typography>
            </Grid>
          )}
        </Grid>



        {tabIndex === 0 && <VerBorradorCancelacion rowSolicitud={rowSolicitud} />}
        {tabIndex === 1 && <TabJustificacionCancelacion 
        DetailPathCancelaciones={archivos} 
        arr={arr}
        cargados={cargados}
        />}


      </DialogContent>



      {/* <Grid width={"100%"}>
        <LateralMenu />
      </Grid> */}






      {openSolicitarCancelacion && (
        <DialogSolicitarCancelacion
          handler={setOpenSolicitarCancelacion}
          openState={openSolicitarCancelacion}
        />
      )}

      {openGuardaComentarios && (
        <DialogGuardarComentarios
          open={openGuardaComentarios}
          handler={setOpenGuardaComentarios}

        />
      )}


    </Dialog>
  );
}
