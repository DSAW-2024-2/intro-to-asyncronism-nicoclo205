const listaDePokemones = document.querySelector('#listaPokemon');
let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i<=151; i++ ){
    fetch(url + i)
    .then(response => response.json())
    .then(data=> mostrarPokemon(data))
}

function mostrarPokemon(data) {
    let types = data.types.map(type => type.type.name);

    const div = document.createElement('div');
    div.classList.add('pokemones');
    div.innerHTML = `
        <div class="md:size-[80%]">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="w-full">
        </div>
        <div class="mt-5">
            <p class="font-extrabold text-gray-400">${data.id}</p>
            <h2 class="font-bold">${data.name}</h2>
            <p>${types.map(type => `<span class="type-badge ${type}">${type}</span>`).join(' ')}</p> <!-- Aquí muestro los tipos correctamente -->
            <p>${data.height} | ${data.weight}</p>
        </div>
    `;
    listaDePokemones.append(div);
}

