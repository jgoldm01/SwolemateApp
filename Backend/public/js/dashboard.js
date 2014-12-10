var swoleMateFinder = angular.module('swoleMateFinder', []);

swoleMateFinder.controller('swoleMateFinderCtrl', function ($scope) {
  $scope.swolemates = [
    {'name': 'Nexus S',
     'focus': 'Fast just got faster with Nexus S.',
   'frequency': '4gb/sec',
   'distance': '5 inches'},
    {'name': 'Nexus S',
     'focus': 'Fast just got faster with Nexus S.',
   'frequency': '4gb/sec',
   'distance': '5 inches'},    
  {'name': 'Nexus S',
     'focus': 'Fast just got faster with Nexus S.',
   'frequency': '4gb/sec',
   'distance': '5 inches'}
  ];

  // todo: $http.get(api/swolefinder).success(function(data) {
  //  $scope.swolemates = data;
  // })

  $scope.ppl = {'name': 'johnny boy'}
});