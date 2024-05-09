//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below

import {Router} from 'express';
import * as movieData from '../data/movies.js';
const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  return res.render('home', {title: 'Movie Finder'});
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  try {
    const movieList = await movieData.searchMoviesByName(req.body.searchMoviesByName);
    return res.render('movieSearchResults', {movies:movieList, title:'Movies Found', query:req.body.searchMoviesByName});
  } catch (e) {
    // console.log(e);
    if (e == `could not find movies with title ${req.body.searchMoviesByName}`) {
      return res.status(404).render('error', {title: "Error", notFoundError: `We're sorry, but no results were found for ${req.body.searchMoviesByName}`});
    } else {
      return res.status(400).render('error', {title: "Error", badInputError: `The provided input is not a valid title; Input must be a non-empty string`});
    }
  }
});

router.route('/movie/:id').get(async (req, res) => {
  //code here for GET a single movie
  try {
    const selectedMovie = await movieData.searchMovieById(req.params.id);
    return res.render('movieById', {title: selectedMovie.Title, movie:selectedMovie});
  } catch (e) {
    if (e == `could not find movie with given id`) {
      return res.status(404).render('error', {title: "Error", notFoundError: `We're sorry, but no moviews were found with id ${req.params.id}`});
    } else {
      return res.status(400).render('error', {title: "Error", badInputError: `The provided input is not a valid id; Input must be in format tt#######`});
    }
  }
});

//export router

export default router;