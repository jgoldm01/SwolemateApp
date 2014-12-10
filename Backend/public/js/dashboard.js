var dashBoard = angular.module('dashBoard', []);

dashBoard.controller('dashBoardCtrl', function ($scope) {
  $scope.completedGoals = [
    {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'}
  ];

  $scope.currentGoals = [
    {'name': 'currentGoals',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'currentGoals S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'currentGoals S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'}
  ];

  // todo: $http.get(api/swolefinder).success(function(data) {
  //  $scope.swolemates = data;
  // })

});