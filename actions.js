const listaDePokemones = document.querySelector('#listaPokemon');
let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i<=151; i++ ){
    fetch(url + i)
    .then(response => response.json())
    .then(data=> mostrarPokemon(data))
}

function mostrarPokemon(data){
    const div = document.createElement('div');
    div.classList.add('pokemones');
    div.innerHTML = 
    `<div class="md:size-[80%]">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="pikachu" class="w-full">
                </div>
                <div class="pokemon-info">
                    <p>#025</p>
                    <h2>${data.name}</h2>
                    <p>Electric</p>
                    <p>4m | 60kg</p>
                </div>`;
 listaDePokemones.append(div);
}