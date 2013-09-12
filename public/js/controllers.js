'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $timeout, $http, socket, $location, Note) {
    var PAGELIMIT = 18;

    $scope.note = new Note();

    $scope.loadNotes = function(limit) {
      $scope.note.getNotes(limit);
    }

    $scope.nextPage = function(limit) {
      $scope.loadNotes(limit);
      PAGELIMIT += 9;
    }

    //Socket IO event handler
    socket.on('note: added', function (data) {

    });

    socket.on('note: updated', function (data) {

    });

    socket.on('note: removed', function (data) {

    });

  }).
  controller('navbarController', function ($scope, $location) {
    $scope.paths = {
      '/index': false,
      '/about': false,
      '/contact': false,
      '/add':false
    }

    $scope.collapseFunc = function() {
      if ($('.navbar-toggle').is(":visible"))
        $('#slideMenu').collapse('toggle');
    }

    $scope.$watch(function(){
      return $location.path();
    }, function(newValue, oldValue) { 
      $scope.paths[newValue] = true;
       $scope.paths[oldValue] = false;
    });
  }).
  controller('addNoteController', function ($scope, $http, $location, $window) {
    $scope.note = {};

    $scope.addNote = function() {
      $http.post('/api/notes',{sentence: $scope.note.sentence, translation: $scope.note.translation}).
          success(function(data, status, headers, config) {
            $window.location.href = '/'
          }).
          error(function(data, status, headers, config) {
              
          });
     };         
  });
