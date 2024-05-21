/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";
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
import { getDocumentos } from "../../components/APIS/pathDocSol/APISDocumentos";
import { SolicitudDeInscripcion } from "../../components/ObligacionesLargoPlazoPage/Panels/SolicitudDeInscripcion";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { useReestructuraStore } from "../../store/Reestructura/main";
import { IDatosSolicitudReestructura } from "../../store/Reestructura/reestructura";
import { Declaratorias } from "../../components/ObligacionesLargoPlazoPage/Panels/Declaratorias";
import { DeclaratoriasReestructura } from "../../components/ObligacionesLargoPlazoPage/Panels/DeclaratoriasReestructura";

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

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const SolicitudReestructura: IDatosSolicitudReestructura = useReestructuraStore(
    (state) => state.SolicitudReestructura
  );



  useEffect(() => {
    getTiposDocumentos();
    getDocumentos(
      `/SRPU/CORTOPLAZO/DOCSOL/${inscripcion.Id}/`,
      () => { },
      () => { }
    );
  }, []);

  return (
    <>
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid item container direction="column" width={"100%"}>
        <Grid
          mt={2}
          width={"100%"}
          display={"flex"}
          justifyContent={
            !inscripcion.NumeroRegistro ? "center" : "space-evenly"
          }
        >
          {inscripcion.NumeroRegistro && (
            <Grid
              width={query.isMobile ? "20%" : "20%"}
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
          <Grid
            width={
              reestructura === "con autorizacion"
                ? query.isMobile
                  ? "70%"
                  : query.isMiniTablet
                    ? "60%"
                    : query.isTablet
                      ? "50%"
                      : query.isLaptop
                        ? "60%"
                        : query.isMonitor
                          ? "60%"
                          : query.isMonitorXL
                            ? "58%"
                            : !inscripcion.NumeroRegistro
                              ? "90%"
                              : query.isMobile
                                ? "60%"
                                : "50%"
                : "90%"
            }
            display={"flex"}
            justifyContent={
              reestructura === "con autorizacion" ? "end" : "center"
            }
            alignItems={
              reestructura === "con autorizacion" && query.isMobile
                ? "center"
                : "center"
            }
          >
            <Typography
              sx={{
                color: "#AF8C55",
                ...queries.bold_text_Largo_Plazo.tituloCredito,
              }}
            >
              Crédito Simple a Largo Plazo
            </Typography>
          </Grid>

          {reestructura === "con autorizacion" ? (
            <Grid
              display={"flex"}
              justifyContent={"end"}
              sx={{
                width: "35%",
                height: "2rem",
                "@media (min-width: 480px)": {
                  width: "32%",
                },

                "@media (min-width: 768px)": {
                  width: "35%",
                  height: "2.5rem",
                },

                "@media (min-width: 1140px)": {
                  width: "35%",
                  height: "2.5rem",
                },

                "@media (min-width: 1400px)": {
                  width: "50%",
                },

                "@media (min-width: 1870px)": {
                  width: "40%",
                },
              }}
            >
              <Button
                onClick={() => {
                  setOpenDialogReestructura(!openDialogReestructura);
                }}
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
                  fontSize: "80%",
                }}
              >
                Finalizar Reestructuracion
                {/* {query.isMobile || query.isMiniTablet
                  ? "Solicitar Autorización"
                  : "Solicitar Autorización para Reestructura"} */}
              </Button>
            </Grid>
          ) : (
            <Grid
              width={
                !inscripcion.NumeroRegistro
                  ? "0"
                  : query.isMobile
                    ? "10%"
                    : "20%"
              }
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Button
                onClick={() => {
                  setOpenDialogBorrador(!openDialogBorrador);
                }}
                sx={{ ...queries.buttonContinuar }}
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
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            centered={query.isScrollable ? false : true}
            variant={query.isScrollable ? "scrollable" : "standard"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ width: "100%", fontSize: ".8rem" }}
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
            <Tab label="Solicitud de Inscripción" sx={queries.bold_text_Largo_Plazo} />
            {reestructura === "con autorizacion" || reestructura === "sin autorizacion"
              ? <Tab label="Solicitud de reestructuración" sx={queries.bold_text_Largo_Plazo} />
              : null}

          </Tabs>
        </Grid>
      </Grid>

      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 1 && <InfoGeneralGastoCosto />}

      {reestructura === "sin autorizacion"
        ? null
        : tabIndex === 2 && <Autorizacion />}

      {reestructura === "sin autorizacion"
        ? tabIndex === 2 && <FuentePagoSecciones />
        : tabIndex === 3 && <FuentePagoSecciones />}

      {reestructura === "sin autorizacion"
        ? tabIndex === 3 && <CondicionesFinancieras />
        : tabIndex === 4 && <CondicionesFinancieras />}

      {reestructura === "sin autorizacion"
        ? tabIndex === 4 && <Documentacion />
        : tabIndex === 5 && <Documentacion />}

      {reestructura === "sin autorizacion"
        ? tabIndex === 5 && <Resumen coments={true} />
        : tabIndex === 6 && <Resumen coments={true} />}

      {reestructura === "sin autorizacion"
        ? tabIndex === 6 && <SolicitudDeInscripcion />
        : tabIndex === 7 && <SolicitudDeInscripcion />}


      {/* {tabIndex === 3 && <FuentePagoSecciones />}
      {tabIndex === 4 && <CondicionesFinancieras />}
      {tabIndex === 5 && <Documentacion />}
      {tabIndex === 6 && <Resumen coments={true} />}
      {tabIndex === 7 && <SolicitudDeInscripcion />} */}

      {/* {reestructura === "con autorizacion"
        ? */}
      {reestructura === "sin autorizacion"
      ? tabIndex === 7 && <DeclaratoriasReestructura />
      : tabIndex === 8 && <DeclaratoriasReestructura />
      
      }
      {/* {tabIndex === 8 && <DeclaratoriasReestructura />} */}
      {/* : null} */}

      <DialogGuardarBorrador
        handler={setOpenDialogBorrador}
        openState={openDialogBorrador}
      />

      <DialogSolicitarReestructura
        handler={setOpenDialogReestructura}
        openState={openDialogReestructura}
        idSolicitud={inscripcion.Id}
        Solicitud={inscripcion.Solicitud}
        IdEditor={inscripcion.IdEditor}
      />
    </>
  );
}
