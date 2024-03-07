/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";

import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { DialogGuardarBorrador } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogGuardarBorrador";
import { CondicionesFinancieras } from "../../components/ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { Documentacion } from "../../components/ObligacionesCortoPlazoPage/Panels/Documentacion";
import { Encabezado } from "../../components/ObligacionesCortoPlazoPage/Panels/Encabezado";
import { InformacionGeneral } from "../../components/ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { SolicitudInscripcion } from "../../components/ObligacionesCortoPlazoPage/Panels/SolicitudInscripcion";
import { queries } from "../../queries";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { IRegistroSolicitud } from "../../store/CreditoCortoPlazo/solicitud";

export function ObligacionesCortoPlazoPage() {
  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 467px)"),
  };

  const getTiposDocumentos: Function = useCortoPlazoStore(
    (state) => state.getTiposDocumentos
  );
  useEffect(() => {
    getTiposDocumentos();
  }, []);

  const registroSolicitud: IRegistroSolicitud = useCortoPlazoStore(
    (state) => state.registroSolicitud
  );

  return (
    <>
      <Grid width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid item container direction="column">
        <Grid
          container
          mt={2}
          display={"flex"}
          width={"100%"}
          justifyContent={
            !registroSolicitud.NumeroRegistro ? "center" : "space-evenly"
          }
        >
          {registroSolicitud.NumeroRegistro && (
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
                <strong>{`Número de Registro: ${registroSolicitud.NumeroRegistro}`}</strong>
              </Typography>
            </Grid>
          )}
          <Grid
            mr={3}
            width={
              !registroSolicitud.NumeroRegistro
                ? "90%"
                : query.isTittle
                ? "60%"
                : "50%"
            }
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                color: "#AF8C55",
                ...queries.bold_text_Largo_Plazo.tituloCredito,
              }}
            >
              Crédito Simple a Corto Plazo
            </Typography>
          </Grid>

          <Grid
            width={
              !registroSolicitud.NumeroRegistro
                ? "0"
                : query.isTittle
                ? "10%"
                : "20%"
            }
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <Button
              sx={{ ...queries.buttonContinuar }}
              onClick={() => {
                setOpenDialogBorrador(!openDialogBorrador);
              }}
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
            scrollButtons
            allowScrollButtonsMobile
            sx={{ width: "100%", fontSize: ".8rem" }}
          >
            <Tab label="Encabezado" sx={{ ...queries.bold_text_Largo_Plazo }} />
            <Tab
              label="Información General"
              sx={{ ...queries.bold_text_Largo_Plazo }}
            />
            <Tab
              label="Condiciones Financieras"
              sx={{ ...queries.bold_text_Largo_Plazo }}
            />
            <Tab
              label="Documentación"
              sx={{ ...queries.bold_text_Largo_Plazo }}
            />
            <Tab label="Resumen" sx={{ ...queries.bold_text_Largo_Plazo }} />
            <Tab
              label="Solicitud de Inscripción"
              sx={{ ...queries.bold_text_Largo_Plazo }}
            />
          </Tabs>
        </Grid>
      </Grid>

      {tabIndex === 0 && <Encabezado />}
      {tabIndex === 1 && <InformacionGeneral />}
      {tabIndex === 2 && <CondicionesFinancieras />}
      {tabIndex === 3 && <Documentacion />}
      {tabIndex === 4 && <Resumen coments={true} />}
      {tabIndex === 5 && <SolicitudInscripcion />}

      {openDialogBorrador && (
        <DialogGuardarBorrador
          handler={setOpenDialogBorrador}
          openState={openDialogBorrador}
        />
      )}
    </>
  );
}
