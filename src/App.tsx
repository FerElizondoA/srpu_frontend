import React, { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import {
  // BrowserRouter as Router,
  Route,
  // Link,
  // createBrowserRouter,
  // createRoutesFromElements,
  // RouterProvider,
  useNavigate,
  Routes,
} from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"; //, ThemeProvider

import { HomePage } from "./components/HomePage/HomePage";
import { continueSession, sessionValid } from "./validation";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#AF8C55",
    },
  },
});

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<HomePage />}></Route>)
// );

function App() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r: any) => {
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
      continueSession().then((r: any) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.106/");
        } else {
          navigate("../");
        }
      });
    }
  }, [IdApp, jt, navigate]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
