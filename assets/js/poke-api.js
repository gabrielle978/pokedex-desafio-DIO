const pokeAPI = {}

function convertPokeAPIDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    //equivalência
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) 
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    return pokemon;
}

pokeAPI.getPokemonDetail = (pokemon) => {
            return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeAPIDetailToPokemon)
}

pokeAPI.getPokemons = (offset=0, limit=20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then ((response) => response.json()) //retorno da promisse
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests)=> Promise.all(detailRequests))
        .then((pokemonsDetails)=> pokemonsDetails)
        }
        //debugger => debuga o código aplicando um breakpoint na execução

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) =>{
    console.log(results)
})

