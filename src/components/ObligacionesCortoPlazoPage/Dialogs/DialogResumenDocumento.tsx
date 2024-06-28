/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { Resumen as ResumenLP } from "../../ObligacionesLargoPlazoPage/Panels/Resumen";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import {
  DialogSolicitarModificacion,
  rolesAdmin,
} from "./DialogSolicitarModificacion";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { DialogGuardarComentarios } from "./DialogGuardarComentarios";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";

type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IInscripcion;
  rowId: string;
};

export function VerBorradorDocumento(props: Props) {
  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);

  // REQUERIMIENTOS
  React.useEffect(() => {
    if (props.rowSolicitud.Id !== "") {
      getComentariosSolicitudPlazo(props.rowSolicitud.Id, setDatosComentarios);
    }
  }, [props.rowSolicitud.Id]);

  const [datosComentario, setDatosComentarios] = React.useState<
    Array<IComentarios>
  >([]);
  React.useEffect(() => {
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

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);

  const setComentarios: Function = useCortoPlazoStore(
    (state) => state.setComentarios
  );
  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [openDialogRegresar, setOpenDialogRegresar] = useState(false);
  const [accion, setAccion] = useState("");

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );
  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );

  
  
  const cleanCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );
  

  return (
    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
        cleanSolicitudCortoPlazo();
        cleanSolicitudLargoPlazo();
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "8%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            props.handler(false);
            useCortoPlazoStore.setState({
              comentarios: {},
              idComentario: "",
            });
            cleanSolicitudCortoPlazo();
            cleanSolicitudLargoPlazo();
            cleanCondicionFinanciera();
          }}
        >
          Volver
        </Button>

        {((localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
          rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
          (props.rowSolicitud.NoEstatus === "4" &&
            localStorage.getItem("Rol") === "Revisor")) &&
          ["4", "5", "6"].includes(props.rowSolicitud.NoEstatus) && (
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
                    setOpenDialogRegresar(true);
                    setAccion("modificar");
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
                  setOpenDialogRegresar(true);
                  setAccion("enviar");
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
        {props.rowSolicitud.TipoSolicitud === "Crédito Simple a Corto Plazo" ? (
          <Resumen coments={false} />
        ) : (
          <ResumenLP coments={false} />
        )}
      </DialogContent>

      <Dialog open={openGuardaComentarios} fullWidth maxWidth={"md"}>
        <DialogTitle>Guardar comentarios</DialogTitle>
        <DialogContent>
          {Object.entries(comentarios).map(([key, val], index) =>
            (val as string) === "" ? null : (
              <Typography key={index}>
                <strong>{key}:</strong>
                {val as string}
              </Typography>
            )
          )}
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => setOpenGuardaComentarios(false)}
          >
            Cancelar
          </Button>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              addComentario(
                props.rowSolicitud.Id,
                JSON.stringify(comentarios),
                "Requerimiento"
              ).then(() => {
                Swal.fire({
                  confirmButtonColor: "#15212f",
                  cancelButtonColor: "rgb(175, 140, 85)",
                  icon: "success",
                  title: "Mensaje",
                  text: "Comentarios guardados con éxito",
                });
                setOpenGuardaComentarios(false);
                props.handler(false);
              });
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      {openGuardaComentarios && (
        <DialogGuardarComentarios
          open={openGuardaComentarios}
          handler={setOpenGuardaComentarios}
        />
      )}

      {openDialogRegresar && (
        <DialogSolicitarModificacion
          handler={setOpenDialogRegresar}
          openState={openDialogRegresar}
          accion={accion}
        />
      )}
    </Dialog>
  );
}
