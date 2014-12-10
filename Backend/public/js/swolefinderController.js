var swoleMateFinder = angular.module('swoleMateFinder', []);

swoleMateFinder.controller('swoleMateFinderCtrl', function ($scope, $http) {
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

  $scope.selectswolemate = function(name) {
  	$http.post('api/chooseswolemate', {"username": name})
  	window.location.replace("dashboard.html");
  }
	
  // todo: $http.get(api/swolefinder).success(function(data) {
  // 	$scope.swolemates = data;
  // })
});
