'use strict';

const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const resultList = document.querySelector('.result-list');
const favList = document.querySelector('.favourite-list');
const inputElem = document.querySelector('#search-name');
const submitButton = document.querySelector('#submit-button');

//Guardar el valor del input en una constante y desabilitar el default del botón:

let inputValue = inputElem.value;

function searchAction(){
    preventDefault(event);
    inputValue = inputElem.value;
    loadResults();
}

function preventDefault(event){
    event.preventDefault()
}

//Pedir los datos a la api según el valor del input.

let searchList = null;
const selectedContent = readLocalStorage();

function loadResults(){
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        searchList = data;
        renderList(searchList); 
      })
  }

//Pintar el contenid que devuelve la API en un listado.

function renderList(arr){
      resultList.innerHTML = '';
      for(let item of arr) {
      
      const showObj = item['show'];
   
          const li = document.createElement('li');
          const img = document.createElement('img');
          const img2 = document.createElement('img');
          const div = document.createElement('div');
          const p = document.createElement('p');

          const text = document.createTextNode(showObj.name)

          img.setAttribute('class', 'resultList-item_img');
          img.setAttribute('alt', 'imagen de la serie');

          img2.setAttribute('class', 'resultList-item_heart');
          img2.setAttribute('alt', 'icon');
          
          if(showObj.image !== null && showObj.image !== undefined && showObj.image !== ''){
            img.setAttribute('src', showObj.image.medium);
          } else {
            img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV')
          }

          p.appendChild(text);
          img2.setAttribute('class', 'resultList-item_heart')


          img2.setAttribute('src', './assets/images/like.png')
        
          p.setAttribute('class', 'resultList-item_title');
          div.setAttribute('class', 'resultList-item_content')
        
        
          div.appendChild(p);
          div.appendChild(img2);

          li.setAttribute('class', 'resultList-item');
          li.setAttribute('id', item.show.id)

          li.appendChild(img);
          li.appendChild(div);

          resultList.appendChild(li);

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

//gGuardar la informacion (.setItem) para guardar. Bajo el nombre 'selectedInfo' guardaré en formato JSON y convertire en un string lo que me devuelva la función 'selectedContent'
function setLocalInfo(){
    localStorage.setItem('selectedItemInfo', JSON.stringify(selectedContent));
}

//(.getItem) para leer. ReadLocalStorage será el resultado de SelectedItems en formato Array.

function readLocalStorage(){
    let localInfo = JSON.parse(localStorage.getItem('selectedItemInfo'));
    if(localInfo !== null){
      return localInfo;
    } else {
      return localInfo = [];
    }
 }


 // función que se quede con el id del objeto
 //le paso el objeto que itera(id) - si es igual que lo que le paso por el parametro me devolvera para que me devuelva el objeto en el q está

function getSelectedObj(id){
    return searchList.find( serie => serie.show.id === Number.parseInt(id) ) 
}

// Recoger el id del item clicado. con (.push) meter el contenido.

function selectItems(evt){
    const selected = evt.currentTarget.id;
    const object  = getSelectedObj(selected);

    if(selectedContent.indexOf(selected)=== -1){
      selectedContent.push(object);

      console.log(selectedContent) 

      setLocalInfo();
      renderFavourites(selectedContent);
    }
    
    removeIt();
}


//Pintar favoritos en otra ul //favourite es un string - object es un objecto pero devuelve la id en numero

function renderFavourites(FArr){
  favList.innerHTML = '';
  for (let item of FArr){
  
  const li = document.createElement('li');
  const img = document.createElement('img');
  const text = document.createTextNode(item.show.name)
  const span = document.createElement('span');
  const div = document.createElement('div');
  const favbutton = document.createElement('button');
  const textButt = document.createTextNode('x');

  img.setAttribute('class', 'favList-item_img');
  img.setAttribute('alt', 'imagen de la serie');
  img.setAttribute('width', '180px');
  
  if(item.show.image !== null && item.show.image !== undefined && item.show.image !== ''){
    img.setAttribute('src', item.show.image.medium);
  } else {
    img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV')
  }

  span.appendChild(text);
  favbutton.setAttribute('class', 'fav-button')

  favbutton.appendChild(textButt)
 
  span.setAttribute('class', 'favList-item_title');
  div.setAttribute('class', 'favList-item_content')
 
  div.appendChild(span);
  div.appendChild(favbutton);

  li.setAttribute('class', 'favList-item');
  li.setAttribute('id', item.show.id)

  li.appendChild(img);
  li.appendChild(div);

  favList.appendChild(li);
  }
  addFavouriteListeners();
}


//añado los listeners los botones de borrar
function addFavouriteListeners(){
  const liListElem = document.querySelectorAll('.fav-button');
  for(let li of liListElem) {
    li.addEventListener('click', removeIt);
  }
}

// el evt.current target no coge el id, cohe el padre del botón que es el container. el padre del container es el objeto en el que se puede llegar al Id. En el local storage guardo el objeto entero - Hay que cambiar esto.

function removeIt(evt){
  const elemId = evt.currentTarget.parentElement.id;
  const elemIndex = selectedContent.indexOf(elemId);
  selectedContent.splice(elemIndex,1);
  setLocalInfo();
  renderFavourites(selectedContent)
}

// 1. Al pulsar el boton se ejecuta la función que guarda lo que hay dentro del input en una variable
submitButton.addEventListener('click', searchAction)
submitButton.addEventListener('click', preventDefault)

renderFavourites(selectedContent);
