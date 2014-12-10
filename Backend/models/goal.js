var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Goal = new Schema({
name: String,
complete: { type: Boolean, default: false },
})

Goal.methods.check = function() {
	this.complete = true;
}

module.exports = mongoose.model('Goal', Goal);

/* 
Method:
- Check off a goal () -> ()
*/