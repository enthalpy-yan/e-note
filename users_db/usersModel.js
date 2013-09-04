/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
 	, Schema = mongoose.Schema
 	, crypto = require('crypto')

/**
 * User Schema
 */

var UserSchema = new Schema({
	nickname: { type: String, default: '' },
	email: { type: String, default: '' },
	username: { type: String, default: '' },
	self_description: { type: String, default: '' },
	hashed_password: { type: String, default: '' },
	salt: { type: String, default: '' },
	authToken: { type: String, default: '' },
})

/*
 * Virtuals
 */

UserSchema
	.virtual('password')
    .set(function(password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

/*
 * Methods
 */

UserSchema.methods = {

 /**
   * Authenticate - check if the password are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  }
};

mongoose.model('User', UserSchema)