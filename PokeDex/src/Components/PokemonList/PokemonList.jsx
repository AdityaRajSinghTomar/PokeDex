import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokeList from "../../Hooks/usePokeList";

function PokeList() {
  const { state, setState } = usePokeList("https://pokeapi.co/api/v2/pokemon");

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
