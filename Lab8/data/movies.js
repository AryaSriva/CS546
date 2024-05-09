//import axios
import axios from 'axios';


export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if (!title || typeof title != 'string' || title.trim() === "") {
    throw `${title} is not a valid non-empty string`;
  }
  title = title.trim();
  let movies = (await axios.get('http://www.omdbapi.com/?apikey=CS546&s=' + title)).data;
  let page2 = (await axios.get('http://www.omdbapi.com/?apikey=CS546&s=' + title + '&page=2')).data.Search;
  if (page2 && page2 != []) {
    page2.forEach(element => {
      movies.Search.push(element);
    });
  }
  if (!movies.Search || movies.Search == []) {
    throw `could not find movies with title ${title}`;
  } 
  return movies;
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  if (!id || typeof id != 'string' || id.trim() === "") {
    throw `${id} is not a valid non-empty string`;
  }
  id = id.trim();
  if (id.length < 9) {
    throw `${id} must be at least 9 characters`;
  }
  if (id.substring(0,2) !== "tt") {
    throw `${id} must start with tt`;
  }
  for (let i = 2; i < id.length; i++) {
    if (isNaN(id[i])) {
      throw `${id} must contain 7 numeric characters`;
    }
  }
  let movie = (await axios.get('http://www.omdbapi.com/?apikey=CS546&i=' + id)).data;
  if (!movie || movie.Error) {
    throw `could not find movie with given id`;
  }
  return movie;
};
