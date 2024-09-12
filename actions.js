const listaDePokemones = document.querySelector('#listaPokemon');
const loaderContainer = document.querySelector('#loaderContainer');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#default-search');
let url = "https://pokeapi.co/api/v2/pokemon/";
let pokemones = []; 

// Función para mostrar el loader y deshabilitar la búsqueda
function showLoader() {
    loaderContainer.classList.remove('hidden');
    searchInput.disabled = true;
    searchInput.classList.add('bg-gray-100'); // Añade un estilo visual para indicar que está deshabilitado
}

// Función para ocultar el loader y habilitar la búsqueda
function hideLoader() {
    loaderContainer.classList.add('hidden');
    searchInput.disabled = false;
    searchInput.classList.remove('bg-gray-100');
}

// Función para cargar los Pokémon secuencialmente
async function cargarPokemones() {
    showLoader(); // Mostrar el loader y deshabilitar la búsqueda antes de comenzar la carga
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
    hideLoader(); // Ocultar el loader y habilitar la búsqueda cuando se completa la carga
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
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const search = searchInput.value.toLowerCase();

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
        alert('No se encontraron resultados');
    }
});