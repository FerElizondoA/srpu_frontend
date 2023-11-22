import { useEffect } from "react";
//import { ModalEnviar } from "@jbcecapmex/pakfirma";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useParams } from "react-router";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../LateralMenu/LateralMenuMobile";

export const EnviarDocumento = () => {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const { IdDoc } = useParams();
  // const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    // setLoadingPage(true)
    let dataArray = new FormData();
    dataArray.append("IdPathDoc", IdDoc!);

    axios
      .post(
        process.env.REACT_APP_APPLICATION_FIEL + "/api/docsfirmados/muestradoc",
        dataArray
      )
      .then((r) => {
        // setLoadingPage(false)
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>
      <Grid item sx={{ overflow: "hidden" }}>
        {/* <ModalEnviar
          IdDoc={IdDoc!}
          IdCentral={localStorage.getItem("IdCentral")!}
          NombreUsuario={localStorage.getItem("NombreUsuario")!}
          jwtToken={localStorage.getItem("jwtToken")!}
        /> */}
      </Grid>
    </Grid>
  );
};
