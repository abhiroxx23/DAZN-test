import express from 'express';
import { movieModel } from '../models/movie';
import { cache } from '..';

const getMoviesRouter = express.Router()

getMoviesRouter.get('/', async (req, res) => {
    try {
        // Try to get the movies from the cache
        const cachedMovies = cache.get('movies');

        if (cachedMovies) {
            console.log('Movies retrieved from cache');
            return res.status(200).json(cachedMovies);
        }
        const movies = await movieModel.find();

        // save the movies in cache for future
        // Note - if the movie is deleted before TTL expires, it will still be returned in the response of the get all movies API
        cache.set('movies', movies);
        return res.status(200).json(movies);
    } catch (error) {
        console.error('Error getting movies:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default getMoviesRouter;