import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokeDetails.css";

function PokeDetails() {
  const { id } = useParams();
  const [poke, setPoke] = useState([]);
  async function loadPoke() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    setPoke({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default
        ? response.data.sprites.other.dream_world.front_default
        : response.data.sprites.other.showdown.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
    });
  }
  useEffect(() => {
    loadPoke();
  }, []);
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
    </div>
  );
}

export default PokeDetails;
