'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {

  }).
  controller('MyCtrl1', function ($scope, $timeout, $http, socket, $location) {
    //global variable
    var PAGELIMIT = 9;
    $scope.flatUiColors = {
      "c1" : "#1abc9c",
      "c2" : "#2ecc71",
      "c3" : "#2980b9",
      "c4" : "#8e44ad",
      "c5" : "#34495e",
      "c6" : "#d35400",
      "c7" : "#c0392b",
      "c8" : "#7f8c8d",
      "c9" : "#f39c12",
      "c0" : "#3498db"
    }

    $scope.limit = PAGELIMIT;
    $scope.notes = [];
    $scope.endOfLine = false;
    $scope.notesLength = 0;
    $scope.busy = false;
    $scope.bottomShadow = {    
      "box-shadow": "0 0px 0px 0px #000000",
      "-moz-box-shadow": "0 0px 0px 0px #000000",
      "-webkit-box-shadow": "0 0px 0px 0px #000000"
    }

    $(document).on("scroll",function(){
      if($(document).scrollTop()>10){
          $scope.bottomShadow = {    
            "-webkit-box-shadow": "0px 2px 4px #B8B8B8",
               "-moz-box-shadow": "0px 2px 4px #B8B8B8",
                    "box-shadow": "0px 2px 4px #B8B8B8"
          };
      } else{
          $scope.bottomShadow = {    
            "box-shadow": "0 0px 0px 0px #000000",
            "-moz-box-shadow": "0 0px 0px 0px #000000",
            "-webkit-box-shadow": "0 0px 0px 0px #000000"
          };
      }
    });

    $scope.getNotesLength = function() {
      $scope.busy = true;
      $http.get('/api/notes/count').success(function(data) {
        $scope.notesLength = data;
        $scope.busy = false;
      });
    }

    socket.on('note: added', function (data) {
      $scope.loadMore($scope.notes.length + 1);
    });

    socket.on('note: updated', function (data) {
      $scope.loadMore($scope.notes.length);
    });

    socket.on('note: removed', function (data) {
      $scope.loadMore($scope.notes.length - 1);
    });

    $scope.loadMore = function(limit) {
      $http.get('/api/notes?limit=' + limit).success(function(data) {
        $scope.notes = data;
        $scope.limit += PAGELIMIT;
      });
    };

    $scope.clickFunction = function() {
      $location.path("/view2");
    }

    $scope.fadeInClass = function() {
      return {
        "opacity" : "1"
      };
    }

    $scope.showIcon = function(index) {
      $scope.notes[index].show = true;
    }

    $scope.hideIcon = function(index) {
      $scope.notes[index].show = false;
    }

    $scope.deleteNote = function(index) {
      $http.delete('/api/notes/' + $scope.notes[index]['_id']).success(function(data) {

      })
    }

    $scope.barColor = function(index) {
      var colorNum = parseInt(index - 1)
      return {
        "background-color" : $scope.flatUiColors['c' + colorNum]
      };
    }

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
