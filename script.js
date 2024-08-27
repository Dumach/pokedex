const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const nameContainer = document.getElementById("name-container");
const imageContainer = document.getElementById("image-container")
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAtk = document.getElementById("special-attack");
const specialDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonTypes = [
  {
    name: "normal",
    color: "#A1A1A1",
  },
  {
    name: "fighting",
    color: "#F08833",
  },
  {
    name: "flying",
    color: "#8FB8E4",
  },
  {
    name: "poison",
    color: "#6D4B97",
  },
  {
    name: "ground",
    color: "#895229",
  },
  {
    name: "rock",
    color: "#ADA984",
  },
  {
    name: "bug",
    color: "#94A034",
  },
  {
    name: "ghost",
    color: "#6B426E",
  },
  {
    name: "steel",
    color: "#74A2B9",
  },
  {
    name: "fire",
    color: "#D43A30",
  },
  {
    name: "water",
    color: "#4C79BC",
  },
  {
    name: "grass",
    color: "#5D9D3C",
  },
  {
    name: "electric",
    color: "#F2C341",
  },
  {
    name: "psychic",
    color: "#DC4D79",
  },
  {
    name: "ice",
    color: "#78CBEF",
  },
  {
    name: "dragon",
    color: "#4C60A9",
  },
  {
    name: "dark",
    color: "#4E403F",
  },
  {
    name: "fairy",
    color: "#BA7FB5",
  },
  {
    name: "stellar",
    color: "#00000",
  },
  {
    name: "unknown",
    color: "#FFFFF",
  },
];

searchButton.addEventListener("click", () => {
  types.innerHTML = "";
  fetchPokemon();
});

const baseUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

async function fetchPokemon(){
  let search = searchInput.value;
  
  // Throw an error if empty
  if(!search){
    alert("Search bar is empty!");
    return;
  }

  // Sanitize input
  search = search.replace(/♀/, '-f');
  search = search.replace(/♂/, '-m');
  search = search.replace(/[ ]/, '-');
  search = search.replace(/[^-\w\s]/gi, '').trim().toLowerCase();
  
  // Fetch API from base url
  const response = await fetch(`${baseUrl}/${search}`);
  if(!response.ok){
    alert("Pokémon not found");
    return;
  }
  const pokemon = await response.json();
  
  // Updating frontend elements
  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonId.textContent = `#${pokemon.id}`;
  weight.textContent = `Weight: ${pokemon.weight}`;
  height.textContent = `Height: ${pokemon.height}`;
  imageContainer.innerHTML = `<img id="sprite" src="${pokemon.sprites.front_default}">`;

  // Adding pokemon types to frontend
  for(let i = 0; i < pokemon.types.length; i++){

    // Finding correct color
    let color = pokemonTypes.find((type) => {
      return type.name === pokemon.types[i].type.name
    });
    
    // Inserting into DOM
    types.innerHTML += 
    `<div class="type" style="background-color:${color.color}">
    ${pokemon.types[i].type.name}
    </div>`;
  }

  // Updating stats
  hp.textContent = pokemon.stats[0].base_stat;
  attack.textContent = pokemon.stats[1].base_stat;
  defense.textContent = pokemon.stats[2].base_stat;
  specialAtk.textContent = pokemon.stats[3].base_stat;
  specialDef.textContent = pokemon.stats[4].base_stat;
  speed.textContent = pokemon.stats[5].base_stat;
}