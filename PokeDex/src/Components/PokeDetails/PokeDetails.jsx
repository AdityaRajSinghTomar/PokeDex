import { useParams } from "react-router-dom";
import "./PokeDetails.css";
import usePokeDetails from "../../Hooks/usePokeDetails";

function PokeDetails() {
  const { id } = useParams();
  const { poke } = usePokeDetails(id);

  return (
    <div className="detailWrapper">
      <div>
        <img src={poke.image} />
      </div>
      <div>
        <span className="Name">{poke.name}</span>
      </div>
      <div>
        <span className="W">Weight : {poke.weight}</span>
      </div>
      <div>
        <span className="H">Height : {poke.height}</span>
      </div>
      <div className="T">
        {poke.types &&
          poke.types.map((t) => (
            <div key={t}>
              <span className="T2">{t}</span>
            </div>
          ))}
      </div>
      {poke.types && poke.similar && (
        <div>
          more {poke.types[0]} type Pokemons
          <ul>
            {poke.similar.map((p) => (
              <li key={p.pokemon.name}> {p.pokemon.name} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokeDetails;
