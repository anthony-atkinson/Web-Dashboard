'use strict';

angular.module('myApp.clock', ['ngRoute','angular-openweathermap', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'clock'
  });
}])

.controller('clock', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout) {
    $scope.bgPicture = '';
    $scope.toggleBackground_button = "Pause Slideshow";
    $scope.clockTime = undefined;

    $scope.changeBgPicture = function() {
        $http.get('/random_background').then(
            (res) => {
                $scope.bgPicture = res.data;
            }, (res) => {
                console.error(`Background request failed. Status: ${res.status}; Data: ${res.data}`);
            }
        );
    };

    let bgTimer = undefined;
    let clockTimer = undefined;

    $scope.stopBgTimer = function(){
        if(angular.isDefined(bgTimer)) {
            $interval.cancel(bgTimer);
            bgTimer = undefined;
            return true;
        }
        return false;
    };

    $scope.startBgTimer = function() {
        // Don't start a new timer if we are already have one running
        if ( angular.isDefined(bgTimer) ) {
            return false;
        }
        bgTimer = $interval(function(){
            $scope.changeBgPicture();
        },10 * 60000);
        return true;
    };

    $scope.toggleBackground_change = function() {
        if($scope.startBgTimer() ) {
            $scope.toggleBackground_button = "Pause Slideshow";
        }else {
            $scope.stopBgTimer();
            $scope.toggleBackground_button = "Start Slideshow";
        }
    };

    let startClock = function() {
        // Don't start a new timer if we are already have one running
        if ( angular.isDefined(clockTimer) ) {
            return false;
        }
        clockTimer = $interval(function(){
            $scope.clockTime = Date.now();
        },1000);
    };

    startClock();
    $scope.changeBgPicture();
    $scope.startBgTimer();
}]);