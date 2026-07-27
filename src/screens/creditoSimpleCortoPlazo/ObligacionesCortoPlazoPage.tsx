/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
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
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { getDocumentos } from "../../components/APIS/pathDocSol/APISDocumentos";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { IDocsEliminados } from "../../components/ObligacionesCortoPlazoPage/Panels/InterfacesCortoPlazo";
import { IComentarios, VerComentariosSolicitud } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";


export function ObligacionesCortoPlazoPage() {

  const [arrDocsEliminados, setArrDocsEliminados] = useState<IDocsEliminados[]>([]);

  useEffect(() => {
    console.log("arrDocsEliminados ObligacionCortoPlazo:", JSON.stringify(arrDocsEliminados));
  }, [arrDocsEliminados])


  const addArrDocsEliminados = (obj: IDocsEliminados) => {
    console.log('objeto eliminado', obj);

    setArrDocsEliminados([...arrDocsEliminados, obj]);
  };

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

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const IdSolicitudBorrador: string = useCortoPlazoStore(
    (state) => state.IdSolicitudBorrador
  );

  const tipoCredito: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.encabezado.tipoCredito
  );

  const [openVerComentarios, changeOpenVerComentarios] = useState(false);
  const [datosComentario, setDatosComentarios] = useState<Array<IComentarios>>(
    []
  );

  useEffect(() => {
    if (inscripcion.Id !== "") {
      getComentariosSolicitudPlazo(inscripcion.Id, () => { });
    }
  }, [inscripcion.Id]);

  useEffect(() => {
    getTiposDocumentos();
    if (inscripcion.Id) {
      getDocumentos(
        process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/CORTOPLAZO/DOCSOL/${inscripcion.Id}/`,
        () => { },
        () => { },
        "CortoPlazo"
      );
    }
  }, []);

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
                <strong>{`Número de Registro: ${inscripcion.NumeroRegistro || IdSolicitudBorrador}`}</strong>
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
              flex: {
                md: 1,
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
              Crédito Simple a Corto Plazo
            </Typography>
          </Grid>

          <Grid
            container
            sx={{
              width: {
                xs: inscripcion.NumeroRegistro ? "100%" : "auto",
                sm: inscripcion.NumeroRegistro ? "auto" : "auto",
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
      {tabIndex === 3 && <Documentacion addArrDocsEliminados={addArrDocsEliminados} />}
      {tabIndex === 4 && <Resumen coments={true} estatus={""} arrDocsEliminados={arrDocsEliminados} />}
      {tabIndex === 5 && <SolicitudInscripcion arrDocsEliminados={arrDocsEliminados} />}

      {openDialogBorrador && (
        <DialogGuardarBorrador
          handler={setOpenDialogBorrador}
          openState={openDialogBorrador}
        />
      )}

      {openVerComentarios && (
        <VerComentariosSolicitud
          handler={changeOpenVerComentarios}
          openState={openVerComentarios}
          filtroBotonesAccion={false}
        />
      )}
    </>
  );
}
