#e-note


This is a simple english note project under developing.

##Infos

### RESTful APIs
    
    1. List all notes
        GET /api/notes
        
    2. Find notes by id
        GET /api/notes/:id
        
    3. Get notes count
        GET /api/notes/count
        
    4. Add new note
        POST /api/notes
        
    5. Update note by id
        PUT /api/notes/:id

### Directory Layout
    
    app.js                  --> app config
    bower.json              --> for bower
    package.json            --> for npm
    notes_db/               --> for mongo db models
        noteController.js   --> CRUD functions
        noteModels.js       --> for mongo db model
    public/                 --> all of the files to be used in on the client side
      css/                  --> css files
        app.css             --> default stylesheet
      img/                  --> image files
      js/                   --> javascript files
        app.js              --> declare top-level app module
        controllers.js      --> application controllers
        directives.js       --> custom angular directives
        filters.js          --> custom angular filters
        services.js         --> custom angular services
      bower_components/
        angular/            --> angular.js
        angular-socket-io/  --> socket.io adapter for angular
    routes/
      index.js              --> route for serving HTML pages and partials
    views/
      index.jade            --> main page for app
      layout.jade           --> doctype, title, head boilerplate
      partials/             --> angular view partials (partial jade templates)
        partial1.jade
        partial2.jade
        
### Running the app (Project is still under constructing.)

Runs like a typical express app:

```shell
node app.js
```

### Updating `angular.js`

Alternatively, you can update AngularJS with [Bower](http://bower.io):

```shell
bower update angular
