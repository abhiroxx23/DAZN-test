import express from 'express';
import { closeDatabase, connectToDatabase } from './config/db';
import getMoviesRouter from './routes/getMovies';
import mongoose from 'mongoose';
import addMovieRouter from './routes/addMovie';
import updateMovieRouter from './routes/updateMovie';
import deleteMovieRouter from './routes/deleteMovie';
import searchMoviesRouter from './routes/searchMovies';
import NodeCache from 'node-cache';

export const app = express();
const port = 3000;

// Create a cache instance with a default TTL (time-to-live) of 5 minutes
export const cache = new NodeCache({ stdTTL: 300 });

// start the in memory mongoDB
connectToDatabase().then(() => {
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    app.use(express.json())

    // initialise routers
    app.use('/movies', getMoviesRouter)
    app.use('/movies', addMovieRouter)
    app.use('/movies', updateMovieRouter)
    app.use('/movies', deleteMovieRouter)
    app.use('/', searchMoviesRouter)

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

process.on('SIGINT', async () => {
    await closeDatabase();
    console.log("closing db connection...")
    process.exit(0);
  });