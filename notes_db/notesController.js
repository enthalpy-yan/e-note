require('./notesModel.js');
var mongoose = require('mongoose'),
	Note = mongoose.model('Note');

exports.findAllNotes = function(cb){
	Note.find({}, null, null, cb);
}

exports.findNotesById = function(id, cb){
	Note.findById(id, null, null, cb);
}

exports.addNote = function(body, cb){
	var note = new Note(body);
	note.save(cb);
}

exports.updateNote = function(req, cb){
	var note = new Note(req.body); 
	Note.update({_id: req.params.id}, req.body, cb);
}

exports.deleteNote = function(req, cb){
	Note.remove({_id: req.params.id}, cb);
}

