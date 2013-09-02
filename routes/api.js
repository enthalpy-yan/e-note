/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

export.findNotesById = function(req, res) {

};

exports.findAllNotes = function(req, res) {

};

exports.addNote = function(req, res) {

};
 
exports.updateNote = function(req, res) {

};
 
exports.deleteNote = function(req, res) {

};