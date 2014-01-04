'use strict'

angular.module('github-directives')
    .directive('ghRepositoryCommits', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'repo': '@'
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">Commits: {{ user }} - {{ repo }}</div>' +
                    '<div class="panel-body">' +
                        '<ul>' +
                            '<li ng-repeat="commit in commits">' +
                                '<a href="{{ commit.html_url }}" target="_blank">{{ commit.commit.message }}</a>' +
                                '<span style="font-size: 11px;">By: {{ commit.commit.author.name }}</span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.commits = [];

                $scope.$watch('repo', function () {
                    if ($scope.user == undefined || $scope.repo == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/repos/' + $scope.user + '/' + $scope.repo + '/commits'})
                        .success(function (data) {
                            $scope.commits = data;
                        });
                });
            }]
        };
    });

