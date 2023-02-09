//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();
function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweet);

  //Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse( localStorage.getItem('tweets')) || [];

    console.log(tweets);
    crearHTML();
  })
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();
  
  //Text area donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;
  
  //Validacion
  if(tweet === '') {
    mostrarError('Un mensaje no puede ir vacio');
    return; //evita que se ejecute mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }
  
  //Añadir al arreglo de twwits
  tweets = [...tweets, tweetObj]
  
  //una ve agregado vamos a crear el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

//Mostrar error
function mostrarError(error) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  // inyectando en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  // elimina la alerta
  setTimeout(() => {
    mensajeError.remove()
  }, 3000);
}

//muestra un listado de los tweets
function crearHTML() {

  limpiarHTML();

  if( tweets.length > 0 ) {
    tweets.forEach( tweet => {

      //Agregar un boton elimina
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';

      //Añadir la funcion eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }

      //Crear el HTML
      const li = document.createElement('li');

      // Añadir el texto
      li.textContent = tweet.tweet;

      //Asignar el boton
      li.appendChild(btnEliminar);

      //insertarlo en el HTML
      listaTweets.appendChild(li)
    } )
  }

  sincronizarStorage();
}

//Agrega los tweets a local storage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
  tweets = tweets.filter( tweet => tweet.id !== id);

  crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
  while( listaTweets.firstChild ) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}