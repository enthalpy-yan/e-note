'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io',
  'infinite-scroll'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/index', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/about', {
      templateUrl: 'partials/about'
    }).
    when('/contact', {
      templateUrl: 'partials/contact'
    }).
    when('/add', {
      templateUrl: 'partials/add',
      controller: 'addNoteController'
    }).
    otherwise({
      redirectTo: '/index'
    });

  $locationProvider.html5Mode(true);
});
