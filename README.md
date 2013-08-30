#e-note


This is a simple cloud english note project that will help international student to write down words or sentences 
from our daily life.

The idea is come from these two articles:

http://news.sina.com.cn/w/gc/2013-08-20/1204214.shtml

http://news.sina.com.cn/w/gc/2013-08-06/1540199.shtml

##Infos

### Directory Layout
    
    app.js                  --> app config
    bower.json              --> for bower
    package.json            --> for npm
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
