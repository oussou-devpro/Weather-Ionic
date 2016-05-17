// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform, $cordovaGeolocation, geoLocation, $rootScope, defaultLocalisation, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // ========================= GEOLOCATION ============================

    $cordovaGeolocation.getCurrentPosition().then(function (position) {
            geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude);
        }, function (err) {
             // you need to enhance that point
            $ionicPopup.alert({
                title: 'Ooops...',
                template: err.message
            });

            geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude)
        });

    // begin a watch
    var watch = $cordovaGeolocation.watchPosition({
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false
    }).then(function () {
        }, function (err) {
            // you need to enhance that point
            geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude);
        }, function (position) {
            geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
            // broadcast this event on the rootScope
            $rootScope.$broadcast('location:change', geoLocation.getGeolocation());
        }
    );

    // ========================= END GEOLOCATION ============================

  });
})

// ========================= GEOLOCATION ============================
.constant('defaultLocalisation', {
    'longitude': 	2.349014,
    'latitude': 48.864716
})
.factory('$localStorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])
.factory('geoLocation', function ($localStorage) {
    return {
        setGeolocation: function (latitude, longitude) {
            var position = {
                latitude: latitude,
                longitude: longitude

            }
            console.log(position);
            $localStorage.setObject('geoLocation', position)
        },
        getGeolocation: function () {
            return glocation = {
                lat: $localStorage.getObject('geoLocation').latitude,
                lng: $localStorage.getObject('geoLocation').longitude
            }
        }
    }
})

// ========================= END GEOLOCATION ============================

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse/:city',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'WeatherCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
