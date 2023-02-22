import './App.css';
import './Fonts.css'

import { 
  BrowserRouter as Router, 
  Route,
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { HomePage } from './components/HomePage/HomePage';

export const appTheme = createTheme({
  palette: {
    primary:{
      main: "#AF8C55"
    }
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;