'use strict'

angular.module('github-directives')
    .directive('ghRepositories', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@'
            },
            templateUrl: 'src/template/RepositoriesTemplate.html',
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

