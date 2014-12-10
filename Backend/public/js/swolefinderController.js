var swoleMateFinder = angular.module('swoleMateFinder', []);

swoleMateFinder.controller('swoleMateFinderCtrl', function ($scope, $http) {
  // $scope.swolemates = [
  //   {'name': 'Nexus S',
  //    'focus': 'Fast just got faster with Nexus S.',
  //  'frequency': '4gb/sec',
  //  'distance': '5 inches'},
  //   {'name': 'Nexus S',
  //    'focus': 'Fast just got faster with Nexus S.',
   //    'frequency': '4gb/sec',
   //    'distance': '5 inches'},    
   //   {'name': 'Nexus S',
   //   'focus': 'Fast just got faster with Nexus S.',
   //    'frequency': '4gb/sec',
   //    'distance': '5 inches'}
   //  ];
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
