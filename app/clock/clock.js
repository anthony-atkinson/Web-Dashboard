'use strict';

angular.module('myApp.clock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'clock'
  });
}])

.controller('clock', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    $scope.bgPicture = '/images/backgrounds/default.jpg';
    $scope.toggleBackground_button = "Pause Slideshow";
    $scope.clockTime = "15:00";

    $scope.changeBgPicture = function() {
        $http.jsonp('http://pi.anthonyatkinson.info/getRandomBackgroundImageUrl.php?callback=JSON_CALLBACK').
            success(function(data) {
              $scope.bgPicture = data.image;
            }
        );
    };

    var bgTimer = undefined;

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
        },10000);
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

    $scope.changeBgPicture();
    $scope.startBgTimer();
}]);