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
const selectedItems = readLocalStorage();

function loadResults(){
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        searchList = data;
        console.log(searchList)
        renderList(searchList); 
        //renderFavourites(selectedMovies); 
      })
  }

//3. Pintar el contenid que devuelve la API en un listado.

//bonus: cambiar el innerHTML por metodo avanzado de DOM

function renderList(arr){
    for(let item of arr) {
      resultList.innerHTML +=  
      `<li id="${item.show.id}" class='resultList-item'> <img class='resultList-item_img' src="${item.show.image.medium}"> </img> <p class='resultList-item_title'>${item.show.name}</p></li>`
      //addClickListeners();
    }
  }


//4 Hacer los listeners para detectar cuando se esté pinchando encima
//para saber que me esta cogiendo, console.log()

function addEventListeners(){
    const liListElem = document.querySelectorAll('.resultList-item');
    for (let li of liListElem){
        li.addEventListener('click', selectItem)
    }
}

// 5. guardar la informacion (.setItem) para guardar. Bajo el nombre 'selectedInfo' guardaré en formato JSON y convertire en un string lo que me devuelva la función 'selectedItems'
function setLocalInfo(){
    localStorage.setItem('selectedInfo', JSON.stringify(selectedItems));
}

//6. leer la información (.getItem) para leer. ReadLocalStorage será el resultado de SelectedItems en formato Array.

function readLocalStorage(){
    let localInfo = JSON.parse(localStorage.getItem('selectedInfo'));
    if(localInfo !== null){
      return localInfo;
    } else {
      return localInfo = [];
    }
 }

//7. REcoger el id del item clicado. con (.push) meter el contenido. // no entiendo muy bien poruqé va aqui el setLocalInfo y no al reves

 function selectedItems(evt){
    const selected = evt.currentTarget.id;
    console.log(selected);
    selectedMovies.push(selected);
    setLocalInfo();
}

// 1. Al pulsar el boton se ejecuta la función que guarda lo que hay dentro del input en una variable
submitButton.addEventListener('click', searchAction)


inputElem.addEventListener('keyup', searchAction)