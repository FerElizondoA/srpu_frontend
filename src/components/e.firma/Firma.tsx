// import { Firmado, FirmadoConUrl } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import { useEffect } from "react";

export const Firma = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const url: string = useSolicitudFirmaStore((state) => state.url);

  const changeInfoDoc: Function = useSolicitudFirmaStore(
    (state) => state.changeInfoDoc
  );

  const infoDoc: string = useSolicitudFirmaStore((state) => state.infoDoc);

  return (
    <Grid container direction="column" sx={{ overflow: "hidden" }}>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item sx={{ height: "94vh", backgroundColor: "#f2f2f2" }}>
        {/* <Firmado
          jwtToken={localStorage.getItem("jwtToken")!}
          IdCentral={localStorage.getItem("IdCentral")!}
          NombreUsuario={localStorage.getItem("NombreUsuario")!}
          IdApp={localStorage.getItem("IdApp")!}
          PathPorEnviar={localStorage.getItem("PathPorEnviar") || "/"}
        /> */}
      </Grid>
    </Grid>
  );
};
