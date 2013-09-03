'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $http, socket) {
    //global variable
    var PAGELIMIT = 4;

    $scope.limit = PAGELIMIT;
    $scope.notes = [];
    $scope.endOfLine = false;
    $scope.notesLength = 5;

    $scope.getNotesLength = function() {
      $http.get('/api/notes/count').success(function(data) {
        $scope.notesLength = data;
      });
    }

    socket.on('note: added', function (data) {
      $scope.getNotesLength();
      $scope.loadMore($scope.limit - PAGELIMIT + 1);
    });

    socket.on('note: updated', function (data) {
      $http.get('/api/notes').success(function(data) {
      });
    });

    $scope.loadMore = function(limit) {
      if (($scope.notes.length) >= $scope.notesLength) {
          $scope.endOfLine = true;
          return;
      }

      $http.get('/api/notes?limit=' + limit).success(function(data) {
        $scope.notes = data;
        console.log($scope.notes);
        $scope.limit += PAGELIMIT;
      });
    };

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
