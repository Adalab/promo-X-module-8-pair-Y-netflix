const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const db = new Database('./src/db/database.db', {
  verbose: console.log,
});

//Programar las APIS

server.get('/movies', (req, res) => {
  //fake data -- bases de datos
  //1-declarar mi query
  const query = db.prepare('SELECT * FROM movies');
  //2-ejecutar la query  (all- get)
  const moviesBD = query.all();
  console.log(moviesBD);

  //console.log(req.header("userid"));
  res.json({ success: true, movies: moviesBD });
});

server.get('/movies/:moviesId', (req, res) => {
  console.log(req.params.moviesId);
  const requestMoviesId = req.params.moviesId;
  const foundMovie = movies.find((movie) => movie.id === requestMoviesId);
  console.log(foundMovie);
});

const staticServerPathWeb = './public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerPathPhotos = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathPhotos));

//API endpoints
server.post('/signUp', (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
});
