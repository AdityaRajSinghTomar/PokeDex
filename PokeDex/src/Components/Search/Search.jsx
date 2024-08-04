import "./Search.css";
import PokeList from "../PokemonList/PokemonList";
function Search() {
  return (
    <>
      <div className="searchWrapper">
        <input
          id="pokemonNameSearch"
          type="text"
          placeholder="PokeMon Name..."
        />
        <PokeList />
      </div>
    </>
  );
}

export default Search;
