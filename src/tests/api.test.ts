// tests/api.test.ts
import request from 'supertest';
import { app } from '../index';

describe('Movie API Endpoints', () => {
  // Dummy movie data for testing
  const movieData = {
    role: "admin",
    movie: {
      title: "anaconda",
      genre: "horror",
      rating: 5.5,
      streamingLink: "www.abc.com"
    }
  };

  let movieId: any;

  it('should add a new movie', async () => {
    const response = await request(app).post('/movies').send(movieData);

    movieId = response.body._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(movieData.movie.title);
  });

  it('should get all movies', async () => {
    const response = await request(app).get('/movies');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a movie', async () => {
    const updatedData = {
      role: "admin",
      updatedFields: {
        title: "new title"
      }
    };
    const response = await request(app).put(`/movies/${movieId}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedData.updatedFields.title);
  });

  it('should search for movies', async () => {
    const searchQuery = 'horror';
    const response = await request(app).get(`/movies/search?query=${searchQuery}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.every((movie: any) => movie.genre.includes(searchQuery))).toBe(true);
  });

  it('should delete a movie', async () => {
    const response = await request(app).delete(`/movies/${movieId}`);

    expect(response.statusCode).toBe(200);

    // Verify that the movie is no longer present in the database
    const getResponse = await request(app).get('/movies');
    const deletedMovie = getResponse.body.find((movie: any) => movie._id === movieId);

    expect(deletedMovie).toBeUndefined();
  });
});
