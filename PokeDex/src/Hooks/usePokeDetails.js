import axios from "axios";
import { useEffect, useState } from "react";
import usePokeList from "./usePokeList";

function usePokeDetails(id) {
  const [poke, setPoke] = useState([]);
  async function loadPoke() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonOfSameTypes = await axios.get(
      `https://pokeapi.co/api/v2/type/${
        response.data.types ? response.data.types[0].type.name : ""
      }`
    );

    setPoke({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default
        ? response.data.sprites.other.dream_world.front_default
        : response.data.sprites.other.showdown.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
      similar: pokemonOfSameTypes.data.pokemon.slice(0, 5)
    });

    setState({
      ...state,
      type: response.data.types ? response.data.types[0].type.name : ""
    });
  }

  const { state, setState } = usePokeList();

  useEffect(() => {
    loadPoke();
  }, []);

  return { poke };
}

export default usePokeDetails;
