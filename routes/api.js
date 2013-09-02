/*
 * Serve JSON to our AngularJS client
 */
var dbHandler = require('../notes_db/notesController.js');

//This callback function is used to return JSON data to client.
var returnDataCallback = function(req, res, data) {
	res.json(data);
}

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.findNotesById = function(req, res) {
	dbHandler.findAllNotes(req, res, returnDataCallback);
};

exports.findAllNotes = function(req, res) {

};

exports.addNote = function(req, res) {

};
 
exports.updateNote = function(req, res) {

};
 
exports.deleteNote = function(req, res) {

};