import "./Search.css";
import PokeList from "../PokemonList/PokemonList";
function Search() {
  return (
    <>
      <div className="searchWrapper">
        <div id="pokemonNameSearch">
          <input type="text" placeholder="PokeMon Name..." />
        </div>
        <PokeList />
      </div>
    </>
  );
}

export default Search;
