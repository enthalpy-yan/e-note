
/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(express);

var app = module.exports = express();
var server = require('http').createServer(app);
require('./routes/socket')(app, server);
require('./config/passport')(passport);
var uriString = 
    process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/test123123';

mongoose.connect(uriString);

//Test case for inserting/removing data to/from mongodb. 
// var models_path = __dirname + '/notes_db'
// fs.readdirSync(models_path).forEach(function (file) {
//     require(models_path+'/'+file)
// })

// var Note = mongoose.model('Note');

// var addDummyNotes = function () {
//     Note.remove(function (err) {});
// }();

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.redirect('login');
  else
  	next();
};

/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// cookieParser should be above session
app.use(express.cookieParser());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ 
  secret: 'securedsession',
  cookie: {maxAge: 3600000},
  store: new MongoStore({
      url: 'mongodb://localhost/test123123',
      collection: 'sessions',
    }) 
}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(app.router);

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// connect flash for flash messages - should be declared after sessions
app.use(flash());

// routes should be at the last
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    //TODO
};

 

/**
 * Routes
 */

// serve index and view partials
app.get('/', auth, function(req, res){
  res.render('index', { user: req.user, title: 'Welcome' });
});
// app.get('/index.html', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/notes/count', auth, api.countNotes);
app.get('/api/notes', auth, api.findAllNotes);
app.get('/api/notes/:id', auth, api.findNotesById);
app.post('/api/notes', api.addNote);
app.put('/api/notes/:id', api.updateNote);
app.del('/api/notes/:id', api.deleteNote);

// user routes
var users = require('./users_db/usersController')
app.get('/signup', users.signup);
app.post('/users', users.create);
app.get('/login', users.login);
// app.post('/login',passport.authenticate('local', {
// 	successRedirect: '/index.html',
//     failureRedirect: '/login',
//     failureFlash: 'Invalid email or password.'
//     })
// );
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        return res.redirect('/login')
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  });

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
