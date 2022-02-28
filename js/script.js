// Manipulacion del DOM ---> Quiere decir que JavaScript es quien va a seleccionar nuestro
// contenedor y va a ser el encargado de pintar el pokemon.

const poke_container = document.getElementById('poke-container')
const pokemon_count = 150

// Esta es la forma de declarar un objeto Mike lo declaro como una constante 
// porque el nombre del objeto no va a cambiar aunque su contenido si cambie.
// Si lo declarara como un let no pasaria nada solo me permitiria cambiar el nombre del 
// objeto lo mismo con var pero recuerda NO USES JAMAS var


const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// Object es ya un objeto disponible a javascript y en la siguiente linea 
// basicamente lo que estoy diciendo es: Accede a la funcion keys que te permite 
// recorrer el objeto de colores, para que sea mas ilustrativo puedes pegar el objeto y 
// la siguiente linea en la consola del navegador e imprimir main_types para que veas 
// que es lo que hace Object.keys(colors)

const main_types = Object.keys(colors)


// Esto es my importante mike basicamente lo que se esta diciendo aqui es: 

// Tu puedes declarar una funcion en javascript de 2 formas 

function nombreDeTuFuncion(){

}

// o tambien la puedes declara asignandola a una constante con la notacion flecha y de hecho esta es la que usaremos mas
// yo despues te explico que diferencia hay entre ambas pero por ahora basta que sepas que ambas formas son para declarar una funcion

const nombreDeTuFuncion = () => {

}

// eso es lo mismo que la declaracion de la funcion de la linea 43

// Se esta declarando una funcion que se va a ejecutar en segundo plano por eso la precede la palabra reservada async
// Es decir que el programa no va a esperar hasta que se termine de recorrer el objeto de colores, simplemente se lo estas pidiendo a la maquina y cuando acabe 
// va a mandar a llamar a la funcion getPokemon(i) i es la cuenta que lleva del recorrido que esta haciendo del objeto, como nuestro objeto tiene 13 elementos  pues la cuenta va a ir de 0 a 12 que serian 13 elementos
// y esa palabra reservada await se debe de usar para indicarle al programa que en ese punto va a esperar pero no va a pausar ni detener el programa.Es


// POR AHORA TU NO INTENTES REPLICAR ESTE COMPORTAMIENTO PUES NO CREO QUE LE ENTIENDAS YO TE EXPLICO AHORA QUE ESTE CONTGO PARA QUE Y COMO Y CUANDO SE USA
// de momento solo me interesa de aqui que analices como se declaran las funciones con flecha y de la forma normal
// y como declaramos los objetos.


const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

// En esta funcion se le esta pidiendo al servidor publico que nos entregue los pokemones disponibles
// El servidor te va a mostrar los pokemos disponibles con esta url https://pokeapi.co/api/v2/pokemon

// hAS DE CUENTA QUE ES COMO ENTRAR AL navegador pero por codigo
// tiene un dato dinamico que es ese id. y las cadenas o strings pueden ser declaradas asi :
// 'hola mike'
// "hola mike"
// `hola mike` ---> Solo que cuando las declaras aqui puede insertar datos dinamicos metiendolos en ${} esto

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

// Aqui igual hay manejo del DOM si quieres profundizar en esto en el curso de javascript en el navegador te lo explica mas
// la verdad es que como en react no hacemos manejo del DOM porque es mala practica no es tan importante que le entiendas 
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

// En cuanto se carga el programa se manda a llamar a esta funcion y esta a su vez va mandando a llamar a las otras
fetchPokemons()
