'use strict';

console.log('Hola que tal');


const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const resultList = document.querySelector('.result-list');
const favList = document.querySelector('.favourite-list');
const inputElem = document.querySelector('#search-name');
const submitButton = document.querySelector('#submit-button');

//1. Guardar el valor del input en una constante y desabilitar el default del botón:

let inputValue = inputElem.value;

function searchAction(){
    preventDefault(event);
    inputValue = inputElem.value;
    console.log(inputValue)
    loadResults();
}

function preventDefault(event){
    event.preventDefault()
}

//2. Pedir los datos a la api según el valor del input.

let searchList = null;
const selectedContent = readLocalStorage();

function loadResults(){
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        searchList = data;
        console.log(`this is ${searchList}`);
        console.log(searchList);
        renderList(searchList); 
        renderFavs(selectedContent); 
      })
  }

//3. Pintar el contenid que devuelve la API en un listado.

//bonus: cambiar el innerHTML por metodo avanzado de DOM
//cambiar estilo a favoritos

function renderList(arr){
      for(let item of arr) {
      resultList.innerHTML +=  
      `<li id="${item.show.id}" class='resultList-item'> <img class='resultList-item_img' src="${item.show.image.medium}"> </img> <p class='resultList-item_title'>${item.show.name}</p></li>`
      addClickListeners();
    }
  }


//4 Hacer los listeners para detectar cuando se esté pinchando encima
//para saber que me esta cogiendo, console.log()

function addClickListeners(){
    const liListElem = document.querySelectorAll('.resultList-item');
    for (let li of liListElem){
        li.addEventListener('click', selectItems)
    }
}

// 5. guardar la informacion (.setItem) para guardar. Bajo el nombre 'selectedInfo' guardaré en formato JSON y convertire en un string lo que me devuelva la función 'selectedItems'
function setLocalInfo(){
    localStorage.setItem('selectedItemInfo', JSON.stringify(selectedContent));
}

//6. leer la información (.getItem) para leer. ReadLocalStorage será el resultado de SelectedItems en formato Array.

function readLocalStorage(){
    let localInfo = JSON.parse(localStorage.getItem('selectedItemInfo'));
    if(localInfo !== null){
      return localInfo;
    } else {
      return localInfo = [];
    }
 }

//7. REcoger el id del item clicado. con (.push) meter el contenido. // no entiendo muy bien poruqé va aqui el setLocalInfo y no al reves

 function selectItems(evt){
    const selected = evt.currentTarget.id;
    console.log(selected); //cambia
    selectedContent.push(selected);
    setLocalInfo();
    renderFavs(selectedContent);
    removeMovie();
}

// función que se quede con el id del objeto
 //le paso el objeto que itera(id) - si es igual que lo que le paso por el parametro me devolvera
function getSelectedObj(id){
    console.log(searchList);
    return searchList.find( show => n.show.id === id) 
}

//8. Pintar favoritos en otra ul //favourite es un string - object es un objecto pero devuelve la id en numero

function renderFavs(favArr){
  favList.innerHTML = '';
  for(let favourite of favArr) {
    const object = getSelectedObj(favourite);

    console.log(object);
    if( favourite == object.id){
      console.log(object.show.id);
      console.log(typeof(object.show.id));
      favList.innerHTML += `<li class='favList-item'id=${object.show.id}> <img class='favList-item_img' src='${object.show.image.medium}' width='180px;'> <p class='favList-item_title'> ${object.show.name} </p> <button class='fav-button'> borrar </button></li>`;
      addFavouriteListeners();
   }
  }
}

//añado los listeners los botones de borrar
function addFavouriteListeners(){
  const liListElem = document.querySelectorAll('.fav-button');
  for(let li of liListElem) {
    li.addEventListener('click', removeMovie);
  }
}

//función que borra la película
//me quedo con el id del li
//me quedo con el índice
//le paso a splice el índice y 1 como referencia  que elimino un elemento
function removeMovie(evt){
  const elemShow = evt.currentTarget.parentElement.id;
  const elemIndex = selectedContent.indexOf(elemShow);
  selectedContent.splice(elemIndex,1);
  setLocalInfo();
  renderFavs(selectedContent)
}


loadResults();
// 1. Al pulsar el boton se ejecuta la función que guarda lo que hay dentro del input en una variable
submitButton.addEventListener('click', searchAction)
submitButton.addEventListener('click', preventDefault )