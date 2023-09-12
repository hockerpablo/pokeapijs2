const pokemonCont = document.getElementById("poke_content")
// const Btn = document.querySelector(".mandar")
// const borrarBtn = document.querySelector(".borrar")

const  appState = {
    currentUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1',
    isFetching: false
}

//adaptador

const pokeAdapter = (pokemonData) => {
    return{
        id: pokemonData.id,
        name: pokemonData.name,
        Image: pokemonData.sprites.other.home.front_default,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types,
        experience: pokemonData.base_experience,
    };
};
const createCardPokemon = (pokemon) =>{
    let {id, name, species, stats, height, Image, weight
    } = pokeAdapter(pokemon);
    return`<div class="pantalla">
    <div class="pantalla1"> 
    <div class="buscador">
    <spam class="spec">Id:"${id}"</spam>
    <spam class="spec">Nombre:"${name}"</spam>
    <spam class="spec">Especie:"${species}"</spam>
    <spam class="spec">Estadisticas:"${stats}"</spam>
    <spam class="spec">Altura:"${height}"Mts</spam>
    <spam class="spec">Peso"${weight}"Kg</spam>
<div class="controls_cont">
<img src="${Image}" alt="imagen de pokemon">
<form id="registerForm" novalidate>    
    <div class="titulo">Busca segun su numero</div>
    <input type="number" id="buscador" class="buscador "placeholder="coloca aqui tu id">
    <small id="errorForm"></small>
   <input type="submit" id="mandar" class="btn" value="un boton">
    </form>
</div>   
    </div>
</div>
`;
};

const renderPokemons = (pokemonList) =>{pokemonCont.innerHTML = pokemonList.map(createCardPokemon).join('')}

const getPokemonData = async () =>{
    const {next, results} = await fetchpoke(appState.currentUrl)
    appState.currentUrl = next
    const pokemonDataUrls = results.map((pokemon) => pokemon.url)
    const pokemonsData = await Promise.all(
        pokemonDataUrls.map(async(url)=> {
            return await fetchpoke(url);
        })
    )
    return pokemonsData
}

const loadAndRenderPokemons = async (renderingFunction) =>{
    const pokemonsData = await getPokemonData()
    renderingFunction(pokemonsData)
}

const init = () =>{
    window.addEventListener(
        "DOMContentLoaded",
        async () => await loadAndRenderPokemons(renderPokemons)
    )
   
}


init()
