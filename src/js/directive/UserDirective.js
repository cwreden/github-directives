'use strict'

angular.module('github-directives')
    .directive('ghUser', function () {
        return {
            restrict: 'E',
            scope: {
                'name': '@',
                'showAvatar': '@',
                'showBlog': '@'
            },
            templateUrl: 'src/template/UserTemplate.html', // ToDo Pfad anpassen => /template/UserTemplate.html
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.user = {};

                $scope.$watch('name', function () {
                    if ($scope.name == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.name})
                        .success(function (data) {
                            $scope.user = data;
                        });
                });
            }]
        };
    });

