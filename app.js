
/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

var app = module.exports = express();
var server = require('http').createServer(app);
require('./routes/socket')(app, server);
mongoose.connect('mongodb://localhost/test123123');

// Test case for inserting/removing data to/from mongodb. 
// var models_path = __dirname + '/notes_db'
// fs.readdirSync(models_path).forEach(function (file) {
//     require(models_path+'/'+file)
// })

// var Note = mongoose.model('Note');

// var addDummyNotes = function () {
//     Note.remove(function (err) {});
// }();

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
app.use(express.static(path.join(__dirname, 'public')));
//app.use(app.router);

// use passport session
app.use(passport.initialize());
app.use(passport.session());

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

// passport config
var passport = require('passport');
require('./config/passport')(passport);

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/notes/count', api.countNotes);
app.get('/api/notes', api.findAllNotes);
app.get('/api/notes/:id', api.findNotesById);
app.post('/api/notes', api.addNote);
app.put('/api/notes/:id', api.updateNote);
app.del('/api/notes/:id', api.deleteNote);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
