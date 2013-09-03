'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $http, socket) {
    $scope.limit = 4;
    $scope.notes = [];

    socket.on('note: added', function (data) {
      $http.get('/api/notes').success(function(data) {
        $scope.notes = data;
      });
    });

    socket.on('note: updated', function (data) {
      $http.get('/api/notes').success(function(data) {
        console.log(data);
      });
    });

    $scope.loadMore = function(limit) {
      $http.get('/api/notes?limit=' + limit).success(function(data) {
        $scope.notes = data;
        $scope.limit += 4;
      });
    };
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
