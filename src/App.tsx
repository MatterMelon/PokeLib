import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Pokemons from "./pages/Pokemons";
import Navbar from "./components/ui/Navbar/Navbar";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:name" element={<PokemonPage />} />
        <Route path="*" element={<Navigate to={"/pokemons"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
