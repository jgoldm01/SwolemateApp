var dashBoard = angular.module('dashBoard', []);

dashBoard.controller('dashBoardCtrl', function ($scope, $http) {

  $scope.formData = {};

  $scope.addGoal = function() {
    $http.post('api/swolationship/goal', {name: $scope.formData.newGoal});
    $scope.formData.newGoal = '';
    setTimeout(refreshGoals, 500);
  }

  $scope.completeGoal = function(id, goal) {
    str = 'api/swolationship/goal/'+id;
    $http.put(str, goal);
    refreshGoals();
  }

  $scope.deleteGoal = function(id, goal) {
    str = 'api/swolationship/goal/'+id;
    $http.delete(str, goal);
    refreshGoals();
  }

  function refreshGoals () {
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
  }
  refreshGoals();

  $http.get('api/swolationship').success(function(data) {
    $scope.swolationship = data;
  })

  $http.get('api/user').success(function(data) {
    $scope.user = data;
  })

});