import express from 'express';
import { movieModel } from '../models/movie';

const searchMoviesRouter = express.Router()

searchMoviesRouter.get('/search', async(req, res) => {
    try {
        const { query } = req.query;
    
        if (!query) {
          return res.status(400).json({ error: 'Search query is required' });
        }
    
        // Perform a case-insensitive search on the title or genre fields
        const movies = await movieModel.find({
          $or: [
            { title: { $regex: new RegExp(query as string, 'i') } },
            { genre: { $regex: new RegExp(query as string, 'i') } },
          ],
        });
    
        return res.status(200).json(movies);
      } catch (error) {
        console.error('Error searching for movies:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

export default searchMoviesRouter;