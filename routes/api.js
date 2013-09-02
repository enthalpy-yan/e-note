/*
 * Serve JSON to our AngularJS client
 */
var dbHandler = require('../notes_db/notesController.js');

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};

exports.findNotesById = function(req, res) {
	dbHandler.findNotesById(req.params.id,function(err,data){
		res.json(data);
	})
};

exports.findAllNotes = function(req, res) {
	dbHandler.findAllNotes(function(err, data){
		res.json(data);
	});
}

exports.addNote = function(req, res) {
	// test for req.body
	var body = {
		sentence: 'test addnote',
		translation: 'asdfadsfsaf',
	}
	res.json(dbHandler.addNote(body));
};
 
exports.updateNote = function(req, res) {
	// test for req.body
	var body = {
		sentence: 'test for update',
		translation: 'asdfsadfasf'
	}
	res.json(dbHandler.updateNote(req.params.id, body));
};
 
exports.deleteNote = function(req, res) {

};
