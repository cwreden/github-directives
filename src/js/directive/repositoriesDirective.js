'use strict'

angular.module('github-directives')
    .directive('ghRepositories', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'hideOpenIssues': '=',
                'hideForks': '=',
                'hideLanguage': '=',
                'limit': '='
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">Repositories for {{ user }}</div>' +
                    '<div class="list-group">' +
                        '<a href="{{ repo.html_url }}" target="_blank" ng-repeat="repo in repos" class="list-group-item">' +
                            '<span>{{ repo.name }}</span>' +
                            '<span class="badge" title="Forks" ng-hide="hideForks">{{ repo.forks }}</span>' +
                            '<span class="badge" title="Open Issues" ng-hide="hideOpenIssues">{{ repo.open_issues }}</span>' +
                            '<span class="badge" title="Language" ng-show="repo.language" ng-hide="hideLanguage">{{ repo.language }}</span>' +
                        '</a>' +
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

