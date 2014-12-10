var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId;

var MatchingParams = new Schema({
username: String,
focus: {type: String, enum: ["Strength", "Cardio", "Both"]},
lat: Number,
lng: Number,
frequency: {type: String, enum: ["1-2 Days","3-4 Days","5-7 Days"]}
});

module.exports = mongoose.model('MatchingParams', MatchingParams);

/* 
Methods
- Initialization (values) -> ()




*/
