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

export const pages = {
  1: [1, 10],
  2: [11, 20],
  3: [21, 30],
  4: [31, 40],
  5: [41, 50],
};

export async function fetchMyPokemon(key) {
  const url = await `https://pokeapi.co/api/v2/pokemon/${key}`;
  const res = await fetch(url);

  const pokemon = await res.json();
  const { id, name, types, stats, weight, base_experience } = pokemon;

  const pokemonInfo = {
    id,
    name,
    weight,
    img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
    base_experience,
    type: types.map((type) => type.type.name),
    stats: stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
  };

  return pokemonInfo;
}
