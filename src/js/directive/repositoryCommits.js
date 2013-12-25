'use strict'

angular.module('github-directives')
    .directive('ghRepositoryCommits', function () {
        return {
            restrict: 'E',
            scope: {
                'ghUser': '@',
                'ghRepo': '@'
            },
            templateUrl: 'src/template/RepositoryCommitsTemplate.html',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.commits = [];

                $scope.$watch('ghUser', function () {
                    if ($scope.ghUser == undefined || $scope.ghRepo == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/repos/' + $scope.ghUser + '/' + $scope.ghRepo + '/commits'})
                        .success(function (data) {
                            $scope.commits = data;
                        });
                });
            }]
        };
    });

