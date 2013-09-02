/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
 	,Schema = mongoose.Schema

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',')
}

var categories = ''.split('');

var NoteSchema = new Schema({
	sentence: { type: String, default: '', trim: true },
 	translation: { type: String, default: '', trim: true},
 	// creator: {type:Schema.ObjectId, ref:'User'},
 	category: {type: String, enum: categories},
 	tags: { type: [], get: getTags, set: setTags},
 	like: { type: Number},
 	createdAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

NoteSchema.path('sentence').validate(function (sentence) {
  return sentence.length > 0
}, 'Sentence cannot be blank')

NoteSchema.path('translation').validate(function (translation) {
  return translation.length > 0
}, 'Translation cannot be blank')


mongoose.model('Note',NoteSchema)
