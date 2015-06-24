'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.clock',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/clock', {
            templateUrl: 'clock/clock.html',
            controller: 'clock'
        }).
        //when('/phones/:phoneId', {
        //    templateUrl: 'partials/phone-detail.html',
        //    controller: 'PhoneDetailCtrl'
        //}).
        otherwise({
            redirectTo: '/clock'
        });

}]);
