import "./App.css";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import CardList from "./components/ui/CardList/CardList";

function App() {
  const pokemons = [
    {
      id: 1,
      name: "Poke1",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 2,
      name: "Poke2",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 3,
      name: "Poke3",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
  ];

  return (
    <CardList>
      {pokemons.map((pokemon) => (
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          imageUrl={pokemon.image}
        />
      ))}
    </CardList>
  );
}

export default App;
