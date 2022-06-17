const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;

mongoose.connect('mongodb://localhost:27017/meinFlix', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

// let meinMovies = [
// 	{"Title":"Lloyd in Space","Year":"2001–2004","Rated":"TV-Y7","Released":"03 Feb 2001","Runtime":"30 min","Genre":"Animation, Adventure, Comedy","Director":"N/A","Writer":"Paul Germain, Joe Ansolabehere","Actors":"Courtland Mead, Pamela Hayden, Bill Fagerbakke","Plot":"A Disney show centered around Lloyd, an alien, living in space and going through \"ordinary\" life with family and friends as a 12 year old.","Language":"English","Country":"United States, Canada","Awards":"1 nomination","Poster":"https://m.media-amazon.com/images/M/MV5BZTg0ZWQxNjctOGI3Ny00NmUxLWI1OGUtNzU1ZmFlMTlmMDA1XkEyXkFqcGdeQXVyODA4OTIyMzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.7/10"}],"Metascore":"N/A","imdbRating":"6.7","imdbVotes":"1,396","imdbID":"tt0275848","Type":"series","totalSeasons":"4","Response":"True"}

// ];

app.use(morgan('common'));

app.use(bodyParser.json());
app.use('/', express.static('public'));
app.use('/documentation', express.static('public'));
app.get('/', (req,res) =>{
	res.send('fáilte');
});

app.get('/meinMovies', (req,res) =>{
	res.json(meinMovies);
});

app.get('/movies', (req,res) =>{
Movies.find().then((movies) => {
  res.status(201).json(movies);
}).catch((err) => {
  console.error(err);
//   res.status(500).send('Error: ' + err);
});});
// Get a Movie by Moviename
app.get('/movies/:Title', (req, res) => {
	Movies.findOne({ Title: req.params.Title })
	  .then((user) => {	res.json(user);  })
	  .catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
//get 
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
  });
// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
  });