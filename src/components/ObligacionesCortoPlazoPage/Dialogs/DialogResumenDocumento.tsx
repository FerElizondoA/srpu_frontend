import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { CambiaEstatus } from "../../../store/SolicitudFirma/solicitudFirma";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { Resumen } from "../Panels/Resumen";
import { IComentarios } from "./DialogComentariosSolicitud";
import { DialogSolicitarCancelacion } from "./DialogSolicitarCancelación";
import { IDataPrueba } from "../../../screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";

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
};

export function VerBorradorDocumento(props: Props) {
  const [openGuardaComentarios, setOpenGuardaComentarios] =
    React.useState(false);

  const [openDialogCancelacion, setOpenDialogCancelacion] =
    React.useState(false);

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
    // setComentariosRegistro(a);

    useCortoPlazoStore.setState({
      idComentario: datosComentario.filter((r) => r.Tipo === "Requerimiento")[0]
        ?.Id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosComentario]);

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
              // comentariosRegistro: {},
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
                onClick={() => {
                  localStorage.getItem("Rol") === "Validador"
                    ? CambiaEstatus("Revision", IdSolicitud)
                    : CambiaEstatus("Validacion", IdSolicitud);
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
              disabled={!tieneComentarios}
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
                  ? CambiaEstatus("Validacion", IdSolicitud)
                  : localStorage.getItem("Rol") === "Validador"
                  ? CambiaEstatus("Autorizacion", IdSolicitud)
                  : CambiaEstatus("Autorizado, Por Firmar", IdSolicitud);
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

        {estatus === "Autorizado" &&
          localStorage.getItem("Rol") === "Verificador" && (
            <Button
              sx={{
                ...queries.buttonCancelar,
                fontSize: "70%",
              }}
              onClick={() => {
                setOpenDialogCancelacion(true);
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

      <DialogSolicitarCancelacion
        handler={setOpenDialogCancelacion}
        openState={openDialogCancelacion}
        rowSolicitud={props.rowSolicitud}
      />
    </Dialog>
  );
}
