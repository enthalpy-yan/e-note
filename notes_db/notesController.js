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

exports.updateNote = function(id, body){
	Note.findById(id, null, null, function(err, note){
		note.sentence = body.sentence;
		note.translation = body.translation;
		// TODO list

		note.save(function(err){
			if(!err)
				console.log("updated");
			else
				console.log(err);
		})
		return note;
	})
}

