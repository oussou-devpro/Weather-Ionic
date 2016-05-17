angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('HomeCtrl', function($scope, $ionicLoading, $state, geoLocation, $stateParams, $http){
  $scope.position = geoLocation.getGeolocation();
  $scope.search = function(city){
    $state.go('app.browse', {city: city})
  }
  url = "http://api.openweathermap.org/data/2.5/forecast?lat="+$scope.position.lat+"&lon="+$scope.position.lat+"&mode=json&units=metric&cnt=10&appid=7a0a40b5437273be8ca241dc947981a2";
  $ionicLoading.show({
      template: 'Chargement...'
   });
  $http.get(url).success(function(response){
      $ionicLoading.hide();
      $scope.weather = response;
  })
  $scope.Math = Math

  $scope.tabDay = ['DIM','LUN','MAR','MER','JEU','VEN','SAM'];
  $scope.day = function(day) {
    var date = new Date(day);
    var jour = date.getDay();
    return $scope.tabDay[jour];
  }
})


.controller('WeatherCtrl', function($ionicLoading, $scope, $stateParams, $http){
  $scope.tabDay = ['DIM','LUN','MAR','MER','JEU','VEN','SAM'];
  $scope.day = function(day) {
    var date = new Date(day);
    var jour = date.getDay();
    return $scope.tabDay[jour];
  }
  url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $stateParams.city + "&mode=json&units=metric&cnt=10&APPID=7a0a40b5437273be8ca241dc947981a2";
  $ionicLoading.show({
      template: 'Chargement...'
   });
  $http.get(url).success(function(response){
      $ionicLoading.hide();
      $scope.weather = response;
  })
  $scope.Math = Math

})
