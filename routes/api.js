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
};

exports.findAllNotes = function(req, res) {
	dbHandler.findAllNotes(function(err, data){
		res.json(data);
	});
}

exports.addNote = function(req, res) {

};
 
exports.updateNote = function(req, res) {

};
 
exports.deleteNote = function(req, res) {

};
