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
import { IUsuariosAsignables } from "../ObligacionesCortoPlazoPage/Dialogs/DialogSolicitarModificacion";

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

  const enviaNotificacion = (estatus: string, id: string) => {
    let users: string[] = [];

    if (estatus === "En espera cancelación") {
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
        `La solicitud ha sido enviada para autorización de cancelación con fecha ${
          new Date().toLocaleString("es-MX").split(" ")[0]
        } y hora ${new Date().toLocaleString("es-MX").split(" ")[1]}`,
        [localStorage.getItem("IdUsuario")!]
      );
      createNotification(
        "Crédito simple a corto plazo",
        `Se te ha asignado una solicitud de cancelación`,
        users
      );
    } else if (estatus === "Cancelado") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
            usr.Rol.toLowerCase() === "verificador"
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        `Se ha aprobado la cancelación de un crédito a corto plazo`,
        users
      );
    } else if (estatus === "Anulación") {
      usuarios
        .filter(
          (usr: any) =>
            usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
            usr.Rol.toLowerCase() === "verificador"
        )
        .map((usuario: any) => {
          return users.push(usuario.Id);
        });
      createNotification(
        "Crédito simple a corto plazo",
        `La cancelación de un crédito a corto plazo que solicitaste ha sido anulada.`,
        users
      );
    } else if (!estatus.includes("Autorizado") && estatus !== "Actualizacion") {
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
          `${"La solicitud de inscripción se ha enviado a autorización"}`,
          [localStorage.getItem("IdUsuario")!]
        );
        createNotification(
          "Crédito simple a corto plazo",
          `${"Se te ha asignado una solicitud de inscripción"}`,
          users
        );
      } else if (estatus === "Actualizacion") {
        usuarios
          .filter(
            (usr: any) =>
              usr.Entidad === localStorage.getItem("EntePublicoObligado")! &&
              usr.Rol.toLowerCase() === "verificador"
          )
          .map((usuario: any) => {
            return users.push(usuario.Id);
          });
        createNotification(
          "Crédito simple a corto plazo",
          `${"Se ha generado una solicitud de requerimientos para un crédito a corto plazo inscrito."}`,
          users
        );
      } else {
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
          `${"Se ha autorizado un crédito a corto plazo"}`,
          users
        );
      }
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
