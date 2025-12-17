const NUMBER_OF_CARDS = 12;
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const fetchSinglePokemon = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
    }
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.other["official-artwork"].front_default,
      isClicked: false,
    };
  } catch (error) {
    console.error("Error fetching single Pokémon:", error);
    return null;
  }
};

export const fetchPokemonData = async () => {
  const MAX_POKEMON_ID = 151;
  const selectedIds = new Set();

  while (selectedIds.size < NUMBER_OF_CARDS) {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    selectedIds.add(randomId);
  }

  const idsArray = Array.from(selectedIds);
  const fetchPromises = idsArray.map((id) => fetchSinglePokemon(id));

  const pokemonCards = await Promise.all(fetchPromises);

  return pokemonCards.filter((card) => card !== null);
};
