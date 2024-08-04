import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./Routes/CustomRoutes";

function App() {
  return (
    <div className="outer">
      <div>
        <h1 id="pokedexHeading">
          <Link to="/" className="headLink">
            PokeDex
          </Link>
        </h1>
      </div>
      <CustomRoutes />
    </div>
  );
}

export default App;
