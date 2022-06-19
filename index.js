const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const cors = require('cors');

//Connect to database local or remote
// mongoose.connect('mongodb://localhost:27017/meinFlix', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express");
const app = express();

//prevent cors from blocking resources
app.use(cors({ credentials: true, origin: true }));

//logging with morgan
const morgan = require('morgan');

//parse url
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());


// default endpoint - useful for verifying app is online even if cannot yet connect to db. returns welcome message.
app.get('/', cors(), (req, res) => {
	res.send('Welcome to mein-api!');
  });

  // Get all movies
app.get('/movies', cors(), (req, res) => {
	Movies.find()
			.then((movies) => {
				res.status(201).json(movies);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
  });

// Get a Movie by Movie name
app.get('/movies/:Title', cors(), (req, res) => {
	Movies.findOne({ Title: req.params.Title })
	  .then((movie) => {	res.json(movie);  })
	  .catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });

  //let's see if something is broken:
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
  });
// listen for requests - can't assume listening on 8080 when connecting via heroku
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});