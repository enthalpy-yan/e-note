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
	dbHandler.findNotesById(req.params.id, function(err, data){
		res.json(data);
	});
};

exports.findAllNotes = function(req, res) {
	dbHandler.findAllNotes(function(err, data){
		res.json(data);
	});
}

exports.addNote = function(req, res) {
	dbHandler.addNote(req.body, function(err) {
		if(!err) {
			var socketIO = global.socketIO; 
			socketIO.sockets.emit('note: added', {});
			res.json(true);
		} else {
			res.json(false);
		}
	});
};
 
exports.updateNote = function(req, res) {
	dbHandler.updateNote(req, function(err, numberAffected, raw) {
		if(!err) {
			var socketIO = global.socketIO; 
			socketIO.sockets.emit('note: updated', {});
			res.json(true);
		} else {
			res.json(false);
		}

	});
};
 
exports.deleteNote = function(req, res) {

};
