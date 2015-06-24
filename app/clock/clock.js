'use strict';

angular.module('myApp.clock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'clock'
  });
}])

.controller('clock', [function() {

}]);