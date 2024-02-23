import { FirmadoConUrl } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import { CambiaEstatus } from "../../store/SolicitudFirma/solicitudFirma";
import { getListadoUsuarioRol } from "../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../LateralMenu/APINotificaciones";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import {
  IUsuariosAsignables,
  rolesAdmin,
} from "../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";

export const FirmaConUrl = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const url: string = useSolicitudFirmaStore((state) => state.url);

  const changeInfoDoc: Function = useSolicitudFirmaStore(
    (state) => state.changeInfoDoc
  );

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, []);

  const enviaNotificacion = (
    estatus: string,
    id: string,
    idCreador: string,
    oficio: string
  ) => {
    let users: string[] = [];
    let editor = "";

    if (estatus === "4") {
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
        "Crédito Simple a Corto Plazo",
        `${oficio} enviada para autorización con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        [localStorage.getItem("IdUsuario")!]
      );
      createNotification(
        "Crédito simple a corto plazo",
        `Se ha registrado una solicitud de inscripción pendiente de revisión`,
        users
      );
    } else if (estatus === "8") {
      editor = idCreador;
      createNotification(
        "Crédito Simple a Corto Plazo",
        `${oficio} requiere modificaciones, ingresa al apartado Consulta de Solicitudes para ver más detalles`,
        [idCreador]
      );
    } else if (estatus === "10") {
      editor = idCreador;
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! ||
            rolesAdmin.includes(usr.Rol)
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito Simple a Corto Plazo",
        `${oficio} ha sido autorizado con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        users
      );
    }

    CambiaEstatus(estatus, id, editor);
  };

  return (
    <Grid container direction="column" sx={{ overflow: "hidden" }}>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item sx={{ height: "94vh", backgroundColor: "#f2f2f2" }}>
        <FirmadoConUrl
          datosEntrada={JSON.stringify({
            jwtToken: localStorage.getItem("jwtToken")!,
            IdCentral: localStorage.getItem("IdCentral")!,
            NombreUsuario: localStorage.getItem("NombreUsuario")!,
            IdApp: localStorage.getItem("IdApp")!,
            PathPorEnviar: localStorage.getItem("PathPorEnviar") || "/",
            File: url,
          })}
          setState={(v: any) => {
            changeInfoDoc(v, enviaNotificacion);
          }}
        />
      </Grid>
    </Grid>
  );
};
