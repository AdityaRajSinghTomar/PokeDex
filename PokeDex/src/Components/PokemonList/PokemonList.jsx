import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokeList() {
  const [PokeURL, setURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setn] = useState("");
  const [prev, setp] = useState("");
  async function downloadPokemons() {
    setIsLoading(true);
    const response = await axios.get(PokeURL); //Download list of 20 Pokemons
    const Results = response.data.results;
    console.log(Results[0].url); //Get array of Pokemons from result
    setn(response.data.next);
    setp(response.data.previous);
    const pokemonResultsPromise = Results.map((p) => axios.get(p.url)); //Iterating over an array of pokemons, and using their url, creating array of promises
    const pokemonData = await axios.all(pokemonResultsPromise);
    //Passing that promise array to axios.all

    const res = pokemonData.map((pokeData) => {
      //Iterate on data of each pokemon, extracting id, name, image, types
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.other.showdown.front_default,
        types: pokemon.types
      };
    });
    console.log(res);
    setPokeList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [PokeURL]);

  return (
    <div className="pokemonListWrapper">
      <div id="listTitle">Pokemon List</div>
      <div className="controls">
        <button disabled={prev == null} onClick={() => setURL(prev)}>
          Previous
        </button>
        <button disabled={next == null} onClick={() => setURL(next)}>
          Next
        </button>
      </div>
      <div className="pokemonList">
        {isLoading ? (
          <div className="Load">Loading</div>
        ) : (
          pokeList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default PokeList;
