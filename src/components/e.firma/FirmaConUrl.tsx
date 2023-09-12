import { FirmadoConUrl } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSolicitudFirmaStore } from "../../store/SolicitudFirma/main";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";

export const FirmaConUrl = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const url: string = useSolicitudFirmaStore((state) => state.url);

  const changeInfoDoc: Function = useSolicitudFirmaStore(
    (state) => state.changeInfoDoc
  );

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
          setState={changeInfoDoc}
        />
      </Grid>
    </Grid>
  );
};
