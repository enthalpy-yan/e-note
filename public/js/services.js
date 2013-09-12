'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
	factory('Note', function($http) {
	  var Note = function() {
	    this.notes = [];
	    this.busy = false;
	  };

	  /*
		 * Load note data
		 * @param limit: how many notes you want to load each time.
		 *
	   */
	  Note.prototype.getNotes = function(limit) {
	    if (this.busy) return;
	    this.busy = true;
	    $http.get('/api/notes?limit=' + limit).success(function(data) {
        this.notes = data;
        this.busy = false;
      }.bind(this));
	  };

	  return Note;

	});
