'use strict';

angular.module('yomastertemplateApp', ['yomastertemplateApp.auth', 'yomastertemplateApp.admin',
    'yomastertemplateApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/movie', {
  templateUrl: 'app/movie/movie.html' ,
  controller : 'movie.component' ,
  access: {restricted: false}
})
    .when('/theatre', {
  templateUrl: 'app/theatre/theatre.html' ,
  controller : 'theatre.component' ,
  access: {restricted: false}
})
  .when('/seat', {
 templateUrl: 'app/seat/seat.html' ,
 controller : 'seat.component' ,
 access: {restricted: false}
})
.when('/mapping', {
templateUrl: 'app/mapping/mapping.html' ,
controller : 'mapping.component' ,
access: {restricted: false}
})

    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
