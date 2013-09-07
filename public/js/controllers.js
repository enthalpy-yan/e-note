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

    $scope.testNotes = [
      {"sentence":"1"},
      {"sentence":"2"},      
      {"sentence":"3"}
    ]

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
      $http.get('/api/notes/count').success(function(data) {
        $scope.notesLength = data;
        $http.get('/api/notes?limit=9').success(function(data) {
          $scope.notes = data;
          $scope.busy = false;
        });
      });
    }

    socket.on('note: added', function (data) {
      $http.get('/api/notes').success(function(data) {
        $scope.notes.unshift(data[0]);
      });
    });

    socket.on('note: updated', function (data) {
      $scope.loadMore($scope.notes.length);
    });

    socket.on('note: removed', function (data) {
      $scope.loadMore($scope.notes.length - 1);
    });

    $scope.loadMore = function(limit) {
      $scope.busy = true;
      $http.get('/api/notes?limit=' + limit).success(function(data) {
        $scope.notes = data;
        $scope.limit += PAGELIMIT;
        $scope.busy = false;
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
