'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $http, socket) {
    socket.on('note: added', function (data) {
      $http.get('/api/notes').success(function(data) {
        console.log(data);
      });
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
