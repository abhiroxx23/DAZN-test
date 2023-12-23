import express from 'express';
import { movieModel } from '../models/movie';

const updateMovieRouter = express.Router()

updateMovieRouter.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { role, updatedFields } = req.body;

        // check role of user
        if(role !== 'admin') {
            return res.status(400).json({ error: 'Only admins can update movies' });
        }
    
        // Validate that at least one field is provided for updating
        if (Object.keys(updatedFields).length === 0) {
          return res.status(400).json({ error: 'At least one field is required for updating' });
        }
    
        const updatedMovie = await movieModel.findByIdAndUpdate(
          id,
          { $set: updatedFields },
          { new: true }
        );
    
        if (!updatedMovie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
    
        return res.status(200).json(updatedMovie);
      } catch (error) {
        console.error('Error updating movie:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

export default updateMovieRouter;