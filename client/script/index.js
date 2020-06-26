import { type_color, fetchMyPokemon, pages } from "./module.js";

const home = document.querySelector(".home-center");
const pageNav = document.querySelector(".page-nav");

const page = window.location.href.split("/")[3] || 1;
const [start, end] = pages[page];

async function getPokemonList(start, end) {
  const pokemonList = [];

  for (let i = start; i <= end; ++i) {
    const pokemon = await fetchMyPokemon(i);
    pokemonList.push(pokemon);
  }

  return pokemonList;
}

function createUserDiv(weight, base_experience, img) {
  const user = document.createElement("div");

  const userInnerHtml = `
    <div class="level center">Exp: ${base_experience}</div>
    <div class="user-img">
      <img
        src="${img}"
        alt="poke-img"
      />
    </div>
    <div class="points center">Weight: ${weight}</div>`;

  user.classList.add("user-card");
  user.innerHTML = userInnerHtml;

  return user;
}

function createInfoDiv(id, name, stats) {
  const info = document.createElement("div");
  const statsDiv = document.createElement("div");

  const infoInnerHtml = `
    <h1 data-id=${id}>${name}</h1>
    <div class="coords">
      <span>ID</span>
      <span>${String(id).padStart(3, "0")}</span>
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

function createGeneralDiv(id, name) {
  const general = document.createElement("div");

  const generalInnerHtml = `<h1 data-id=${id}>${name}</h1>
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

function sectionComponent(pokemon) {
  const layouts = [];
  const { id, name, stats, img, weight, base_experience } = pokemon;

  const user = createUserDiv(weight, base_experience, img);
  const info = createInfoDiv(id, name, stats);
  const general = createGeneralDiv(id, name);

  layouts.push(user, info, general);

  return layouts;
}

function pageComponent() {
  const pageNav = document.querySelector(".page-nav");
  const pageNumber = Object.keys(pages).length;

  for (let i = 0; i < pageNumber; ++i) {
    const page = document.createElement("button");
    page.classList.add("page");
    page.textContent = i + 1;
    pageNav.appendChild(page);
  }
}

function renderLayout(pokemon) {
  const { id, type } = pokemon;
  const layouts = sectionComponent(pokemon);

  const cardDiv = document.createElement("div");
  const additionalDiv = document.createElement("div");

  additionalDiv.classList.add("additional");
  additionalDiv.style.background = type_color[type[0]];

  for (let i = 0; i < 2; ++i) additionalDiv.appendChild(layouts[i]);

  cardDiv.classList.add("card");
  cardDiv.dataset.id = id;

  cardDiv.appendChild(additionalDiv);
  cardDiv.appendChild(layouts[2]);

  home.appendChild(cardDiv);
}

getPokemonList(start, end).then((pokemonList) => {
  pokemonList.forEach((pokemon) => renderLayout(pokemon));
  pageComponent();

  home.addEventListener("click", (e) => {
    const { id } = e.target.dataset;

    if (id) window.location.href = `http://localhost:5000/pokemon/${id}`;
  });
});

pageNav.addEventListener("click", (e) => {
  const { target } = e;

  if (target.classList.value === "page")
    window.location.href = `http://localhost:5000/${target.textContent}`;
});
