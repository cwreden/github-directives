'use strict'

angular.module('github-directives')
    .directive('repos', function () {
        return {
            restrict: 'A',
            scope: {
                'ghUser': '@'
            },
            templateUrl: 'src/template/reposTemplate.html',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.repos = [];

                $scope.$watch('ghUser', function () {
                    if ($scope.ghUser == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.ghUser + '/repos'})
                        .success(function (data, status, headers, config) {
                            $scope.repos = data;
                        });
                });
            }]
        };
    });

