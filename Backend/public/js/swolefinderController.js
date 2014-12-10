var swoleMateFinder = angular.module('swoleMateFinder', []);

swoleMateFinder.controller('swoleMateFinderCtrl', function ($scope, $http) {

  $http.get('api/swolefinder').success(function(data) {
    $scope.swolemates = data;
  })

  $scope.selectswolemate = function(username) {
    $http.post('api/chooseswolemate', {"username": username})
    .success(function(data, status, headers, config) {
    window.location.href = "dashboard";
    })
  }

});
