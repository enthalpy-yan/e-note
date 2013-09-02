
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
var io = require('socket.io').listen(server);
mongoose.connect('mongodb://localhost/test123123');

// Bootstrap models
var models_path = __dirname + '/notes_db'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file)
})

var Note = mongoose.model('Note');

var insertNewNote = function () {
    Note.remove(function (err) {});

    var note = new Note(
    {
        sentence: 'afasfasdf',
        translation: 'alsdfjljasfasdf'
    });

    note.save();
}();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
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
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
// app.get('/api/notes', api.findAllNotes);
app.get('/api/notes', api.findAllNotes);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
