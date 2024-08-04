import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokeList() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function downloadPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const Results = response.data.results;
    const pokemonResultsPromise = Results.map((p) => axios.get(p.url));
    const pokemonData = await axios.all(pokemonResultsPromise);

    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types
      };
    });
    console.log(res);
    setPokeList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <div className="pokemonListWrapper">
      <div id="listTitle">Pokemon List</div>
      <div className="pokemonList">
        {isLoading
          ? "Loading..."
          : pokeList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
    </div>
  );
}

export default PokeList;
