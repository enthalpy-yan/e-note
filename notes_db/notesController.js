require('./notesModel.js');
var mongoose = require('mongoose'),
	Note = mongoose.model('Note');

exports.findAllNotes = function(cb){
	Note.find({}, null, null, cb);
}

exports.findNotesById = function(id,cb){
	Note.findById(id,null,null,cb);
}

exports.addNote = function(body){
	var note;
	note = new Note({
		sentence: body.sentence,
		translation: body.translation,
		// TODO list
	});
	note.save(function(err){
		if(!err)
			console.log("created");
		else
			console.log(err);
	})
	return note;
}

