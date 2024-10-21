let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "p-1 m-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-lg",
    },
    React.createElement(
      "div",
      {
        className:
          "bg-slate-800 rounded-lg p-6 shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out", 
      },
      React.createElement("img", {
        className: "w-32 h-32 mx-auto mb-4 rounded-full border-4 border-indigo-600",
        src: props.image,
        alt: props.name,
      }),
      React.createElement(
        "h2",
        { className: "text-xl font-bold text-center text-indigo-400" },
        props.name
      ),
      React.createElement(
        "p",
        { className: "text-center text-gray-300 font-medium" },
        `Type: ${props.types}`
      )
    )
  );
}
// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-400" }, 
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6" }, 
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "" },
    React.createElement(
      "header",
      { className: "" },
      React.createElement(
        "h1",
        { className: "text-3xl text-center font-bold underline" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
