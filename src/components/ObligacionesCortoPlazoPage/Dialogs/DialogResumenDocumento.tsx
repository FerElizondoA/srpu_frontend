/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";

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
//import { DialogGuardarComentarios } from "./DialogGuardarComentarios";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { alertaExito } from "../../../generics/Alertas";
import { appTheme } from "../../..";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { ConfirmacionEnviarSolicitud } from "./DialogEnviarSolicitud";
import { DialogAsignacionResumen } from "./DialogAsignacionResumen";

type Props = {
  handler: Function;
  openState: boolean;
  rowSolicitud: IInscripcion;
  rowId: string;
};

export function VerBorradorDocumento(props: Props) {
  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);


  // OCUPAS ESTO PARA LOS CAMBIOS*******
  const setComentariosSolicitudInscripcion: Function = useCortoPlazoStore(
    (state) => state.setComentariosSolicitudInscripcion
  );

  const comentariosBD: IComentarios[] = useCortoPlazoStore(
    (state) => state.comentariosSolicitudInscripcion);

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario);

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario);


  // REQUERIMIENTOS
  React.useEffect(() => {
    if (props.rowSolicitud.Id !== "") {
      getComentariosSolicitudPlazo(props.rowSolicitud.Id, () => { });
    }
  }, [props.rowSolicitud.Id]);

  const [datosComentario, setDatosComentarios] = React.useState<Array<IComentarios>>([]);

  const [botonVolverFiltro, setBotonVolverFiltro] = React.useState({});

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

    setBotonVolverFiltro(a);
    setComentarios(a);
    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "Requerimiento")[0]
        ?.Id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosComentario]);

  const comentarios: any = useCortoPlazoStore((state) => state.comentarios);

  const setComentarios: Function = useCortoPlazoStore(
    (state) => state.setComentarios
  );

  const setFiltroComentarios: Function = useCortoPlazoStore(
    (state) => state.setFiltroComentarios
  );

  const filtroComentarios: boolean = useCortoPlazoStore(
    (state) => state.filtroComentarios
  );
  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const [openDialogRegresar, setOpenDialogRegresar] = useState(false);

  const [openDialogConfirmacionVolver, setOpenDialogConfirmacionVolver] = useState(false);
  const [confirmBotonAccionComentario, setConfirmBotonAccionComentario] = useState(false);


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

  //const [filtroComentarios, setFiltroComentarios] = useState(false);


  const comentario: any = useCortoPlazoStore((state) => state.comentarios);

  const [comentariosAuxOriginal, setComentariosAuxOriginal] = useState(comentarios);

  // function tieneComentarios(
  //   comentarios: Record<string, string | undefined>,
  //   comentariosAuxOriginal: Record<string, string | undefined>
  // ): boolean {
  //   return JSON.stringify(comentarios) !== JSON.stringify(comentariosAuxOriginal);
  // }

  const hayComentarios =
    tieneComentarios(comentarios) || tieneComentarios(comentariosAuxOriginal);


  function tieneComentarios(comentarios: Record<string, string | undefined>): boolean {
    return Object.values(comentarios).some(
      (valor) => typeof valor === "string" && valor.trim().length > 0
    );
  }

  function compararComentarios(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    const claves1 = Object.keys(obj1);
    const claves2 = Object.keys(obj2);

    // Comparar longitud de las claves
    if (claves1.length !== claves2.length) {
      return false;
    }

    // Comparar valores clave por clave
    const prueba = claves1.every(clave => obj2.hasOwnProperty(clave) && obj1[clave] === obj2[clave]);
    return prueba
  }

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);

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
          disabled={comentario.length > 0}
          onClick={() => {
            setConfirmBotonAccionComentario(false)
            if (compararComentarios(comentarios, botonVolverFiltro)) {
              console.log("No ha habido modificaciones en los comentarios.");


              props.handler(false);
              useCortoPlazoStore.setState({
                comentarios: {},
                idComentario: "",
              });
              cleanSolicitudCortoPlazo();
              cleanSolicitudLargoPlazo();
              cleanCondicionFinanciera();
            }
            else {
              // console.log("Hubo modificaciones en los comentarios.");
              // console.log("COMENTARIOS", comentarios)
              // console.log("botonVolverFiltro", botonVolverFiltro)

              setOpenDialogConfirmacionVolver(true)

            }

          }}
        >
          Volver
        </Button>
        <Grid container sx={{
          display: "flex",
          width: "60%",
          justifyContent: "space-evenly"
        }}
        >
          {
            (props.rowSolicitud.NoEstatus === "4" && (localStorage.getItem("Rol") === "Validador" || localStorage.getItem("Rol") === "Autorizador"))

              ?
              <ThemeProvider theme={buttonTheme}>
                <Button
                  //disabled={compararComentarios(comentarios, botonVolverFiltro)}
                  sx={{
                    ...queries.buttonCancelar,
                    fontSize: "50%",
                  }}
                  onClick={() => {

                    setOpenDialogEnviar(true);
                  }}
                >
                  Asignar Revisor
                </Button>
              </ThemeProvider>

              : null


          }
          {
            //Primera condicion
            (props.rowSolicitud.NoEstatus === "2" &&
              localStorage.getItem("Rol") === "Verificador" &&
              localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor) ||

              ((localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
                rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
                //  (props.rowSolicitud.NoEstatus === "4" &&
                (props.rowSolicitud.NoEstatus === "5" &&
                  localStorage.getItem("Rol") === "Revisor" &&
                  props.rowSolicitud.IdEditor === localStorage.getItem("IdUsuario"))) &&
              // ["4", "5", "6"].includes(props.rowSolicitud.NoEstatus)
              ["5", "6", "7"].includes(props.rowSolicitud.NoEstatus)
              ?
              <ThemeProvider theme={buttonTheme}>
                <Button
                  disabled={compararComentarios(comentarios, botonVolverFiltro)}
                  sx={{
                    ...queries.buttonCancelar,
                    fontSize: "50%",
                  }}
                  onClick={() => {
                    setOpenGuardaComentarios(true);
                    console.log("comentariosAuxOriginal", comentarios)

                  }}
                >
                  Guardar Comentarios
                </Button>
              </ThemeProvider>

              : null}


          {
            // (["9", "17", "25"].includes(props.rowSolicitud.NoEstatus) && localStorage.getItem("Rol") === "Autorizador") ||

            (["10", "19", "26"].includes(props.rowSolicitud.NoEstatus) &&
              localStorage.getItem("Rol") === "Autorizador") ||

              (props.rowSolicitud.NoEstatus === "5" &&
                localStorage.getItem("Rol") === "Revisor" &&
                localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor
              ) ||

              (localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
                rolesAdmin.includes(localStorage.getItem("Rol")!))

              ?
              <Grid sx={{ width: "50%", display: "flex", justifyContent: "space-between" }}
              // justifyContent={"space-evenly"}
              // sx={{ width: "50rem", display: "flex" }}
              >

                {localStorage.getItem("Rol") !== "Revisor" && (
                  <Button
                    sx={{
                      ...queries.buttonCancelar,
                      fontSize: "50%",
                    }}
                    onClick={() => {
                      // if (compararComentarios(comentarios, botonVolverFiltro) === false) {
                      //   setOpenDialogConfirmacionVolver(true)
                      //   setConfirmBotonAccionComentario(true)
                      // } else {
                      //   setOpenDialogRegresar(true);
                      //   setAccion("modificar");
                      // }
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
                    // if (compararComentarios(comentarios, botonVolverFiltro) === false) {
                    //   setOpenDialogConfirmacionVolver(true)
                    //   setConfirmBotonAccionComentario(true)
                    // } else {
                    //   setOpenDialogRegresar(true);
                    //   setAccion("enviar");
                    // }
                    setOpenDialogRegresar(true);
                    setAccion("enviar");

                  }}
                >
                  Confirmar{" "}
                  {localStorage.getItem("Rol") === "Validador"
                    ? "Validación"
                    : (localStorage.getItem("Rol") === "Revisor" && props.rowSolicitud.NoEstatus === "5" && props.rowSolicitud.IdEditor === localStorage.getItem("IdUsuario"))
                      ? "Revisión"
                      : Object.keys(comentarios).length > 0
                        ? "Solicitud de Requerimientos"
                        : "Autorización"}
                </Button>
              </Grid>

              : null

          }



          {/* {
            
              //["4", "5", "6"].includes(props.rowSolicitud.NoEstatus) ||

              (["9", "17", "25"].includes(props.rowSolicitud.NoEstatus) && localStorage.getItem("Rol") === "Autorizador")  ||

              // (props.rowSolicitud.NoEstatus === "4" &&
              //   localStorage.getItem("Rol") === "Revisor") &&

            // (localStorage.getItem("IdUsuario") === props.rowSolicitud.IdEditor &&
            //   rolesAdmin.includes(localStorage.getItem("Rol")!)) ||
            (
              <Grid
                // justifyContent={"space-evenly"}
                // sx={{ width: "50rem", display: "flex" }}
              >

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
            )} */}
        </Grid>

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
        <Grid
          //width={query.isTittle ? "20%" : "20%"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontFamily: "MontserratBold",
            }}
          >
            <strong>{`Número de Registro: ${props.rowSolicitud.NumeroRegistro}`}</strong>
          </Typography>
        </Grid>

        {props.rowSolicitud.TipoSolicitud === "Crédito Simple a Corto Plazo" ? (
          <Resumen coments={false} estatus={props.rowSolicitud.NoEstatus} funcionFiltroComentarios={setFiltroComentarios} />
        ) : (
          <ResumenLP coments={false} estatus={props.rowSolicitud.NoEstatus} funcionFiltroComentarios={setFiltroComentarios} />
        )}
      </DialogContent>

      <Dialog open={openGuardaComentarios} fullWidth maxWidth={"md"}>
        <DialogTitle>Guardar comentarios</DialogTitle>
        <DialogContent>

          {!hayComentarios && (
            <Typography>Se borraron todos los comentarios</Typography>
          )}
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
                alertaExito(() => { }, "Comentarios guardados con éxito")
                setOpenGuardaComentarios(false);
                props.handler(false);
                setTimeout(() => {
                  props.handler(true)

                }, 100);

              });
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogConfirmacionVolver}>
        <DialogTitle sx={{ ...queries.bold_text, display: "flex", justifyContent: "center" }}>
          ADVERTENCIA
        </DialogTitle>

        <DialogContent>
          <Typography>
            Se agregaron o modificaron comentarios en distintos campos, si desea enviarlos o guardar los cambios, porfavor oprimir el boton de <strong>"Guardar Comentarios"</strong>
            {confirmBotonAccionComentario === true ? (
              <span> para continuar</span>
            ) : (
              <span>, de lo contrario precione <strong>"Aceptar"</strong> para continuar y borrar las modificaciones.</span>
            )}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={{ ...queries.buttonCancelar }}
            onClick={() => {
              setOpenDialogConfirmacionVolver(false)
            }}
          >
            Cerrar
          </Button>

          {confirmBotonAccionComentario === true
            ? null
            : (<Button
              sx={{ ...queries.buttonContinuar }}
              onClick={() => {
                setOpenDialogConfirmacionVolver(false)
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
              Aceptar
            </Button>)}



        </DialogActions>

      </Dialog>
      {/* {openGuardaComentarios && (
        <DialogGuardarComentarios
          open={openGuardaComentarios}
          handler={setOpenGuardaComentarios}
          
        />
      )} */}

      {openDialogEnviar && (
        <DialogAsignacionResumen
          handler={setOpenDialogEnviar}
          openState={openDialogEnviar}
          accion={"asignacion"}
        //arrDocsEliminados={arrDocsEliminados}
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
