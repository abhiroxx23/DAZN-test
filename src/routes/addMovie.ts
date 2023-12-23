import express from 'express';
import { movieModel } from '../models/movie';

const addMovieRouter = express.Router()

addMovieRouter.post('/', async(req, res) => {
    try {
        const { role, movie } = req.body;
        
        // check role of user
        if(role !== 'admin') {
            return res.status(400).json({ error: 'Only admins can add movies' });
        }

        const { title, genre, rating, streamingLink } = movie;
        if (!title) {
          return res.status(400).json({ error: 'Title is required' });
        }
  
        const newMovie = new movieModel({ title, genre, rating, streamingLink });
        await newMovie.save();
  
        return res.status(201).json(newMovie);
      } catch (error) {
        console.error('Error adding movie:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

export default addMovieRouter;