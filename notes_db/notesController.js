require('./notesModel.js');
var mongoose = require('mongoose'),
	Note = mongoose.model('Note');

exports.findAllNotes = function(cb){
	Note.find({}, null, null, cb);
}

exports.findNotesById = function(id,cb){
	Note.findById(id,null,null,cb);
}

