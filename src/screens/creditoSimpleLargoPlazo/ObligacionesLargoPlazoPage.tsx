/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Tabs, ThemeProvider, Tooltip, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { Autorizacion } from "../../components/ObligacionesLargoPlazoPage/Panels/Autorizacion";
import { CondicionesFinancieras } from "../../components/ObligacionesLargoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../components/ObligacionesLargoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../components/ObligacionesLargoPlazoPage/Panels/Encabezado";
import { Resumen } from "../../components/ObligacionesLargoPlazoPage/Panels/Resumen";
//import { TablaDePagos } from "../../components/ObligacionesLargoPlazoPage/Panels/TablaDePagos";
import { DialogGuardarBorrador } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogGuardarBorrador";
import { FuentePagoSecciones } from "../../components/ObligacionesLargoPlazoPage/Panels/FuentePagoSecciones";
import { InfoGeneralGastoCosto } from "../../components/ObligacionesLargoPlazoPage/Panels/InfoGeneralGastoCosto";
import { queries } from "../../queries";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { DialogSolicitarReestructura } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogSolicitarReestructura";
import { getDocumentos, getDocumentosGastosCostos } from "../../components/APIS/pathDocSol/APISDocumentos";
import { SolicitudDeInscripcion } from "../../components/ObligacionesLargoPlazoPage/Panels/SolicitudDeInscripcion";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { useReestructuraStore } from "../../store/Reestructura/main";
import { IAnexoClausula, ICreditoSolicitudReestructura, IDatosSolicitudReestructura } from "../../store/Reestructura/reestructura";
import { Declaratorias } from "../../components/ObligacionesLargoPlazoPage/Panels/Declaratorias";
import { DeclaratoriasReestructura } from "../../components/ObligacionesLargoPlazoPage/Panels/DeclaratoriasReestructura";
import { buttonTheme } from "../../components/mandatos/dialog/AgregarMandatos";
import { IAutorizaciones } from "../../store/CreditoLargoPlazo/autorizacion";
import { deleteDocumentos } from "../../generics/interfaces";
import { IDocsEliminados } from "../../components/ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
// "../  /mandatos/dialog/AgregarMandatos";
export function ObligacionesLargoPlazoPage() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) "),
    //isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),

    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 479px)"),
    isMiniTablet: useMediaQuery("(min-width: 480px) and (max-width: 767px)"),
    isTablet: useMediaQuery("(min-width: 768px) and (max-width: 1139px)"),
    isLaptop: useMediaQuery("(min-width: 1140px) and (max-width: 1399px)"),
    isMonitor: useMediaQuery("(min-width: 1400px) and (max-width: 1869px)"),
    isMonitorXL: useMediaQuery("(min-width: 1870px)"),

    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 467px)"),

  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [openDialogReestructura, setOpenDialogReestructura] = useState(false);

  const getTiposDocumentos: Function = useLargoPlazoStore(
    (state) => state.getTiposDocumentos
  );

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  //Reestructura
  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  // const SolicitudReestructura: IDatosSolicitudReestructura = useReestructuraStore(
  //   (state) => state.SolicitudReestructura
  // );

  const tablaDeclaratorias: IAnexoClausula[] = useReestructuraStore(
    (state) => state.tablaDeclaratorias
  );

  const autorizacionSelectReestructura: IAutorizaciones = useReestructuraStore(
    (state) => state.autorizacionSelectReestructura
  );

  const Declaratorias: ICreditoSolicitudReestructura = useReestructuraStore(
    (state) => state.ReestructuraDeclaratorias
  );

  const [borrarDoc, setBorrarDoc] = useState<deleteDocumentos[]>([]);

  // const addDocumentDelete = (x: deleteDocumentos) => {

  //   setBorrarDoc([...borrarDoc, x]);
  // };

  const [arrDocsEliminados, setArrDocsEliminados] = useState<IDocsEliminados[]>([]);
  const [openVerComentarios, changeOpenVerComentarios] = useState(false);

  const addArrDocsEliminados = (obj: IDocsEliminados) => {
    console.log('objeto eliminado', obj);

    setArrDocsEliminados([...arrDocsEliminados, obj]);
  };


  useEffect(() => {
    getTiposDocumentos();
    getDocumentos(
      process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/LARGOPLAZO/DOCSOL/${inscripcion.Id}/`,
      () => { },
      () => { },
      "LargoPlazo"
    );

    getDocumentosGastosCostos(
      process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/LARGOPLAZO/DOCSOL/${inscripcion.Id}/DOCGASTOSCOSTOS/`,
      () => { },
      () => { },
    )
  }, []);

  const inscripcionReestructura: IDatosSolicitudReestructura = useInscripcionStore(
    (state) => state.inscripcionReestructura
  );




  useEffect(() => {
    if (inscripcion.Id !== "") {
      getComentariosSolicitudPlazo(inscripcion.Id, () => { });
    }
  }, [inscripcion.Id]);

  return (
    <>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid item container direction="column" width={"100%"}>
        <Grid
          container
          mt={2}
          width={"100%"}
          display={"flex"}
          justifyContent={{
            xs: inscripcion.NumeroRegistro ? "center" : "space-between",
            sm: "space-between",
            md: "space-between",
          }}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={1}
          px={{
            xs: inscripcion.NumeroRegistro ? 0 : 2,
            sm: 2,
            md: 4,
          }}
          sx={{ position: "relative" }}
        >
          {inscripcion.NumeroRegistro && (
            <Grid
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                  md: "auto",
                },
                order: {
                  xs: 0,
                  sm: 1,
                  md: 0,
                },
              }}
              display={"flex"}
              justifyContent={{
                xs: "center",
                sm: "flex-start",
                md: "flex-start",
              }}
              alignItems={"center"}
            >
              <Typography
                sx={{
                  ...queries.bold_text,
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                <strong>{`Número de Registro: ${inscripcion.NumeroRegistro}`}</strong>
              </Typography>
            </Grid>
          )}
          <Grid
            sx={{
              width: {
                xs: inscripcion.NumeroRegistro ? "100%" : "auto",
                sm: inscripcion.NumeroRegistro ? "100%" : "auto",
                md: "auto",
              },
              order: {
                xs: -1,
                sm: inscripcion.NumeroRegistro ? 0 : -1,
                md: 0,
              },
              position: {
                xs: "relative",
                sm: !inscripcion.NumeroRegistro ? "absolute" : "relative",
                md: !inscripcion.NumeroRegistro ? "absolute" : "relative",
              },
              left: {
                xs: !inscripcion.NumeroRegistro ? "20%" : "auto",
                sm: !inscripcion.NumeroRegistro ? "50%" : "auto",
                md: !inscripcion.NumeroRegistro ? "50%" : "auto",
              },
              transform: {
                xs: "none",
                sm: !inscripcion.NumeroRegistro ? "translateX(-50%)" : "none",
                md: !inscripcion.NumeroRegistro ? "translateX(-50%)" : "none",
              },
              zIndex: {
                xs: "auto",
                sm: !inscripcion.NumeroRegistro ? 0 : "auto",
                md: !inscripcion.NumeroRegistro ? 0 : "auto",
              },
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                color: "#AF8C55",
                ...queries.bold_text_Largo_Plazo.tituloCredito,
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.5rem",
                },
              }}
            >
              Crédito Simple a Largo Plazo
            </Typography>
          </Grid>

          {reestructura !== "" ? (
            <Grid
              sx={{
                width: {
                  xs: inscripcion.NumeroRegistro ? "100%" : "auto",
                  sm: "auto",
                  md: inscripcion.NumeroRegistro ? "auto" : "100%",
                },
                order: {
                  xs: 1,
                  sm: inscripcion.NumeroRegistro ? 2 : 1,
                  md: 1,
                },
              }}
              display={"flex"}
              justifyContent={{
                xs: "center",
                sm: "flex-end",
                md: "flex-end",
              }}
              alignItems={"center"}
            >
              <ThemeProvider theme={buttonTheme}>
                <Tooltip title="hola">
                  <Button
                    onClick={() => {
                      setOpenDialogReestructura(!openDialogReestructura);
                    }}
                    disabled={
                      reestructura === "con autorizacion" ?
                        autorizacionSelectReestructura.Id === "" ||
                        tablaDeclaratorias.length < 1 ||
                        Declaratorias.TipoConvenio.Descripcion === "" ||
                        Declaratorias.SalgoVigente === 0 ||
                        Declaratorias.PeriodoAdminitracion === "" ||
                        Declaratorias.PeriodoFinanciamiento === ""
                        :
                        tablaDeclaratorias.length < 1 ||
                        Declaratorias.TipoConvenio.Descripcion === "" ||
                        Declaratorias.SalgoVigente === 0 ||
                        Declaratorias.PeriodoAdminitracion === "" ||
                        Declaratorias.PeriodoFinanciamiento === ""
                    }
                    sx={{
                      backgroundColor: "#15212f",
                      color: "white",
                      "&&:hover": {
                        backgroundColor: "rgba(47, 47, 47, 0.4)",
                        color: "#000",
                      },
                      borderRadius: "0.8vh",
                      textTransform: "capitalize",
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.8rem",
                      },
                    }}
                  >
                    Finalizar Reestructuracion
                  </Button>
                </Tooltip>
              </ThemeProvider>
            </Grid>
          ) : (
            <Grid
              container
              sx={{
                width: {
                  xs: inscripcion.NumeroRegistro ? "100%" : "auto",
                  sm: "auto",
                  md: inscripcion.NumeroRegistro ? "auto" : "100%",
                },
                order: {
                  xs: 1,
                  sm: inscripcion.NumeroRegistro ? 2 : 1,
                  md: 1,
                },
              }}
              display={"flex"}
              justifyContent={{
                xs: "center",
                sm: "flex-end",
                md: "flex-end",
              }}
              alignItems={"center"}
              gap={1}
            >
              {inscripcion.NumeroRegistro && (
                <Button
                  sx={{
                    ...queries.buttonContinuar,
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.9rem",
                    },
                  }}
                  onClick={() => {
                    changeOpenVerComentarios(!openVerComentarios);
                  }}
                >
                  Ver Comentarios
                </Button>
              )}
              <Button
                sx={{
                  ...queries.buttonContinuar,
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                  },
                }}
                onClick={() => {
                  setOpenDialogBorrador(!openDialogBorrador);
                }}
              >
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 2, sm: 2, md: 0 },
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            centered={query.isScrollable ? false : true}
            variant={query.isScrollable ? "scrollable" : "standard"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ fontSize: ".8rem" }}
          >
            <Tab label="Encabezado" sx={{ ...queries.bold_text_Largo_Plazo }} />
            <Tab label="Información General" sx={queries.bold_text_Largo_Plazo} />
            {reestructura !== "sin autorizacion" && (
              <Tab
                disabled={reestructura === "sin autorizacion"}
                label="Autorización"
                sx={queries.bold_text_Largo_Plazo}
              />
            )}
            <Tab label="Fuente De Pago" sx={queries.bold_text_Largo_Plazo} />
            <Tab label="Condiciones Financieras" sx={queries.bold_text_Largo_Plazo} />
            <Tab label="Documentación" sx={queries.bold_text_Largo_Plazo} />
            {/* <Tab label="Tabla De Pagos" sx={queries.bold_text_Largo_Plazo} /> */}
            <Tab label="Resumen" sx={queries.bold_text_Largo_Plazo} />
            {reestructura === ""
              ? <Tab label="Solicitud de Inscripción" sx={queries.bold_text_Largo_Plazo} />
              : null
            }
            {/* <Tab label="Solicitud de reestructuración" sx={queries.bold_text_Largo_Plazo} /> */}


            {reestructura !== ""
              ?
              <Tab
                // disabled={reestructura !== "con autorizacion"}
                label="Solicitud de reestructuración"
                sx={queries.bold_text_Largo_Plazo}
              />
              : null}

          </Tabs>
        </Grid>
      </Grid >

      {tabIndex === 0 && <Encabezado />
      }
      {tabIndex === 1 && <InfoGeneralGastoCosto />}

      {
        reestructura === "sin autorizacion"
          ? null
          : tabIndex === 2 && <Autorizacion />
      }

      {
        reestructura === "sin autorizacion"
          ? tabIndex === 2 && <FuentePagoSecciones />
          : tabIndex === 3 && <FuentePagoSecciones />
      }

      {
        reestructura === "sin autorizacion"
          ? tabIndex === 3 && <CondicionesFinancieras />
          : tabIndex === 4 && <CondicionesFinancieras />
      }

      {reestructura === "sin autorizacion"
        ? tabIndex === 4 && <Documentacion addArrDocsEliminados={addArrDocsEliminados} />
        : tabIndex === 5 && <Documentacion addArrDocsEliminados={addArrDocsEliminados} />}

      {
        reestructura === "sin autorizacion"
          ? tabIndex === 5 && <Resumen coments={true} estatus={""} arrDocsEliminados={arrDocsEliminados} />
          : tabIndex === 6 && <Resumen coments={true} estatus={""} arrDocsEliminados={arrDocsEliminados} />
      }

      {
        reestructura === ""
          ? tabIndex === 7 && <SolicitudDeInscripcion arrDocsEliminados={arrDocsEliminados} />
          : null
      }

      {
        reestructura === "sin autorizacion"
          ? tabIndex === 6 && <DeclaratoriasReestructura />
          : reestructura === "con autorizacion"
            ? tabIndex === 7 && <DeclaratoriasReestructura />
            : null
      }

      {/* 
      {tabIndex === 7 && <SolicitudDeInscripcion />}
      {tabIndex === 8 && <DeclaratoriasReestructura />} */}
      {/* {reestructura === "con autorizacion"
        ?
        // tabIndex === 8 && <DeclaratoriasReestructura />
        : null} */}

      <DialogGuardarBorrador
        handler={setOpenDialogBorrador}
        openState={openDialogBorrador}
      />

      {openVerComentarios && (
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
          filtroBotonesAccion={false}
        />
      )}

      <DialogSolicitarReestructura
        handler={setOpenDialogReestructura}
        openState={openDialogReestructura}
        idSolicitud={inscripcion.Id}
        Solicitud={inscripcion.Solicitud}
        IdEditor={inscripcion.IdEditor}
        IdCreado={inscripcion.CreadoPor}
        Estatus={inscripcion.NoEstatus}
        NumeroRegistro={inscripcion.NumeroRegistro}
        ClaveInscripcion={inscripcion.IdClaveInscripcion}
      />
    </>
  );
}
