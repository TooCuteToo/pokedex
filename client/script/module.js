export const type_color = {
  bug: "#C6D16E",
  dragon: "#A27DFA",
  electric: "#FAE078",
  fire: "#F5AC78",
  fairy: "#F4BDC9",
  flying: "#C6B7F5",
  fighting: "#D67873",
  grass: "#A7DB8D",
  ground: "#EBD69D",
  normal: "#C6C6A7",
  poison: "#C183C1",
  psychic: "#FA92B2",
  rock: "#D1C17D",
  water: "#9DB7F5",
};

export async function fetchMyPokemon(i) {
  const url = await `https://pokeapi.co/api/v2/pokemon/${i}`;
  const res = await fetch(url);

  const pokemon = await res.json();
  const { id, name, types, stats, weight, base_experience } = pokemon;

  const pokemonInfo = {
    id,
    name,
    weight,
    base_experience,
    type: types.map((type) => type.type.name),
    stats: stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
  };

  return pokemonInfo;
}
