import "./Search.css";
function Search() {
  return (
    <>
      {" "}
      <div className="searchWrapper">
        <input
          id="pokemonNameSearch"
          type="text"
          placeholder="PokeMon Name..."
        />
      </div>
    </>
  );
}

export default Search;
