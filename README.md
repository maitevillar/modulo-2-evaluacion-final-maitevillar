# Tv-show browser

_This project is a web application to search for TV series, which allows us to mark the series as favorites and save them in local storage. The exercise also has a layout part with HTML and Sass._ 

## Web images

![web images](/_src/assets/images/tv-show-movbile.jpg)
![web images](/_src/assets/images/te-show-desktop.jpg)

## How to start ☺

Install [Node.js](https://nodejs.org/) and [Gulp](https://gulpjs.com) to work with the project, after:

1. Download or clone the repository.
2. Install the local dependencies `npm install` (Only once)
3. Run with `gulp`


## Branches 

- To change the branch: `git checkout`
- To see the list of avaiable branches: `git branch`
- to run the branch: `git checkout nombre_rama`

## JavaScript

- This work is developed for the 'introduction to JavaScript' exam.
- The information of the materials of this module here ☞ 
https://books.adalab.es/materiales-front-end-i/modulo-2.-programando-la-web


## Project structure

1. Structure

- Structured and responsive design.

2. Search (Interaction)

- When clicking on the Search button, the application connects to the open TVMaze API for series search. 
- To build the search URL it gets the text that the user has entered in the search field. 
- For each show contained in the search result a card is painted. 
- The information is painted in the page manipulating the DOM from JavaScript. 

3. Favourites section

- Once the search results appear, the user can indicate which are the favourite series. 
- Favourite series still appears on the left even if the user performs another search.
- The favourite list is storaged in the local storage.
- When clicking the 'x' icon of the favourite item, the item is deleted. 


##  Libraries

- Font Awesome
- Google fonts
- Bootstrap
- Animate.css
- Bulma.css
- Susy

---
Code with ❤ by Maite Villar. 