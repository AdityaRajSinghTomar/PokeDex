import { Routes, Route } from "react-router-dom";
import Pokedex from "../Components/Pokedex/Pokedex";
import PokeDetails from "../Components/PokeDetails/PokeDetails";
function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />}></Route>
      <Route path="pokemon/:id" element={<PokeDetails />}></Route>
    </Routes>
  );
}
export default CustomRoutes;
