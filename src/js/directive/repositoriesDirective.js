'use strict'

angular.module('github-directives')
    .directive('ghRepositories', function () {
        return {
            restrict: 'E',
            scope: {
                'ghUser': '@'
            },
            templateUrl: 'src/template/RepositoriesTemplate.html',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.repos = [];

                $scope.$watch('ghUser', function () {
                    if ($scope.ghUser == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.ghUser + '/repos'})
                        .success(function (data) {
                            $scope.repos = data;
                        });
                });
            }]
        };
    });

