const listaDePokemones = document.querySelector('#listaPokemon');
let url = "https://pokeapi.co/api/v2/pokemon/";
let pokemones = []; // Array global para almacenar los datos de los Pokémon

// Función para cargar los Pokémon secuencialmente
async function cargarPokemones() {
    for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(url + i);
            const data = await response.json();
            pokemones.push(data);
            mostrarPokemon(data);
            // Esperar un breve momento antes de la siguiente solicitud para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {
            console.error(`Error al cargar el Pokémon ${i}:`, error);
        }
    }
}

// Iniciar la carga de Pokémon
cargarPokemones();

function mostrarPokemon(data) {
    let types = data.types.map(type => type.type.name);

    let dataId = data.id.toString().padStart(3, '0');

    const div = document.createElement('div');
    div.classList.add('pokemones');
    div.innerHTML = `
        <div class="md:size-[80%]">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="">
        </div>
        <div class="mt-5">
            <p class="font-extrabold text-gray-400">#${dataId}</p>
            <h2 class="font-bold">${data.name}</h2>
            <p class="m-2 flex gap-[1rem]">${types.map(type => `<span class="type-badge ${type}">${type}</span>`).join(' ')}</p>
            <p class="text-gray-600">${data.height / 10}m <span class="text-gray-200">|</span> ${data.weight / 10}kg</p>
        </div>
    `;
    listaDePokemones.append(div);
}

// Manejar el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const search = document.getElementById('default-search').value.toLowerCase();

    const pokemonesDiv = document.querySelectorAll('.pokemones');
    pokemonesDiv.forEach(pokemon => pokemon.classList.add('hidden'));

    const pokemonEncontrado = pokemones.filter(pokemon => {
        const pokemonName = pokemon.name.toLowerCase();
        const pokemonId = pokemon.id.toString();
        const pokemonTypes = pokemon.types.map(type => type.type.name.toLowerCase());
        return pokemonName === search || pokemonId === search || pokemonTypes.includes(search);
    });

    if (pokemonEncontrado.length > 0) {
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