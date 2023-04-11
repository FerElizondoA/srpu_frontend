import { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import { Route, Routes } from "react-router-dom"; //, useNavigate

import { HomePage } from "./components/HomePage/HomePage";
import { continueSession, sessionValid } from "./validation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ObligacionesCortoPlazoPage } from "./components/ObligacionesCortoPlazoPage/ObligacionesCortoPlazoPage";
import { ConsultaDeSolicitudPage } from "./components/ConsultaDeSolicitudes/ConsultaDeSolicitudPage";
import { Catalogos } from "./components/Config/Catalogos";
import { Usuarios } from "./components/Config/Usuarios";
import { Configuracion } from "./components/Config/Config";
import { Solicitudes } from "./screens/Solicitudes/solicitudes";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#AF8C55",
    },
  },
});


function App() {
  // const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.106/");
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            localStorage.setItem("IdApp", IdApp as string);
            // navigate("../");
          }, 2000);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.106/");
        } else {
          // navigate("../");
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="obligacionesCortoPlazo" element={<ObligacionesCortoPlazoPage />}></Route>
          <Route path="config" element={<Configuracion />}></Route>
          <Route path="ConsultaDeSolicitudes" element={<ConsultaDeSolicitudPage />}></Route>
          <Route path="catalogos" element={<Catalogos />}></Route>
          <Route path="users" element={<Usuarios />}></Route>
          <Route path="solicitudes-usuarios" element={<Solicitudes/>}></Route>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;