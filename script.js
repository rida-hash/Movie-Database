//TMDB API used
const API_KEY = ; //Our API key goes here
const BASE_URL ="https://api.themoviedb.org/4";//Access link for the API
const API_URL = BASE_URL+ "/discover/movie?sort_by=popularity.desc&"+API_KEY; //Sort by popularity in descending manner -added base url in the end
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" +API_KEY;

const main = document.getElementById('main'); //to bring the movies into display
const form = document.getElementById('form'); //to function the search bar
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){ //fetch the url and show the movies from the JSON response link

    fetch(url).then(res => res.json()).then(data => {
       // console.log(data);
       console.log(data.results);
        showMovies(data.results); //Just pass the result array looped through as output
    });
}

function showMovies(data){
    main.innerHTML = ''; //So everytime the function is called there is a blank state to work with
        data.forEach(movie => {
            const{title, poster_path, vote_average,overview} = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>
        ` //used backtick in javascript.

        main.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote >= 8){
        return "green"
    } else if(vote >= 5){
        return "orange"
    } else{
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL +'&query=' +searchTerm);
    }
})