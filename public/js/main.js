console.log("js file loaded");

let offset = 0;
const limit = 10;
let isLoading = false;

async function loadPokemon() {
  if (isLoading) return; // Prevent multiple simultaneous loads
  isLoading = true; // Set loading flag

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  let jsonObj = await response.json();

  for (let i = 0; i < jsonObj.results.length; i++) {
    let pokemon = jsonObj.results[i];

    console.log(pokemon.name);

    let response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
    );
    let jsonObj2 = await response2.json();

    console.log(jsonObj2);
    console.log(jsonObj2.sprites.other["official-artwork"].front_default);

    let img = jsonObj2.sprites.other["official-artwork"].front_default;
    let name = jsonObj2.name;

    let card = `
      <div class="card m-3" style="width: 475px; margin: 20px auto;">
        <img src="${img}" class="card-img-top">
        <div class="card-body" style="background-color:#f8f8f8;">
          <h3 class="card-title">${name}</h3>
        </div>
      </div>
    `;
    document.getElementById("pokemonList").innerHTML += card;
  }

  offset += limit;
  isLoading = false;
}

document.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollbuffer = 200; // Adjust this value as needed
  if (scrollTop + clientHeight + scrollbuffer >= scrollHeight) {
    loadPokemon();

    // console.log("End of page reached");
  }
});
loadPokemon();
