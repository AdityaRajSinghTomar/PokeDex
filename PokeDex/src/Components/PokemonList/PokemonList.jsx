import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
const PokeURL = "https://pokeapi.co/api/v2/pokemon";
function PokeList() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function downloadPokemons() {
    const response = await axios.get(PokeURL); //Download list of 20 Pokemons
    const Results = response.data.results; //Get array of Pokemons from result
    const pokemonResultsPromise = Results.map((p) => axios.get(p.url)); //Iterating over an array of pokemons, and using their url, creating array of promises
    const pokemonData = await axios.all(pokemonResultsPromise);
    //Passing that promise array to axios.all

    const res = pokemonData.map((pokeData) => {
      //Iterate on data of each pokemon, extracting id, name, image, types
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
      <div className="controls">
        <button>Previous</button>
        <button>Next</button>
      </div>
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
