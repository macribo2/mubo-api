const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
	Poster:{type:String, required:true},
	Title:{type: String, required:true},
	Director:{type:String, required:true},
	Plot:{type:String, required:true}
})

let Movie = mongoose.model('Movie', movieSchema);
module.exports.Movie = Movie;