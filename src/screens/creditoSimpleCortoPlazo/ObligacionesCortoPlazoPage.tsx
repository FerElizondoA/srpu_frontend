/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";

import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { ConfirmacionBorradorSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogGuardarBorrador";
import { CondicionesFinancieras } from "../../components/ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../components/ObligacionesCortoPlazoPage/Panels/Encabezado";
import { InformacionGeneral } from "../../components/ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { SolicitudInscripcion } from "../../components/ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";

export function ObligacionesCortoPlazoPage() {
  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const getTiposDocumentos: Function = useCortoPlazoStore(
    (state) => state.getTiposDocumentos
  );

  useEffect(() => {
    getTiposDocumentos();
  }, []);

  const NumeroRegistro: string = useCortoPlazoStore(
    (state) => state.NumeroRegistro
  );

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item>
        <Grid
          mt={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontSize: "2.5ch",
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
            Crédito Simple a Corto Plazo
          </Typography>
          {NumeroRegistro && (
            <Typography sx={queries.noRegistroAbsolute}>
              <strong>{`Número de registro: ${NumeroRegistro}`}</strong>
            </Typography>
          )}

          <Button
            sx={queries.buttonContinuarAbsolute}
            onClick={() => {
              setOpenDialogBorrador(!openDialogBorrador);
            }}
          >
            Guardar
          </Button>
        </Grid>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Encabezado" sx={queries.bold_text} />
          <Tab label="Información General" sx={queries.bold_text} />
          <Tab label="Condiciones Financieras" sx={queries.bold_text} />
          <Tab label="Documentación" sx={queries.bold_text} />
          <Tab label="Resumen" sx={queries.bold_text} />
          <Tab label="Solicitud de Inscripción" sx={queries.bold_text} />
        </Tabs>
      </Grid>

      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion />}
      {tabIndex === 4 && <Resumen coments={true} />}
      {tabIndex === 5 && <SolicitudInscripcion />}
      <ConfirmacionBorradorSolicitud
        handler={setOpenDialogBorrador}
        openState={openDialogBorrador}
      />
    </Grid>
  );
}
