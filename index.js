const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;

// mongoose.connect('mongodb://localhost:27017/meinFlix', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');
  app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());


// Get welcome message
app.get('/', (req, res) => {
	res.send('Welcome to mein-api!');
  });

  // Get all movies
app.get('/movies', (req, res) => {
	Movies.find()
			.then((movies) => {
				res.status(201).json(movies);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
  });

// Get a Movie by Moviename
app.get('/movies/:Title', (req, res) => {
	Movies.findOne({ Title: req.params.Title })
	  .then((movie) => {	res.json(movie);  })
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
  const port = process.env.PORT || 8080;
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ 
    target: port, 
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});