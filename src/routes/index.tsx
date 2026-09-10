import { BrowserRouter, Route, Routes } from "react-router";
import { Menu } from "../components/Menu";
import { Home } from "../pages/Home";
import { Usuarios } from "../pages/Usuarios";
import { Usuario } from "../pages/Usuario";
import { NaoEncontrada } from "../pages/NaoEncontrada";

export function Routers() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/usuarios" element={<Usuarios />}></Route>
          <Route path="/usuarios/:id" element={<Usuario />}></Route>
          <Route path="*" element={<NaoEncontrada />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
