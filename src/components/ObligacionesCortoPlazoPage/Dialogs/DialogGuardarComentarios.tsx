/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import * as React from "react";
import Swal from "sweetalert2";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { IComentarios } from "./DialogComentariosSolicitud";

export function DialogGuardarComentarios({
  open,
  handler,
}: {
  open: boolean;
  handler: Function;
}) {
  // // SOLICITUD
  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  // REQUERIMIENTOS
  React.useEffect(() => {
    if (IdSolicitud !== "") {
      getComentariosSolicitudPlazo(IdSolicitud, setDatosComentarios);
    }
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

  return (
    <Dialog open={open} fullWidth maxWidth={"md"}>
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
        <Button sx={queries.buttonCancelar} onClick={() => handler(false)}>
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
              handler(false);
            });
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
