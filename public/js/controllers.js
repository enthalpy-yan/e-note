'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $timeout, $http, socket) {
    //global variable
    var PAGELIMIT = 4;

    $scope.limit = PAGELIMIT;
    $scope.notes = [];
    $scope.endOfLine = false;
    $scope.notesLength = 5;

    function initWookmark(){
      angular.element("#items li").wookmark({
          autoResize: true,
          container: angular.element("#items"),
          offset: 300,
          itemWidth: 300
      });
    }

    $scope.getNotesLength = function() {
      $http.get('/api/notes/count').success(function(data) {
        $scope.notesLength = data;
      });
      $timeout(initWookmark, 0);
    }

    socket.on('note: added', function (data) {
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
        $scope.limit += PAGELIMIT;
      });
    };

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
