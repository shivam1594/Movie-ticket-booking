'use strict';

angular.module('yomastertemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mapping', {
        template: '<mapping></mapping>',
          authenticate: 'admin'
      });
  });
