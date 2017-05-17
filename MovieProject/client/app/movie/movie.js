'use strict';

angular.module('yomastertemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie', {
        template: '<movie></movie>',
          authenticate: 'admin'
      });
  });
