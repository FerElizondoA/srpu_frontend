/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { queries } from "../../../queries";
import { IData } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { IComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { Resumen } from "../../ObligacionesCortoPlazoPage/Panels/Resumen";
import { Resumen as ResumenLP } from "../../ObligacionesLargoPlazoPage/Panels/Resumen";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelacion";
import { rolesAdmin } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { DialogGuardarComentarios } from "../../ObligacionesCortoPlazoPage/Dialogs/DialogGuardarComentarios";
import { useEffect, useState } from "react";
import { DatosCancelacion } from "../Panels/DatosCancelacion";
import { useCancelacionStore } from "../../../store/Cancelacion/main";
import { useInscripcionStore } from "../../../store/Inscripcion/main";

export function VerBorradorCancelacion({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const [openSolicitarCancelacion, setOpenSolicitarCancelacion] =
    useState(false);

  const [openGuardaComentarios, setOpenGuardaComentarios] = useState(false);

  // // SOLICITUD
  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);
  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);
  const credito: IData = useCancelacionStore((state) => state.credito);

  // REQUERIMIENTOS
  useEffect(() => {
    if (credito.Id !== "") {
      getComentariosSolicitudPlazo(credito.Id, setDatosComentarios);
    }
  }, [credito]);

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

  const [value, setValue] = useState(1);

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
              credito.NoEstatus !== "10" ? "space-around" : "flex-start",
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

          {credito.NoEstatus !== "10" && (
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
          )}
        </Box>

        {localStorage.getItem("Rol") === "Verificador" &&
          credito.NoEstatus === "10" && (
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

        {((localStorage.getItem("IdUsuario") === credito.IdEditor &&
          rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
          (credito.NoEstatus === "12" &&
            localStorage.getItem("Rol") === "Revisor")) &&
          ["12", "13", "14"].includes(credito.NoEstatus) && (
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
                  {`Devolver para ${
                    localStorage.getItem("Rol") === "Autorizador"
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
          mt: 2,
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
        {value === 1 ? (
          credito.TipoSolicitud === "Crédito Simple a Corto Plazo" ? (
            <Resumen coments={false}  />
          ) : (
            <ResumenLP coments={false} />
          )
        ) : (
          <DatosCancelacion />
        )}
      </DialogContent>
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
