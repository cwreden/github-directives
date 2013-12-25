'use strict'

angular.module('github-directives')
    .directive('ghMilestoneChangeLog', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'repo': '@',
                'milestone': '@'
            },
            templateUrl: 'src/template/MilestoneChangeLog.html',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.issues = [];

                $scope.$watch('milestone', function () {
                    if ($scope.repo == undefined || $scope.user == undefined || $scope.milestone == undefined) {
                        return;
                    }
                    $http({
                        method: 'GET',
                        url: apiUrl + '/repos/' + $scope.user + '/' + $scope.repo + '/issues',
                        params: {
                            state: 'closed'
                        }
                    })
                        .success(function (data) {
                            $scope.issues = [];
                            if ($scope.milestone !== undefined) {
                                data.forEach(function (issue) {
                                    if (issue.milestone !== null && issue.milestone.title == $scope.milestone) {
                                        $scope.issues.push(issue);
                                    }
                                });
                            }
                        });
                });
            }]
        };
    });

