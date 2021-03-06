'use strict'

angular.module('github-directives')
    .directive('ghChangeLogs', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'repo': '@'
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">Changelog for {{ repo }} by {{ user }}</div>' +
                    '<div class="panel-body">' +
                        '<div ng-repeat="milestone in milestones">' +
                            '<h3>{{ milestone.title }}</h3>' +
                            '<ul>' +
                                '<li ng-repeat="issue in milestone.issues">{{ issue.title }}</li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.milestones = [];

                $scope.$watch('repo', function () {
                    if ($scope.repo == undefined || $scope.user == undefined) {
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
                            $scope.milestones = [];
                            var milestoneMap = [];
                            data.forEach(function (issue) {
                                if (issue.milestone == null) {
                                    return;
                                }
                                var number = issue.milestone.number;
                                if (!milestoneMap.hasOwnProperty(number)) {
                                    milestoneMap[number] = issue.milestone;
                                    milestoneMap[number].issues = [];
                                }

                                milestoneMap[number].issues.push(issue);
                            });
                            milestoneMap.forEach(function (map) {
                                if (map == undefined) {
                                    return;
                                }
                                $scope.milestones.push(map);
                            });
                        });
                });
            }]
        };
    });

