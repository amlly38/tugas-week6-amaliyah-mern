const fs = require("fs");

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  try {
    const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
    const pokemonList = await fetch(pokemonApiURL).then((res) => res.json());
    const payload = [];

    for (let index = 0; index < pokemonList.results.length; index++) {
      const pokemon = pokemonList.results[index];
      const detailPokemon = await fetch(pokemon.url).then((res) => res.json());
      const spesies = await fetch(detailPokemon.species.url).then((res) => res.json());
      const evo = await fetch(spesies.evolution_chain.url).then((res) => res.json());
    }

  } catch (error) {
    console.log(error);
  }  
  
}

generateJsonDB();
