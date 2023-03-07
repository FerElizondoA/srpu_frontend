import { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import { Route, useNavigate, Routes } from "react-router-dom";

import { HomePage } from "./components/HomePage/HomePage";
import { continueSession, sessionValid } from "./validation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Configuracion } from "./components/Config/Config";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#AF8C55",
    },
  },
});


function App() {
  const navigate = useNavigate();
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
            navigate("../");
          }, 2000);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.106/");
        } else {
          navigate("../");
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
          <Route path="Config" element={<Configuracion />}></Route>
          <Route path="OCP" element={<HomePage />}></Route>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
