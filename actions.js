const listaDePokemones = document.querySelector('#listaPokemon');
let url = "https://pokeapi.co/api/v2/pokemon/";
let pokemones = []; // Array global para almacenar los datos de los Pokémon

// Cargar los Pokémon
for (let i = 1; i <= 151; i++) {
    fetch(url + i)
    .then(response => response.json())
    .then(data => {
        pokemones.push(data); // Guardar los datos en el array
        mostrarPokemon(data);
    });
}

function mostrarPokemon(data) {
    let types = data.types.map(type => type.type.name);

    let dataId = data.id.toString();
    if (dataId.length === 1) {
        dataId = "00" + dataId;
    } else if (dataId.length === 2) {
        dataId = "0" + dataId;
    }

    const div = document.createElement('div');
    div.classList.add('pokemones');
    div.innerHTML = `
        <div class="md:size-[80%]">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="w-full">
        </div>
        <div class="mt-5">
            <p class="font-extrabold text-gray-400">${dataId}</p>
            <h2 class="font-bold">${data.name}</h2>
            <p>${types.map(type => `<span class="type-badge ${type}">${type}</span>`).join(' ')}</p>
            <p>${data.height} | ${data.weight}</p>
        </div>
    `;
    listaDePokemones.append(div);
}

// Manejar el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario
    const search = document.getElementById('default-search').value.toLowerCase();
    console.log(search);

    // Oculta todos los Pokémon
    const pokemonesDiv = document.querySelectorAll('.pokemones');
    pokemonesDiv.forEach(pokemon => pokemon.classList.add('hidden'));

    // Buscar el Pokémon que coincide con el nombre o ID
    const pokemonEncontrado = pokemones.filter(pokemon => {
        const pokemonName = pokemon.name.toLowerCase();
        const pokemonId = pokemon.id.toString();
        const pokemonTypes = pokemon.types.map(type => type.type.name.toLowerCase());
        return pokemonName === search || pokemonId === search || pokemonTypes.includes(search);
    });

    if (pokemonEncontrado.length > 0) {
        // Mostrar los Pokémon encontrados
        const divs = document.querySelectorAll('.pokemones');
        divs.forEach(div => {
            // Ocultar todos los Pokémon primero
            div.classList.add('hidden');
        });
    
        // Mostrar los Pokémon que coinciden
        pokemonEncontrado.forEach(pokemon => {
            const divs = document.querySelectorAll('.pokemones');
            divs.forEach(div => {
                if (div.innerHTML.includes(pokemon.name)) {
                    div.classList.remove('hidden');
                }
            });
        });

    } else {
        alert('No se encontró el Pokémon.');
    }
});