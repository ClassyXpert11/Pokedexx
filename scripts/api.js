const btnSearch = document.getElementById("btnSearch");
const searchBar = document.getElementById("search");

function searchPokemon() {
  let pokemonName = document.getElementById("search").value;

  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      // for the image in the circle
      const mainImage = document.querySelector(".main-image");
      mainImage.innerHTML = `<img src="${res.sprites.front_default}">`;

      //  front image for the pokemon at the bottom
      const frontImage = document.querySelector(".front-default");
      frontImage.innerHTML = `<img src="${res.sprites.front_default}">`;

      //  back image for the pokemon at the bottom
      const backImage = document.querySelector(".back-default");
      backImage.innerHTML = `<img src="${res.sprites.back_default}">`;

      //  front shiny image for the pokemon at the bottom
      const frontShiny = document.querySelector(".front-shiny");
      frontShiny.innerHTML = `<img src="${res.sprites.front_shiny}">`;

      //  back shiny image for the pokemon at the bottom
      const backShiny = document.querySelector(".back-shiny");
      backShiny.innerHTML = `<img src="${res.sprites.back_shiny}">`;

      // for the name
      const name = document.querySelector("#name");
      name.innerHTML = `<b>${res.name.toUpperCase()}</b>`;

      // for the height
      const height = document.querySelector("#height");
      height.textContent = `Height: <strong>${res.height}m </strong>`;
      height.innerHTML = `Height: <strong>${res.height}m </strong>`;

      // for the weight
      const weight = document.querySelector("#weight");
      weight.textContent = `Weight: <strong>${res.weight}kg </strong>`;
      weight.innerHTML = `Weight: <strong>${res.weight}kg </strong>`;

      // for the #id
      const id = document.querySelector("#id");
      id.innerHTML = `#<u><b>${res.id}</b></u>`;

      // for the abilities
      const ability = document.querySelector("#ability");
      ability.innerHTML = `<strong>Abilities: </strong> <br>`;
      for (let index = 0; index < res.abilities.length; index++) {
        ability.innerHTML += `<div class="ability-list ${res.abilities[index].ability.name.toUpperCase()}">${res.abilities[index].ability.name.toUpperCase()}</div> <br>`;
      }

      // for the types
      const types = document.querySelector("#types");
      types.innerHTML = "";
      for (let index = 0; index < res.types.length; index++) {
        types.innerHTML += `<span class="${
          res.types[index].type.name
        } type"> ${res.types[index].type.name.toUpperCase()}</span>`;
      }

      // for the stats
      const stats = document.querySelector("#stats");
      stats.innerHTML = "";
      for (let index = 0; index < res.stats.length; index++) {
        let name = res.stats[index].stat.name.toUpperCase();
        let percentage = (res.stats[index].base_stat / 255) * 100;
        let extraClass = "bg-success";

        // change extraclass based on name
        if (name === "HP") {
          extraClass = "bg-success";
        } else if (name === "ATTACK") {
          extraClass = "bg-danger";
        } else if (name === "SPECIAL-ATTACK") {
          extraClass = "bg-danger";
        } else if (name === "DEFENSE" || name === "SPECIAL-DEFENSE") {
          extraClass = "bg-info";
        } else if (name === "SPEED") {
          extraClass = "bg-warning";
        } else {
          console.log(`Unknown case; ${name}`);
        }

        stats.innerHTML += `<div>${name}</div>
    <div class="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar ${extraClass} progress-bar-striped progress-bar-animated" style="width: ${percentage}%;">${res.stats[index].base_stat}</div>
    </div>`;
      }
    });
}

// This allows me to press enter to search the pokemon
btnSearch.addEventListener("click", searchPokemon);
searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});
