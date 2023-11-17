import { FirmadoConUrl } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import { useEffect, useState } from "react";
import { IUsuariosAsignables } from "../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";
import { getListadoUsuarioRol } from "../APIS/Config/Solicitudes-Usuarios";
import { createNotification } from "../LateralMenu/APINotificaciones";
import { CambiaEstatus } from "../../store/SolicitudFirma/solicitudFirma";

export const FirmaConUrl = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const url: string = useSolicitudFirmaStore((state) => state.url);

  const changeInfoDoc: Function = useSolicitudFirmaStore(
    (state) => state.changeInfoDoc
  );

  const changeInfoDocCncelacion: Function = useSolicitudFirmaStore(
    (state) => state.changeInfoDocCncelacion
  );

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  useEffect(() => {
    getListadoUsuarioRol(setUsuarios);
  }, []);

  const enviaNotificacion = (estatus: string, id: string) => {
    let users: string[] = [];
    if (estatus !== "Actualizacion") {
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
        `La solicitud ha sido enviada para autorización con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        [localStorage.getItem("IdUsuario")!]
      );
      createNotification(
        "Crédito simple a corto plazo",
        `Se te ha asignado una solicitud de inscripción`,
        users
      );
    } else if (estatus.includes("Autorizado")) {
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
        `La solicitud ha sido autorizada con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        users
      );
    } else {
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
        `Se te ha asignado una solicitud de inscripción`,
        users
      );
    }

    CambiaEstatus(estatus, id);
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
