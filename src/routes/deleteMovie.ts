import express from 'express';
import { movieModel } from '../models/movie';

const deleteMovieRouter = express.Router()

deleteMovieRouter.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // check role of user
    if(role !== 'admin') {
      return res.status(400).json({ error: 'Only admins can delete movies' });
  }

    const deletedMovie = await movieModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).send("Movie successfully deleted.");
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default deleteMovieRouter;