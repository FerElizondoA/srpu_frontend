/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getListadoUsuarioRol } from "../../components/APIS/Config/Solicitudes-Usuarios";
import { getComentariosSolicitudPlazo } from "../../components/APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { IComentarios } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogComentariosSolicitud";
import { IUsuariosAsignables } from "../../components/ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { Resumen } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { Resumen as ResumenLP } from "../../components/ObligacionesLargoPlazoPage/Panels/Resumen";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import { CambiaEstatus } from "../../store/SolicitudFirma/solicitudFirma";
import { IData } from "../consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { Transition } from "../fuenteDePago/Mandatos";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { useReestructuraStore } from "../../store/Reestructura/main";
import { IDatosSolicitudReestructura } from "../../store/Reestructura/reestructura";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { queries } from "../../queries";
import { DialogSolicitarModificacion, rolesAdmin } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogSolicitarModificacion";
import { DialogGuardarComentarios } from "../../components/ObligacionesLargoPlazoPage/Dialog/DialogGuardarComentarios";
import Swal from "sweetalert2";

type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IInscripcion;
  rowId: string;
};

export function DialogVerDetalle(props: Props) {



  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  // REQUERIMIENTOS

  React.useEffect(() => {
    if (props.rowSolicitud.Id !== "") {
      getComentariosSolicitudPlazo(props.rowSolicitud.Id, setDatosComentarios);
    }
  }, [props.rowSolicitud.Id]);

  const [datosComentario, setDatosComentarios] = React.useState<Array<IComentarios>>([]);


  React.useEffect(() => {
    let a: any = {};

    datosComentario
      ?.filter((td) => td.Tipo === "RequerimientoReestructura")
      .map((_) => {
        return Object.keys(JSON.parse(_?.Comentarios)).map((v) => {
          return a[v]
            ? (a[v] = a[v] + ` ; ` + JSON.parse(_?.Comentarios)[v])
            : (a = { ...a, [v]: JSON.parse(_?.Comentarios)[v] });
        });
      });

    setComentarios(a);

    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "RequerimientoReestructura")[0]
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
  const tieneComentarios: boolean = Object.entries(useCortoPlazoStore((state) => state.comentarios)).length > 0;

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [openGuardaComentarios, setOpenGuardaComentarios] = React.useState(false);

  // REQUERIMIENTOS
  React.useEffect(() => {
    if (props.rowSolicitud.Id !== "") {
      getComentariosSolicitudPlazo(props.rowSolicitud.Id, setDatosComentarios);
    }
  }, [props.rowSolicitud.Id]);

  React.useEffect(() => {
    let a: any = {};

    datosComentario
      ?.filter((td) => td.Tipo === "RequerimientoReestructura")
      .map((_) => {
        return Object.keys(JSON.parse(_?.Comentarios)).map((v) => {
          return a[v]
            ? (a[v] = a[v] + ` ; ` + JSON.parse(_?.Comentarios)[v])
            : (a = { ...a, [v]: JSON.parse(_?.Comentarios)[v] });
        });
      });

    setComentarios(a);

    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "RequerimientoReestructura")[0]
        ?.Id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosComentario]);

  const [openDialogRegresar, setOpenDialogRegresar] = useState(false);

  const cleanSolicitudCortoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudCortoPlazo
  );

  const cleanSolicitudLargoPlazo: Function = useInscripcionStore(
    (state) => state.cleanSolicitudLargoPlazo
  );



  const setUrl: Function = useSolicitudFirmaStore((state) => state.setUrl);

  const [error, setError] = useState(false);

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const changeRestructura: Function = useReestructuraStore(
    (state) => state.changeRestructura
  );

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1537px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 638px)"),
  };
  const setInscripcion: Function = useInscripcionStore(
    (state) => state.setInscripcion
  );

  // const setSolicitudReestructura: Function = useReestructuraStore(
  //   (state) => state.setSolicitudReestructura
  // );

  // const SolicitudReestructura: IDatosSolicitudReestructura = useReestructuraStore(
  //   (state) => state.SolicitudReestructura
  // );

  const setInscripcionReestructura: Function = useInscripcionStore(
    (state) => state.setInscripcionRestructura
  );

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, [props.openState]);

  const cleanCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );

  const [accion, setAccion] = useState("");

  return (

    <Dialog
      open={props.openState}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
        cleanSolicitudLargoPlazo();
        cleanCondicionFinanciera();
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
        {
          reestructura !== "" &&
            localStorage.getItem("IdUsuario") === props.rowSolicitud.CreadoPor &&
            props.rowSolicitud.NoEstatus === "10" &&
            //props.rowSolicitud.ControlInterno === "autorizado" &&
            localStorage.getItem("Rol") === "Verificador" ? (
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
                  //setInscripcion(props.rowSolicitud);
                  changeRestructura("con autorizacion");
                  navigate("../ObligacionesLargoPlazo");

                  setInscripcionReestructura(props.rowSolicitud)
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
                  setInscripcion(props.rowSolicitud)
                  changeRestructura("sin autorizacion");
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
          ) : null}

        {((localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
          rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
          (props.rowSolicitud.NoEstatus === "20" &&
            localStorage.getItem("Rol") === "Revisor")) &&
          ["20", "21", "22"].includes(props.rowSolicitud.NoEstatus) && (
            //["4", "5", "6"].includes(props.rowSolicitud.NoEstatus) && (
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
                  {`Devolver para ${localStorage.getItem("Rol") === "Autorizador"
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
        <ResumenLP coments={false} />
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
                "RequerimientoReestructura"
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
