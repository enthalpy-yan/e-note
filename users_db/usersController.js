/**
 * Module dependencies.
 */
require('./usersModel.js')
var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.signup = function (req, res) {
	//using test.jade in testing signup form
  	res.render('testSignup', {	
    	title: 'Sign up',
    	user: new User()
  	})
}

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('testSignup', {
        errors: "create user error",
        user: user,
        title: 'Sign up'
      })
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}

exports.login = function (req, res) {
  res.render('testLogin', {
    title: 'Login',
    // message: req.flash('error')
  })
}