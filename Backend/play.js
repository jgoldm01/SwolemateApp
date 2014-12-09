// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// Test the connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	  console.log('It works!')});

// define a Schema
var kittySchema = mongoose.Schema({
    	name: String
})

// compile schema into a model Kitten, from the variable kittySchema
var Kitten = mongoose.model('Kitten', kittySchema)

// create new kitten 
