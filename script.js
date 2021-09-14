//TMDB API used
const API_KEY = ; //Our API key goes here
const BASE_URL ="https://api.themoviedb.org/3";//Access link for the API
const API_URL = BASE_URL+ "/discover/movie?sort_by=popularity.desc&"+API_KEY; //Sort by popularity in descending manner -added base url in the end
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" +API_KEY;

const genres = [
    {
    "id": 28,
    "name": "Action"
    },
    {
    "id": 12,
    "name": "Adventure"
    },
    {
    "id": 16,
    "name": "Animation"
    },
    {
    "id": 35,
    "name": "Comedy"
    },
    {
    "id": 80,
    "name": "Crime"
    },
    {
    "id": 99,
    "name": "Documentary"
    },
    {
    "id": 18,
    "name": "Drama"
    },
    {
    "id": 10751,
    "name": "Family"
    },
    {
    "id": 14,
    "name": "Fantasy"
    },
    {
    "id": 36,
    "name": "History"
    },
    {
    "id": 27,
    "name": "Horror"
    },
    {
    "id": 10402,
    "name": "Music"
    },
    {
    "id": 9648,
    "name": "Mystery"
    },
    {
    "id": 10749,
    "name": "Romance"
    },
    {
    "id": 878,
    "name": "Science Fiction"
    },
    {
    "id": 10770,
    "name": "TV Movie"
    },
    {
    "id": 53,
    "name": "Thriller"
    },
    {
    "id": 10752,
    "name": "War"
    },
    {
    "id": 37,
    "name": "Western"
    }
    ] //genre object collection from the API Documentation.

const main = document.getElementById('main'); //to bring the movies into display
const form = document.getElementById('form'); //to function the search bar
const search = document.getElementById('search');

const tagsEl = document.getElementById('tags');
var selectedGenre = [];
setGenre();
function setGenre(){
    tagsEl.innerHTML = ' ';
    genres.forEach(genre =>{
        const t = document.createElement('div');
        t.classList.add('tags');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            } else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres='+ encodeURI((selectedGenre.join(','))));
            highlightSelection();
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tags.classList.remove('highlight');
    })
    clearBtn();
    if(selectedGenre.length != 0){
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        });
    }
    
}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('hightlight');
    }else{
    let clear = document.createElement('div');
    clear.classList.add('tags','hightlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
        selectedGenre = [];
        setGenre();
        getMovies(API_URL);
    })
    tagsEl.append(clear);
    }
}

getMovies(API_URL);

function getMovies(url){ //fetch the url and show the movies from the JSON response link

    fetch(url).then(res => res.json()).then(data => {
       // console.log(data);
       console.log(data.results);
       if(data.results.length != 0){
        showMovies(data.results); //Just pass the result array looped through as output
       } else{
           main.innerHTML = `<h1 class="noresult" >No Results Found</h1>`
       }
        
    });
}

function showMovies(data){
    main.innerHTML = ''; //So everytime the function is called there is a blank state to work with
        data.forEach(movie => {
            const{title, poster_path, vote_average,overview} = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
         <img src="${ poster_path? IMG_URL+poster_path : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png"}" alt="${title}">

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
    selectedGenre= [];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL +'&query=' +searchTerm);
    }
})
