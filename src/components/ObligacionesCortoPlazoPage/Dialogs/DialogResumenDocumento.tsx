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
  GeneraAcuseRespuesta,
  IDataFirmaDetalle,
} from "../../../store/SolicitudFirma/solicitudFirma";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelación";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
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

  const [texto, setTexto] = React.useState("");

  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);
  const estatus: string = useCortoPlazoStore((state) => state.estatus);

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
  const catalogoFirmaDetalle: IDataFirmaDetalle = useSolicitudFirmaStore(
    (state) => state.catalogoFirmaDetalle
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
        "Una solicitud se le ha asignado para revisión",
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
        "Una solicitud se le ha asignado para validación",
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
        "Una solicitud ha sido cancelada",
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

    CambiaEstatus(estatus, props.rowId || IdSolicitud);
  };

  const alertaConfirmacion = (accion: string) => {
    let mensajeAlert = accion;

    if (mensajeAlert === "anular") {
      mensajeAlert = "Se anuló el proceso de cancelacion con exito";
      AnularCancelacionSolicitud(
        props.rowSolicitud.Solicitud,
        props.rowSolicitud.NumeroRegistro,
        justificacionAnulacion,
        props.rowSolicitud.UltimaModificacion,
        setUrl
      );
    } else if (mensajeAlert === "confirmar") {
      mensajeAlert = "Se ha cancelado la solicitud con éxito";
      AcuseRespuestaCancelacion(props.rowId);
    }

    Swal.fire({
      icon: "success",
      iconColor: "#AF8C55",
      title: mensajeAlert,
      showConfirmButton: false,
      color: "#AF8C55",
    });

    setTimeout(() => {
      if (accion === "confirmar") {
        navigate("../cancelaciones");
        window.location.reload();
      } else if (accion === "anular") {
        Swal.close();
        navigate("../firmaUrl");
      }
    }, 2500);
  };

  const [justificacionAnulacion, setJustificacionAnulacion] = useState("");

  const AcuseRespuestaCancelacion = (Id: string) => {
    getCatalogoFirmaDetalle(Id);
    GeneraAcuseRespuesta(
      "Solicitud de cancelación",
      catalogoFirmaDetalle.NumeroOficio,
      props.rowId,
      ""
    );
  };

  const [error, setError] = useState(false);
  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

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
            sx={{ width: "30%", display: "flex" }}
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
                  estatus === "Validacion" ? "Revision" : "Validación"
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

        {estatus === "En espera cancelación" &&
          (localStorage.getItem("Rol") === "Autorizador" ||
            localStorage.getItem("Rol") === "Verificador") && (
            <Grid
              display={"flex"}
              width={"22rem"}
              justifyContent={"space-between"}
            >
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "70%",
                }}
                onClick={() => {
                  setOpenDialogAnularConfirmacion(true);
                  setTexto("anular");
                  changeEstatus("Anulación");
                }}
              >
                Anular Cancelación
              </Button>

              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "70%",
                }}
                onClick={() => {
                  setOpenDialogAnularConfirmacion(true);
                  changeEstatus("Cancelado");
                  setTexto("confirmar");
                }}
              >
                Confirmar Cancelación
              </Button>
            </Grid>
          )}

        {estatus === "Autorizado" &&
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
        maxWidth={texto === "anular" ? "md" : "sm"}
        open={openDialogAnularConfirmacion}
      >
        <DialogTitle>
          <Typography sx={queries.bold_text}>
            ¿Desea {texto} la cancelación de la solicitud?
          </Typography>
        </DialogTitle>

        {texto === "anular" ? (
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
                if (texto === "anular" && justificacionAnulacion !== "") {
                  setOpenDialogAnularConfirmacion(false);
                  alertaConfirmacion(texto);
                } else if (texto === "confirmar") {
                  setOpenDialogAnularConfirmacion(false);
                  alertaConfirmacion(texto);
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
