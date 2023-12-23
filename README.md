# Movie APIs

This is a simple Node.js and Express API with an in-memory MongoDB database using Mongoose for managing movies.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-api.git
   ```

2. Install dependencies:
    ```
    cd DAZN
    npm install
    ```

### Usage

    npm run build
    npm start

The server will be running at http://localhost:3000

## API usage



1. Add a new movie
```
POST http://localhost:3000/movies
Body:
{
    "role": "admin",
    "movie": {
        "title": "peter pan",
        "genre": "kids",
        "rating": 5.5,
        "streamingLink": "www.abc.com"
    }
}
```

2. Get all movies
```
GET http://localhost:3000/movies
Body: empty
```

3. Update a movie
```
PUT http://localhost:3000/movies/movie-id
Body:
{
    "role": "admin",
    "updatedFields": {
        "title": "new title"
    }
}
```

4. Delete a movie
```
DELETE http://localhost:3000/movies/movie-id
Body:
{
    "role": "admin"
}
```

5. Search for a movie
```
GET http://localhost:3000/search?query=your-search-term
Body: empty
```