# mubo-api

Node.js backend with endpoints for movie app.
Uses Mongo Atlas and Heroku.

To start:
From the commandline navigate to mubo-api and input `node index.js`

Design choices:

I chose to use MongoDB because it works well with node.js and I'm fairly familiar with implementation. Mongoose is the standard business layer for communicating CRUD functionality between the API and the database itself. (In this case only GET request were required. They are all in index.js. See models.js for the mongoose code.)

I just imported a couple of movies into the database using this tutorial:
https://osp123.github.io/tutorials/html/omdb.html