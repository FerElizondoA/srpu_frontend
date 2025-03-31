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
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";

export function VerBorradorCancelacion({
  rowSolicitud,
}: {
  rowSolicitud: IInscripcion
}) {
  const [openSolicitarCancelacion, setOpenSolicitarCancelacion] =
    useState(false);

  const [openGuardaComentarios, setOpenGuardaComentarios] = useState(false);

  // // SOLICITUD
  const setProceso: Function = useCortoPlazoStore((state) => state.setProceso);
  const comentarios: {} = useCortoPlazoStore((state) => state.comentarios);
  //const credito: IData = useCancelacionStore((state) => state.credito);
  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  // REQUERIMIENTOS
  useEffect(() => {
    if (inscripcion.Id !== "") {
      getComentariosSolicitudPlazo(inscripcion.Id, setDatosComentarios);
    }
  }, [inscripcion]);

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
    <>
      <Grid
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
          inscripcion.TipoSolicitud === "Crédito Simple a Corto Plazo" ? (
            <Resumen coments={false}  estatus={rowSolicitud.NoEstatus}/>
          ) : (
            <ResumenLP coments={false} />
          )
        ) : (
          <DatosCancelacion />
        )}
      </Grid>

      
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
    </>
  );
}
