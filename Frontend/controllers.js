var goalData = angular.module('goal', []);

goalData.controller('GoalList', function ($scope) {
	$scope.goals = [{'name': 'Nexus S',
     'body': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'body': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'body': 'The Next, Next Generation tablet.'}
 	];
}); 