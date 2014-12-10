var dashBoard = angular.module('dashBoard', []);

dashBoard.controller('dashBoardCtrl', function ($scope, $http) {

  $scope.addGoal = function(goalName) {
    $http.post('api/swolationship/goal', {name: goalName})
  }

  $scope.completeGoal = function(id, goal) {
    str = 'api/swolationship/goal/:'+id;
    $http.put(str, goal)
  }

  $http.get('api/swolationship/goal').success(function(data) {
    $scope.goals = data;
    for (key in $scope.goals) {
      if (key.complete) {
          updateData(2);
      } else {
        updateData(0);
      }
    }
  })


  $http.get('api/swolationship').success(function(data) {
    $scope.swolationship = data;
  })

  $http.get('api/user').success(function(data) {
    $scope.user = data;
  })

});