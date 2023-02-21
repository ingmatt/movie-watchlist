
let titleHtml = ``

let moviesArray = []
let watchlistArray = []

let movieInput = document.getElementById('movie');
let movieContainer = document.getElementById('movie-container')
const addToWatchlist = document.querySelector('.add-to-watchlist')
let watchlistContainer = document.getElementById('watchlist-container')

document.querySelector('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    movieContainer.innerHTML = ``
    getMovies(movieInput.value)
    movieInput.value = ''

});


function getMovies(search){
    fetch(`https://www.omdbapi.com/?apikey=e104f85c&type=movie&s=${search}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search){
                for (element of data.Search){
                    moviesArray.push(element.Title)
                }
                console.log(moviesArray)
                getMovieInfo()
            } else {
                movieContainer.innerHTML = `<h2>No films found</h2>`
            }

    
        })

}

function getMovieInfo(){

    moviesArray.map(element => {
        fetch(`https://www.omdbapi.com/?apikey=e104f85c&type=movie&t=${element}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            titleHtml += `
            <div class="movie-info">
            <img class="movie-poster" src="${data.Poster}" alt="movie-poster">
            <div class="movie-description">
            <p class="movie-title">${data.Title}</p>
            <div class="watchlist">
            <p>${data.Runtime}</p>
            <p class="movie-genre">${data.Genre}</p>
            <p id="add-to-watchlist" onclick="addToList(this)" data-add="${data.Title}" title="Add from watchlist">+ Watchlist</p>
            </div>
            <p class="movie-plot">${data.Plot}</p>
            </div>
            </div>`
            movieContainer.innerHTML = titleHtml
        })
    })
}

function addToList(movie) {
    const getWatchlistString = localStorage.getItem('watchlistArray');
    let watchlistArray = JSON.parse(getWatchlistString);
    watchlistArray = watchlistArray || []
    let film = movie.getAttribute("data-add");
    watchlistArray.push(film)
    console.log(watchlistArray)
    const watchlistString = JSON.stringify(watchlistArray);
    console.log(watchlistString)
    localStorage.setItem('watchlistArray', watchlistString);

  }

function watchlistLoad(){
    const getWatchlistString = localStorage.getItem('watchlistArray');
    const watchlistArray = JSON.parse(getWatchlistString);

    watchlistArray.map(element => {
        fetch(`https://www.omdbapi.com/?apikey=e104f85c&type=movie&t=${element}`)
            .then(response => response.json())
            .then(data => {
                titleHtml += `
                <div class="movie-info">
                <img class="movie-poster" src="${data.Poster}" alt="movie-poster">
                <div class="movie-description">
                <p class="movie-title">${data.Title}</p>
                <div class="watchlist">
                <p>${data.Runtime}</p>
                <p class="movie-genre">${data.Genre}</p>
                <p id="add-to-watchlist" onclick="deleteMovie(this)" data-delete="${data.Title}" title="Delete from watchlist">DELETE</p>
                </div>
                <p class="movie-plot">${data.Plot}</p>
                </div>
                </div>`
                watchlistContainer.innerHTML = titleHtml
            })
      })

}

function deleteMovie(movie){
    let getWatchlistString = localStorage.getItem('watchlistArray');
    let watchlistArray = JSON.parse(getWatchlistString);
    watchlistArray = watchlistArray || []
    let film = movie.getAttribute("data-delete");
    let index = watchlistArray.indexOf(film);
    watchlistArray.splice(index,1)
    localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray));
    console.log(watchlistArray)
    location.reload(true);
}
