'use strict'

angular.module('github-directives')
    .directive('ghRepositories', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'hideOpenIssues': '=',
                'hideForks': '=',
                'limit': '='
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">Repositories: {{ user }}</div>' +
                    '<div class="panel-body">' +
                        '<ul class="list-unstyled">' +
                            '<li ng-repeat="repo in repos" class="clearfix">' +
                                '<a href="{{ repo.html_url }}" target="_blank">' +
                                    '<span class="pull-left">{{ repo.name }}</span>' +
                                    '<span class="pull-right forks" title="Forks" ng-hide="hideForks">{{ repo.forks }}</span>' +
                                    '<span class="pull-right openIssues" title="Open Issues" ng-hide="hideOpenIssues">{{ repo.open_issues }}</span>' +
                                '</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.repos = [];

                $scope.$watch('user', function () {
                    if ($scope.user == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.user + '/repos'})
                        .success(function (data) {
                            if ($scope.limit == undefined) {
                                $scope.repos = data;
                            } else {
                                $scope.repos = data.splice(0,$scope.limit);
                            }
                        });
                });
            }]
        };
    });

