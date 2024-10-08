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

export function ObligacionesLargoPlazoPage() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1537px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 635px)"),
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

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  useEffect(() => {
    getTiposDocumentos();
    getDocumentos(
      `/SRPU/CORTOPLAZO/DOCSOL/${inscripcion.Id}/`,
      () => {},
      () => {}
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
              width={query.isTittle ? "20%" : "20%"}
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
              !inscripcion.NumeroRegistro
                ? "90%"
                : query.isTittle
                ? "60%"
                : "50%"
            }
            display={"flex"}
            justifyContent={"center"}
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
              justifyContent={"center"}
              sx={{
                width: "30%",
                height: "2rem",
                "@media (min-width: 480px)": {
                  width: "20%",
                },

                "@media (min-width: 768px)": {
                  width: "22%",
                  height: "2.5rem",
                },

                "@media (min-width: 1140px)": {
                  width: "22%",
                  height: "2.5rem",
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
                  fontSize: "70%",
                }}
              >
                {query.isTittle
                  ? "Solicitar Autorización"
                  : "Solicitar Autorización para Reestructura"}
              </Button>
            </Grid>
          ) : (
            <Grid
              width={
                !inscripcion.NumeroRegistro
                  ? "0"
                  : query.isTittle
                  ? "10%"
                  : "20%"
              }
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
              // display={"flex"}
              // justifyContent={"end"}
              // sx={{
              //   width: "20%",
              //   "@media (min-width: 480px)": {
              //     width: "20%",
              //   },

              //   "@media (min-width: 768px)": {
              //     width: "35%",
              //   },
              // }}
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
            <Tab
              label="Información General"
              sx={queries.bold_text_Largo_Plazo}
            />
            <Tab label="Autorización" sx={queries.bold_text_Largo_Plazo} />
            <Tab label="Fuente De Pago" sx={queries.bold_text_Largo_Plazo} />
            <Tab
              label="Condiciones Financieras"
              sx={queries.bold_text_Largo_Plazo}
            />
            <Tab label="Documentación" sx={queries.bold_text_Largo_Plazo} />
            {/* <Tab label="Tabla De Pagos" sx={queries.bold_text_Largo_Plazo} /> */}
            <Tab label="Resumen" sx={queries.bold_text_Largo_Plazo} />
            <Tab
              label="Solicitud de Inscripción"
              sx={queries.bold_text_Largo_Plazo}
            />
          </Tabs>
        </Grid>
      </Grid>

      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 1 && <InfoGeneralGastoCosto />}
      {tabIndex === 2 && <Autorizacion />}
      {tabIndex === 3 && <FuentePagoSecciones />}
      {tabIndex === 4 && <CondicionesFinancieras />}
      {tabIndex === 5 && <Documentacion />}
      {tabIndex === 6 && <Resumen coments={true} />}
      {tabIndex === 7 && <SolicitudDeInscripcion />}

      <DialogGuardarBorrador
        handler={setOpenDialogBorrador}
        openState={openDialogBorrador}
      />

      <DialogSolicitarReestructura
        handler={setOpenDialogReestructura}
        openState={openDialogReestructura}
        idSolicitud={inscripcion.Id}
      />
    </>
  );
}
