'use strict';

angular.module('yomastertemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatre', {
        template: '<theatre></theatre>',
          authenticate: 'admin'
      });
  });
