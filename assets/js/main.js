document.addEventListener("DOMContentLoaded", () => { 
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokModal = document.getElementById('pokModal');


const maxRecords = 151
const limit = 0
let offset = 0;


function convertPokemonToLi(pokemon){
    return ` 
    <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type"${type}>${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
        </div> 
    </li>
    `          

}

function mostrarModalPokemon(pokemon){
    const pokModal = document.getElementById("pokModal")
    const pokName = document.getElementById("pokName");
    const pokType = document.getElementById("type")
    const pokWeight = document.getElementById("weight");
    const pokHeight = document.getElementById("height");
    const pokPhoto = document.getElementById("pokPhoto");

    const heightInMeters = (pokemon.height *0.3048).toFixed(2);
    const weightInMeters = (pokemon.weight * 0.453592).toFixed(2);

    pokName.textContent = pokemon.name;
    pokPhoto.src = pokemon.photo;
    pokType.textContent = `Tipo: ${pokemon.type}`;
    pokWeight.textContent = `Peso: ${weightInMeters} Kg`;
    pokHeight.textContent = `Altura: ${heightInMeters} M`;

    pokModal.classList.add("show");
}

document.querySelector(".close-button").addEventListener("click", ()=>{
    pokModal.classList.remove("show");
});

function addClickPokemon(){
    const pokemonElements = pokemonList.querySelectorAll('li.pokemon');

    pokemonElements.forEach((element) => {
        element.addEventListener("click", () =>{
            const pokID = element.getAttribute("data-id");

            pokeAPI.getPokemonDetail({url: `https://pokeapi.co/api/v2/pokemon/${pokID}`})
            .then((pokDetail) =>{
                mostrarModalPokemon(pokDetail);
            });
        });
    });
}

function loadPokemonItens(offset, limit){
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;

        addClickPokemon();
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', ()=> {
    offset+= limit
    const qtdaraecords = offset + limit
    if(qtdaraecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens (offset, limit)
    }
});
});
