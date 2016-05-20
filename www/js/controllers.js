angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {

  $scope.click = function (){
    $scope.citys = $rootScope.cityTab;
    console.log($rootScope.cityTab);
  }
})
.controller('AddCtrl', function($scope, $state, $rootScope) {
  $scope.search = function(city){
    $state.go('app.browse', {city: city})
    $rootScope.cityTab.push(city);
    console.log($rootScope.cityTab);
  }
})
.controller('HomeCtrl', function($scope, $ionicLoading, $state, $rootScope,geoLocation, $stateParams, $http){
  $rootScope.cityTab = [];
  $scope.position = geoLocation.getGeolocation();
  $scope.search = function(city){
    $state.go('app.browse', {city: city})
  }
  url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+$scope.position.lat+"&lon="+$scope.position.lat+"&mode=json&units=metric&cnt=7&appid=7a0a40b5437273be8ca241dc947981a2";
  $ionicLoading.show({
      template: 'Chargement...'
   });
  $http.get(url).success(function(response){
      $ionicLoading.hide();
      $scope.weather = response;
      $rootScope.cityTab.push($scope.weather.city.name);
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
  url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $stateParams.city + "&mode=json&units=metric&cnt=7&APPID=7a0a40b5437273be8ca241dc947981a2";
  $ionicLoading.show({
      template: 'Chargement...'
   });
  $http.get(url).success(function(response){
      $ionicLoading.hide();
      $scope.weather = response;
  })
  $scope.Math = Math

})
