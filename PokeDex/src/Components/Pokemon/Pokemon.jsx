import "./Pokemon.css";
function Pokemon({ name, image }) {
  return (
    <div className="pokeListCard">
      <div className="pokeCardName">{name}</div>
      <div>
        <img src={image} alt="Pokemon" />
      </div>
    </div>
  );
}

export default Pokemon;
