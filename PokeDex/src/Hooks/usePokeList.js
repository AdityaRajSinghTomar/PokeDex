import axios from "axios";
import { useEffect, useState } from "react";

function usePokeList() {
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

    //Get array of Pokemons from result
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

    setState((state) => ({ ...state, pokeList: res, isLoading: false }));
  }
  useEffect(() => {
    downloadPokemons();
  }, [state.pokeURL]);

  return { state, setState };
}

export default usePokeList;
