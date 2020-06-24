import { type_color, fetchMyPokemon } from "./module.js";

const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");

const articles = document.querySelectorAll(".content");
const img = document.querySelector("img");

//const key = localStorage[0] || 1;
const key = window.location.href.split("/")[3];

// https://pokeres.bastionbot.org/images/pokemon/${id}.png

img.src = `https://pokeres.bastionbot.org/images/pokemon/${key}.png`;

async function setPokemon() {
  const pokemonInfo = await fetchMyPokemon(key);
  const { id, name, type } = pokemonInfo;

  const idSpan = document.querySelector("#id");
  const nameSpan = document.querySelector("#name");

  const div = document.querySelector("#type");

  idSpan.textContent = id;
  nameSpan.textContent = name;

  for (let i = 0; i < type.length; ++i) {
    const p = document.createElement("p");
    p.textContent = " " + type[i];
    p.style.background = type_color[type[i]];
    p.style.display = "block";
    div.appendChild(p);
  }
}

setPokemon();

about.addEventListener("click", (e) => {
  const { id } = e.target.dataset;
  const { target } = e;

  if (id) {
    // remove active other btn
    btns.forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    // hide other articles
    articles.forEach((article) => article.classList.remove("active"));
    const article = document.querySelector(`#${id}`);

    article.classList.add("active");
  }
});
