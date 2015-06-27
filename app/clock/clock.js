'use strict';

angular.module('myApp.clock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'clock'
  });
}])

.controller('clock', ['$scope', '$http', function($scope, $http) {
      //$scope.bgPicture = {};
      $scope.bgPicture = '/images/backgrounds/default.jpg';

      $scope.changeBgPicture = function() {
        //$.ajax({url: "http://pi.anthonyatkinson.info/getRandomBackgroundImageUrl.php", success: function(result){
        //  $scope.bgPicture = result;
        //}});
        $http.jsonp('http://pi.anthonyatkinson.info/getRandomBackgroundImageUrl.php?callback=JSON_CALLBACK').
            success(function(data) {
              $scope.bgPicture = data.image;
              console.log(data.image);
            });
      };
}]);