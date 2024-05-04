
const myAPIKey = "api_key=ee495acb421144e308d03d7f8abb403a";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+myAPIKey;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+myAPIKey;

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
  ]


const main = document.getElementById('main');
const search = document.getElementById('search')
const form = document.getElementById('form')
const tagsEl =document.getElementById('tags')

var selectedGenre =[]
//function of genre
setGenre();
// Inside setGenre() function
function setGenre() {
  const tagsEl = document.getElementById('tags');
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
      const t = document.createElement('div');
      t.classList.add('tag');
      t.id = genre.id;
      t.innerText = genre.name;
      t.addEventListener('click', () => {
          getMoviesByGenre(genre.id); // Pass the genre id when clicked
      });
      tagsEl.appendChild(t);
  });
}

async function getMoviesByGenre(genreId) {
  const genreAPIUrl = `${BASE_URL}/discover/movie?${myAPIKey}&with_genres=${genreId}`;
  try {
      const data = await fetch(genreAPIUrl);
      if (!data.ok) {
          throw new Error('Failed to fetch movies by genre');
      }
      const res = await data.json();
      showMovies(res);
  } catch (error) {
      console.error("Error fetching movies by genre:", error);
      main.innerHTML = `<div class="movie-not-found">Error fetching movies by genre. Please try again later.</div>`;
  }
}






//function to get movies 
getMovies(API_URL);
async function getMovies(url) {
    try {
        const data = await fetch(url);
        if (!data.ok) {
            throw new Error('Failed to fetch movies');
        }
        const res = await data.json();
        console.log("API Response:", res);
        showMovies(res);
    } catch (error) {
        console.error("Error fetching movies:", error);
        main.innerHTML = `<div class="movie-not-found">Error fetching movies. Please try again later.</div>`;
    }
}



//function to display movie
function showMovies(data)
{
    

    console.log(data);
    main.innerHTML = '';

    if (data.results.length === 0) {
        main.innerHTML = '<div class="movie-not-found">Sorry, movie not found</div>';
        return;
    }

    data.results.forEach(movie => {
        const{title,poster_path,vote_average,overview} =  movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}"><span class="fa fa-star checked"></span>${vote_average.toFixed(2)}</span>
            </div>
            <div class="overview">
            <h3>overview</h3>
            ${overview}
            </div>    
        `

        main.appendChild(movieEl);
    })
}


//function for getcolor

function getColor(vote) {
    if(vote>=8)
    {
        return 'green'

    }
    else if(vote >= 5)
    {
        return "orange"
    }
    else{
        return 'red'
    }
}



//function for eventlistener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (searchTerm) {
        getMovies(`${searchURL}&query=${searchTerm}`);
    } else {
        getMovies(API_URL);
    }
})



