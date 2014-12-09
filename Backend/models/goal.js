var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Goal = new Schema({
name: String,
body: String,
complete: Boolean,

})

module.exports = mongoose.model('Goal', Goal);

/* 
Method: 
- Add and save goals (new GoalName, new GoalBody) -> (bool success) 
- Query a goal (goal name) -> (goal id) 
- Check off a goal (goal) -> ()
*/