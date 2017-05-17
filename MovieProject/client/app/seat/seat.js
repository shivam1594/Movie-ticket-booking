'use strict';

angular.module('yomastertemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seat', {
        template: '<seat></seat>'
      });
  });
