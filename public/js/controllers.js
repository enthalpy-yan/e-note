'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('noteController', function ($scope, $timeout, $http, socket, $location, Note) {
    var PAGELIMIT = 12;

    $scope.note = new Note();
    $scope.newNoteCount = 0;
    $scope.newNoteFlag = false;

    $scope.loadNotes = function(limit) {
      $scope.note.getNotes(limit);
    }

    $scope.nextPage = function() {
      PAGELIMIT += 12;
      $scope.loadNotes(PAGELIMIT);
    }

    $scope.loadNewNote = function() {
      $scope.loadNotes(PAGELIMIT);
      $scope.newNoteFlag = false;
      $scope.newNoteCount = 0;
    }

    //Socket IO event handler
    socket.on('note: added', function (data) {
      $scope.newNoteCount += 1;
      $scope.newNoteFlag = true;
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
