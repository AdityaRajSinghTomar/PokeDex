import { Link } from "react-router-dom";
import "./Pokemon.css";
function Pokemon({ name, image, id }) {
  return (
    <Link to={`pokemon/${id}`} className="Links">
      <div className="pokeListCard">
        <div className="pokeCardName">{name}</div>
        <div>
          <img src={image} alt="Pokemon" className="pokeImg" />
        </div>
      </div>
    </Link>
  );
}

export default Pokemon;
