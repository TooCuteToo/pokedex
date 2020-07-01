import { type_color, fetchMyPokemon } from "./module.js";

const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");

const articles = document.querySelectorAll(".content");
const img = document.querySelector("img");

(async function () {
  const idSpan = document.querySelector("#id");
  const nameSpan = document.querySelector("#name");

  const div = document.querySelector("#type");
  const key = window.location.href.split("/")[4];

  let pokemonInfo = null;

  try {
    pokemonInfo = await fetchMyPokemon(key);
  } catch {
    window.location.href = `http://localhost:5000/pokemon/${1}`;
  }

  const { id, name, type } = pokemonInfo;

  img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  idSpan.textContent = id;
  nameSpan.textContent = name;

  for (let i = 0; i < type.length; ++i) {
    const p = document.createElement("p");
    p.textContent = " " + type[i];
    p.style.background = type_color[type[i]];
    p.style.display = "block";
    div.appendChild(p);
  }
})();

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


