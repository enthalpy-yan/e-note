var mongoose = require('mongoose'),
	Note = mongoose.model('Note');

module.exports = function () {
	Note.remove(function (err) {});

	var note = new Note(
	{
		sentence: 'cvcv',
		translation: 'wqetrrwer'
	});

	note.save();
}();