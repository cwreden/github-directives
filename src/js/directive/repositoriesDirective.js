'use strict'

angular.module('github-directives')
    .directive('ghRepositories', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@'
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">Repositories: {{ user }}</div>' +
                    '<div class="panel-body">' +
                        '<ul>' +
                            '<li ng-repeat="repo in repos">' +
                                '<a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>' +
                                '<span style="font-size: 11px;">(Open Issues: {{ repo.open_issues }} - Forks: {{ repo.forks }})</span>' +
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
                            $scope.repos = data;
                        });
                });
            }]
        };
    });

