require('./notesModel.js');
var mongoose = require('mongoose')
	, Note = mongoose.model('Note');

/*
 * Use callback closure to dealing with data retrieved from database.
 * Instead of returning data directly, we just use another callback 'cb' inside the anonymous
 * callback function which inside in function 'find()'.
 */

exports.findAllNotes = function(req, res, cb) {
	Note.find({}, function(err, notes) {
		cb(req, res, notes);
	}); 
}
/*
 * By Lei Zhang, do not need req, res.
 * also could be handle err.
 */
exports.findAll = function(cb){
	Note.find({},null,null,cb);
}

