import Search from "../Search/Search";
import "./Pokedex.css";
function Pokedex() {
  return (
    <div className="pokedexWrapper">
      <h1 id="pokedexHeading">PokeDex</h1> <Search />
    </div>
  );
}

export default Pokedex;
