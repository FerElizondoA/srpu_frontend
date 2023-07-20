import { Grid, Tabs, Tab, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { Autorizacion } from "../../components/ObligacionesLargoPlazoPage/Panels/Autorizacion";
import { CondicionesFinancieras } from "../../components/ObligacionesLargoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../components/ObligacionesLargoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../components/ObligacionesLargoPlazoPage/Panels/Encabezado";
import { FuenteDePago } from "../../components/ObligacionesLargoPlazoPage/Panels/FuenteDePago";
import { InformacionGeneral } from "../../components/ObligacionesLargoPlazoPage/Panels/InformacionGeneral";
import { Resumen } from "../../components/ObligacionesLargoPlazoPage/Panels/Resumen";
import { SolicituDeInscripcion } from "../../components/ObligacionesLargoPlazoPage/Panels/SolicitudeDeInscripcion";
//import { TablaDePagos } from "../../components/ObligacionesLargoPlazoPage/Panels/TablaDePagos";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/main";
import { ConfirmacionBorradorSolicitud } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogGuardarBorrador";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import {InfoGeneralGastoCosto} from "../../components/ObligacionesLargoPlazoPage/Panels/InfoGeneralGastoCosto"
export function ObligacionesLargoPlazoPage() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1900px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const getTiposDocumentos: Function = useLargoPlazoStore(
    (state) => state.getTiposDocumentosD
  );
  useEffect(() => {
    getTiposDocumentos();
  }, []);

  return (
    <>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item>
        <Grid mt={2} display={"flex"} justifyContent={"center"}>
          <Grid width={"91%"} display={"flex"} justifyContent={"center"}>
            <Typography
              sx={{
                fontSize: "2.5ch",
                fontFamily: "MontserratBold",
                color: "#AF8C55",
                //padding: "1px 1px 1px 70px",
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
              Crédito Simple a Largo Plazo
            </Typography>
          </Grid>

          <Grid width={"2%"} display={"flex"} justifyContent={"end"} sx={{}}>
            <Button
              onClick={() => {
                setOpenDialogBorrador(!openDialogBorrador);
              }}
              sx={{ ...queries.buttonContinuar }}
            >
              Guardar
            </Button>
          </Grid>
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
            sx={{ width: "100%" }}
          >
            <Tab label="Encabezado" sx={queries.bold_text_Largo_Plazo} />
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
      {tabIndex === 3 && <FuenteDePago />}
      {tabIndex === 4 && <CondicionesFinancieras />}
      {tabIndex === 5 && <Documentacion />}
      {/*tabIndex === 6 && <TablaDePagos />*/}
      {tabIndex === 6 && <Resumen />}
      {tabIndex === 7 && <SolicituDeInscripcion />}

      <ConfirmacionBorradorSolicitud
        handler={setOpenDialogBorrador}
        openState={openDialogBorrador}
      />
    </>
  );
}
