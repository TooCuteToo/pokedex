import { type_color, fetchMyPokemon } from "./module.js";

async function getPokemonList() {
  const pokemonList = [];

  for (let i = 1; i <= 10; ++i) {
    const pokemon = await fetchMyPokemon(i);
    pokemonList.push(pokemon);
  }

  return pokemonList;
}

function createUserDiv(i, weight, base_experience) {
  const user = document.createElement("div");

  const userInnerHtml = `
    <div class="level center">Exp: ${base_experience}</div>
    <div class="user-img">
      <img
        src="https://pokeres.bastionbot.org/images/pokemon/${i + 1}.png"
        alt="poke-img"
      />
    </div>
    <div class="points center">Weight: ${weight}</div>`;

  user.classList.add("user-card");
  user.innerHTML = userInnerHtml;

  return user;
}

function createInfoDiv(i, name, stats) {
  const info = document.createElement("div");
  const statsDiv = document.createElement("div");

  const infoInnerHtml = `
    <h1 data-id=${i + 1}>${name}</h1>
    <div class="coords">
      <span>ID</span>
      <span>${String(i + 1).padStart(3, "0")}</span>
    </div>
    <div class="coords">
      <span>Name</span>
      <span>${name.toUpperCase()}</span>
    </div>`;

  for (let i = 0; i < 3; ++i) {
    statsDiv.innerHTML += `<div>
        <div class="title">${stats[i].name}</div>
        <i class="fa fa-heart"></i>
        <div class="value">${stats[i].base_stat}</div>
      </div>`;
  }

  statsDiv.classList.add("stats");
  info.classList.add("more-info");

  info.innerHTML = infoInnerHtml;
  info.appendChild(statsDiv);

  return info;
}

function createGeneralDiv(i, name) {
  const general = document.createElement("div");

  const generalInnerHtml = `<h1 data-id=${i + 1}>${name}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
      volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut
      pulvinar.
    </p>
    <span class="more">Mouse over the card for more info</span>`;

  general.classList.add("general");
  general.innerHTML = generalInnerHtml;

  return general;
}

function getTypeColor(type) {
  return type_color[type[0]];
}

const home = document.querySelector(".home-center");

getPokemonList().then((pokemonList) => {
  for (let i = 0; i < 10; ++i) {
    const cardDiv = document.createElement("div");
    const additionalDiv = document.createElement("div");
    const {
      id,
      name: pokeName,
      stats,
      type,
      weight,
      base_experience,
    } = pokemonList[i];

    cardDiv.classList.add("card");
    additionalDiv.classList.add("additional");
    additionalDiv.style.background = type_color[type[0]];

    const user = createUserDiv(i, weight, base_experience);
    const info = createInfoDiv(i, pokeName, stats);
    const general = createGeneralDiv(i, pokeName);

    additionalDiv.appendChild(user);
    additionalDiv.appendChild(info);

    cardDiv.appendChild(additionalDiv);
    cardDiv.appendChild(general);
    cardDiv.dataset.id = id;

    home.appendChild(cardDiv);
  }

  home.addEventListener("click", (e) => {
    const { id } = e.target.dataset;

    if (id) {
      window.location = `../about.html`;
      window.location.href = `http://localhost:5000/${id}`;
    }
  });
});
