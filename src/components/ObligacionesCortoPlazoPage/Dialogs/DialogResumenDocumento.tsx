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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { IData } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { getListadoUsuarioRol } from "../../APIS/Config/Solicitudes-Usuarios";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import { Resumen as ResumenLP } from "../../ObligacionesLargoPlazoPage/Panels/Resumen";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import { IUsuariosAsignables } from "./DialogSolicitarModificacion";

type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IData;
  rowId: string;
};

export function VerBorradorDocumento(props: Props) {
  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);

  // const [openDialogCancelacion, setOpenDialogCancelacion] =
  //   React.useState(false);

  // const [openDialogAnularConfirmacion, setOpenDialogAnularConfirmacion] =
  //   React.useState(false);

  // // SOLICITUD
  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  // // CANCELACIÓN
  // const justificacionAnulacion: string = useCortoPlazoStore(
  //   (state) => state.justificacionAnulacion
  // );
  // const setJustificacionAnulacion: Function = useCortoPlazoStore(
  //   (state) => state.setJustificacionAnulacion
  // );
  // const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  // const AcuseRespuestaCancelacion = (
  //   IdSolicitud: string,
  //   estatusFirma: string
  // ) => {
  //   getCatalogoFirmaDetalle(IdSolicitud, estatusFirma);
  // };

  // const alertaConfirmacion = (Action: string) => {
  //   if (Action === "Cancelado") {
  //     AcuseRespuestaCancelacion(props.rowId, "En espera cancelación");
  //     CambiaEstatus("Cancelado", props.rowId);
  //     createNotificationCortoPlazo(
  //       "Solicitud enviada",
  //       `La solicitud de cancelación ha sido aceptada con fecha ${
  //         new Date().toLocaleString("es-MX").split(" ")[0]
  //       } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
  //       [localStorage.getItem("IdUsuario")!]
  //     );
  //     navigate("../cancelaciones");
  //     window.location.reload();
  //   } else if (Action === "Anulación") {
  //     Swal.close();
  //     AnularCancelacionSolicitud(
  //       props.rowSolicitud.Solicitud,
  //       props.rowSolicitud.NumeroRegistro,
  //       justificacionAnulacion,
  //       props.rowSolicitud.UltimaModificacion,
  //       setUrl
  //     );
  //     navigate("../firmaUrl");
  //   }
  // };

  // const [error, setError] = useState(false);

  // const reestructura: string = useCortoPlazoStore(
  //   (state) => state.reestructura
  // );

  // useEffect(() => {
  //   if (openDialogAnularConfirmacion === false) {
  //     setJustificacionAnulacion("");
  //     setError(false);
  //   }
  // }, [openDialogAnularConfirmacion]);

  // REQUERIMIENTOS
  React.useEffect(() => {
    if (IdSolicitud !== "") {
      getComentariosSolicitudPlazo(IdSolicitud, setDatosComentarios);
    }
    console.log(props.rowSolicitud);
  }, [IdSolicitud]);

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
  const tieneComentarios: boolean =
    Object.entries(useCortoPlazoStore((state) => state.comentarios)).length > 0;

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

  const cleanSolicitud: Function = useCortoPlazoStore(
    (state) => state.cleanSolicitud
  );

  return (
    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
        cleanSolicitud();
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
            cleanSolicitud();
          }}
        >
          Volver
        </Button>

        {/* {reestructura === "con autorizacion" &&
        localStorage.getItem("IdUsuario") !== props.rowSolicitud.IdEditor &&
        props.rowSolicitud.Estatus === "Autorizado" &&
        localStorage.getItem("Rol") !== "Autorizador" ? (
          <Grid
            container
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            sx={{
              width: "65%",
              "@media (min-width: 480px)": {
                width: "82%",
              },

              "@media (min-width: 768px)": {
                width: "82%",
              },

              "@media (min-width: 1140px)": {
                width: "60%",
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
              sx={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "60%",
                "@media (min-width: 480px)": {
                  width: "45%",
                },

                "@media (min-width: 768px)": {
                  width: "40%",
                },

                "@media (min-width: 1140px)": {
                  width: "40%",
                },

                "@media (min-width: 1400px)": {
                  width: "42%",
                },

                "@media (min-width: 1870px)": {
                  width: "40%",
                },
              }}
              onClick={() => {
                navigate("../ObligacionesLargoPlazo");
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "MontserratMedium",

                  "@media (min-width: 480px)": {
                    fontSize: "0.7rem",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: ".75rem",
                  },

                  "@media (min-width: 1140px)": {
                    fontSize: ".8rem",
                  },

                  "@media (min-width: 1400px)": {
                    fontSize: ".85rem",
                  },
                }}
              >
                {query.isTittle
                  ? "Reest. con autorización"
                  : "Reestructuración con autorización"}
              </Typography>
            </Button>

            <Button
              sx={{
                width: "45%",
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "60%",
                "@media (min-width: 480px)": {
                  width: "45%",
                },

                "@media (min-width: 768px)": {
                  width: "40%",
                },

                "@media (min-width: 1140px)": {
                  width: "40%",
                },

                "@media (min-width: 1400px)": {
                  width: "40%",
                },

                "@media (min-width: 1870px)": {
                  width: "40%",
                },
              }}
              onClick={() => {
                navigate("../ObligacionesLargoPlazo");
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "MontserratMedium",

                  "@media (min-width: 480px)": {
                    fontSize: "0.7rem",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: ".75rem",
                  },

                  "@media (min-width: 1140px)": {
                    fontSize: ".8rem",
                  },

                  "@media (min-width: 1400px)": {
                    fontSize: ".9rem",
                  },
                }}
              >
                {query.isTittle
                  ? "Reest. sin autorización"
                  : "Reestructuración sin autorización"}
              </Typography>
            </Button>
          </Grid>
        ) : reestructura === "con autorizacion" &&
          localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
          props.rowSolicitud.Estatus === "En Reestructura" &&
          localStorage.getItem("Rol") === "Autorizador" ? (
          <Grid
            container
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            sx={{
              width: "65%",
              "@media (min-width: 480px)": {
                width: "82%",
              },

              "@media (min-width: 768px)": {
                width: "82%",
              },

              "@media (min-width: 1140px)": {
                width: "60%",
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
              sx={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "60%",
                "@media (min-width: 480px)": {
                  width: "45%",
                },

                "@media (min-width: 768px)": {
                  width: "40%",
                },

                "@media (min-width: 1140px)": {
                  width: "40%",
                },

                "@media (min-width: 1400px)": {
                  width: "42%",
                },

                "@media (min-width: 1870px)": {
                  width: "40%",
                },
              }}
              onClick={() => {
                CambiaEstatus("Autorizado", props.rowId);
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "MontserratMedium",

                  "@media (min-width: 480px)": {
                    fontSize: "0.7rem",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: ".75rem",
                  },

                  "@media (min-width: 1140px)": {
                    fontSize: ".8rem",
                  },

                  "@media (min-width: 1400px)": {
                    fontSize: ".85rem",
                  },
                }}
              >
                Rechazar Reestructuración
              </Typography>
            </Button>

            <Button
              sx={{
                width: "45%",
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                // fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "60%",
                "@media (min-width: 480px)": {
                  width: "45%",
                },

                "@media (min-width: 768px)": {
                  width: "40%",
                },

                "@media (min-width: 1140px)": {
                  width: "40%",
                },

                "@media (min-width: 1400px)": {
                  width: "40%",
                },

                "@media (min-width: 1870px)": {
                  width: "40%",
                },
              }}
              onClick={() => {
                CambiaEstatus("Autorizado", props.rowId);
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "MontserratMedium",

                  "@media (min-width: 480px)": {
                    fontSize: "0.7rem",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: ".75rem",
                  },

                  "@media (min-width: 1140px)": {
                    fontSize: ".8rem",
                  },

                  "@media (min-width: 1400px)": {
                    fontSize: ".9rem",
                  },
                }}
              >
                Autorizar Reestructuración
              </Typography>
            </Button>
          </Grid>
        ) : null} */}

        {localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor && (
          <Grid
            justifyContent={"space-evenly"}
            sx={{ width: "40rem", display: "flex" }}
          >
            {localStorage.getItem("Rol") !== "Revisor" && (
              <Button
                sx={{
                  ...queries.buttonCancelar,
                  fontSize: "70%",
                }}
                disabled={!tieneComentarios}
                onClick={() => {
                  if (localStorage.getItem("Rol") === "Validador") {
                    enviaNotificacion("4");
                  } else {
                    enviaNotificacion("5");
                  }
                  window.location.reload();
                }}
              >
                {`Devolver para ${
                  props.rowSolicitud.Estatus === "Validación"
                    ? "Revisión"
                    : "Validación"
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
                  ? enviaNotificacion("5")
                  : localStorage.getItem("Rol") === "Validador"
                  ? enviaNotificacion("6")
                  : enviaNotificacion("Estatus requerimientos / solicitud");
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

        {/* {props.rowSolicitud.Estatus === "En espera cancelación" &&
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
                  setProceso("Anulación");
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
                  setProceso("Cancelado");
                }}
              >
                Confirmar Cancelación
              </Button>
            </Grid>
          )} */}

        {/* {props.rowSolicitud.Estatus === "Autorizado" &&
          localStorage.getItem("Rol") === "Verificador" &&
          reestructura === "" && (
            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenDialogCancelacion(true);
                setProceso("En espera cancelación");
              }}
            >
              Solicitar Cancelación
            </Button>
          )} */}
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

      {/* <Dialog
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
                  setOpenDialogAnularConfirmacion(false);
                  alertaConfirmacion(estatus);
                } else if (estatus === "Cancelado") {
                  setOpenDialogAnularConfirmacion(false);
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
      /> */}
    </Dialog>
  );
}
