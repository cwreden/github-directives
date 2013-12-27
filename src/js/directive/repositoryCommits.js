'use strict'

angular.module('github-directives')
    .directive('ghRepositoryCommits', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'repo': '@'
            },
            templateUrl: 'src/template/RepositoryCommitsTemplate.html',
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

