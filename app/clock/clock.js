'use strict';

angular.module('myApp.clock', ['ngRoute','angular-openweathermap', 'ngSanitize', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'clock'
  });
}])

.controller('clock', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout) {
    $scope.bgPicture = '../../images/backgrounds/default.jpg';
    $scope.toggleBackground_button = "Pause Slideshow";
    $scope.clockTime = undefined;

    $scope.changeBgPicture = function() {
        $http.jsonp('http://pi.anthonyatkinson.info/services/getRandomBackgroundImageUrl.php?callback=JSON_CALLBACK').
            success(function(data) {
              $scope.bgPicture = data.image;
            }
        );
    };

    var bgTimer = undefined;
    var clockTimer = undefined;

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

    var setupClock = function() {
        var time_now = new Date();
        var time_in_one_minute = new Date();
        time_in_one_minute.setSeconds(0);
        time_in_one_minute.setMinutes(time_in_one_minute.getMinutes() + 1);
        var interval_diff = time_in_one_minute.getTime() - time_now.getTime();
        $timeout(startClock, interval_diff);
        $scope.clockTime = Date.now();
    };

    var startClock = function() {
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