import { Routes, Route } from "react-router-dom";
import { Home } from "./screens/home/home";
import "./App.css";
import { Init } from "./screens/int/Init";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Init />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
