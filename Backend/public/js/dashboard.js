var dashBoard = angular.module('dashBoard', []);

dashBoard.controller('dashBoardCtrl', function ($scope, $http) {
  $scope.completedGoals = [
    {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': 'true/sec'},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': true}
  ];

  $scope.incompleteGoals = [
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

  $scope.user = 
    {'username': 'Android',
     'matchingparams': {
       'focus': 'running',
       'frequency': '4gb/sec',
       'distance': '5 inches'
     }
    }

  $scope.swolationship = 
    {
      'user1': {
        'username':'android'
      },
      'user2': {
        'username':'iphone'
      }
    }



  for (key in $scope.incompleteGoals) {
    updateData(0);
  }

  for (key in $scope.completedGoals) {
    updateData(2);
  }

  $scope.completeGoal = function(id, goal) {
    str = 'api/swolationship/goal/:'+id;
    $http.put(str, goal)
  }

  // $http.get('api/swolationship/completedGoals').success(function(data) {
  //   $scope.completedGoals = data;
   // for (key in $scope.incompleteGoals) {
   //    updateData(0);
   //  }
  // })

  // $http.get('api/swolationship/incompleteGoals').success(function(data) {
  //   $scope.incompleteGoals = data;
  //   for (key in $scope.incompleteGoals) {
  //     updateData(0);
  //   }
  // })

  // $http.get('api/swolationship').success(function(data) {
  //   $scope.swolationship = data;
  // })

  // $http.get('api/user').success(function(data) {
  //   $scope.user = data;
  // })

});