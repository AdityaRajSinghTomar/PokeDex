import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokeList() {
  // const [PokeURL, setURL] = useState("https://pokeapi.co/api/v2/pokemon");
  // const [pokeList, setPokeList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [next, setn] = useState("");
  // const [prev, setp] = useState("");
  const [state, setState] = useState({
    pokeList: "",
    isLoading: true,
    pokeURL: "https://pokeapi.co/api/v2/pokemon",
    next: "",
    prev: ""
  });

  async function downloadPokemons() {
    setState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(state.pokeURL); //Download list of 20 Pokemons
    const Results = response.data.results;
    console.log(Results[0].url); //Get array of Pokemons from result
    setState((state) => ({
      ...state,
      next: response.data.next,
      prev: response.data.previous
    }));
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
    setState((state) => ({ ...state, pokeList: res, isLoading: false }));
    console.log(res);
  }

  useEffect(() => {
    downloadPokemons();
  }, [state.pokeURL]);

  return (
    <div className="pokemonListWrapper">
      <div id="listTitle">Pokemon List</div>
      <div className="controls">
        <button
          disabled={state.prev == null}
          onClick={() =>
            setState((state) => ({ ...state, pokeURL: state.prev }))
          }
        >
          Previous
        </button>
        <button
          disabled={state.next == null}
          onClick={() =>
            setState((state) => ({ ...state, pokeURL: state.next }))
          }
        >
          Next
        </button>
      </div>
      <div className="pokemonList">
        {state.isLoading ? (
          <div className="Load">Loading</div>
        ) : (
          state.pokeList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default PokeList;
