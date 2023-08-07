import { useEffect, useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import { Route, Routes, useNavigate } from "react-router-dom"; //, useNavigate

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  continueSession,
  sessionValid,
} from "./components/APIS/Config/validation";
import { Configuracion } from "./screens/Config/Configuracion";
import { HomePage } from "./components/HomePage/HomePage";
import { Bandeja } from "./components/e.firma/Bandeja";
import { EnviarDocumento } from "./components/e.firma/EnviarDocumento";
import { Firma } from "./components/e.firma/Firma";
import { Catalogos } from "./screens/Config/Catalogos";
import { Usuarios } from "./screens/Config/Usuarios";
import { Notificaciones } from "./screens/Notificaciones/notificaciones";
import { ConsultaDeSolicitudPage } from "./screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { ObligacionesCortoPlazoPage } from "./screens/creditoSimpleCortoPlazo/ObligacionesCortoPlazoPage";
import { Init } from "./screens/int/Init";
import { Solicitudes } from "./screens/solicitudesUsuarios/solicitudes";
import { Link } from "react-router-dom";
import { ObligacionesLargoPlazoPage } from "./screens/creditoSimpleLargoPlazo/ObligacionesLargoPlazoPage";
import { Fideicomisos } from "./screens/Fideicomisos/Fideicomisos";
import { IFrame } from "./screens/Config/AgregarNuevoUsuarios/AgregarUsuarios"

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#AF8C55",
    },
  },
});

export const  getToken = () => {
  let token = localStorage.getItem("jwtToken");
  return token
}

function App() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign(
            process.env.REACT_APP_APPLICATION_LOGIN_FRONT || ""
          );
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            localStorage.setItem("IdApp", IdApp as string);
            navigate("../home");
          }, 1000);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign(
            process.env.REACT_APP_APPLICATION_LOGIN_FRONT || ""
          );
        } else {
          // navigate("../");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  
  useEffect (() => {
    getToken()
  }, [])

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme>
        <Routes>
          <Route index element={<Init />} />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="firmar" element={<Firma />} />
          <Route path="bandeja/:NombreBandeja/:IdTipo" element={<Bandeja />} />
          <Route path="enviar/:IdDoc" element={<EnviarDocumento />} />
          <Route path="home" element={<HomePage />}></Route>
          <Route
            path="obligacionesCortoPlazo"
            element={<ObligacionesCortoPlazoPage />}
          ></Route>
          <Route path="config" element={<Configuracion />}></Route>
          <Route
            path="ConsultaDeSolicitudes"
            element={<ConsultaDeSolicitudPage />}
          ></Route>
          <Route path="catalogos" element={<Catalogos />}></Route>
          <Route path="users" element={<Usuarios />}></Route>
          <Route path="solicitudes-usuarios" element={<Solicitudes />}></Route>
          <Route path="notificaciones" element={<Notificaciones />}></Route>
          <Route
            path="obligacionesLargoPlazo"
            element={<ObligacionesLargoPlazoPage />}
          ></Route>
          <Route path="fideicomisos" element={<Fideicomisos />}></Route>

          <Route path="IFrame"
            element={<IFrame
              source={"?jwt=" + getToken() + "&IdApp=" + localStorage.getItem("IdApp")}
              baseURL={String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)}
            />}></Route>
            
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
