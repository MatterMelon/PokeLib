import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Pokemons from "./pages/Pokemons";
import PokemonPage from "./pages/PokemonPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:name" element={<PokemonPage />} />
        <Route path="*" element={<Navigate to={"/pokemons"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
