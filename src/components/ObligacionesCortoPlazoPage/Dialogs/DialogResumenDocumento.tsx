/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { IDataPrueba } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useSolicitudFirmaStore } from "../../../store/SolicitudFirma/main";
import {
  AnularCancelacionSolicitud,
  CambiaEstatus,
} from "../../../store/SolicitudFirma/solicitudFirma";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { createNotificationCortoPlazo } from "../../APIS/cortoplazo/APISCreateNotificacionCortoPlazo";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelación";
import { IUsuariosAsignables } from "./DialogSolicitarModificacion";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IDataPrueba;
  rowId: string;
};

export function VerBorradorDocumento(props: Props) {
  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);

  const [openDialogCancelacion, setOpenDialogCancelacion] =
    React.useState(false);

  const [openDialogAnularConfirmacion, setOpenDialogAnularConfirmacion] =
    React.useState(false);

  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);
  const estatus: string = useCortoPlazoStore((state) => state.estatus);

  const justificacionAnulacion: string = useCortoPlazoStore(
    (state) => state.justificacionAnulacion
  );

  const setJustificacionAnulacion: Function = useCortoPlazoStore(
    (state) => state.setJustificacionAnulacion
  );

  const [datosComentario, setDatosComentarios] = React.useState<
    Array<IComentarios>
  >([]);

  React.useEffect(() => {
    if (IdSolicitud !== "") {
      getComentariosSolicitudPlazo(IdSolicitud, setDatosComentarios);
    }
  }, [IdSolicitud]);

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);

  const tieneComentarios: boolean =
    Object.entries(useCortoPlazoStore((state) => state.comentarios)).length > 0;

  const setComentarios: Function = useCortoPlazoStore(
    (state) => state.setComentarios
  );

  const navigate = useNavigate();

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

  const getCatalogoFirmaDetalle: Function = useSolicitudFirmaStore(
    (state) => state.getCatalogoFirmaDetalle
  );

  const changeEstatus: Function = useCortoPlazoStore(
    (state) => state.changeEstatus
  );

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [props.openState]);

  const enviaNotificacion = (estatus: string) => {
    let users: string[] = [];
    if (estatus === "Revision") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
            usr.Rol.toLowerCase() === "revisor"
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        "Se te ha asignado una solicitud de inscripción para revisión",
        users
      );
    } else if (estatus === "Validacion") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
            usr.Rol.toLowerCase() === "validador"
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        "Se te ha asignado una solicitud de inscripción para validación",
        users
      );
    } else if (estatus === "Autorizacion") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
            usr.Rol.toLowerCase() === "autorizador"
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        "Se te ha asignado una solicitud de inscripción para autorización",
        users
      );
    } else if (estatus === "Cancelado") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")!
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        "Una solicitud ha sido cancelada",
        users
      );
    }

    CambiaEstatus(estatus, props.rowId || IdSolicitud).then(() => {
      window.location.reload();
    });
  };

  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const AcuseRespuestaCancelacion = (
    IdSolicitud: string,
    estatusFirma: string
  ) => {
    getCatalogoFirmaDetalle(IdSolicitud, estatusFirma);
  };

  const alertaConfirmacion = (accion: string) => {
    if (accion === "Cancelado") {
      AcuseRespuestaCancelacion(props.rowId, "En espera cancelación");
      CambiaEstatus("Cancelado", props.rowId);
      createNotificationCortoPlazo(
        "Solicitud enviada",
        `La solicitud de cancelación ha sido aceptada con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        [localStorage.getItem("IdUsuario")!]
      );
      navigate("../cancelaciones");
      window.location.reload();
    } else if (accion === "Anulación") {
      Swal.close();
      AnularCancelacionSolicitud(
        props.rowSolicitud.Solicitud,
        props.rowSolicitud.NumeroRegistro,
        justificacionAnulacion,
        props.rowSolicitud.UltimaModificacion,
        setUrl
      );
      navigate("../firmaUrl");
    }
  };

  //const [justificacionAnulacion, setJustificacionAnulacion] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (openDialogAnularConfirmacion === false) {
      setJustificacionAnulacion("");
      setError(false);
    }
  }, [openDialogAnularConfirmacion]);

  return (
    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "8%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            ...queries.buttonCancelar,
            fontSize: "70%",
          }}
          onClick={() => {
            props.handler(false);
            useCortoPlazoStore.setState({
              comentarios: {},
              idComentario: "",
            });
          }}
        >
          Volver
        </Button>

        {((estatus === "Revision" &&
          localStorage.getItem("Rol") === "Revisor") ||
          (estatus === "Validacion" &&
            localStorage.getItem("Rol") === "Validador") ||
          (estatus === "Autorizacion" &&
            localStorage.getItem("Rol") === "Autorizador")) && (
          <Grid
            justifyContent={"space-evenly"}
            sx={{ width: "40rem", display: "flex" }}
          >
            {((estatus === "Validacion" &&
              localStorage.getItem("Rol") === "Validador") ||
              (estatus === "Autorizacion" &&
                localStorage.getItem("Rol") === "Autorizador")) && (
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "70%",
                }}
                disabled={!tieneComentarios}
                onClick={() => {
                  if (localStorage.getItem("Rol") === "Validador") {
                    enviaNotificacion("Revision");
                  } else {
                    enviaNotificacion("Validacion");
                  }
                  window.location.reload();
                }}
              >
                {`Devolver para ${
                  estatus === "Validacion" ? "Revisión" : "Validación"
                }`}
              </Button>
            )}

            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenGuardaComentarios(true);
              }}
            >
              Guardar Comentarios
            </Button>
            <Button
              sx={{
                ...queries.buttonContinuar,
                fontSize: "70%",
              }}
              onClick={() => {
                localStorage.getItem("Rol") === "Revisor"
                  ? enviaNotificacion("Validacion")
                  : localStorage.getItem("Rol") === "Validador"
                  ? enviaNotificacion("Autorizacion")
                  : enviaNotificacion("Autorizado, Por Firmar");
                addComentario(
                  IdSolicitud,
                  JSON.stringify(comentarios),
                  "Requerimiento"
                );
                props.handler(false);
                Swal.fire({
                  confirmButtonColor: "#15212f",
                  icon: "success",
                  title: "Mensaje",
                  text: "La solicitud se envió con éxito",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }}
            >
              Confirmar{" "}
              {localStorage.getItem("Rol") === "Revisor"
                ? "revisión"
                : localStorage.getItem("Rol") === "Validador"
                ? "validación"
                : "autorización"}
            </Button>
          </Grid>
        )}

        {props.rowSolicitud.Estatus === "En espera cancelación" &&
          (localStorage.getItem("Rol") === "Autorizador" ||
            localStorage.getItem("Rol") === "Verificador") && (
            <Grid
              display={"flex"}
              width={"23rem"}
              justifyContent={"space-between"}
            >
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "70%",
                }}
                onClick={() => {
                  setOpenDialogAnularConfirmacion(true);
                  //setTexto("anular")
                  changeEstatus("Anulación");
                }}
              >
                Anular Cancelación
              </Button>

              <Button
                sx={{
                  ...queries.buttonContinuar,
                  fontSize: "70%",
                }}
                onClick={() => {
                  setOpenDialogAnularConfirmacion(true);
                  changeEstatus("Cancelado");
                }}
              >
                Confirmar Cancelación
              </Button>
            </Grid>
          )}

        {props.rowSolicitud.Estatus === "Autorizado" &&
          localStorage.getItem("Rol") === "Verificador" && (
            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenDialogCancelacion(true);
                changeEstatus("En espera cancelación");
              }}
            >
              Solicitar Cancelación
            </Button>
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
        <Resumen coments={false} />
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
                IdSolicitud,
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

      <Dialog
        fullWidth
        maxWidth={estatus === "Anulación" ? "md" : "sm"}
        open={openDialogAnularConfirmacion}
      >
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            ¿Desea {estatus === "Anulación" ? "anular" : "confirmar"} la
            cancelación de la solicitud?
          </Typography>
        </DialogTitle>

        {estatus === "Anulación" ? (
          <DialogContent>
            <Grid width={"100%"}>
              <TextField
                fullWidth
                label="Justificación Escrita"
                margin="dense"
                variant="outlined"
                multiline
                value={justificacionAnulacion}
                helperText={
                  200 - justificacionAnulacion.length + " caracteres restantes"
                }
                error={error && !justificacionAnulacion ? true : false}
                onChange={(v) => {
                  const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
                  if (
                    v.target.value.length <= 200 &&
                    !format.test(v.target.value)
                  ) {
                    setJustificacionAnulacion(v.target.value);
                  }
                }}
              />
            </Grid>
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button
            sx={{ ...queries.buttonCancelar }}
            onClick={() => {
              setOpenDialogAnularConfirmacion(false);
            }}
          >
            <Typography sx={{ ...queries.medium_text }}>Cancelar</Typography>
          </Button>

          <Tooltip
            title={
              justificacionAnulacion === ""
                ? "Favor de ingresar justificación escrita"
                : null
            }
          >
            <Button
              sx={{ ...queries.buttonContinuar }}
              onClick={() => {
                if (estatus === "Anulación" && justificacionAnulacion !== "") {
                  //Pasarlo a firmar la anulacion de la solicitud de cancelacion
                  setOpenDialogAnularConfirmacion(false);
                  //CambiaEstatus("Autorizado", props.rowId)
                  alertaConfirmacion(estatus);
                } else if (estatus === "Cancelado") {
                  //AcuseRespuestaCancelacion(props.rowId)
                  setOpenDialogAnularConfirmacion(false);

                  //CambiaEstatus("Cancelado", props.rowId)
                  alertaConfirmacion(estatus);
                } else {
                  setError(true);
                }
              }}
            >
              <Typography sx={{ ...queries.medium_text }}>Confirmar</Typography>
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <DialogSolicitarCancelacion
        handler={setOpenDialogCancelacion}
        openState={openDialogCancelacion}
        rowSolicitud={props.rowSolicitud}
      />
    </Dialog>
  );
}
