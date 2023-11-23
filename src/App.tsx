import { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import { HashRouter, Route, Routes } from "react-router-dom";

import {
  continueSession,
  sessionValid,
} from "./components/APIS/Config/validation";
import { HomePage } from "./components/HomePage/HomePage";
import { Bandeja } from "./components/e.firma/Bandeja";
import { EnviarDocumento } from "./components/e.firma/EnviarDocumento";
import { Firma } from "./components/e.firma/Firma";
import { Cancelaciones } from "./screens/Cancelaciones/Cancelaciones";
import { Catalogos } from "./screens/Config/Catalogos";
import { Configuracion } from "./screens/Config/Configuracion";
import { Usuarios } from "./screens/Config/Usuarios";
import { Notificaciones } from "./screens/Notificaciones/notificaciones";
import { ConsultaDeSolicitudPage } from "./screens/consultaDeSolicitudes/ConsultaDeSolicitudPage";
import { ObligacionesCortoPlazoPage } from "./screens/creditoSimpleCortoPlazo/ObligacionesCortoPlazoPage";
import { ObligacionesLargoPlazoPage } from "./screens/creditoSimpleLargoPlazo/ObligacionesLargoPlazoPage";
import { Fideicomisos } from "./screens/fuenteDePago/Fideicomisos";
import { Solicitudes } from "./screens/solicitudesUsuarios/solicitudes";

import { FirmaConUrl } from "./components/e.firma/FirmaConUrl";
import Ayuda from "./screens/Ayuda/Ayuda";
import { InstruccionesIrrevocables } from "./screens/fuenteDePago/InstruccionesIrrevocables";
import { Mandatos } from "./screens/fuenteDePago/Mandatos";

export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  return token;
};

function App() {
  // const navigate = useNavigate();
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
            window.location.assign(
              process.env.REACT_APP_APPLICATION_FRONT || "/"
            );
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

  return (
    <HashRouter>
      <Routes>
        {/* <Route index element={<Init />} /> */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="firmar" element={<Firma />} />
        <Route path="firmaUrl" element={<FirmaConUrl />} />
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

        <Route path="cancelaciones" element={<Cancelaciones />}></Route>

        <Route path="mandatos" element={<Mandatos />}></Route>
        <Route
          path="instruccionesIrrevocables"
          element={<InstruccionesIrrevocables />}
        ></Route>
        <Route path="AdministracionAyudas" element={<Ayuda />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
