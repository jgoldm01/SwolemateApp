var dashBoard = angular.module('dashBoard', []);

dashBoard.controller('dashBoardCtrl', function ($scope, $http) {
  $scope.goals = [
    {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': true},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': true},
   {'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': true},
   {'name': 'currentGoals',
     'body': 'Fast just got faster with Nexus S.',
   'complete': false},
   {'name': 'currentGoals S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': false},
   {'name': 'currentGoals S',
     'body': 'Fast just got faster with Nexus S.',
   'complete': false}
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


    for (goal in $scope.goals) {
       if (goal.complete) {
          updateData(1);
      } else {
        updateData(0);
      }
    }

  $scope.completeGoal = function(id, goal) {
    str = 'api/swolationship/goal/:'+id;
    $http.put(str, goal)
  }

  // $http.get('api/swolationship/goals').success(function(data) {
  //   $scope.completedGoals = data;
   // for (key in $scope.goals) {
      //  if (key.complete) {
      //     updateData(2);
      // } else {
      //   updateData(0);
      // }
   //  }
  // })



  // $http.get('api/swolationship').success(function(data) {
  //   $scope.swolationship = data;
  // })

  // $http.get('api/user').success(function(data) {
  //   $scope.user = data;
  // })

});